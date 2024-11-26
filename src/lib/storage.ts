import { browser } from "$app/environment";
import type { Section } from "../types/readme";

const STORAGE_KEY = "readme-sections";

export function loadSections(): Section[] {
  try {
    if (!browser) return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load sections:", error);
    return [];
  }
}

export function saveSections(sections: Section[]) {
  if (!browser) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  } catch (error) {
    console.error("Failed to save sections:", error);
  }
}
