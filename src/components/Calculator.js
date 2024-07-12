import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, TextField, Paper, Typography } from '@mui/material';
import { evaluate } from 'mathjs';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  const handleBackspace = useCallback(() => {
    setInput(input.slice(0, -1));
  }, [input]);

  const handleCalculate = useCallback(() => {
    try {
      const result = evaluate(input);
      setHistory([...history, `${input} = ${result}`]);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  }, [input, history]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.key >= '0' && event.key <= '9') || event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '.') {
        setInput((prev) => prev + event.key);
      } else if (event.key === 'Enter') {
        handleCalculate();
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (event.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [input, handleClear, handleBackspace, handleCalculate]);

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        inputProps={{ readOnly: true }}
        style={{ marginBottom: '10px' }}
      />
      <Grid container spacing={1}>
        {['7', '8', '9', '/'].map((value) => (
          <Grid item xs={3} key={value}>
            <Button fullWidth variant="contained" onClick={() => handleClick(value)}>
              {value}
            </Button>
          </Grid>
        ))}
        {['4', '5', '6', '*'].map((value) => (
          <Grid item xs={3} key={value}>
            <Button fullWidth variant="contained" onClick={() => handleClick(value)}>
              {value}
            </Button>
          </Grid>
        ))}
        {['1', '2', '3', '-'].map((value) => (
          <Grid item xs={3} key={value}>
            <Button fullWidth variant="contained" onClick={() => handleClick(value)}>
              {value}
            </Button>
          </Grid>
        ))}
        {['0', '.', '=', '+'].map((value) => (
          <Grid item xs={3} key={value}>
            <Button
              fullWidth
              variant="contained"
              onClick={value === '=' ? handleCalculate : () => handleClick(value)}
            >
              {value}
            </Button>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={handleClear} color="error">
            Очистить
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={handleBackspace} color="warning">
            Удалить
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        История
      </Typography>
      <Paper variant="outlined" style={{ padding: '10px', height: '150px', overflowY: 'auto' }}>
        {history.map((entry, index) => (
          <Typography key={index}>{entry}</Typography>
        ))}
      </Paper>
    </Paper>
  );
};

export default Calculator;
