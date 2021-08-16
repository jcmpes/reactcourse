function Input({ as: Component, label, options, searcher, ...props }) {
  return (
    <label className="">
      <span>{label}</span>
      <Component {...props}>
        {Component === 'select'
          ? options.map((option) => (
              <option
                value={searcher ? option.name : option.value}
                key={option._id}
              >
                {option.name}
              </option>
            ))
          : null}
      </Component>
    </label>
  );
}

export default Input;
