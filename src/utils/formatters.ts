
/**
 * Utility functions for formatting data in the dashboard
 */

// Format a number with commas for thousands
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Format a number as a percentage
export const formatPercent = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num);
};

// Format a date string to a more readable format
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Truncate a string if it's too long
export const truncateString = (str: string, maxLength: number = 20): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

// Convert seconds to a human-readable duration
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
};

// Format a large number to K/M/B format
export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};

// Simple hash function to generate consistent colors for strings
export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use a nice set of colors from a predefined palette
  const palette = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f97316', // orange
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f59e0b', // amber
    '#6366f1', // indigo
    '#ef4444', // red
    '#0ea5e9', // sky
  ];
  
  // Use the hash to pick a color from the palette
  const index = Math.abs(hash) % palette.length;
  return palette[index];
};

// Format a time string from ISO format
export const formatTime = (timeString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Date(timeString).toLocaleTimeString('en-US', options);
};

// Abbreviate app ID for display
export const abbreviateId = (id: string): string => {
  if (!id) return '';
  return id.substring(0, 8) + '...';
};

// Convert camelCase to Title Case with spaces
export const camelToTitleCase = (text: string): string => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};
