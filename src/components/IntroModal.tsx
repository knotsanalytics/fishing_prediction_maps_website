import {
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Image,
  Text,
  ModalFooter,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const steps = [
  {
    title: "Fishing Prediction Map",
    description: "Weekly AI based Predictions for the mediterranean sea",
    imgSrc: "/steps/step1.png",
  },
  {
    title: "See how likely you can fish a specie for a given area",
    description: `We use machine learning and predictive analytics to provide a prediction of the future fishing probability (FP) per species and area in the Mediterranean sea.`,
    imgSrc: "/steps/step2.png",
  },
  {
    title: "About the map",
    description:
      "The value we display is on a scale from zero to one, from the lowest probability of fishing to the highest. Our predictive models are created using historical fishing data from the fleet in the Mediterrenean coupled with environmental data and mathematical models.",
    imgSrc: "/steps/step3.png",
  },
];

export type IntroModalProps = { isModalOpen: boolean };

const IntroModal: React.FC<IntroModalProps> = ({ isModalOpen }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isModalOpen) onOpen();
  }, [isModalOpen]);

  const bg = useColorModeValue("indigo.50", "zinc.700");
  const lightMode = useColorMode().colorMode === "light";
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      closeOnOverlayClick={false}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent overflow="hidden" maxW={"45rem"} rounded="lg" minH="430px">
        <ModalCloseButton zIndex={10} />
        <ModalBody position={"relative"} p={0}>
          <Box minH={["100px", "100px", "150px"]} w={"100%"} overflow="hidden">
            <Image
              objectFit="contain"
              w={"100%"}
              src={steps[stepIdx].imgSrc}
              alt="Fishing Prediction map screenshot"
            />
          </Box>
          <Box pt={6} pl={6} pr={6}>
            {stepIdx === 0 ? (
              <Heading as={"h1"} textAlign={"center"} size="xl" mb={4}>
                {steps[stepIdx]?.title}
              </Heading>
            ) : (
              <Heading as={"h2"} textAlign={"center"} size="md" mb={4}>
                {steps[stepIdx]?.title}
              </Heading>
            )}

            <Text textAlign={"center"}>{steps[stepIdx]?.description}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            disabled={stepIdx === 0}
            onClick={() => setStepIdx(stepIdx - 1)}
          >
            Prev
          </Button>
          <Button
            bg={bg}
            _hover={{
              bg: lightMode ? "zinc.700" : "indigo.50",
              color: lightMode ? "indigo.100" : "zinc.700",
            }}
            onClick={() => {
              stepIdx === steps.length - 1
                ? onClose()
                : setStepIdx(stepIdx + 1);
            }}
          >
            {stepIdx === steps.length - 1 ? "Close" : "Next"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default IntroModal;
