import { divergent, grays, greens } from "./colorSchemes";
import { Theme } from "./customTypes";

export const getInitialTheme = (theme: string | null, mode: string) => {
  if (theme) {
    if (theme === Theme.DARK) {
      return "mapbox://styles/mapbox/dark-v10";
    } else if (theme === Theme.LIGHT) {
      return "mapbox://styles/mapbox/streets-v11";
    } else if (theme === Theme.GRAY) {
      return "mapbox://styles/mapbox/light-v10";
    }
  } else {
    localStorage.setItem("theme", mode);
    return mode === Theme.DARK
      ? "mapbox://styles/mapbox/dark-v10"
      : "mapbox://styles/mapbox/streets-v11";
  }
};

export const getInitialColorScheme = (scheme: string | null) => {
  if (scheme) {
    if (scheme === "divergent") return divergent;
    else if (scheme === "greens") return greens;
    else if (scheme === "grays") return grays;
  } else {
    localStorage.setItem("colorScheme", "divergent");
    return divergent;
  }
};

export const getLandBufferColor = (theme: string | null, darkMode: boolean) => {
  if (theme) {
    if (theme === Theme.DARK) return "#191A1A";
    else if (theme === Theme.LIGHT) return "#8ACDEC";
    else if (theme === Theme.GRAY) return "#CBD2D3";
  } else {
    return darkMode ? "#191A1A" : "#8ACDEC";
  }
};

export const getOnlyLandColor = (theme: string | null, darkMode: boolean) => {
  if (theme) {
    if (theme === Theme.DARK) return "#2E2D2C";
    else if (theme === Theme.LIGHT) return "#E0E0D1";
    else if (theme === Theme.GRAY) return "#F5F5F2";
  } else {
    return darkMode ? "#2E2D2C" : "#E0E0D1";
  }
};

export const getBathimetry1000Color = (
  theme: string | null,
  darkMode: boolean
) => {
  if (theme) {
    if (theme === Theme.DARK) {
      return "#141515";
    } else if (theme === Theme.LIGHT) {
      return "#6CC5EF";
    } else if (theme === Theme.GRAY) {
      return "#B2BEBF";
    }
  } else {
    return darkMode ? "#141515" : "#6CC5EF";
  }
};

export const getBathimetry2000Color = (
  theme: string | null,
  darkMode: boolean
) => {
  if (theme) {
    if (theme === Theme.DARK) {
      return "#0D0E0E";
    } else if (theme === Theme.LIGHT) {
      return "#5CBEEB";
    } else if (theme === Theme.GRAY) {
      return "#97A3A4";
    }
  } else {
    return darkMode ? "#0D0E0E" : "#5CBEEB";
  }
};

export const getBathimetry3000Color = (
  theme: string | null,
  darkMode: boolean
) => {
  if (theme) {
    if (theme === Theme.DARK) {
      return "#080909";
    } else if (theme === Theme.LIGHT) {
      return "#3EB0E4";
    } else if (theme === Theme.GRAY) {
      return "#747D7D";
    }
  } else {
    return darkMode ? "#080909" : "#3EB0E4";
  }
};

export const getAreaIndicatorColor = (theme: string | null) => {
  if (theme === Theme.DARK) {
    return "#e0e7ff";
  } else if (theme === Theme.LIGHT) {
    return "#bef264";
  } else if (theme === Theme.GRAY) {
    return "#747D7D";
  } else {
    return "#747D7D";
  }
};

export const getMapThumbnail = (theme: string) => {
  if (theme === Theme.DARK) {
    return "/map-dark.png";
  } else if (theme === Theme.GRAY) {
    return "/map-gray.png";
  } else return "/map-light.png";
};
