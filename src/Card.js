"use client"; // Ensures Next.js compatibility

import React from "react";
import ReactDOM from "react-dom/client"; // React 18 API

// ✅ New DateComponent inside Card
const DateComponent = () => {
  return (
    <p style={{ fontSize: "14px", color: "#555" }}>
      📅 Today's Date: {new Date().toLocaleDateString()}
    </p>
  );
};

// ✅ Main Card Component
const Card = () => {
  console.log("📌 Card component is rendering...");

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "8px",
      maxWidth: "300px",
      background: "#f9f9f9",
      textAlign: "center"
    }}>
      <h2>CDN Card Component</h2>
      <p>✅ Loaded successfully via GitHub Pages!</p>
      {/* ✅ Include the DateComponent inside Card */}
      <DateComponent />
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
