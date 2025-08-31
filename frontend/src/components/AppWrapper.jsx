import ThemeToggle from './ThemeToggle';

const AppWrapper = ({ children }) => {
  return (
    <>
      <ThemeToggle />
      {children}
    </>
  );
};

export default AppWrapper;
