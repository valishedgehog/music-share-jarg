import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, lightBlue } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: deepPurple, 
        secondary: lightBlue
    }
});

export default theme;