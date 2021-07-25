const { useState } = require('react')

function FileUpload({ label, image, setImage }) {
  const [preview, setPreview] = useState({ file: image || null });

  const handleChange = (ev) => {
    setPreview({
      file: URL.createObjectURL(ev.target.files[0])
    });
    setImage(ev.target.files[0])
  }

  return (
    <div>
      <label className="formField-label">
        <span>{label}</span>
        <input type="file" onChange={handleChange}/>
      </label>
      <br />
      <img src={preview.file} style={{ height: "100px" }}/>
    </div>
  );
}

export default FileUpload;