/* src/pages/MyAppointments.jsx */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const MyAppointments = () => {
  const { appointments, cancelAppointment, doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCancel = async (appt) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      await cancelAppointment(appt);
      alert("✅ Appointment cancelled.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="p-4 bg-yellow-100 rounded">
          <p>You have no upcoming appointments.</p>
          <Link
            to="/doctors"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            Book a new appointment
          </Link>
        </div>
      ) : (
        <ul className="space-y-6">
          {appointments.map((appt) => {
            const doctor = doctors.find((d) => d._id === appt.doctorId) || {};
            const imageSrc =
              appt.image || doctor.image || "/default-doctor.jpg";
            const address =
              appt.address ||
              (doctor.address
                ? `${doctor.address.line1}, ${doctor.address.line2}`
                : "");

            return (
              <li
                key={appt._id}
                className="p-4 border rounded shadow flex gap-4 items-start"
              >
                <img
                  src={imageSrc}
                  alt={appt.doctorName}
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-semibold">
                    Dr. {appt.doctorName}
                  </h2>
                  <p className="text-gray-700">
                    <strong>Specialty:</strong> {appt.speciality}
                  </p>
                  {address && (
                    <p className="text-gray-700">
                      <strong>Address:</strong> {address}
                    </p>
                  )}
                  <p className="text-gray-700">
                    <strong>Date:</strong> {appt.date} at {appt.time}
                  </p>
                  {appt.fees != null && (
                    <p className="text-gray-700">
                      <strong>Fees:</strong> ${appt.fees}
                    </p>
                  )}
                  {appt.status && (
                    <p className="text-sm text-gray-600 capitalize">
                      Status: {appt.status}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/messages?to=${appt.doctorId}&appt=${appt._id}`
                        )
                      }
                      className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Message Doctor
                    </button>

                    <button
                      onClick={() => handleCancel(appt)}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel Appointment
                    </button>

                    <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                      Pay Online
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {appointments.length > 0 && (
        <div className="mt-6">
          <Link
            to="/doctors"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Book Another Appointment
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
