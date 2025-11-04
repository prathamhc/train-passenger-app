import * as XLSX from 'xlsx';

/**
 * Reads an Excel file and converts it to JSON format
 * @param {string} filePath - Path to the Excel file
 * @returns {Promise<Array>} Array of passenger objects
 */
export const readExcelFile = async (filePath) => {
    try {
        // Fetch the Excel file from the public folder
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        // Get the file as an array buffer
        const arrayBuffer = await response.arrayBuffer();

        // Parse the Excel file
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        // Convert worksheet to JSON
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Normalize the data (handle different column name variations)
        const normalizedData = data.map((row, index) => ({
            id: index + 1,
            name: row.Name || row.name || row.NAME || '',
            sex: row.Sex || row.sex || row.SEX || row.Gender || row.gender || '',
            age: row.Age || row.age || row.AGE || '',
            seatNo: row['Seat No.'] || row['Seat No'] || row.SeatNo || row['seat no'] || row.Seat || ''
        }));

        return normalizedData;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        throw error;
    }
};

/**
 * Validates if the passenger data has all required fields
 * @param {Array} data - Array of passenger objects
 * @returns {boolean} True if valid, false otherwise
 */
export const validatePassengerData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        return false;
    }

    // Check if at least the first row has required fields
    const firstRow = data[0];
    return firstRow.hasOwnProperty('name') &&
        firstRow.hasOwnProperty('sex') &&
        firstRow.hasOwnProperty('age') &&
        firstRow.hasOwnProperty('seatNo');
};