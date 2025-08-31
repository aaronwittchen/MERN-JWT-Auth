import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import buttonTheme from './buttonTheme';
import linkTheme from './linkTheme';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  // Enable localStorage persistence
  storageManager: {
    get: () => {
      try {
        return localStorage.getItem('chakra-ui-color-mode');
      } catch {
        return 'dark';
      }
    },
    set: (value) => {
      try {
        localStorage.setItem('chakra-ui-color-mode', value);
      } catch {
        // Handle localStorage errors silently
      }
    },
  },
};

const colors = {
  theme: {
    primary: baseTheme.colors.blue[500],
    primaryDark: baseTheme.colors.blue[600],
  },
  text: {
    muted: baseTheme.colors.gray[400],
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
      color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    '*': {
      transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
    },
  }),
};

const components = {
  Button: buttonTheme,
  Link: linkTheme,
  Input: {
    defaultProps: {
      focusBorderColor: 'blue.500',
    },
    variants: {
      outline: (props) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          _hover: {
            borderColor: props.colorMode === 'dark' ? 'gray.500' : 'gray.400',
          },
          _focus: {
            borderColor: 'blue.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
          },
        },
      }),
    },
  },
  FormLabel: {
    baseStyle: (props) => ({
      color: props.colorMode === 'dark' ? 'gray.300' : 'gray.700',
    }),
  },
};

const theme = extendTheme({
  config,
  colors,
  styles,
  components,
});

export default theme;
