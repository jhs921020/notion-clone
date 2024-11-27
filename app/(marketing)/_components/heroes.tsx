"use client";
import Lottie from "lottie-react";
import React from "react";
import animation from "../../../public/animations/Animation1.json";
import Image from "next/image";

function Heroes() {
  return (
    <div
      className="flex items-center
    justify-center max-w-5xl"
    >
      <div
        className="relative w-[350px] h-[350px]
      sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]"
      >
        <Lottie
          loop={true}
          style={{ width: "fit-content", margin: "10px 0px 10px 50px" }}
          animationData={animation}
        />
      </div>
      <div className="relative w-[400px] h-[400px] hidden md:block">
        <Image
          src={"/images/1-white.svg"}
          fill
          alt="imageHero"
          className="object-left object-contain dark:hidden"
        />
        <Image
          src={"/images/1-dark.svg"}
          fill
          alt="imageHero"
          className="object-left object-contain dark:block hidden"
        />
      </div>
    </div>
  );
}

export default Heroes;
