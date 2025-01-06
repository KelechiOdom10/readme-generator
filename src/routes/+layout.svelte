<script lang="ts">
  import "@fontsource-variable/space-grotesk";
  import "../app.css";

  import * as Sidebar from "$lib/components/ui/sidebar";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  let { children } = $props();
</script>

<svelte:head>
  <title>README Generator</title>
  <meta
    name="description"
    content="Use Readmegen's editor to create a README. It is the easiest way to create a README for your projects"
  />
  <meta
    name="keywords"
    content="readme, generator, readme generator, easiest, create, markdown, git, github, gitlab"
  />
  <meta property="og:title" content="README Generator" />
  <meta property="og:description" content="The easiest way to create a README" />
  <meta property="og:image" content="https://readmegen.pages.dev/logo.png" />
  <meta property="og:url" content="https://readmegen.pages.dev" />
</svelte:head>

<Sidebar.Provider>
  <AppSidebar />
  <main>
    {@render children?.()}
  </main>
</Sidebar.Provider>
