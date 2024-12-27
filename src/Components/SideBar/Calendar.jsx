import React, { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SideBar.scss";
const Calendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="div-calendar">
      <ReactCalendar onChange={onChange} value={value} />
    </div>
  );
};

export default Calendar;
