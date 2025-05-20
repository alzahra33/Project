import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const FileUploadDownload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch uploaded file list
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/files");
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("http://localhost:3001/upload", formData);
      alert("File uploaded successfully.");
      setSelectedFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:3001/download/${filename}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download the file.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Upload and Download Files</h2>

      <div className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <input type="file" onChange={handleFileChange} className="form-control" />
        </div>
        <button onClick={handleUpload} className="btn btn-primary w-100">
          Upload
        </button>
      </div>

      <div className="card p-4 shadow-sm">
        <h5>Available Files:</h5>
        {uploadedFiles.length > 0 ? (
          <ul className="list-group">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {file}
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => handleDownload(file)}
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default FileUploadDownload;
