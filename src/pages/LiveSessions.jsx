import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCourseLiveSessions, enrollInSession, unenrollFromSession } from '../services/operations/liveSessionAPI';
import LiveSessionCard from '../components/LiveSessionCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { FaPlus, FaFilter, FaCalendarAlt, FaVideo, FaHistory } from 'react-icons/fa';

const LiveSessions = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const { user: profileUser } = useSelector((state) => state.profile);
  
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, upcoming, live, completed
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchLiveSessions();
    }
  }, [courseId, token]);

  const fetchLiveSessions = async () => {
    try {
      setLoading(true);
      const response = await getCourseLiveSessions(token, courseId);
      setSessions(response.data);
      
      // Get course details for instructor check
      if (response.data.length > 0) {
        setCourse(response.data[0].courseId);
      }
    } catch (error) {
      console.error('Error fetching live sessions:', error);
      setError('Failed to load live sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = (session) => {
    if (session.status === 'live') {
      window.open(session.zoomJoinUrl, '_blank');
    } else if (session.status === 'scheduled') {
      const timeUntilStart = new Date(session.startTime) - new Date();
      if (timeUntilStart <= 5 * 60 * 1000) { // 5 minutes before
        window.open(session.zoomJoinUrl, '_blank');
      } else {
        alert('Session will be available 5 minutes before start time');
      }
    }
  };

  const handleWatchRecording = (session) => {
    if (session.recordingUrl) {
      window.open(session.recordingUrl, '_blank');
    }
  };

  const handleEnrollInSession = async (sessionId) => {
    try {
      await enrollInSession(token, sessionId);
      fetchLiveSessions(); // Refresh the list
    } catch (error) {
      console.error('Error enrolling in session:', error);
    }
  };

  const handleUnenrollFromSession = async (sessionId) => {
    try {
      await unenrollFromSession(token, sessionId);
      fetchLiveSessions(); // Refresh the list
    } catch (error) {
      console.error('Error unenrolling from session:', error);
    }
  };

  const isInstructor = course && course.instructor === user?.id;

  const filteredSessions = sessions.filter(session => {
    switch (filter) {
      case 'upcoming':
        return session.status === 'scheduled' && new Date(session.startTime) > new Date();
      case 'live':
        return session.status === 'live';
      case 'completed':
        return session.status === 'completed' || new Date(session.endTime) < new Date();
      default:
        return true;
    }
  });

  const upcomingSessions = sessions.filter(s => 
    s.status === 'scheduled' && new Date(s.startTime) > new Date()
  );
  const liveSessions = sessions.filter(s => s.status === 'live');
  const completedSessions = sessions.filter(s => 
    s.status === 'completed' || new Date(s.endTime) < new Date()
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EBF5FF] to-[#F6F5FF] py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading live sessions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EBF5FF] to-[#F6F5FF] py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-20">
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchLiveSessions} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBF5FF] to-[#F6F5FF] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Live Sessions
              </h1>
              {course && (
                <p className="text-gray-600">
                  Course: {course.courseName}
                </p>
              )}
            </div>
            {isInstructor && (
              <Button 
                onClick={() => navigate(`/create-live-session/${courseId}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FaPlus className="h-4 w-4 mr-2" />
                Create Session
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingSessions.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <FaVideo className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Live Now</p>
                  <p className="text-2xl font-bold text-gray-900">{liveSessions.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <FaHistory className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedSessions.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              All Sessions
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'default' : 'outline'}
              onClick={() => setFilter('upcoming')}
              size="sm"
            >
              <FaCalendarAlt className="h-4 w-4 mr-2" />
              Upcoming
            </Button>
            <Button
              variant={filter === 'live' ? 'default' : 'outline'}
              onClick={() => setFilter('live')}
              size="sm"
            >
              <FaVideo className="h-4 w-4 mr-2" />
              Live Now
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
              size="sm"
            >
              <FaHistory className="h-4 w-4 mr-2" />
              Completed
            </Button>
          </div>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <FaVideo className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No {filter === 'all' ? '' : filter} sessions found
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? 'No live sessions have been scheduled for this course yet.'
                  : `No ${filter} sessions available.`
                }
              </p>
              {isInstructor && (
                <Button 
                  onClick={() => navigate(`/create-live-session/${courseId}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FaPlus className="h-4 w-4 mr-2" />
                  Create First Session
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <LiveSessionCard
                key={session._id}
                session={session}
                onJoin={handleJoinSession}
                onWatch={handleWatchRecording}
                isInstructor={isInstructor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSessions; 