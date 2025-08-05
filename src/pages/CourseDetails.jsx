import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import api from '../lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { FaRegClock as Clock, FaUsers as Users, FaBookOpen as BookOpen, FaStar as Star, FaCalendarAlt as Calendar, FaUser as User, FaInfoCircle as Info, FaTag as Tag, FaListUl as List, FaCheckCircle as CheckCircle } from 'react-icons/fa';

const CourseDetail = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;
    api.post('/api/v1/course/getCourseDetails', { courseId })
      .then(res => {
        setCourse(res.data.data.courseDetails);
      })
      .catch(() => setError('Failed to load course details.'))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) return <div className="text-center py-20">Loading course details...</div>;
  if (error) return <div className="text-center py-20 text-[red]">{error}</div>;
  if (!course) return <div className="text-center py-20 text-[#6B7280]">Course not found.</div>;

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };


  // Helper for date formatting
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  // Render confirmation modal if needed
  const ConfirmationModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-[black]/50 z-50">
      <div className="bg-[white] p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-2">{confirmationModal.text1}</h2>
        <p className="mb-4">{confirmationModal.text2}</p>
        <div className="flex gap-4">
          <Button className="bg-[#1A56DB] text-[white] py-2 px-3 rounded-lg hover:bg-[#233876]" onClick={confirmationModal.btn1Handler}>{confirmationModal.btn1Text}</Button>
          <Button className="border border-[#9CA3AF] py-2 px-3 rounded-lg hover:bg-[#9CA3AF]" variant="outline" onClick={confirmationModal.btn2Handler}>{confirmationModal.btn2Text}</Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {confirmationModal && <ConfirmationModal />}
      {/* Main content below */}
      <div className="min-h-screen bg-gradient-to-br from-[#EBF5FF] to-[#F6F5FF] py-12 px-4">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Banner Card */}
            <Card className="overflow-hidden shadow-xl animate-fade-in">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.courseName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[black]/70 to-transparent"></div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {Array.isArray(course.tag) && course.tag.map((t, idx) => (
                    <Badge key={idx} variant="outline" className="bg-[white]/80 text-[#1F2937]">{t}</Badge>
                  ))}
                </div>
                <div className="absolute top-4 right-4 text-3xl">
                  <Badge variant="secondary">{course.status}</Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-[white]">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Star className="h-4 w-4" style={{ color: '#FFD700' }} />
                    <span>{Array.isArray(course.ratingAndReviews) && course.ratingAndReviews.length > 0 ? (course.ratingAndReviews.reduce((acc, r) => acc + r.rating, 0) / course.ratingAndReviews.length).toFixed(1) : '4.5'}</span>
                    <span>•</span>
                    <Users className="h-4 w-4" />
                    <span>{course.studentsEnrolled?.length || 0} students</span>
                  </div>
                  <h3 className="text-2xl font-bold drop-shadow-lg">{course.courseName}</h3>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl mb-2 flex items-center gap-2">
                  <Info className="h-6 w-6 text-[#3F83F8]" /> {course.courseName}
                </CardTitle>
                <div className="text-lg text-[#374151] mb-4 whitespace-pre-line">{course.courseDescription}</div>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-[#374151]">
                    <User className="h-4 w-4" />
                    <span>Instructor: {course.instructor?.firstName} {course.instructor?.lastName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#374151]">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {formatDate(course.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#374151]">
                    <Tag className="h-4 w-4" />
                    <span>Category: {course.category?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#374151]">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {course.totalDuration || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-[#1A56DB] font-bold text-2xl">
                    ₹{course.price}
                  </div>
                  <Badge variant="secondary" className="text-lg">{course.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#057A55]" /> What you'll learn:</h4>
                  <div className="text-[#374151] bg-[#F3F4F6] rounded-lg p-4 whitespace-pre-line">
                    {course.whatYouWillLearn}
                  </div>
                </div>
                {Array.isArray(course.instructions) && course.instructions.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><List className="h-4 w-4 text-[#7E3AF2]" /> Instructions:</h4>
                    <ul className="list-disc pl-6 text-[#374151]">
                      {course.instructions.map((inst, idx) => (
                        <li key={idx}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(course.courseContent) && course.courseContent.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#9F580A]" /> Course Content:</h4>
                    <div className="space-y-2">
                      {course.courseContent.map((section, idx) => (
                        <Card key={section._id || idx} className="bg-[white]/80 border-l-4 border-blue-400">
                          <CardHeader className="flex flex-row items-center gap-2 py-2 px-4">
                            <span className="font-bold text-[#1A56DB]">Section {idx + 1}:</span>
                            <span className="text-[#1F2937]">{section.sectionName}</span>
                          </CardHeader>
                          {Array.isArray(section.subSection) && section.subSection.length > 0 && (
                            <CardContent className="pl-8 pb-2">
                              <ul className="list-disc text-[#374151]">
                                {section.subSection.map((sub, subIdx) => (
                                  <li key={sub._id || subIdx}>{sub.title}</li>
                                ))}
                              </ul>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <Button className="w-full text-lg py-6 rounded-xl shadow-lg bg-gradient-to-r from-[#1C64F2] to-[#7E3AF2] hover:from-[#6C2BD9] hover:to-[#1A56DB] text-[white] font-bold" onClick={handleBuyCourse}>
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="mt-8 animate-fade-in shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><Star className="h-5 w-5" style={{ color: '#FFD700' }} /> Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {Array.isArray(course.ratingAndReviews) && course.ratingAndReviews.length > 0 ? (
                  <div className="space-y-4">
                    {course.ratingAndReviews.map((review, idx) => (
                      <div key={review._id || idx} className="bg-[#F3F4F6] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4 text-[#3F83F8]" />
                          <span className="font-semibold">{review.user?.firstName || 'User'}</span>
                          <span className="text-[#C27803] flex items-center gap-1 ml-2"><Star className="h-4 w-4" style={{ color: '#FFD700' }} /> {review.rating}</span>
                        </div>
                        <div className="text-[#374151]">{review.review}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[#6B7280]">No reviews yet.</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-4 bg-[white]/90 shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><Info className="h-5 w-5 text-[#3F83F8]" /> Quick Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2 text-[#374151]">
                  <Users className="h-4 w-4" />
                  <span>{course.studentsEnrolled?.length || 0} students enrolled</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-[#374151]">
                  <BookOpen className="h-4 w-4" />
                  <span>{Array.isArray(course.courseContent) ? course.courseContent.length : 0} sections</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-[#374151]">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {course.totalDuration || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-[#374151]">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {formatDate(course.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-[#374151]">
                  <Tag className="h-4 w-4" />
                  <span>Category: {course.category?.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-[#374151]">
                  <User className="h-4 w-4" />
                  <span>Instructor: {course.instructor?.firstName} {course.instructor?.lastName}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-[#374151]">
                  <Info className="h-4 w-4" />
                  <span>Status: {course.status}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail; 