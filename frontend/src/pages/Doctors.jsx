/* src/pages/Doctors.jsx */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

// Helper: slugify text for URLs
const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

// Get the next 7 days
const getNext7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
};

// Time slots
const getSlotsFor = () => ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

export default function Doctors() {
  const { slug, docId } = useParams();
  const navigate = useNavigate();
  const { doctors, bookAppointment, appointments, setAppointments } =
    useContext(AppContext);

  // Specialities filter
  const allSpecialities = Array.from(new Set(doctors.map((d) => d.speciality)));
  const activeSpeciality = allSpecialities.find(
    (spec) => slugify(spec) === slug
  );

  // Filtered doctors
  const [filterDoc, setFilterDoc] = useState([]);
  const applyFilter = useCallback(() => {
    setFilterDoc(
      activeSpeciality
        ? doctors.filter((d) => d.speciality === activeSpeciality)
        : doctors
    );
  }, [doctors, activeSpeciality]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  // Booking state
  const days = getNext7Days();
  const [chosenDate, setChosenDate] = useState(days[0]);
  const [chosenSlot, setChosenSlot] = useState("");

  // Detail view: when docId is present
  if (docId) {
    const selected = doctors.find((d) => d._id === docId);
    if (!selected) {
      return <p className="text-red-600">Doctor not found.</p>;
    }

    const handleBooking = async () => {
      if (!chosenSlot) {
        alert("Please select a time slot.");
        return;
      }

      const appt = {
        doctorId: selected._id,
        doctorName: selected.name,
        speciality: selected.speciality,
        date: chosenDate.toDateString(),
        time: chosenSlot,
        fees: selected.fees,
        address: `${selected.address.line1}, ${selected.address.line2}`,
        image: selected.image,
      };

      try {
        const newAppt = await bookAppointment(appt);
        alert(
          "✅ Appointment booked! A confirmation email has been sent to both you and the doctor."
        );
        setAppointments([...appointments, newAppt]);
        navigate("/my-appointments");
      } catch (err) {
        console.error("Booking error:", err);
        alert("❌ Could not book appointment. Please try again.");
      }
    };

    return (
      <div className="space-y-6">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          ← Back to list
        </button>

        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={selected.image}
            alt={selected.name}
            className="bg-primary w-full sm:max-w-72 rounded-lg"
          />
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-blue-50 mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
              {selected.name}
              <img
                src="/verified_icon.svg"
                alt="Verified"
                className="inline w-5 h-5 ml-1"
              />
            </h2>
            <p className="text-gray-600">{selected.speciality}</p>
            <p>🎓 Degree: {selected.degree}</p>
            <p>🗓️ Experience: {selected.experience} years</p>
            <p>💵 Fees: ${selected.fees}</p>
            <p>
              📍 {selected.address.line1}, {selected.address.line2}
            </p>
            <p className="text-gray-700 mt-2">{selected.about}</p>
          </div>
        </div>

        {/* Date picker */}
        <div className="flex gap-2 justify-center overflow-x-auto py-2">
          {days.map((d) => {
            const active = d.toDateString() === chosenDate.toDateString();
            return (
              <button
                key={d.toDateString()}
                onClick={() => setChosenDate(d)}
                className={`px-4 py-2 rounded whitespace-nowrap ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {d.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </button>
            );
          })}
        </div>

        {/* Time slots */}
        <div className="grid grid-cols-2 gap-4">
          {getSlotsFor().map((slot) => {
            const active = slot === chosenSlot;
            return (
              <button
                key={slot}
                onClick={() => setChosenSlot(slot)}
                className={`px-4 py-2 border rounded ${
                  active ? "bg-blue-600 text-white" : "hover:bg-blue-500"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        {/* Book button */}
        <button
          onClick={handleBooking}
          className="mt-1 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>

        {/* Related carousel */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium mb-4">
            Related in {selected.speciality}
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {doctors
              .filter(
                (d) => d.speciality === selected.speciality && d._id !== docId
              )
              .map((d) => (
                <Link
                  key={d._id}
                  to={`/doctors/${slugify(d.speciality)}/${d._id}`}
                  className="w-40 border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-sm font-medium">{d.name}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // List / Filter view
  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-700 font-semibold text-xl md:text-2xl tracking-wide mb-2">
          Browse through the Oncologists
        </p>
        <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 mt-5">
        {/* Sidebar */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {allSpecialities.map((spec) => {
            const specSlug = slugify(spec);
            const isActive = spec === activeSpeciality;
            return (
              <p
                key={specSlug}
                onClick={() =>
                  navigate(
                    isActive
                      ? "/doctors"
                      : `/doctors/${encodeURIComponent(specSlug)}`
                  )
                }
                className={`px-3 py-1.5 border rounded truncate cursor-pointer transition ${
                  isActive
                    ? "bg-blue-100 border-blue-600 text-blue-600 font-semibold"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {spec}
              </p>
            );
          })}
        </div>

        {/* Doctor cards */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((doc) => (
            <div
              key={doc._id}
              onClick={() =>
                navigate(
                  `/doctors/${slugify(doc.speciality)}/${encodeURIComponent(
                    doc._id
                  )}`
                )
              }
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-200"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <p className="text-lg font-medium">{doc.name}</p>
                <p className="text-gray-600 text-sm">{doc.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
