import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#020817",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Navbar />

      {/* HERO SECTION */}
      <section
        style={{
          padding: "120px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 25px",
            border: "1px solid #0ea5e9",
            borderRadius: "30px",
            marginBottom: "30px",
            color: "#22d3ee",
            fontWeight: "600",
          }}
        >
          AI-Powered Coding Assistant
        </div>

        <h1
          style={{
            fontSize: "5rem",
            fontWeight: "800",
            marginBottom: "30px",
          }}
        >
          Understand.{" "}
          <span
            style={{
              color: "#06b6d4",
            }}
          >
            Fix.
          </span>{" "}
          Grow.
        </h1>

        <p
          style={{
            fontSize: "1.5rem",
            color: "#9ca3af",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: "2.2rem",
          }}
        >
          CodeMedic helps developers debug errors, optimize code, and learn
          programming concepts with AI-powered explanations.
        </p>

        {/* Buttons */}
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            gap: "25px",
          }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "18px 40px",
              background: "#1d4ed8",
              border: "none",
              borderRadius: "16px",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Start Debugging
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "18px 40px",
              background: "#312e81",
              border: "none",
              borderRadius: "16px",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            View Demo
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        style={{
          padding: "80px 40px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "60px",
          }}
        >
          Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          {[
            {
              title: "AI Debugging",
              desc: "Instantly analyze and fix coding errors using AI.",
            },
            {
              title: "Code Optimization",
              desc: "Improve performance and readability of code.",
            },
            {
              title: "Simple Explanations",
              desc: "Understand complex coding concepts easily.",
            },
            {
              title: "Learning Assistant",
              desc: "Get personalized coding guidance and suggestions.",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: "#071126",
                padding: "35px",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "20px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#9ca3af",
                  lineHeight: "1.8rem",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        style={{
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
          }}
        >
          Pricing
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "1.2rem",
          }}
        >
          Currently free for all developers 🚀
        </p>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{
          padding: "80px 40px 120px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
          }}
        >
          About CodeMedic
        </h2>

        <p
          style={{
            color: "#9ca3af",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: "2rem",
            fontSize: "1.1rem",
          }}
        >
          CodeMedic is an AI-powered debugging and learning platform built to
          help developers understand errors, optimize code, and improve their
          programming skills with simple explanations.
        </p>
      </section>
    </div>
  );
};

export default Home;