import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, FieldArray, Form, Formik } from "formik";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import CalendarTimeline from "./CalanderTimeline";
import { submitBooking } from "./service/bookingService";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson } from "@mobiscroll/react";
import Logo from "../assets/logo-neom.png"
const initialValues = {
  // TODO: Call /booking/details to populate this list first
  users: [
    {
      // firstName: "",
      // lastName: "",
      name: "",
      nationality: "",
      passportNumber: "",
      department: "",
      vehicleType: "",
      carPlate: "",
      // phoneNumber: "",
      dateArriving: "",
      dateLeaving: "",
      accommodationType: "",
      foodRestrictions: "",
      notes: "",
    },
  ],
};

const validationSchema = Yup.object({
  users: Yup.array()
    .of(
      Yup.object({
        // firstName: Yup.string().required("Required"),
        // lastName: Yup.string().required("Required"),
        // phoneNumber: Yup.string().required("Required"),
        name: Yup.string().required("Required"),
        nationality: Yup.string().required("Required"),
        passportNumber: Yup.string().notRequired(),
        department: Yup.string().notRequired(),
        vehicleType: Yup.string().notRequired(),
        carPlate: Yup.string().notRequired(),
        dateArrived: Yup.date().required("Required").nullable(),
        dateLeaving: Yup.date()
          .required("Required")
          .nullable()
          .when("dateArrived", (dateArrived, yup) =>
            yup.test(
              "dateLeaving",
              "End date must be after start date",
              function (dateLeaving) {
                return (
                  dateArrived &&
                  dateLeaving &&
                  new Date(dateLeaving) > new Date(dateArrived)
                );
              }
            )
          ),
        accommodationType: Yup.string().notRequired(),
        foodRestrictions: Yup.string().notRequired(),
        notes: Yup.string().notRequired(),
      })
    )
    .required("Must have at least one user"),
});

