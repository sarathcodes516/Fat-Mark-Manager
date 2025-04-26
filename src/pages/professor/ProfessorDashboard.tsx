import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, FileText, Clock, AlertCircle, Filter, BarChart, BookOpen } from 'lucide-react';

const ProfessorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('all');
  
  // Mock data for classes
  const mockClasses = [
    { id: 'cse-a', name: 'CSE - A', department: 'Computer Science' },
    { id: 'cse-b', name: 'CSE - B', department: 'Computer Science' },
    { id: 'it-a', name: 'IT - A', department: 'Information Technology' },
  ];
  
  // Mock data for subjects
  const mockSubjects = [
    { id: 1, name: 'Computer Networks', code: 'CS401', classId: 'cse-a', studentsCount: 62 },
    { id: 2, name: 'Database Systems', code: 'CS402', classId: 'cse-a', studentsCount: 65 },
    { id: 3, name: 'Operating Systems', code: 'CS403', classId: 'cse-b', studentsCount: 59 },
    { id: 4, name: 'Software Engineering', code: 'CS404', classId: 'it-a', studentsCount: 68 },
  ];
  
  // Mock data for assessments
  const mockAssessments = [
    { id: 1, subjectId: 1, type: 'FAT-1', uploaded: true, uploadDate: '2023-09-15', pendingQueries: 2 },
    { id: 2, subjectId: 1, type: 'FAT-2', uploaded: true, uploadDate: '2023-10-30', pendingQueries: 0 },
    { id: 3, subjectId: 1, type: 'FAT-3', uploaded: false, uploadDate: null, pendingQueries: 0 },
    { id: 4, subjectId: 2, type: 'FAT-1', uploaded: true, uploadDate: '2023-09-12', pendingQueries: 0 },
    { id: 5, subjectId: 2, type: 'FAT-2', uploaded: true, uploadDate: '2023-10-28', pendingQueries: 3 },
    { id: 6, subjectId: 2, type: 'FAT-3', uploaded: false, uploadDate: null, pendingQueries: 0 },
    { id: 7, subjectId: 3, type: 'FAT-1', uploaded: true, uploadDate: '2023-09-18', pendingQueries: 1 },
    { id: 8, subjectId: 3, type: 'FAT-2', uploaded: true, uploadDate: '2023-11-02', pendingQueries: 0 },
    { id: 9, subjectId: 3, type: 'FAT-3', uploaded: false, uploadDate: null, pendingQueries: 0 },
    { id: 10, subjectId: 4, type: 'FAT-1', uploaded: true, uploadDate: '2023-09-20', pendingQueries: 0 },
    { id: 11, subjectId: 4, type: 'FAT-2', uploaded: true, uploadDate: '2023-11-05', pendingQueries: 2 },
    { id: 12, subjectId: 4, type: 'FAT-3', uploaded: false, uploadDate: null, pendingQueries: 0 },
  ];
  
  // Filter subjects based on selected class
  const filteredSubjects = selectedClass === 'all'
    ? mockSubjects
    : mockSubjects.filter(subject => subject.classId === selectedClass);
  
  // Count statistics
  const totalStudents = filteredSubjects.reduce((sum, subject) => sum + subject.studentsCount, 0);
  const totalSubjects = filteredSubjects.length;
  const pendingUploads = mockAssessments
    .filter(a => 
      !a.uploaded && 
      filteredSubjects.some(s => s.id === a.subjectId)
    ).length;
  const pendingQueries = mockAssessments
    .filter(a => 
      filteredSubjects.some(s => s.id === a.subjectId)
    )
    .reduce((sum, a) => sum + a.pendingQueries, 0);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome, Professor {user?.name.split(' ')[0]}</h2>
            <p className="mt-1 text-blue-100">Manage your classes and assessment results</p>
          </div>
          
          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <div className="rounded-lg bg-white bg-opacity-20 px-4 py-2 backdrop-blur-sm">
              <span className="block text-center text-lg font-bold text-white">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="block text-center text-xs text-blue-100">Current Semester: Fall 2023</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Class Filter */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Assessment Dashboard</h3>
        
        <div className="relative">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 pl-4 pr-10 py-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Classes</option>
            {mockClasses.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
          <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-800 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-300">Students</span>
            <Users size={20} className="text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">{totalStudents}</p>
          <p className="mt-1 text-sm text-gray-400">Total in selected classes</p>
        </div>
        
        <div className="rounded-xl bg-gray-800 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-300">Subjects</span>
            <BookOpen size={20} className="text-purple-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">{totalSubjects}</p>
          <p className="mt-1 text-sm text-gray-400">You're teaching</p>
        </div>
        
        <div className="rounded-xl bg-gray-800 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-300">Pending Uploads</span>
            <Clock size={20} className="text-yellow-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">{pendingUploads}</p>
          <p className="mt-1 text-sm text-gray-400">Need attention</p>
        </div>
        
        <div className="rounded-xl bg-gray-800 p-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-300">Student Queries</span>
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">{pendingQueries}</p>
          <p className="mt-1 text-sm text-gray-400">Awaiting response</p>
        </div>
      </div>
      
      {/* Subjects and Assessments Table */}
      <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <FileText size={20} className="mr-2 text-blue-500" />
            Assessment Status
          </h3>
          
          <div className="flex items-center mt-3 sm:mt-0">
            <span className="mr-2 text-sm text-gray-400">Show:</span>
            <div className="flex rounded-lg bg-gray-700 p-1">
              <button className="rounded px-3 py-1 text-xs font-medium bg-blue-600 text-white">
                All
              </button>
              <button className="rounded px-3 py-1 text-xs font-medium text-gray-300 hover:bg-gray-600">
                Pending
              </button>
              <button className="rounded px-3 py-1 text-xs font-medium text-gray-300 hover:bg-gray-600">
                Completed
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 text-sm font-medium text-gray-400">Subject</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Class</th>
                <th className="pb-3 text-sm font-medium text-gray-400">FAT-1</th>
                <th className="pb-3 text-sm font-medium text-gray-400">FAT-2</th>
                <th className="pb-3 text-sm font-medium text-gray-400">FAT-3</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredSubjects.map(subject => {
                const subjectAssessments = mockAssessments
                  .filter(a => a.subjectId === subject.id)
                  .sort((a, b) => a.type.localeCompare(b.type));
                  
                const classInfo = mockClasses.find(c => c.classId === subject.classId);
                
                return (
                  <tr key={subject.id} className="hover:bg-gray-750">
                    <td className="py-4 pr-4">
                      <div>
                        <p className="font-medium text-white">{subject.name}</p>
                        <p className="text-sm text-gray-400">{subject.code}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      {mockClasses.find(c => c.id === subject.classId)?.name}
                    </td>
                    
                    {subjectAssessments.map(assessment => (
                      <td key={assessment.id} className="py-4">
                        {assessment.uploaded ? (
                          <div>
                            <span className="inline-flex items-center rounded-full bg-green-400/10 px-2.5 py-1 text-xs font-medium text-green-400">
                              Uploaded
                            </span>
                            {assessment.pendingQueries > 0 && (
                              <div className="mt-1 flex items-center">
                                <span className="text-xs text-yellow-400">
                                  {assessment.pendingQueries} {assessment.pendingQueries === 1 ? 'query' : 'queries'}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-red-400/10 px-2.5 py-1 text-xs font-medium text-red-400">
                            Pending
                          </span>
                        )}
                      </td>
                    ))}
                    
                    <td className="py-4">
                      <button className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
                        Upload
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Performance Analysis */}
      <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <BarChart size={20} className="mr-2 text-purple-500" />
          <h3 className="text-xl font-semibold text-white">Performance Analysis</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-gray-750 p-4">
            <h4 className="mb-3 text-lg font-medium text-white">Class Averages</h4>
            
            <div className="space-y-4">
              {mockClasses.map(cls => {
                // Calculate mock average
                const mockAverage = Math.floor(Math.random() * 31) + 60; // 60-90
                return (
                  <div key={cls.id}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{cls.name}</span>
                      <span className="text-sm font-medium text-white">{mockAverage}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-700">
                      <div 
                        className="h-full bg-blue-600" 
                        style={{ width: `${mockAverage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-750 p-4">
            <h4 className="mb-3 text-lg font-medium text-white">Assessment Trends</h4>
            
            <div className="space-y-4">
              {['FAT-1', 'FAT-2'].map(assessment => {
                // Calculate mock completion rate
                const mockCompletion = Math.floor(Math.random() * 20) + 80; // 80-100
                return (
                  <div key={assessment}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{assessment} Completion</span>
                      <span className="text-sm font-medium text-white">{mockCompletion}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-700">
                      <div 
                        className="h-full bg-purple-600" 
                        style={{ width: `${mockCompletion}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">FAT-3 Completion</span>
                  <span className="text-sm font-medium text-white">0%</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <div className="h-full bg-red-600" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Average Improvement (FAT-1 to FAT-2)</span>
                  <span className="inline-flex items-center rounded-full bg-green-400/10 px-2 py-0.5 text-xs font-medium text-green-400">
                    +5.2%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold text-white">Recent Activity</h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-750 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">New Student Query</p>
                <p className="mt-1 text-sm text-gray-400">A new query was raised for Database Systems (CS402) FAT-2</p>
              </div>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-750 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">FAT-2 Results Uploaded</p>
                <p className="mt-1 text-sm text-gray-400">You uploaded Operating Systems (CS403) FAT-2 results</p>
              </div>
              <span className="text-sm text-gray-400">Yesterday</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-750 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">FAT-3 Scheduled</p>
                <p className="mt-1 text-sm text-gray-400">FAT-3 exams have been scheduled for Dec 5-10, 2023</p>
              </div>
              <span className="text-sm text-gray-400">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;