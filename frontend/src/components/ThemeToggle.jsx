import { IconButton, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import useThemePersistence from '../hooks/useThemePersistence';

const MotionIcon = motion.div;

const ThemeToggle = () => {
  const { colorMode, setColorMode } = useThemePersistence();
  const isDark = colorMode === 'dark';
  
  // Colors that adapt to the current theme
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('yellow.500', 'yellow.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)');

  const toggleColorMode = () => {
    setColorMode(isDark ? 'light' : 'dark');
  };

  return (
    <Tooltip 
      label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      placement="left"
      hasArrow
      bg={useColorModeValue('gray.800', 'gray.200')}
      color={useColorModeValue('white', 'gray.800')}
    >
      <IconButton
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        icon={
          <AnimatePresence initial={false} mode="popLayout">
            <MotionIcon
              key={colorMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }} // instant transition
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isDark ? (
                <SunIcon 
                  color={iconColor}
                  boxSize="20px"
                  transition="none"
                  _groupHover={{ 
                    transform: 'rotate(15deg) scale(1.1)',
                    filter: 'drop-shadow(0 0 12px rgba(255, 255, 0, 0.4))'
                  }}
                />
              ) : (
                <MoonIcon 
                  color={iconColor}
                  boxSize="20px"
                  transition="none"
                  _groupHover={{ 
                    transform: 'rotate(-15deg) scale(1.1)',
                    filter: 'drop-shadow(0 0 12px rgba(255, 255, 0, 0.4))'
                  }}
                />
              )}
            </MotionIcon>
          </AnimatePresence>
        }
        onClick={toggleColorMode}
        position="fixed"
        top="1rem"
        right="1rem"
        zIndex={1000}
        size="lg"
        borderRadius="full"
        bg={bgColor}
        border="2px solid"
        borderColor={borderColor}
        _hover={{
          bg: hoverBgColor,
          transform: 'scale(1.05)',
          boxShadow: `0 8px 25px ${shadowColor}`,
        }}
        _active={{ transform: 'scale(0.95)' }}
        _focus={{
          outline: 'none',
          ring: 2,
          ringColor: iconColor,
          ringOffset: 2,
        }}
        transition="all 0.1s cubic-bezier(0.4, 0, 0.2, 1)"
        boxShadow={`0 4px 12px ${shadowColor}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleColorMode();
          }
        }}
        sx={{
          '@keyframes pulse': {
            '0%, 100%': { boxShadow: `0 4px 12px ${shadowColor}` },
            '50%': { boxShadow: `0 4px 20px ${shadowColor}, 0 0 30px ${iconColor}40` },
          },
          animation: isDark ? 'pulse 2s infinite' : 'none',
        }}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
