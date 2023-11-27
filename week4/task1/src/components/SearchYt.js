import React, { useState } from "react";
import axios from "axios";

const YtSearch = () => {
  // State untuk menyimpan kata kunci pencarian
  const [query, setQuery] = useState("");
  // State untuk menyimpan hasil pencarian dari YouTube
  const [videos, setVideos] = useState([]);
  // State untuk menyimpan video yang dipilih untuk ditampilkan
  const [selectedVideo, setSelectedVideo] = useState(null);
  // State untuk menyimpan indeks video yang sedang ditampilkan
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  // State untuk menangani status loading
  const [isLoading, setIsLoading] = useState(false);
  // State untuk menangani pesan kesalahan
  const [errorMessage, setErrorMessage] = useState("");

  // Fungsi untuk menangani pencarian video di YouTube
  const handleSearch = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (query.trim() === "") {
        throw new Error("Silakan masukkan kata kunci pencarian.");
      }

      // Melakukan permintaan ke API YouTube untuk mendapatkan hasil pencarian
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            q: query,
            part: "snippet",
            type: "video",
            maxResults: 10,
            key: "AIzaSyBZE3xKjzQU22szhWQuoJalCbWkAgxB9Jc",
          },
        }
      );

      // Mengupdate state dengan hasil pencarian
      setVideos(response.data.items);
      // Memilih video pertama secara otomatis
      setSelectedVideo(response.data.items[0]);
      // Reset indeks video yang sedang ditampilkan
      setSelectedVideoIndex(0);
    } catch (error) {
      console.error("Error saat mencari di YouTube:", error.message);
      setErrorMessage(
        error.message ||
          "Tidak dapat terhubung ke YouTube. Silakan coba lagi nanti."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menangani klik pada video dalam daftar hasil pencarian
  const handleVideoClick = (video, index) => {
    setSelectedVideo(video);
    setSelectedVideoIndex(index);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search YouTube"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {isLoading && <div className="mt-4">Loading...</div>}
      {errorMessage && <p className="mt-4 text-danger">{errorMessage}</p>}

      <div className="row mt-4">
        <div className="col-md-8">
          {/* Menampilkan video terpilih */}
          {selectedVideo && (
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item w-100"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                title={selectedVideo.snippet.title}
                width="560" // Sesuaikan lebar sesuai kebutuhan
                height="315" // Sesuaikan tinggi sesuai kebutuhan
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
              <div>
                <h5 className="text-start mt-3">
                  {selectedVideo.snippet.title}
                </h5>
                <p className="text-start fw-bold">
                  {selectedVideo.snippet.channelTitle}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-4">
          <div className="list-group">
            {/* Menampilkan daftar hasil pencarian */}
            {videos.map((video, index) => (
              <button
                key={video.id.videoId}
                type="button"
                className="list-group-item list-group-item-action d-flex justify-content-between"
                onClick={() => handleVideoClick(video, index)}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={video.snippet.thumbnails.default.url}
                    alt="Thumbnail"
                    className="mr-3"
                  />
                  <div className="text-start ms-3">
                    <p className="fw-bold">{video.snippet.title}</p>
                    <small>{video.snippet.channelTitle}</small>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YtSearch;
