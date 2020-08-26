import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Flight from '../components/Flight';
import StaticInfo from '../components/StaticInfo';
import './FetchedFlights.css';

const FetchedFlights = ({ data, trip }) => {
  const carriers = data.Carriers;
  const saveToDatabase = (e, flight) => {
    e.preventDefault();
    fetch('/.netlify/functions/flights', {
      method: 'POST',
      body: JSON.stringify(
        flight,
      ),
    }).then((res) => res.json())
      .then((res) => console.log(res));
  };

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
    <div className="flex-flights">
      {data.Quotes.length > 0
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
                departureCity={data.Places[0].Name}
                arrivalCity={data.Places[1].Name}
              />
            ))}
          </div>
        ) : <StaticInfo msg="There are no flights that day." />}
      <div className="chosen-flights-wrapper">
        {trip.flights
          ? (
            <>
              <h2>Chosen flights:</h2>
              {trip.flights.map((flight) => (
                <div style={{ padding: '15px' }}>
                  <h3>{flight.connection}</h3>
                  <p>
                    price: €
                    {flight.price}
                  </p>
                  <p>
                    Departure:
                    {flight.out}
                    (
                    {flight.carrierIn}
                    )
                  </p>
                  <p>
                    Arrival:
                    {flight.in}
                    (
                    {flight.carrierOut}
                    )
                  </p>
                  <button
                    type="button"
                    className="saveTripButton"
                    onClick={(e) => saveToDatabase(e, flight)}
                  >
                    {trip.currentTrip.toUpperCase()}
                    <AddIcon style={{ color: 'white' }} />
                  </button>
                </div>
              ))}
            </>
          ) : ''}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.flightsData,
  trip: state.tripsData,
});

FetchedFlights.propTypes = {
  data: PropTypes.objectOf().isRequired,
  trip: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
};

export default connect(mapStateToProps)(FetchedFlights);
