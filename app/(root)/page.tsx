import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      
      <div className="flex flex-col justify-center items-center my-5 relative z-30">
        <Image
      src={"/hero.svg"}
       alt="Hero-Section"
      height={500}
      width={500}
      className="relative z-10 object-contain overflow-hidden -mb-10"
/>

        <h1 className="z-20 text-6xl mt-23 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 dark:from-rose-400 dark:via-red-400 dark:to-pink-400 tracking-tight leading-[1.3]">
          Vibe Code With with Intelligence
        </h1>
      </div>

      <p className="mt-4 mb-6 text-base md:text-lg text-center text-gray-600 dark:text-gray-400 px-5 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
        VibeCode Editor is a powerful and intelligent code editor that enhances
        your coding experience with advanced features and seamless integration.
        It is designed to help you write, debug, and optimize your code
        efficiently.
      </p>

      <Link href={"/dashboard"} className="relative z-40">
        <Button
          variant={"brand"}
          className="mb-4 relative z-50 shadow-lg"
          size={"lg"}
        >
          Get Started
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  );
}
