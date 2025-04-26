export interface Student {
  id: string;
  registrationNumber: string;
  name: string;
  department: string;
  semester: number;
  section: string;
  email: string;
}

export interface Class {
  id: string;
  name: string;
  department: string;
  semester: number;
  section: string;
  students: Student[];
}