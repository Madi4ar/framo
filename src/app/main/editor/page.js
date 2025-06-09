'use client';
import React from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import InstrumentsBar from '@/components/InstrumentsBar';
import TimeLine from '@/components/TimeLine';

export default function EditorPage() {
  return (
    <>
      <div className="flex md:w-[94.5%] 2xl:w-[96%] absolute right-0 gap-2 top-0">
        <VideoPlayer />
        <InstrumentsBar />
      </div>

      <section className="w-full absolute bottom-30 overflow-auto">
        <TimeLine />
      </section>
    </>
  );
}
