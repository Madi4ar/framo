'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import ChatInput from '@/components/ChatInput';

export default function MainLayout({ children }) {
  const [serverResponse, setServerResponse] = useState(null);

  return (
    <>
      <Header />
      <section className="bg-black flex-1 relative w-full flex gap-[10px] justify-between bg-[#101010] pt-[10px] pb-[7px] px-[8px]">
        <div className="absolute left-1 top-1 z-50 w-[40%]">
          <SideBar serverResponse={serverResponse} />
        </div>
        <div className="flex flex-col w-full h-full relative">{children}</div>
      </section>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-[60%] mx-auto">
        <ChatInput setServerResponse={setServerResponse} />
      </div>
    </>
  );
}
