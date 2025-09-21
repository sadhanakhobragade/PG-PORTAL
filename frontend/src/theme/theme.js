import { createTheme } from '@mui/material/styles';


const theme = createTheme({
palette: {
primary: { main: '#1976d2' },
secondary: { main: '#ff9800' },
background: { default: '#f4f6f8', paper: '#ffffff' },
},
typography: {
fontFamily: 'Roboto, sans-serif',
h5: { fontWeight: 600 },
h4: { fontWeight: 700 },
},
shape: {
borderRadius: 12,
},
components: {
MuiButton: {
styleOverrides: {
root: {
textTransform: 'none',
borderRadius: 10,
},
},
},
},
});


export default theme;