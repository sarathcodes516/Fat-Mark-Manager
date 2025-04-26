import React, { useState } from 'react';
import { PlusCircle, Search, MoreHorizontal, AlertCircle, CheckCircle, XCircle, Send } from 'lucide-react';

const StudentQueries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<number | null>(null);
  
  // Form state for new query
  const [newQueryForm, setNewQueryForm] = useState({
    subject: '',
    assessment: '',
    title: '',
    description: '',
  });
  
  // Mock data for queries
  const mockSubjects = [
    { id: 1, name: 'Computer Networks', code: 'CS401' },
    { id: 2, name: 'Database Systems', code: 'CS402' },
    { id: 3, name: 'Operating Systems', code: 'CS403' },
    { id: 4, name: 'Software Engineering', code: 'CS404' },
  ];
  
  const mockAssessments = ['FAT-1', 'FAT-2', 'FAT-3'];
  
  const mockQueries = [
    {
      id: 1,
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
      subjectId: 1,
      assessment: 'FAT-3',
      title: 'Calculation error in subnet question',
      description: 'I think there was a calculation error in my marks for the subnet question. My final answer matches the expected output.',
      status: 'closed',
      date: '2023-12-08',
      replies: [
        {
          id: 1,
          sender: 'Prof. Johnson',
          message: 'I have reviewed your answer. You are correct, there was an error in the calculation. Your marks have been updated.',
          date: '2023-12-10',
        }
      ],
    },
    {
      id: 3,
      subjectId: 3,
      assessment: 'FAT-1',
      title: 'Missing marks for extra credit question',
      description: 'I had attempted the extra credit question on page 5, but no marks were awarded for it. Could you please check?',
      status: 'resolved',
      date: '2023-09-15',
      replies: [
        {
          id: 1,
          sender: 'Prof. Miller',
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
  ];
  
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
  
  const filteredQueries = mockQueries.filter(query => {
    const subject = mockSubjects.find(s => s.id === query.subjectId);
    const searchString = `${subject?.name} ${subject?.code} ${query.assessment} ${query.title} ${query.description}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  
  const handleCreateQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    // For now, just close the modal
    setIsCreateModalOpen(false);
    // Reset form
    setNewQueryForm({
      subject: '',
      assessment: '',
      title: '',
      description: '',
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewQueryForm(prev => ({ ...prev, [name]: value }));
  };
  
  const selectedQueryData = selectedQuery !== null
    ? mockQueries.find(q => q.id === selectedQuery)
    : null;
  
  const selectedQuerySubject = selectedQueryData
    ? mockSubjects.find(s => s.id === selectedQueryData.subjectId)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">My Queries</h2>
        
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
          
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={16} className="mr-2" />
            New Query
          </button>
        </div>
      </div>
      
      {/* Query List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredQueries.length > 0 ? (
          filteredQueries.map(query => {
            const subject = mockSubjects.find(s => s.id === query.subjectId);
            
            return (
              <div
                key={query.id}
                onClick={() => setSelectedQuery(query.id)}
                className="cursor-pointer rounded-xl bg-gray-800 p-5 shadow-md transition-transform hover:scale-[1.02]"
              >
                <div className="flex justify-between">
                  <div className="mb-2 flex items-center space-x-2">
                    {getStatusBadge(query.status)}
                  </div>
                  <button className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white">
                    <MoreHorizontal size={16} />
                  </button>
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
                
                {query.replies.length > 0 && (
                  <div className="mt-3 rounded-lg bg-gray-750 px-3 py-2 text-sm text-gray-400">
                    <span className="mr-1 font-medium">{query.replies.length}</span>
                    {query.replies.length === 1 ? 'reply' : 'replies'}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full rounded-xl bg-gray-800 p-8 text-center">
            
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
              <AlertCircle size={24} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">No queries found</h3>
            <p className="mt-2 text-gray-400">
              {searchTerm
                ? `No results for "${searchTerm}". Try a different search term.`
                : "You haven't created any queries yet."}
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Create a new query
            </button>
          </div>
        )}
      </div>
      
      {/* Create Query Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-xl bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-white">Create New Query</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateQuerySubmit} className="p-4">
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-1 text-sm font-medium text-gray-400">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={newQueryForm.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Subject</option>
                  {mockSubjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="assessment" className="block mb-1 text-sm font-medium text-gray-400">
                  Assessment
                </label>
                <select
                  id="assessment"
                  name="assessment"
                  required
                  value={newQueryForm.assessment}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Assessment</option>
                  {mockAssessments.map(assessment => (
                    <option key={assessment} value={assessment}>
                      {assessment}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-400">
                  Query Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Brief title for your query"
                  value={newQueryForm.title}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-400">
                  Query Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  placeholder="Provide details about your query..."
                  value={newQueryForm.description}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-2 border-t border-gray-700 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Submit Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Query Detail Drawer */}
      {selectedQuery !== null && selectedQueryData && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden bg-black bg-opacity-50">
          <div className="w-full max-w-md transform bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gray-700 p-4">
                <h3 className="text-lg font-semibold text-white">Query Details</h3>
                <button
                  onClick={() => setSelectedQuery(null)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                  {getStatusBadge(selectedQueryData.status)}
                  <span className="text-sm text-gray-400">
                    {new Date(selectedQueryData.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 className="mb-2 text-xl font-bold text-white">{selectedQueryData.title}</h2>
                
                <div className="mb-4 rounded-lg bg-gray-750 px-3 py-2 text-sm">
                  <span className="block text-gray-400">
                    Subject: <span className="text-white">{selectedQuerySubject?.name} ({selectedQuerySubject?.code})</span>
                  </span>
                  <span className="block text-gray-400">
                    Assessment: <span className="text-white">{selectedQueryData.assessment}</span>
                  </span>
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
                            ? 'bg-blue-900/20 ml-4' 
                            : 'bg-gray-750 mr-4'
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
              </div>
              
              {selectedQueryData.status !== 'closed' && (
                <div className="border-t border-gray-700 p-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentQueries;