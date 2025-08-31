import { Alert, AlertIcon, Center, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const { email, verified, createdAt } = user;
  
  // Theme-aware colors
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.300');
  return (
    <Center mt={16} flexDir="column">
      <Heading mb={4}>My Account</Heading>
      {!verified && (
        <Alert status="warning" w="fit-content" borderRadius={12} mb={3}>
          <AlertIcon />
          Please verify your email
        </Alert>
      )}
      <Text color={textColor} mb={2}>
        Email:{" "}
        <Text as="span" color={mutedColor}>
          {email}
        </Text>
      </Text>
      <Text color={textColor}>
  Created on{" "}
  <Text as="span" color={mutedColor}>
    {new Date(createdAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </Text>
</Text>

    </Center>
  );
};
export default Profile;
