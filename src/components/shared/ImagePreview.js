const { useState } = require('react')

function ImagePreview({ image, setImage }) {
  const [preview, setPreview] = useState({ file: null });

  const handleChange = (ev) => {
    setPreview({
      file: URL.createObjectURL(ev.target.files[0])
    });
    setImage(ev.target.files[0])
  }

  return (
    <div>
      <input type="file" onChange={handleChange}/>
      <br />
      <img src={preview.file} style={{ height: "100px" }}/>
    </div>
  );
}

export default ImagePreview;