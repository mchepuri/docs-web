import {useState} from 'react';
import {PersonalData} from '../PersonalData';
import {Professional} from '../Professional';
import {MobileStepper,Step,StepLabel,Button} from '@material-ui/core';
import { _registerProfile } from '../../util/util';
import {useUserRegistrationState,useUserRegistrationDispatch } from '../../context/UserRegistrationContext';
import {PropertyMeta} from '../PropertyMeta';
import {PropertyAddress} from '../PropertyLocation';
import {ImageUpload} from '../../uploads/image-upload';
import {_notifyDataUpdate} from '../../util/util';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import {Typography} from '@material-ui/core';

const getStepContent = (step)=>{
    switch(step){
        case 0:
            return <PropertyMeta/>;
        case 1:
            return <PropertyAddress/>;
        case 2:
            return <ImageUpload/>
    }
}
export const Wizard = () => {
    const steps=['Meta Info','Location','Upload Photos'];
    const [activeStep,setActiveStep] = useState(0);
    const data = useUserRegistrationState();
    const { setData } = useUserRegistrationDispatch();
    const handleNext = async ()=>{
        
        if(activeStep===steps.length-2){
            const result = await _registerProfile(data);
            setActiveStep(activeStep+1);
            const evt = {target:{
                id:'id',
                value:result.id
            }};
            const ntfy = _notifyDataUpdate(setData);
            ntfy(evt);
            console.log('id',result.id);
            return;
        }
        setActiveStep(activeStep+1);
    }
    const handlePrevious = ()=>{
        setActiveStep(activeStep-1);
    }
    return (
    <div>
        <Typography variant="h5"  color='primary' style={{marginTop:30}}> 
            <img src="/house_icon.svg" style={{height:50,width:100,verticalAlign:'-50%'}}/>
        Real Upload 
        </Typography>
        <MobileStepper activeStep={activeStep} steps={steps.length}
            nextButton={activeStep<steps.length-1?<Button variant="contained" color="primary" onClick={handleNext}>{activeStep<steps.length-2? 'Next':'Submit'}</Button>:''}
            backButton={activeStep>0&&activeStep<steps.length-1?<Button variant="contained" color="primary" onClick={handlePrevious}>Previous</Button> :''}>

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
  