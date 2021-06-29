import React, { useRef, useState } from "react";
import { awsS3Config } from "../config/awsConfig";
import { addPhoto } from "./core-sdk";
import {
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Box,
  Typography,
  withStyles,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import { useUserRegistrationState } from "../context/UserRegistrationContext.js";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const ImageUpload = () => {
  const fileInput = useRef();
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalNoOfFiles, setTotalNoOfFiles] = useState(1);
  const [uploadedInitiated, setUploadedInitiated] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});
  const classes = useStyles();

  const data = useUserRegistrationState();

  let totalUploaded = 0;
  let uploadPercentage = Math.round((100 * uploadedCount) / totalNoOfFiles);

  const uploadDoneHandler = (fileName) => {
    totalUploaded++;
    uploadStatus[fileName] = "done";
    setUploadStatus(uploadStatus);
    setUploadedCount(totalUploaded);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setUploadedInitiated(true);
    setTotalNoOfFiles(fileInput.current.files.length);
    let objectName = data.id;
    console.log("handleClick objectName", objectName);
    if (!objectName) {
      objectName = "1624769269666";
    }
    console.log("handleClick objectName", objectName);
    for (let i = 0; i < fileInput.current.files.length; i++) {
      addPhoto(
        objectName,
        awsS3Config.bucketName,
        fileInput.current.files[i],
        uploadDoneHandler
      );
    }
  };

  const isDone = (currentValue) => currentValue === 'done';

  const StatusList = (props) => {
    //const {uploadStatus1={}} =  props;
    if (!uploadStatus) return null;
    let fileNames = Object.keys(uploadStatus);
    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {fileNames.map((fileName) => (
                <TableRow key={fileName}>
                  <TableCell style={{ width: "40%", padding: "20px" }}>
                    {fileName.length > 20 ? fileName.slice(0, 20) + "..." : fileName}
                  </TableCell>
                  <TableCell>
                    {uploadStatus[fileName] === "done" ? (
                      <CheckIcon style={{ color: "green" }} />
                    ) : uploadedInitiated ? (
                      <CircularProgress size={25} />
                    ) : (
                      "Ready"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const handleFileSelects = (event) => {
    return setBulkStatus("ready");
  };
  const setBulkStatus = (status) => {
    let newStatus = { ...uploadStatus };
    if (!uploadStatus || Object.getOwnPropertyNames(uploadStatus) < 1) {
      newStatus = {};
      for (let i = 0; i < fileInput.current.files.length; i++) {
        newStatus[fileInput.current.files[i].name] = status;
      }
    } else {
      for (let key in newStatus) {
        newStatus[key] = status;
      }
    }
    setUploadStatus(newStatus);
  };

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 15,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "#EEEEEE",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  }))(LinearProgress);

  return (
    <form className="upload-steps">
      <Grid style={{ margin: "20px 0px" }}>
        <Typography variant="h6" gutterBottom>
          Upload photos
        </Typography>
        <Box className="mb25" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={uploadPercentage} />
          </Box>
          <Box minWidth={35}>
            <Typography
              variant="body2"
              color="textSecondary"
            >{`${uploadPercentage}%`}</Typography>
          </Box>
        </Box>
      </Grid>
      <label htmlFor="btn-upload">
        <input
          multiple
          id="btn-upload"
          name="btn-upload"
          type="file"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleFileSelects}
        />
        <Button className="btn-choose" variant="outlined" component="span">
          Choose Files
        </Button>
      </label>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleClick}
        style={{ margin: "0 0 0 16px" }}
      >
        Upload
      </Button>
      <Grid style={{ margin: "20px 0px" }}>
        <StatusList />
      </Grid>
      {Object.values(uploadStatus).every(isDone) && uploadedInitiated &&(
        <Button
          style={{ margin: "0 20%" }}
          variant="contained"
          color="primary"
          href={"/view/Property"}
        >
          View Property
        </Button>
      )}
    </form>
  );
};
