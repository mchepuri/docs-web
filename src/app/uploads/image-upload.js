import React, { useRef, useState } from "react";
import { awsS3Config } from "../config/awsConfig";
import { addPhoto } from "./core-sdk";
import {
  Button,
  LinearProgress,
  Box,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useUserRegistrationState } from "../context/UserRegistrationContext.js";
import Link from "next/link";
export const ImageUpload = () => {
  const fileInput = useRef();
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalNoOfFiles, setTotalNoOfFiles] = useState(1);
  const [uploadedInitiated, setUploadedInitiated] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});

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
      objectName = "162281539418";
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
  const CheckMark = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
      </svg>
    );
  };
  const StatusList = (props) => {
    //const {uploadStatus1={}} =  props;
    if (!uploadStatus) return null;
    let fileNames = Object.keys(uploadStatus);
    let statusList = fileNames.map((fileName) => {
      return (
        <div>
          <span>{fileName}</span>
          {uploadStatus[fileName] === "done" ? (
            <CheckMark />
          ) : uploadedInitiated ? (
            "Uploading"
          ) : (
            "ready"
          )}
        </div>
      );
    });
    return <div>{statusList}</div>;
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
      <Box className="mb25" display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <BorderLinearProgress
            variant="determinate"
            value={uploadPercentage}
          />
        </Box>
        <Box minWidth={35}>
          <Typography
            variant="body2"
            color="textSecondary"
          >{`${uploadPercentage}%`}</Typography>
        </Box>
      </Box>
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
      <Button variant="contained" color="primary" onClick={handleClick}>
        Upload
      </Button>
      <br />
      <StatusList />
      <Link href={"/view/Property"}>
        <a style={{ marginTop: 50 }}>{"View Property"}</a>
      </Link>
    </form>
  );
};
