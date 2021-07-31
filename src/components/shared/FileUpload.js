const { useState, useEffect } = require('react');

function FileUpload({ label, courseDetails, setCourseDetails, lessonCounter }) {
  const number = lessonCounter - 1
  const handleChange = (ev) => {
    // set course image
      setCourseDetails((oldDetails) => ({
        ...oldDetails,
        image: ev.target.files[0],
        preview: { file: URL.createObjectURL(ev.target.files[0]) }
      }));
    
  };
  
  return (
    <div>
      <label className="formField-label">
        <span>{label}</span>
        <input type="file" onChange={handleChange} />
      </label>
      <br />
      <img 
        alt={''}
        style={{ height: '100px' }}
        src={ courseDetails.preview.file }
      />
    </div>
  );
}

export default FileUpload;
