<script lang="ts">
  import Input from "../ui/input/input.svelte";
  import CartaEditor from "./carta-editor.svelte";
  import { readmeStore } from "$lib/stores/readme-store.svelte";

  export let title: string;
  export let content: string;
  let debounceTimeout: number;

  // Reactive statement to update store when content changes with debouncing
  $: {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      readmeStore.updateSectionContent(content);
    }, 400); // Adjust the delay as needed
  }
</script>

<div class="flex h-full w-full flex-col gap-4">
  <div class="flex items-center gap-2">
    <div class="grid h-10 w-full items-center gap-1.5">
      <Input
        bind:value={title}
        placeholder="Title"
        readonly
        disabled
        class="disabled:cursor-default disabled:opacity-90"
      />
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
