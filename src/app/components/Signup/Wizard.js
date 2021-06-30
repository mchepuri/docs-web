import { useState } from "react";
import { MobileStepper, Step, StepLabel, Button } from "@material-ui/core";
import { _registerProfile } from "../../util/util";
import {
  useUserRegistrationState,
  useUserRegistrationDispatch,
} from "../../context/UserRegistrationContext";
import { PropertyMeta } from "../PropertyMeta";
import { PropertyAddress } from "../PropertyLocation";
import { ImageUpload } from "../../uploads/image-upload";
import { _notifyDataUpdate } from "../../util/util";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  rootButton: {
    background: "linear-gradient(45deg, #485cc6 30%, #485cc6 90%)",
  },
  labelButton: {
    color: "white !important",
  },
}));

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <PropertyMeta />;
    case 1:
      return <PropertyAddress />;
    case 2:
      return <ImageUpload />;
  }
};
export const Wizard = () => {
  const classes = useStyles();
  const steps = ["Meta Info", "Location", "Upload Photos"];
  const [activeStep, setActiveStep] = useState(0);
  const data = useUserRegistrationState();
  const { setData } = useUserRegistrationDispatch();
  const handleNext = async () => {
    if (activeStep === steps.length - 2) {
      const result = await _registerProfile(data);
      setActiveStep(activeStep + 1);
      const evt = {
        target: {
          id: "id",
          value: result?.id,
        },
      };
      const ntfy = _notifyDataUpdate(setData);
      ntfy(evt);
      console.log("id", result?.id);
      return;
    }
    setActiveStep(activeStep + 1);
  };
  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <div>
      <Typography
        variant="h5"
        color="#161616"
        style={{
          margin: "30px 70px 30px 30px",
          display: "flex",
          alignItems: "flex-end",
          transition: "ease-in 0.5s",
        }}
        color="textPrimary"
      >
        <img
          src="/house_icon.svg"
          style={{
            height: 50,
            width: 100,
            verticalAlign: "-50%",
            transition: "ease-in 0.5s",
            marginLeft: 10,
          }}
        />
        Real Upload
      </Typography>

      <MobileStepper
        activeStep={activeStep}
        steps={steps.length}
        nextButton={
          activeStep < steps.length - 1 ? (
            <div style={{ width: 80 }}>
              <Button
                variant="contained"
                color="primary"
                classes={{
                  root: classes.rootButton,
                  label: classes.labelButton,
                }}
                onClick={handleNext}
              >
                {activeStep < steps.length - 2 ? "Next" : "Submit"}
              </Button>
            </div>
          ) : (
            <div style={{ width: 80, height: 36 }}></div>
          )
        }
        backButton={
          activeStep > 0 && activeStep < steps.length - 1 ? (
            <div style={{ width: 80 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrevious}
                classes={{
                  root: classes.rootButton,
                  label: classes.labelButton,
                }}
                F
              >
                Previous
              </Button>
            </div>
          ) : (
            <div style={{ width: 80, height: 36 }}></div>
          )
        }
      >
        {steps.map((step, index) => {
          return (
            <Step key={"step" + index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </MobileStepper>
      <div style={{ margin: 20, marginTop: 30 }}>
        {getStepContent(activeStep)}
      </div>
    </div>
  );
};

export default Wizard;
