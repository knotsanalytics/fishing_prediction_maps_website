import { Box, RadioProps, useRadio, Image } from "@chakra-ui/react";

export interface RadioButtonImgProps extends RadioProps {
  val: string;
  imgSrc: string;
}

const RadioButtonImg: React.FC<RadioButtonImgProps> = ({
  val,
  imgSrc,
  ...props
}) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} id={val} />
      <label
        htmlFor={val}
        aria-label="radio button"
        style={{ visibility: "hidden" }}
      >
        {val}
      </label>
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="md"
        bg="zinc.700"
        borderColor="zinc.200"
        textAlign={"center"}
        fontSize="xs"
        fontWeight={"bold"}
        transitionProperty="background-color"
        transitionDuration=".2s"
        transitionTimingFunction="ease-in-out"
        _hover={{
          backgroundColor: "indigo.50",
          color: "zinc.700",
        }}
        _checked={{
          bg: "indigo.50",
          color: "zinc.700",
          borderColor: "zinc.600",
          borderWidth: "3px",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        p={2}
        w={12}
        h={12}
        overflow={"hidden"}
        position="relative"
      >
        <Image
          objectFit="cover"
          position={"absolute"}
          src={imgSrc}
          alt="map"
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          minH="100%"
          minW="100%"
        />
      </Box>
    </Box>
  );
};
export default RadioButtonImg;
