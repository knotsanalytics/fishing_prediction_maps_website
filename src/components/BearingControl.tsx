import { FlexProps, Button, useColorModeValue, Icon } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

export interface BearingControlProps extends FlexProps {
  bearing: number;
}

const BearingControl: React.FC<BearingControlProps> = ({
  bearing,
  ...props
}) => {
  const bgHover = useColorModeValue("gray.100", "zinc.800");

  return (
    <Card {...props} p={0}>
      <Button
        aria-label="Recenter the map"
        title="Center the map"
        p={2}
        h={10}
        w={10}
        position="relative"
        overflow={"hidden"}
        _hover={{
          bg: bgHover,
        }}
      >
        <Icon
          viewBox="0 0 200 200"
          pointerEvents={"none"}
          zIndex={2}
          w={6}
          h={6}
          transform={`rotate(${-bearing}deg)`}
        >
          <use xlinkHref={`/sprite.svg#compass`} />
        </Icon>
      </Button>
    </Card>
  );
};

export default BearingControl;
