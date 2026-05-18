import React from 'react';

const ThemeSlider = ({ themeMode, toggleTheme }) => (
  <div className="theme-slider">
    <span title="Light Mode">☀️</span>
    <label>
      <input
        type="range"
        min="0"
        max="1"
        step="1"
        value={themeMode === 'light' ? '0' : '1'}
        onChange={toggleTheme}
      />
    </label>
    <span title="Dark Mode">🌙</span>
  </div>
);

export default ThemeSlider;
