import React from 'react';
import { Card, CardContent } from './ui/card';

const HowItWorks = () => {
  const steps = [
    { 
      number: 1, 
      title: 'Sign up & choose a plan', 
      desc: 'Select the perfect course for your learning goals and get instant access',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      number: 2, 
      title: 'Access recorded video lessons', 
      desc: 'Learn at your own pace with high-quality content available 24/7',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      number: 3, 
      title: 'Track your progress via dashboard', 
      desc: 'Monitor your improvement with detailed analytics and personalized insights',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      number: 4, 
      title: 'Join optional 1-on-1 sessions', 
      desc: 'Get personalized feedback from expert instructors when you need it',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    { 
      number: 5, 
      title: 'Earn certificate & resume support', 
      desc: 'Showcase your skills with official certification and career guidance',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container items-center mx-auto">
        <h2 className="text-3xl md:text-4xl  font-bold text-center mb-4 animate-fade-in">How It Works</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-slide-up">
          Get started with our simple 5-step process designed for your success
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-[#6B7280] text-sm">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 