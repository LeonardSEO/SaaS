import React, { useState } from 'react';

const AccountManagement: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Editor' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
  ]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile update logic here
    console.log('Profile updated:', profile);
  };

  const handleAddTeamMember = () => {
    const newMember = {
      id: teamMembers.length + 1,
      name: 'New Member',
      email: 'new@example.com',
      role: 'Viewer'
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Management</h2>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Profile Settings</h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              id="role"
              value={profile.role}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Update Profile
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Team Management</h3>
        <ul className="space-y-2">
          {teamMembers.map((member) => (
            <li key={member.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{member.name} ({member.email})</span>
              <span className="text-sm text-gray-600">{member.role}</span>
            </li>
          ))}
        </ul>
        <button onClick={handleAddTeamMember} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Add Team Member
        </button>
      </div>
    </div>
  );
};

export default AccountManagement;
