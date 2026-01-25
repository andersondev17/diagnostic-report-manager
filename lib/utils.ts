import { reportsColors } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { format } from 'date-fns';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getReportColor = (subject: string) => {
  return reportsColors[subject as keyof typeof reportsColors];
};

// lib/utils/date.ts
export function formatDate(dateString: string, pattern = 'MMM dd, yyyy'): string {
  if (!dateString) return '-';

  try {
    // date-fns funciona directamente con Date nativo
    const date = new Date(dateString); 
    return format(date, pattern);
  } catch (error) {
    console.error('Invalid date:', dateString, error);
    return '-';
  }
}