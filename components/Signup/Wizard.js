import {useState} from 'react';
import {PersonalData} from '../PersonalData';
import {Professional} from '../Professional';
import {MobileStepper,Step,StepLabel,Button} from '@material-ui/core';
import { registerProfile } from '../util/util';
import {useUserRegistrationState } from '../../context/UserRegistrationContext';
const getStepContent = (step)=>{
    switch(step){
        case 0:
            return <PersonalData/>;
        case 1:
            return <Professional/>;
    }
}
export const Wizard = () => {
    const steps=[' Personal Data','Professional Information'];
    const [activeStep,setActiveStep] = useState(0);
    const data = useUserRegistrationState();
    const handleNext = ()=>{
        setActiveStep(activeStep+1);
        if(activeStep>=steps.length-1){
            console.log('Submit');
            registerProfile(data);
        }
    }
    const handlePrevious = ()=>{
        setActiveStep(activeStep-1);
    }
    return (
    <div>
        <MobileStepper activeStep={activeStep} steps={steps.length}
            nextButton={<Button variant="contained" color="primary" onClick={handleNext}>{activeStep<steps.length-1? 'Next':'Submit'}</Button>}
            backButton={activeStep>0?<Button variant="contained" color="primary" onClick={handlePrevious}>Previous</Button> :''}>

            {steps.map((step,index)=>{
               return <Step key={'step'+index}>
                <StepLabel>
                    {step}
                </StepLabel>                
                
            </Step>
            })
            }
        </MobileStepper>
        {getStepContent(activeStep)}
        
        
    </div>);
  }
  
  export default Wizard;
  