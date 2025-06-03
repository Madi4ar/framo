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

function EditorPage() {
  const [serverResponse, setServerResponse] = useState(null);

  return (
    <>
      <Header />
      <section className="bg-black relative w-full flex-1 flex gap-[10px] h-[400px] justify-between bg-[#101010] pt-[10px] pb-[7px] px-[8px]">
        <SideBar serverResponse={serverResponse} />
        <VideoPlayer />
        <InstrumentsBar />
      </section>

      <section className="w-full flex-1 h-full overflow-auto px-[4px]">
        <TimeLine />
      </section>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-[60%] mx-auto">
        <ChatInput setServerResponse={setServerResponse} />
      </div>
    </>
  );
}

export default EditorPage;
