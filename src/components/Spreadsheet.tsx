import React, { useState, useCallback, useEffect } from 'react';
import SpreadsheetCell from './SpreadsheetCell';
import { Cell, Position } from '../types';
import { columnNumberToLetter, getCellKey } from '../utils/cellUtils';

interface SpreadsheetProps {
  cells: { [key: string]: Cell };
  selectedCell: string;
  onCellSelect: (cellKey: string) => void;
  onCellChange: (cellKey: string, value: string) => void;
  onCellFormatChange: (cellKey: string, format: string) => void;
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({
  cells,
  selectedCell,
  onCellSelect,
  onCellChange,
  onCellFormatChange,
}) => {
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>({ row: 1, col: 1 });

  const rows = 50;
  const cols = 26;

  const handleCellClick = useCallback((row: number, col: number) => {
    const cellKey = getCellKey(row, col);
    onCellSelect(cellKey);
    setPosition({ row, col });
  }, [onCellSelect]);

  const handleCellDoubleClick = useCallback((row: number, col: number) => {
    const cellKey = getCellKey(row, col);
    setEditingCell(cellKey);
  }, []);

  const handleCellValueChange = useCallback((cellKey: string, value: string) => {
    onCellChange(cellKey, value);
  }, [onCellChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditingCell(null);
      // Move to next row
      if (position.row < rows) {
        const newRow = position.row + 1;
        const newCellKey = getCellKey(newRow, position.col);
        onCellSelect(newCellKey);
        setPosition({ row: newRow, col: position.col });
      }
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setEditingCell(null);
      // Move to next column
      if (position.col < cols) {
        const newCol = position.col + 1;
        const newCellKey = getCellKey(position.row, newCol);
        onCellSelect(newCellKey);
        setPosition({ row: position.row, col: newCol });
      }
    }
  }, [position, rows, cols, onCellSelect]);

  const handleArrowNavigation = useCallback((e: React.KeyboardEvent) => {
    if (editingCell) return;
    
    let newRow = position.row;
    let newCol = position.col;

    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(1, position.row - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(rows, position.row + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(1, position.col - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(cols, position.col + 1);
        break;
      default:
        return;
    }

    e.preventDefault();
    const newCellKey = getCellKey(newRow, newCol);
    onCellSelect(newCellKey);
    setPosition({ row: newRow, col: newCol });
  }, [position, editingCell, rows, cols, onCellSelect]);

  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      handleArrowNavigation(e as any);
    };

    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => window.removeEventListener('keydown', handleKeyDownGlobal);
  }, [handleArrowNavigation]);

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="inline-block min-w-full">
        {/* Header Row */}
        <div className="flex sticky top-0 bg-gray-100 z-10">
          <div className="w-12 h-8 border-r border-b border-gray-300 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
            #
          </div>
          {Array.from({ length: cols }, (_, i) => (
            <div
              key={i}
              className="min-w-[80px] h-8 border-r border-b border-gray-300 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600"
            >
              {columnNumberToLetter(i + 1)}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {Array.from({ length: rows }, (_, rowIndex) => {
          const row = rowIndex + 1;
          return (
            <div key={row} className="flex">
              {/* Row Header */}
              <div className="w-12 h-8 border-r border-b border-gray-300 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                {row}
              </div>
              
              {/* Cells */}
              {Array.from({ length: cols }, (_, colIndex) => {
                const col = colIndex + 1;
                const cellKey = getCellKey(row, col);
                const cell = cells[cellKey] || { 
                  value: '', 
                  type: 'text' as const,
                  style: {}
                };
                
                return (
                  <SpreadsheetCell
                    key={cellKey}
                    cell={cell}
                    isSelected={selectedCell === cellKey}
                    isEditing={editingCell === cellKey}
                    onClick={() => handleCellClick(row, col)}
                    onDoubleClick={() => handleCellDoubleClick(row, col)}
                    onValueChange={(value) => handleCellValueChange(cellKey, value)}
                    onKeyDown={handleKeyDown}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Spreadsheet;