<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import PlusIcon from "lucide-svelte/icons/plus";
  import Input from "./ui/input/input.svelte";
  import { sectionTemplates } from "../../data/section-templates";
  import { ReadmeStore } from "$lib/stores/readme-store.svelte";
  import Button from "./ui/button/button.svelte";
  import { cn } from "$lib/utils";

  const store = new ReadmeStore();
  let searchQuery = $state("");

  const filteredTemplates = $derived(
    sectionTemplates.filter((section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
</script>

<Sidebar.Root side="left" variant="sidebar">
  <Sidebar.Content class="h-screen overflow-hidden">
    <Sidebar.Group>
      <Sidebar.GroupLabel>Sections</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each store.selectedSections as selectedSection}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {selectedSection.title}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Templates</Sidebar.GroupLabel>
      <Input placeholder="Search templates" bind:value={searchQuery} />
      <Button class="mt-5 mb-3">
        <PlusIcon />
        <span>Custom section</span>
      </Button>
      <Sidebar.GroupContent class="relative">
        <Sidebar.Menu
          class="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted max-h-[calc(100vh-22rem)] space-y-2.5 overflow-y-auto"
        >
          {#each filteredTemplates as section, i}
            <Sidebar.MenuItem class={cn("px-1", { "mt-1": i === 0 })}>
              <Sidebar.MenuButton onclick={() => store.addSection(section)}>
                <span>{section.title}</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
        {#if filteredTemplates.length === 0}
          <p class="text-muted-foreground text-sm">No templates found</p>
        {/if}
        <div
          class={cn(
            "from-background pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t to-transparent",
            {
              "opacity-100": filteredTemplates.length > 10,
              "opacity-0": filteredTemplates.length <= 10
            }
          )}
        ></div>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
