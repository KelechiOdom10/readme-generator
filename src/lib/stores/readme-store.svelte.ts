import { browser } from "$app/environment";
import type { Section } from "../../types/readme";
import { loadSections, saveSections } from "../storage";

export class ReadmeStore {
  #selectedSections = $state<Section[]>([]);
  #preview = $state("");

  constructor() {
    if (browser) {
      this.loadFromStorage();
    }
  }

  get selectedSections() {
    return this.#selectedSections;
  }

  get preview() {
    return this.#preview;
  }

  private loadFromStorage() {
    this.#selectedSections = loadSections();
    this.updatePreview();
  }

  addSection(template: Section) {
    const newSection = { ...template };
    this.#selectedSections = [...this.#selectedSections, newSection];
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
}

export const readmeStore = new ReadmeStore();
