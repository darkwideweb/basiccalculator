import React from 'react';
import Calculator from './components/Calculator';
import { Container, Typography } from '@mui/material';
import { ThemeProvider } from './components/ThemeContext';
import './index.css';

const AppContent = () => {
  
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Калькулятор 
      </Typography>
      <Calculator />
    </Container>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
