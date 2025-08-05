import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FaCalendarAlt, FaClock, FaUsers, FaVideo, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';

const LiveSessionCard = ({ session, onJoin, onWatch, isInstructor = false }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = new Date(session.startTime) > new Date();
  const isLive = session.status === 'live';
  const hasRecording = session.recordingAvailable && session.recordingUrl;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {session.sessionTitle}
          </CardTitle>
          <Badge className={getStatusColor(session.status)}>
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </Badge>
        </div>
        {session.sessionDescription && (
          <p className="text-gray-600 text-sm mt-2">
            {session.sessionDescription}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt className="h-4 w-4" />
            <span>{formatDate(session.startTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaClock className="h-4 w-4" />
            <span>{formatTime(session.startTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaUsers className="h-4 w-4" />
            <span>{session.enrolledStudents?.length || 0} enrolled</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaVideo className="h-4 w-4" />
            <span>{session.duration} min</span>
          </div>
        </div>

        <div className="flex gap-2">
          {isLive && (
            <Button 
              onClick={() => onJoin(session)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <FaExternalLinkAlt className="h-4 w-4 mr-2" />
              Join Live
            </Button>
          )}
          
          {isUpcoming && !isLive && (
            <Button 
              onClick={() => onJoin(session)}
              className="flex-1 bg-[#1C64F2] hover:bg-[#1A56DB] text-[white] flex items-center justify-center gap-2 py-2 rounded-lg"
              disabled={new Date(session.startTime) > new Date(Date.now() + 5 * 60 * 1000)} // 5 minutes before
            >
              <FaExternalLinkAlt className="h-4 w-4" />
              <span>Join Meeting</span>
            </Button>
          )}
          
          {hasRecording && (
            <Button 
              onClick={() => onWatch(session)}
              variant="outline"
              className="flex-1"
            >
              <FaPlay className="h-4 w-4 mr-2" />
              Watch Recording
            </Button>
          )}
        </div>

        {isInstructor && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Instructor Links:</p>
            <div className="flex gap-2">
              <Button 
                size="sm"
                variant="outline"
                onClick={() => window.open(session.zoomStartUrl, '_blank')}
                className="text-xs"
              >
                Start Meeting
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => window.open(session.zoomJoinUrl, '_blank')}
                className="text-xs"
              >
                Join as Host
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveSessionCard; 