import React, { useState, useEffect } from 'react';
import StepSelectSeats from './StepSelectSeats';
import StepSelectDate from './StepSelectDate';
import StepSelectTime from './StepSelectTime';
import StepUserDetails from './StepUserDetails';


export default function BookingFlow() {
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [step, setStep] = useState(1);
    const [partySize, setPartySize] = useState(2);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userPhoneNumber: ''
    });
    const [availableTables, setAvailableTables] = useState([]);
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    useEffect(() => {
        const fetchTables = async () => {
            if (selectedDate && selectedTime) {
                try {
                    const response = await fetch(`https://localhost:7279/api/Table/available?date=${selectedDate}&time=${selectedTime}&numberOfSeats=${partySize}`);

                    if (!response.ok) throw new Error('Kunde inte hämta tillgängliga bord');
                    const tables = await response.json();
                    setAvailableTables(tables);
                    if (tables.length > 0) {
                        setSelectedTableId(tables[0].tableId); // auto-select first available table
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        if (selectedDate && selectedTime) {
            fetchTables();
        }
    }, [selectedDate, selectedTime]);

    const handleBookingSubmit = async () => {
        try {
            // Skapa användaren först
            const userResponse = await fetch('https://localhost:7279/api/User/CreateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...userDetails
                })
            });

            if (!userResponse.ok) throw new Error('Kunde inte skapa användaren');

            const createdUser = await userResponse.json();
            console.log("Created User:", createdUser);
            const userId = createdUser.userId;

            // Omvandla datum och tid till objekt
            const [year, month, day] = selectedDate.split('-').map(Number);
            const [hour, minute] = selectedTime.split(':').map(Number);
            const formattedTime = selectedTime.length === 5 ? `${selectedTime}:00` : selectedTime;

            const bookingPayload = {
                bookingDate: selectedDate,
                bookingTime: formattedTime,
                numberOfSeats: partySize,
                userId: userId,
                tableId: Number(selectedTableId)
            };
            console.log("Selected tableId: ", selectedTableId);

            console.log("BookingPayload", bookingPayload);

            const bookingResponse = await fetch('https://localhost:7279/api/Booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            if (!bookingResponse.ok) throw new Error('Misslyckades med att boka bord');

            alert('Bokning skapad!');


        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {step === 1 && (
                <StepSelectSeats
                    partySize={partySize}
                    setPartySize={setPartySize}
                    onNext={nextStep}
                />
            )}
            {step === 2 && (
                <StepSelectDate
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    onNext={nextStep}
                    onBack={prevStep}
                />
            )}
            {step === 3 && (
                <>
                    {console.log("Rendering StepSelectTime with", { selectedDate, partySize })}
                    <StepSelectTime
                        time={selectedTime}
                        setTime={setSelectedTime}
                        selectedDate={selectedDate}
                        partySize={partySize}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                </>
            )}
            {step === 4 && (
                <StepUserDetails
                    userInfo={userDetails}
                    setUserInfo={setUserDetails}
                    onBack={prevStep}
                    onSubmit={handleBookingSubmit}
                />
            )}
        </div>
    );
}
