import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { journeys } from '../data/journeys';
import { readExcelFile } from '../utils/excelReader';

const PassengerList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [passengers, setPassengers] = useState([]);
    const [filteredPassengers, setFilteredPassengers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const journey = journeys.find(j => j.id === parseInt(id));

    useEffect(() => {
        if (!journey) {
            setError('Journey not found');
            setLoading(false);
            return;
        }

        const loadPassengers = async () => {
            try {
                setLoading(true);
                const data = await readExcelFile(`/data/${journey.dataFile}`);
                setPassengers(data);
                setFilteredPassengers(data);
                setError(null);
            } catch (err) {
                setError('Failed to load passenger data. Please make sure the Excel file exists in the public/data folder.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadPassengers();
    }, [id, journey]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPassengers(passengers);
        } else {
            const filtered = passengers.filter(passenger =>
                passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                passenger.seatNo.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPassengers(filtered);
        }
    }, [searchTerm, passengers]);

    if (!journey) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Journey Not Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading passenger data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                    <svg
                        className="w-16 h-16 text-red-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-8">
            <div className="container mx-auto px-4 py-8">
                {/* Journey Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className={`bg-gradient-to-r ${journey.gradient} h-2 -mx-6 -mt-6 mb-4 rounded-t-xl`}></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        {journey.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{journey.route}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
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
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="font-semibold">Total Passengers: {passengers.length}</span>
                        </div>
                        {searchTerm && (
                            <div className="flex items-center space-x-2">
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
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                </svg>
                                <span>Showing: {filteredPassengers.length}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or seat number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                        />
                        <svg
                            className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Passenger Table */}
                {filteredPassengers.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <svg
                            className="w-16 h-16 text-gray-300 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <p className="text-gray-500 text-lg">No passengers found matching your search.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            S.No
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Sex
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Age
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Seat No.
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredPassengers.map((passenger, index) => (
                                        <tr
                                            key={passenger.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {passenger.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${passenger.sex === 'M' || passenger.sex === 'Male'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-pink-100 text-pink-800'
                                                    }`}>
                                                    {passenger.sex}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {passenger.age}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                    {passenger.seatNo}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {filteredPassengers.map((passenger, index) => (
                                <div key={passenger.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Passenger #{index + 1}</div>
                                            <h3 className="text-lg font-bold text-gray-900">{passenger.name}</h3>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${passenger.sex === 'M' || passenger.sex === 'Male'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-pink-100 text-pink-800'
                                            }`}>
                                            {passenger.sex}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center space-x-2">
                                            <svg
                                                className="w-4 h-4 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <div>
                                                <div className="text-xs text-gray-500">Age</div>
                                                <div className="text-sm font-semibold text-gray-900">{passenger.age}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <svg
                                                className="w-4 h-4 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <div>
                                                <div className="text-xs text-gray-500">Seat</div>
                                                <div className="text-sm font-semibold text-indigo-600">{passenger.seatNo}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default PassengerList;