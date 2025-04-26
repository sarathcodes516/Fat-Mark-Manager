import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertCircle, Filter, Send, ArrowLeft, ArrowRight } from 'lucide-react';

const ProfessorQueries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  
  // Mock data
  const mockSubjects = [
    { id: 1, name: 'Computer Networks', code: 'CS401' },
    { id: 2, name: 'Database Systems', code: 'CS402' },
    { id: 3, name: 'Operating Systems', code: 'CS403' },
    { id: 4, name: 'Software Engineering', code: 'CS404' },
  ];
  
  const mockQueries = [
    {
      id: 1,
      studentName: 'Alex Johnson',
      studentRegNo: 'RA1911003010001',
      subjectId: 2,
      assessment: 'FAT-2',
      title: 'Marks for SQL query optimization question',
      description: 'I believe my answer for the SQL query optimization question (Q10) was correct. Could you please review my paper again?',
      status: 'open',
      date: '2023-11-02',
      replies: [],
    },
    {
      id: 2,
      studentName: 'Emma Williams',
      studentRegNo: 'RA1911003010002',
      subjectId: 1,
      assessment: 'FAT-3',
      title: 'Calculation error in subnet question',
      description: 'I think there was a calculation error in my marks for the subnet question. My final answer matches the expected output.',
      status: 'closed',
      date: '2023-12-08',
      replies: [
        {
          id: 1,
          sender: 'Professor',
          message: 'I have reviewed your answer. You are correct, there was an error in the calculation. Your marks have been updated.',
          date: '2023-12-10',
        }
      ],
    },
    {
      id: 3,
      studentName: 'Michael Brown',
      studentRegNo: 'RA1911003010003',
      subjectId: 3,
      assessment: 'FAT-1',
      title: 'Missing marks for extra credit question',
      description: 'I had attempted the extra credit question on page 5, but no marks were awarded for it. Could you please check?',
      status: 'resolved',
      date: '2023-09-15',
      replies: [
        {
          id: 1,
          sender: 'Professor',
          message: 'Thanks for bringing this to my attention. I\'ve checked your answer and awarded the appropriate marks.',
          date: '2023-09-18',
        },
        {
          id: 2,
          sender: 'Student',
          message: 'Thank you for reviewing and updating my marks.',
          date: '2023-09-18',
        }
      ],
    },
    {
      id: 4,
      studentName: 'Sophia Davis',
      studentRegNo: 'RA1911003010004',
      subjectId: 2,
      assessment: 'FAT-1',
      title: 'Clarification on normalization question',
      description: 'In the normalization question, I had applied BCNF but marks were deducted. Could you please explain where I went wrong?',
      status: 'open',
      date: '2023-11-10',
      replies: [],
    },
    {
      id: 5,
      studentName: 'David Miller',
      studentRegNo: 'RA1911003010005',
      subjectId: 4,
      assessment: 'FAT-2',
      title: 'Request for revaluation of design patterns question',
      description: 'I believe my implementation of the observer pattern was correct, but received partial credit. Could you please recheck?',
      status: 'open',
      date: '2023-11-15',
      replies: [],
    },
  ];
  
  // Filter queries based on search term and filter status
  const filteredQueries = mockQueries.filter(query => {
    const subject = mockSubjects.find(s => s.id === query.subjectId);
    const searchString = `${query.studentName} ${query.studentRegNo} ${subject?.name} ${subject?.code} ${query.assessment} ${query.title} ${query.description}`.toLowerCase();
    
    const matchesSearch = searchTerm === '' || searchString.includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === null || query.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });
  
  // Get selected query details
  const selectedQueryData = selectedQuery !== null
    ? mockQueries.find(q => q.id === selectedQuery)
    : null;
  
  const selectedQuerySubject = selectedQueryData
    ? mockSubjects.find(s => s.id === selectedQueryData.subjectId)
    : null;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-400/10 px-2.5 py-1 text-xs font-medium text-yellow-400">
            <AlertCircle size={12} className="mr-1" />
            Open
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center rounded-full bg-green-400/10 px-2.5 py-1 text-xs font-medium text-green-400">
            <CheckCircle size={12} className="mr-1" />
            Resolved
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center rounded-full bg-blue-400/10 px-2.5 py-1 text-xs font-medium text-blue-400">
            <XCircle size={12} className="mr-1" />
            Closed
          </span>
        );
      default:
        return null;
    }
  };
  
  const handleSendReply = () => {
    if (replyText.trim() && selectedQueryData) {
      // In a real app, this would update the backend
      // For demo, we'll just close the detail view
      setSelectedQuery(null);
      setReplyText('');
      alert('Reply sent successfully!');
    }
  };
  
  const handleCloseQuery = () => {
    if (selectedQueryData) {
      // In a real app, this would update the backend
      setSelectedQuery(null);
      alert('Query marked as closed!');
    }
  };
  
  const handleStatusFilterChange = (status: string | null) => {
    setFilterStatus(status);
  };
  
  // Calculate counts for each status
  const openCount = mockQueries.filter(q => q.status === 'open').length;
  const resolvedCount = mockQueries.filter(q => q.status === 'resolved').length;
  const closedCount = mockQueries.filter(q => q.status === 'closed').length;
  
  const goToNextQuery = () => {
    if (selectedQuery !== null) {
      const currentIndex = filteredQueries.findIndex(q => q.id === selectedQuery);
      if (currentIndex < filteredQueries.length - 1) {
        setSelectedQuery(filteredQueries[currentIndex + 1].id);
      }
    }
  };
  
  const goToPreviousQuery = () => {
    if (selectedQuery !== null) {
      const currentIndex = filteredQueries.findIndex(q => q.id === selectedQuery);
      if (currentIndex > 0) {
        setSelectedQuery(filteredQueries[currentIndex - 1].id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">Student Queries</h2>
        
        <div className="mt-4 flex space-x-2 sm:mt-0">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              value={filterStatus || ''}
              onChange={(e) => handleStatusFilterChange(e.target.value || null)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pr-10 text-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Status Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex space-x-6">
          <button
            onClick={() => handleStatusFilterChange(null)}
            className={`border-b-2 pb-2 text-sm font-medium ${
              filterStatus === null 
                ? 'border-blue-500 text-blue-500' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            All ({mockQueries.length})
          </button>
          <button
            onClick={() => handleStatusFilterChange('open')}
            className={`border-b-2 pb-2 text-sm font-medium ${
              filterStatus === 'open' 
                ? 'border-yellow-500 text-yellow-500' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Open ({openCount})
          </button>
          <button
            onClick={() => handleStatusFilterChange('resolved')}
            className={`border-b-2 pb-2 text-sm font-medium ${
              filterStatus === 'resolved' 
                ? 'border-green-500 text-green-500' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Resolved ({resolvedCount})
          </button>
          <button
            onClick={() => handleStatusFilterChange('closed')}
            className={`border-b-2 pb-2 text-sm font-medium ${
              filterStatus === 'closed' 
                ? 'border-blue-500 text-blue-500' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Closed ({closedCount})
          </button>
        </div>
      </div>
      
      {/* Split View */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Query List */}
        <div className={`space-y-4 ${selectedQuery !== null ? 'hidden lg:block' : ''}`}>
          {filteredQueries.length > 0 ? (
            filteredQueries.map(query => {
              const subject = mockSubjects.find(s => s.id === query.subjectId);
              
              return (
                <div
                  key={query.id}
                  onClick={() => setSelectedQuery(query.id)}
                  className={`cursor-pointer rounded-xl bg-gray-800 p-5 shadow-md transition-all hover:bg-gray-750 ${
                    selectedQuery === query.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="mb-2 flex items-center space-x-2">
                      {getStatusBadge(query.status)}
                    </div>
                  </div>
                  
                  <h3 className="mb-1 text-lg font-semibold text-white">{query.title}</h3>
                  <p className="mb-3 text-sm text-gray-400 line-clamp-2">{query.description}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-700 pt-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-300">{subject?.name}</span>
                      <span className="ml-2 text-gray-400">({query.assessment})</span>
                    </div>
                    <span className="text-gray-400">{new Date(query.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="mt-3 flex items-center">
                    <span className="text-sm text-gray-400">From: {query.studentName}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl bg-gray-800 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
                <AlertCircle size={24} className="text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">No queries found</h3>
              <p className="mt-2 text-gray-400">
                {searchTerm || filterStatus
                  ? `No results match your current filters.`
                  : "You don't have any student queries yet."}
              </p>
              {(searchTerm || filterStatus) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus(null);
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Query Detail */}
        {selectedQuery !== null && selectedQueryData && (
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-gray-800 shadow-lg">
              <div className="flex items-center justify-between border-b border-gray-700 p-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setSelectedQuery(null)}
                    className="mr-2 rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white lg:hidden"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h3 className="text-lg font-semibold text-white">Query Details</h3>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={goToPreviousQuery}
                    disabled={filteredQueries.findIndex(q => q.id === selectedQuery) === 0}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={goToNextQuery}
                    disabled={filteredQueries.findIndex(q => q.id === selectedQuery) === filteredQueries.length - 1}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  {getStatusBadge(selectedQueryData.status)}
                  <span className="text-sm text-gray-400">
                    {new Date(selectedQueryData.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 className="mb-2 text-xl font-bold text-white">{selectedQueryData.title}</h2>
                
                <div className="mb-4 rounded-lg bg-gray-750 px-3 py-2 text-sm">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <span className="block text-gray-400">
                      Student: <span className="text-white">{selectedQueryData.studentName} ({selectedQueryData.studentRegNo})</span>
                    </span>
                    <span className="block text-gray-400">
                      Subject: <span className="text-white">{selectedQuerySubject?.name} ({selectedQuerySubject?.code})</span>
                    </span>
                    <span className="block text-gray-400">
                      Assessment: <span className="text-white">{selectedQueryData.assessment}</span>
                    </span>
                  </div>
                </div>
                
                <div className="mb-6 rounded-lg bg-gray-750 p-4">
                  <p className="whitespace-pre-line text-gray-200">{selectedQueryData.description}</p>
                </div>
                
                <div className="mb-4 border-b border-gray-700 pb-2">
                  <h4 className="text-lg font-medium text-white">Conversation</h4>
                </div>
                
                {selectedQueryData.replies.length > 0 ? (
                  <div className="space-y-4">
                    {selectedQueryData.replies.map(reply => (
                      <div 
                        key={reply.id}
                        className={`rounded-lg p-3 ${
                          reply.sender === 'Student' 
                            ? 'bg-gray-750 mr-4' 
                            : 'bg-blue-900/20 ml-4'
                        }`}
                      >
                        <div className="mb-1 flex justify-between">
                          <span className="font-medium text-gray-300">{reply.sender}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(reply.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-200">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg bg-gray-750 p-4 text-center">
                    <p className="text-gray-400">No replies yet</p>
                  </div>
                )}
                
                {selectedQueryData.status !== 'closed' && (
                  <div className="mt-6 space-y-4">
                    <textarea
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={4}
                    />
                    
                    <div className="flex flex-wrap justify-end gap-3">
                      <button
                        onClick={handleCloseQuery}
                        className="flex items-center rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        <XCircle size={16} className="mr-2" />
                        Close Query
                      </button>
                      <button
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white ${
                          replyText.trim()
                            ? 'bg-blue-600 hover:bg-blue-700 transition-colors'
                            : 'cursor-not-allowed bg-gray-700'
                        }`}
                      >
                        <Send size={16} className="mr-2" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorQueries;