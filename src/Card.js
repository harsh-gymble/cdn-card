"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client"; // React 18 API
import moment from "moment";
import { X, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ModalLayout({
  isOpen,
  modalTitle,
  setIsOpen,
  children,
  modalWidth,
  tab,
  dontCloseWhenClickedOut,
  minHeight,
  hideX,
  bgColor,
  maxHeight,
}) {
  const [isMainDiv, setIsMainDiv] = useState(false);
  const [childDiv, setChildDiv] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1000) {
        setIsMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
      setIsMainDiv(isOpen);
      setTimeout(() => {
        setChildDiv(true);
      }, 500);
    } else {
      document.body.classList.remove("no-scroll");
      setIsMainDiv(isOpen);
      setTimeout(() => {
        setChildDiv(isOpen);
      }, 500);
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          onClick={() => {
            if (!dontCloseWhenClickedOut) {
              setChildDiv(false);
              setTimeout(() => {
                setIsOpen(false);
                setIsMainDiv(false);
              }, 500);
            }
          }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black bg-opacity-60"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg w-[400px]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{modalTitle}</h3>
              <X
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-gray-500 hover:text-gray-800"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

// ✅ Updated DatePicker Component
const DatePickerComponent = ({ selectedDate, setSelectedDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const startDate = moment();
  const daysToShow = 30;

  return (
    <div
      style={{
        padding: "10px",
        textAlign: "center",
        background: "#f1f1f1",
        borderRadius: "10px",
      }}
    >
      <h3>Select a Date:</h3>
      <div style={{ display: "flex", overflowX: "auto", padding: "5px" }}>
        {/* 📅 Fixed Date Picker Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "5px",
            margin: "3px",
            borderRadius: "5px",
            background: "#007bff",
            color: "#fff",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <Calendar size={16} /> Select Date
        </button>

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
                background: date.isSame(selectedDate, "day")
                  ? "#007bff"
                  : "#fff",
                color: date.isSame(selectedDate, "day") ? "#fff" : "#000",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {date.format("DD MMM")}
            </button>
          );
        })}
      </div>

      {/* 📅 Date Picker Modal */}
      <ModalLayout
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        modalTitle="Select a Date"
      >
        <DatePicker
          selected={selectedDate.toDate()}
          onChange={(date) => {
            setSelectedDate(moment(date));
            setIsModalOpen(false);
          }}
          inline
        />
      </ModalLayout>

      <p>📅 Selected Date: {selectedDate.format("D MMM, YYYY")}</p>
    </div>
  );
};

// ✅ Event List Component (No Changes)
const EventList = ({ selectedDate }) => {
  const selectedDateStr = selectedDate.format("YYYY-MM-DD");
  const eventsForDate = eventData.find(
    (event) => event.bookingDate === selectedDateStr
  );

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      <h3>📅 Events on {selectedDate.format("D MMM, YYYY")}</h3>
      {eventsForDate ? (
        eventsForDate.bookings.map((event, index) => (
          <div
            key={index}
            style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
          >
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

// ✅ Dummy Event Data (No Changes)
const eventData = [
  {
    bookingDate: "2025-02-18",
    bookings: [
      {
        title: "Photography Session",
        time: "10:00 AM - 12:00 PM",
        location: "Surat, India",
        count: 15,
      },
    ],
  },
  {
    bookingDate: "2025-02-19",
    bookings: [
      {
        title: "Pre-Wedding Shoot",
        time: "11:00 AM - 1:00 PM",
        location: "Mumbai, India",
        count: 10,
      },
    ],
  },
  {
    bookingDate: "2025-02-20",
    bookings: [
      {
        title: "Wedding Reception",
        time: "3:00 PM - 6:00 PM",
        location: "Delhi, India",
        count: 25,
      },
    ],
  },
];

// ✅ Main Card Component
const Card = () => {
  console.log("📌 Card component is rendering...");
  const [selectedDate, setSelectedDate] = useState(
    moment("2025-02-25", "YYYY-MM-DD")
  );
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://test-api.gymble.us/website/business/profile/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bisLink: "all-star-basketball-academy",
            locationId: null,
            page: 1,
            limit: 5,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data);
        setBusinessData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        maxWidth: "400px",
        background: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h2>CDN Card Component</h2>
      <p>✅ Loaded successfully via GitHub Pages!</p>

      {/* ✅ Updated DatePicker Component */}
      <DatePickerComponent
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

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
  const root = ReactDOM.createRoot(element);
  root.render(<Card />);
};
