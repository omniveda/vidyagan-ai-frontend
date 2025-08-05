// claude

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchPageContent,
  updatePageContent,
} from "../services/operations/pageAPI";
import RichTextEditor from "../components/common/RichTextEditor";

const pages = [
  { name: "Privacy Policy", key: "privacy-policy" },
  { name: "Cookie Policy", key: "cookie-policy" },
  { name: "Report", key: "report" },
  { name: "Terms and Conditions", key: "terms-and-conditions" },
];

function EditPage() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(pages[0].key);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content when selected page changes
  useEffect(() => {
    console.log("Current token:", localStorage.getItem("token"));
    const getPageContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const pageContent = await fetchPageContent(selectedPage);
        setContent(pageContent);
      } catch (err) {
        console.error("Error fetching page content:", err);
        setError("Failed to load page content. Please try again.");
        setContent(""); // Reset content on error
      } finally {
        setIsLoading(false);
      }
    };

    getPageContent();
  }, [selectedPage]);

  const handleSave = async () => {
    try {
      await updatePageContent(selectedPage, content);
      alert("Page content updated successfully!");
    } catch (error) {
      if (error.message.includes("Authentication required")) {
        alert(
          "You must be logged in as an admin to update content. Please log in again."
        );
        // Optionally redirect to login
        navigate("/login");
      } else {
        console.error("Error updating page content:", error);
        alert(`Failed to update page content: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Pages</h1>

      {/* Page Selection Dropdown */}
      <div className="mb-4">
        <label htmlFor="pageSelect" className="block text-sm font-medium mb-1">
          Select Page to Edit:
        </label>
        <select
          id="pageSelect"
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="p-2 border rounded w-full md:w-64"
        >
          {pages.map((page) => (
            <option key={page.key} value={page.key}>
              {page.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="my-4 p-4 bg-gray-100 rounded text-center">
          Loading content...
        </div>
      ) : error ? (
        <div className="my-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      ) : (
        <>
          {/* Rich Text Editor */}
          <div className="mb-4">
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditPage;
