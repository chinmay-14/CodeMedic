import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Settings,
  Save,
} from "lucide-react";

import toast from "react-hot-toast";

function SettingsPage() {

  const navigate = useNavigate();

  const [fontSize, setFontSize] =
    useState(15);

  const [typingSpeed, setTypingSpeed] =
    useState(10);

  /* LOAD SETTINGS */

  useEffect(() => {

    const savedFont =
      localStorage.getItem("editor-font-size");

    const savedSpeed =
      localStorage.getItem("typing-speed");

    if (savedFont) {
      setFontSize(Number(savedFont));
    }

    if (savedSpeed) {
      setTypingSpeed(Number(savedSpeed));
    }

  }, []);

  /* SAVE SETTINGS */

  const saveSettings = () => {

    localStorage.setItem(
      "editor-font-size",
      fontSize
    );

    localStorage.setItem(
      "typing-speed",
      typingSpeed
    );

    toast.success(
      "Settings saved successfully!"
    );

  };

  return (

    <div className="min-h-screen bg-[#020617] text-white px-8 py-6">

      {/* HEADER */}
      <div className="flex items-start justify-between mb-8">

        <div className="flex items-center gap-4">

          <div className="bg-[#07111F] border border-[#1E293B] p-4 rounded-xl">

            <Settings
              size={28}
              className="text-cyan-400"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold leading-none">
              Settings
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Customize your CodeMedic experience.
            </p>

          </div>

        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#172554] hover:bg-[#1E3A8A] border border-[#1E40AF] px-6 py-3 rounded-2xl flex items-center gap-3 transition text-sm"
        >

          <ArrowLeft size={22} />

          Back

        </button>

      </div>

      {/* SETTINGS CARD */}
      <div className="w-[500px] bg-[#07111F] border border-[#111827] rounded-3xl p-10">

        {/* FONT SIZE */}
        <div className="mb-10">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-semibold">
              Editor Font Size
            </h2>

            <span className="text-white text-xl">
              {fontSize}px
            </span>

          </div>

          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) =>
              setFontSize(e.target.value)
            }
            className="w-full h-2"
          />

          <p className="text-gray-500 mt-3 text-lg">
            Current: {fontSize}px
          </p>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-[#1E293B] mb-10"></div>

        {/* TYPING SPEED */}
        <div className="mb-10">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-semibold">
              AI Typing Speed
            </h2>

            <span className="text-white text-xl">
              {typingSpeed}ms
            </span>

          </div>

          <input
            type="range"
            min="1"
            max="50"
            value={typingSpeed}
            onChange={(e) =>
              setTypingSpeed(e.target.value)
            }
            className="w-full h-2"
          />

          <p className="text-gray-500 mt-3 text-lg">
            Current: {typingSpeed}ms
          </p>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-[#1E293B] mb-8"></div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          className="bg-[#172554] hover:bg-[#1E3A8A] border border-[#1E40AF] px-8 py-4 rounded-2xl flex items-center gap-3 text-xl font-semibold transition"
        >

          <Save size={22} />

          Save Settings

        </button>

      </div>

    </div>

  );

}

export default SettingsPage;