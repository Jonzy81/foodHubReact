import React from 'react';

export default function StepUserDetails({ userInfo, setUserInfo, onBack, onSubmit }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = () => {
        if (!userInfo.firstName || !userInfo.lastName || !userInfo.email || !userInfo.userPhoneNumber) {
            alert("Vänligen fyll i alla fält.");
            return;
        }
        onSubmit();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Fyll i dina uppgifter</h2>

            <input
                type="text"
                name="firstName"
                placeholder="Förnamn"
                value={userInfo.firstName}
                onChange={handleChange}
                className="mb-3 p-2 border rounded w-full max-w-md"
            />
            <input
                type="text"
                name="lastName"
                placeholder="Efternamn"
                value={userInfo.lastName}
                onChange={handleChange}
                className="mb-3 p-2 border rounded w-full max-w-md"
            />
            <input
                type="email"
                name="email"
                placeholder="E-post"
                value={userInfo.email}
                onChange={handleChange}
                className="mb-3 p-2 border rounded w-full max-w-md"
            />
            <input
                type="tel"
                name="userPhoneNumber"
                placeholder="Telefonnummer"
                value={userInfo.userPhoneNumber}
                onChange={handleChange}
                className="mb-6 p-2 border rounded w-full max-w-md"
            />

            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                    ‹ Tillbaka
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                >
                    Boka bord
                </button>
            </div>
        </div>
    );
}
