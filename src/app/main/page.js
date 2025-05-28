import React from 'react';
import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput';
import SideBar from '@/components/SideBar';
import VideoPlayer from '@/components/VideoPlayer';
import InstrumentsBar from '@/components/InstrumentsBar';
import TimeLine from '@/components/TimeLine';

function MainPage() {
  return (
    <>
      <Header />
      <section className="w-full flex flex-wrap gap-[10px] h-[400px] justify-between bg-[#101010] pt-[10px] pb-[7px] px-[8px]">
        <SideBar />
        <VideoPlayer />
        <InstrumentsBar />
      </section>

      <section className="w-full flex-1 h-full overflow-auto px-[4px]">
        <TimeLine />
      </section>
      <div className="relative bottom-3 w-[60%] mx-auto">
        <ChatInput />
      </div>
    </>
  );
}

export default MainPage;
