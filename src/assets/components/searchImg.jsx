import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const UNSPLASH_API_KEY = '2WVs4vQ4AN5FlzrQl-U9wg6RYEqLk8IjyEVOU_G1Uew';

  const searchImages = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: query,
          per_page: 10
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`
        }
      });

      setImages(response.data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    searchImages();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search for Images</h1>
      <div>
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={handleInputChange}
          style={{ padding: '10px', fontSize: '16px', width: '300px' }}
        />
        <button onClick={handleSearchClick} style={{ padding: '10px 15px', marginLeft: '10px' }}>
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '20px' }}>
          {images.map((image) => (
            <div key={image.id}>
              <img src={image.urls.small} alt={image.alt_description} style={{ width: '100%', borderRadius: '10px' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
