import {
  Box,
  RadioProps,
  useColorMode,
  useColorModeValue,
  useRadio,
} from "@chakra-ui/react";

export interface RadioButtonProps extends RadioProps {
  idx: number;
}

const RadioButton: React.FC<RadioButtonProps> = ({ idx, ...props }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const bg = useColorModeValue("indigo.50", "zinc.700");
  const lightMode = useColorMode().colorMode === "light";

  return (
    <Box as="label" w={["100%", "auto"]}>
      <input {...input} id={idx + "radio-button"} />
      <label
        htmlFor={idx + "radio-button"}
        aria-label="radio button"
        style={{ visibility: "hidden" }}
      ></label>
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderColor="indigo.50"
        borderRadius="md"
        bg={bg}
        minW={[0, 0, "70px"]}
        textAlign={"center"}
        fontSize={["0.6rem", "xs"]}
        fontWeight={"bold"}
        transitionProperty="background-color"
        transitionDuration=".2s"
        transitionTimingFunction="ease-in-out"
        p={2}
        _hover={{
          bg: lightMode ? "zinc.700" : "indigo.50",
          color: lightMode ? "indigo.50" : "zinc.700",
        }}
        _checked={{
          bg: lightMode ? "zinc.700" : "indigo.50",
          color: lightMode ? "indigo.50" : "zinc.700",
          borderColor: lightMode ? "zinc.700" : "indigo.50",
        }}
        _focus={{
          boxShadow: "outline",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
export default RadioButton;
