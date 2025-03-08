import React, { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { moderateContent } from '../../lib/api/grokService';
import type { ModerationResult } from '../../lib/types/api';

export function ContentModerator() {
  const [content, setContent] = useState('');
  const [results, setResults] = useState<ModerationResult>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleModerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await moderateContent(content);
      setResults(response);
    } catch (error) {
      setResults({ error: 'Failed to moderate content' });
    } finally {
      setIsLoading(false);
    }
  };

  const getResultColor = (value: boolean) => 
    value ? 'bg-red-500' : 'bg-green-500';

  const getResultText = (value: boolean) =>
    value ? 'Flagged' : 'Safe';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-6 h-6 text-blue-600" />
          <p className="text-gray-600">
            Our AI-powered content moderation system helps maintain platform safety by detecting inappropriate, harmful, or sensitive content.
          </p>
        </div>
      </div>

      <form onSubmit={handleModerate} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
          placeholder="Enter content to moderate..."
          disabled={isLoading}
        />
        <button 
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 disabled:opacity-50 transition-colors"
          disabled={isLoading || !content.trim()}
        >
          <Shield className="w-5 h-5" />
          <span>{isLoading ? 'Analyzing...' : 'Moderate Content'}</span>
        </button>
      </form>

      {(results.error || Object.keys(results).length > 0) && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Moderation Results:</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            {results.error ? (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertTriangle className="w-5 h-5" />
                <span>{results.error}</span>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(results).map(([key, value]) => (
                  <div key={key} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                    <div className={`w-3 h-3 rounded-full mr-3 ${getResultColor(value)}`} />
                    <div>
                      <span className="font-medium capitalize">{key}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        {getResultText(value)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}