import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
  parseISO,
} from "date-fns";

const CalendarTimeline = ({ bookings }) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [columns, setColumns] = useState([]);

  console.log("Updated bookings", bookings);

  // Create columns
  useEffect(() => {
    const currentMonthStart = startOfMonth(currentMonth);
    const currentMonthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({
      start: currentMonthStart,
      end: currentMonthEnd,
    });


    // Create columns
    const month = format(currentMonthStart, "MMM/yyyy");
    const dayColumns = days.map((day) => {
      const objKey = format(day, "EEE/d");
      const dayKey = format(day, "EEE d");
      return {
        id: objKey,
        header: () => <span>{dayKey}</span>,
        accessorKey: objKey,
        cell: (props) => {
          const booking = props.row.original;
          const bookingStart = parseISO(booking.dateArrived);
          const bookingEnd = parseISO(booking.dateLeaving);
    
          const currentMonthStartMonth = getMonth(currentMonthStart);
          const currentMonthEndMonth = getMonth(currentMonthEnd);
          const currentCalendarMonth = getMonth(currentMonth);
          const monthDayIsIn = getMonth(day);

          if (
            (isSameDay(day, bookingStart) || isAfter(day, bookingStart)) &&
            (isSameDay(day, bookingEnd) || isBefore(day, bookingEnd)) &&
            (monthDayIsIn >= currentMonthStartMonth && monthDayIsIn <= currentMonthEndMonth)
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
                    <Box w="100%" h="30px" p="10px" bg="teal.500" color="white">
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

    const newColumns = [
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
        header: month,
        columns: dayColumns,
      },
    ];

    setColumns(newColumns);
  }, [currentMonth, bookings]);

  const myColumns = useMemo(() => {
    return columns || [];
  }, [columns]);
  const myEvents = useMemo(() => {
    return bookings || [];
  }, [bookings]);

  const table = useReactTable({
    data: myEvents,
    columns: myColumns,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <Flex direction="column" bgColor="base.white" borderRadius="6px">
      <Flex
        bgColor="base.white"
        borderRadius="6px"
        w="100%"
        justify="space-between"
      >
        <Button
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          w="150px"
        >
          Previous Month
        </Button>
        <Button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          w="150px"
        >
          Next Month
        </Button>
      </Flex>
      <Box overflowX="scroll">
        <Table bgColor="base.white">
          <Thead>
            {table.getHeaderGroups()?.map((headerGroup, index) => (
              <Tr
                bgColor={index === 0 ? "base.brand" : "base.white"}
                key={index}
              >
                {headerGroup.headers?.map((header, index) => (
                  <Th
                    wordBreak="unset"
                    borderX="1px"
                    borderColor="base.border"
                    key={index}
                    whiteSpace="break-spaces"
                    colSpan={header.colSpan}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table?.getRowModel()?.rows?.map((row, index) => (
              <Tr key={row.id} minHeight="50px" h="50px">
                {row.getVisibleCells()?.map((cell) => (
                  <Td key={cell.id} m="0" p="0" h="50px">
                    {flexRender(
                      cell?.column?.columnDef?.cell,
                      cell?.getContext()
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default CalendarTimeline;
