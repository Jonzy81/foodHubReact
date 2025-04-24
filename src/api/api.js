export const fetchAvailableTables = async (date, time) => {
    const response = await fetch(`https://localhost:7279/api/Table/available?date=${date}&time=${time}`);
    if (!response.ok) {
        throw new Error('Could not fetch available tables');
    }
    return response.json();
};