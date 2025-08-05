
import React, { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Card, CardContent } from '../components/ui/card';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

const AVATARS = [
  '🦁', '🐯', '🐻', '🐼', '🦊', '🐸', '🐵', '🐶', '🐱', '🦄', '🐧', '🐨', '🐰', '🦉', '🐢', '🐙', '🦋', '🐝', '🦓', '🐬'
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all reviews from the backend (already populated with user and course)
    api.get('/api/v1/course/getReviews')
      .then(res => {
        const reviews = res.data.data || [];
        setTestimonials(
          reviews.map((review, idx) => ({
            ...review,
            avatar: AVATARS[idx % AVATARS.length],
          }))
        );
      })
      .catch(() => setError('Failed to load testimonials.'))
      .finally(() => setLoading(false));
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-[#E3A008]' : 'text-[#D1D5DB]'}`}
      />
    ));
  };

  if (loading) return <div className="text-center py-20">Loading testimonials...</div>;
  if (error) return <div className="text-center py-20 text-[red]">{error}</div>;

  return (
    <div className="min-h-screen  bg-[#F9FAFB] py-12 px-4">
      <div className="container  mx-auto">
        <div className="text-center w-[100%] mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
            What Our Students Say
          </h1>
          <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
            Real stories from real students who have transformed their English communication skills with VidyaGan-AI
          </p>
        </div>

        <div className="grid grid-cols-1 w-[100%] md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow bg-[white]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-left text-lg text-[#111827]">
                      {testimonial.user?.firstName || 'User'} {testimonial.user?.lastName || ''}
                    </h3>
                    <div className="flex gap-1 mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <FaQuoteRight className="h-6 w-6 text-[#C3DDFD]" />
                </div>
                <p className="text-[#374151] mb-4 italic">
                  "{testimonial.review}"
                </p>
                <div className="bg-[#C3DDFD] rounded-lg p-3">
                  <p className="text-sm text-[#1E429F] text-left font-medium">
                    Course: {testimonial.course?.courseName || 'Course'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-[white] w-[100%] rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-[#111827] mb-8">Student Success Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-[#1C64F2] mb-2">98%</div>
              <p className="text-[#4B5563]">Student Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1C64F2] mb-2">85%</div>
              <p className="text-[#4B5563]">Complete Course</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1C64F2] mb-2">70%</div>
              <p className="text-[#4B5563]">Career Advancement</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1C64F2] mb-2">1000+</div>
              <p className="text-[#4B5563]">Success Stories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
