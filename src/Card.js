"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client"; // React 18 API
import moment from "moment";
import { X } from "lucide-react";

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
  btnLoader,
  isDisabled,
  isHeaderBtn,
  isHeaderBtnClick,
  message,
  bgColor,
  maxHeight,
}) {
  const [isMainDiv, setIsMainDiv] = useState(false);
  const [childDiv, setChildDiv] = useState(false);
  const [loader, setLoader] = useState(false);
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
      <div
        onClick={(e) => {
          if (!dontCloseWhenClickedOut) {
            setChildDiv(false);
            setTimeout(() => {
              setIsOpen(false);
              setIsMainDiv(false);
            }, 500);
          }
        }}
        className={`fixed h-[100vh] left-0 top-0 bottom-0 right-0 z-[100000] w-full ${
          isMainDiv ? "flex" : "hidden"
        } h-full justify-center items-center bg-opacity-[0.6] overflow-hidden bg-black
          xsm:items-end sm:items-end md:items-end`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            width: isMobile ? "100%" : modalWidth ? `${modalWidth}` : "30%",
          }}
          className={`relative z-[100]  overflow-y-auto ${
            maxHeight ? maxHeight : "max-h-[90vh]"
          }  ${modalTitle ? "pb-6" : ""} ${
            childDiv
              ? "scale-[1] xsm:translate-y-0 sm:translate-y-0 md:translate-y-0 xsm:scale-100 sm:scale-100 md:scale-100 duration-300"
              : "scale-0 xsm:translate-y-[1500px] sm:translate-y-[1500px] md:translate-y-[1500px] xsm:scale-100 sm:scale-100 md:scale-100 xsm:duration-1000 sm:duration-1000 md:duration-1000 duration-300"
          } ${tab ? "min-h-[80vh]" : ""} transform transition-all ease-out ${
            bgColor ? bgColor : "bg-[#f7f7f7]"
          }  rounded-lg shadow
            xsm:max-h-[85vh] sm:max-h-[85vh] md:max-h-[85vh]
            xsm:h-auto sm:h-auto md:h-auto
            xsm:rounded-t-lg sm:rounded-t-lg md:rounded-t-lg
            xsm:rounded-b-none sm:rounded-b-none md:roundedt-b-none
            xsm:w-full sm:w-full md:w-full`}
        >
          <div
            className={`cursor-pointer px-5 ${
              modalTitle ? "py-3 border-b-[1px]" : ""
            } items-center border-gray-20 flex justify-center`}
          >
            <h3 className="mx-auto flex justify-center items-center w-full font-heading text-[24px] xxl:text-[22px] font-semibold">
              {isMobile ? (
                <>
                  {modalTitle?.substring(0, 20)}
                  {modalTitle?.length > 20 && "..."}
                </>
              ) : (
                modalTitle
              )}
            </h3>{" "}
            {!hideX && (
              <X
                onClick={(e) => {
                  e.stopPropagation();
                  setChildDiv(false);
                  setTimeout(() => {
                    setIsOpen(false);
                    setIsMainDiv(false);
                  }, 500);
                }}
                className={`text-[20px] ml-auto ${
                  modalTitle
                    ? ""
                    : `absolute ${
                        bgColor == "bg-white" ? "top-[20px]" : "top-[12px]"
                      } right-[12px]`
                }`}
              />
            )}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// ✅ DatePicker Component (No Changes)
const DatePicker = ({ selectedDate, setSelectedDate }) => {
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

  // ✅ State to manage selected date (No Changes)
  const [selectedDate, setSelectedDate] = useState(
    moment("2025-02-18", "YYYY-MM-DD")
  );

  // ✅ State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {/* ✅ Include DatePicker Inside Card */}
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* ✅ Show Event List */}
      <EventList selectedDate={selectedDate} />

      {/* ✅ Button to Open Modal */}
      <button
        style={{
          marginTop: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          background: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>

      {/* ✅ Modal Layout */}
      {isModalOpen && (
        <ModalLayout
          isOpen={isModalOpen}
          minHeight
          setIsOpen={setIsModalOpen}
          modalWidth={"70%"}
          tab={false}
          dontCloseWhenClickedOut={false}
          bgColor={"bg-white"}
        >
          <div className="my-5">
            <h3>📅 This is the Calendar Modal</h3>
            <p>Click outside or press "X" to close.</p>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

// ✅ Function to mount the component dynamically (No Changes)
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
