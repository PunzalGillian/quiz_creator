import React from "react";

const QuizMakerPage = () => {
  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="w-[412px] h-[917px]">
        <div className="h-[917px]">
          <div className="w-[412px] h-[917px] bg-white">
            <div className="relative h-[917px] bg-[#c3d5d4]">
              <div className="w-[349px] h-[526px] top-[152px] absolute left-[31px]">
                <div className="absolute w-[353px] h-[79px] top-0 left-0">
                  <div className="relative w-[349px] h-[79px]">
                    <div className="top-[30px] bg-[#efefef] rounded-[10px] absolute w-[349px] h-[49px] left-0" />

                    <div className="absolute w-[306px] top-[43px] left-[17px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                      Enter Quiz Name:
                    </div>

                    <div className="absolute w-[302px] top-0 left-px [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[21px] tracking-[0] leading-[normal]">
                      Quiz Name:
                    </div>
                  </div>
                </div>

                <div className="absolute w-[353px] h-[77px] top-[94px] left-0">
                  <div className="absolute w-[349px] h-[49px] top-7 left-0 bg-[#efefef] rounded-[10px]">
                    <div className="absolute w-[306px] top-[13px] left-[17px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                      Enter a Question
                    </div>
                  </div>

                  <div className="absolute w-[302px] top-0 left-px [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[21px] tracking-[0] leading-[normal]">
                    Add a Question:
                  </div>
                </div>

                <div className="top-[186px] absolute w-[353px] h-[77px] left-0">
                  <div className="absolute w-[349px] h-[49px] top-7 left-0 bg-[#efefef] rounded-[10px]">
                    <div className="absolute w-[306px] top-[13px] left-[17px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                      Enter Option A:
                    </div>
                  </div>

                  <div className="absolute w-[302px] top-0 left-px [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[21px] tracking-[0] leading-[normal]">
                    Option A:
                  </div>
                </div>

                <div className="top-[273px] absolute w-[353px] h-[77px] left-0">
                  <div className="absolute w-[349px] h-[49px] top-7 left-0 bg-[#efefef] rounded-[10px]">
                    <div className="absolute w-[306px] top-[13px] left-[17px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                      Enter Option B:
                    </div>
                  </div>

                  <div className="absolute w-[302px] top-0 left-px [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[21px] tracking-[0] leading-[normal]">
                    Option B:
                  </div>
                </div>

                <div className="top-[362px] absolute w-[353px] h-[77px] left-0">
                  <div className="absolute w-[349px] h-[49px] top-7 left-0 bg-[#efefef] rounded-[10px]">
                    <div className="absolute w-[306px] top-[13px] left-[17px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                      Enter Option C:
                    </div>
                  </div>

                  <div className="absolute w-[302px] top-0 left-px [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[21px] tracking-[0] leading-[normal]">
                    Option C:
                  </div>
                </div>

                <div className="top-[449px] absolute w-[353px] h-[77px] left-0">
                  <div className="absolute w-[349px] h-[49px] top-7 left-0 bg-[#efefef] rounded-[10px]">
                    <div className="absolute w-[306px] top-[13px] left-[17px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
                      Enter Option D:
                    </div>
                  </div>

                  <div className="absolute w-[302px] top-0 left-px [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[21px] tracking-[0] leading-[normal]">
                    Option D:
                  </div>
                </div>
              </div>

              <div className="absolute top-[92px] left-[111px] [font-family:'Inter-Bold',Helvetica] font-bold text-black text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
                QUIZ MAKER
              </div>

              <div className="w-[351px] h-[53px] top-[708px] absolute left-[31px]">
                <div className="relative w-[349px] h-[53px]">
                  <img
                    className="top-1 absolute w-[349px] h-[49px] left-0"
                    alt="Rectangle"
                    src={rectangle4}
                  />

                  <div className="absolute w-[49px] top-0 left-36 [font-family:'Inter-Light',Helvetica] font-light text-black text-[42px] text-center tracking-[0] leading-[normal]">
                    +
                  </div>
                </div>
              </div>

              <div className="w-[351px] h-[49px] top-[781px] absolute left-[31px]">
                <div className="relative w-[349px] h-[49px] bg-[url(/image.svg)] bg-[100%_100%]">
                  <div className="absolute w-[225px] top-[13px] left-14 [font-family:'Inter-Regular',Helvetica] font-normal text-white text-xl text-center tracking-[0] leading-[normal]">
                    Create Quiz
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizMakerPage; // Add this export
