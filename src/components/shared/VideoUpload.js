import S3 from 'react-aws-s3';

function VideoUpload({ label, setCourseDetails }) {
  const config = {
    bucketName: 'final-project-video-bucket',
    region: 'us-east-1',
    accessKeyId: 'AKIARHTNHDNQPLQTDEBW',
    secretAccessKey: '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',
    s3Url: 'http://s3.amazonaws.com/final-project-video-bucket' /* optional */,
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
