import React from 'react';

const Profile = () => {
  // You can fetch user data and submit via backend here later

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      bio: form.bio.value,
    };

    // 👇 Submit this data to your backend
    console.log('Form Data:', data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        {/* Profile Header */}
        <div className="flex items-center flex-col mb-6">
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            src="https://i.pravatar.cc/150?img=13"
            alt="Profile"
          />
          <h2 className="text-2xl font-bold mt-4 text-center">Your Profile</h2>
          <p className="text-gray-500 text-center">Manage your information below</p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              defaultValue="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              defaultValue="123-456-7890"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Bio</label>
            <textarea
              name="bio"
              defaultValue="A passionate learner and developer."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
