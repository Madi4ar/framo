'use client';
import React, { useEffect, useRef } from 'react';
import category from '../../../public/images/icons/category-2.svg';
import Image from 'next/image';
import { useChatStore } from '../store/chatStore';

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  }
};

export default function MainPage() {
  const chatHistory = useChatStore((state) => state.chatHistory);
  const serverResponse = useChatStore((state) => state.serverResponse);

  const typingMessage = useChatStore((state) => state.typingMessage);
  const isTyping = useChatStore((state) => state.isTyping);
  const isWaitingForResponse = useChatStore((state) => state.isWaitingForResponse);



  const messagesEndRef = useRef(null);

  const hasResponse = chatHistory.some((msg) => msg.type === 'response');
  const hasUserMessage = chatHistory.some((msg) => msg.type === 'user');
  const shouldShowChat = hasResponse || hasUserMessage || isWaitingForResponse;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, typingMessage]);

  return (
    <div className="bg-black h-full flex flex-col items-center justify-center md:w-[94.5%] 2xl:w-[96%] rounded-2xl right-0 absolute top-1/2 -translate-y-1/2">
      {!shouldShowChat && (
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

      {shouldShowChat && (
        <div className="flex flex-col gap-3 max-h-[80%] w-[80%] overflow-y-auto absolute top-0 pt-6">
          {chatHistory.map((msg, idx) => {
            const isVideoLink =
              msg.type === 'response' &&
              typeof msg.data?.content === 'string' &&
              msg.data.content.includes('.mp4');

            const videoUrl = isVideoLink
              ? msg.data.content.match(/https?:\/\/[^\s]+\.mp4/)?.[0]
              : null;

            return (
              <div
                key={idx}
                className={`flex animate-in slide-in-from-bottom-2 duration-300 ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.type === 'user'
                      ? 'bg-gray-700 text-white self-end border border-gray-600/30 shadow-lg'
                      : 'text-white self-start'
                  }`}>
                  {msg.data?.content &&
                    (!isVideoLink || msg.data.content.trim() !== videoUrl) && (
                      <p className="leading-relaxed">{msg.data.content}</p>
                    )}
                  
                  <div className={`text-xs mt-2 ${
                    msg.type === 'user' ? 'text-blue-200' : 'text-gray-400'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>

                  {videoUrl && (
                    <div className="mt-3 flex flex-col gap-2">
                      <div className="relative">
                        <video
                          src={videoUrl}
                          controls
                          className="rounded-xl w-full max-w-[500px] border border-gray-600/50 shadow-xl"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 rounded-lg px-2 py-1">
                          <span className="text-xs text-white">🎥</span>
                        </div>
                      </div>
                      <a
                        href={videoUrl}
                        download
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1 w-fit">
                        <span>⬇</span>
                        <span>Скачать видео</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* ИИ думает - показываем анимацию */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap text-white">
                {typingMessage ? (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">🤖</span>
                    <span>{typingMessage}</span>
                    <span className="animate-pulse text-blue-400">|</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400">🤖</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    </div>
                    <span className="text-gray-400 text-xs">AI is thinking...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Показываем загрузку когда ждем ответ от сервера */}
          {isWaitingForResponse && !isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap text-white">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  </div>
                  <span className="text-gray-400 text-xs"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* {hasResponse && (
        <div className="flex flex-col gap-3 max-h-[80%] w-[80%] overflow-y-auto absolute top-0">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl max-w-[95%] ${
                msg.type === 'user'
                  ? 'bg-[#0B0C0B] self-end border border-[#212121]'
                  : 'bg-transparent self-start text-white'
              }`}>
              <p className="text-xs text-gray-300 mb-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>

              {msg.prompt && <p className="text-white">{msg.prompt}</p>}

              {msg.type === 'response' && msg.data && (
                <div className="text-green-400 text-sm">
                  ✅ Видео готово! ID проекта: {msg.data.id}
                  {msg.data.uploads?.map((upload) => {
                    const videoDescriptions = Array.isArray(
                      upload.video.video_description
                    )
                      ? upload.video.video_description
                      : [
                          {
                            time_range: '0:00-0:00',
                            description: upload.video.video_description,
                          },
                        ];

                    const transcript =
                      upload.video.audio_transcript?.transcription;
                    const audioSegments = transcript?.segments || [];

                    let totalDuration = 0;
                    videoDescriptions.forEach((desc) => {
                      const [start, end] = desc.time_range
                        .split('-')
                        .map((time) => {
                          const parts = time.split(':');
                          const hours = parseInt(parts[0]) || 0;
                          const minutes = parseInt(parts[1]) || 0;
                          const seconds = parseFloat(parts[2]) || 0;
                          return hours * 3600 + minutes * 60 + seconds;
                        });
                      totalDuration = Math.max(totalDuration, end);
                    });

                    audioSegments.forEach((segment) => {
                      totalDuration = Math.max(
                        totalDuration,
                        parseFloat(segment.end)
                      );
                    });

                    const allSegments = [];

                    videoDescriptions.forEach((desc) => {
                      const [start, end] = desc.time_range
                        .split('-')
                        .map((time) => {
                          const parts = time.split(':');
                          const hours = parseInt(parts[0]) || 0;
                          const minutes = parseInt(parts[1]) || 0;
                          const seconds = parseFloat(parts[2]) || 0;
                          return hours * 3600 + minutes * 60 + seconds;
                        });
                      allSegments.push({
                        type: 'video',
                        start,
                        end,
                        content: desc.description,
                        timeRange: desc.time_range,
                      });
                    });

                    audioSegments.forEach((segment) => {
                      allSegments.push({
                        type: 'audio',
                        start: parseFloat(segment.start),
                        end: parseFloat(segment.end),
                        content: segment.text,
                        timeRange: `${formatTime(segment.start)}-${formatTime(
                          segment.end
                        )}`,
                      });
                    });

                    allSegments.sort((a, b) => a.start - b.start);

                    return (
                      <div key={upload.id} className="mt-4 space-y-3">
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 border border-gray-700">
                          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Video Analysis & Transcription
                          </h3>

                          <div className="space-y-3">
                            {allSegments.map((segment, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg border-l-4 transition-all duration-200 hover:scale-[1.02] ${
                                  segment.type === 'video'
                                    ? 'bg-blue-900/20 border-blue-500'
                                    : 'bg-green-900/20 border-green-500'
                                }`}>
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        segment.type === 'video'
                                          ? 'bg-blue-500/20 text-blue-300'
                                          : 'bg-green-500/20 text-green-300'
                                      }`}>
                                      {segment.type === 'video'
                                        ? '🎥 Video'
                                        : '🎵 Audio'}
                                    </span>
                                    <span className="text-gray-400 text-xs font-mono">
                                      {segment.timeRange}
                                    </span>
                                  </div>
                                </div>

                                <div className="text-white text-sm leading-relaxed">
                                  {segment.content}
                                </div>

                                <div className="mt-2">
                                  <div className="w-full bg-gray-700 rounded-full h-1 relative">
                                    <div
                                      className={`h-1 rounded-full transition-all duration-300 ${
                                        segment.type === 'video'
                                          ? 'bg-blue-500'
                                          : 'bg-green-500'
                                      }`}
                                      style={{
                                        width: `${
                                          ((segment.end - segment.start) /
                                            totalDuration) *
                                          100
                                        }%`,
                                        marginLeft: `${
                                          (segment.start / totalDuration) * 100
                                        }%`,
                                      }}></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {msg.data.result?.output_file && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Generated Video
                      </h3>
                      <video
                        src={msg.data.result.output_file}
                        controls
                        className="rounded-lg w-full max-w-[500px] border border-gray-700 shadow-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
