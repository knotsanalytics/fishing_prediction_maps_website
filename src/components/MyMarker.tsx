import {
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
  IconButton,
  Tag,
  Text,
  HStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import { markerValues } from "../lib/customTypes";

export type MyMarkerProps = {
  onClick: () => void;
  onDelete: (arg0: any) => void;
  marker: markerValues;
  closePopup: boolean;
  date: string;
};

const MyMarker: React.FC<MyMarkerProps> = ({
  onClick,
  onDelete,
  marker,
  closePopup,
  date,
}) => {
  const [showPopup, setShowPopup] = useState(marker.active);
  useEffect(() => {
    if (closePopup) setShowPopup(false);
  }, [closePopup]);
  const bg = useColorModeValue("white", "zinc.700");
  const iconBg = useColorModeValue("zinc.700", "zinc.700");

  return (
    <Marker
      longitude={marker.lng}
      latitude={marker.lat}
      anchor="bottom"
      clickTolerance={10}
    >
      <Popover isOpen={showPopup} placement="top">
        <PopoverTrigger>
          <Icon
            viewBox="0 0 200 200"
            zIndex={2}
            color={iconBg}
            w={6}
            h={6}
            cursor="pointer"
            onClick={(e) => {
              onClick();
              e.preventDefault();
              e.stopPropagation();
              setShowPopup(!showPopup);
            }}
          >
            <use xlinkHref={`/sprite.svg#area`} />
          </Icon>
        </PopoverTrigger>
        <PopoverContent bg={bg} w={"auto"} minW={48}>
          <PopoverArrow bg={bg} />
          <IconButton
            icon={<DeleteIcon w={3.5} h={3.5} />}
            colorScheme="red"
            variant="ghost"
            aria-label="Delete Marker"
            w={6}
            minW={6}
            h={6}
            p={2}
            alignSelf="end"
            mr={9}
            mt={1}
            ml={"auto"}
            onClick={(e) => {
              onDelete(marker);
              e.preventDefault();
              e.stopPropagation();
            }}
          />
          <PopoverCloseButton
            onClick={(e) => {
              setShowPopup(false);
              onClick();
              e.preventDefault();
              e.stopPropagation();
            }}
          />
          <PopoverBody>
            <HStack>
              <Tag
                fontSize={"sm"}
                textAlign="center"
                fontWeight={"bold"}
                whiteSpace={"nowrap"}
                colorScheme="green"
                minW={"calc(50% - 4px)"}
              >
                FP: {marker.value}
              </Tag>
              <Text fontSize={"sm"} minW={"calc(50% - 4px)"}>
                {new Date(date).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </Text>
            </HStack>
            <HStack marginTop={4} marginBottom={2}>
              <Tag
                fontSize={"sm"}
                textAlign="center"
                whiteSpace={"nowrap"}
                minW={"calc(50% - 4px)"}
              >
                Lat: {marker.lat.toFixed(2)}
              </Tag>
              <Tag
                fontSize={"sm"}
                textAlign="center"
                whiteSpace={"nowrap"}
                minW={"calc(50% - 4px)"}
              >
                Lon: {marker.lng.toFixed(2)}
              </Tag>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Marker>
  );
};

export default MyMarker;
