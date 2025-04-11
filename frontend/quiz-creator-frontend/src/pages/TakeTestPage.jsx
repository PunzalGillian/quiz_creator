// Frame1.jsx
import React from "react";

const Frame1 = () => (
  <div className="flex flex-col justify-center items-center w-[412px] h-[917px]">
    <div className="flex-shrink-0 w-[412px] h-[917px] bg-white">
      <div className="flex-shrink-0 w-[412px] h-[479px] bg-[#c3d5d4]" />

      <div className="w-[23rem] text-black text-center font-['Inter'] text-[2rem] font-bold leading-normal mb-4">
        What is a correct syntax to output "Hello World" in Python?
      </div>

      {/* Option A */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-shrink-0 w-[21.75rem] h-[4.375rem] rounded-[1.1875rem] bg-[#efefef] flex items-center px-4">
          <div className="text-black font-['Inter'] text-[1.375rem] leading-normal">
            A. print("Hello World")
          </div>
        </div>
      </div>

      {/* Option B */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-shrink-0 w-[21.8125rem] h-[4.375rem] rounded-[1.1875rem] bg-[#efefef] flex items-center px-4">
          <div className="text-black font-['Inter'] text-[1.375rem] leading-normal">
            B. p("Hello World")
          </div>
        </div>
      </div>

      {/* Option C */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-shrink-0 w-[21.875rem] h-[4.375rem] rounded-[1.1875rem] bg-[#efefef] flex items-center px-4">
          <div className="text-black font-['Inter'] text-[1.375rem] leading-normal">
            C. echo "Hello World"
          </div>
        </div>
      </div>

      {/* Option D */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-shrink-0 w-[21.875rem] h-[4.375rem] rounded-[1.1875rem] bg-[#1b191d] flex items-center px-4">
          <div className="text-[#fff3f3] font-['Inter'] text-[1.375rem] leading-normal">
            D. echo("Hello World");
          </div>
        </div>
      </div>

      {/* Placeholder for image */}
      <div
        className="flex-shrink-0 w-[1.875rem] h-[1.875rem] bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('<path-to-image>')" }}
      />
    </div>
  </div>
);

export default Frame1;
