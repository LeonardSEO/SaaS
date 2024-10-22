import React, { useState, useEffect } from 'react';
import { signInWithGoogle, getCurrentUser } from '../../services/authService';
import { getSearchConsoleData, getGoogleAnalyticsData } from '../../services/googleService';

const IntegrationSettings: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [searchConsoleData, setSearchConsoleData] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleGoogleSignIn = async () => {
    console.log('Google sign-in is temporarily disabled');
    // Uncomment the following line when re-enabling Google OAuth
    // await signInWithGoogle();
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const fetchGoogleData = async () => {
    try {
      const scData = await getSearchConsoleData('https://example.com'); // Replace with actual site URL
      setSearchConsoleData(scData);

      const gaData = await getGoogleAnalyticsData('YOUR_VIEW_ID'); // Replace with actual Google Analytics View ID
      setAnalyticsData(gaData);
    } catch (error) {
      console.error('Error fetching Google data:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Integration Settings</h2>
      {!user ? (
        <button
          onClick={handleGoogleSignIn}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      ) : (
        <div>
          <p>Signed in as: {user.email}</p>
          <button
            onClick={fetchGoogleData}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Fetch Google Data
          </button>
          {searchConsoleData && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Search Console Data</h3>
              <pre>{JSON.stringify(searchConsoleData, null, 2)}</pre>
            </div>
          )}
          {analyticsData && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Analytics Data</h3>
              <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IntegrationSettings;
