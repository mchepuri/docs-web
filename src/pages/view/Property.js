import { useUserRegistrationState } from "../../app/context/UserRegistrationContext.js";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, GridList, GridListTile, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import GavelOutlinedIcon from "@material-ui/icons/GavelOutlined";
import EmojiTransportationOutlinedIcon from "@material-ui/icons/EmojiTransportationOutlined";
import DomainOutlinedIcon from "@material-ui/icons/DomainOutlined";
import ListSubheader from "@material-ui/core/ListSubheader";
import PoolOutlinedIcon from "@material-ui/icons/PoolOutlined";
import StoreMallDirectoryOutlinedIcon from "@material-ui/icons/StoreMallDirectoryOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";

const useStyles = makeStyles(() => ({
  address: {
    lineHeight: "normal",
    color: "rgb(51, 51, 51)",
  },
  iconTile: {
    marginTop: "8px !important",
  },
  titleMargin: {
    marginTop: "-5px",
    color: "#757575",
  },
  featuresTile: {
    marginLeft: "-17px",
  },
}));

function Item(props) {
  return (
    <Paper>
      <img src={props.item} height={300} width={360} />
    </Paper>
  );
}

function Property() {
  const classes = useStyles();
  const data = useUserRegistrationState();
  const photos = [
    "https://docswebcm.s3.ap-south-1.amazonaws.com/162281539418/kitchen-3.jpg",
    "https://docswebcm.s3.ap-south-1.amazonaws.com/162281539418/kitchen-5.jpg",
    "https://docswebcm.s3.ap-south-1.amazonaws.com/162281539418/level-0.jpg",
  ];
  const property = false
    ? {
        address: {
          addressLine1: "27475 PALMWOOD AVE",
          addressLine2: "",
          city: "HAYWARD",
          country: "American Samoa",
          region: "CALIFORNIA",
          zip: "94545",
        },
        area: "3434",
        id: "1624546204802",
        lotsize: "200",
        lprice: "565675",
        ybuilt: "2300",
        beds: 3,
        bath: 2,
        garage: "1+",
        type: "Condo",
        features: ["pool", "garage", "basement"],
      }
    : data;
  const prepareAddress = (address) =>
    address ? Object.values(address)
      .filter((a) => a)
      .join(", ") : 'NIA';
  const prepareIconTiles = (title, value, icon) => {
    return (
      <Grid container spacing={2}>
        <Grid item>{icon}</Grid>
        <Grid item>
          <Grid item>
            <Typography variant="subtitle2">
              <strong>{value}</strong>
            </Typography>
          </Grid>
          {title && (
            <Grid item className={classes.titleMargin}>
              <Typography variant="caption" gutterBottom>
                {title}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  };
  console.log("Property==>data", data);
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const isDataAvailable = (data) => data ? data : 'NIA';

  return (
    <div>
      <Carousel
        autoPlay={false}
        indicators={false}
        navButtonsAlwaysVisible={true}
        animation={"slide"}
        cycleNavigation={true}
      >
        {photos.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <div className="content">
        <div className="status-label-section">
          <div className="solid_icon_green" />
          <span className="status_label">For Sale</span>
        </div>
        <div className="list_price">{isDataAvailable(formatter.format(property?.lprice))}</div>
        <GridList cols={5} cellHeight="auto">
          <GridListTile key={"beds"}>
            <div>
              <strong>{isDataAvailable(property?.beds)}</strong> bed
            </div>
          </GridListTile>
          <GridListTile key={"beds"}>
            <div>
              <strong>{isDataAvailable(property?.bath)}</strong> bath
            </div>
          </GridListTile>
          <GridListTile key={"beds"}>
            <div>
              <strong>{isDataAvailable(property?.area)}</strong> sqft
            </div>
          </GridListTile>
        </GridList>
        <GridList className={classes.address} cols={1} cellHeight="auto">
          <GridListTile>
            <Typography variant="caption" gutterBottom>
              {prepareAddress(property?.address)}
            </Typography>
          </GridListTile>
        </GridList>
        <GridList cellHeight="50" className={classes.iconTile}>
          <GridListTile>
            {prepareIconTiles(
              "Property Type",
              isDataAvailable(property?.type),
              <HomeOutlinedIcon />
            )}
          </GridListTile>
          <GridListTile>
            {prepareIconTiles(
              "Year Built",
              isDataAvailable(property?.ybuilt),
              <GavelOutlinedIcon />
            )}
          </GridListTile>
        </GridList>
        <GridList cellHeight="50">
          <GridListTile>
            {prepareIconTiles(
              "Lot Size",
              isDataAvailable(property?.lotsize),
              <DomainOutlinedIcon />
            )}
          </GridListTile>
          <GridListTile>
            {prepareIconTiles(
              "Garage",
              `${isDataAvailable(property?.garage)} Car`,
              <EmojiTransportationOutlinedIcon />
            )}
          </GridListTile>
        </GridList>
        <GridList className={classes.featuresTile}>
          <GridListTile
            className={classes.featuresTile}
            key="Subheader"
            cols={2}
            style={{ height: "auto" }}
          >
            <ListSubheader component="div">Features</ListSubheader>
          </GridListTile>
        </GridList>
        {property?.features?.length > 0 && <GridList cols={2} cellHeight="auto">
          {property?.features.includes("pool") && (
            <GridListTile>
              {prepareIconTiles("", "Pool", <PoolOutlinedIcon />)}
            </GridListTile>
          )}
          <GridListTile>
            {prepareIconTiles(
              "",
              "Basement",
              <StoreMallDirectoryOutlinedIcon />
            )}
          </GridListTile>
          <GridListTile>
            {prepareIconTiles("", "Attached Garage", <DriveEtaOutlinedIcon />)}
          </GridListTile>
        </GridList>}
      </div>
      <style jsx>{`
        .list_price {
          font-size: 25px;
          font-weight: 700;
          font-family: "Roboto,sans-serif";
        }
        .content {
          padding: 10px;
          line-height: 30px;
        }
        .solid_icon_green {
          height: 12px;
          width: 12px;
          border-radius: 4px;
          margin-bottom: -1px;
          margin-right: 6px;
          background: #36b396;
          line-height: 1.17;
          display: inline-block;
        }
        status-label-section {
          display: flex;
        }
        .status_label {
          font-size: 16px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}
export default Property;
