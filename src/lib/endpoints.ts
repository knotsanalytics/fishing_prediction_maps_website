export enum Environment {
  development = "development",
  production = "production",
}
// Change this to development for local testing
let env = Environment.production;

export const BaseURL =
  env === Environment.production
    ? "https://a.tiles.knotsanalyticstiles.link"
    : "http://localhost:8000";

export const BaseURL2 =
  env === Environment.production
    ? "https://b.tiles.knotsanalyticstiles.link"
    : "http://localhost:8000";

export const BaseURL3 =
  env === Environment.production
    ? "https://c.tiles.knotsanalyticstiles.link"
    : "http://localhost:8000";

export const MapTilerURL =
  "https://api.maptiler.com/tiles/land/{z}/{x}/{y}.pbf?key=PoBZ9TCT5Uy5GejocuGa";

export const MapBoxAccessToken =
  "pk.eyJ1IjoidG9tbWFzby1sdHJ6IiwiYSI6ImNrejN3Y3ZqdDAzdnkyb3VzbXk0azE5N28ifQ.urO1-rewUBqDpJysBX89xA";
