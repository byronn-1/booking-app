import React from "react";
import CardDropdown from "../../dropdown/CardDropdown";
import {
  BsChevronDown,
  BsTrophyFill,
  BsFillPersonFill,
  BsFillShieldFill,
} from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import {
  Button,
  Divider,
  Flex,
  Image,
  useMediaQuery,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import Logo from "../../../../assets/oval-logo-black-font.png";
import SaracensLogo from "../../../../assets/team-logos/Saracens.png";
import { IconButton } from "../../button/IconButton";
import { TabNav } from "./TabNav";

import PlayerSearchModal from "../../modal/PlayerSearchModal";
import RefSearchModal from "../../modal/RefSearchModal";
import TeamsSearchModal from "../../modal/TeamsSearchModal";


export const TopNav = () => {
  const [isMobile] = useMediaQuery(`(max-width: 30em)`);
  const [isTablet] = useMediaQuery(`(max-width: 80em)`);

  const {
    isOpen: compIsOpen,
    onOpen: compOnOpen,
    onClose: compOnClose,
  } = useDisclosure();

  const {
    isOpen: playerIsOpen,
    onOpen: playerOnOpen,
    onClose: playerOnClose,
  } = useDisclosure();
  const {
    isOpen: teamsIsOpen,
    onOpen: teamsOnOpen,
    onClose: teamsOnClose,
  } = useDisclosure();
  const {
    isOpen: refIsOpen,
    onOpen: refOnOpen,
    onClose: refOnClose,
  } = useDisclosure();

  const [placement, setPlacement] = React.useState("right");

  if (isMobile) {
    return (
      <Flex
        bgColor="base.nav"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px"
        borderColor="gray.200"
        h="40px"
      >
        <Flex direction="row" ml="2vw" alignItems="center">
          <Image src={Logo} w="100%" maxW="30px" h="auto" />
          <Image src={SaracensLogo} w="100%" maxW="30px" h="auto" />
          <Divider
            orientation="vertical"
            bgColor="base.divider"
            h="25px"
            w="1px"
            mx="10px"
          />

          <CardDropdown
            isMobile={isMobile}
            isTablet={isTablet}
            icon={BsTrophyFill}
            placeholder="Competitions"
            ml="2%"
            size="sm"
          />
        </Flex>
        <Button size="sm" mr="10px">
          Query Tool
        </Button>
        <IconButton
          paddingX="15px"
          colorScheme="blue"
          onClick={compOnOpen}
          size="sm"
          icon={IoMenuOutline}
        />
        <Drawer
          placement={placement}
          onClose={compOnClose}
          isOpen={compIsOpen}
          size="xs"
        >
          <DrawerOverlay />
          <DrawerContent bg="base.white">
            <DrawerBody>
              <DrawerCloseButton>
                <Icon as={IoClose} size="md" />
              </DrawerCloseButton>
              <Flex direction="column">
                <Flex h="70px" direction="row">
                  <IconButton
                    onClick={() => {playerOnOpen(); compOnClose()}}
                    icon={BsFillPersonFill}
                    ml="10px"
                    mr="10px"
                    placeholder="Players"
                    size="md"
                  />
                  <IconButton
                    onClick={() => {refOnOpen(); compOnClose()}}
                    icon={BsFillShieldFill}
                    ml="10px"
                    mr="10px"
                    placeholder="Officials"
                    size="md"
                  />
                  <IconButton
                    onClick={() => {teamsOnOpen(); compOnClose()}}
                    icon={RiTeamFill}
                    ml="10px"
                    placeholder="Team"
                    size="md"
                  />
                </Flex>
                <TabNav borderRightWidth="1px" borderRightColor="base.border" />
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <PlayerSearchModal isOpen={playerIsOpen} onClose={playerOnClose} />
        <RefSearchModal isOpen={refIsOpen} onClose={refOnClose} />
        <TeamsSearchModal isOpen={teamsIsOpen} onClose={teamsOnClose} />
      </Flex>
    );
  }

  return (
    <Flex
      pl="15px"
      py="10px"
      direction="row"
      w="100%"
      alignItems="center"
      bgColor="base.white"
      h="65px"
    >
      <Image src={Logo} w="100%" maxW="45px" h="auto" alt="Oval Insights" />
      <Image
        src={SaracensLogo}
        w="100%"
        alt="Own Team Logo"
        maxW="50px"
        h="auto"
      />
      <Divider
        orientation="vertical"
        bgColor="base.divider"
        h="40px"
        w="1px"
        mx="15px"
      />
      {isTablet ? (
        <>
          <Flex
            direction="row"
            mr="5px"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
          >
            <CardDropdown
              isTablet={isTablet}
              icon={BsTrophyFill}
              bg="base.nav"
              placeholder="Competitions"
            />
            <Flex alignItems="center">
              <Button size="md">Query Tool</Button>
              <IconButton
                paddingX="15px"
                colorScheme="blue"
                mr="5%"
                onClick={compOnOpen}
                size="sm"
                icon={IoMenuOutline}
              />
            </Flex>
          </Flex>
          <Drawer
            placement={placement}
            onClose={compOnClose}
            isOpen={compIsOpen}
            size="sm"
          >
            <DrawerOverlay />
            <DrawerContent bg="base.white">
              <DrawerBody>
                <DrawerCloseButton>
                  <Icon as={IoClose} />
                </DrawerCloseButton>
                <Flex direction="column">
                  <Flex direction="row" mt="35px">
                    <Button
                      onClick={() => {playerOnOpen(); compOnClose()}}
                      ml="10px"
                      mr="10px"
                      placeholder="Players"
                      size="md"
                    >
                      Players
                    </Button>
                    <Button
                      onClick={() => {refOnOpen(); compOnClose()}}
                      ml="10px"
                      mr="10px"
                      placeholder="Officials"
                      size="md"
                    >
                      Officals
                    </Button>
                    <Button
                      onClick={() => {teamsOnOpen(); compOnClose()}}
                      ml="10px"
                      placeholder="Teams"
                      size="md"
                    >
                      Teams
                    </Button>
                  </Flex>
                  <TabNav
                    area={"tabNav"}
                    borderRightWidth="1px"
                    borderRightColor="base.border"
                  />
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <PlayerSearchModal isOpen={playerIsOpen} onClose={playerOnClose} />
          <RefSearchModal isOpen={refIsOpen} onClose={refOnClose} />
          <TeamsSearchModal isOpen={teamsIsOpen} onClose={teamsOnClose} />
        </>
      ) : (
        <>
          <Flex direction="row" justifyContent="space-between" w="full">
            <Flex flex={1}>
              <CardDropdown placeholder="Competitions" />
              <Button
                onClick={playerOnOpen}
                ml="10px"
                mr="10px"
                placeholder="Players"
                size="md"
              >
                Players
              </Button>

              <Button
                onClick={refOnOpen}
                ml="10px"
                mr="10px"
                placeholder="Officials"
                size="md"
              >
                Officials
              </Button>
              <Button
                onClick={teamsOnOpen}
                ml="10px"
                placeholder="Teams"
                size="md"
              >
                Teams
              </Button>
            </Flex>
            <Flex mr="10px">
              <Button size="md">Query Tool</Button>
            </Flex>
          </Flex>
          <PlayerSearchModal isOpen={playerIsOpen} onClose={playerOnClose} />
          <RefSearchModal isOpen={refIsOpen} onClose={refOnClose} />
          <TeamsSearchModal isOpen={teamsIsOpen} onClose={teamsOnClose} />
        </>
      )}
    </Flex>
  );
};
