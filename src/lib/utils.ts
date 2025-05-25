import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function downloadFile(filename: string, content: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(url);
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function generateTimeLabels(count: number): string[] {
  const labels = [];
  const now = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    labels.push(formatDate(date));
  }
  
  return labels;
}

export function generateChartDatasets(count: number, labelPrefix: string) {
  const datasets = [];
  
  for (let i = 0; i < count; i++) {
    const color = getRandomColor();
    datasets.push({
      label: `${labelPrefix} ${i + 1}`,
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
      backgroundColor: color,
      borderColor: color,
    });
  }
  
  return datasets;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}