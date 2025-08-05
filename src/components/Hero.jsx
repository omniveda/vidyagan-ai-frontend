import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { FaPlay } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-[#E1EFFE]  via-[#E5EDFF] to-[#EDEBFE] py-20 px-4 overflow-hidden">
      <div className="container mx-auto text-center items-center relative">
        {/* Floating elements for visual interest */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full animate-float opacity-20"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-purple-200 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full animate-float opacity-25" style={{ animationDelay: '4s' }}></div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6 animate-bounce-in">
          Speak English Fluently.
          <span className="gradient-text text-[#5145CD] block mt-2"> Communicate Confidently.</span>
        </h1>
        <p className="text-lg md:text-xl text-[#374151] mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
          Learn English and job-oriented soft skills — from beginner to advanced — with structured lessons, live sessions, and smart progress tracking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Link to="/courses">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-2 text-lg px-8 py-3 font-semibold rounded-lg bg-[#111827] hover:bg-gray-800 transition transform hover:-translate-y-1 hover:shadow-lg shadow text-[white]">
              <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 mr-2" />
              Start Learning
            </Button>
          </Link>
          <Button className="w-full sm:w-auto flex items-center justify-center gap-2 text-lg px-8 py-3 font-semibold rounded-full bg-[white] text-[#111827] transition transform hover:-translate-y-1 hover:shadow-lg shadow">
            <FaPlay className="mr-2 h-5 w-5 align-middle" />
            Watch a Demo
          </Button>
        </div>
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <img
            src="/image/20.jpg"
            alt="English learning classroom with students practicing communication skills"
            className="mx-auto rounded-lg shadow-2xl max-w-full h-auto w-full max-w-4xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero; 