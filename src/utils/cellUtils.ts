import { Cell } from '../types';

export const columnNumberToLetter = (num: number): string => {
  let result = '';
  while (num > 0) {
    num--;
    result = String.fromCharCode(65 + (num % 26)) + result;
    num = Math.floor(num / 26);
  }
  return result;
};

export const getCellKey = (row: number, col: number): string => {
  return `${columnNumberToLetter(col)}${row}`;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
  }).format(value / 100);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const evaluateFormula = (formula: string, cells: { [key: string]: Cell }): number => {
  try {
    // Remove the = sign
    const cleanFormula = formula.replace(/^=/, '');
    
    // Simple SUM function
    if (cleanFormula.startsWith('SUM(')) {
      const range = cleanFormula.match(/SUM\(([^)]+)\)/)?.[1];
      if (range) {
        const [start, end] = range.split(':');
        // Simple implementation - would need more complex range parsing
        return 0;
      }
    }
    
    // Simple arithmetic evaluation
    const result = Function(`"use strict"; return (${cleanFormula})`)();
    return typeof result === 'number' ? result : 0;
  } catch {
    return 0;
  }
};

export const getCellDisplayValue = (cell: Cell): string => {
  if (!cell.value) return '';
  
  const numValue = parseFloat(cell.value);
  
  if (isNaN(numValue)) return cell.value;
  
  switch (cell.type) {
    case 'currency':
      return formatCurrency(numValue);
    case 'percentage':
      return formatPercentage(numValue);
    case 'number':
      return formatNumber(numValue);
    default:
      return cell.value;
  }
};