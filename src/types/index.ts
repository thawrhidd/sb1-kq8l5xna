export interface Cell {
  value: string;
  formula?: string;
  type: 'text' | 'number' | 'currency' | 'percentage' | 'date';
  format?: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface Sheet {
  name: string;
  cells: { [key: string]: Cell };
  columns: number;
  rows: number;
}

export interface Position {
  row: number;
  col: number;
}

export type FormulaFunction = 'SUM' | 'AVERAGE' | 'COUNT' | 'MAX' | 'MIN' | 'IF' | 'VLOOKUP';