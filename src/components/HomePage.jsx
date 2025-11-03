import React, { useState, useEffect } from 'react';
import JourneyCard from './JourneyCard';
import { journeys } from '../data/journeys';
import { readExcelFile } from '../utils/excelReader';

const HomePage = () => {
    const [passengerCounts, setPassengerCounts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load passenger counts for all journeys
        const loadPassengerCounts = async () => {
            const counts = {};

            for (const journey of journeys) {
                try {
                    const data = await readExcelFile(`/data/${journey.dataFile}`);
                    counts[journey.id] = data.length;
                } catch (error) {
                    console.error(`Error loading ${journey.name}:`, error);
                    counts[journey.id] = 0;
                }
            }

            setPassengerCounts(counts);
            setLoading(false);
        };

        loadPassengerCounts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Welcome to Train Journey Portal
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Select a journey to view passenger details
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                    </div>
                )}

                {/* Journey Cards Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {journeys.map((journey) => (
                            <JourneyCard
                                key={journey.id}
                                journey={journey}
                                passengerCount={passengerCounts[journey.id] || 0}
                            />
                        ))}
                    </div>
                )}

                {/* Info Section */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <svg
                                className="w-6 h-6 mr-2 text-indigo-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Information
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-indigo-600 mr-2">•</span>
                                Click on any journey card to view the complete passenger list
                            </li>
                            <li className="flex items-start">
                                <span className="text-indigo-600 mr-2">•</span>
                                Passenger details include Name, Gender, Age, and Seat Number
                            </li>
                            <li className="flex items-start">
                                <span className="text-indigo-600 mr-2">•</span>
                                Use the search feature to find specific passengers quickly
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;