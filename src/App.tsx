import React, { useEffect, useState, useCallback } from "react";
import { Map, Source, Layer } from "react-map-gl";
import mapboxgl, { FillLayer } from "mapbox-gl";
import axios from "axios";
// Styles
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { RdYlBu, turbo, grays } from "./lib/colorSchemes";
import {
  getAreaIndicatorColor,
  getBathimetry1000Color,
  getBathimetry2000Color,
  getBathimetry3000Color,
  getInitialColorScheme,
  getInitialTheme,
  getLandBufferColor,
  getOnlyLandColor,
} from "./lib/theme";
import { Box, useColorMode, useToast } from "@chakra-ui/react";

// Components
import WeekSelector from "./components/WeekSelector";
import ZoomControls from "./components/ZoomControls";
import MyMarker from "./components/MyMarker";
import RadioGroupBtn from "./components/RadioGroupBtn";
import CursorValue from "./components/CursorValue";
import Selector from "./components/Selector";
// Types
import {
  knotsData,
  markerValues,
  knotsEl,
  knotsSpecie,
  knotsArea,
  Theme,
  MapStyle,
} from "./lib/customTypes";
import Legend from "./components/Legend";
import Credits from "./components/Credits";
import Info from "./components/Info";
import IntroModal from "./components/IntroModal";
import {
  BaseURL,
  BaseURL2,
  BaseURL3,
  MapBoxAccessToken,
  MapTilerURL,
} from "./lib/endpoints";

