<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { readmeStore } from "$lib/stores/readme-store.svelte";
  import { sectionTemplates } from "../data/section-templates";
</script>

<main class="container mx-auto p-4">
  <h1 class="mb-6 text-3xl font-bold">README Generator</h1>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
      <h2 class="mb-4 text-xl font-semibold">Available Templates</h2>
      <div class="space-y-4">
        {#each sectionTemplates as template}
          <div class="rounded-lg border p-4">
            <h3 class="font-medium">{template.title}</h3>
            <Button
              variant="secondary"
              class="mt-2"
              onclick={() => readmeStore.addSection(template)}
            >
              Add Section
            </Button>
          </div>
        {/each}
      </div>
    </div>

    <div>
      <h2 class="mb-4 text-xl font-semibold">Your README Sections</h2>
      <div class="space-y-4">
        {#if readmeStore.selectedSections.length === 0}
          <p class="text-gray-500">
            No sections added yet. Select templates from the left to build your README.
          </p>
        {:else}
          {#each readmeStore.selectedSections as section, index}
            <div class="rounded-lg border p-4">
              <div class="flex items-center justify-between">
                <h3 class="font-medium">{section.title}</h3>
                <div class="space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onclick={() => readmeStore.moveSection(index, "up")}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onclick={() => readmeStore.moveSection(index, "down")}
                    disabled={index === readmeStore.selectedSections.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onclick={() => readmeStore.removeSection(index)}
                  >
                    ×
                  </Button>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>

      {#if readmeStore.selectedSections.length > 0}
        <div class="mt-6">
          <h2 class="mb-4 text-xl font-semibold">Preview</h2>
          <div class="bg-muted rounded-lg border p-4 font-mono whitespace-pre-wrap">
            {readmeStore.preview}
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
