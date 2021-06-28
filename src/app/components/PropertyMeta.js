import {Input,InputLabel,FormControl,Select,MenuItem} from '@material-ui/core';
import {notifyDataUpdate} from '../util/util';
import {useEffect, useState} from 'react';
import {viewAlbum} from '../uploads/core-sdk';
const Photos = (props)=>{
  console.log('photos',props._photos);
  const pics=props._photos&&props._photos.map((photo)=>{
    return <img src={photo}/>;
  });
  return pics;
}
export const PropertyMeta = ()=> {
    useEffect(()=>{
      listFiles();
    });
    //const beds=2,bath=20;
    const [beds,setBeds] = useState(2);
    const [baths,setBaths] = useState(2);
    const [photos,setPhotos] = useState([]);
    const handleBathChange = (event) => {
        setBaths(event.target.value);
    };
    const handleBedsChange = (event) => {
        setBeds(event.target.value);
    };
    const listFiles = () => {
      setPhotos(viewAlbum('docswebcm','1624769269666'));
    }
    return <div style={{marginTop:30,marginLeft:30}}>
        <form>
        <div style={{display:'block',marginTop:30}}>
        <FormControl>
        <InputLabel id="demo-simple-select-label1" style={{display:'inline'}}>Beds</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select1"
          value={beds}
          onChange={handleBathChange}
          onBlur={notifyDataUpdate()}

        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
       
        </FormControl >
        <FormControl style={{marginLeft:90}}>
        <InputLabel id="demo-simple-select-label2" style={{display:'inline'}}>Bath</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select2"
          value={baths}
          onChange={handleBathChange}
          onBlur={notifyDataUpdate()}
        >
          <MenuItem id='1' value={10}>1</MenuItem>
          <MenuItem id='2' value={1.5}>1.5</MenuItem>
          <MenuItem id='3' value={2}>2</MenuItem>
          <MenuItem id='4' value={2.5}>2.5</MenuItem>
          <MenuItem id='5' value={3}>3</MenuItem>
          <MenuItem id='6' value={3.5}>3.5</MenuItem>
          <MenuItem id='7' value={4}>4</MenuItem>
          <MenuItem id='8' value={4.5}>4.5</MenuItem>

        </Select>   
        </FormControl >
        </div>
        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="area" >Sqft</InputLabel>
            <Input id="area" onBlur={notifyDataUpdate()}/>
        </FormControl >

        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="lotsize" >Lot Size</InputLabel>
            <Input id="lotsize" onBlur={notifyDataUpdate()}/>
        </FormControl >

        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="lprice" >List Price</InputLabel>
            <Input id="lprice" onBlur={notifyDataUpdate()}/>
        </FormControl >

        <FormControl style={{display:'block'}}>
            <InputLabel htmlFor="ybuilt" >Year Built</InputLabel>
            <Input id="ybuilt" onBlur={notifyDataUpdate()}/>
        </FormControl >
        </form>
    </div>
  }

  