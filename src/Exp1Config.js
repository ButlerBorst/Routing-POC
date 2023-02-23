//type ScreenType = "component" | "route" | "overlay"

export const ScreenConfig = {
  screens: [
    {
      screen: "SCREEN1",
      screenType: "component"
    },
    {
      screen: "SCREEN2",
      screenType: "component"
    },
    {
      screen: "SCREEN3",
      screenType: "component"
    },
    {
      screen: "SCREEN4",
      screenType: "route",
      firstRoute: true
    },
    {
      screen: "SCREEN5",
      screenType: "route",
      initRoute: true
    },
    {
      screen: "SCREEN6",
      screenType: "route"
    },
    {
      screen: "SCREEN7",
      screenType: "route"
    },
    {
      screen: "SCREEN8",
      screenType: "overlay"
    },
    {
      screen: "SCREEN9",
      screenType: "overlay",
      nextRoundPage: true
    }
  ]
};
