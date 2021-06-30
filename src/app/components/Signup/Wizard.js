import { useState } from "react";
import { PersonalData } from "../PersonalData";
import { Professional } from "../Professional";
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
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import { Typography } from "@material-ui/core";
import { TramOutlined } from "@material-ui/icons";

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
  const steps = ["Meta Info", "Location", "Upload Photos"];
  const [home, setHome] = useState(true);
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
        color="primary"
        style={{
          margin: "30px 70px 30px 30px",
          marginTop: `${home ? "200px" : "30px"}`,
          display: "flex",
          alignItems: "flex-end",
          transition: "ease-in 0.5s",
        }}
        color="textPrimary"
      >
        <img
          src="/house_icon.svg"
          style={{ height: 50, width: 100, verticalAlign: "-50%" }}
        />
        Real Upload
      </Typography>
      {home ? (
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setHome(false)}
          >
            Ready
          </Button>
        </div>
      ) : (
        <>
          <MobileStepper
            activeStep={activeStep}
            steps={steps.length}
            nextButton={
              activeStep < steps.length - 1 ? (
                <div style={{ width: 80 }}>
                  <Button
                    variant="contained"
                    color="primary"
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
        </>
      )}
    </div>
  );
};

export default Wizard;
