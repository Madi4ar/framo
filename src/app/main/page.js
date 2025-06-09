'use client';
import React from 'react';
import category from '../../../public/images/icons/category-2.svg';
import Image from 'next/image';
import { useChat } from '../context/ChatContext';

export default function MainPage() {
  const { serverResponse, chatHistory } = useChat();

  // Проверяем, есть ли в истории сообщения с ответом от сервера
  const hasResponse = chatHistory.some((msg) => msg.type === 'response');

  console.log('chatHistory JSON:', JSON.stringify(chatHistory, null, 2));

  return (
    <div className="bg-black h-full flex flex-col items-center justify-center md:w-[94.5%] 2xl:w-[96%] rounded-2xl right-0 absolute top-1/2 -translate-y-1/2">
      {/* Показываем интро, если нет ответа от сервера */}
      {!hasResponse && (
        <>
          <p className="text-[#BDBDC0] text-2xl font-semibold mb-[24px]">
            Try these:
          </p>
          <div className="flex flex-wrap items-center justify-center w-[70%] gap-2">
            {[
              'Create a motivational reel from my clips',
              'Translate this video to French',
              'Make it cinematic with color grading',
              'Highlight memorable',
              'Add subtitles',
              'Make instagram video from my videos',
            ].map((text) => (
              <button
                key={text}
                className="cursor-pointer flex items-center px-[16px] py-[10px] border border-[#212121] bg-[#0B0C0B] rounded-xl gap-2 mb-5">
                <Image src={category} alt="" />
                <p className="font-semibold">{text}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* История сообщений: показываем только если есть хотя бы один ответ */}
      {hasResponse && (
        <div className="flex flex-col gap-3 max-h-[80%] w-[80%] overflow-y-auto absolute top-0">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl max-w-[75%] ${
                msg.type === 'user'
                  ? 'bg-[#0B0C0B] self-end border border-[#212121]'
                  : 'bg-transparent self-start text-white'
              }`}>
              <p className="text-xs text-gray-300 mb-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>

              {msg.prompt && <p className="text-white">{msg.prompt}</p>}

              {/* Ответ от сервера */}
              {msg.type === 'response' && msg.data && (
                <div className="text-green-400 text-sm">
                  ✅ Видео готово! ID проекта: {msg.data.id}
                  {msg.data.uploads?.map((upload) => {
                    console.log('Rendering upload id:', upload.id);
                    return (
                      <div key={upload.id} className="mt-2">
                        {Array.isArray(upload.video.video_description) ? (
                          upload.video.video_description.map((desc, index) => (
                            <div
                              key={index}
                              className="mb-2 p-2 text-white rounded">
                              <p>
                                <strong>Time range:</strong> {desc.time_range}
                              </p>
                              <p>
                                <strong>Description:</strong> {desc.description}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>{upload.video.video_description}</p>
                        )}
                      </div>
                    );
                  })}
                  {msg.data.uploads?.map((upload) => {
                    const transcript =
                      upload.video.audio_transcript?.transcription;
                    const segments = transcript?.segments;

                    return (
                      <div key={upload.id} className="mt-2">
                        {Array.isArray(segments) ? (
                          segments.map((segment, index) => (
                            <div
                              key={index}
                              className="mb-2 p-2 text-white rounded bg-gray-800">
                              <p>
                                <strong>Time range:</strong> {segment.start} -{' '}
                                {segment.end}
                              </p>
                              <p>
                                <strong>Text:</strong> {segment.text}
                              </p>
                            </div>
                          ))
                        ) : transcript?.text ? (
                          <p className="text-white bg-gray-800 p-2 rounded">
                            {transcript.text}
                          </p>
                        ) : (
                          <p className="text-gray-400 italic">
                            No audio transcription available.
                          </p>
                        )}
                      </div>
                    );
                  })}
                  {msg.data.result?.output_file && (
                    <video
                      src={msg.data.result.output_file}
                      controls
                      className="mt-2 rounded-lg w-full max-w-[500px]"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
