import { useLocation, useNavigate } from "react-router-dom";

import Editor from "@monaco-editor/react";

import ReactMarkdown from "react-markdown";

function HistoryDetails() {

  const { state } = useLocation();

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#020617] text-white p-6">

      <button
        onClick={() => navigate("/history")}
        className="mb-6 bg-[#172554] hover:bg-[#1E3A8A] border border-[#1E40AF] px-5 py-2 rounded-xl"
      >
        Back
      </button>

      <div className="grid grid-cols-2 gap-5">

        {/* CODE */}
        <div className="bg-[#07111F] border border-[#111827] rounded-2xl p-4">

          <h2 className="text-xl font-bold mb-4">
            Saved Code
          </h2>

          <div className="h-[500px] overflow-hidden rounded-xl border border-[#1E293B]">

            <Editor
              height="100%"
              language={state.language}
              theme="vs-dark"
              value={state.code}
              options={{
                readOnly: true,
                minimap: {
                  enabled: false,
                },
              }}
            />

          </div>

        </div>

        {/* ANALYSIS */}
        <div className="bg-[#07111F] border border-[#111827] rounded-2xl p-4">

          <h2 className="text-xl font-bold mb-4">
            AI Analysis
          </h2>

          <div className="h-[500px] overflow-y-auto rounded-xl border border-[#111827] bg-[#020617] p-5">

            <div className="prose prose-invert max-w-none">

              <ReactMarkdown>
                {state.analysis}
              </ReactMarkdown>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default HistoryDetails;