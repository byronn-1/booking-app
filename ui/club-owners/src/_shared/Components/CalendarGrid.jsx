import { Box, VStack, Text, Grid, GridItem } from "@chakra-ui/react";

export const renderCalendarGrid = () => {
    return (
        <Grid templateColumns="repeat(7, 1fr)" gap={4}>
            {weekDays.map((day, dayIndex) => (
                <VStack key={dayIndex} spacing={0}>
                    {hours.map(hour => (
                        <Box key={hour} h="60px" borderTop="1px" borderColor="gray.200">
                            {/* Optional: Display the hour here */}
                        </Box>
                    ))}
                    {/* Render sessions for the day */}
                    {renderSessionsForDay(dayIndex)}
                </VStack>
            ))}
        </Grid>
    );
};