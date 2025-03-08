import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { parseLogs } from '../../lib/api/grokService';

export function LogParser() {
  const [logs, setLogs] = useState('');
  const [results, setResults] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logs.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const analysis = await parseLogs(logs);
      setResults(analysis);
    } catch (error) {
      setResults('Failed to parse logs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleParse} className="space-y-4">
        <textarea
          value={logs}
          onChange={(e) => setLogs(e.target.value)}
          className="w-full h-40 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          placeholder="Paste your logs here..."
          disabled={isLoading}
        />
        <button 
          type="submit"
          className="w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2 disabled:opacity-50"
          disabled={isLoading}
        >
          <FileText className="w-5 h-5" />
          <span>{isLoading ? 'Analyzing...' : 'Parse Logs'}</span>
        </button>
      </form>

      {results && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Analysis Results:</h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
            {results}
          </div>
        </div>
      )}
    </div>
  );
}