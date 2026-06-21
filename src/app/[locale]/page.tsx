"use client"


import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ScratchCoin from "@/components/scratchCoin";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const t = useTranslations("common");
  const d = useTranslations("restaurant");
  const x = useTranslations("hero");

  useEffect(() => {
    const played = sessionStorage.getItem("introPlayed");
    if (played) setIntroDone(true);
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setAudioPlaying(true);
      } catch (err) {
        console.log("Audio blocked:", err);
      }
    }
  };


  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.loop = true;
  }, []);


  useEffect(() => {
  const preventScroll = (e: TouchEvent) => {
    if (!introDone) e.preventDefault();
  };

  if (!introDone) {
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", preventScroll, { passive: false });
  }

  return () => {
    document.body.style.overflow = "auto";
    document.removeEventListener("touchmove", preventScroll);
  };
}, [introDone]);

  const handleVideoEnd = () => {
    sessionStorage.setItem("introPlayed", "true");
    setIntroDone(true);
  };

  return (
    <>
      <audio ref={audioRef}>
        <source
          src="/thinking-out-loud.mp3"
          type="audio/mp3"
        />
      </audio>
      <div className="w-full min-h-screen relative overflow-hidden">
        {!introDone && (
          <div className="fixed overflow-hidden h-screen inset-0 max-w-130 mx-auto transition-opacity duration-1000 opacity-100">
            <video
              autoPlay
              muted
              playsInline
              className=" w-full h-full object-cover"
              onEnded={handleVideoEnd}
            >
              <source src="/6477740-hd_1920_1080_25fps.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        <div
          className={`
          max-w-130 mx-auto min-h-screen pt-4 px-2 sm:px-3 lg:px-4
          bg-center bg-cover bg-no-repeat
          transition-all duration-1000 ease-out
          ${introDone ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
          style={{
            backgroundImage:
              "url('https://vs-invitation.ayandesign.am/4.jpg')",
          }}
        >
          <Navbar />

          <div className="flex flex-col items-center justify-center text-center">
            <p className="font-signature text-[34px] text-[#5C2018]">
              {t("saveDate")}
            </p>

            <p className="font-signature text-[30px] text-[#5C2018]">
              {d("date")}
            </p>

            <div className="w-[28px] h-[44px] relative -top-3">
              <Link href="https://www.ayandesign.am/#home" target="_blank">
                <Image
                  src="https://vs-invitation.ayandesign.am/Component%205.png"
                  alt="Decoration"
                  fill
                />
              </Link>
            </div>
          </div>

          <div className="mt-64 p-2 w-full relative flex flex-col items-center  px-2 justify-center text-center h-[200px]">
            <p className="font-signature text-[78px] text-[#5C2018] absolute top-[-48px] left-[84px]">
              {x("groom")}
            </p>
            <p className="font-signature text-[78px] text-[#5C2018]/70 absolute top-7 left-[230px]"> &</p>
            <p className="font-signature text-[78px] text-[#5C2018] absolute bottom-[-38px] left-[212px]">
              {x("bride")}
            </p>
          </div>
        </div>
        <div className="max-w-130 mx-auto py-12 flex justify-center h-full ">
          <div className="w-15 h-13  relative " onClick={toggleAudio}>
            <Image src={`${audioPlaying ? 'https://vs-invitation.ayandesign.am/Play.png' : 'https://vs-invitation.ayandesign.am/Pause.png'}`} alt="audio" fill className="cursor-pointer brightness-98 hover:scale-110 hover:brightness-110 transition-transform duration-400" onClick={() => setAudioPlaying(!audioPlaying)} />
          </div>
        </div>
        <div className="max-w-130 mx-auto py-2 flex flex-col gap-14  ">
          <div className="w-full h-full flex  items-start justify-center">
            <p className="font-armenian text-[16px] text-[#5C2018] "> {t("openDay")} </p>
          </div>
          <div className="flex justify-center gap-8">
            <ScratchCoin
              number="01"
              image="https://vs-invitation.ayandesign.am/coin.png"
            />

            <ScratchCoin
              number="07"
              image="https://vs-invitation.ayandesign.am/coin.png"
            />

            <ScratchCoin
              number="26"
              image="https://vs-invitation.ayandesign.am/coin.png"
            />
          </div>
        </div>
        <div className="w-full h-screen border">

        </div>
      </div>
      {/* <div className="w-full min-h-screen border relative overflow-hidden">

      </div> */}
    </>
  );
}