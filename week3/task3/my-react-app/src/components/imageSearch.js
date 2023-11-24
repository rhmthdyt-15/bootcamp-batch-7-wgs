import React, { useState } from "react";
import axios from "axios";
import "../ImageSearch.css"; // Import file CSS terpisah

const ImageSearch = (props) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: query,
            client_id:
              "2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296",
          },
        }
      );
      console.log(response);
      setImages(response.data.results);

      // Menyampaikan data gambar ke komponen induk melalui props
      if (props.onImagesLoaded) {
        props.onImagesLoaded(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <div className="unsplash-image-search">
        <h1>Image Search</h1>
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <div className="masonry-layout">
          {images.map((image) => (
            <a
              key={image.id}
              href={image.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="masonry-item"
            >
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className="masonry-img"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSearch;
