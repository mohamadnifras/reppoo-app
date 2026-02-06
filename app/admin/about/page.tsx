"use client";

import React, { useState, useEffect } from "react";

function AboutPage() {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [exists, setExists] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/admin/about");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setHeading(data.heading);
          setText(data.text);
          setExists(true);
        }
      }
    } catch (error) {
      console.error("Error fetching about section:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const method = exists ? "PATCH" : "POST";

    try {
      const res = await fetch("/api/admin/about", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heading, text }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: `About section ${exists ? "updated" : "created"} successfully!` });
        setExists(true);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.message || "Something went wrong" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to connect to server" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">About Section</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-6">

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Section Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="e.g., About Our AI Coaching"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-black/5 focus:border-black transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">About Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter detailed description of your services..."
              required
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-black/5 focus:border-black transition-all outline-none resize-none"
            />
          </div>
        </div>

        <div className="bg-gray-50/50 px-8 py-5 flex items-center justify-between border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2 shadow-lg shadow-black/10"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              exists ? "Update Section" : "Save Section"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AboutPage;
