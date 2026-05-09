import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();

  const features = [
    {
      title: "AI Debugging",
      description:
        "Instantly analyze and fix coding errors using advanced AI assistance.",
    },
    {
      title: "Code Optimization",
      description:
        "Improve performance, readability, and scalability of your code.",
    },
    {
      title: "Simple Explanations",
      description:
        "Understand complex coding concepts in beginner-friendly language.",
    },
    {
      title: "Learning Assistant",
      description:
        "Get personalized coding guidance and roadmap suggestions.",
    },
  ];

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="w-full border-b border-[#111827] bg-[#030712]/90 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <img
              src="/logo.png"
              alt="CodeMedic"
              className="w-12 h-12 rounded-lg object-cover"
            />

            <h1 className="text-3xl font-bold tracking-tight">

              CodeMedic

            </h1>

          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-10 text-gray-300 text-lg font-medium">

            <button className="hover:text-cyan-400 transition">

              Features

            </button>

            <button className="hover:text-cyan-400 transition">

              Pricing

            </button>

            <button className="hover:text-cyan-400 transition">

              About

            </button>

          </div>

          {/* GET STARTED BUTTON */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#182B63] hover:bg-[#223A82] border border-[#3451A3] text-white px-7 py-3 rounded-xl text-lg font-semibold shadow-lg shadow-[#182B63]/30 transition-all duration-300"
          >

            Get Started

          </button>

        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">

        {/* GLOW EFFECT */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">

          <div className="w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full mt-10" />

        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-14 text-center">

          {/* BADGE */}
          <div className="inline-flex items-center px-6 py-2 rounded-full border border-cyan-900/40 bg-[#07111F] text-cyan-400 text-lg font-medium mb-8">

            AI-Powered Coding Assistant

          </div>

          {/* MAIN TITLE */}
          <h1 className="text-[72px] leading-[1.05] font-extrabold tracking-tight">

            Understand.
            <span className="text-cyan-400"> Fix. </span>
            Grow.

          </h1>

          {/* SUBTITLE */}
          <p className="max-w-3xl mx-auto mt-8 text-gray-400 text-2xl leading-[1.6]">

            CodeMedic helps developers debug errors,
            optimize code, and learn programming concepts
            with AI-powered explanations.

          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">

            {/* START DEBUGGING BUTTON */}
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#182B63] hover:bg-[#223A82] border border-[#3451A3] text-white px-9 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-[#182B63]/30 transition-all duration-300"
            >

              Start Debugging

            </button>

            {/* VIEW DEMO BUTTON */}
            <button
              className="bg-[#182B63] hover:bg-[#223A82] border border-[#3451A3] text-white px-9 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-[#182B63]/30 transition-all duration-300"
            >

              View Demo

            </button>

          </div>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-[#07111F] border border-[#13233B] rounded-2xl p-7 hover:border-cyan-900/40 transition-all duration-300"
            >

              <h2 className="text-2xl font-bold mb-5 text-white leading-tight">

                {feature.title}

              </h2>

              <p className="text-gray-400 text-lg leading-[1.8]">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </section>

    </div>

  );

}

export default HomePage;