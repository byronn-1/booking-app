import { Button, Icon } from "@chakra-ui/react";
import React from "react";

export const IconButton = ({ icon, onClick }) => {
  return (
    <Button onClick={onClick} m="10px" role="group">
      <Icon  as={icon} fill="base.white" stroke="base.white" _groupHover={{ fill: "base.black" }} w="25px" />
    </Button>
  );
};
