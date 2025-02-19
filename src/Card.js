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

// ✅ Main Card Component
const Card = () => {
  console.log("📌 Card component is rendering...");

  // ✅ State to manage selected date
  const [selectedDate, setSelectedDate] = useState(moment());

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
