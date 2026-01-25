import React from "react"
import heroVideo from "../assets/hero.mp4"

const HeroSection = () => {

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <video
        src={heroVideo}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  )
}

export default HeroSection