import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function StepSelectDate({ selectedDate, setSelectedDate, onNext, onBack }) {
    const today = new Date();

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Välj datum</h2>

            <DatePicker
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={(date) => setSelectedDate(date.toISOString().split("T")[0])}
                minDate={today}
                dateFormat="yyyy-MM-dd"
                className="text-lg p-2 border border-gray-300 rounded mb-6"
                placeholderText="Välj ett datum"
            />

            <div className="flex gap-4">
                <button onClick={onBack} className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">
                    ‹ Tillbaka
                </button>
                <button
                    onClick={onNext}
                    disabled={!selectedDate}
                    className={`px-6 py-2 rounded ${selectedDate
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
