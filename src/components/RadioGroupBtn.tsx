import {
  BoxProps,
  Button,
  HStack,
  VStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useRadioGroup,
  Text,
  useColorModeValue,
  Icon,
  Tooltip,
  chakra,
} from "@chakra-ui/react";
import Card from "./Card";
import RadioButtonImg from "./RadioButtonImg";

export interface RadioGroupBtnProps extends BoxProps {
  onItemSelect: (arg0: string) => void;
  label: string;
  icon: string;
  bgImg: string;
  values: string[];
  defaultValue: string;
  show: boolean;
}

const RadioGroupBtn: React.FC<RadioGroupBtnProps> = ({
  onItemSelect,
  label,
  icon,
  values,
  bgImg,
  defaultValue,
  show,
  ...props
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: label,
    defaultValue: defaultValue,
    onChange: (e: string) => onItemSelect(e),
  });

  const group = getRootProps();
  const bg = useColorModeValue("white", "zinc.700");
  const txt = useColorModeValue("zinc.700", "white");
  const bgHover = useColorModeValue("gray.100", "zinc.800");

  return (
    <Card {...props} p={0} display={show ? "flex" : "none"}>
      <Popover placement="right-start" matchWidth={true}>
        <PopoverTrigger>
          <chakra.span>
            <Tooltip
              hasArrow
              label={label}
              bg={bg}
              color={txt}
              placement={"right"}
              aria-label={label}
              closeOnMouseDown={true}
              gutter={12}
              rounded={"md"}
              fontSize={"sm"}
            >
              <Button
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
                aria-label="open style selctor popup"
              >
                <Icon
                  viewBox="0 0 200 200"
                  pointerEvents={"none"}
                  zIndex={2}
                  w={6}
                  h={6}
                >
                  <use xlinkHref={`/sprite.svg#${icon}`} />
                </Icon>
              </Button>
            </Tooltip>
          </chakra.span>
        </PopoverTrigger>

        <PopoverContent bg={bg} w={56}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontSize={"sm"} fontWeight="bold">
            {label}
          </PopoverHeader>
          <PopoverBody>
            <HStack {...group} justifyContent={"space-between"}>
              {values.map((value, idx) => {
                const radio = getRadioProps({ value });
                return (
                  <VStack key={idx}>
                    <RadioButtonImg
                      {...radio}
                      val={value}
                      imgSrc={`/images/${value}.png`}
                    ></RadioButtonImg>
                    <Text fontSize={"xs"}>{value}</Text>
                  </VStack>
                );
              })}
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export default RadioGroupBtn;