function App() {
  // Chakras stored color mode (light | dark)
  const darkMode = useColorMode();
  // User stored map style (light | dark | gray)
  const theme = localStorage.getItem("theme");
  // User stored color scheme (RdYlBu | turbo | grays)
  const storedColorScheme = localStorage.getItem("colorScheme");
  // Ref of the base map
  const mapRef = React.useRef<any>();

  // Inital coordinates
  const [lng, setLng] = useState(14.175154);
  const [lat, setLat] = useState(39.317717);
  const [zoom, setZoom] = useState(4);

  // Base Map Style
  const [mapStyle, setMapStyle] = useState(
    getInitialTheme(theme, darkMode.colorMode)
  );
  // Choropleth Map Color Scheme
  const [colorScheme, setColorScheme] = useState<any>(
    getInitialColorScheme(storedColorScheme)
  );

  // Cursor Interactions
  const [cursor, setCursor] = useState<string>("default");
  const [showLngLat, setShowLngLat] = useState(false);
  const [showRestrictedAreas, setShowRestrictedAreas] = useState(false);
  const [markersArray, setMarkersArray] = useState<markerValues[]>([]);
  const [closeAllMarkers, setCloseAllMarkers] = useState(false);
  const [areaIndicator, setAreaIndicator] = useState<string>("");
  const [tileVal, setTileVal] = useState(0);

  // Data from knots
  const [data, setData] = useState<knotsData>();
  const [days, setDays] = useState<string[]>();
  const [areas, setAreas] = useState<knotsEl[]>();
  const [species, setSpecies] = useState<knotsEl[]>();

  // Values selected by the user
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedArea, setSelecedArea] = useState<knotsArea>();
  const [selectedSpecie, setSelectedSpecie] = useState<knotsSpecie>();

  // Used to open the intro modal
  const [isIntroModalOpen, setIntroModalOpen] = useState<boolean>(false);

  // Show loading state while loading the Choropleth map
  const [specieLoading, setSpeciaLoading] = useState<boolean>(false);

  // Needed to determine when a new day has been selected
  // while listening to the map idle state
  const [prevDay, setPrevDay] = useState<number>(0);

  // Hook to handle error toasts
  const toast = useToast();

  // Styles for each custom layer added to the base map
  const onlyLandLayerStyle: FillLayer = {
    id: "onlyland",
    type: "fill",
    source: "onlyland",
    "source-layer": "land",
    paint: {
      "fill-color": getOnlyLandColor(theme, darkMode.colorMode === "dark"),
    },
  };
  const bathymetry_1000: FillLayer = {
    id: "bathymetry_1000",
    type: "fill",
    source: "bathymetry_1000",
    paint: {
      "fill-color": getBathimetry1000Color(
        theme,
        darkMode.colorMode === "dark"
      ),
    },
  };
  const bathymetry_2000: FillLayer = {
    id: "bathymetry_2000",
    type: "fill",
    source: "bathymetry_2000",
    paint: {
      "fill-color": getBathimetry2000Color(
        theme,
        darkMode.colorMode === "dark"
      ),
    },
  };
  const bathymetry_3000: FillLayer = {
    id: "bathymetry_3000",
    type: "fill",
    source: "bathymetry_3000",
    paint: {
      "fill-color": getBathimetry3000Color(
        theme,
        darkMode.colorMode === "dark"
      ),
    },
  };
  const land_buffer: FillLayer = {
    id: "land_buffer",
    type: "fill",
    source: "land_buffer",
    paint: {
      "fill-color": getLandBufferColor(theme, darkMode.colorMode === "dark"),
    },
  };
  const restricted_areas: FillLayer = {
    id: "restricted_areas",
    type: "fill",
    source: "restricted_areas",
    paint: {
      "fill-color": "#F8D8D8",
      "fill-outline-color": "black",
    },
  };
  const knotsLayerStyle: FillLayer = {
    id: "knots",
    type: "fill",
    source: "knots",
    "source-layer": selectedSpecie?.id_layer,
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "value_rf"],
        ...colorScheme,
      ],
    },
  };
  const areas_style: FillLayer = {
    id: "we",
    type: "fill",
    source: "area",
    filter: ["==", "id", areaIndicator],
    paint: {
      "fill-color": getAreaIndicatorColor(theme),
      "fill-opacity": 0.4,
      "fill-outline-color": getAreaIndicatorColor(theme),
    },
  };

  // Initial Setup
  useEffect(() => {
    fetchKnotsData();
  }, []);

  // Fetch Config Data
  const fetchKnotsData = async () => {
    const config = await axios.get<knotsData>(`${BaseURL}/contratto.json`);
    setData(config.data);
    setDays(config.data.days);
    setAreas(
      config.data.areas.map(({ species, ...rest }) => {
        return rest;
      })
    );
  };

  const handleDarkTheme = (theme: string) => {
    if (theme === Theme.DARK) {
      setMapStyle(MapStyle.DARK);
      darkMode.setColorMode("dark");
    } else if (theme === Theme.LIGHT) {
      setMapStyle(MapStyle.LIGHT);
      darkMode.setColorMode("light");
    } else if (theme === Theme.GRAY) {
      setMapStyle(MapStyle.GRAY);
      darkMode.setColorMode("light");
    }
    localStorage.setItem("theme", theme);
  };

  const handleColorScheme = (scheme: string) => {
    if (scheme === "RdYlBu") setColorScheme(RdYlBu);
    else if (scheme === "turbo") setColorScheme(turbo);
    else if (scheme === "grays") setColorScheme(grays);
    localStorage.setItem("colorScheme", scheme);
  };

  const handleSelectArea = (el: any) => {
    if (data) {
      const area = data.areas.filter((e) => e.id === el)[0];
      setSelectedSpecie(undefined);
      setSelecedArea(area);
      if (!!area) {
        setMarkersArray([]);
        setSpecies(area.species);
      }
    }
  };

  const handleSelectSpecie = (el: any) => {
    if (selectedArea) {
      const specie = selectedArea.species.filter((e) => e.id === el)[0];
      setMarkersArray([]);
      if (specie && specie.id) {
        setSelectedSpecie(specie);
        setSpeciaLoading(true);
      }
    }
  };

  const handleAreaOptionHover = (id: string) => {
    // mapRef.current.flyTo({
    //   center: [data?.lon_init, data?.lat_init],
    //   zoom: data?.zoom_init,
    // });
    setAreaIndicator(id);
    if (id === "leave") setAreaIndicator("");
  };

  const handleMarkerDelete = (marker: any) => {
    setMarkersArray(
      markersArray.filter(
        (item) => item.lat !== marker.lat && item.lng !== marker.lng
      )
    );
  };

  // Get features values on mouse move
  const onMouseMove = useCallback((e) => {
    const prop = getProperty(e);
    if (prop === "restricted_area") {
      setShowRestrictedAreas(true);
    } else if (prop) {
      setShowLngLat(true);
      setLng(e.lngLat.lng.toFixed(4));
      setLat(e.lngLat.lat.toFixed(4));
      setTileVal(prop.value_rf.toFixed(4));
      setShowRestrictedAreas(false);
    } else {
      setShowLngLat(false);
      setShowRestrictedAreas(false);
    }
  }, []);

  // Create markers on click
  const onMouseClick = useCallback(
    (e) => {
      const prop = getProperty(e);
      const openedPopup = markersArray.filter(
        (el) => el.active === true
      ).length;
      if (prop && !openedPopup && prop !== "restricted_area") {
        // CREATE MARKER
        const er = {
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
          active: true,
          value: prop.value_rf.toFixed(4),
        };
        setCloseAllMarkers(false);
        setMarkersArray((oldArray: any) => [...oldArray, er]);
        return;
      }
      //CLOSE ALL MARKERS
      setCloseAllMarkers(true);
      const ar = markersArray;
      ar.map((el) => (el.active = false));
      setMarkersArray(ar);
    },
    [markersArray]
  );

  // handle mouse style on drag
  const onMouseDragEnd = useCallback(() => setCursor("default"), []);
  const onMouseDrag = useCallback(() => setCursor("move"), []);

  // Change markers values on day change
  // and end loadng state of species
  const onIdle = useCallback(() => {
    if (markersArray.length && selectedDay !== prevDay) {
      const els = markersArray;
      const map = mapRef.current;
      markersArray.map((e) => {
        const points = map.project([e.lng, e.lat]);
        // check if point is into view
        if (map.getBounds().contains([e.lng, e.lat])) {
          const feature = mapRef.current.queryRenderedFeatures(
            [points.x, points.y],
            {
              layers: ["knots"],
            }
          );
          e.value = feature[0].properties.value_rf.toFixed(4);
        }
      });
      setPrevDay(selectedDay);
      setMarkersArray(els);
    }
    setSpeciaLoading(false);
    if (!localStorage.getItem("visited")) {
      setIntroModalOpen(true);
      localStorage.setItem("visited", "true");
    }
  }, [markersArray, selectedDay, prevDay]);

  // Get feature prop for a given point
  // Used for mouse hover and click
  const getProperty = (e: any) => {
    const map = mapRef.current.getMap();

    if (map.getLayer("knots")) {
      const isEarth = map.queryRenderedFeatures(e.point, {
        layers: ["onlyland"],
      }).length;
      const isTooDeep = map.queryRenderedFeatures(e.point, {
        layers: ["bathymetry_1000"],
      }).length;
      const isTooShallow = map.queryRenderedFeatures(e.point, {
        layers: ["land_buffer"],
      }).length;
      const isRestricted = map.queryRenderedFeatures(e.point, {
        layers: ["restricted_areas"],
      }).length;
      if (isRestricted) {
        return "restricted_area";
      } else if (!isEarth && !isTooDeep && !isTooShallow && !isRestricted) {
        const feature = map.queryRenderedFeatures(e.point, {
          layers: ["knots"],
        });
        if (
          feature.length &&
          feature[0].layer.id === "knots" &&
          feature[0].properties
        ) {
          return feature[0].properties;
        } else return false;
      } else return false;
    } else return false;
  };

  // Show toast
  const onMapError = useCallback((e) => {
    console.log(e);
    toast({
      title: `Uh oh, something went wrong.`,
      status: "error",
      isClosable: true,
    });
  }, []);

  // Set initial zoom/lat/lng
  const onMapLoad = useCallback(
    (e) => {
      mapRef.current.flyTo({
        center: [data?.lon_init, data?.lat_init],
        zoom: data?.zoom_init,
      });
    },
    [data]
  );

  return (
    <Box position={"relative"} h={"100vh"} w={"100vw"}>
      {/* Base Map */}
      <Map
        id="myMap"
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: zoom,
        }}
        dragRotate={false}
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={MapBoxAccessToken}
        attributionControl={false}
        onZoom={(e) => setZoom(e.viewState.zoom)}
        cursor={cursor}
        onDrag={onMouseDrag}
        onDragEnd={onMouseDragEnd}
        onClick={onMouseClick}
        onMouseMove={onMouseMove}
        onIdle={onIdle}
        onError={onMapError}
        onLoad={onMapLoad}
      >
        {/* Land Buffer */}
        <Source
          id="land_buffer"
          type="geojson"
          data={`${BaseURL}/land_buffer.geojson`}
        >
          <Layer {...land_buffer} beforeId="hillshade" />
        </Source>
        {/* Only Land Layer */}
        <Source
          id="onlyland"
          type="vector"
          minzoom={0}
          maxzoom={14}
          tiles={[MapTilerURL]}
        >
          <Layer {...onlyLandLayerStyle} beforeId="hillshade" />
        </Source>
        {/* Selected Areas Layer - used when hovering the areas options */}
        <Source
          id="area"
          type="geojson"
          data={`${BaseURL}/selected_areas.geojson`}
        >
          <Layer {...areas_style} />
        </Source>
        {/* Bathymetry 1000m */}
        <Source
          id="bathymetry_1000"
          type="geojson"
          data={`${BaseURL}/bathymetry_1000_med.geojson`}
        >
          <Layer {...bathymetry_1000} beforeId="hillshade" />
        </Source>
        {/* Bathymetry 2000m */}
        <Source
          id="bathymetry_2000"
          type="geojson"
          data={`${BaseURL2}/bathymetry_2000_med.geojson`}
        >
          <Layer {...bathymetry_2000} beforeId="hillshade" />
        </Source>
        {/* Bathymetry 3000m */}
        <Source
          id="bathymetry_3000"
          type="geojson"
          data={`${BaseURL3}/bathymetry_3000_med.geojson`}
        >
          <Layer {...bathymetry_3000} beforeId="hillshade" />
        </Source>

        {selectedArea && selectedSpecie && (
          <>
            {/* Cloropleth Map */}
            <Source
              key={`${selectedArea.id}`}
              id="knots"
              type="vector"
              minzoom={data?.min_zoom}
              maxzoom={data?.max_zoom}
              tiles={[
                `${BaseURL}/tiles_${selectedSpecie.id}_${selectedArea.id}_${data?.days[selectedDay]}_${selectedSpecie.precision}_daily/{z}/{x}/{y}.pbf`,
                `${BaseURL2}/tiles_${selectedSpecie.id}_${selectedArea.id}_${data?.days[selectedDay]}_${selectedSpecie.precision}_daily/{z}/{x}/{y}.pbf`,
                `${BaseURL3}/tiles_${selectedSpecie.id}_${selectedArea.id}_${data?.days[selectedDay]}_${selectedSpecie.precision}_daily/{z}/{x}/{y}.pbf`,
              ]}
            >
              <Layer
                key={`${selectedSpecie.id}${selectedDay}`}
                {...knotsLayerStyle}
                beforeId="land_buffer"
              />
            </Source>
            {/* Restricted Areas */}
            <Source
              id="restricted_areas"
              type="geojson"
              data={`${BaseURL2}/restricted_areas.json`}
            >
              <Layer {...restricted_areas} beforeId="hillshade" />
            </Source>
          </>
        )}

        {markersArray?.length > 0 &&
          markersArray.map((marker, idx) => (
            <MyMarker
              key={`${marker.value}${selectedDay}${idx}`}
              marker={marker}
              date={data?.days[selectedDay] || ""}
              closePopup={closeAllMarkers}
              onDelete={handleMarkerDelete}
              onClick={() => {
                const el = markersArray;
                el[idx].active = !el[idx].active;
                setMarkersArray(el);
              }}
            />
          ))}
      </Map>
      {/* Area and Specie pickers */}
      <Box position={"absolute"} top={4} left={4}>
        <Selector
          options={areas ? areas : []}
          onSelected={handleSelectArea}
          placeholder="--Select an Area--"
          label="Areas"
          icon="area"
          marginBottom={4}
          onOptionHover={handleAreaOptionHover}
          disabled={!areas}
        />

        <Selector
          options={species ? species : []}
          onSelected={handleSelectSpecie}
          label="Species"
          placeholder="--Select a Specie--"
          icon="fish"
          loading={specieLoading}
          disabled={!species}
        />
      </Box>
      {/* Week Day Picker */}
      {days && (
        <WeekSelector
          days={days}
          position={"absolute"}
          bottom={4}
          right={[0, 4]}
          mr={[4, 0]}
          ml={[4, 0]}
          w={["calc(100% - 2rem)", "auto"]}
          onDaySet={setSelectedDay}
          key="a"
        />
      )}
      {/* Info Drawer */}
      {data && (
        <Info
          position={"absolute"}
          label={"Info about this map"}
          left={4}
          top={36}
          content={data.info}
        />
      )}

      {/* Map Style Picker */}
      <RadioGroupBtn
        position={"absolute"}
        left={4}
        top={"13rem"}
        onItemSelect={handleDarkTheme}
        label={"Select a map style"}
        icon={"layers"}
        values={["light", "dark", "gray"]}
        bgImg={darkMode.colorMode === Theme.DARK ? "/light.png" : "dark.png"}
        defaultValue={theme ? theme : darkMode.colorMode}
        show={true}
      />
      {/* Color Scheme Picker */}
      <RadioGroupBtn
        position={"absolute"}
        left={4}
        top={"17rem"}
        onItemSelect={handleColorScheme}
        label={"Select a color scheme"}
        icon={"color"}
        values={["RdYlBu", "turbo", "grays"]}
        bgImg={colorScheme === RdYlBu ? "/grays.png" : "RdYlBu.png"}
        defaultValue={storedColorScheme ? storedColorScheme : "grays"}
        show={!!selectedSpecie}
      />
      <ZoomControls position={"absolute"} right={4} bottom={28} />

      <CursorValue
        lng={lng}
        lat={lat}
        val={tileVal}
        show={showLngLat}
        showRestrictedAreas={showRestrictedAreas}
        pos={"absolute"}
        transform={"translate(-50%, 0)"}
        left={"50%"}
        top={4}
      />

      <Legend
        position={"absolute"}
        bottom={4}
        left={4}
        colorScheme={storedColorScheme}
        show={!!selectedSpecie}
      />

      <Credits position={"absolute"} top={4} right={4} />
      {data && data.slides && (
        <IntroModal isModalOpen={isIntroModalOpen} content={data.slides} />
      )}
    </Box>
  );
}

export default App;
