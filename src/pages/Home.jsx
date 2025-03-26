import React from 'react'

const HomePage = () => {
  return (
    <section className="bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 min-h-screen p-6 font-[sans-serif]">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Our Tournament Platform</h1>
          <p className="text-lg mb-6 text-white">Join exciting tournaments, manage your payments, and connect with fellow enthusiasts — all in one place!</p>
          <a href="/register" className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-green-500 hover:text-black transition">Get Started</a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br  border-2 border-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-semibold mb-3">Upcoming Tournaments</h2>
            <p>Stay updated with the latest events and never miss a chance to compete!</p>
          </div>
          <div className="bg-gradient-to-br  border-2 border-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-semibold mb-3">Secure Payments</h2>
            <p>Easy and safe payment options to register for your favorite tournaments.</p>
          </div>
          <div className="bg-gradient-to-br  border-2 border-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-semibold mb-3">Community & Support</h2>
            <p>Connect with players, share experiences, and get support anytime you need it.</p>
          </div>
        </div>
        
        <div className="mt-22">
          <h2 className="text-3xl font-bold mb-4 text-white text-center">Watch Cricket Match Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <iframe className="w-full h-64 rounded-lg shadow-lg" src="https://www.youtube.com/embed/1st_video_id" title="Cricket Match 1" frameBorder="0" allowFullScreen></iframe>
            <iframe className="w-full h-64 rounded-lg shadow-lg" src="https://www.youtube.com/embed/2nd_video_id" title="Cricket Match 2" frameBorder="0" allowFullScreen></iframe>
            <iframe className="w-full h-64 rounded-lg shadow-lg" src="https://www.youtube.com/embed/3rd_video_id" title="Cricket Match 3" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

