import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultsTable from './ResultsTable';
import './styles.css';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState('PartNumber');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm) {
      setFilteredResults([]);
      return;
    }

    const searchValue = searchTerm;
    const fetchData = async () => {
      try {
        const response = await axios.get('https://expdealerportal-906dba29157e.herokuapp.com/', {
          params: {
            [selectedOption]: searchValue,
          },
        });

        const data = response.data;
        setFilteredResults(data.slice(0, 40)); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm, selectedOption]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/search', {
        params: {
          [selectedOption]: searchTerm,
        },
      });
      const data = response.data;
      console.log("API response data:", data);
  
      if (data.length > 0) {
        setSelectedResult(data[0]);
      } else {
        setSelectedResult(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="search-container">
          <div className="search-box">
            <input
              className="search-input"
              type="text"
              placeholder={`Search ${selectedOption}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <div className="dropdown">
              {filteredResults.length > 0 && (
                <ul className="dropdown-menu">
                  {filteredResults.map((result, index) => (
                    <li
                      key={index}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedResult(result);
                        setSearchTerm(result.PartNumber);
                        setFilteredResults([]);
                      }}
                    >
                      {result.PartNumber}-{result.LongDescription}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="PartNumber">Part Number</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="category">Category</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <ResultsTable selectedResult={selectedResult} />
    </div>
  );
};

export default Search;
