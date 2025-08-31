import { useSearchParams, Link } from "react-router-dom";
import {
  Container,
  Flex,
  Link as ChakraLink,
  VStack,
  Alert,
  AlertIcon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;

  // Theme-aware colors
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Flex minH="100vh" justify="center">
      <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <VStack align="center" spacing={6}>
            <Alert status="error" w="fit-content" borderRadius={12}>
              <AlertIcon />
              Invalid Link
            </Alert>
            <Text color={mutedTextColor}>The link is either invalid or expired.</Text>
            <ChakraLink as={Link} to="/password/forgot" replace>
              Request a new password reset link
            </ChakraLink>
          </VStack>
        )}
      </Container>
    </Flex>
  );
};
export default ResetPassword;
