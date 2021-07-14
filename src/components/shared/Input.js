function Input({ as: Component, label, options, ...props }) {
  return (
    <label className="">
      <span>{label}</span>
      <Component {...props}>
        {Component === 'select' 
          ? options.map(option => 
            <option value={option._id} key={option._id}>{option.name}</option>)
            
          : null
        }
      </Component>;
    </label>
  )
}

export default Input;