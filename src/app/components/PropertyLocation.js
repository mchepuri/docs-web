import AddressInput from 'material-ui-address-input';
import { useUserRegistrationState,useUserRegistrationDispatch } from '../context/UserRegistrationContext.js';
import { useState} from 'react';
import {_notifyDataUpdate} from '../util/util';
import Features from './Features';
export const PropertyAddress = () => {
    const [_address,setAddress]=useState(''),[_allAddresses,setAllAddresses]=useState([]);
    const [notifyChange, setNotifyChange] = useState(false);
    const data = useUserRegistrationState();
    const { setData } = useUserRegistrationDispatch();
    const handleAddAddress = address => {
        setAllAddresses([..._allAddresses, address]);
        const evt = {target:{
            id:'address',
            value:address
        }};
        console.log('Address',address);
        const ntfy = _notifyDataUpdate(setData);
        ntfy(evt);
    }
    const handleChangeAddress = addressIndex => {
        setAddress(addressIndex);
    }
    console.log('context ',data);
    
    return (<div>
                <AddressInput onAdd={handleAddAddress} onChange={handleChangeAddress} value={_address} allAddresses={_allAddresses}/>
                <Features style={{paddingTop:50}}/>
        </div>);
}