import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Flight from '../components/Flight';
import StaticInfo from '../components/StaticInfo';
import ChosenFlights from '../components/ChosenFlights';
import './FetchedFlights.css';

const FetchedFlights = ({ data, auth }) => {
  const { Places, Quotes, Carriers } = data;

  function checkCarrierId(inFlight) {
    let carrierName = '';
    Carriers.find((carrier) => {
      if (carrier.CarrierId === inFlight.CarrierIds[0]) {
        carrierName = carrier.Name;
      }
      return carrierName;
    });
    return carrierName;
  }

  function checkCarrierOutId(outFlight) {
    let carrierName = '';
    Carriers.find((carrier) => {
      if (carrier.CarrierId === outFlight.CarrierIds[0]) {
        carrierName = carrier.Name;
      }
      return carrierName;
    });
    return carrierName;
  }

  return (
    <div className="flex-flights">
      {Quotes.length > 0
        ? (
          <div className="all-flights">
            {Quotes.map(({
              QuoteId,
              Direct,
              InboundLeg,
              OutboundLeg,
              MinPrice,
            }) => (
              <Flight
                key={QuoteId}
                isDirect={Direct}
                carrierIn={checkCarrierId(InboundLeg)}
                carrierOut={checkCarrierOutId(OutboundLeg)}
                price={MinPrice}
                departurePlace={Places[0].IataCode}
                arrivalPlace={Places[1].IataCode}
                departureDate={OutboundLeg.DepartureDate}
                arrivalDate={InboundLeg.DepartureDate}
                departureCity={Places[0].Name}
                arrivalCity={Places[1].Name}
              />
            ))}
          </div>
        ) : <StaticInfo msg="There are no flights that day." />}
      {auth && Quotes.length > 0 ? <ChosenFlights /> : ''}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.flightsData,
  auth: state.isAuth,
});

FetchedFlights.propTypes = {
  data: PropTypes.objectOf().isRequired,
  auth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(FetchedFlights);
