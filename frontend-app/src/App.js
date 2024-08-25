import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState({});
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleInputChange = (event) => {
        setJsonInput(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            if (!parsedData.data) {
                setError('Invalid JSON format: Missing "data" key');
                return;
            }

            const response = await fetch('http://localhost:5000/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedData),
            });

            const result = await response.json();
            setResponseData(result);
            setError('');
            setShowDropdown(true);
        } catch (e) {
            setError('Invalid JSON format');
        }
    };

    const handleOptionChange = (event) => {
        const options = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const renderResponse = () => {
        let output = {};
        if (selectedOptions.includes('Alphabets')) {
            output.alphabets = responseData.alphabets;
        }
        if (selectedOptions.includes('Numbers')) {
            output.numbers = responseData.numbers;
        }
        if (selectedOptions.includes('Highest lowercase alphabet')) {
            output.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
        }
        return output;
    };

    return (
        <div className="App">
            <h1>Your Roll Number</h1>
            <input
                type="text"
                placeholder='Enter JSON'
                value={jsonInput}
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {showDropdown && (
                <div>
                    <label>Select Options: </label>
                    <select multiple onChange={handleOptionChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                </div>
            )}
            {selectedOptions.length > 0 && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(renderResponse(), null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
