import React, { useEffect, useState, useMemo } from "react";
import { Box, Button, Center, Flex, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { eventData } from "../_mockData/responses/bookings/eventData";
import { resourceData } from "../_mockData/responses/bookings/resourceData";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import CalendarTimeline from "./CalanderTimeline";
import Logo from "../assets/logo-neom.png"

// import bookingResponse from '../_mockData/responses/bookings/booking_details.json'

const AllBookings = () => {
  const navigate = useNavigate();

  const [processedBookings, setProcessedBookings] = useState([]);
  // const bookings = bookingResponse;

  const { data: bookings } = useQuery(["bookingsData"], () =>
    axios.get("http://localhost:3001/booking/details").then((res) => res.data)
  );

  useEffect(() => {
    function postProcessData(data) {
      console.log(data);
      return data
        .map((item, index) => {
          try {
            return {
              dateArrived: new Date(item.reserved_from)
                .toISOString()
                .split("T")[0],
              dateLeaving: new Date(item.reserved_to)
                .toISOString()
                .split("T")[0],
              firstName: item.Person.first_name,
              lastName: item.Person.last_name,
            };
          } catch (error) {
            console.error(`Error processing element at index ${index}:`, item);
            console.error(error);
            return null;
          }
        })
        .filter((item) => item !== null);
    }

    if (bookings) {
      const processedData = postProcessData(bookings);
      setProcessedBookings(processedData);
    }
  }, [bookings]);

  const goToBooking = () => {
    navigate("/");
  };

  return (
    <Flex h="100vh" w="100vw" bgColor="base.background" direction="column">
      <Flex
        justify="space-between"
        bgColor="base.menubar"
        h="100px"
        w="100vw"
        mb={4}
      >
        <Box ml="50px" boxSize="70px" mt="5px">
          <Image src={Logo} alt="Neom Logo" />
        </Box>
        <Button
          h="45px"
          backgroundColor="white"
          borderRadius="25px"
          color="base.menubar"
          fontWeight="semi-bold"
          mt="30px"
          rightIcon={<ArrowBackIcon />}
          colorScheme="teal"
          onClick={goToBooking}
          mr="20px"
        >
          To Booking Form
        </Button>
      </Flex>
      <Center alignItems="flex-start" p="50px">
        <CalendarTimeline bookings={processedBookings} />
      </Center>
    </Flex>
  );
};

export default AllBookings;
