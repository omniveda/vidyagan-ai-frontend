import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';
import { createLiveSession, getCourseLiveSessions } from '../../../../services/operations/liveSessionAPI';
import { getPdfUrl } from '../../../../utils/pdfUtils';

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalCourseId, setModalCourseId] = useState(null);
  const [sessionForm, setSessionForm] = useState({
    sessionTitle: '',
    sessionDescription: '',
    startTime: '',
    duration: 60,
    maxParticipants: 100,
    settings: {
      allowJoinBeforeHost: false,
      muteOnEntry: true,
      waitingRoom: true,
      autoRecord: true,
    },
  });
  const [liveSessions, setLiveSessions] = useState({}); // { courseId: [sessions] }
  const [sessionLoading, setSessionLoading] = useState({}); // { courseId: bool }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);
        console.log(instructorApiData);
        if (instructorApiData.length) setInstructorData(instructorApiData);
        if (result) setCourses(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // Fetch live sessions for each course
  useEffect(() => {
    if (!token || !courses.length) return;
    courses.forEach(async (course) => {
      setSessionLoading((prev) => ({ ...prev, [course._id]: true }));
      try {
        const res = await getCourseLiveSessions(token, course._id);
        setLiveSessions((prev) => ({ ...prev, [course._id]: res.data || [] }));
      } catch (e) {
        setLiveSessions((prev) => ({ ...prev, [course._id]: [] }));
      } finally {
        setSessionLoading((prev) => ({ ...prev, [course._id]: false }));
      }
    });
  }, [token, courses]);

  // Handle modal open/close
  const openModal = (courseId) => {
    setModalCourseId(courseId);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalCourseId(null);
    setSessionForm({
      sessionTitle: '',
      sessionDescription: '',
      startTime: '',
      duration: 60,
      maxParticipants: 100,
      settings: {
        allowJoinBeforeHost: false,
        muteOnEntry: true,
        waitingRoom: true,
        autoRecord: true,
      },
    });
  };

  // Handle form input
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in sessionForm.settings) {
      setSessionForm((prev) => ({
        ...prev,
        settings: { ...prev.settings, [name]: type === 'checkbox' ? checked : value },
      }));
    } else {
      setSessionForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit
  const handleSessionSubmit = async (e) => {
    e.preventDefault();
    if (!modalCourseId) return;
    try {
      await createLiveSession(token, {
        ...sessionForm,
        courseId: modalCourseId,
      });
      // Refresh sessions for this course
      const res = await getCourseLiveSessions(token, modalCourseId);
      setLiveSessions((prev) => ({ ...prev, [modalCourseId]: res.data || [] }));
      closeModal();
    } catch (err) {
      // Error handled by toast in API util
    }
  };

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-black">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium tex-black">
          Let's start something new
        </p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : Array.isArray(courses) && courses.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-mwhite p-6">
                <p className="text-lg font-bold text-black">Visualize</p>
                <p className="mt-4 text-xl font-medium text-black">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-mwhite p-6">
              <p className="text-lg font-bold text-black">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-black">Total Courses</p>
                  <p className="text-3xl font-semibold text-black">
                    {Array.isArray(courses) ? courses.length : 0}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-black">Total Students</p>
                  <p className="text-3xl font-semibold text-black">
                    {totalStudents || 0}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-black">Total Income</p>
                  <p className="text-3xl font-semibold text-black">
                    Rs. {totalAmount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md bg-mwhite p-6">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-black">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 flex items-start space-x-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-black">{course.courseName}</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-black">{Array.isArray(course.studentsEnroled) ? course.studentsEnroled.length : 0} students</p>
                      <p className="text-xs font-medium text-black">|</p>
                      <p className="text-xs font-medium text-black">Rs. {course.price}</p>
                    </div>
                    {course.ebook && (
                      <div className="mt-2">
                        <a
                          href={getPdfUrl(course.ebook)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                          📄 View Ebook
                        </a>
                      </div>
                    )}

                    <button
                      className="mt-2 px-3 py-1 bg-blue-600 text-[white] rounded hover:bg-blue-700"
                      onClick={() => openModal(course._id)}
                    >
                      Start Live Session
                    </button>
                    {/* Upcoming Sessions */}
                    <div className="mt-4">
                      <p className="font-semibold text-black">Upcoming Live Sessions:</p>
                      {sessionLoading[course._id] ? (
                        <p>Loading...</p>
                      ) : (Array.isArray(liveSessions[course._id]) && liveSessions[course._id].length ? (
                        <ul className="text-sm text-black">
                          {liveSessions[course._id]
                            .filter(session => new Date(session.endTime) > new Date())
                            .map((session) => (
                            <li key={session._id} className="border-b py-1">
                              <span className="font-bold">{session.sessionTitle}</span> - {new Date(session.startTime).toLocaleString()}<br />
                              <span className="text-xs">Zoom Link: <a href={session.zoomJoinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Join</a></span>
                            </li>
                          ))}
                        </ul>
                      ) : <p className="text-xs text-gray-500">No upcoming sessions</p>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-mwhite p-6 py-20">
          <p className="text-center text-2xl font-bold text-black">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
      {/* Custom Modal for creating live session (no react-modal) */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="bg-[white] p-8 rounded shadow-md w-96" style={{zIndex: 50}}>
            <form onSubmit={handleSessionSubmit}>
              <h2 className="text-xl font-bold mb-4">Start Live Session</h2>
              <label className="block mb-2">Title
                <input type="text" name="sessionTitle" value={sessionForm.sessionTitle} onChange={handleFormChange} required className="w-full border p-2 rounded" />
              </label>
              <label className="block mb-2">Description
                <textarea name="sessionDescription" value={sessionForm.sessionDescription} onChange={handleFormChange} className="w-full border p-2 rounded" />
              </label>
              <label className="block mb-2">Start Time
                <input type="datetime-local" name="startTime" value={sessionForm.startTime} onChange={handleFormChange} required className="w-full border p-2 rounded" />
              </label>
              <label className="block mb-2">Duration (minutes)
                <input type="number" name="duration" value={sessionForm.duration} onChange={handleFormChange} min="1" required className="w-full border p-2 rounded" />
              </label>
              <label className="block mb-2">Max Participants
                <input type="number" name="maxParticipants" value={sessionForm.maxParticipants} onChange={handleFormChange} min="1" required className="w-full border p-2 rounded" />
              </label>
              <div className="flex items-center gap-2 mb-2">
                <label><input type="checkbox" name="allowJoinBeforeHost" checked={sessionForm.settings.allowJoinBeforeHost} onChange={handleFormChange} /> Allow Join Before Host</label>
                <label><input type="checkbox" name="muteOnEntry" checked={sessionForm.settings.muteOnEntry} onChange={handleFormChange} /> Mute on Entry</label>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <label><input type="checkbox" name="waitingRoom" checked={sessionForm.settings.waitingRoom} onChange={handleFormChange} /> Waiting Room</label>
                <label><input type="checkbox" name="autoRecord" checked={sessionForm.settings.autoRecord} onChange={handleFormChange} /> Auto Record</label>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
