import {AppBar,Toolbar,IconButton,Typography,Button} from '@material-ui/core';
import {Wizard} from '../components/Signup/Wizard';
import {UserRegistrationContextProvider} from '../app/context/UserRegistrationContext';
import {ImageUpload} from '../app/uploads/image-upload';
function HomePage() {
    return (
    <div><AppBar position="static">
    <Toolbar>
      <IconButton edge="start"  color="inherit" aria-label="menu">
       
      </IconButton>
      <Typography variant="h6" >
        News
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
  {<UserRegistrationContextProvider initialState={{}}>
    <Wizard/>
    </UserRegistrationContextProvider>}
    
        <ImageUpload/>
    </div>);
  }
  
  export default HomePage;