import S3 from 'react-aws-s3';

function VideoUpload({ label, setCourseDetails }) {
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    s3Url: process.env.REACT_APP_S3_URL /* optional */,
  };

  
  
  
  const handleChange = (ev) => {
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(ev.target.files[0])
      .then((data) => {
        setCourseDetails((oldDetails) => ({
          ...oldDetails,
          video: data.location,
        }));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <label className="formField-label">
        <span>{label}</span>
        <input type="file" onChange={handleChange} />
      </label>
    </div>
  );
}

export default VideoUpload;
