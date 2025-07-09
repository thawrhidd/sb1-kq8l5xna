import React from 'react';
import Toolbar from './components/Toolbar';
import FormulaBar from './components/FormulaBar';
import Spreadsheet from './components/Spreadsheet';
import AccountingSidebar from './components/AccountingSidebar';
import useSpreadsheet from './hooks/useSpreadsheet';

function App() {
  const {
    sheet,
    selectedCell,
    setSelectedCell,
    updateCell,
    formatCell,
    saveSheet,
    loadSheet,
    loadTemplate,
  } = useSpreadsheet();

  const selectedCellData = sheet.cells[selectedCell] || { value: '', type: 'text' };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">ExcelFlow</h1>
              <p className="text-sm text-gray-500">Professional Accounting Spreadsheet</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {sheet.name}
            </div>
            <div className="text-sm text-gray-500">
              Auto-saved
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar 
        onFormatChange={(format) => formatCell(selectedCell, format)}
        onSave={saveSheet}
        onLoad={loadSheet}
      />

      {/* Formula Bar */}
      <FormulaBar
        selectedCell={selectedCell}
        cellValue={selectedCellData.value}
        onCellValueChange={(value) => updateCell(selectedCell, value)}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AccountingSidebar onTemplateSelect={loadTemplate} />

        {/* Spreadsheet */}
        <Spreadsheet
          cells={sheet.cells}
          selectedCell={selectedCell}
          onCellSelect={setSelectedCell}
          onCellChange={updateCell}
          onCellFormatChange={formatCell}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center space-x-6">
          <span>Ready</span>
          <span>Cell: {selectedCell}</span>
          <span>Type: {selectedCellData.type}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>50 rows × 26 columns</span>
          <span>Zoom: 100%</span>
        </div>
      </div>
    </div>
  );
}

export default App;