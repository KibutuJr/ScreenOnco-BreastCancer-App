import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";

const Admin = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!aToken) {
      navigate("/login");
    }
  }, [aToken]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/admin/appointments`,
          {
            headers: { Authorization: `Bearer ${aToken}` },
          }
        );
        setAppointments(response.data.appointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (aToken) fetchAppointments();
  }, [aToken]);

  // Confirm appointment handler
  const handleConfirm = async (appointmentId) => {
    try {
      await axios.post(
        `${backendUrl}/api/admin/appointments/${appointmentId}/confirm`,
        {},
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );

      // Update appointment status locally
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === appointmentId ? { ...a, status: "confirmed" } : a
        )
      );
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Patient</th>
                <th className="p-3 border-b">Doctor</th>
                <th className="p-3 border-b">Time</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="text-center border-t">
                  <td className="p-3">{appointment.patientName}</td>
                  <td className="p-3">{appointment.doctorName}</td>
                  <td className="p-3">{appointment.time}</td>
                  <td className="p-3 capitalize">{appointment.status}</td>
                  <td className="p-3">
                    {appointment.status !== "confirmed" ? (
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                        onClick={() => handleConfirm(appointment._id)}
                      >
                        Confirm
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Confirmed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
