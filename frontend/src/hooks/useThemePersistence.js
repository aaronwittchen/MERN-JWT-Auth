import { useColorMode } from '@chakra-ui/react';

const useThemePersistence = () => {
  const { colorMode, setColorMode } = useColorMode();

  return { colorMode, setColorMode };
};

export default useThemePersistence;
