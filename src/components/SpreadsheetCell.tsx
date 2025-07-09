import React, { useState, useRef, useEffect } from 'react';
import { Cell } from '../types';
import { getCellDisplayValue } from '../utils/cellUtils';

interface SpreadsheetCellProps {
  cell: Cell;
  isSelected: boolean;
  isEditing: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onValueChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const SpreadsheetCell: React.FC<SpreadsheetCellProps> = ({
  cell,
  isSelected,
  isEditing,
  onClick,
  onDoubleClick,
  onValueChange,
  onKeyDown,
}) => {
  const [localValue, setLocalValue] = useState(cell.value || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setLocalValue(cell.value || '');
  }, [cell.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    onValueChange(value);
  };

  const cellStyle = {
    ...cell.style,
    textAlign: cell.style?.textAlign || (cell.type === 'number' || cell.type === 'currency' ? 'right' : 'left'),
  };

  return (
    <div
      className={`
        relative border-r border-b border-gray-200 h-8 min-w-[80px] cursor-cell
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}
        ${cell.style?.backgroundColor || 'bg-white'}
      `}
      style={cellStyle}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className="w-full h-full px-2 border-none outline-none bg-transparent"
          style={{ textAlign: cellStyle.textAlign }}
        />
      ) : (
        <div 
          className="h-full px-2 py-1 text-sm truncate flex items-center"
          style={{ 
            justifyContent: cellStyle.textAlign === 'right' ? 'flex-end' : 
                           cellStyle.textAlign === 'center' ? 'center' : 'flex-start'
          }}
        >
          {getCellDisplayValue(cell)}
        </div>
      )}
    </div>
  );
};

export default SpreadsheetCell;