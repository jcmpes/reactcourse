import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 2,
    position: 'fixed',
    border: '#f24b88',
    bottom: '2vh',
    backgroundColor: '#DCDCDC',
    color: '#f24b88',
    '&:hover, &.Mui-focusVisible': {
      transition: '0.3s',
      color: '#e8e8e8',
      backgroundColor: '#e43f7c',
    },
    right: '5%',
  },
}));

const Scroll = ({ showBellow }) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(showBellow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBellow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window['scrollTo']({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (showBellow) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  });

  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} className={classes.toTop}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Scroll;
