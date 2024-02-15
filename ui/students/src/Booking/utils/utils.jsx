import { Box, Text, Tooltip } from "@chakra-ui/react";
import {
  addMonths,
  parse,
  isSameDay,
  isWithinInterval,
  addDays,
  differenceInDays,
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  getMonth,
  isBefore,
  isAfter,
  subMonths,
  getDaysInMonth,
} from "date-fns";


export const daysInCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  

 export const createMonthColumns = (daysInMonth, month, bookings) => {
    // Create columns
    const dayColumns =  daysInMonth.map((day) => {
      const objKey = format(day, "EEE/d");
      const dayKey = format(day, "EEE d");
      // console.log(typeof objKey)
      return {
        id: objKey,
        header: () => <span>{dayKey}</span>,
        accessorKey: objKey,
        cell: (props) => {
          const day = parse(objKey, "EEE/d", new Date());

          // Since each row represents a single booking, we can get the booking details directly from row.original
          const booking = props.row.original;

          const bookingStart = parse(
            booking.dateArrived,
            "yyyy-MM-dd",
            new Date()
          );
          const bookingEnd = parse(
            booking.dateLeaving,
            "yyyy-MM-dd",
            new Date()
          );

          const bookingStartMonth = getMonth(bookingStart);
          const bookingEndMonth = getMonth(bookingEnd);
          const currentMonth = getMonth(day);
          // Check if the date of the cell is within the booking range
          if (
            (isSameDay(day, bookingStart) || isAfter(day, bookingStart)) && 
  (isSameDay(day, bookingEnd) || isBefore(day, bookingEnd))
          ) {
            let bookingColor;
            let borderLeftCorners;
            let borderRightCorners;
            if (isSameDay(day, bookingStart)) {
              bookingColor = "teal.500"; // booking-start color
              borderLeftCorners = "6px";
              borderRightCorners = "0px";
            } else if (isSameDay(day, bookingEnd)) {
              bookingColor = "teal.500"; // booking-end color
              borderLeftCorners = "0px";
              borderRightCorners = "6px";
            } else {
              bookingColor = "teal.500"; // booking-middle color
              borderLeftCorners = "0px";
              borderRightCorners = "0px";
            }
            // Determine if we should render the title
            const bookingMid = addDays(
              bookingStart,
              differenceInDays(bookingEnd, bookingStart) / 2
            );
            const shouldRenderTitle = isSameDay(day, bookingMid);

            // Render the booking block
            return (
              <Tooltip
                label={`${booking.firstName} ${booking.lastName}, ${booking.company}`}
              >
                <Box
                  m="0"
                  p="0px"
                  w="100%"
                  h="50px"
                  borderLeftRadius={borderLeftCorners}
                  borderRightRadius={borderRightCorners}
                  bg={bookingColor}
                >
                  {shouldRenderTitle && (
                    <Box
                      w="100%"
                      h="30px"
                      p="10px"
                      bg="teal.500"
                      color="white"
                    >
                      {`${booking.firstName} ${booking.lastName}`}
                    </Box>
                  )}
                </Box>
              </Tooltip>
            );
          }

          return null;
        },
      };
    });
  
    return [
      {
        id: "roomNumberHeader",
        header: "",
        columns: [
          {
            id: "roomNumber",
            header: () => <Text>Room Number</Text>,
            accessorKey: "roomNumber",
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        id: month,
        header: format(month, "MMM/yyyy"),
        columns: dayColumns,
      },
    ];
  };
  
  
  
  
  
  
  