import React from 'react';
import Slider from '@material-ui/core/Slider';

const SelectRange = () => {
  // Get price more expensive
  const mostExpensive = 500;

  // Our States
  const [value, setValue] = React.useState([0, mostExpensive]);

  // Changing State when volume increases/decreases
  const rangeSelector = (ev, newValue) => {
    setValue(newValue);
  };

  const style = { color: '#f24b88' };

  return (
    <div
      style={{
        margin: 'auto',
        display: 'block',
        width: 'fit-content',
      }}
    >
      <Slider
        value={value}
        onChange={rangeSelector}
        max={mostExpensive}
        valueLabelDisplay="auto"
        style={style}
      />
      Filtering Price between {value[0]} and {value[1]}
    </div>
  );
};

export default SelectRange;
