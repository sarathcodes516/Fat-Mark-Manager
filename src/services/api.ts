const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function fetchStudentsByClass(classId: string): Promise<Student[]> {
  const response = await fetch(`${API_BASE_URL}/classes/${classId}/students`);
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return response.json();
}

export async function submitMarkSheet(markSheet: MarkSheet): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/marks/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(markSheet),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit mark sheet');
  }
}