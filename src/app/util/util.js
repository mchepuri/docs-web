import { useUserRegistrationDispatch } from '../context/UserRegistrationContext';
import { serviceBase } from '../api/services/service-base';
export const notifyDataUpdate = () => {
    const { setData } = useUserRegistrationDispatch();
    return (event) => {
        const data={};
        data[event.target.id] = event.target.value;
        setData(data)
    }
}
export const _notifyDataUpdate = (setData) => {
    return (event) => {
        const data={};
        data[event.target.id] = event.target.value;
        setData(data)
    }
}
export const registerProfile = (body) => {
    console.log('body',body);
    const extraHeaders = {
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjI2NDk0NzEsImV4cCI6MTYyNTI0MTQ3MSwidHlwZSI6InJlZnJlc2gifQ.J4XWOJe5IG4UBzoHPJtuCH3Xb7s6xvaDOKGaZhJs-f8',
    };
    
    const resp=serviceBase.post('http://localhost:3100/v1/users',body,extraHeaders,null,1);
    resp.then((data)=>console.log('registerProfile => resp',data));
    ;
}

export const _registerProfile = async (body) => {
    console.log('body',body);
    const extraHeaders = {
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjI2NDk0NzEsImV4cCI6MTYyNTI0MTQ3MSwidHlwZSI6InJlZnJlc2gifQ.J4XWOJe5IG4UBzoHPJtuCH3Xb7s6xvaDOKGaZhJs-f8',
    };
    
    const {error,result}=await serviceBase.post('http://localhost:3100/v1/users',body,extraHeaders,null,1);
    console.log('_registerProfile result',result);
    return result;
}