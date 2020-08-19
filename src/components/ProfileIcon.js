import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import './ProfileIcon.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const ProfileIcon = () => {
  const classes = useStyles();
  return (
    <Link
      className={`${classes.root} navigation-auth`}
      to="/profile"
    >
      <Avatar
        className={classes.orange}
      >
        N
      </Avatar>
    </Link>
  );
};

export default ProfileIcon;
