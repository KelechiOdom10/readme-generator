import { browser } from "$app/environment";
import { sectionTemplates } from "../data/section-templates";
import type { Section } from "../types/readme";

const STORAGE_KEY = "readme-sections";

export function loadSections(): Section[] {
  try {
    if (!browser) return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    // show first 4 sections if there are no stored sections
    if (!stored) return sectionTemplates.slice(0, 4);

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
