import React, { useState, useRef } from 'react';
import { Scan, File, Upload, CheckCircle, AlertCircle, Camera, Trash, List, X, Info } from 'lucide-react';

const ProfessorUpload: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'scan' | 'manual' | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock data for UI
  const mockClasses = [
    { id: 'cse-a', name: 'CSE - A', department: 'Computer Science' },
    { id: 'cse-b', name: 'CSE - B', department: 'Computer Science' },
    { id: 'it-a', name: 'IT - A', department: 'Information Technology' },
  ];
  
  const mockSubjects = [
    { id: 'cs401', name: 'Computer Networks', code: 'CS401' },
    { id: 'cs402', name: 'Database Systems', code: 'CS402' },
    { id: 'cs403', name: 'Operating Systems', code: 'CS403' },
    { id: 'cs404', name: 'Software Engineering', code: 'CS404' },
  ];
  
  const mockAssessments = ['FAT-1', 'FAT-2', 'FAT-3'];
  
  const [manualEntryData, setManualEntryData] = useState<Array<{
    regNo: string;
    name: string;
    marks: string;
  }>>([
    { regNo: 'RA1911003010001', name: 'Alex Johnson', marks: '' },
    { regNo: 'RA1911003010002', name: 'Emma Williams', marks: '' },
    { regNo: 'RA1911003010003', name: 'Michael Brown', marks: '' },
    { regNo: 'RA1911003010004', name: 'Sophia Davis', marks: '' },
    { regNo: 'RA1911003010005', name: 'David Miller', marks: '' },
  ]);
  
  // Scan result data (mock)
  const [scanResultData, setScanResultData] = useState<Array<{
    regNo: string;
    name: string;
    detectedMarks: string;
    confidence: number;
    verified: boolean;
  }>>([]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCameraCapture = () => {
    // This would be replaced with actual camera integration
    alert('Camera functionality would be implemented here');
  };
  
  const handleRemoveImage = () => {
    setUploadedImage(null);
    setProcessingStatus('idle');
    setScanResultData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleProcessImage = () => {
    // Simulate AI processing
    setProcessingStatus('processing');
    
    setTimeout(() => {
      // Mock scan results
      setScanResultData([
        { regNo: 'RA1911003010001', name: 'Alex Johnson', detectedMarks: '42', confidence: 0.98, verified: false },
        { regNo: 'RA1911003010002', name: 'Emma Williams', detectedMarks: '37', confidence: 0.95, verified: false },
        { regNo: 'RA1911003010003', name: 'Michael Brown', detectedMarks: '45', confidence: 0.99, verified: false },
        { regNo: 'RA1911003010004', name: 'Sophia Davis', detectedMarks: '39', confidence: 0.91, verified: false },
        { regNo: 'RA1911003010005', name: 'David Miller', detectedMarks: '48', confidence: 0.97, verified: false },
      ]);
      setProcessingStatus('success');
    }, 2000);
  };
  
  const handleVerifyResult = (index: number) => {
    setScanResultData(prevData => {
      const newData = [...prevData];
      newData[index].verified = !newData[index].verified;
      return newData;
    });
  };
  
  const handleUpdateDetectedMarks = (index: number, value: string) => {
    setScanResultData(prevData => {
      const newData = [...prevData];
      newData[index].detectedMarks = value;
      return newData;
    });
  };
  
  const handleManualEntryChange = (index: number, value: string) => {
    setManualEntryData(prevData => {
      const newData = [...prevData];
      newData[index].marks = value;
      return newData;
    });
  };
  
  const handleSubmitMarks = () => {
    // This would submit marks to backend
    alert('Marks submitted successfully!');
    
    // Reset form after submission
    setSelectedSubject('');
    setSelectedClass('');
    setSelectedAssessment('');
    setUploadMethod(null);
    setUploadedImage(null);
    setProcessingStatus('idle');
    setScanResultData([]);
    setManualEntryData(prevData => 
      prevData.map(item => ({ ...item, marks: '' }))
    );
  };
  
  // Calculate completion status
  const formReady = selectedSubject && selectedClass && selectedAssessment;
  const scanReady = uploadMethod === 'scan' && uploadedImage;
  const manualReady = uploadMethod === 'manual' && manualEntryData.every(item => item.marks !== '');
  const submitReady = formReady && (
    (uploadMethod === 'scan' && scanResultData.length > 0 && scanResultData.every(item => item.verified)) ||
    (uploadMethod === 'manual' && manualEntryData.every(item => item.marks !== ''))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">Upload Assessment Marks</h2>
      </div>
      
      {/* Form Card */}
      <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-400">
              Subject
            </label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Subject</option>
              {mockSubjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-400">
              Class
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              {mockClasses.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="assessment" className="block text-sm font-medium text-gray-400">
              Assessment
            </label>
            <select
              id="assessment"
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Assessment</option>
              {mockAssessments.map(assessment => (
                <option key={assessment} value={assessment}>
                  {assessment}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">Advanced Settings</span>
            <button
              type="button"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="flex items-center text-sm text-blue-400 hover:text-blue-300"
            >
              {showAdvancedSettings ? 'Hide' : 'Show'} Settings
            </button>
          </div>
          
          {showAdvancedSettings && (
            <div className="rounded-lg bg-gray-750 p-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="maxMarks" className="block text-sm font-medium text-gray-400">
                    Maximum Marks
                  </label>
                  <input
                    type="number"
                    id="maxMarks"
                    defaultValue={50}
                    className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-1.5 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="passMarks" className="block text-sm font-medium text-gray-400">
                    Pass Marks
                  </label>
                  <input
                    type="number"
                    id="passMarks"
                    defaultValue={25}
                    className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-1.5 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Upload Options */}
      {formReady && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Scan Method */}
          <div 
            className={`rounded-xl bg-gray-800 p-6 shadow-lg transition-all ${
              uploadMethod === 'scan' ? 'ring-2 ring-blue-500' : 'hover:bg-gray-750'
            }`}
            onClick={() => setUploadMethod('scan')}
          >
            <div className="flex items-center space-x-3">
              <div className={`rounded-full p-2 ${
                uploadMethod === 'scan' ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                <Scan size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Scan Mark Sheet
              </h3>
            </div>
            
            <p className="mt-2 text-gray-400">
              Upload an image of your mark sheet and let AI detect student marks automatically.
            </p>
            
            {uploadMethod === 'scan' && (
              <div className="mt-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    className="hidden"
                    id="image-upload"
                  />
                  
                  <label
                    htmlFor="image-upload"
                    className="flex cursor-pointer items-center rounded-lg border border-dashed border-gray-600 bg-gray-750 px-4 py-3 hover:border-gray-500 hover:bg-gray-700"
                  >
                    <File size={20} className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-300">Upload Image</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={handleCameraCapture}
                    className="flex items-center rounded-lg border border-gray-600 bg-gray-750 px-4 py-3 hover:bg-gray-700"
                  >
                    <Camera size={20} className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-300">Capture</span>
                  </button>
                </div>
                
                {uploadedImage && (
                  <div className="mt-4">
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded mark sheet" 
                        className="w-full rounded-lg border border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 rounded-full bg-gray-900 bg-opacity-75 p-1 text-gray-300 hover:text-white"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      {processingStatus === 'idle' && (
                        <button
                          type="button"
                          onClick={handleProcessImage}
                          className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                        >
                          <Scan size={18} className="mr-2" />
                          Process Image
                        </button>
                      )}
                      
                      {processingStatus === 'processing' && (
                        <div className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Processing...
                        </div>
                      )}
                    </div>
                    
                    {processingStatus === 'success' && scanResultData.length > 0 && (
                      <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-lg font-medium text-white">Detected Results</h4>
                          <span className="text-sm text-gray-400">Verify each result</span>
                        </div>
                        
                        <div className="rounded-lg border border-gray-700">
                          <div className="grid grid-cols-12 border-b border-gray-700 bg-gray-750 py-2 px-4 text-sm font-medium text-gray-400">
                            <div className="col-span-4">Registration No.</div>
                            <div className="col-span-3">Name</div>
                            <div className="col-span-2">Marks</div>
                            <div className="col-span-2">Confidence</div>
                            <div className="col-span-1 text-center">Verify</div>
                          </div>
                          
                          <div className="max-h-64 overflow-y-auto">
                            {scanResultData.map((result, index) => (
                              <div 
                                key={result.regNo}
                                className="grid grid-cols-12 items-center border-b border-gray-700 py-3 px-4 last:border-0"
                              >
                                <div className="col-span-4 text-sm text-gray-300">{result.regNo}</div>
                                <div className="col-span-3 text-sm text-gray-300">{result.name}</div>
                                <div className="col-span-2">
                                  <input
                                    type="text"
                                    value={result.detectedMarks}
                                    onChange={(e) => handleUpdateDetectedMarks(index, e.target.value)}
                                    className="w-full rounded-md border border-gray-700 bg-gray-700 px-2 py-1 text-sm text-white focus:border-blue-500 focus:outline-none"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                    result.confidence > 0.95 
                                      ? 'bg-green-400/10 text-green-400' 
                                      : result.confidence > 0.8 
                                        ? 'bg-yellow-400/10 text-yellow-400'
                                        : 'bg-red-400/10 text-red-400'
                                  }`}>
                                    {Math.round(result.confidence * 100)}%
                                  </div>
                                </div>
                                <div className="col-span-1 text-center">
                                  <button
                                    type="button"
                                    onClick={() => handleVerifyResult(index)}
                                    className={`rounded-full p-1 ${
                                      result.verified 
                                        ? 'text-green-400 hover:bg-green-400/10' 
                                        : 'text-gray-500 hover:bg-gray-700'
                                    }`}
                                  >
                                    <CheckCircle size={20} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Manual Entry Method */}
          <div 
            className={`rounded-xl bg-gray-800 p-6 shadow-lg transition-all ${
              uploadMethod === 'manual' ? 'ring-2 ring-blue-500' : 'hover:bg-gray-750'
            }`}
            onClick={() => setUploadMethod('manual')}
          >
            <div className="flex items-center space-x-3">
              <div className={`rounded-full p-2 ${
                uploadMethod === 'manual' ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                <List size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Manual Entry
              </h3>
            </div>
            
            <p className="mt-2 text-gray-400">
              Manually enter the marks for each student using the provided form.
            </p>
            
            {uploadMethod === 'manual' && (
              <div className="mt-4">
                <div className="rounded-lg border border-gray-700">
                  <div className="grid grid-cols-12 border-b border-gray-700 bg-gray-750 py-2 px-4 text-sm font-medium text-gray-400">
                    <div className="col-span-5">Registration No.</div>
                    <div className="col-span-4">Name</div>
                    <div className="col-span-3">Marks</div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {manualEntryData.map((student, index) => (
                      <div 
                        key={student.regNo}
                        className="grid grid-cols-12 items-center border-b border-gray-700 py-3 px-4 last:border-0"
                      >
                        <div className="col-span-5 text-sm text-gray-300">{student.regNo}</div>
                        <div className="col-span-4 text-sm text-gray-300">{student.name}</div>
                        <div className="col-span-3">
                          <input
                            type="text"
                            value={student.marks}
                            onChange={(e) => handleManualEntryChange(index, e.target.value)}
                            className="w-full rounded-md border border-gray-700 bg-gray-700 px-2 py-1 text-sm text-white focus:border-blue-500 focus:outline-none"
                            placeholder="Enter marks"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center rounded-lg border border-gray-600 bg-gray-750 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    <Info size={16} className="mr-1" />
                    Import CSV
                  </button>
                  
                  <span className="text-sm text-gray-400">
                    Showing {manualEntryData.length} students
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Submit Section */}
      {formReady && uploadMethod && (submitReady || scanReady || manualReady) && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmitMarks}
            disabled={!submitReady}
            className={`flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white ${
              submitReady 
                ? 'bg-blue-600 hover:bg-blue-700 transition-colors' 
                : 'cursor-not-allowed bg-gray-700'
            }`}
          >
            <Upload size={18} className="mr-2" />
            Submit Marks
          </button>
        </div>
      )}
      
      {/* Getting Started Guide */}
      {(!formReady || !uploadMethod) && (
        <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-blue-600 p-2">
              <Info size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              Getting Started
            </h3>
          </div>
          
          <div className="mt-4">
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  1
                </div>
                <div>
                  <p className="font-medium text-white">Select subject, class and assessment</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Choose the subject and class for which you want to upload marks, along with the assessment type.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  2
                </div>
                <div>
                  <p className="font-medium text-white">Choose upload method</p>
                  <p className="mt-1 text-sm text-gray-400">
                    You can either scan a mark sheet using AI or manually enter the marks for each student.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  3
                </div>
                <div>
                  <p className="font-medium text-white">Verify and submit</p>
                  <p className="mt-1 text-sm text-gray-400">
                    If using scan method, verify each detected mark. For manual entry, fill in all marks before submitting.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 rounded-lg bg-blue-900/20 p-4">
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <AlertCircle size={20} className="text-blue-400" />
                </div>
                <p className="text-sm text-blue-300">
                  <span className="font-semibold">Note:</span> For best results when scanning mark sheets, ensure good lighting and a clear, straight image.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorUpload;