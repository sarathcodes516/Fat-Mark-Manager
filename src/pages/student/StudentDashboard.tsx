import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart, TrendingUp, Circle, BookOpen } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for student performance
  const mockSubjects = [
    { id: 1, name: 'Computer Networks', code: 'CS401', fat1: 85, fat2: 78, fat3: 90 },
    { id: 2, name: 'Database Systems', code: 'CS402', fat1: 92, fat2: 88, fat3: 95 },
    { id: 3, name: 'Operating Systems', code: 'CS403', fat1: 68, fat2: 75, fat3: 82 },
    { id: 4, name: 'Software Engineering', code: 'CS404', fat1: 76, fat2: 81, fat3: 79 },
  ];
  
  const calculateAverage = (subject: typeof mockSubjects[0]) => {
    return Math.round((subject.fat1 + subject.fat2 + subject.fat3) / 3);
  };

  const totalAverage = Math.round(
    mockSubjects.reduce((sum, subject) => sum + calculateAverage(subject), 0) / mockSubjects.length
  );
  
  const getPerformanceTrend = (subject: typeof mockSubjects[0]) => {
    if (subject.fat3 > subject.fat2 && subject.fat2 > subject.fat1) return 'increasing';
    if (subject.fat3 < subject.fat2 && subject.fat2 < subject.fat1) return 'decreasing';
    return 'fluctuating';
  };
  
  const getStatusColor = (avg: number) => {
    if (avg >= 90) return 'bg-green-500';
    if (avg >= 75) return 'bg-blue-500';
    if (avg >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome back, {user?.name}</h2>
            <p className="mt-1 text-blue-100">Here's your semester performance overview</p>
          </div>
          <div className="mt-4 flex items-center space-x-2 md:mt-0">
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
              <span className="text-xl font-bold text-white">{totalAverage}%</span>
              <span className="text-xs text-blue-100">Average</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-800 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-300">Total Subjects</span>
            <BookOpen size={20} className="text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">{mockSubjects.length}</p>
          <p className="mt-1 text-sm text-gray-400">Current semester</p>
        </div>
        
        <div className="rounded-xl bg-gray-800 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-300">Highest Score</span>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">
            {Math.max(...mockSubjects.map(s => Math.max(s.fat1, s.fat2, s.fat3)))}%
          </p>
          <p className="mt-1 text-sm text-gray-400">In any assessment</p>
        </div>
        
        <div className="rounded-xl bg-gray-800 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-300">FAT-3 Average</span>
            <BarChart size={20} className="text-purple-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">
            {Math.round(mockSubjects.reduce((sum, s) => sum + s.fat3, 0) / mockSubjects.length)}%
          </p>
          <p className="mt-1 text-sm text-gray-400">Latest assessment</p>
        </div>
        
        <div className="rounded-xl bg-gray-800 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-300">Performance</span>
            <Circle size={20} className="text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">
            {totalAverage >= 90 ? 'Excellent' : totalAverage >= 75 ? 'Good' : totalAverage >= 60 ? 'Average' : 'Needs Improvement'}
          </p>
          <p className="mt-1 text-sm text-gray-400">Overall rating</p>
        </div>
      </div>
      
      {/* Performance Chart */}
      <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-white">Subject Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 text-sm font-medium text-gray-400">Subject</th>
                <th className="pb-3 text-sm font-medium text-gray-400">FAT-1</th>
                <th className="pb-3 text-sm font-medium text-gray-400">FAT-2</th>
                <th className="pb-3 text-sm font-medium text-gray-400">FAT-3</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Average</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockSubjects.map((subject) => {
                const average = calculateAverage(subject);
                const trend = getPerformanceTrend(subject);
                
                return (
                  <tr key={subject.id} className="hover:bg-gray-750">
                    <td className="py-3 pr-4">
                      <div>
                        <p className="font-medium text-white">{subject.name}</p>
                        <p className="text-sm text-gray-400">{subject.code}</p>
                      </div>
                    </td>
                    <td className="py-3">{subject.fat1}%</td>
                    <td className="py-3">{subject.fat2}%</td>
                    <td className="py-3">{subject.fat3}%</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className={`mr-2 h-2.5 w-2.5 rounded-full ${getStatusColor(average)}`}></div>
                        <span>{average}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        trend === 'increasing' 
                          ? 'bg-green-400/10 text-green-400' 
                          : trend === 'decreasing' 
                            ? 'bg-red-400/10 text-red-400' 
                            : 'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {trend === 'increasing' && '↑ '}
                        {trend === 'decreasing' && '↓ '}
                        {trend === 'increasing' ? 'Improving' : trend === 'decreasing' ? 'Declining' : 'Fluctuating'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Assessments */}
      <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-white">Recent Activity</h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-750 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">FAT-3 Results Published</p>
                <p className="mt-1 text-sm text-gray-400">All subject FAT-3 results are now available</p>
              </div>
              <span className="text-sm text-gray-400">2 days ago</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-750 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">Query Responded</p>
                <p className="mt-1 text-sm text-gray-400">Prof. Sharma responded to your Database Systems query</p>
              </div>
              <span className="text-sm text-gray-400">1 week ago</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-750 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">FAT-2 Results Published</p>
                <p className="mt-1 text-sm text-gray-400">All subject FAT-2 results are now available</p>
              </div>
              <span className="text-sm text-gray-400">3 weeks ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;