const Booking = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [initialFormValues, setInitialFormValues] = useState(initialValues);

  const { data: bookingDetails } = useQuery(["bookingsData"], () =>
    axios.get("http://localhost:3001/booking/details").then((res) => res.data)
  );

  const handleFormSubmit = async (values) => {
    values.users = values.users.map((user) => ({
      ...user,
    }));
    console.log(values);

    // Adjust form values to match API structure
    const bookingsData = values.users.map((user) => ({
      name: user.name,
      nationality: user.nationality,
      passportNumber: user.passportNumber,
      department: user.department,
      vehicleType: user.vehicleType,
      carPlate: user.carPlate,
      dateArrived: user.dateArriving,
      dateLeaving: user.dateLeaving,
      accommodationType: user.accommodationType,
      foodRestrictions: user.foodRestrictions,
      notes: user.notes,
    }));

    try {
      // Send a single PUT request with the array of bookings
      const response = await axios.put(
        "http://localhost:3001/booking",
        bookingsData
      );

      console.log(response);
      if (response.status === 200) {
        navigate("/calendar");
      } else {
        console.error("Failed to submit booking:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // useEffect(() => {
  //   if (bookingDetails) {
  //     const updatedFormValues = bookingDetails.map((booking) => ({
  //       name: booking.Person.name,
  //       nationality: booking.Person.nationality,
  //       passportNumber: "", // Add any data conversion necessary
  //       department: booking.Person.department,
  //       vehicleType: booking.Person.vehicleType,
  //       carPlate: booking.Person.carPlate,
  //       dateArrived: new Date(booking.reserved_from)
  //         .toISOString()
  //         .split("T")[0],
  //       dateLeaving: new Date(booking.reserved_to).toISOString().split("T")[0],
  //       accommodationType: booking.accommodationType,
  //       foodRestrictions: booking.Person.foodRestrictions,
  //       notes: booking.notes,
  //     }));
  //
  //     setInitialFormValues({ users: updatedFormValues });
  //   }
  // }, [bookingDetails]);

  // Get events for calendar view
  const [myEvents, setEvents] = React.useState([]);

  React.useEffect(() => {
    console.log("Getting bookings!");
    // getJson('https://trial.mobiscroll.com/events/?vers=5', (bookings) => {
    getJson(
      "http://localhost:3001/booking/details",
      (events) => {
        console.log("Got bookings!");
        // console.log(bookings);
        // const events = bookings.map((b) => ({
        //   start: b.dateArriving,
        //   end: b.dateLeaving,
        //   text: b.name,
        //   color: "#6e7f29"
        // }));
        setEvents(events);
        console.log(events);
      },
      "json"
    );
  }, []);

  const view = React.useMemo(() => {
    return {
      // calendar: { type: 'month' }
      timeline: {
        type: "month",
      },
    };
  }, []);

  const myResources = React.useMemo(() => {
    return [
      {
        id: 1,
        name: "MV000",
        color: "#e20000",
      },
      {
        id: 2,
        name: "MV001",
        color: "#76e083",
      },
      {
        id: 3,
        name: "MV002",
        color: "#4981d6",
      },
      {
        id: 4,
        name: "MV003",
        color: "#e25dd2",
      },
      {
        id: 5,
        name: "MV004",
        color: "#1dab2f",
      },
      {
        id: 6,
        name: "MV005",
        color: "#d6d145",
      },
      {
        id: 7,
        name: "MV006",
        color: "#34c8e0",
      },
    ];
  }, []);
  const goToCalendar = () => {
    navigate("/calendar");
  };

  return (
    <>
      <Flex h="100vh" w="100vw" bgColor="base.background" direction="column">
        <Flex justify="space-between" bgColor="base.menubar" h="100px" w="100vw" mb={4}>
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
            ml="50px"
            mr="20px"
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            onClick={goToCalendar}
          >
            Go to All Bookings
          </Button>
        </Flex>
        {/*<Center alignItems="flex-start" p="30px">*/}
        <Box p="30px">
          <Flex direction="column">
            <Formik
              initialValues={initialFormValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ values, touched, handleSubmit, isSubmitting }) => (
                <Form>
                  {/*<Flex w="1600px" ml="auto" mr="auto" maxWidth="2500px">*/}
                  <Flex
                    ml="auto"
                    mr="auto"
                    maxWidth="2000px"
                    width="100%"
                    paddingLeft="20px"
                    paddingRight="20px"
                  >
                    <FieldArray name="users">
                      {({ remove, unshift }) => (
                        <VStack spacing={5}>
                          <Button
                            h="50px"
                            w="180px"
                            borderRadius="25"
                            onClick={() =>
                              unshift({
                                name: "",
                                nationality: "",
                                passportNumber: "",
                                department: "",
                                vehicleType: "",
                                carPlate: "",
                                dateArrived: "",
                                dateLeaving: "",
                                accommodationType: "",
                                foodRestrictions: "",
                                notes: "",
                              })
                            }
                          >
                            <AddIcon ml="-5px" mr="10px" /> Add Booking
                          </Button>
                          {values.users.length > 0 &&
                            values.users.map((user, index) => (
                              <Flex
                                direction="row"
                                justifyContent="space-between"
                                key={index}
                              >
                                <Field name={`users.${index}.firstName`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]?.firstName
                                      }
                                    >
                                      <Input {...field} placeholder="Name" />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]?.name}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name={`users.${index}.nationality`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]?.nationality
                                      }
                                    >
                                      <Input
                                        {...field}
                                        placeholder="Nationality"
                                      />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]?.nationality}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name={`users.${index}.passportNumber`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]?.passportNumber
                                      }
                                    >
                                      <Input
                                        {...field}
                                        placeholder="Passport Number"
                                      />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]
                                            ?.passportNumber}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name={`users.${index}.department`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]?.department
                                      }
                                    >
                                      <Input
                                        {...field}
                                        placeholder="Department"
                                      />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]?.department}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>

                                <Field name={`users.${index}.vehicleType`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]?.vehicleType
                                      }
                                    >
                                      <Input
                                        {...field}
                                        placeholder="Vehicle Type"
                                      />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]?.vehicleType}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name={`users.${index}.carPlate`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]?.carPlate
                                      }
                                    >
                                      <Input
                                        {...field}
                                        placeholder="Car Plate"
                                      />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]?.carPlate}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>

                                <Field name={`users.${index}.dateArriving`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]?.dateArriving
                                      }
                                    >
                                      <Input
                                        fontWeight="light"
                                        {...field}
                                        type="date"
                                        placeholder="Date Arriving"
                                      />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]
                                            ?.dateArriving}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name={`users.${index}.dateLeaving`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]?.dateLeaving
                                      }
                                    >
                                      <Input
                                        fontWeight="light"
                                        {...field}
                                        type="date"
                                        placeholder="Date Leaving"
                                      />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]?.dateLeaving}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field
                                  name={`users.${index}.accommodationType`}
                                >
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]
                                          ?.accommodationType
                                      }
                                    >
                                      <Input
                                        {...field}
                                        placeholder="Accommodation Type"
                                      />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]
                                            ?.accommodationType}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name={`users.${index}.foodRestrictions`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]
                                          ?.foodRestrictions
                                      }
                                    >
                                      <Input
                                        {...field}
                                        placeholder="Food Restrictions"
                                      />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]
                                            ?.foodRestrictions}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name={`users.${index}.notes`}>
                                  {({ field, form }) => (
                                    <FormControl
                                      ml="10px"
                                      isInvalid={
                                        form.errors.users &&
                                        form.errors.users[index]?.notes
                                      }
                                    >
                                      <Input {...field} placeholder="Notes" />
                                      <FormErrorMessage>
                                        {form.errors.users &&
                                          form.errors.users[index]?.notes}
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                </Field>
                                {/*<Button ml="10px" onClick={() => remove(index)}>*/}
                                {/*    <DeleteIcon/>*/}
                                {/*</Button>*/}
                                <Flex direction="row" alignItems="center">
                                  <Button
                                    ml="10px"
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Flex>
                              </Flex>
                            ))}
                        </VStack>
                      )}
                    </FieldArray>

                    <Button
                      type="submit"
                      alignSelf="flex-end"
                      flexGrow={0}
                      minWidth="auto"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>

            <Eventcalendar
              theme="ios"
              themeVariant="light"
              clickToCreate={false}
              dragToCreate={false}
              dragToMove={false}
              dragToResize={false}
              eventDelete={false}
              data={myEvents}
              view={view}
              resources={myResources}
              eventList={true}
            />
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Booking;
