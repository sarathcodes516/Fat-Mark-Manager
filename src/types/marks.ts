export interface SubjectInfo {
  id: string;
  name: string;
  code: string;
  professor: string;
  credits: number;
}

export interface MarkSheet {
  studentId: string;
  studentName: string;
  subject: string;
  assessment: string;
  partA: {
    questions: Array<{
      number: number;
      marks: number;
      maxMarks: number;
    }>;
    total: number;
  };
  partB: {
    questions: Array<{
      number: number;
      subQuestion: 'a' | 'b';
      marks: number;
      maxMarks: number;
    }>;
    total: number;
  };
  total: number;
  maxTotal: number;
  scannedAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export const SUBJECTS: SubjectInfo[] = [
  { id: 'os', name: 'Operating Systems', code: 'CS401', professor: 'Dr. Sarah Miller', credits: 4 },
  { id: 'java', name: 'Advanced Java Programming', code: 'CS402', professor: 'Prof. James Wilson', credits: 4 },
  { id: 'ml', name: 'Machine Learning', code: 'CS403', professor: 'Dr. Emily Chen', credits: 4 },
  { id: 'daa', name: 'Design and Analysis of Algorithms', code: 'CS404', professor: 'Dr. Michael Brown', credits: 4 },
  { id: 'math', name: 'Advanced Mathematics', code: 'MA401', professor: 'Dr. Robert Taylor', credits: 4 },
  { id: 'ess', name: 'Environmental Science', code: 'ES401', professor: 'Dr. Lisa Green', credits: 3 }
];