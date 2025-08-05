
import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { FaCheckCircle, FaUsers, FaRegClock, FaAward, FaHeart, FaGlobe, FaEye, FaBullseye } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaRegClock className="h-6 w-6" />,
      title: '24/7 video access',
      description: 'Learn at your own pace, anytime, anywhere'
    },
    {
      icon: <FaUsers className="h-6 w-6" />,
      title: 'Personalized feedback via live sessions',
      description: 'Get individual attention from expert instructors'
    },
    {
      icon: <FaAward className="h-6 w-6" />,
      title: 'Easy LMS dashboard',
      description: 'Track your progress with our user-friendly platform'
    },
    {
      icon: <FaCheckCircle className="h-6 w-6" />,
      title: 'Resume building & interview prep',
      description: 'Comprehensive career support beyond language learning'
    },
    {
      icon: <FaHeart className="h-6 w-6" />,
      title: 'Elder & parent-friendly support',
      description: 'Special attention for learners of all ages'
    },
    {
      icon: <FaGlobe className="h-6 w-6" />,
      title: 'Inclusive learning environment',
      description: 'Welcoming space for learners from all backgrounds'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container items-center mx-auto">
        {/* Hero Section with Responsive Image */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="English communication training session" 
              className="mx-auto rounded-lg shadow-xl w-full max-w-4xl h-64 md:h-80 object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
            About VidyaGan-AI
          </h1>
          <p className="text-xl text-[#4B5563] max-w-3xl mx-auto">
            Empowering learners worldwide to master English communication with confidence and clarity
          </p>
        </div>

        {/* Mission Section with Image */}
        <div className="bg-[white] rounded-lg p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-left text-[#111827] mb-6">Our Mission</h2>
              <p className="text-lg text-[#374151] text-left leading-relaxed">
                To make English learning accessible, simple, and empowering for learners of all ages and backgrounds. 
                We believe that effective communication is the key to unlocking opportunities, building confidence, 
                and connecting with the world. Our platform combines cutting-edge technology with proven teaching 
                methodologies to create an inclusive learning environment where everyone can thrive.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="English conversation practice session" 
                className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-br from-[#EBF5FF] to-[#E5EDFF] rounded-lg p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Vision of English communication excellence" 
                className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div>
              <div className="flex items-center mb-6">
                <FaEye className="h-8 w-8 text-[#1C64F2] mr-3" />
                <h2 className="text-3xl text-left font-bold text-[#111827]">Our Vision</h2>
              </div>
              <p className="text-lg text-[#374151] text-left leading-relaxed mb-4">
                To become the world's most trusted and innovative English learning platform, where every individual 
                can achieve fluency and confidence in communication regardless of their starting point or circumstances.
              </p>
              <p className="text-lg text-[#374151] text-left leading-relaxed mb-6">
                We envision a future where language barriers no longer limit personal growth, career advancement, 
                or global connections. Through our comprehensive approach to English education, we aim to create 
                a community of confident communicators who can express themselves clearly and connect meaningfully 
                with the world around them.
              </p>
              <div className="flex items-center text-[#1C64F2]">
                <FaBullseye className="h-5 w-5 mr-2" />
                <span className="font-semibold">Transforming lives through effective communication</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[#111827] mb-12">
            Why Choose VidyaGan-AI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-[#1C64F2] mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl text-left font-semibold text-[#111827] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#4B5563] text-left">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section with Images */}
        <div className="bg-[#EBF5FF] rounded-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-center text-[#111827] mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-left text-[#1C64F2] mb-3">Accessibility</h3>
                <p className="text-[#374151] text-left">
                  We believe education should be available to everyone, regardless of age, background, or technical expertise. 
                  Our platform is designed to be intuitive and welcoming for all learners.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-left text-[#1C64F2] mb-3">Quality</h3>
                <p className="text-[#374151] text-left">
                  Every lesson, every interaction, and every feature is crafted with attention to detail to ensure 
                  the highest quality learning experience for our students.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#1C64F2] text-left mb-3">Innovation</h3>
                <p className="text-[#374151] text-left">
                  We continuously evolve our teaching methods and technology to provide the most effective and 
                  engaging learning experience possible.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1C64F2] text-left mb-3">Support</h3>
                <p className="text-[#374151] text-left">
                  Our dedicated team is committed to supporting every learner's journey, providing guidance, 
                  encouragement, and assistance whenever needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section with Image */}
        <div className="bg-[white] rounded-lg p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Professional English instructors team" 
                className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#111827] text-left mb-6">Expert Instructors</h2>
              <p className="text-lg text-[#374151] leading-relaxed text-left mb-4">
                Our team consists of certified English language professionals with years of experience in teaching 
                communication skills, business English, and interview preparation.
              </p>
              <p className="text-lg text-[#374151] leading-relaxed text-left">
                Each instructor brings unique expertise and cultural understanding to help you achieve your specific 
                learning goals, whether it's academic success, career advancement, or personal development.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="text-center bg-[white] rounded-lg p-8 w-[100%] md:p-12">
          <h2 className="text-3xl font-bold text-[#111827] mb-6">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-[#1C64F2] mb-2">1000+</div>
              <p className="text-[#4B5563]">Students Enrolled</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1C64F2] mb-2">95%</div>
              <p className="text-[#4B5563]">Completion Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1C64F2] mb-2">24/7</div>
              <p className="text-[#4B5563]">Learning Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
