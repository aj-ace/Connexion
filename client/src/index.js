import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { purple, pink } from '@material-ui/core/colors'
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[300]
    },
    secondary: {
      main: pink.A700
    },
  },
  spacing: 10
})

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
     <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
