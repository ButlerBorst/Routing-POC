import { createContext, useContext, useEffect, useReducer } from "react";
import {
  useActionData,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { ScreenConfig } from "./Exp1Config";
import { useLocalStorage, usePrevious } from "react-use";
import isEqual from "lodash.isequal";
// import OverlayTest from "./screens/OverlayTest"
const initState = {
  screen: ScreenConfig.screens[0],
  cart: [],
  item: "Backpack",
  items: ["Backpack", "Grapes", "Car Accesories", "Stickers", "LASTITEM"],
};
const ExperimentContext = createContext(initState);
export const useExperimentContext = () => useContext(ExperimentContext);

const ExperimentProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const type = useNavigationType();

  const prevLocation = usePrevious(location);

  const [experimentState, dispatchExperimentState] = useReducer(
    ExpermientStateReducer,
    initState
  );
  console.log("experimentState: ", experimentState.screen);

  const [value, setValue, remove] = useLocalStorage("routing-test", null);

  useEffect(() => {
    if (value) {
      const nextRoundPage = ScreenConfig.screens.find((configScreen) => {
        return configScreen.nextRoundPage;
      });
      dispatchExperimentState({
        type: "FORCESCREENUPDATE",
        payload: nextRoundPage,
      });
      dispatchExperimentState({
        type: "SETCARTITEM",
        payload: value,
      });
    } else {
      navigate("/", { state: null, replace: true });
      dispatchExperimentState({
        type: "FORCESCREENUPDATE",
        payload: ScreenConfig.screens[0],
      });
    }
  }, []);

  useEffect(() => {
    if (experimentState.screen?.screenType === "route") {
      //will occur on the start on new rounds
      if (experimentState.screen.firstRoute && !location.state) {
        const initRoute = ScreenConfig.screens.find((configScreen) => {
          return configScreen.initRoute;
        });
        navigate("/", { state: experimentState.screen, replace: true });
        navigate("/", { state: initRoute, replace: false });
        dispatchExperimentState({
          type: "PROCEED",
        });
      } else {
        if (!isEqual(experimentState.screen, location.state)) {
          console.log("we arent equal and should navigate?");
          navigate("/", { state: experimentState.screen, replace: false });
        } else {
          console.log("WE ARE THE SAME NO NEED TO RENAV");
        }
      }
    }
  }, [experimentState.screen]);

  useEffect(() => {
    console.log("location", location.state);
    console.log("prevLocation", prevLocation?.state);

    if (location.state) {
      //WORKS FOR NOW
      if (experimentState.screen.screenType === "overlay") {
        dispatchExperimentState({
          type: "FORCESCREENUPDATE",
          payload: location.state,
        });
      }

      const currentScreenIndex = ScreenConfig.screens.findIndex(
        (configScreen) => {
          return configScreen.screen === location?.state?.screen;
        }
      );
      const prevLocationIndex = ScreenConfig.screens.findIndex(
        (configScreen) => {
          return configScreen.screen === prevLocation?.state?.screen;
        }
      );
      if (experimentState.screen.screenType === "route") {
        console.log(currentScreenIndex, prevLocationIndex);
        if (prevLocationIndex === currentScreenIndex) {
          console.log("WERE THE SAME");
        }
        //both work without popping state
        if (prevLocationIndex > currentScreenIndex) {
          if (!isEqual(location.state, experimentState.screen)) {
            console.log("RETURNING?");
            dispatchExperimentState({
              type: "RETURN",
            });
          }
        }
        if (currentScreenIndex > prevLocationIndex) {
          if (!isEqual(location.state, experimentState.screen)) {
            console.log("PROCEEDING?", experimentState.screen);
            // if (!experimentState.screen.firstRoute) {

            dispatchExperimentState({
              type: "PROCEED",
            });
            // }
          }
        }
      }

      if (type === "REPLACE") {
        console.log("TYPE IS REPLACE?", type);
        // dispatchExperimentState({
        //   type: "FORCESCREENUPDATE",
        //   payload: experimentState.screen,
        // });
        console.log("WERE replacing with no screen change");
      }
      if (type === "POP") {
        if (experimentState.screen.nextRoundPage) {
          dispatchExperimentState({
            type: "FORCESCREENUPDATE",
            payload: experimentState.screen,
          });
        }
        if (experimentState.screen.firstRoute) {
          console.log(
            "popping on the first route?",
            experimentState.screen,
            location.state,
            "curr:",
            currentScreenIndex,
            "prev:",
            prevLocationIndex
          );
          // navigate("/", { state: experimentState.screen, replace: false });
          navigate("/", { state: null, replace: true });
          dispatchExperimentState({
            type: "FORCESCREENUPDATE",
            payload: experimentState.screen,
          });
          if (currentScreenIndex < prevLocationIndex) {
            console.log(
              "in first route and are popping",
              experimentState.screen,
              location.state
            );
            // dispatchExperimentState({
            //   type: "FORCESCREENUPDATE",
            //   payload: experimentState.screen,
            // });
          }
          // else {
          //   navigate("/", { state: null, replace: true });
          //   // dispatchExperimentState({
          //   //   type: "FORCESCREENUPDATE",
          //   //   payload: experimentState.screen,
          //   // });
          // }
        }
      }
    }
  }, [type, location]);

  function ExpermientStateReducer(state, action) {
    const currentScreenIndex = ScreenConfig.screens.findIndex(
      (configScreen) => {
        return configScreen.screen === state.screen?.screen;
      }
    );
    switch (action.type) {
      // case "PROCEEDWITHNEXT":

      case "PROCEED":
        return {
          ...state,
          screen: ScreenConfig.screens[currentScreenIndex + 1],
        };
      case "RETURN":
        return {
          ...state,
          screen: ScreenConfig.screens[currentScreenIndex - 1],
        };
      case "FORCESCREENUPDATE":
        return {
          ...state,
          screen: action.payload,
        };
      case "STARTNEXTROUND":
        // window.location.reload();

        //still need final screen logic
        const currentItem = state.items.indexOf(state.item);

        return {
          ...state,
          screen: ScreenConfig.screens[currentScreenIndex + 1],
          item: state.items[currentItem + 1],
        };
      case "SETCARTITEM":
        return {
          ...state,
          item: action.payload,
        };
      default:
        console.warn("UNKNOWN ACTION TYPE", action);
        return state;
    }
  }

  return (
    <ExperimentContext.Provider
      value={{
        experimentState,
        dispatchExperimentState,
        setValue,
        value,
        remove,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};
export default ExperimentProvider;
