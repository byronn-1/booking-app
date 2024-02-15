import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';


 const PopoverWrapper = ({ children, header, message }) => {
    return (
      <Popover >
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>{header}</PopoverHeader>
          <PopoverBody>
            {message}
            <PopoverCloseButton />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
 };
  

export default PopoverWrapper;