import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER } from "./Server";
import { FaUserCircle } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch search results
  const fetchResults = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER}/user/users/search`, {
        params: { q: searchQuery }, // Send query as parameter
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setLoading(false);
    }
  };

  // Update results when query changes
  useEffect(() => {
    if (query) {
      fetchResults(query);
    } else {
      setResults([]);
    }
  }, [query]);

  // Function to handle the click on a user from the search results
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`); // Navigate to the user's profile page
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <label htmlFor="Search">Search :</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
        placeholder="Search by name or ID..."
      />

      {loading && (
        <div className="absolute left-0 right-0 mt-2 p-2">Loading...</div>
      )}

      {!loading && results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-auto">
          {results.map((user) => (
            <li
              key={user._id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleUserClick(user._id)}
            >
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}
              <div>
                {/* Display user's full name and username */}
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
