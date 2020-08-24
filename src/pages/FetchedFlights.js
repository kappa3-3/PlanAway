import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Flight from '../components/Flight';
import './FetchedFlights.css';

const FetchedFlights = ({ data }) => {
  const carriers = data.Carriers;

  function checkCarrierId(inFlight) {
    let carrierName = '';

    carriers.find((carrier) => {
      if (carrier.CarrierId === inFlight.CarrierIds[0]) {
        carrierName = carrier.Name;
      }
      return carrierName;
    });
    return carrierName;
  }

  function checkCarrierOutId(outFlight) {
    let carrierName = '';

    carriers.find((carrier) => {
      if (carrier.CarrierId === outFlight.CarrierIds[0]) {
        carrierName = carrier.Name;
      }
      return carrierName;
    });
    return carrierName;
  }

  function formatDate(date) {
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      {data
        ? (
          <div className="all-flights">
            {data.Quotes.map(({
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
                currency={data.Currencies[0].Symbol}
                departurePlace={data.Places[0].IataCode}
                arrivalPlace={data.Places[1].IataCode}
                departureDate={formatDate(data.Quotes[0].OutboundLeg.DepartureDate.slice(0, 10))}
                arrivalDate={formatDate(data.Quotes[0].InboundLeg.DepartureDate.slice(0, 10))}
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
