<script lang="ts">
  import CartaEditor from "../editor/carta-editor.svelte";

  let { value = $bindable() } = $props();
</script>

<div
  class="
  prose prose-zinc dark:prose-invert
  prose-headings:text-foreground prose-p:text-secondary-foreground prose-a:text-blue-400
  prose-code:text-foreground! prose-pre:text-foreground! prose-pre:bg-gray-900/95! dark:prose-pre:bg-secondary!
  prose-ul:text-secondary-foreground
  prose-li:text-secondary-foreground
  h-full w-full"
>
  <CartaEditor
    bind:value
    labels={{ previewTab: undefined, writeTab: undefined }}
    selectedTab="preview"
    mode="tabs"
    disableToolbar
  />
</div>
