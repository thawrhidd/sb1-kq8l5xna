import { useState, useCallback } from 'react';
import { Cell, Sheet } from '../types';

const useSpreadsheet = () => {
  const [sheet, setSheet] = useState<Sheet>({
    name: 'Sheet1',
    cells: {},
    columns: 26,
    rows: 50,
  });
  
  const [selectedCell, setSelectedCell] = useState<string>('A1');

  const updateCell = useCallback((cellKey: string, value: string) => {
    setSheet(prev => ({
      ...prev,
      cells: {
        ...prev.cells,
        [cellKey]: {
          ...prev.cells[cellKey],
          value,
          type: prev.cells[cellKey]?.type || 'text',
        }
      }
    }));
  }, []);

  const formatCell = useCallback((cellKey: string, format: string) => {
    setSheet(prev => ({
      ...prev,
      cells: {
        ...prev.cells,
        [cellKey]: {
          ...prev.cells[cellKey],
          value: prev.cells[cellKey]?.value || '',
          type: format as Cell['type'],
        }
      }
    }));
  }, []);

  const saveSheet = useCallback(() => {
    const data = JSON.stringify(sheet, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sheet.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [sheet]);

  const loadSheet = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            setSheet(data);
          } catch (error) {
            console.error('Error loading sheet:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, []);

  const loadTemplate = useCallback((templateId: string) => {
    const templates: { [key: string]: { [key: string]: Cell } } = {
      'balance-sheet': {
        'A1': { value: 'BALANCE SHEET', type: 'text', style: { fontWeight: 'bold', textAlign: 'center' } },
        'A3': { value: 'ASSETS', type: 'text', style: { fontWeight: 'bold' } },
        'A4': { value: 'Current Assets', type: 'text' },
        'A5': { value: 'Cash', type: 'text' },
        'B5': { value: '10000', type: 'currency' },
        'A6': { value: 'Accounts Receivable', type: 'text' },
        'B6': { value: '5000', type: 'currency' },
        'A7': { value: 'Inventory', type: 'text' },
        'B7': { value: '15000', type: 'currency' },
        'A8': { value: 'Total Current Assets', type: 'text', style: { fontWeight: 'bold' } },
        'B8': { value: '30000', type: 'currency', style: { fontWeight: 'bold' } },
        'A10': { value: 'LIABILITIES', type: 'text', style: { fontWeight: 'bold' } },
        'A11': { value: 'Current Liabilities', type: 'text' },
        'A12': { value: 'Accounts Payable', type: 'text' },
        'B12': { value: '8000', type: 'currency' },
        'A13': { value: 'Total Current Liabilities', type: 'text', style: { fontWeight: 'bold' } },
        'B13': { value: '8000', type: 'currency', style: { fontWeight: 'bold' } },
        'A15': { value: 'EQUITY', type: 'text', style: { fontWeight: 'bold' } },
        'A16': { value: 'Retained Earnings', type: 'text' },
        'B16': { value: '22000', type: 'currency' },
      },
      'income-statement': {
        'A1': { value: 'INCOME STATEMENT', type: 'text', style: { fontWeight: 'bold', textAlign: 'center' } },
        'A3': { value: 'REVENUE', type: 'text', style: { fontWeight: 'bold' } },
        'A4': { value: 'Sales Revenue', type: 'text' },
        'B4': { value: '100000', type: 'currency' },
        'A5': { value: 'Service Revenue', type: 'text' },
        'B5': { value: '25000', type: 'currency' },
        'A6': { value: 'Total Revenue', type: 'text', style: { fontWeight: 'bold' } },
        'B6': { value: '125000', type: 'currency', style: { fontWeight: 'bold' } },
        'A8': { value: 'EXPENSES', type: 'text', style: { fontWeight: 'bold' } },
        'A9': { value: 'Cost of Goods Sold', type: 'text' },
        'B9': { value: '60000', type: 'currency' },
        'A10': { value: 'Operating Expenses', type: 'text' },
        'B10': { value: '30000', type: 'currency' },
        'A11': { value: 'Total Expenses', type: 'text', style: { fontWeight: 'bold' } },
        'B11': { value: '90000', type: 'currency', style: { fontWeight: 'bold' } },
        'A13': { value: 'NET INCOME', type: 'text', style: { fontWeight: 'bold' } },
        'B13': { value: '35000', type: 'currency', style: { fontWeight: 'bold' } },
      },
    };

    const template = templates[templateId];
    if (template) {
      setSheet(prev => ({
        ...prev,
        cells: template,
      }));
    }
  }, []);

  return {
    sheet,
    selectedCell,
    setSelectedCell,
    updateCell,
    formatCell,
    saveSheet,
    loadSheet,
    loadTemplate,
  };
};

export default useSpreadsheet;