const AWS = require("aws-sdk");
import { awsS3Config } from "../config/awsConfig";

export const createAlbum = async (albumName) => {
  albumName = albumName.trim();

  if (!albumName) {
    return alert("Album names must contain at least one non-space character.");
  }
  if (albumName.indexOf("/") !== -1) {
    return alert("Album names cannot contain slashes.");
  }
  var albumKey = encodeURIComponent(albumName);
  const s3 = new AWS.S3();
  s3.config.update(awsS3Config);
  s3.headObject(
    { Bucket: awsS3Config.bucketName, Key: albumKey },
    function (err, data) {
      if (!err) {
        return alert("Album already exists.");
      }
      if (err.code !== "NotFound") {
        //return alert("There was an error creating your album1: " + err.message);
        throw err;
      }
      s3.putObject(
        { Bucket: awsS3Config.bucketName, Key: albumKey },
        function (err, data) {
          if (err) {
            return alert(
              "There was an error creating your album2: " + err.message
            );
          }
          alert("Successfully created album.");
          //viewAlbum(albumName);
        }
      );
    }
  );
};

export const addPhoto = (
  albumName,
  albumBucketName,
  file,
  uploadDoneHandler
) => {
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
      Body: file,
    },
  });

  var promise = upload.promise();

  promise.then(
    function (data) {
      console.log("Photo Uploaded Succesfully");
      uploadDoneHandler(fileName);
    },
    function (err) {
      alert("There was an error uploading your photo: ", err);
    }
  );
};
// Show the photos that exist in an album.
export const viewAlbum = (albumBucketName, albumName) => {
  /*AWS.config.region = 'ap-south-1'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-west-2:d99cc55a-d10a-49ee-b970-ac0a8a157d5c',
  });*/
  const s3 = new AWS.S3({
    params: { Bucket: albumBucketName },
  });
  s3.config.update(awsS3Config);
  AWS.config.region = "ap-south-1"; // Region
  var albumPhotosKey = encodeURIComponent(albumName) + "/";
  s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
    if (err) {
      return alert("There was an error viewing your album: " + err.message);
    }
    // 'this' references the AWS.Request instance that represents the response
    var href = this.request.httpRequest.endpoint.href;
    var bucketUrl = href + albumBucketName + "/";

    var photos = data.Contents.map(function (photo) {
      var photoKey = photo.Key;
      var photoUrl = bucketUrl + encodeURIComponent(photoKey);
      return photoUrl;
    });
    console.log("Album photo URLs", photos);
  });
};
