import React from "react";
import { Element, Link as LinkScroll } from "react-scroll";
import Button from "@/Components/Button";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 overflow-hidden bg-gray-900">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-full blur-3xl" />
      
      <Element name="hero">
        <div className="container relative">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3 tracking-wider font-semibold text-blue-400 mb-4">
              Video Editing
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Amazingly simple
            </h1>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10 text-gray-300 leading-relaxed">
              We designed XORA AI Video Editor to be an easy to use, quick to
              learn, and surprisingly powerful.
            </p>
            <LinkScroll 
              to="features" 
              offset={-100} 
              spy={true} 
              smooth={true}
              className="inline-block"
            >
              <Button 
                icon="/images/zap.svg"
                containerClassName="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Try it now
              </Button>
            </LinkScroll>
          </div>

          <div className="absolute -top-32 left-[calc(50%-340px)] w-[1230px] pointer-events-none hero-img_res">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
              <img
                src="/images/hero.png"
                className="size-1230 max-lg:h-auto animate-float relative z-10"
                alt="hero"
              />
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;