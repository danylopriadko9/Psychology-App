import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import React from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') setIsDarkMode(true);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <>
      <div
        className='flex px-2 py-2 justify-center items-center gap-2 rounded-md border cursor-pointer'
        onClick={() => setIsDarkMode((prev: boolean) => !prev)}
      >
        <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </div>
    </>
  );
};

export default ThemeToggle;
