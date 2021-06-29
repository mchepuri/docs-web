import { useUserRegistrationState } from '../../app/context/UserRegistrationContext.js';
import PrimarySearchAppBar from '../../app/components/Hdr';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button,GridList,GridListTile } from '@material-ui/core'


function Item(props)
{
    return (
        <Paper>
            <img src={props.item} height={300} width={360}/>
        </Paper>
    )
}

function Property() {
    const data = useUserRegistrationState();
    const photos = [
        'https://docswebcm.s3.ap-south-1.amazonaws.com/162281539418/kitchen-3.jpg',
        'https://docswebcm.s3.ap-south-1.amazonaws.com/162281539418/kitchen-5.jpg',
        'https://docswebcm.s3.ap-south-1.amazonaws.com/162281539418/level-0.jpg'
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
        ybuilt: "2300",
        beds:3,
        bath:2
    };
    console.log('Property==>data',data);
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      
    return( 
    <div>
         
        <Carousel autoPlay={false} indicators={false}  navButtonsAlwaysVisible={true} animation={'slide'}
        cycleNavigation={true}>
            {photos.map( (item, i) => <Item key={i} item={item} /> )}
        </Carousel>
        <div className="status-label-section">
            <span className="solid_icon_green"/>
            <span className="status_label">For Sale</span>
        </div>
        <div className="list_price">
            {formatter.format(property['lprice'])}
        </div>
        <GridList  cols={5}>
                <GridListTile key={'beds'}>
                    <div><strong>{property['beds']}</strong> bed</div>       
                </GridListTile>
                <GridListTile key={'beds'}>
                <div><strong>{property['bath']}</strong> bath</div>
                </GridListTile>
        </GridList>
        <style jsx>{`
            .list_price {
                font-size : 28px;
                font-weight: 700;
                font-family: "Roboto,sans-serif";
            }
            .solid_icon_green {
                height :14px;
                width : 12px;
                border-radius : 4px;
                margin-bottom : 2px;
                margin-right: 6px;
                background: #36b396;
                line-height : 1.17;
            }
            status-label-section{
                display:flex;
            }
            .status_label{
                font-size: 16px;
                font-weight:400;
                display : inline-block;
            }
      `}</style>
    </div>);
}
export default Property;