import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

interface AnalysisResult {
  url: string;
  missingKeywords: string[];
  keywordDensity: { [key: string]: number };
  status: 'pending' | 'completed' | 'error';
  error?: string;
}

interface Client {
  name: string;
  urlData: {
    url: string;
    keywords: string;
    result: AnalysisResult | null;
  }[];
}

const DataTools: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [newClientName, setNewClientName] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const addClient = () => {
    if (newClientName.trim()) {
      setClients([...clients, { name: newClientName.trim(), urlData: [{ url: '', keywords: '', result: null }] }]);
      setNewClientName('');
      setActiveTab(clients.length);
    }
  };

  const updateClient = (index: number, updatedClient: Client) => {
    const newClients = [...clients];
    newClients[index] = updatedClient;
    setClients(newClients);
  };

  const addUrlField = (clientIndex: number) => {
    const updatedClient = {
      ...clients[clientIndex],
      urlData: [...clients[clientIndex].urlData, { url: '', keywords: '', result: null }]
    };
    updateClient(clientIndex, updatedClient);
  };

  const updateUrlData = (clientIndex: number, urlIndex: number, field: 'url' | 'keywords', value: string) => {
    const updatedUrlData = [...clients[clientIndex].urlData];
    updatedUrlData[urlIndex] = { ...updatedUrlData[urlIndex], [field]: value };
    updateClient(clientIndex, { ...clients[clientIndex], urlData: updatedUrlData });
  };

  const deleteUrl = (clientIndex: number, urlIndex: number) => {
    const updatedUrlData = clients[clientIndex].urlData.filter((_, index) => index !== urlIndex);
    updateClient(clientIndex, { ...clients[clientIndex], urlData: updatedUrlData });
  };

  const deleteClient = (clientIndex: number) => {
    const newClients = clients.filter((_, index) => index !== clientIndex);
    setClients(newClients);
    if (activeTab >= newClients.length) {
      setActiveTab(Math.max(0, newClients.length - 1));
    }
  };

  const startAnalysis = async (clientIndex: number) => {
    const client = clients[clientIndex];
    const updatedClient = { ...client, urlData: client.urlData.map(data => ({ ...data, result: null })) };
    updateClient(clientIndex, updatedClient);

    for (let i = 0; i < updatedClient.urlData.length; i++) {
      const { url, keywords } = updatedClient.urlData[i];
      if (!url || !keywords) continue;

      try {
        const initialResult: AnalysisResult = { 
          url, 
          missingKeywords: [], 
          keywordDensity: {},
          status: 'pending'
        };
        // Update the type assertion to handle the union type
        updatedClient.urlData[i] = { ...updatedClient.urlData[i], result: initialResult };
        updateClient(clientIndex, updatedClient);

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch URL');

        const html = await response.text();
        const text = extractMainContent(html);
        const keywordList = keywords.split(',').map(k => k.trim().toLowerCase());

        const { missingKeywords, keywordDensity } = analyzeKeywords(text, keywordList);

        updatedClient.urlData[i].result = {
          url,
          missingKeywords,
          keywordDensity,
          status: 'completed' as const
        };
      } catch (error) {
        updatedClient.urlData[i].result = {
          url,
          missingKeywords: [],
          keywordDensity: {},
          status: 'error' as const,
          error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
      }

      updateClient(clientIndex, updatedClient);
      setAnalysisProgress(((i + 1) / updatedClient.urlData.length) * 100);
    }

    setAnalysisProgress(0);
  };

  const extractMainContent = (html: string): string => {
    // Simple content extraction (you might want to improve this)
    const stripped = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    return stripped;
  };

  const analyzeKeywords = (text: string, keywords: string[]): { missingKeywords: string[], keywordDensity: { [key: string]: number } } => {
    const words = text.split(/\s+/);
    const totalWords = words.length;
    const keywordDensity: { [key: string]: number } = {};
    const missingKeywords: string[] = [];

    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const count = (text.match(regex) || []).length;
      if (count === 0) {
        missingKeywords.push(keyword);
      } else {
        keywordDensity[keyword] = (count / totalWords) * 100;
      }
    });

    return { missingKeywords, keywordDensity };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Data Tools</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={newClientName}
          onChange={(e) => setNewClientName(e.target.value)}
          placeholder="New Client Name"
          className="mr-2 p-2 border rounded"
        />
        <button onClick={addClient} className="bg-blue-500 text-white p-2 rounded">Add Client</button>
      </div>

      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList>
          {clients.map((client, index) => (
            <Tab key={index}>{client.name}</Tab>
          ))}
        </TabList>

        {clients.map((client, clientIndex) => (
          <TabPanel key={clientIndex}>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{client.name}</h2>
                <button onClick={() => deleteClient(clientIndex)} className="bg-red-500 text-white p-2 rounded">
                  Delete Client
                </button>
              </div>
              
              {client.urlData.map((data, urlIndex) => (
                <div key={urlIndex} className="mb-4 p-4 border rounded">
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      value={data.url}
                      onChange={(e) => updateUrlData(clientIndex, urlIndex, 'url', e.target.value)}
                      placeholder={`Enter URL ${urlIndex + 1}`}
                      className="flex-grow p-2 mr-2 border rounded"
                    />
                    <button onClick={() => deleteUrl(clientIndex, urlIndex)} className="bg-red-500 text-white p-2 rounded">
                      Delete
                    </button>
                  </div>
                  <input
                    type="text"
                    value={data.keywords}
                    onChange={(e) => updateUrlData(clientIndex, urlIndex, 'keywords', e.target.value)}
                    placeholder="Enter keywords (comma-separated)"
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              
              <button onClick={() => addUrlField(clientIndex)} className="bg-green-500 text-white p-2 rounded mb-4">
                + Add URL
              </button>

              <button onClick={() => startAnalysis(clientIndex)} className="bg-blue-500 text-white p-2 rounded">
                Start Analysis
              </button>

              {analysisProgress > 0 && (
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${analysisProgress}%` }}></div>
                  </div>
                  <p className="text-sm mt-1">Analysis Progress: {analysisProgress.toFixed(0)}%</p>
                </div>
              )}

              {client.urlData.some(data => data.result) && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
                  <table className="w-full border-collapse border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">URL</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Missing Keywords</th>
                        <th className="border p-2">Keyword Density</th>
                      </tr>
                    </thead>
                    <tbody>
                      {client.urlData.map((data, index) => (
                        data.result && (
                          <tr key={index}>
                            <td className="border p-2">{data.result.url}</td>
                            <td className="border p-2">{data.result.status}</td>
                            <td className="border p-2">{data.result.missingKeywords.join(', ')}</td>
                            <td className="border p-2">
                              {Object.entries(data.result.keywordDensity).map(([keyword, density]) => (
                                <div key={keyword}>{keyword}: {density.toFixed(2)}%</div>
                              ))}
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default DataTools;
