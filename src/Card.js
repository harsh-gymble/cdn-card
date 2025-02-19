"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom/client"; // React 18 API
import moment from "moment";

// ✅ Import the DatePicker Component
const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const startDate = moment();
  const daysToShow = 30;

  return (
    <div style={{ padding: "10px", textAlign: "center", background: "#f1f1f1", borderRadius: "10px" }}>
      <h3>Select a Date:</h3>
      <div style={{ display: "flex", overflowX: "auto", padding: "5px" }}>
        {[...Array(daysToShow)].map((_, index) => {
          const date = startDate.clone().add(index, "day");
          return (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              style={{
                padding: "5px",
                margin: "3px",
                borderRadius: "5px",
                background: date.isSame(selectedDate, "day") ? "#007bff" : "#fff",
                color: date.isSame(selectedDate, "day") ? "#fff" : "#000",
                border: "1px solid #ccc",
                cursor: "pointer"
              }}
            >
              {date.format("DD MMM")}
            </button>
          );
        })}
      </div>
      <p>📅 Selected Date: {selectedDate.format("D MMM, YYYY")}</p>
    </div>
  );
};

// ✅ Dummy Event Data
const eventData = [
  {
    bookingDate: "2025-02-18",
    bookings: [{ title: "Photography Session", time: "10:00 AM - 12:00 PM", location: "Surat, India", count: 15 }],
  },
  {
    bookingDate: "2025-02-19",
    bookings: [{ title: "Pre-Wedding Shoot", time: "11:00 AM - 1:00 PM", location: "Mumbai, India", count: 10 }],
  },
  {
    bookingDate: "2025-02-20",
    bookings: [{ title: "Wedding Reception", time: "3:00 PM - 6:00 PM", location: "Delhi, India", count: 25 }],
  },
];

// ✅ Event List Component
const EventList = ({ selectedDate }) => {
  const selectedDateStr = selectedDate.format("YYYY-MM-DD");

  const eventsForDate = eventData.find((event) => event.bookingDate === selectedDateStr);

  return (
    <div style={{ marginTop: "10px", padding: "10px", background: "#fff", borderRadius: "10px" }}>
      <h3>📅 Events on {selectedDate.format("D MMM, YYYY")}</h3>
      {eventsForDate ? (
        eventsForDate.bookings.map((event, index) => (
          <div key={index} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <h4>{event.title}</h4>
            <p>🕒 {event.time}</p>
            <p>📍 {event.location}</p>
            <p>👥 {event.count} Attendees</p>
          </div>
        ))
      ) : (
        <p>No events found for this date.</p>
      )}
    </div>
  );
};

// ✅ Main Card Component
const Card = () => {
  console.log("📌 Card component is rendering...");

  // ✅ State to manage selected date
  const [selectedDate, setSelectedDate] = useState(moment("2025-02-18", "YYYY-MM-DD"));

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "8px",
      maxWidth: "400px",
      background: "#f9f9f9",
      textAlign: "center"
    }}>
      <h2>CDN Card Component</h2>
      <p>✅ Loaded successfully via GitHub Pages!</p>

      {/* ✅ Include DatePicker Inside Card */}
      <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* ✅ Show Event List */}
      <EventList selectedDate={selectedDate} />
    </div>
  );
};

// ✅ Function to mount the component dynamically
window.loadCardComponent = (elementId) => {
  console.log("⚡ loadCardComponent function is called.");

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`❌ Error: Element with ID '${elementId}' not found.`);
    return;
  }

  console.log(`⚡ Mounting Card Component to #${elementId}`);

  try {
    const root = ReactDOM.createRoot(element);
    root.render(<Card />);
  } catch (error) {
    console.error("❌ Error rendering Card component:", error);
  }
};
