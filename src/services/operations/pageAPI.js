// claude

import { pageEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

export async function fetchPageContent(pageName) {
  try {
    const endpoint = pageEndpoints.FETCH_PAGE_CONTENT.replace(
      ":pageName",
      encodeURIComponent(pageName)
    );

    const response = await apiConnector("GET", endpoint);

    // Correctly navigate the Axios response structure
    if (
      response &&
      response.data &&
      response.data.success &&
      response.data.data &&
      response.data.data.content
    ) {
      return response.data.data.content;
    } else {
      console.error("Unexpected response structure:", response);
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching page content:", error);
    throw error;
  }
}

// new deepseek

// services/operations/pageAPI.js
export async function updatePageContent(pageName, content) {
  try {
    const endpoint = pageEndpoints.UPDATE_PAGE_CONTENT.replace(
      ":pageName",
      encodeURIComponent(pageName)
    );

    const response = await apiConnector("PUT", endpoint, {
      content,
    });

    if (response && response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Failed to update page content");
    }
  } catch (error) {
    console.error("Error updating page content:", error);
    throw error;
  }
}
