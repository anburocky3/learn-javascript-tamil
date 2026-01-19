"use client";

import { useState } from "react";

export default function FloatingYouTubeWidget() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(
      "https://www.youtube.com/@CyberDudeNetworks?sub_confirmation=1",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      @keyframes popIn {
        0% {
          opacity: 0;
          transform: scale(0) translateY(50px) rotate(-45deg);
        }
        50% {
          transform: scale(1.1) translateY(-10px) rotate(5deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0) rotate(0deg);
        }
      }

      @keyframes pulse-glow {
        0%, 100% {
          box-shadow: 0 0 20px rgba(239, 69, 69, 0.5), 0 0 40px rgba(239, 69, 69, 0.2);
        }
        50% {
          box-shadow: 0 0 30px rgba(239, 69, 69, 0.8), 0 0 60px rgba(239, 69, 69, 0.4);
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      .widget-float {
        animation: float 3s ease-in-out infinite;
      }

      .widget-pop-in {
        animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }

      .widget-pulse {
        animation: pulse-glow 2s ease-in-out infinite;
      }

      .widget-shimmer {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }
    `}</style>

      <div className="widget-pop-in widget-float fixed bottom-8 right-8 z-40">
        {/* Badge indicator */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

        {/* Main widget button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`widget-pulse relative group flex items-center justify-center w-20 h-20 rounded-full transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            isHovered
              ? "bg-linear-to-br from-red-500 to-red-600 shadow-2xl"
              : "bg-linear-to-br from-red-500 to-red-700"
          }`}
        >
          {/* YouTube SVG Icon */}
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>

          {/* Hover tooltip */}
          <div
            className={`absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-lg bg-linear-to-r from-slate-800 to-slate-700 text-white text-sm font-semibold transition-all duration-300 pointer-events-none border border-slate-600 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            Watch on YouTube
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-700"></div>
          </div>

          {/* Animated background rings */}
          <div className="absolute inset-0 rounded-full border-2 border-red-400 opacity-20 animate-pulse"></div>
          <div
            className="absolute inset-0 rounded-full border border-red-300 opacity-10 animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </button>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-7 h-7 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          ✕
        </button>

        {/* Decorative floating particles (optional enhancement) */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="widget-shimmer absolute inset-0 rounded-full"></div>
        </div>
      </div>
    </>
  );
}
