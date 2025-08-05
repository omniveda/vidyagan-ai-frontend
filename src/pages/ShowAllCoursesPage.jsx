
import React, { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { FaRegClock, FaUsers, FaBookOpen, FaCheckCircle, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/v1/course/getAllCourses')
      .then(res => {
        setCourses(res.data.data || []);
      })
      .catch(err => {
        setError('Failed to load courses.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading courses...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen  bg-gray-50 py-12 px-4">
      <div className="container items-center mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
            English Training Courses
          </h1>
          <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
            Comprehensive English learning programs designed by expert trainers to help you achieve fluency and confidence in professional communication
          </p>
        </div>

        <div className="grid w-[90%] grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {(Array.isArray(courses) ? courses : []).map((course, index) => (
            <Card key={course._id || index} className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-[white] animate-scale-in overflow-hidden`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative h-64 md:h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.courseName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute text-[white] bg-[#111827] rounded-2xl top-4 left-4">
                  <Badge>{course.tag?.[0] || 'General'}</Badge>
                </div>
                <div className="absolute top-4 right-4 text-3xl bg-[white]/90 rounded-full w-12 h-12 flex items-center justify-center">
                  {/* Optionally use an icon */}
                </div>
                <div className="absolute bottom-4 left-4 text-[white]">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <FaStar className="h-4 w-4 text-yellow-400" />
                    <span>{course.rating || '4.5'}</span>
                    <span>•</span>
                    <FaUsers className="h-4 w-4" />
                    <span>{course.studentsEnrolled?.length || 0} students</span>
                  </div>
                  <h3 className="text-xl text-left font-bold">{course.courseName}</h3>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm mb-3">{course.courseDescription}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex text-[#6B7280] items-center gap-2">
                        <FaRegClock className="h-4 w-4" />
                        {/* Duration: You may need to calculate or fetch */}
                        3 Months
                      </div>
                      <div className="flex text-[#6B7280] items-center gap-2">
                        <FaBookOpen className="h-4 w-4" />
                        {/* Classes: You may need to calculate or fetch */}
                        30 Classes
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-blue-600">₹{course.price}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add more details as needed */}
                <Button asChild className="w-full bg-[#111827] text-[white] py-3 rounded-lg hover:bg-[#1F2937]" size="lg">
                  <Link to={`/courses/${course._id}`}>🎯 Start Learning Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-[white] w-[90%] rounded-lg p-8 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Choose Our English Training?</h3>
              <div className="space-y-4">
                {[
                  'Expert trainers with 10+ years experience',
                  'Practical, job-oriented curriculum',
                  'Flexible learning schedules',
                  'Interactive live sessions',
                  'Certificate recognized by top companies',
                  'Career placement support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-[green] flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Successful English learners in professional setting"
                className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Course Features */}
        <div className="bg-gradient-to-r w-[90%] from-[#EBF5FF] to-[#F6F5FF] rounded-lg p-8 text-center animate-slide-up">
          <h3 className="text-2xl font-bold mb-6">Every Course Includes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Video Lessons', desc: 'HD recorded sessions available 24/7', icon: '🎥' },
              { title: 'Live Practice', desc: 'Weekly speaking sessions with trainers', icon: '🎤' },
              { title: 'Progress Tracking', desc: 'Detailed analytics of your improvement', icon: '📊' },
              { title: 'Career Support', desc: 'Resume tips and interview preparation', icon: '💼' }
            ].map((feature, index) => (
              <div key={index} className="bg-[white] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
