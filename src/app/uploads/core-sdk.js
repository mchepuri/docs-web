const AWS = require('aws-sdk');
import {awsS3Config} from '../config/awsConfig';

export const createAlbum = async (albumName)=> {
    albumName = albumName.trim();
    
    if (!albumName) {
      return alert("Album names must contain at least one non-space character.");
    }
    if (albumName.indexOf("/") !== -1) {
      return alert("Album names cannot contain slashes.");
    }
    var albumKey = encodeURIComponent(albumName);
    const s3=new AWS.S3();
    s3.config.update(awsS3Config);
    s3.headObject(
        { Bucket: awsS3Config.bucketName,
        Key: albumKey
    }, function(err, data) {
      if (!err) {
        return alert("Album already exists.");
      }
      if (err.code !== "NotFound") {
        //return alert("There was an error creating your album1: " + err.message);
        throw err;
      }
      s3.putObject({ Bucket: awsS3Config.bucketName, Key: albumKey }, function(err, data) {
        if (err) {
          return alert("There was an error creating your album2: " + err.message);
        }
        alert("Successfully created album.");
        //viewAlbum(albumName);
      });
    });
  }

export const addPhoto = (albumName,albumBucketName,file,uploadDoneHandler) => {
    /*var files = document.getElementById("photoupload").files;
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }
    var file = files[0];*/

    var fileName = file.name;
    var albumPhotosKey = encodeURIComponent(albumName) + "/";
  
    var photoKey = albumPhotosKey + fileName;
    AWS.config.update(awsS3Config);

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file
      }
    });
  
    var promise = upload.promise();
  
    promise.then(
      function(data) {
        console.log('Photo Uploaded Succesfully');
        uploadDoneHandler(fileName);
      },
      function(err) {
        alert("There was an error uploading your photo: ", err);
      }
    );
  }
  