import { createWorker } from 'tesseract.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { MarkSheet } from '../types/marks';
import type { Student } from '../types/student';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface ExtractedText {
  text: string;
  confidence: number;
}

async function extractTextFromImage(imageData: string): Promise<ExtractedText> {
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  
  const result = await worker.recognize(imageData);
  await worker.terminate();
  
  return {
    text: result.data.text,
    confidence: result.data.confidence
  };
}

function createEmptyMarkSheet(student: Student): MarkSheet {
  return {
    studentId: student.registrationNumber,
    studentName: student.name,
    subject: '',
    assessment: '',
    partA: {
      questions: Array.from({ length: 10 }, (_, i) => ({
        number: i + 1,
        marks: 0,
        maxMarks: 2
      })),
      total: 0
    },
    partB: {
      questions: Array.from({ length: 6 }, (_, i) => ({
        number: Math.floor(i / 2) + 11,
        subQuestion: i % 2 === 0 ? 'a' : 'b' as const,
        marks: 0,
        maxMarks: 10
      })),
      total: 0
    },
    total: 0,
    maxTotal: 50,
    scannedAt: new Date().toISOString()
  };
}

function parseMarksStructure(text: string, student: Student): MarkSheet {
  const markSheet = createEmptyMarkSheet(student);
  
  try {
    // Split text into lines and process each line
    const lines = text.split('\n').map(line => line.trim());
    
    // Process Part A (Questions 1-10)
    let currentQuestion = 1;
    for (const line of lines) {
      if (currentQuestion > 10) break;
      
      const match = line.match(/Q(\d+)\s*[:=]?\s*(\d+)/i);
      if (match) {
        const questionNum = parseInt(match[1]);
        const marks = Math.min(parseInt(match[2]), 2); // Max 2 marks for Part A
        
        if (questionNum <= 10) {
          const index = questionNum - 1;
          markSheet.partA.questions[index].marks = marks;
        }
      }
      currentQuestion++;
    }
    
    // Process Part B (Questions 11-13)
    for (const line of lines) {
      const match = line.match(/Q(\d+)([ab])\s*[:=]?\s*(\d+)/i);
      if (match) {
        const questionNum = parseInt(match[1]);
        const subQuestion = match[2].toLowerCase() as 'a' | 'b';
        const marks = Math.min(parseInt(match[3]), 10); // Max 10 marks for Part B
        
        if (questionNum >= 11 && questionNum <= 13) {
          const index = (questionNum - 11) * 2 + (subQuestion === 'b' ? 1 : 0);
          markSheet.partB.questions[index].marks = marks;
        }
      }
    }
    
    // Calculate totals
    markSheet.partA.total = markSheet.partA.questions.reduce((sum, q) => sum + q.marks, 0);
    markSheet.partB.total = markSheet.partB.questions.reduce((sum, q) => sum + q.marks, 0);
    markSheet.total = markSheet.partA.total + markSheet.partB.total;
    
    return markSheet;
  } catch (error) {
    console.error('Error parsing marks:', error);
    return markSheet;
  }
}

export async function scanMarkSheet(imageData: string, student: Student): Promise<MarkSheet | null> {
  try {
    const extractedText = await extractTextFromImage(imageData);
    
    if (extractedText.confidence < 70) {
      throw new Error('Low confidence in text extraction. Please ensure clear image quality.');
    }
    
    const markSheet = parseMarksStructure(extractedText.text, student);
    return markSheet;
  } catch (error) {
    console.error('Error scanning mark sheet:', error);
    return null;
  }
}

export function validateMarkSheet(markSheet: MarkSheet): boolean {
  // Validate Part A
  const partAValid = markSheet.partA.questions.every(q => q.marks >= 0 && q.marks <= 2) &&
                    markSheet.partA.total <= 20;
  
  // Validate Part B
  const partBValid = markSheet.partB.questions.every(q => q.marks >= 0 && q.marks <= 10) &&
                    markSheet.partB.total <= 30;
  
  // Validate total marks
  return partAValid && partBValid && markSheet.total <= 50;
}

export function generateMarkSummary(markSheet: MarkSheet): string {
  return `
Mark Sheet Summary
-----------------
Student: ${markSheet.studentName} (${markSheet.studentId})

Part A (${markSheet.partA.total}/20)
-----------------------------------
${markSheet.partA.questions.map(q => 
  `Q${q.number}: ${q.marks}/${q.maxMarks}`
).join('\n')}

Part B (${markSheet.partB.total}/30)
-----------------------------------
${markSheet.partB.questions.map(q => 
  `Q${q.number}${q.subQuestion}: ${q.marks}/${q.maxMarks}`
).join('\n')}

Total: ${markSheet.total}/50
`;
}