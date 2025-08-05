import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { FaRegClock, FaUsers, FaBookOpen, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllCourses, fetchCourseDetails } from '../services/operations/courseDetailsAPI';

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const allCourses = await getAllCourses();
        // Optionally, pick top 3-5 featured courses
        const detailedCourses = await Promise.all(
          (allCourses || []).slice(0, 5).map(async (course) => {
            try {
              const details = await fetchCourseDetails(course._id);
              // Only return courseDetails if it's a plain object and not a React element
              if (details && details.courseDetails && typeof details.courseDetails === 'object' && !details.courseDetails.$$typeof) {
                return details.courseDetails;
              }
              return course;
            } catch {
              return course; // fallback to basic if error
            }
          })
        );
        setCourses(detailedCourses);
      } catch (e) {
        setError('Failed to load featured courses.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Debug: log the courses array before rendering
  console.log('courses to render', courses);

  // Helper to check if a value is a plain object and not a React element
  function isRenderableCourse(course) {
    return course && typeof course === 'object' && !Array.isArray(course) && !course.$$typeof;
  }

  if (loading) return <div className="text-center py-20">Loading featured courses...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <section className="py-16 px-4 bg-[white]">
      <div className="container items-center mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-fade-in">Featured Courses</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-slide-up">
          Choose the perfect course that matches your learning goals and schedule
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {courses.map((course, index) => {
            if (!isRenderableCourse(course)) {
              console.warn('Skipping non-renderable course:', course);
              return null;
            }
            return (
              <Card 
                key={course._id || index} 
                className={`hover:shadow-xl transition-all pb-8 duration-300 hover:-translate-y-2 bg-[white] animate-scale-in overflow-hidden group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.courseName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-[white]/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                      {course.tag?.[0] || 'General'}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 text-3xl">
                    {/* Optionally use an icon */}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 text-[white] text-sm">
                      <FaStar className="h-4 w-4 text-yellow-400" />
                      <span>{course.rating || '4.5'}</span>
                      <span>•</span>
                      <FaUsers className="h-4 w-4" />
                      <span>{course.studentsEnrolled?.length || 0} students</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-xl mb-2">{course.courseName}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">₹{course.price}</div>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-1">
                      <FaRegClock className="h-4 w-4" />
                      3 Months
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <FaBookOpen className="h-4 w-4" />
                      30 Classes
                    </div>
                  </div>
                  <Link to={`/courses/${course._id}`}>
                    <Button className="w-full mt-4 bg-[#111827] py-4 text-[white] rounded-lg  hover:-translate-y-2 hover:shadow-2xl">
                      Enroll Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-center">
          <Link to="/show-all-courses">
            <Button size="lg" variant="outline" className="hover:-translate-y-2 hover:shadow-2xl transition duration-300 border border-[#D1D5DB] py-4 px-4 rounded-lg">
              📘 View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses; 