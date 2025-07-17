import React, { useEffect, useState } from 'react';

const AllTableSearch = ({ value, onChange, onDebouncedChange, placeholder = "Search...", delay = 800 }) => {

    const [inputValue, setInputValue] = useState(value || "");

    // keep internal input value in sync with external changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // debounce logic
    useEffect(() => {
        const timeout = setTimeout(() => {
            onDebouncedChange?.(inputValue);
        }, delay);

        return () => clearTimeout(timeout);
    }, [inputValue, delay, onDebouncedChange]);


    return (
        <div className="w-full mb-4">
            <input
                type="search"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    onChange?.(e.target.value);
                }}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
        </div>
    );
};

export default AllTableSearch;
