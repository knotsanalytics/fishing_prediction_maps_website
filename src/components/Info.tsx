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
  Image,
  DrawerBody,
  Heading,
  Text,
  TextProps,
} from "@chakra-ui/react";
import React from "react";
import Card from "./Card";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { HeadingProps } from "react-markdown/lib/ast-to-react";

const customMDTheme = {
  p: (props: TextProps) => {
    const { children } = props;
    return (
      <Text mb={4} fontSize="md">
        {children}
      </Text>
    );
  },
  h3: (props: HeadingProps) => {
    const { children } = props;
    return (
      <Heading as={"h3"} size="md" mb={4} mt={8}>
        {children}
      </Heading>
    );
  },
};

export interface InfoProps extends FlexProps {
  label: string;
  content: string;
}

const Info: React.FC<InfoProps> = ({ label, content, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();
  const bg = useColorModeValue("indigo.50", "zinc.700");
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
          size={"sm"}
        >
          <DrawerOverlay />
          <DrawerContent bg={bg}>
            <DrawerCloseButton />

            <DrawerBody>
              <Image
                objectFit="contain"
                w={64}
                src={"/logo.png"}
                alt="Fishing Prediction map screenshot"
                margin={"auto"}
                mt={10}
              />
              <ReactMarkdown
                components={ChakraUIRenderer(customMDTheme)}
                children={content}
                skipHtml
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Card>
    </>
  );
};

export default Info;
