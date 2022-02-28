import { Text, FlexProps, Link } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

export interface CreditsProps extends FlexProps {}

const Credits: React.FC<CreditsProps> = ({ ...props }) => {
  return (
    <Card bg={"rgba(1,1,1,.5)"} display={["none", "none", "flex"]} {...props}>
      <Text fontSize={"xs"} color="white" fontWeight={"bold"}>
        <Link
          href="https://knotsanalytics.com/"
          isExternal
          title="https://knotsanalytics.com/"
        >
          Fishing Prediction maps is offered by KNOTS
        </Link>
      </Text>
    </Card>
  );
};

export default Credits;
