import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { analyzeText } from '../../lib/api/grokService';
import type { AnalysisResult } from '../../lib/types/api';

export function TextAnalysis() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const results = await analyzeText(text);
      setAnalysis(results);
    } catch (error) {
      setAnalysis({ error: 'Failed to analyze text' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleAnalyze} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter text to analyze..."
          disabled={isLoading}
        />
        <button 
          type="submit"
          className="w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2 disabled:opacity-50"
          disabled={isLoading}
        >
          <Search className="w-5 h-5" />
          <span>{isLoading ? 'Analyzing...' : 'Analyze Text'}</span>
        </button>
      </form>

      {(analysis.error || Object.keys(analysis).length > 0) && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Analysis Results:</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {analysis.error ? (
              <div className="text-red-500">{analysis.error}</div>
            ) : (
              Object.entries(analysis).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <span className="font-medium capitalize">{key}: </span>
                  {Array.isArray(value) ? value.join(', ') : value}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}