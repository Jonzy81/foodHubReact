import React, { useEffect, useState } from 'react';

export default function StepSelectTime({ time, setTime, selectedDate, partySize, onNext, onBack }) {
    const [availableTimes, setAvailableTimes] = useState([]);

    const allTimes = [
        '17:00', '17:30', '18:00', '18:30',
        '19:00', '19:30', '20:00', '20:30', '21:00',
    ];

    const normalizeTime = (timeStr) => timeStr.slice(0, 5); // "17:00:00" => "17:00"

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            console.log("fetching times", selectedDate, partySize)
            if (selectedDate && partySize) {
                try {
                    const response = await fetch(
                        `https://localhost:7279/api/Table/available-times?date=${selectedDate}&numberOfSeats=${partySize}`
                    );
                    if (!response.ok) throw new Error("Kunde inte hämta tider");

                    const data = await response.json();
                    console.log("Raw times from API:", data);

                    const normalized = data.map(normalizeTime);
                    setAvailableTimes(normalized); // ✅ Now setting the normalized times

                } catch (error) {
                    console.error(error);
                    console.log("selectedDate or partySize missing");
                }
            }
        };

        fetchAvailableTimes();
    }, [selectedDate, partySize]);

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Välj tid</h2>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {allTimes.map((t) => {
                    const isAvailable = availableTimes.includes(t);
                    return (
                        <button
                            key={t}
                            onClick={() => isAvailable && setTime(t)}
                            className={`px-4 py-2 rounded border ${isAvailable
                                ? (time === t
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white text-black hover:bg-emerald-100")
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                }`}
                            disabled={!isAvailable}
                        >
                            {t}
                        </button>
                    );
                })}
            </div>

            <div className="flex gap-4">
                <button onClick={onBack} className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">
                    ‹ Tillbaka
                </button>
                <button
                    onClick={onNext}
                    disabled={!time}
                    className={`px-6 py-2 rounded ${time
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                >
                    Nästa ›
                </button>
            </div>
        </div>
    );
}
