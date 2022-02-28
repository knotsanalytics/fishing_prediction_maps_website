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
  TextProps,
  HeadingProps,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const images = ["/steps/step1.png", "/steps/step2.png", "/steps/step3.png"];

const customMDTheme = {
  p: (props: TextProps) => {
    const { children } = props;
    return (
      <Text mb={4} fontSize="md" textAlign={"center"}>
        {children}
      </Text>
    );
  },
  h1: (props: HeadingProps) => {
    const { children } = props;
    return (
      <Heading as={"h1"} textAlign={"center"} size="xl" mb={4}>
        {children}
      </Heading>
    );
  },
  h2: (props: HeadingProps) => {
    const { children } = props;
    return (
      <Heading as={"h2"} textAlign={"center"} size="md" mb={4}>
        {children}
      </Heading>
    );
  },
};

export type IntroModalProps = { isModalOpen: boolean; content: string[] };

const IntroModal: React.FC<IntroModalProps> = ({ isModalOpen, content }) => {
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
              src={images[stepIdx]}
              alt="Fishing Prediction map screenshot"
            />
          </Box>
          <Box pt={6} pl={6} pr={6}>
            <ReactMarkdown
              components={ChakraUIRenderer(customMDTheme)}
              children={content[stepIdx]}
              skipHtml
            />
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
              stepIdx === content.length - 1
                ? onClose()
                : setStepIdx(stepIdx + 1);
            }}
          >
            {stepIdx === content.length - 1 ? "Close" : "Next"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default IntroModal;
