import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Flight from '../components/Flight';
import './FetchedFlights.css';

const FetchedFlights = ({ data }) => {
  return (
    <>
      { data
        ? (
          <div className="all-flights">
            {data.Quotes.map(({
              QuoteId,
              Direct,
              InboundLeg,
              OutboundLeg,
            }) => (
              <Flight
                key={QuoteId}
                isDirect={Direct}
              />
            ))}
          </div>
        )
        : (
          'Loading...'
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.flightsData,
});

FetchedFlights.propTypes = {
  data: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(FetchedFlights);
