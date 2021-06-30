import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import indigo from '@material-ui/core/colors/indigo'
import { createMuiTheme } from '@material-ui/core/styles';
const primary = grey[50]; // #f44336
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary
    },
    secondary: pink,
  },
  overrides: {
    MuiButton: {
      label: {
        color: "#191919",
      },
    }
  }
});
/* const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
  }
}); */

export default theme;