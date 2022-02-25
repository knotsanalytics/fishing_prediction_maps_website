import {
  Text,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  BoxProps,
  MenuDivider,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { knotsEl } from "../lib/customTypes";
import Card from "./Card";

export interface SelectorProps extends BoxProps {
  options: knotsEl[];
  onSelected: (arg0: string) => void;
  onOptionHover?: (arg0: string) => void;
  label: string;
  placeholder: string;
  icon: string;
  loading?: boolean;
  disabled?: boolean;
}

const Selector: React.FC<SelectorProps> = ({
  onSelected,
  options,
  label,
  placeholder,
  onOptionHover,
  icon,
  loading = false,
  disabled = false,
  ...props
}) => {
  const [selectedName, setSelectedName] = useState(placeholder);

  useEffect(() => {
    setSelectedName(placeholder);
  }, [options]);

  const handleSelect = (e: any) => {
    const name = options.find((el) => el.id === e)?.name;
    if (name) setSelectedName(name);
    onSelected(e);
  };

  const bg = useColorModeValue("white", "zinc.700");

  return (
    <Card position={"relative"} {...props}>
      <HStack
        minW={["auto", "100px"]}
        alignItems={"center"}
        borderRight={2}
        borderStyle={"solid"}
        borderColor={"slate.100"}
        marginRight={3}
      >
        <Icon viewBox="0 0 200 200" w={5} h={5} marginRight={[2, 1]}>
          <use xlinkHref={`/sprite.svg#${icon}`} />
        </Icon>
        <Text display={["none", "block"]} fontSize="sm" fontWeight={"medium"}>
          {label}
        </Text>
      </HStack>
      <Flex justifyContent={"flex-end"} width={"100%"}>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            variant="menu-trigger"
            fontSize={"sm"}
            height={8}
            pr={2}
            rightIcon={<ChevronDownIcon />}
            isLoading={loading}
            loadingText={selectedName}
            spinnerPlacement="end"
            disabled={disabled || loading}
            _hover={{
              bg: "indigo.100",
            }}
          >
            {selectedName}
          </MenuButton>

          <MenuList minWidth="240px" bg={bg}>
            <MenuOptionGroup
              title="Select an option"
              type="radio"
              onChange={handleSelect}
            >
              <MenuDivider />
              {options.map((el) => (
                <MenuItemOption
                  onMouseEnter={() =>
                    onOptionHover ? onOptionHover(el.id) : null
                  }
                  onMouseLeave={() =>
                    onOptionHover ? onOptionHover("leave") : null
                  }
                  closeOnSelect
                  key={el.id}
                  value={el.id}
                >
                  {el.name}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Card>
  );
};

export default Selector;
