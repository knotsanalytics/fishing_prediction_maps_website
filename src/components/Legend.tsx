import { Text, FlexProps, Box, Flex, chakra } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

export interface LegendProps extends FlexProps {
  colorScheme: string | null;
  show: boolean;
}

const Legend: React.FC<LegendProps> = ({ colorScheme, show, ...props }) => {
  const getGradient = (val: string | null) => {
    if (val === "greens") return "linear(to-r, #C9FAE2, #20CE92, #004535)";
    else if (val === "grays") return "linear(to-r, #F1F2F4, #CACFD5, #5F6774)";
    else return "linear(to-r, #313695, #fffbb9, #a50026)";
  };
  return (
    <Card
      flexDirection="column"
      justifyContent={"center"}
      p={4}
      minH={"83px"}
      display={["none", "none", show ? "flex" : "none"]}
      {...props}
    >
      <Text fontSize={"xs"} textAlign="center" fontWeight={"bold"} mb={2}>
        Fishing Probabilty (FP)
      </Text>
      <Box
        w="120px"
        h="8px"
        bgGradient={getGradient(colorScheme)}
        ml={1}
        mr={1}
      />
      <Flex fontSize={"10px"} justifyContent="space-between">
        <chakra.span>0</chakra.span>
        <chakra.span>0.5</chakra.span>
        <chakra.span>1</chakra.span>
      </Flex>
    </Card>
  );
};

export default Legend;
