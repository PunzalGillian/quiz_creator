import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const TakeTestPage = ({ className, ...props }) => {
  // Add state to track selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Handler for selecting an answer
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className={"h-[917px] relative " + className}>
      <div className="bg-[#ffffff] w-[412px] h-[917px] absolute left-0 top-0 overflow-hidden">
        {/* Option A */}
        <div
          className={`${
            selectedAnswer === "a" ? "bg-[#1b191d]" : "bg-[#efefef]"
          } rounded-[19px] w-[348.96px] h-[70px] absolute left-8 top-[504px] cursor-pointer`}
          onClick={() => handleAnswerClick("a")}
        ></div>
        <div
          className={`${
            selectedAnswer === "a" ? "text-[#fff3f3]" : "text-[#000000]"
          } text-left font-['Inter',_sans-serif] text-[22px] font-normal absolute left-[60px] top-[525px] w-[306px] cursor-pointer`}
          onClick={() => handleAnswerClick("a")}
        >
          A. print(&quot;Hello World&quot;)
        </div>

        {/* Option B */}
        <div
          className={`${
            selectedAnswer === "b" ? "bg-[#1b191d]" : "bg-[#efefef]"
          } rounded-[19px] w-[349px] h-[70px] absolute left-[34px] top-[589px] cursor-pointer`}
          onClick={() => handleAnswerClick("b")}
        ></div>
        <div
          className={`${
            selectedAnswer === "b" ? "text-[#fff3f3]" : "text-[#000000]"
          } text-left font-['Inter',_sans-serif] text-[22px] font-normal absolute left-[60px] top-[610px] w-[308px] cursor-pointer`}
          onClick={() => handleAnswerClick("b")}
        >
          B. p(&quot;Hello World&quot;)
        </div>

        {/* Option C */}
        <div
          className={`${
            selectedAnswer === "c" ? "bg-[#1b191d]" : "bg-[#efefef]"
          } rounded-[19px] w-[350px] h-[70px] absolute left-[33px] top-[674px] cursor-pointer`}
          onClick={() => handleAnswerClick("c")}
        ></div>
        <div
          className={`${
            selectedAnswer === "c" ? "text-[#fff3f3]" : "text-[#000000]"
          } text-left font-['Inter',_sans-serif] text-[22px] font-normal absolute left-[60px] top-[695px] w-[308px] cursor-pointer`}
          onClick={() => handleAnswerClick("c")}
        >
          C. echo &quot;Hello World&quot;
        </div>

        {/* Option D */}
        <div
          className={`${
            selectedAnswer === "d" ? "bg-[#1b191d]" : "bg-[#efefef]"
          } rounded-[19px] w-[350px] h-[70px] absolute left-[33px] top-[759px] cursor-pointer`}
          onClick={() => handleAnswerClick("d")}
        ></div>
        <div
          className={`${
            selectedAnswer === "d" ? "text-[#fff3f3]" : "text-[#000000]"
          } text-left font-['Inter',_sans-serif] text-[22px] font-normal absolute left-[60px] top-[780px] w-[255px] cursor-pointer`}
          onClick={() => handleAnswerClick("d")}
        >
          D. echo(&quot;Hello World&quot;);
        </div>

        {/* Checkmark icon - only show when an option is selected */}
        {selectedAnswer && (
          <div
            className="absolute"
            style={{
              left: "338px",
              top:
                selectedAnswer === "d"
                  ? "780px"
                  : selectedAnswer === "c"
                  ? "695px"
                  : selectedAnswer === "b"
                  ? "610px"
                  : "525px",
            }}
          >
            <CheckCircle className="text-green-500 w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTestPage;
