import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const ScoreCard = () => {
    const [matchDetails, setMatchDetails] = useState({
        teamA: '',
        teamB: '',
        tossWinner: '',
        tossDecision: '',
        overs: '',
        playersPerTeam: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'overs' && value < 1) return;
        if (name === 'playersPerTeam' && value > 11) return;

        setMatchDetails({ ...matchDetails, [name]: value });
    };

    const navigate = useNavigate()
    const handleSubmit = () => {
        if (
            !matchDetails.teamA ||
            !matchDetails.teamB ||
            !matchDetails.tossWinner ||
            !matchDetails.tossDecision ||
            !matchDetails.overs ||
            !matchDetails.playersPerTeam
        ) {
            alert('Please fill out all fields correctly!');
        } else {
            // Decide first batting and second batting teams
            const firstBatting =
                matchDetails.tossDecision === "Batting"
                    ? matchDetails.tossWinner
                    : matchDetails.tossWinner === matchDetails.teamA
                    ? matchDetails.teamB
                    : matchDetails.teamA;
    
            const secondBatting =
                firstBatting === matchDetails.teamA ? matchDetails.teamB : matchDetails.teamA;
    
            // Final match details object
            const finalDetails = {
                ...matchDetails,
                firstBatting: firstBatting,
                secondBatting: secondBatting,
            };
    
            navigate('/livescoring', { state: finalDetails });
        }
    };
    

    return (
        <section className="bg-gradient-to-r from-green-400 to-blue-600 text-gray-900 min-h-screen p-6 font-[sans-serif]">
            <div className="max-w-screen-xl mx-auto">
                <div className="text-center py-12">
                    <h1 className="text-4xl font-bold mb-6 text-white">Cricket Match Setup</h1>
                    <p className="text-lg mb-8 text-white">Enter match details to create a live scorecard!</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">Match Details</h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            name="teamA"
                            placeholder="Enter Team A Name"
                            value={matchDetails.teamA}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg capitalize"
                            required
                        />

                        <input
                            type="text"
                            name="teamB"
                            placeholder="Enter Team B Name"
                            value={matchDetails.teamB}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg capitalize"
                            required
                        />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Who won the toss?</h3>
                            <div className="flex gap-6">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="tossWinner"
                                        value={matchDetails.teamA}
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    {matchDetails.teamA || 'Team A'}
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="tossWinner"
                                        value={matchDetails.teamB}
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    {matchDetails.teamB || 'Team B'}
                                </label>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Toss Decision</h3>
                            <div className="flex gap-6">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="tossDecision"
                                        value="Batting"
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    Batting
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="tossDecision"
                                        value="Bowling"
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    Bowling
                                </label>
                            </div>
                        </div>

                        <input
                            type="number"
                            name="overs"
                            placeholder="Number of Overs (min: 1)"
                            value={matchDetails.overs}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            required
                            min="1"
                        />

                        <input
                            type="number"
                            name="playersPerTeam"
                            placeholder="Number of Players (max: 11)"
                            value={matchDetails.playersPerTeam}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            required
                            min="1"
                            max="11"
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition shadow-lg"
                            onClick={handleSubmit}
                        >
                            Create Scorecard
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScoreCard;

