import { SlideFade, Box, FlexProps, Text, Tag } from "@chakra-ui/react";
import Card from "./Card";

export interface CursorValueProps extends FlexProps {
  lng?: number;
  lat?: number;
  val?: number;
  show: boolean;
  showRestrictedAreas?: boolean;
}

const CursorValue: React.FC<CursorValueProps> = ({
  lng,
  lat,
  val,
  show,
  showRestrictedAreas,
  ...props
}) => {
  return (
    <Box {...props} display={["none", "none", "none", "block"]}>
      <SlideFade in={show || showRestrictedAreas} offsetY="-10px">
        <Card gap={3} p={3}>
          {showRestrictedAreas && (
            <Tag
              fontSize={"sm"}
              textAlign="center"
              fontWeight={"bold"}
              w={"min-content"}
              whiteSpace={"nowrap"}
              colorScheme="red"
            >
              MARINE PROTECTED AREA (MPA)
            </Tag>
          )}
          {lng && lat && val !== undefined && !showRestrictedAreas && (
            <>
              <Tag
                fontSize={"sm"}
                textAlign="center"
                fontWeight={"bold"}
                w={"min-content"}
                whiteSpace={"nowrap"}
                colorScheme="green"
              >
                FP: {val}
              </Tag>
              <Tag
                fontSize={"sm"}
                textAlign="center"
                w={"min-content"}
                whiteSpace={"nowrap"}
              >
                Lat: {lat}
              </Tag>
              <Tag
                fontSize={"sm"}
                textAlign="center"
                w={"min-content"}
                whiteSpace={"nowrap"}
              >
                Lng: {lng}
              </Tag>
            </>
          )}
        </Card>
      </SlideFade>
    </Box>
  );
};

export default CursorValue;
