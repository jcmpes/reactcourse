function FileUpload({ label, courseDetails, featuredImage, setFeaturedImage, setCourseDetails, lessonCounter }) {
  const handleChange = (ev) => {
    // set course image
    // if (lessonCounter === 0) {
      setFeaturedImage((oldDetails) => ({
        ...oldDetails,
        image: ev.target.files[0],
        preview: { file: URL.createObjectURL(ev.target.files[0]) }
      }));
    // } else {
    //   // set lesson n image
    //   setCourseDetails((oldDetails) => {
    //     const lessons = { ...oldDetails.lessons };
    //     lessons[number].image = ev.target.files[0];
    //     lessons[number].preview = { file: URL.createObjectURL(ev.target.files[0]) }
    //     return {
    //       ...oldDetails,
    //       lessons,
    //     };
    //   });
    // }
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
        src={featuredImage 
          ? featuredImage.preview.file
          : ''
          }
      />
    </div>
  );
}

export default FileUpload;