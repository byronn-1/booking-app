import { Divider, Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Logout from "./Logout";
import { BsClockHistory, BsDoorOpen, BsGearWide } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";

import { GrOrderedList } from "react-icons/gr";

import { AiOutlineFileText } from "react-icons/ai";
import TabOption from "./TabOption";

export const TabNav = () => {

  const [isMobile] = useMediaQuery(`(max-width: 30em)`);
  const [isTablet] = useMediaQuery(`(max-width: 80em)`);

  if (isMobile) {
    return (
      <Flex
        direction="column"
        bg="base.white"
        borderRightColor="base.border"
        borderRightWidth="none"
        h="90vh"
      >
        <Flex direction="column" h="87vh">
          <Divider borderColor="base.border" opacity={1} w="270px" />
          <TabOption
            display="none"
            ml="30px"
            icon={IoCalendarOutline}
            to="query"
            text="fixtures"
            marginY="30px"
          />
          <TabOption
            icon={AiOutlineFileText}
            to="saved"
            text="reports"
            marginY="30px"
          />

          <TabOption
            icon={GrOrderedList}
            to="saved"
            text="standings"
            marginY="30px"
          />
          <Divider borderColor="base.border" opacity={1} w="270px" />
        </Flex>
        <Flex direction="column">
          <Divider borderColor="base.border" opacity={1} w="270px" ml="10px" />

          <TabOption icon={BsClockHistory} to="admin" text="saved" />
          <TabOption icon={BsGearWide} to="settings" text="settings" />
          <Divider borderColor="base.border" opacity={1} w="270px" ml="10px" />
        </Flex>
        <Flex mb="35px">
          <Logout text="log out" icon={BsDoorOpen} />
        </Flex>
      </Flex>
    );
  }
  if (isTablet) {
    return (
      <Flex
        direction="column"
        bg="base.white"
        borderRightColor="base.border"
        borderRightWidth="none"
        h="86vh"
        mt="35px"
        ml="10px"
      >
        <Flex direction="column" h="70vh">
          <Divider borderColor="base.border" opacity={1} w="375px" />
          <Flex direction="column" justifyContent="space-evenly" h="35%">
          <TabOption
            display="none"
            ml="30px"
            icon={IoCalendarOutline}
            to="query"
            text="fixtures"
            marginY="20px"
          />
          <TabOption
            icon={AiOutlineFileText}
            to="saved"
            text="reports"
            marginY="20px"
          />

          <TabOption
            icon={GrOrderedList}
            to="saved"
            text="standings"
            marginY="20px"
          />
          </Flex>
          <Divider borderColor="base.border" opacity={1} w="375px" />
        </Flex>
        <Flex direction="column" justifyContent="space-evenly" h="20vh">
          <Divider borderColor="base.border" opacity={1} w="375px"  />

          <TabOption icon={BsClockHistory} to="admin" text="saved" />
          <TabOption icon={BsGearWide} to="settings" text="settings" />
          <Divider borderColor="base.border" opacity={1} w="375px"  />
        </Flex>
        <Flex mb="35px">
          <Logout text="log out" icon={BsDoorOpen} />
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex
      direction="column"
      bg="base.nav"
      borderRightColor="base.border"
      borderRightWidth="1px"
      w="50px"
      h={`calc(100vh - 65px)`}
      alignItems="center"
    >
      <Flex direction="column" w="45px" h="87vh">
        <Divider
          borderColor="base.border"
          opacity={1}
          w="30px"
          position="fixed"
          left="10px"
        />
        <TabOption
          ml="30px"
          icon={IoCalendarOutline}
          to="query"
          text="fixtures"
          marginY="30px"
        />
        <TabOption
          icon={AiOutlineFileText}
          to="saved"
          text="reports"
          marginY="30px"
        />

        <TabOption
          icon={GrOrderedList}
          to="saved"
          text="standings"
          marginY="30px"
        />
        <Divider
          borderColor="base.border"
          opacity={1}
          w="30px"
          position="fixed"
          left="10px"
        />
      </Flex>
      <Flex direction="column">
        <Divider borderColor="base.border" opacity={1} w="30px" ml="10px" />
        <TabOption icon={BsClockHistory} to="admin" text="saved" />
        <TabOption icon={BsGearWide} to="settings" text="settings" />
        <Divider borderColor="base.border" opacity={1} w="30px" ml="10px" />
      </Flex>
      <Flex mb="35px">
        <Logout text="log out" icon={BsDoorOpen} />
      </Flex>
    </Flex>
  );
};
