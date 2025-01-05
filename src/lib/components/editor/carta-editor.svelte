<script lang="ts">
  import { Carta, MarkdownEditor, type Labels } from "carta-md";
  import { emoji } from "@cartamd/plugin-emoji";
  import { slash } from "@cartamd/plugin-slash";
  import { code } from "@cartamd/plugin-code";
  import DOMPurify from "isomorphic-dompurify";

  import "@cartamd/plugin-slash/default.css";
  import "@cartamd/plugin-emoji/default.css";
  import "@cartamd/plugin-code/default.css";

  type CartaEditorProps = {
    value: string;
    labels?: Partial<Labels> | undefined;
    selectedTab?: "preview" | "write" | undefined;
    mode?: "auto" | "split" | "tabs" | undefined;
    disableToolbar?: boolean | undefined;
  };

  const carta = new Carta({
    extensions: [emoji(), slash(), code()],
    rendererDebounce: 250,
    sanitizer: DOMPurify.sanitize
  });

  let {
    value = $bindable(),
    labels = {},
    selectedTab = "write",
    mode = "auto",
    disableToolbar = false
  }: CartaEditorProps = $props();
</script>

<MarkdownEditor {carta} bind:value {labels} {selectedTab} {mode} {disableToolbar} />

<style>
  /* Set your monospace font (Required to have the editor working correctly!) */
  :global(.carta-font-code) {
    font-size: 0.875rem;
  }
</style>
