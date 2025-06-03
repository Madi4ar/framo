'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput';
import SideBar from '@/components/SideBar';
import category from '../../../public/images/icons/category-2.svg';
import VideoPlayer from '@/components/VideoPlayer';
import InstrumentsBar from '@/components/InstrumentsBar';
import TimeLine from '@/components/TimeLine';
import Image from 'next/image';

function MainPage() {
  const [serverResponse, setServerResponse] = useState(null);

  return (
    <>
      <Header />
      <section className="bg-black relative w-full flex-1 flex gap-[10px] h-[400px] justify-between bg-[#101010] pt-[10px] pb-[7px] px-[8px]">
        <SideBar serverResponse={serverResponse} />
        {/* <VideoPlayer />
        <InstrumentsBar /> */}
        <div className="flex flex-col items-center w-full absolute top-1/2 -translate-y-1/2">
          <p className="text-[#BDBDC0] text-2xl font-semibold mb-[24px]">
            Try these:
          </p>
          <div className="flex flex-wrap items-center justify-center w-[70%] gap-2">
            <button className="cursor-pointer flex items-center px-[16px] py-[10px] border border-[#212121] bg-[#0B0C0B] rounded-xl gap-2 mb-5">
              <Image src={category} alt="" />
              <p className="font-semibold">
                Create a motivational reel from my clips
              </p>
            </button>

            <button className="cursor-pointer flex items-center px-[16px] py-[10px] border border-[#212121] bg-[#0B0C0B] rounded-xl gap-2 mb-5">
              <Image src={category} alt="" />
              <p className="font-semibold">Translate this video to French</p>
            </button>

            <button className="cursor-pointer flex items-center px-[16px] py-[10px] border border-[#212121] bg-[#0B0C0B] rounded-xl gap-2 mb-5">
              <Image src={category} alt="" />
              <p className="font-semibold">
                Make it cinematic with color grading
              </p>
            </button>

            <button className="cursor-pointer flex items-center px-[16px] py-[10px] border border-[#212121] bg-[#0B0C0B] rounded-xl gap-2 mb-5">
              <Image src={category} alt="" />
              <p className="font-semibold">Highlight memorble</p>
            </button>

            <button className="cursor-pointer flex items-center px-[16px] py-[10px] border border-[#212121] bg-[#0B0C0B] rounded-xl gap-2 mb-5">
              <Image src={category} alt="" />
              <p className="font-semibold">Add subtitles</p>
            </button>

            <button className="cursor-pointer flex items-center px-[16px] py-[10px] border border-[#212121] bg-[#0B0C0B] rounded-xl gap-2 mb-5">
              <Image src={category} alt="" />
              <p className="font-semibold">
                Make instagram video from my videos
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* <section className="w-full flex-1 h-full overflow-auto px-[4px]">
        <TimeLine />
      </section> */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-[60%] mx-auto">
        <ChatInput setServerResponse={setServerResponse} />
      </div>
    </>
  );
}

export default MainPage;
