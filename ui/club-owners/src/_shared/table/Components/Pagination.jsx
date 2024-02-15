/* eslint-disable react/prop-types */
import { HStack, Icon } from "@chakra-ui/react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";

const Pagination = ({ table }) => {
  return (
    <HStack
      flex={1}
      py="10px"
      align="center"
      spacing="10px"
      justify="center"
      maxH="60px"
    >
      <Icon
        as={BiChevronsLeft}
        color={!table.getCanPreviousPage() ? "grey" : "black"}
        h="25px"
        w="auto"
        onClick={() => table.setPageIndex(0)}
        _hover={{
          cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer",
        }}
      />
      <Icon
        as={BiChevronLeft}
        color={!table.getCanPreviousPage() ? "grey" : "black"}
        h="25px"
        w="auto"
        onClick={() => table.previousPage()}
        _hover={{
          cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer",
        }}
      />
      <Icon
        as={BiChevronRight}
        color={!table.getCanNextPage() ? "grey" : "black"}
        h="25px"
        w="auto"
        onClick={() => table.nextPage()}
        _hover={{
          cursor: !table.getCanNextPage() ? "not-allowed" : "pointer",
        }}
      />
      <Icon
        as={BiChevronsRight}
        color={!table.getCanNextPage() ? "grey" : "black"}
        h="25px"
        w="auto"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        _hover={{
          cursor: !table.getCanNextPage() ? "not-allowed" : "pointer",
        }}
      />
    </HStack>
  );
};

export default Pagination;
