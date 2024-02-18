import React from "react";
import axios from "axios";

const FileInput = ({ setKeywords }) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("doc", file);

      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiUrl = `https://api.meaningcloud.com/topics-2.0?key=${apiKey}&lang=en`;

        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (
          response.status === 200 &&
          response.data &&
          response.data.concept_list
        ) {
          const uniqueKeywords = Array.from(
            new Set(response.data.concept_list.map((concept) => concept.form))
          );
          setKeywords(uniqueKeywords);
        } else {
          console.error(
            "Error: Unexpected response from the API",
            response.data
          );
        }
      } catch (error) {
        console.error("Error communicating with the server:", error);
      }
    }
  };

  return (
    <div className="file-input">
      <label htmlFor="upload" className="upload-btn">
        Upload PDF
      </label>
      <input
        type="file"
        accept=".pdf"
        id="upload"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
