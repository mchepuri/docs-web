import grey from "@material-ui/core/colors/grey";
import pink from "@material-ui/core/colors/pink";
import indigo from "@material-ui/core/colors/indigo";
import { createMuiTheme } from "@material-ui/core/styles";
const primary = grey[50]; // #f44336
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: pink,
  },
  overrides: {
    MuiButton: {
      root: {
        background: "linear-gradient(45deg, #485cc6 30%, #485cc6 90%)",
      },
      label: {
        color: "white",
      }
    },
    MuiMobileStepper: {
        dotActive:{
            background: "linear-gradient(45deg, #485cc6 30%, #485cc6 90%)",
        }
    }
  },
});
/* const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
  }
}); */

export default theme;
