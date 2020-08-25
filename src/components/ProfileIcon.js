import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { pink } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

const ProfileIcon = ({ userData }) => {
  const classes = useStyles();
  return (
    <Link
      className={`${classes.root} navigation-auth`}
      to="/profile"
    >
      <Avatar
        className={classes.pink}
      >
        {userData ? userData.first_name.substring(0, 1) : '..'}
        {userData ? userData.last_name.substring(0, 1) : '..'}
      </Avatar>
    </Link>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

ProfileIcon.propTypes = {
  userData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
};

export default connect(mapStateToProps)(ProfileIcon);
