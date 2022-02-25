import { Flex, FlexProps, useColorModeValue } from "@chakra-ui/react";

export interface CardProps extends FlexProps {}

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  const bg = useColorModeValue("white", "zinc.700");
  return (
    <Flex bg={bg} boxShadow="md" rounded={"md"} padding={2} {...props}>
      {children}
    </Flex>
  );
};

export default Card;
