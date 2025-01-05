<script lang="ts">
  import { readmeStore } from "$lib/stores/readme-store.svelte";
  import MarkdownEditor from "$lib/components/editor/markdown-editor.svelte";
  import MarkdownPreview from "$lib/components/preview/markdown-preview.svelte";
  import Header from "$lib/components/Header.svelte";
  import * as Tabs from "$lib/components/ui/tabs/index";
  import { Button } from "$lib/components/ui/button";
  import { CheckCheckIcon, CopyIcon } from "lucide-svelte";

  let activeView = $state<"editor" | "preview">("editor");
  let showTick = $state(false);

  function copyToClipboard() {
    const previewContent = readmeStore.preview;
    navigator.clipboard.writeText(previewContent).then(() => {
      showTick = true;
      setTimeout(() => (showTick = false), 2000);
    });
  }
</script>

<main class="flex min-h-screen flex-col">
  <Header />
  <div class="container mx-auto flex flex-col gap-4 p-4">
    <div class="flex items-center gap-2">
      <Tabs.Root bind:value={activeView} class="w-[400px] md:hidden">
        <Tabs.List>
          <Tabs.Trigger value="editor">Editor</Tabs.Trigger>
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Button
        aria-label="Copy readme to clipboard"
        variant="secondary"
        size="icon"
        class="ml-auto"
        onclick={copyToClipboard}
      >
        {#if showTick}
          <CheckCheckIcon />
        {:else}
          <CopyIcon />
        {/if}
      </Button>
    </div>
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
