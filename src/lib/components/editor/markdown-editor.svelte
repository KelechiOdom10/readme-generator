<script lang="ts">
  import Input from "../ui/input/input.svelte";
  import CartaEditor from "./carta-editor.svelte";
  import { readmeStore } from "$lib/stores/readme-store.svelte";
  import Button from "../ui/button/button.svelte";
  import * as Tooltip from "../ui/tooltip";
  import { RefreshCcwIcon, TrashIcon } from "lucide-svelte";
  import { sectionTemplates } from "../../../data/section-templates";

  export let title: string;
  export let content: string;
  let debounceTimeout: number;

  function resetSection() {
    const template = sectionTemplates.find((t) => t.title === title);
    if (!template) return;
    content = template.markdown;
  }

  function deleteSection() {
    readmeStore.deleteSection(title);
    const remainingSections = readmeStore.selectedSections;
    if (remainingSections.length > 0) {
      readmeStore.setCurrentSection(remainingSections[0]);
    } else {
      readmeStore.setCurrentSection(null);
    }
  }

  // Reactive statement to update store when content changes with debouncing
  $: {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      readmeStore.updateSectionContent(content);
    }, 400);
  }
</script>

<div class="flex h-full w-full flex-col gap-4">
  <div class="flex items-center gap-2">
    <div class="flex w-full items-center justify-between gap-1.5">
      <Input
        bind:value={title}
        placeholder="Title"
        readonly
        disabled
        class="w-fit disabled:cursor-default disabled:opacity-90"
      />
      <Tooltip.Provider>
        <div class="flex items-center gap-0">
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Button variant="ghost" size="icon" onclick={resetSection}>
                <RefreshCcwIcon />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" align="center">Refresh</Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <Button variant="ghost" size="icon" class="text-destructive" onclick={deleteSection}>
                <TrashIcon />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" align="center">Delete</Tooltip.Content>
          </Tooltip.Root>
        </div>
      </Tooltip.Provider>
    </div>
  </div>
  <CartaEditor
    bind:value={content}
    labels={{
      previewTab: undefined,
      writeTab: undefined
    }}
  />
</div>
