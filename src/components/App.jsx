import { Header, Main } from './';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Detail from './detail';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect
} from "react-router-dom";

const DarkTheme = {
  elements: 'hsl(209, 23%, 22%)',
  background: 'hsl(207, 26%, 17%)',
  texts: 'hsl(0, 0%, 100%)',
  shadow: 'hsl(207, 26%, 15%)'
};

const LightTheme = {
  elements: 'hsl(0, 0%, 100%)',
  background: 'hsl(0, 0%, 98%)',
  texts: 'hsl(200, 15%, 8%)',
  shadow: 'hsl(0, 0%, 80%)',
  input: 'hsl(0, 0%, 52%)',
};

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

function App() {
  const [dark, setDark] = useState(
    localStorage.getItem('dark') === 'true'
  );
  useEffect(() => {
    localStorage.setItem('dark', dark);
    if (!dark) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    }
  }, [dark])
  const themesToggle = () => {
    setDark(!dark);
  };
  return (
    <ThemeProvider theme={themes[dark ? 'dark' : 'light']}>
      <Router>
        <Header theme={dark ? 'dark' : 'light'} themesToggle={themesToggle} />
        <Routes>
          <Route path="/" element={<Main theme={dark ? 'dark' : 'light'} />} />
          <Route path="/:name" element={<Detail theme={dark ? 'dark' : 'light'} />} />
        </Routes>
      </Router >
    </ThemeProvider >
  );
}

export default App;
