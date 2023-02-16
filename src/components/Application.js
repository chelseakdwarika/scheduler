import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time:"4pm",
    interview: {
      student: "Chelsea Dwarika",
      interviewer: {
        id: 2,
        name: "Severus Snape",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  { id: 5,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];



export default function Application(props) {
  const [day, setDay] = useState([]);
  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then(res => {
        setDayData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const appointment = Object.values(appointments).map((appointment) => {
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
      />
      )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">

<DayList
  days={day}
  day={day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
</section>
<section className="schedule">
  {appointment} 
  <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
