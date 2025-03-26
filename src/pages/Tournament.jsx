import React from 'react';

const Tournament  = () => {
  const matches = [
    { id: 1, title: 'Mumbai Indians vs Chennai Super Kings', date: 'March 20, 2025', location: 'Wankhede Stadium, Mumbai' },
    { id: 2, title: 'Royal Challengers Bangalore vs Kolkata Knight Riders', date: 'March 22, 2025', location: 'M. Chinnaswamy Stadium, Bangalore' },
    { id: 3, title: 'Delhi Capitals vs Rajasthan Royals', date: 'March 25, 2025', location: 'Arun Jaitley Stadium, Delhi' },
    { id: 4, title: 'Punjab Kings vs Sunrisers Hyderabad', date: 'March 27, 2025', location: 'IS Bindra Stadium, Mohali' },
    { id: 5, title: 'Lucknow Super Giants vs Gujarat Titans', date: 'March 30, 2025', location: 'Ekana Stadium, Lucknow' },
  ];

  return (
    <section className="bg-gradient-to-r from-green-400 to-blue-600 text-gray-900 min-h-screen p-6 font-[sans-serif]">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4 text-white">Upcoming Cricket Tournaments</h1>
          <p className="text-lg mb-6 text-white">Browse the list of matches and register to participate!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div key={match.id} className="bg-gradient-to-br  border-2 border-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-semibold mb-3">{match.title}</h2>
              <p className="text-gray-700 mb-2"> 📅 Date: {match.date}</p>
              <p className="text-gray-700 mb-4"> 📍Location : {match.location}</p>
              <a
                href={`/register/${match.id}`}
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
              >
                Register Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tournament;


