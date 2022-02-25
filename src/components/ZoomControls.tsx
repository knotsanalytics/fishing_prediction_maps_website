import { Button, FlexProps, Icon } from "@chakra-ui/react";
import React from "react";
import { useMap } from "react-map-gl";
import Card from "./Card";

export interface ZoomControlsProps extends FlexProps {}

const ZoomControls: React.FC<ZoomControlsProps> = ({ ...props }) => {
  const { myMap } = useMap();
  //

  return (
    <Card {...props} flexDirection="column" p={0}>
      <Button
        p={0}
        borderBottomRadius={0}
        borderBottomWidth={1}
        onClick={() => myMap.zoomIn()}
        title="Zoom in"
      >
        <Icon viewBox="0 0 200 200" w={6} h={6}>
          <use xlinkHref={`/sprite.svg#plus`} />
        </Icon>
      </Button>
      <Button
        p={0}
        borderTopRadius={0}
        onClick={() => myMap.zoomOut()}
        title="Zoom out"
      >
        <Icon viewBox="0 0 200 200" w={6} h={6}>
          <use xlinkHref={`/sprite.svg#minus`} />
        </Icon>
      </Button>
    </Card>
  );
};

export default ZoomControls;
