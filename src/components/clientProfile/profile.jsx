import React, { useEffect, useState } from "react";
// import { User, Mail, Briefcase, Edit, Save } from "lucide-react";

const ClientProfile = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [userData, setUserData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("freelanceuser")));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        {/* <User className="mr-2" />  */}
        Client Profile
      </h2>
      {isEditing ? (
        <div className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Industry
            </label>
            <input
              type="text"
              name="industry"
              value={editedProfile.industry}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div> */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={editedProfile.description}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div> */}
          {/* <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button> */}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="flex items-center">
            {/* <User className="mr-2" /> */}
            Name: {userData?.username}
          </p>
          <p className="flex items-center">
            {/* <Mail className="mr-2" /> */}
            Email: {userData?.email}
          </p>
          {/* <p className="flex items-center">
            {profile.industry}
          </p> */}
          {/* <p className="mt-2">{profile.description}</p> */}
          {/* <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Edit Profile
          </button> */}
        </div>
      )}
    </div>
  );
};

export default ClientProfile;
