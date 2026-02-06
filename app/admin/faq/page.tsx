"use client";

import React, { useEffect, useState } from 'react';
import { Trash2, HelpCircle, MessageCircle, Plus } from 'lucide-react';

function FaqPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadFaqs = async () => {
    try {
      const res = await fetch("/api/admin/faq");
      if (res.ok) {
        const data = await res.json();
        setList(data);
      }
    } catch (error) {
      console.error("Error loading FAQs:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const addFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      if (res.ok) {
        setQuestion("");
        setAnswer("");
        loadFaqs();
      }
    } catch (error) {
      console.error("Error adding FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFaq = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;

    try {
      const res = await fetch("/api/admin/faq", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        loadFaqs();
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">FAQ Management</h1>
        <p className="text-gray-500 mt-2">Create and manage frequently asked questions for your users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Add FAQ Form */}
        <div className="lg:col-span-5">
          <form onSubmit={addFaq} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                <Plus size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Add Question</h2>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Question</label>
              <div className="relative">
                <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. How does the AI coaching work?"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black/5 transition-all outline-none text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Answer</label>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-gray-300" />
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Provide a clear, concise answer..."
                  rows={5}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black/5 transition-all outline-none text-sm font-medium resize-none leading-relaxed"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-black/10 mt-2"
            >
              {loading ? "Saving..." : "Publish FAQ"}
            </button>
          </form>
        </div>

        {/* FAQ List */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            {fetching ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-gray-50">
                <div className="w-8 h-8 border-4 border-gray-100 border-t-black rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-bold text-gray-400">Loading your FAQs...</p>
              </div>
            ) : list.length === 0 ? (
              <div className="bg-gray-50 rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Your FAQ list is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2">Existing Questions ({list.length})</p>
                <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4 custom-hide-scrollbar">
                  {list.map((item) => (
                    <div key={item._id} className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-50 shadow-sm relative group hover:shadow-md transition-all duration-300">
                      <button
                        onClick={() => deleteFaq(item._id)}
                        className="absolute top-6 right-6 p-2.5 bg-red-50 text-red-400 rounded-full opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-100 transition-all active:scale-90 shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="pr-10">
                        <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-start gap-3">
                          <span className="text-blue-500 mt-1">Q.</span>
                          {item.question}
                        </h3>
                        <div className="flex items-start gap-3 text-gray-500 leading-relaxed text-sm">
                          <span className="text-gray-300 select-none">A.</span>
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
