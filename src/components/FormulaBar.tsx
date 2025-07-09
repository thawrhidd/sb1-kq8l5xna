import React from 'react';
import { Calculator, FunctionSquare as Function } from 'lucide-react';

interface FormulaBarProps {
  selectedCell: string;
  cellValue: string;
  onCellValueChange: (value: string) => void;
}

const FormulaBar: React.FC<FormulaBarProps> = ({
  selectedCell,
  cellValue,
  onCellValueChange,
}) => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calculator className="h-4 w-4 text-gray-500" />
          <div className="font-mono text-sm font-medium text-gray-700 min-w-[60px]">
            {selectedCell}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-1">
          <Function className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={cellValue}
            onChange={(e) => onCellValueChange(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter value or formula (e.g., =SUM(A1:A10))"
          />
        </div>
      </div>
    </div>
  );
};

export default FormulaBar;