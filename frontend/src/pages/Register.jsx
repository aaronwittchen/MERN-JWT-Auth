import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { register } from '../lib/api';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const accountType = import.meta.env.VITE_ACCOUNT_TYPE || '';

  // Theme-aware colors
  const formBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.300');

  // Password validation function
  const validatePassword = (passwordValue) => {
    const errors = [];

    if (passwordValue.length < 10) {
      errors.push('Password must be at least 10 characters long');
    }

    if (passwordValue.length > 24) {
      errors.push('Password must be at most 24 characters long');
    }

    if (passwordValue.includes(' ')) {
      errors.push('Password cannot contain spaces');
    }

    if (!/\d/.test(passwordValue)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[A-Z]/.test(passwordValue)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(passwordValue)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    return errors;
  };

  // Update password errors whenever password changes
  useEffect(() => {
    if (password) {
      const errors = validatePassword(password);
      setPasswordErrors(errors);
    } else {
      setPasswordErrors([]);
    }
  }, [password]);

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/', {
        replace: true,
      });
    },
  });

  const isFormValid =
    email &&
    password.length >= 10 &&
    passwordErrors.length === 0 &&
    password === confirmPassword;

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
        <Heading fontSize='4xl' mb={6}>
          Create an {accountType} account
        </Heading>
        <Box rounded='lg' bg={formBg} boxShadow='lg' p={8}>
          {isError && (
            <Box mb={3} color='red.400'>
              {error?.message || 'An error occurred'}
            </Box>
          )}
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && passwordErrors.length > 0 && (
                <Box mt={2}>
                  {passwordErrors.map((errorMessage, index) => (
                    <Text
                      key={index}
                      color='red.400'
                      fontSize='xs'
                      textAlign='left'
                      mt={1}
                    >
                      - {errorMessage}
                    </Text>
                  ))}
                </Box>
              )}
              {password && passwordErrors.length === 0 && (
                <Text color='green.400' fontSize='xs' textAlign='left' mt={2}>
                  - Password meets all requirements
                </Text>
              )}
            </FormControl>
            <FormControl id='confirmPassword'>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  isFormValid &&
                  createAccount({ email, password, confirmPassword })
                }
              />
              {confirmPassword && password !== confirmPassword && (
                <Text color='red.400' fontSize='xs' textAlign='left' mt={2}>
                  - Passwords do not match
                </Text>
              )}
            </FormControl>
            <Button
              my={2}
              isLoading={isPending}
              isDisabled={!isFormValid}
              onClick={() =>
                createAccount({ email, password, confirmPassword })
              }
            >
              Create Account
            </Button>
            <Text align='center' fontSize='sm' color={mutedTextColor}>
              Already have an account?{' '}
              <ChakraLink as={Link} to='/login'>
                Sign in
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Register;
