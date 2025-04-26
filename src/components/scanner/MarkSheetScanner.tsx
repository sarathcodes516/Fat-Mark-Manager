import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw, CheckCircle, AlertCircle, UserPlus, Info, Edit2, X } from 'lucide-react';
import { scanMarkSheet, validateMarkSheet, generateMarkSummary } from '../../utils/markScanner';
import { fetchStudentsByClass } from '../../services/api';
import type { MarkSheet } from '../../types/marks';
import type { Student } from '../../types/student';
import StudentSelector from './StudentSelector';

interface MarkSheetScannerProps {
  classId: string;
  subject: string;
  assessment: string;
  onScanComplete: (markSheet: MarkSheet) => void;
  onError: (error: string) => void;
}

const MarkSheetScanner: React.FC<MarkSheetScannerProps> = ({
  classId,
  subject,
  assessment,
  onScanComplete,
  onError
}) => {
  const [scanning, setScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [scannedSheet, setScannedSheet] = useState<MarkSheet | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<{
    part: 'A' | 'B';
    index: number;
    subQuestion?: 'a' | 'b';
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    fetchStudentsByClass(classId)
      .then(setStudents)
      .catch(error => onError(error.message))
      .finally(() => setLoading(false));
  }, [classId]);
  
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedStudent) return;
    
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      
      // Start scanning
      setScanning(true);
      const markSheet = await scanMarkSheet(URL.createObjectURL(file), selectedStudent);
      
      if (!markSheet) {
        throw new Error('Failed to scan mark sheet');
      }
      
      if (!validateMarkSheet(markSheet)) {
        throw new Error('Invalid mark sheet structure detected');
      }
      
      const completeMarkSheet = {
        ...markSheet,
        subject,
        assessment,
        maxTotal: 50
      };
      
      setScannedSheet(completeMarkSheet);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to process mark sheet');
    } finally {
      setScanning(false);
    }
  };
  
  const handleRetry = () => {
    setPreview(null);
    setScannedSheet(null);
    setSelectedStudent(null);
    setEditingQuestion(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleMarkUpdate = (part: 'A' | 'B', index: number, value: string, subQuestion?: 'a' | 'b') => {
    if (!scannedSheet) return;

    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    const maxMark = part === 'A' ? 2 : 10;
    const validMark = Math.min(Math.max(0, numValue), maxMark);

    setScannedSheet(prev => {
      if (!prev) return prev;

      const newSheet = { ...prev };
      
      if (part === 'A') {
        newSheet.partA.questions[index].marks = validMark;
        newSheet.partA.total = newSheet.partA.questions.reduce((sum, q) => sum + q.marks, 0);
      } else {
        const questionIndex = index * 2 + (subQuestion === 'b' ? 1 : 0);
        newSheet.partB.questions[questionIndex].marks = validMark;
        newSheet.partB.total = newSheet.partB.questions.reduce((sum, q) => sum + q.marks, 0);
      }

      newSheet.total = newSheet.partA.total + newSheet.partB.total;
      return newSheet;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Student Selection */}
      <div className="rounded-xl bg-gray-800 p-6">
        <div className="mb-4 flex items-center">
          <UserPlus className="mr-2 h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Select Student</h3>
        </div>
        
        <StudentSelector
          students={students}
          selectedStudent={selectedStudent}
          onSelectStudent={setSelectedStudent}
        />
      </div>
      
      {/* Mark Sheet Scanner */}
      {selectedStudent && (
        <div className="rounded-xl bg-gray-800 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">Upload Mark Sheet</h3>
            <p className="text-sm text-gray-400">
              Scanning mark sheet for {selectedStudent.name} ({selectedStudent.registrationNumber})
            </p>
          </div>
          
          <div className="rounded-lg border-2 border-dashed border-gray-700 p-6">
            {preview ? (
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Mark sheet preview" 
                  className="mx-auto max-h-96 rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  {scanning ? (
                    <div className="flex items-center space-x-2 text-white">
                      <RefreshCw className="h-6 w-6 animate-spin" />
                      <span>Scanning...</span>
                    </div>
                  ) : scannedSheet ? (
                    <div className="text-center text-white">
                      <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
                      <p className="mt-2">Scan Complete</p>
                    </div>
                  ) : (
                    <div className="text-center text-white">
                      <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
                      <p className="mt-2">Scan Failed</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                <p className="mb-2 text-sm text-gray-400">
                  Upload a clear image of the mark sheet
                </p>
                <div className="space-x-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </button>
                  <button
                    onClick={() => {/* Implement camera capture */}}
                    className="inline-flex items-center rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Use Camera
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {scannedSheet && (
            <div className="mt-6 space-y-6">
              {/* Part A Results */}
              <div className="rounded-lg bg-gray-750 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-medium text-white">Part A Results</h4>
                  <span className="text-sm text-gray-400">Total: {scannedSheet.partA.total}/20</span>
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                  {scannedSheet.partA.questions.map((question, index) => (
                    <div 
                      key={question.number}
                      className="rounded-lg bg-gray-800 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Q{question.number}</span>
                        {editingQuestion?.part === 'A' && editingQuestion.index === index ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              min="0"
                              max="2"
                              value={question.marks}
                              onChange={(e) => handleMarkUpdate('A', index, e.target.value)}
                              className="w-12 rounded bg-gray-700 px-1 py-0.5 text-center text-sm text-white"
                              autoFocus
                            />
                            <button
                              onClick={() => setEditingQuestion(null)}
                              className="rounded p-1 hover:bg-gray-700"
                            >
                              <X size={14} className="text-gray-400" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium text-white">{question.marks}/{question.maxMarks}</span>
                            <button
                              onClick={() => setEditingQuestion({ part: 'A', index })}
                              className="rounded p-1 hover:bg-gray-700"
                            >
                              <Edit2 size={14} className="text-gray-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Part B Results */}
              <div className="rounded-lg bg-gray-750 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-medium text-white">Part B Results</h4>
                  <span className="text-sm text-gray-400">Total: {scannedSheet.partB.total}/30</span>
                </div>
                
                <div className="grid gap-4">
                  {[11, 12, 13].map((questionNumber, index) => {
                    const questionA = scannedSheet.partB.questions[index * 2];
                    const questionB = scannedSheet.partB.questions[index * 2 + 1];
                    
                    return (
                      <div key={questionNumber} className="rounded-lg bg-gray-800 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-white">Question {questionNumber}</span>
                          <span className="text-sm text-gray-400">
                            {questionA.marks + questionB.marks}/{questionA.maxMarks + questionB.maxMarks}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {['a', 'b'].map((part, subIndex) => {
                            const question = subIndex === 0 ? questionA : questionB;
                            const isEditing = editingQuestion?.part === 'B' && 
                                           editingQuestion.index === index && 
                                           editingQuestion.subQuestion === part;
                            
                            return (
                              <div key={part} className="flex items-center justify-between rounded-lg bg-gray-700 p-2">
                                <span className="text-sm text-gray-400">Part {part}</span>
                                {isEditing ? (
                                  <div className="flex items-center space-x-1">
                                    <input
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={question.marks}
                                      onChange={(e) => handleMarkUpdate('B', index, e.target.value, part as 'a' | 'b')}
                                      className="w-12 rounded bg-gray-600 px-1 py-0.5 text-center text-sm text-white"
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => setEditingQuestion(null)}
                                      className="rounded p-1 hover:bg-gray-600"
                                    >
                                      <X size={14} className="text-gray-400" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-1">
                                    <span className="text-sm font-medium text-white">
                                      {question.marks}/{question.maxMarks}
                                    </span>
                                    <button
                                      onClick={() => setEditingQuestion({ 
                                        part: 'B', 
                                        index, 
                                        subQuestion: part as 'a' | 'b' 
                                      })}
                                      className="rounded p-1 hover:bg-gray-600"
                                    >
                                      <Edit2 size={14} className="text-gray-400" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Summary */}
              <div className="rounded-lg bg-gray-750 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-medium text-white">Summary</h4>
                  <span className="text-xl font-semibold text-white">
                    Total: {scannedSheet.total}/50
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-gray-800 p-3">
                    <span className="text-gray-400">Part A (Questions 1-10)</span>
                    <span className="font-medium text-white">{scannedSheet.partA.total}/20</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-800 p-3">
                    <span className="text-gray-400">Part B (Questions 11-13)</span>
                    <span className="font-medium text-white">{scannedSheet.partB.total}/30</span>
                  </div>
                </div>
                
                <div className="mt-4 rounded-lg bg-blue-900/20 p-3">
                  <div className="flex items-start">
                    <Info size={20} className="mr-2 mt-0.5 text-blue-400" />
                    <div>
                      <p className="text-sm text-blue-300">
                        Please verify all marks before confirming. You can edit individual marks by clicking the edit icon next to each question.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleRetry}
                  className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
                >
                  Scan Another
                </button>
                <button
                  onClick={() => onScanComplete(scannedSheet)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Confirm & Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarkSheetScanner;