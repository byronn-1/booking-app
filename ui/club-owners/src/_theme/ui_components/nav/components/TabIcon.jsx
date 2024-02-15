import { Center, Flex, Icon, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const TabIcon = ({ icon, isActive, text }) => {
  const [isMobile] = useMediaQuery(`(max-width: 30em)`);
  const [isTablet] = useMediaQuery(`(max-width: 80em)`);
  return (
    <Flex
      w={["180px", "180px", "45px"]}
      h="40px"
      cursor="pointer"
      role="group"
      _hover={{ bg: "base.hover", textDecoration:"none", color: "base.fontWhite" }}
      borderRadius="6px"
      direction="row"
    >
      <Center w="50px">
        <Icon as={icon} boxSize="22px" color="base.icon" />
      </Center>
      {isTablet &&
          <Flex align="center" ml="10px">
            <Text
              whiteSpace="nowrap"
              textTransform="capitalize"
              fontFamily="heading"
              color="base.font"
              _groupHover={{  color: "base.fontWhite" }}
            >
              {text}
            </Text>
          </Flex>
        }
    </Flex>
  );
};

export default TabIcon;
