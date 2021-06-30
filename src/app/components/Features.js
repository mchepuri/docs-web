import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { _notifyDataUpdate } from "../util/util";
import { useUserRegistrationDispatch } from "../context/UserRegistrationContext.js";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 50,
  },
}));
const GreenCheckbox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
export default function Features() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    pool: false,
    attached_garage: false,
    basement: false,
  });
  const [features, setFeatures] = React.useState([]);
  const { setData } = useUserRegistrationDispatch();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked) {
      features.push(event.target.name);
    } else {
      const index = features.indexOf(event.target.name);
      if (index > -1) {
        features.splice(index, 1);
      }
    }
    setFeatures(features);
    const evt = {
      target: {
        id: "features",
        value: features,
      },
    };
    console.log("Features", features);
    const ntfy = _notifyDataUpdate(setData);
    ntfy(evt);
  };

  const { pool, attached_garage, basement } = state;
  const error = [pool, attached_garage, basement].filter((v) => v).length !== 2;

  return (
    <div className={classes.root}>
      <FormControl
        required
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Features</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={pool}
                onChange={handleChange}
                name="pool"
              />
            }
            label="Pool"
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={attached_garage}
                onChange={handleChange}
                name="attached_garage"
              />
            }
            label="Attached Garage"
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={basement}
                onChange={handleChange}
                name="basement"
              />
            }
            label="Basement"
          />
        </FormGroup>
        <FormHelperText>Please select all that apply</FormHelperText>
      </FormControl>
    </div>
  );
}
