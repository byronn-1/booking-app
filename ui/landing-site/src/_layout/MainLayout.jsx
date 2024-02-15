import React from "react";
import { Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";

import { TopNav } from "../_theme/ui_components/nav/components/TopNav";
import { TabNav } from "../_theme/ui_components/nav/components/TabNav";
import {  Outlet } from "react-router-dom";

const MainLayout = ({children}) => {
  const [isMobile] = useMediaQuery(`(max-width: 30em)`);
  const [isTablet] = useMediaQuery(`(max-width: 80em)`);

  if (isMobile) {
    return (
      <Grid
        templateAreas={`"topNav" " outlet"`}
        gridTemplateRows={"40px 1fr"}
        gridTemplateColumns={" 1fr"}
      >
        <TopNav area={"topNav"} h="90vh" />
        <GridItem>
          <Flex
            area={"outlet"}
            h="100vh"
            w="100vw"
            justify={{ base: "inherit", xl: "center" }}
            bgColor="base.background"
            pr="1px"
            overflowY="scroll"
          >
            <Outlet/>
          </Flex>
        </GridItem>
      </Grid>
    );
  }
  if (isTablet) {
    return (
      <Grid
        templateAreas={`"topNav" " outlet"`}
        gridTemplateRows={"62px 1fr"}
        gridTemplateColumns={"1fr"}
      >
        <TopNav h="68vh" area={"topNav"} mt="35px" ml="10px" />
        <GridItem>
          <Flex
            area={"outlet"}
            h="100vh"
            w="100vw"
            justify={{ base: "inherit", xl: "center" }}
            bgColor="base.background"
            px="5px"
            overflowY="scroll"
          >
           
           {children}
          </Flex>
        </GridItem>
      </Grid>
    );
  }
  return (
    <Flex direction="column" minH="100vh">
      <TopNav />
      <Flex w="100%" h={`calc(100vh - 65px)`}>
        <TabNav w="50px" />
        <Flex flex={1} bgColor="base.background">

          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  
  );
};

export default MainLayout;
