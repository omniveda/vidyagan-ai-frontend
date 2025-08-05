import React from 'react';
import { Card, CardContent } from './ui/card';

const WhoIsItFor = () => {
  const audiences = [
    { 
      icon: '🎓', 
      title: 'Students & Graduates', 
      desc: 'Build confidence for academics and career growth with comprehensive English skills',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      icon: '👨‍💼', 
      title: 'Working Professionals', 
      desc: 'Enhance communication for career advancement and workplace success',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      icon: '👵', 
      title: 'Parents & Elders', 
      desc: 'Learn at your own pace with patient guidance and age-appropriate methods',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      icon: '🌍', 
      title: 'Non-native Speakers', 
      desc: 'Master English for better opportunities and global communication',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      icon: '🧑‍🏫', 
      title: 'Career Switchers', 
      desc: 'Prepare for new professional challenges with targeted English training',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
  ];

  return (
    <section className="py-16 px-4 bg-[white]">
      <div className="container items-center mx-auto">
        <h2 className="text-3xl md:text-4xl text-[#111827] font-bold text-center mb-4 animate-fade-in">Who Is It For?</h2>
        <p className="text-[#6B7280] text-center mb-12 max-w-2xl mx-auto animate-slide-up">
          Our courses are designed for learners from all walks of life
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {audiences.map((audience, index) => (
            <Card 
              key={index} 
              className="transition transform hover:-translate-y-2 hover:shadow-2xl group animate-scale-in overflow-hidden" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={audience.image} 
                  alt={audience.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-2 right-2 text-2xl bg-white/90 rounded-full w-10 h-10 flex items-center justify-center">
                  {audience.icon}
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">{audience.title}</h3>
                <p className="text-[#6B7280] text-sm">{audience.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor; 