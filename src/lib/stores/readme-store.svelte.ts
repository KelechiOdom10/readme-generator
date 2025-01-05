import { browser } from "$app/environment";
import type { Section } from "../../types/readme";
import { loadSections, saveSections } from "../storage";

export class ReadmeStore {
  #selectedSections = $state<Section[]>([]);
  #preview = $state("");
  #currentSection = $state<Section | null>(null);

  constructor() {
    if (browser) {
      this.loadFromStorage();
    }
  }

  initializeCurrentSection() {
    const savedCurrentSection = localStorage.getItem("currentSection");
    if (savedCurrentSection) {
      this.#currentSection = JSON.parse(savedCurrentSection);
    } else if (this.#selectedSections.length > 0) {
      this.#currentSection = this.#selectedSections[0];
      localStorage.setItem("currentSection", JSON.stringify(this.#currentSection));
    }
  }

  get selectedSections() {
    return this.#selectedSections;
  }

  get preview() {
    return this.#preview;
  }

  get currentSection() {
    return this.#currentSection;
  }

  private loadFromStorage() {
    this.#selectedSections = loadSections();
    this.updatePreview();
    this.initializeCurrentSection();
  }

  addSection(template: Section) {
    const newSection = { ...template };
    this.#selectedSections = [...this.#selectedSections, newSection];
    this.setCurrentSection(newSection);
    this.updatePreview();
    this.saveToStorage();
  }

  removeSection(index: number) {
    this.#selectedSections = this.#selectedSections.filter((_, i) => i !== index);
    this.updatePreview();
    this.saveToStorage();
  }

  moveSection(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === this.#selectedSections.length - 1)
    )
      return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const newSections = [...this.#selectedSections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    this.#selectedSections = newSections;
    this.updatePreview();
    this.saveToStorage();
  }

  private updatePreview() {
    this.#preview = this.#selectedSections.map((section) => section.markdown).join("\n");
  }

  private saveToStorage() {
    if (!browser) return;
    saveSections(this.#selectedSections);
  }

  setCurrentSection(section: Section | null) {
    this.#currentSection = section;
    localStorage.setItem("currentSection", JSON.stringify(section));
  }

  updateSectionContent(content: string) {
    if (!this.#currentSection) return;

    // Update the current section's markdown
    this.#currentSection.markdown = content;

    // Update the section in the selectedSections array
    const sectionIndex = this.#selectedSections.findIndex((s) => s.id === this.#currentSection?.id);

    if (sectionIndex !== -1) {
      this.#selectedSections[sectionIndex] = { ...this.#currentSection };
      this.updatePreview();
      this.saveToStorage();
      localStorage.setItem("currentSection", JSON.stringify(this.#currentSection));
    }
  }
}

export const readmeStore = new ReadmeStore();
