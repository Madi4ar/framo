'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import plus from '../../public/images/icons/plus.svg';
import column from '../../public/images/icons/report-columns.svg';
import chat from '../../public/images/icons/chat-alt.svg';
import settings from '../../public/images/icons/cog-sharp.svg';
import { useChat } from '@/app/context/ChatContext';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const { serverResponse } = useChat();

  return (
    <div
      className={`sidebar z-50 rounded-[24px] bg-[#222222] px-[10px] flex gap-[10px] h-96 transition-width duration-300 ease-in-out
        ${isOpen ? 'w-full' : 'w-[72px]'}
      `}>
      <div className="flex flex-col items-center py-[10px] w-[50`px] min-w-[50px]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#171717] rounded-[12px] p-[14px] flex items-center justify-center">
          <Image src={plus} alt="toggle" />
        </button>

        <div className="h-[3px] w-[18px] bg-[#171717] mt-[10px] rounded-lg"></div>

        <button
          type="button"
          className="mt-[10px] bg-[#171717] rounded-[12px] p-[14px] flex items-center justify-center shadow-[0_0_4px_0_rgba(255,255,255,0.25)]">
          <Image src={column} alt="columns" />
        </button>

        <button
          type="button"
          className="mt-[10px] bg-[#171717] rounded-[12px] p-[14px] flex items-center justify-center shadow-[0_0_4px_0_rgba(255,255,255,0.25)]">
          <Image src={chat} alt="chat" />
        </button>
      </div>

      <div
        className={`h-[300px] w-[0.5px] mt-5 bg-[#979797] transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}></div>

      <div
        className={`flex flex-col w-full analytics transition-opacity duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}>
        <div className="w-full flex items-center justify-center py-[8px] bg-[#171717] border border-[#979797] rounded-lg mt-[10px] gap-2">
          <Image src={settings} alt="settings" />
          <p className="text-white">
            {' '}
            {serverResponse && serverResponse.uploads.length > 0
              ? 'Analytics is completed'
              : 'Analyzing videos'}
          </p>
        </div>

        {serverResponse && serverResponse.uploads.length > 0 ? (
          <ul className="mt-5 max-h-[75%] overflow-y-auto">
            {serverResponse.uploads.map((upload) => (
              <div key={upload.id} className="mt-2">
                {Array.isArray(upload.video.video_description) ? (
                  upload.video.video_description.map((desc, index) => (
                    <div key={index} className="mb-2 p-2 text-white rounded">
                      <p>
                        <strong>Time range:</strong> {desc.time_range}
                      </p>
                      <p>
                        <strong>Description:</strong>
                        <span>{desc.description} </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>{upload.video.video_description}</p>
                )}

                {Array.isArray(
                  upload.video.audio_transcript?.transcription.segments
                ) ? (
                  upload.video.audio_transcript?.transcription.segments.map(
                    (segment, index) => (
                      <div key={index} className="mb-2 p-2 text-white rounded">
                        <p>
                          <strong>Time range:</strong> {segment.start} -{' '}
                          {segment.end}
                        </p>
                        <p>
                          <strong>Description:</strong>
                          <span>{segment.text} </span>
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p>{upload.video.audio_transcript?.transcription.segments}</p>
                )}
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-white mt-2 outline-none">No data available</p>
        )}
      </div>
    </div>
  );
}

export default SideBar;
