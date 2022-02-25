export const components = {
  Button: {
    variants: {
      "menu-trigger": {
        bg: "slate.100",
        color: "slate.700",
      },
      solid: (props: any) => ({
        bg: props.colorMode === "dark" ? "zinc.700" : "white",
      }),
    },
  },
};
