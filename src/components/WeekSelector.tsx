import {
  HStack,
  BoxProps,
  useRadioGroup,
  Text,
  chakra,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import Card from "./Card";
import RadioButton from "./RadioButton";

export interface WeekSelectorProps extends BoxProps {
  days: string[];
  onDaySet: (arg0: number) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  days,
  onDaySet,
  ...props
}) => {
  const options = days;
  const gref = React.useRef<any>();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "days",
    defaultValue: days[0],
    onChange: (e) => handleChange(e),
  });

  const group = getRootProps();

  const handleChange = (val: string) => {
    onDaySet(days.indexOf(val));
  };

  useEffect(() => {
    // Check if today exists and update
    const today = new Date().toISOString().split("T")[0];
    const val = days.find((el) => el === today);
    if (val) {
      const idx = days.indexOf(val);
      onDaySet(idx);
      // Force Click the right button
      gref.current.children[days.indexOf(val)].click();
    }
  }, []);

  return (
    <Card {...props} flexDirection="column">
      <Text textAlign={"right"} mb="2" fontSize={"sm"}>
        Week:{" "}
        <chakra.span fontWeight={"semibold"}>
          {new Date(days[0]).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
          {" - "}
          {new Date(days[6]).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}{" "}
          {new Date(days[0]).toLocaleDateString("en-GB", {
            year: "numeric",
          })}
        </chakra.span>
      </Text>
      <HStack {...group} ref={gref} justifyContent="space-between">
        {options.map((value, idx) => {
          const radio = getRadioProps({ value });
          return (
            <RadioButton key={`${value}${idx}`} {...radio}>
              {new Date(value).toLocaleDateString("en-GB", {
                weekday: "short",
              })}
              <chakra.span display={["none", "none", "inline"]}>
                {" " +
                  new Date(value).toLocaleDateString("en-GB", {
                    day: "numeric",
                  })}{" "}
              </chakra.span>
            </RadioButton>
          );
        })}
      </HStack>
    </Card>
  );
};

export default WeekSelector;
