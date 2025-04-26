import React from 'react';
import { Student } from '../../types/student';
import { Search } from 'lucide-react';

interface StudentSelectorProps {
  students: Student[];
  selectedStudent: Student | null;
  onSelectStudent: (student: Student) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      
      <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-700">
        {filteredStudents.map(student => (
          <button
            key={student.id}
            onClick={() => onSelectStudent(student)}
            className={`w-full px-4 py-3 text-left transition-colors ${
              selectedStudent?.id === student.id
                ? 'bg-blue-600'
                : 'hover:bg-gray-750'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${
                  selectedStudent?.id === student.id ? 'text-white' : 'text-gray-200'
                }`}>
                  {student.name}
                </p>
                <p className={`text-sm ${
                  selectedStudent?.id === student.id ? 'text-blue-200' : 'text-gray-400'
                }`}>
                  {student.registrationNumber}
                </p>
              </div>
              <div className={`text-right text-sm ${
                selectedStudent?.id === student.id ? 'text-blue-200' : 'text-gray-400'
              }`}>
                <p>{student.department}</p>
                <p>Semester {student.semester} - {student.section}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentSelector;