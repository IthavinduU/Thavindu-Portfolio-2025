import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function TerminalTypewriter() {
  return (
    <div className="bg-black text-green-400 font-mono text-sm sm:text-base rounded-md px-6 py-4 inline-block shadow-lg border border-green-600">
      <span className="mr-2">thavindu@portfolio:~$</span>
      <span className="inline-block min-w-[320px]">
        <Typewriter
          words={[
            "Let's Code the Tomorrow's World.",
            "One Line at a Time...",
          ]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={55}
          deleteSpeed={30}
          delaySpeed={1800}
          cursorBlinking={true}
        />
      </span>
    </div>
  );
}
