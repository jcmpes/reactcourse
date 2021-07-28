const { useState, useEffect } = require('react');

function FileUpload({ label, courseDetails, setCourseDetails, lessonCounter }) {
  const number = lessonCounter - 1
  const handleChange = (ev) => {
    // set course image
    if (lessonCounter === 0) {
      setCourseDetails((oldDetails) => ({
        ...oldDetails,
        image: ev.target.files[0],
        preview: { file: URL.createObjectURL(ev.target.files[0]) }
      }));
    } else {
      // set lesson n image
      setCourseDetails((oldDetails) => {
        const lessons = { ...oldDetails.lessons };
        lessons[number].image = ev.target.files[0];
        lessons[number].preview = { file: URL.createObjectURL(ev.target.files[0]) }
        return {
          ...oldDetails,
          lessons,
        };
      });
    }
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
        src={ lessonCounter === 0 ? courseDetails.preview.file
              : courseDetails.lessons[number].preview ? 
                courseDetails.lessons[number].preview.file
                : ''
        }
      />
    </div>
  );
}

export default FileUpload;
