import React, { useState, useEffect } from 'react';

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    } else {
      document.body.classList.remove('dark-mode');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="theme-switch-checkbox">
        <input 
          type="checkbox" 
          id="theme-switch-checkbox" 
          className="focusable" 
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
      <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'} theme-icon`}></i>
    </div>
  );
};

export default ThemeSwitch;
