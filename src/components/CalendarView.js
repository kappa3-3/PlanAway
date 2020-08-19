import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import 'react-calendar/dist/Calendar.css';

function CalendarView({ month }) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return (
    <div className="flex-width">
      <h3>{monthNames[month.getMonth()]}</h3>
      <Calendar
        view="month"
        onDrillDown={() => 'a'}
        selectRange
        tileClassName={({ date, view }) => {
          if (view === 'month' && date.getDay() === 3) return 'tile-bg';
          return null;
        }}
        showNavigation={false}
        defaultActiveStartDate={month}
        navigationLabel={() => `${monthNames[month.getMonth()]}`}
      />
    </div>
  );
}

CalendarView.propTypes = {
  month: PropTypes.objectOf().isRequired,
};

export default CalendarView;
