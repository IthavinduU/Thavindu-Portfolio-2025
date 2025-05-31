import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function TerminalTypewriter() {
  return (
    <div className="bg-black text-green-400 font-mono text-sm sm:text-base rounded-md px-6 py-4 inline-block shadow-lg border border-green-600 relative overflow-hidden">
      {/* Optional Scanline Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#00ff0022_1px,transparent_1px)] [background-size:5px_5px] pointer-events-none"></div>

      <span className="mr-2 text-green-400 drop-shadow-[0_0_2px_#00ff00] animate-pulse">
        thavindu@portfolio:~$
      </span>

      <span className="inline-block min-w-[340px] text-green-400 tracking-wide glow-text">
        <Typewriter
          words={[
            "Let's Code the Tomorrow's World.",
            "One Line at a Time...",
            "Building Dreams with Code.",
            "Innovating the Future.",
            "Crafting Solutions with Passion.",
            "Empowering Ideas through Technology.",
            "Transforming Visions into Reality.",
            "Coding the Future, Today.",
            "Engineering Excellence.",
            "Shaping the Digital Landscape.",
          ]}
          loop={0}
          cursor
          cursorStyle="_|_"
          typeSpeed={100}
          deleteSpeed={70}
          delaySpeed={1800}
          cursorBlinking={true}
        />
      </span>

      {/* Optional Flicker Effect */}
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
        }

        @keyframes flicker {
          0%,
          100% {
            opacity: 1;
          }
          33% {
            opacity: 0.95;
          }
          66% {
            opacity: 0.98;
          }
        }

        .animate-pulse {
          animation: flicker 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
