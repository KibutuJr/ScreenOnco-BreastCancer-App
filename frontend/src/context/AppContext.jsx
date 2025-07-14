/* src/context/AppContext.jsx */
import React, { createContext, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // Static list of doctors
  const [doctorList] = useState(doctors);

  // Appointments state
  const [appointments, setAppointments] = useState([]);

  // Book and store a new appointment (simulates async backend call)
  const bookAppointment = async (appt) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAppt = {
          ...appt,
          _id: `${appt.doctorId}-${Date.now()}`,
          status: "confirmed",
        };
        resolve(newAppt);
      }, 300);
    });
  };

  // Cancel an appointment (simulates async backend call)
  const cancelAppointment = async (targetAppt) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setAppointments((prev) => prev.filter((a) => a._id !== targetAppt._id));
        resolve();
      }, 300);
    });
  };

  const value = {
    doctors: doctorList,
    appointments,
    setAppointments,
    bookAppointment,
    cancelAppointment,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
