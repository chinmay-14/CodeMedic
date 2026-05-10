import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logo from "../assets/logo.png";

import {
  LayoutDashboard,
  History,
  Settings,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Wand2,
  Download,
  Trash2,
  Bug,
  Code2,
  LogOut,
} from "lucide-react";

function Dashboard() {

  const navigate = useNavigate();

  const [language, setLanguage] =
    useState("javascript");

  const [code, setCode] = useState(`const user = null;

console.log(user.name);
`);

  const [analysis, setAnalysis] =
    useState("");

  const [displayedAnalysis,
    setDisplayedAnalysis] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  /* ANALYZE */

  const handleAnalyze = async () => {

    try {

      setLoading(true);

      setDisplayedAnalysis("");

      const response = await axios.post(

        `${import.meta.env.VITE_BACKEND_URL}/api/ai/analyze`,

        {
          code,
          language,
        }

      );

      const aiResponse =
        response.data.analysis;

      setAnalysis(aiResponse);

      /* SAVE HISTORY */

      const newHistoryItem = {

        id: Date.now(),

        title:
          code.slice(0, 40) + "...",

        language,

        time:
          new Date().toLocaleString(),

        analysis: aiResponse,

        code,

      };

      const existingHistory =
        JSON.parse(
          localStorage.getItem(
            "codemedic-history"
          )
        ) || [];

      localStorage.setItem(

        "codemedic-history",

        JSON.stringify([
          newHistoryItem,
          ...existingHistory,
        ])

      );

      /* TYPING EFFECT */

      let index = 0;

      const interval = setInterval(() => {

        setDisplayedAnalysis(
          aiResponse.slice(0, index)
        );

        index++;

        if (
          index > aiResponse.length
        ) {

          clearInterval(interval);

        }

      }, 8);

      toast.success(
        "Analysis complete!"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Analysis failed"
      );

    } finally {

      setLoading(false);

    }

  };

  /* COPY */

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(
        analysis
      );

      setCopied(true);

      toast.success("Copied!");

      setTimeout(() => {

        setCopied(false);

      }, 2000);

    } catch (error) {

      toast.error("Copy failed");

    }

  };

  /* CLEAR */

  const handleClearCode = () => {

    setCode("");

    setAnalysis("");

    setDisplayedAnalysis("");

    toast.success(
      "Workspace cleared"
    );

  };

  /* SAMPLE BUG */

  const insertSampleBug = () => {

    if (language === "javascript") {

      setCode(`const user = null;

console.log(user.name);
`);

    }

    else if (
      language === "python"
    ) {

      setCode(`numbers = [1,2,3]

print(numbers[10])
`);

    }

    else if (
      language === "java"
    ) {

      setCode(`public class Main {

  public static void main(String[] args) {

    int[] arr = {1,2,3};

    System.out.println(arr[10]);

  }

}
`);

    }

    else {

      setCode(`#include<iostream>
using namespace std;

int main(){

  int arr[3] = {1,2,3};

  cout << arr[10];

}
`);

    }

    toast.success(
      "Sample bug inserted"
    );

  };

  /* DOWNLOAD */

  const handleDownload = () => {

    const content = `
CODEMEDIC ANALYSIS

LANGUAGE:
${language}

CODE:
${code}

ANALYSIS:
${analysis}
`;

    const blob = new Blob(
      [content],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "codemedic-analysis.txt";

    link.click();

    URL.revokeObjectURL(url);

    toast.success("Downloaded!");

  };

  return (

    <div className="bg-[#020617] min-h-screen text-white flex overflow-hidden">

      {/* SIDEBAR */}

      <div className="w-64 border-r border-[#111827] bg-[#030712] p-5 flex flex-col">

        {/* LOGO */}

        <div className="flex items-center gap-3 mb-10">

          <img
            src={logo}
            alt="CodeMedic"
            className="w-12 h-12 rounded-xl"
          />

          <div>

            <h1 className="text-2xl font-bold">
              CodeMedic
            </h1>

            <p className="text-gray-500 text-sm">
              AI Coding Assistant
            </p>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="flex flex-col gap-3">

          <button className="flex items-center gap-3 bg-[#0F172A] border border-[#1E293B] text-cyan-400 px-4 py-3 rounded-2xl">

            <LayoutDashboard size={20} />

            Dashboard

          </button>

          <button
            onClick={() =>
              navigate("/history")
            }
            className="flex items-center gap-3 hover:bg-[#0F172A] text-gray-300 hover:text-white px-4 py-3 rounded-2xl transition"
          >

            <History size={20} />

            History

          </button>

          <button
            onClick={() =>
              navigate("/settings")
            }
            className="flex items-center gap-3 hover:bg-[#0F172A] text-gray-300 hover:text-white px-4 py-3 rounded-2xl transition"
          >

            <Settings size={20} />

            Settings

          </button>

          {/* LOGOUT */}

          <button

            onClick={() => {

              localStorage.removeItem(
                "codemedic-token"
              );

              localStorage.removeItem(
                "codemedic-user"
              );

              window.location.href =
                "/login";

            }}

            className="
              flex items-center gap-3
              hover:bg-red-950
              text-red-400
              px-4 py-3
              rounded-2xl
              transition
              mt-2
            "
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* PRO CARD */}

        <div className="mt-auto border border-cyan-900/30 bg-[#07111F] rounded-2xl p-5">

          <div className="flex items-center gap-2 mb-4 text-cyan-400">

            <Sparkles size={18} />

            <span className="font-semibold">
              Pro AI Features
            </span>

          </div>

          <p className="text-gray-500 text-sm leading-7">

            Unlock advanced debugging,
            optimization, and AI explanations.

          </p>

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}

        <div className="border-b border-[#111827] px-6 py-4 flex items-center justify-between bg-[#020617]">

          <div>

            <h2 className="text-2xl font-bold">
              AI Debugging Workspace
            </h2>

            <p className="text-gray-500 mt-2 text-sm">

              Paste your code and let
              CodeMedic analyze it.

            </p>

          </div>

          <div className="flex items-center gap-3">

            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }
              className="bg-[#07111F] border border-[#1E293B] text-white px-4 py-2 rounded-xl outline-none"
            >

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

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-[#172554] hover:bg-[#1E3A8A] border border-[#1E40AF] px-5 py-2.5 rounded-2xl font-semibold transition flex items-center gap-3 text-white"
            >

              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  Analyze Code
                </>
              )}

            </button>

          </div>

        </div>

        {/* WORKSPACE */}

        <div className="flex-1 grid grid-cols-2 gap-5 p-5 bg-[#020617]">

          {/* CODE PANEL */}

          <div className="bg-[#07111F] border border-[#111827] rounded-2xl p-4">

            <h3 className="text-xl font-bold mb-3">
              Your Code
            </h3>

            <div className="h-[500px] overflow-hidden rounded-2xl border border-[#1E293B]">

              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) =>
                  setCode(value)
                }
                options={{
                  minimap: {
                    enabled: false,
                  },
                  fontSize: 15,
                  wordWrap: "on",
                }}
              />

            </div>

          </div>

          {/* AI PANEL */}

          <div className="bg-[#07111F] border border-[#111827] rounded-2xl p-4">

            <div className="flex items-center justify-between mb-3">

              <h3 className="text-xl font-bold">
                AI Analysis
              </h3>

              <div className="flex items-center gap-3">

                <button
                  onClick={insertSampleBug}
                  className="flex items-center gap-2 bg-[#111827] hover:bg-[#172554] border border-[#1E293B] px-4 py-2 rounded-xl text-sm transition"
                >

                  <Bug size={16} />

                  Sample Bug

                </button>

                <button
                  onClick={handleClearCode}
                  className="flex items-center gap-2 bg-[#111827] hover:bg-red-950 border border-[#1E293B] px-4 py-2 rounded-xl text-sm transition"
                >

                  <Trash2 size={16} />

                  Clear

                </button>

                {analysis && (

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-[#111827] hover:bg-[#1E293B] border border-[#1E293B] px-4 py-2 rounded-xl text-sm transition"
                  >

                    {copied ? (
                      <>
                        <Check size={16} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}

                  </button>

                )}

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-[#111827] hover:bg-[#1E293B] border border-[#1E293B] px-4 py-2 rounded-xl text-sm transition"
                >

                  <Download size={16} />

                  Download

                </button>

              </div>

            </div>

            <div className="h-[500px] overflow-y-auto rounded-2xl border border-[#111827] bg-[#020617] p-5">

              {loading ? (

                <div className="flex flex-col items-center justify-center h-full text-cyan-400 gap-5">

                  <Loader2
                    className="animate-spin"
                    size={35}
                  />

                  <div className="text-base font-medium">
                    Analyzing syntax...
                  </div>

                </div>

              ) : analysis ? (

                <div className="prose prose-invert max-w-none text-[13px] leading-6">

                  <ReactMarkdown>
                    {displayedAnalysis ||
                      analysis}
                  </ReactMarkdown>

                </div>

              ) : (

                <div className="flex flex-col items-center justify-center h-full text-center px-10">

                  <div className="w-24 h-24 rounded-3xl bg-[#07111F] border border-[#1E293B] flex items-center justify-center mb-6">

                    <Code2
                      size={42}
                      className="text-cyan-400"
                    />

                  </div>

                  <h2 className="text-2xl font-bold mb-3">

                    Ready for AI Analysis

                  </h2>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;