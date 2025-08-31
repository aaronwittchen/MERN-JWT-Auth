import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import useDeleteSession from "../hooks/useDeleteSession";

const SessionCard = ({ session }) => {
  const { _id, createdAt, userAgent, isCurrent } = session;

  // Theme-aware colors
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");

  const { deleteSession, isPending } = useDeleteSession(_id);

  return (
    <Flex p={3} borderWidth="1px" borderRadius="md">
      <Box flex={1}>
        <Text fontWeight="bold" fontSize="sm" mb={1}>
          {new Date(createdAt).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
          {isCurrent && " (current session)"}
        </Text>
        <Text color={mutedTextColor} fontSize="xs">
          {userAgent}
        </Text>
      </Box>
      {!isCurrent && (
        <Button
          size="sm"
          variant="ghost"
          ml={4}
          alignSelf="center"
          fontSize="xl"
          color="red.400"
          title="Delete Session"
          onClick={deleteSession}
          isLoading={isPending}
        >
          &times;
        </Button>
      )}
    </Flex>
  );
};

export default SessionCard;
