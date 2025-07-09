import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, DollarSign, Percent, Hash, Save, Download, Upload, Undo, Redo, Copy, Cast as Paste, Nut as Cut } from 'lucide-react';

interface ToolbarProps {
  onFormatChange: (format: string) => void;
  onSave: () => void;
  onLoad: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onFormatChange, onSave, onLoad }) => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {/* File Operations */}
          <div className="flex items-center space-x-1 border-r border-gray-200 pr-3 mr-3">
            <button
              onClick={onSave}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Save"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={onLoad}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Open"
            >
              <Upload className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Download"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>

          {/* Edit Operations */}
          <div className="flex items-center space-x-1 border-r border-gray-200 pr-3 mr-3">
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Cut"
            >
              <Cut className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Copy"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Paste"
            >
              <Paste className="h-4 w-4" />
            </button>
          </div>

          {/* Text Formatting */}
          <div className="flex items-center space-x-1 border-r border-gray-200 pr-3 mr-3">
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center space-x-1 border-r border-gray-200 pr-3 mr-3">
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </button>
          </div>

          {/* Number Formatting */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onFormatChange('currency')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Currency"
            >
              <DollarSign className="h-4 w-4" />
            </button>
            <button
              onClick={() => onFormatChange('percentage')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Percentage"
            >
              <Percent className="h-4 w-4" />
            </button>
            <button
              onClick={() => onFormatChange('number')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Number"
            >
              <Hash className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Excel-like Accounting Spreadsheet
        </div>
      </div>
    </div>
  );
};

export default Toolbar;