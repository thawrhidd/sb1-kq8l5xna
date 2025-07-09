import React from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  PieChart,
  BarChart3,
  Target,
  Calendar
} from 'lucide-react';

interface AccountingSidebarProps {
  onTemplateSelect: (template: string) => void;
}

const AccountingSidebar: React.FC<AccountingSidebarProps> = ({ onTemplateSelect }) => {
  const templates = [
    { id: 'balance-sheet', name: 'Balance Sheet', icon: FileText },
    { id: 'income-statement', name: 'Income Statement', icon: TrendingUp },
    { id: 'cash-flow', name: 'Cash Flow', icon: DollarSign },
    { id: 'budget', name: 'Budget Tracker', icon: Target },
    { id: 'expenses', name: 'Expense Report', icon: Calculator },
    { id: 'financial-ratios', name: 'Financial Ratios', icon: BarChart3 },
  ];

  const quickFunctions = [
    { name: 'SUM', description: 'Add range of cells' },
    { name: 'AVERAGE', description: 'Calculate average' },
    { name: 'NPV', description: 'Net Present Value' },
    { name: 'IRR', description: 'Internal Rate of Return' },
    { name: 'PMT', description: 'Payment calculation' },
    { name: 'FV', description: 'Future Value' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Accounting Tools
        </h3>

        {/* Templates Section */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Templates</h4>
          <div className="space-y-2">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => onTemplateSelect(template.id)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{template.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Functions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Functions</h4>
          <div className="space-y-2">
            {quickFunctions.map((func) => (
              <div
                key={func.name}
                className="px-3 py-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="font-mono text-sm font-medium text-blue-600">
                  ={func.name}()
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {func.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <PieChart className="h-4 w-4 mr-2" />
            Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Cells:</span>
              <span className="font-medium">1,300</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Formulas:</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-medium">Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingSidebar;