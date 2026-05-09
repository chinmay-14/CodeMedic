import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

import {
  ArrowLeft,
  Clock3,
  Bug,
  Search,
  Trash2,
  X,
} from "lucide-react";

function HistoryPage() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  const [search, setSearch] = useState("");

  const [filterLanguage, setFilterLanguage] = useState("all");

  useEffect(() => {

    const savedHistory =
      JSON.parse(localStorage.getItem("codemedic-history")) || [];

    setHistory(savedHistory);

  }, []);

  /* DELETE SINGLE ITEM */

  const deleteHistoryItem = (id) => {

    const updatedHistory =
      history.filter((item) => item.id !== id);

    setHistory(updatedHistory);

    localStorage.setItem(
      "codemedic-history",
      JSON.stringify(updatedHistory)
    );

  };

  /* CLEAR ALL HISTORY */

  const clearAllHistory = () => {

    setHistory([]);

    localStorage.removeItem("codemedic-history");

  };

  /* FILTER LOGIC */

  const filteredHistory = history.filter((item) => {

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase());

    const matchesLanguage =
      filterLanguage === "all" ||
      item.language === filterLanguage;

    return matchesSearch && matchesLanguage;

  });

  return (

    <div className="min-h-screen bg-[#020617] text-white">

      {/* TOP */}
      <div className="border-b border-[#111827] px-8 py-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="CodeMedic"
            className="w-14 h-14 rounded-xl"
          />

          <div>

            <h1 className="text-3xl font-bold">
              Analysis History
            </h1>

            <p className="text-gray-500 mt-1 text-sm">
              View your previous AI debugging sessions.
            </p>

          </div>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#172554] hover:bg-[#1E3A8A] border border-[#1E40AF] px-5 py-3 rounded-2xl text-base font-semibold transition flex items-center gap-3"
        >

          <ArrowLeft size={20} />

          Back to Dashboard

        </button>

      </div>

      {/* SEARCH + FILTER */}
      <div className="px-8 pt-8 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="relative w-[280px]">

            <Search
              className="absolute left-4 top-3.5 text-gray-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search analysis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#07111F] border border-[#1E293B] rounded-xl pl-11 pr-4 py-3 outline-none text-white"
            />

          </div>

          {/* FILTER */}
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="bg-[#07111F] border border-[#1E293B] px-4 py-3 rounded-xl text-white outline-none"
          >

            <option value="all">
              All Languages
            </option>

            <option value="javascript">
              JavaScript
            </option>

            <option value="python">
              Python
            </option>

            <option value="java">
              Java
            </option>

            <option value="cpp">
              C++
            </option>

          </select>

        </div>

        {/* CLEAR ALL BUTTON */}
        <button
          onClick={clearAllHistory}
          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl transition"
        >

          <Trash2 size={18} />

          Clear History

        </button>

      </div>

      {/* HISTORY GRID */}
      <div className="p-8 grid grid-cols-3 gap-6">

        {filteredHistory.length > 0 ? (

          filteredHistory.map((item) => (

            <div
              key={item.id}
              className="bg-[#07111F] border border-[#0F2A44] rounded-3xl p-5 hover:border-cyan-500/40 transition"
            >

              {/* TOP */}
              <div className="flex items-center justify-between mb-8">

                {/* LEFT */}
                <div className="bg-[#0F172A] p-3 rounded-xl">

                  <Bug
                    className="text-cyan-400"
                    size={22}
                  />

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">

                  <div className="flex items-center gap-2 text-gray-500 text-sm">

                    <Clock3 size={16} />

                    {item.time}

                  </div>

                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >

                    <X size={18} />

                  </button>

                </div>

              </div>

              {/* TITLE */}
              <h2 className="text-xl font-bold leading-tight mb-5">

                {item.title}

              </h2>

              {/* LANGUAGE */}
              <p className="text-gray-500 text-base mb-7">

                Language: {item.language}

              </p>

              {/* BUTTON */}
              <button
                onClick={() =>
                  navigate("/history-details", {
                    state: item,
                  })
                }
                className="w-full bg-[#172554] hover:bg-[#1E3A8A] border border-[#1E40AF] py-3 rounded-2xl text-base font-semibold transition text-white"
              >

                View Analysis

              </button>

            </div>

          ))

        ) : (

          <div className="text-gray-500 text-lg">

            No matching history found.

          </div>

        )}

      </div>

    </div>

  );

}

export default HistoryPage;