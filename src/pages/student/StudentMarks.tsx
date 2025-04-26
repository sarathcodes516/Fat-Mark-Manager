import React, { useState } from 'react';
import { Filter, Download } from 'lucide-react';

const StudentMarks: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  // Mock data for subjects and marks
  const subjects = [
    { id: 1, name: 'Computer Networks', code: 'CS401' },
    { id: 2, name: 'Database Systems', code: 'CS402' },
    { id: 3, name: 'Operating Systems', code: 'CS403' },
    { id: 4, name: 'Software Engineering', code: 'CS404' },
  ];
  
  const marks = [
    { 
      subjectId: 1, 
      assessments: [
        { name: 'FAT-1', maxMarks: 50, obtained: 42, percentage: 84, date: '2023-09-10' },
        { name: 'FAT-2', maxMarks: 50, obtained: 39, percentage: 78, date: '2023-10-25' },
        { name: 'FAT-3', maxMarks: 50, obtained: 45, percentage: 90, date: '2023-12-05' },
      ] 
    },
    { 
      subjectId: 2, 
      assessments: [
        { name: 'FAT-1', maxMarks: 50, obtained: 46, percentage: 92, date: '2023-09-08' },
        { name: 'FAT-2', maxMarks: 50, obtained: 44, percentage: 88, date: '2023-10-22' },
        { name: 'FAT-3', maxMarks: 50, obtained: 47, percentage: 94, date: '2023-12-03' },
      ] 
    },
    { 
      subjectId: 3, 
      assessments: [
        { name: 'FAT-1', maxMarks: 50, obtained: 34, percentage: 68, date: '2023-09-12' },
        { name: 'FAT-2', maxMarks: 50, obtained: 37, percentage: 74, date: '2023-10-27' },
        { name: 'FAT-3', maxMarks: 50, obtained: 41, percentage: 82, date: '2023-12-07' },
      ] 
    },
    { 
      subjectId: 4, 
      assessments: [
        { name: 'FAT-1', maxMarks: 50, obtained: 38, percentage: 76, date: '2023-09-15' },
        { name: 'FAT-2', maxMarks: 50, obtained: 40, percentage: 80, date: '2023-10-30' },
        { name: 'FAT-3', maxMarks: 50, obtained: 39, percentage: 78, date: '2023-12-10' },
      ] 
    },
  ];

  const filteredMarks = selectedSubject 
    ? marks.filter(mark => mark.subjectId === parseInt(selectedSubject))
    : marks;
  
  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">Assessment Marks</h2>
        
        <div className="mt-4 flex space-x-2 sm:mt-0">
          <div className="relative">
            <select
              value={selectedSubject || ''}
              onChange={(e) => setSelectedSubject(e.target.value || null)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pr-10 text-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <button className="flex items-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Assessment Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMarks.flatMap(mark => {
          const subject = subjects.find(s => s.id === mark.subjectId);
          
          return mark.assessments.map((assessment, index) => (
            <div key={`${mark.subjectId}-${index}`} className="rounded-xl bg-gray-800 p-5 shadow-md overflow-hidden">
              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white truncate">{assessment.name}</h3>
                    <p className="text-sm text-gray-400">{subject?.name} ({subject?.code})</p>
                  </div>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getStatusColor(assessment.percentage)}`}>
                    <span className="text-sm font-medium text-white">{assessment.percentage}%</span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-gray-750 p-2">
                    <p className="text-xl font-semibold text-white">{assessment.obtained}</p>
                    <p className="text-xs text-gray-400">Marks</p>
                  </div>
                  <div className="rounded-lg bg-gray-750 p-2">
                    <p className="text-xl font-semibold text-white">{assessment.maxMarks}</p>
                    <p className="text-xs text-gray-400">Maximum</p>
                  </div>
                  <div className="rounded-lg bg-gray-750 p-2">
                    <p className="text-xl font-semibold text-white">
                      {assessment.percentage >= 90 ? 'A+' :
                       assessment.percentage >= 80 ? 'A' :
                       assessment.percentage >= 70 ? 'B' :
                       assessment.percentage >= 60 ? 'C' :
                       assessment.percentage >= 50 ? 'D' : 'F'}
                    </p>
                    <p className="text-xs text-gray-400">Grade</p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-gray-400">Date: {new Date(assessment.date).toLocaleDateString()}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Performance</span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      assessment.percentage >= 90 ? 'bg-green-400/10 text-green-400' :
                      assessment.percentage >= 75 ? 'bg-blue-400/10 text-blue-400' :
                      assessment.percentage >= 60 ? 'bg-yellow-400/10 text-yellow-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>
                      {assessment.percentage >= 90 ? 'Excellent' :
                       assessment.percentage >= 75 ? 'Good' :
                       assessment.percentage >= 60 ? 'Average' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ));
        })}
      </div>
      
      {/* Summary Table */}
      <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-white">Performance Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 text-sm font-medium text-gray-400">Subject</th>
                <th className="pb-3 text-sm font-medium text-gray-400">FAT-1</th>
                <th className="pb-3 text-sm font-medium text-gray-400">FAT-2</th>
                <th className="pb-3 text-sm font-medium text-gray-400">FAT-3</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Average</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredMarks.map(mark => {
                const subject = subjects.find(s => s.id === mark.subjectId);
                const average = Math.round(
                  mark.assessments.reduce((sum, a) => sum + a.percentage, 0) / mark.assessments.length
                );
                
                return (
                  <tr key={mark.subjectId} className="hover:bg-gray-750">
                    <td className="py-3 pr-4">
                      <div>
                        <p className="font-medium text-white">{subject?.name}</p>
                        <p className="text-sm text-gray-400">{subject?.code}</p>
                      </div>
                    </td>
                    {mark.assessments.map((assessment, idx) => (
                      <td key={idx} className="py-3">
                        <div className="flex items-center">
                          <div className={`mr-2 h-2.5 w-2.5 rounded-full ${getStatusColor(assessment.percentage)}`}></div>
                          <span>{assessment.percentage}%</span>
                        </div>
                      </td>
                    ))}
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className={`mr-2 h-2.5 w-2.5 rounded-full ${getStatusColor(average)}`}></div>
                        <span className="font-medium">{average}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentMarks;