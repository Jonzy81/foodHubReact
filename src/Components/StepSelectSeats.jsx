import React from 'react';

export default function StepSelectSeats({ partySize, setPartySize, onNext }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Hur många personer?</h2>

            <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="text-lg p-2 border border-gray-300 rounded mb-6"
            >
                {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1} person{i + 1 > 1 ? 'er' : ''}
                    </option>
                ))}
            </select>

            <button
                onClick={onNext}
                className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
            >
                Nästa
            </button>
        </div>
    );
}
