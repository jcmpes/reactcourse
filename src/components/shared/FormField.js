function FormField({ label }) {
  return (
    <div className="formField">
      <label className="formField-label">
        <span>{label}</span>
        <input 
          className="formField-input"
        />
      </label>
    </div>
  )
}

export default FormField;