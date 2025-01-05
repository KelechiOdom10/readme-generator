<script lang="ts">
  import { readmeStore } from "$lib/stores/readme-store.svelte";
  import MarkdownEditor from "$lib/components/editor/markdown-editor.svelte";
  import MarkdownPreview from "$lib/components/preview/markdown-preview.svelte";
  import Header from "$lib/components/Header.svelte";
  import * as Tabs from "$lib/components/ui/tabs/index";

  let activeView = $state<"editor" | "preview">("editor");
</script>

<main class="flex min-h-screen flex-col">
  <Header />
  <div class="container mx-auto flex flex-col gap-4 p-4">
      <Tabs.Root bind:value={activeView} class="w-[400px] md:hidden">
        <Tabs.List>
          <Tabs.Trigger value="editor">Editor</Tabs.Trigger>
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    <div class="grid w-full flex-1 gap-8 md:grid-cols-2">
      <div class={activeView === "preview" ? "hidden md:block" : "block"}>
        {#if readmeStore.currentSection}
          <div>
            <MarkdownEditor
              title={readmeStore.currentSection.title}
              content={readmeStore.currentSection.markdown}
            />
          </div>
        {/if}
      </div>

      <!-- Preview -->
      <div class={activeView === "editor" ? "hidden md:block" : "block"}>
        <MarkdownPreview bind:value={readmeStore.preview} />
      </div>
    </div>
  </div>
</main>
