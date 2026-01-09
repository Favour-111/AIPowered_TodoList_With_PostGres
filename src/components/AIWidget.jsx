import React, { useState } from "react";
import API from "../api";
import { TbHelpHexagon } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";
import { IoClose, IoHelpOutline } from "react-icons/io5";
export default function AIWidget() {
  // --- AI Chatbot Widget ---
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm your productivity assistant. How can I help you today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const handleChatSend = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { sender: "user", text: chatInput };
    setChatMessages((msgs) => [...msgs, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await API.post("/ai/chat", { message: chatInput });
      let reply = res.data.reply;
      if (typeof reply === "string") {
        try {
          reply = JSON.parse(reply);
        } catch {}
      }
      setChatMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: reply || "(No reply)" },
      ]);
    } catch {
      setChatMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "Sorry, I couldn't process that." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // --- AI NLP Search ---
  const [aiSearch, setAiSearch] = useState("");
  const [aiSearchResults, setAiSearchResults] = useState([]);
  const [aiSearchLoading, setAiSearchLoading] = useState(false);
  const [aiSearchError, setAiSearchError] = useState("");
  const handleAiSearch = async (e) => {
    e.preventDefault();
    if (!aiSearch.trim()) return;
    setAiSearchLoading(true);
    setAiSearchError("");
    try {
      const res = await API.post("/ai/nlp-search", { query: aiSearch });
      let result = res.data.result;
      if (typeof result === "string") {
        try {
          result = JSON.parse(result);
        } catch {}
      }
      setAiSearchResults(Array.isArray(result) ? result : []);
    } catch (err) {
      setAiSearchError("AI search failed");
      setAiSearchResults([]);
    } finally {
      setAiSearchLoading(false);
    }
  };

  return (
    <>
      {/* Floating AI Chatbot Widget */}
      <button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-[0_12px_45px_rgba(99,102,241,0.35)] hover:shadow-[0_16px_55px_rgba(99,102,241,0.45)] transition-all duration-300 flex items-center justify-center text-xl focus:outline-none focus:ring-4 focus:ring-indigo-400/40"
        onClick={() => setShowChatbot(true)}
        aria-label="Open AI Chatbot"
      >
        <IoHelpOutline />
      </button>

      {showChatbot && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[95vw] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-zinc-800/60 overflow-hidden animate-fade-in">
          <div className="relative px-4 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] opacity-80">
                  AI Copilot
                </p>
                <p className="text-lg font-semibold">Taskora Assistant</p>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-lg transition cursor-pointer"
              >
                <IoClose />
              </button>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-white/30" />
          </div>

          <div className="flex-1 flex flex-col gap-3 px-4 py-4 max-h-[420px] overflow-y-auto bg-gradient-to-b from-white/60 via-white/70 to-white/90 dark:from-zinc-900/60 dark:via-zinc-900/70 dark:to-zinc-900/90">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "ai" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[78%] shadow-sm ${
                    msg.sender === "ai"
                      ? "bg-gradient-to-br from-indigo-50 to-purple-50 text-zinc-900 dark:from-zinc-800 dark:to-zinc-800/80 dark:text-indigo-100 border border-indigo-100/60 dark:border-zinc-700"
                      : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-50 border border-zinc-200/70 dark:border-zinc-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce" />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-bounce"
                  style={{ animationDelay: "0.12s" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-bounce"
                  style={{ animationDelay: "0.24s" }}
                />
                <span className="ml-1">Thinking...</span>
              </div>
            )}
          </div>

          <form
            onSubmit={handleChatSend}
            className="px-4 py-3 bg-white/90 dark:bg-zinc-900/90 border-t border-zinc-200/70 dark:border-zinc-800 flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Taskora to plan, summarize, or prioritize..."
                className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 transition-all"
                disabled={chatLoading}
              />
              <div className="absolute inset-y-0 right-3 flex items-center gap-1 text-[11px] text-zinc-400 uppercase tracking-[0.18em]">
                <span className="hidden sm:inline">AI</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-11 h-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:scale-[1.03] transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={chatLoading || !chatInput.trim()}
            >
              <VscSend />
            </button>
          </form>
        </div>
      )}
      {/* AI NLP Search Bar (optional, can be used elsewhere) */}
      {/*
      <form onSubmit={handleAiSearch} className="flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <input
          type="text"
          value={aiSearch}
          onChange={e => setAiSearch(e.target.value)}
          placeholder="AI Search: e.g. tasks due next week, urgent tasks, etc."
          className="flex-1 px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none"
        />
        <button type="submit" className="px-3 py-2 rounded bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-600 transition" disabled={aiSearchLoading}>
          {aiSearchLoading ? "Searching..." : "AI Search"}
        </button>
      </form>
      {aiSearchError && <div className="text-red-500 text-xs px-4 py-1">{aiSearchError}</div>}
      {aiSearchResults.length > 0 && (
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <div className="font-semibold text-sm mb-1">AI Search Results:</div>
          <ul className="list-disc pl-5 text-xs">
            {aiSearchResults.map((t, i) => (
              <li key={i}>{typeof t === "string" ? t : JSON.stringify(t)}</li>
            ))}
          </ul>
        </div>
      )}
      */}
    </>
  );
}
