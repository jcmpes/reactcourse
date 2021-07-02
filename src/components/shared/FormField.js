function FormField({ label, ...props }) {
  return (
    <div className="formField">
      <label className="formField-label">
        <span>{label}</span>
        <input 
          className="formField-input"
          {...props}
        />
      </label>
    </div>
  )
}

export default FormField;