import PrimarySearchAppBar from '../app/components/Hdr';
import {UserRegistrationContextProvider} from '../app/context/UserRegistrationContext';
function App({ Component, pageProps }) {
    return (
    <div>
  {<UserRegistrationContextProvider initialState={{}}>
    <PrimarySearchAppBar/>   
    <Component
        {...pageProps}
      />
    </UserRegistrationContextProvider>}
    </div>);
  }
  
  export default App;