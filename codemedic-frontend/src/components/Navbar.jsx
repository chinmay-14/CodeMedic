import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        width: "100%",
        height: "90px",
        background: "#020817",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 60px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
          }}
        />

        <h1
          style={{
            color: "white",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          CodeMedic
        </h1>
      </div>

      {/* Nav Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <a
          href="#features"
          style={{
            color: "#d1d5db",
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        >
          Features
        </a>

        <a
          href="#pricing"
          style={{
            color: "#d1d5db",
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        >
          Pricing
        </a>

        <a
          href="#about"
          style={{
            color: "#d1d5db",
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        >
          About
        </a>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "14px 30px",
            background: "#1d4ed8",
            border: "none",
            borderRadius: "14px",
            color: "white",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;