import React, { useState } from 'react';

const SecuritySettings: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on Windows', lastActive: '2023-06-15 14:30' },
    { id: 2, device: 'Safari on iPhone', lastActive: '2023-06-14 09:45' },
  ]);
  const [apiTokens, setApiTokens] = useState([
    { id: 1, name: 'Dashboard Integration', created: '2023-05-01', lastUsed: '2023-06-15' },
  ]);

  const handleTwoFactorToggle = () => {
    // Implement two-factor authentication toggle logic here
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const handleRevokeSession = (id: number) => {
    // Implement session revocation logic here
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  const handleCreateApiToken = () => {
    // Implement API token creation logic here
    console.log('Create new API token');
  };

  const handleRevokeApiToken = (id: number) => {
    // Implement API token revocation logic here
    setApiTokens(prev => prev.filter(token => token.id !== id));
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={twoFactorEnabled} onChange={handleTwoFactorToggle} />
              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${twoFactorEnabled ? 'transform translate-x-full bg-blue-600' : ''}`}></div>
            </div>
            <span className="ml-3">Enable Two-Factor Authentication</span>
          </label>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Active Sessions</h3>
        <ul className="space-y-2">
          {sessions.map((session) => (
            <li key={session.id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
              <div>
                <p className="font-medium">{session.device}</p>
                <p className="text-sm text-gray-300">Last active: {session.lastActive}</p>
              </div>
              <button onClick={() => handleRevokeSession(session.id)} className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                Revoke
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">API Access Tokens</h3>
        <ul className="space-y-2">
          {apiTokens.map((token) => (
            <li key={token.id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
              <div>
                <p className="font-medium">{token.name}</p>
                <p className="text-sm text-gray-300">Created: {token.created} | Last used: {token.lastUsed}</p>
              </div>
              <button onClick={() => handleRevokeApiToken(token.id)} className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                Revoke
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleCreateApiToken} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Create New API Token
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
