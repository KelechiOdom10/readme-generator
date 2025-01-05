<script lang="ts">
  import { readmeStore } from "$lib/stores/readme-store.svelte";
  import MarkdownEditor from "$lib/components/editor/markdown-editor.svelte";
  import MarkdownPreview from "$lib/components/preview/markdown-preview.svelte";

  let isPreviewMode = false;
</script>

<div class="container mx-auto flex min-h-screen flex-col gap-4 p-4">
  <div class="grid w-full flex-1 gap-8 md:grid-cols-2">
    <!-- Editor -->
    <div class={isPreviewMode ? "hidden md:block" : ""}>
      <h2 class="mb-4 text-xl font-semibold">Editor</h2>
      {#if readmeStore.currentSection}
        <div class="h-[85svh]">
          <MarkdownEditor
            title={readmeStore.currentSection.title}
            content={readmeStore.currentSection.markdown}
          />
        </div>
      {/if}
    </div>

    <!-- Preview -->
    <div class={!isPreviewMode ? "hidden md:block" : ""}>
      <MarkdownPreview bind:value={readmeStore.preview} />
    </div>
  </div>
</div>
