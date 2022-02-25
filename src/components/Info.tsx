import {
  FlexProps,
  Button,
  Tooltip,
  useColorModeValue,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Heading,
  Text,
  chakra,
} from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

export interface InfoProps extends FlexProps {
  label: string;
}

const Info: React.FC<InfoProps> = ({ label, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();
  const bg = useColorModeValue("white", "zinc.700");
  const bgHover = useColorModeValue("gray.100", "zinc.800");
  const txt = useColorModeValue("zinc.700", "white");
  return (
    <>
      <Card {...props} p={0}>
        <Tooltip
          hasArrow
          label={label}
          bg={bg}
          color={txt}
          placement={"right"}
          aria-label={"Open Information Box"}
          closeOnMouseDown={true}
          gutter={12}
          rounded={"md"}
          fontSize={"sm"}
        >
          <Button
            ref={btnRef}
            onClick={onOpen}
            p={2}
            h={12}
            w={12}
            position="relative"
            overflow={"hidden"}
            borderWidth={2}
            _hover={{
              borderWidth: 3,
              bg: bgHover,
            }}
          >
            <Icon
              viewBox="0 0 200 200"
              pointerEvents={"none"}
              zIndex={2}
              w={6}
              h={6}
            >
              <use xlinkHref={`/sprite.svg#info`} />
            </Icon>
          </Button>
        </Tooltip>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"lg"}
        >
          <DrawerOverlay />
          <DrawerContent bg={bg}>
            <DrawerCloseButton />
            <DrawerHeader>Fishing Predictions Maps</DrawerHeader>

            <DrawerBody>
              <Text fontSize="md" mb={4}>
                Fishing Prediction Maps provides a unique service in the
                Mediterrenean sea: given a species and an area, our maps display
                the fishing probability (FP) for the next week.
              </Text>
              <Text fontSize="md" mb={10}>
                Using environmental data and artificial intelligence we are able
                to predict the areas where it will be better or worse to fish.
              </Text>
              <Heading as={"h3"} size="md" mb={4}>
                How Does it work
              </Heading>
              <Text fontSize="md" mb={4}>
                The predictive models were created using historical fishing data
                from the fleet in the Mediterrenean coupled with environmental
                data and mathematical models. Every week new maps are created
                with updated forecasting data.
              </Text>
              <Text fontSize="md" mb={4}>
                The displayed value is on a scale from 0 to 1 - from the lowest
                to the highest{" "}
                <chakra.span fontWeight={"bold"}>
                  fishing probability (FP).
                </chakra.span>
              </Text>
              <Text fontSize="md" mb={6}>
                The results have been reviewd and confirmed by experts in the
                field and are now available fro anyone to see.
              </Text>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Card>
    </>
  );
};

export default Info;
