import {Input,InputLabel,FormControl,FormHelperText} from '@material-ui/core';
import {notifyDataUpdate} from '../util/util';

export const PersonalData = ()=> {
    return <div>
        <form>
        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="fname" >First Name</InputLabel>
            <Input id="fname" onBlur={notifyDataUpdate()}/>
        </FormControl >
        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="lname">Last Name</InputLabel>
            <Input id="lname" onBlur={notifyDataUpdate()}/>
        </FormControl>
        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" onBlur={notifyDataUpdate()} />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="phoneNum">Contact #</InputLabel>
            <Input id="contact"  onBlur={notifyDataUpdate()}/>
            <FormHelperText id="my-helper-text">Would be used for e-verify.</FormHelperText>
         </FormControl>
        </form>
    </div>
  }

  