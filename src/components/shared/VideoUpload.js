function VideoUpload({ label, setCourseDetails }) {
  const handleChange = (ev) => {
    // set course image
      setCourseDetails((oldDetails) => ({
        ...oldDetails,
        video: ev.target.files[0],
      }));
    
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