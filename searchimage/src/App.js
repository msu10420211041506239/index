import React, { useState } from 'react';
import './App.css';

const accessKey = "bJcFMa9rMa37hivLmwRVbGQlQap-WhsCQWS5pBnwlrU";

const App = () => {
    const [keyword, setKeyword] = useState("");
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const searchImage = async () => {
        setLoading(true);
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setImages(data.results);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        setImages([]); 
        searchImage();
    };

    const loadMoreImages = () => {
        setPage(prevPage => prevPage + 1);
        searchImage();
    };

    return (
        <div className="app">
            <h1>Image Search Engine</h1>
            <form id="ab" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="cd"
                    placeholder="Search anything here"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" id="searchButton">Search</button>
            </form>
            <div id="imageContainer">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    images.map((result) => (
                        <div key={result.id} className="image-item">
                            <img src={result.urls.small} alt={result.alt_description} />
                        </div>
                    ))
                )}
            </div>
            {images.length > 0 && !loading && (
                <button id="showmore" onClick={loadMoreImages}>Show More</button>
            )} 
        </div>
    );
};

export default App;
