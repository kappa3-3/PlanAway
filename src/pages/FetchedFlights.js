import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Flight from '../components/Flight';
import './FetchedFlights.css';

const FetchedFlights = () => {
  return (
    <div className="all-flights">
      <Flight />
      <Flight />
      <Flight />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.results,
});

FetchedFlights.propTypes = {
  data: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(FetchedFlights);