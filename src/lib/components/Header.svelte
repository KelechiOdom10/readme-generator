<script lang="ts">
  import { readmeStore } from "$lib/stores/readme-store.svelte";
  import Button from "./ui/button/button.svelte";
  import * as Sidebar from "./ui/sidebar";
  import logo from "$lib/assets/logo.png";

  function downloadReadme() {
    const element = document.createElement("a");
    const content = readmeStore.preview;
    const file = new Blob([content], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
</script>

<header
  class="bg-sidebar-background dark:bg-gray-850 border-gray-25 dark:border-gray-850 flex items-center justify-between border-b p-4"
>
  <div class="flex items-center gap-2">
    <Sidebar.Trigger />
    <img alt="The project logo" src={logo} class="h-8" />
    <h1 class="ml-2 hidden text-xl font-bold sm:block">README Generator</h1>
  </div>
  <div class="flex items-center">
    <Button onclick={downloadReadme}>Download README</Button>
  </div>
</header>
