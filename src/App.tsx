import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentMarks from './pages/student/StudentMarks';
import StudentSettings from './pages/student/StudentSettings';
import StudentQueries from './pages/student/StudentQueries';
import ProfessorDashboard from './pages/professor/ProfessorDashboard';
import ProfessorUpload from './pages/professor/ProfessorUpload';
import ProfessorSettings from './pages/professor/ProfessorSettings';
import ProfessorQueries from './pages/professor/ProfessorQueries';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute role="student" />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="marks" element={<StudentMarks />} />
            <Route path="queries" element={<StudentQueries />} />
            <Route path="settings" element={<StudentSettings />} />
            <Route index element={<Navigate to="/student/dashboard" replace />} />
          </Route>
          
          {/* Professor Routes */}
          <Route path="/professor" element={<ProtectedRoute role="professor" />}>
            <Route path="dashboard" element={<ProfessorDashboard />} />
            <Route path="upload" element={<ProfessorUpload />} />
            <Route path="queries" element={<ProfessorQueries />} />
            <Route path="settings" element={<ProfessorSettings />} />
            <Route index element={<Navigate to="/professor/dashboard" replace />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;