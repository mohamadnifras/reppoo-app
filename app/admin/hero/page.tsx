"use client";

import React, { useState, useEffect, useRef } from "react";


function HeroPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch("/api/admin/hero");
      const data = await res.json();
      if (data) {
        setTitle(data.title || "");
        setSubtitle(data.subtitle || "");
        setCurrentImage(data.image || null);
        setExists(true);
      }
    } catch (error) {
      console.error("Error fetching hero:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle || (!image && !exists)) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    if (image) formData.append("image", image);

    const method = exists ? "PATCH" : "POST";

    try {
      const res = await fetch("/api/admin/hero", {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || `Error ${exists ? "updating" : "creating"} hero`);
        return;
      }

      alert(`Hero ${exists ? "updated" : "created"} successfully 🎉`);
      setExists(true);
      setCurrentImage(data.image);
      setImage(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Hero Section</h1>
      </div>

      <form onSubmit={submitHandler} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Main Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-900 font-medium"
              placeholder="Enter hero heading..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Subtitle
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-900 font-medium resize-none text-sm"
              placeholder="Enter hero description..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Background Image
            </label>
            <div className="space-y-4">
              {(preview || currentImage) && (
                <div className="relative w-full aspect-21/9 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden shadow-inner group">
                  <img
                    src={preview || currentImage || ""}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {preview && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setImage(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="bg-white/90 backdrop-blur text-red-600 px-4 py-2 rounded-full text-xs font-bold shadow-lg transform active:scale-95 transition-transform"
                      >
                        Discard New Image
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="hero-image-upload"
                />
                <label 
                  htmlFor="hero-image-upload"
                  className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-500 group-hover:text-blue-600">
                      {image ? image.name : "Select new image"}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-[#111] hover:bg-black text-white text-sm font-bold rounded-lg shadow-lg disabled:opacity-50 transition-all flex items-center gap-2 active:scale-95"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : null}
            {exists ? "Update Section" : "Create Section"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HeroPage;
