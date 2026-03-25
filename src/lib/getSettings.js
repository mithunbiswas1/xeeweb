// src/lib/getSettings.js

import { API_BASE_URL } from "@/redux/url/url";

export async function getSettings() {
  const res = await fetch(`${API_BASE_URL}setting`, {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  return res.json();
}
