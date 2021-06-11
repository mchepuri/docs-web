import {Input,InputLabel,FormControl} from '@material-ui/core';
import {notifyDataUpdate} from '../util/util';
import { useUserRegistrationState } from '../context/UserRegistrationContext.js';
export const Professional = ()=> {
    
    const data = useUserRegistrationState();
    return <div>
        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title"  onBlur={notifyDataUpdate()}/>
        </FormControl>
        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="degree">Highest Degree</InputLabel>
            <Input id="degree"  onBlur={notifyDataUpdate()}/>
        </FormControl>
        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="exp">Work experience in years</InputLabel>
            <Input id="exp"  onBlur={notifyDataUpdate()}/>
        </FormControl>
        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="workplace">Work location</InputLabel>
            <Input id="workplace"   onBlur={notifyDataUpdate()}/>
        </FormControl>
    </div>
  }

  