import React from 'react';
import { useNavigate } from 'react-router-dom';

const JourneyCard = ({ journey, passengerCount }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/journey/${journey.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
        >
            {/* Color Header */}
            <div className={`bg-gradient-to-r ${journey.gradient} h-3`}></div>

            <div className="p-6">
                {/* Journey Name */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {journey.name}
                </h2>

                {/* Route */}
                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <p className="text-sm md:text-base">{journey.route}</p>
                </div>

                {/* Passenger Count */}
                {passengerCount !== null && (
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="text-gray-600 text-sm">Total Passengers</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">{passengerCount}</span>
                    </div>
                )}

                {/* View Details Button */}
                <button className={`w-full bg-gradient-to-r ${journey.gradient} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}>
                    <span>View Passenger List</span>
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default JourneyCard;