import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import 'react-calendar/dist/Calendar.css';

function CalendarView({ month, tripDates }) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return (
    <div className="flex-width">
      <h4 className="month-title">{monthNames[month.getMonth()]}</h4>
      <Calendar
        view="month"
        onDrillDown={() => 'a'}
        tileClassName={({ date, view }) => tripDates.map((plan) => {
          const startDate = new Date(plan.out);
          const endDate = new Date(plan.in);
          if (view === 'month'
            && date >= startDate
            && date <= endDate) return plan.className;
          return null;
        })}
        showNavigation={false}
        defaultActiveStartDate={month}
        navigationLabel={() => `${monthNames[month.getMonth()]}`}
      />
    </div>
  );
}

CalendarView.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
  tripDates: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
  ])).isRequired,
};

export default CalendarView;
