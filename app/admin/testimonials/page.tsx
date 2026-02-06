"use client";

import React, { useEffect, useState } from 'react';
import { Trash2, User, Briefcase, MessageSquare } from 'lucide-react';

function TestimonialsPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setList(data);
      }
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const addTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !message) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, message }),
      });

      if (res.ok) {
        setName("");
        setRole("");
        setMessage("");
        loadTestimonials();
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        loadTestimonials();
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Manage Testimonials</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <form onSubmit={addTestimonial} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-2">New Testimonial</h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black/5 transition-all outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Role / Company</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. CEO, Tech Corp"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black/5 transition-all outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Feedback</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What did they say about your service?"
                  rows={4}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black/5 transition-all outline-none text-sm resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-black/10 mt-4"
            >
              {loading ? "Adding..." : "Add Testimonial"}
            </button>
          </form>
        </div>

        {/* Right Column: List */}
        <div className="lg:col-span-2">
          {fetching ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : list.length === 0 ? (
            <div className="bg-gray-50 rounded-3xl p-20 text-center border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-medium">No testimonials yet. Add your first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {list.map((item) => (
                <div key={item._id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative group hover:shadow-md transition-shadow">
                  <button
                    onClick={() => deleteTestimonial(item._id)}
                    className="absolute top-6 right-6 p-2 bg-red-50 text-red-400 rounded-full opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-100 transition-all active:scale-90"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <p className="text-gray-600 italic text-sm leading-relaxed mb-6">"{item.message}"</p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-xs text-gray-400 uppercase">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-400 font-medium">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsPage;
