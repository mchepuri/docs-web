import { useUserRegistrationState } from '../../app/context/UserRegistrationContext.js';
import PrimarySearchAppBar from '../../app/components/Hdr';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'


function Item(props)
{
    return (
        <Paper>
            <img src={props.item} height={300} width={300}/>
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

function Property() {
    const data = useUserRegistrationState();
    const photos = [
        'https://docswebcm.s3.ap-south-1.amazonaws.com/162281539418/Screen+Shot+2021-04-26+at+6.30.31+PM.png',
        'https://docswebcm.s3.ap-south-1.amazonaws.com/162281539418/Screen+Shot+2021-06-13+at+12.14.40+PM.png',
        'https://docswebcm.s3.ap-south-1.amazonaws.com/162281539418/Screen+Shot+2021-06-23+at+10.02.40+AM.png'
    ];
    const property = {
        address: {
          addressLine1: "27475 PALMWOOD AVE",
          addressLine2: "",
          city: "HAYWARD",
          country: "American Samoa",
          region: "CALIFORNIA",
          zip: "94545"
        },
        area: "3434",
        id: "1624546204802",
        lotsize: "200",
        lprice: "565675",
        ybuilt: "2300"
    };
    console.log('Property==>data',data)
    return( 
    <div>
         
        <Carousel autoPlay={false}>
            {photos.map( (item, i) => <Item key={i} item={item} /> )}
        </Carousel>
    </div>);
}
export default Property;