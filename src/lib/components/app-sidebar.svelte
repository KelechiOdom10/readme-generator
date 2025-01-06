<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import GripVerticalIcon from "lucide-svelte/icons/grip-vertical";
  import Input from "./ui/input/input.svelte";
  import { sectionTemplates } from "../../data/section-templates";
  import { readmeStore } from "$lib/stores/readme-store.svelte";
  import { cn } from "$lib/utils";
  import type { Section } from "../../types/readme";
  import { draggable, droppable, type DragDropState } from "@thisux/sveltednd";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";

  let searchQuery = $state("");

  const filteredTemplates = $derived(
    sectionTemplates
      .filter(
        (template) => !readmeStore.selectedSections.some((section) => section.id === template.id)
      )
      .filter((template) => template.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalSectionsLength = $derived(
    filteredTemplates.length + readmeStore.selectedSections.length
  );

  function handleDrop(state: DragDropState<Section>) {
    const { draggedItem, targetContainer } = state;
    const dragIndex = readmeStore.selectedSections.findIndex(
      (item: Section) => item.id === draggedItem.id
    );
    const dropIndex = parseInt(targetContainer ?? "0");

    if (dragIndex !== -1 && !isNaN(dropIndex)) {
      const [item] = readmeStore.selectedSections.splice(dragIndex, 1);
      readmeStore.selectedSections.splice(dropIndex, 0, item);
      readmeStore.updatePreview();
      readmeStore.saveToStorage();
    }
  }
</script>

<Sidebar.Root side="left" variant="sidebar">
  <Sidebar.Content class="h-screen">
    <Sidebar.Group>
      <hgroup class="mb-3 flex flex-col space-y-0">
        <Sidebar.Header class="font-semibold">Sections</Sidebar.Header>
        <Sidebar.SidebarGroupLabel>
          Click on a section below to edit the contents
        </Sidebar.SidebarGroupLabel>
      </hgroup>
      <Sidebar.GroupContent>
        <Sidebar.Menu class="space-y-2">
          {#each readmeStore.selectedSections as selectedSection, index (selectedSection.id)}
            <div
              use:draggable={{ container: index.toString(), dragData: selectedSection }}
              use:droppable={{
                container: index.toString(),
                callbacks: { onDrop: handleDrop }
              }}
              animate:flip={{ duration: 200 }}
              in:fade={{ duration: 150 }}
              out:fade={{ duration: 150 }}
            >
              <Sidebar.MenuItem>
                <Sidebar.MenuButton
                  variant="outline"
                  class={cn("svelte-dnd-touch-feedback", {
                    "outline-primary-600 dark:outline-primary-800 outline":
                      selectedSection.id === readmeStore.currentSection?.id
                  })}
                  onclick={() => readmeStore.setCurrentSection(selectedSection)}
                >
                  <GripVerticalIcon class="size-5 cursor-grab" />
                  {selectedSection.title}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </div>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
    <Sidebar.Group>
      <hgroup class="mb-3 flex flex-col space-y-0">
        <Sidebar.Header class="font-semibold">Templates</Sidebar.Header>
        <Sidebar.SidebarGroupLabel
          >Click on a section below to add it to your readme</Sidebar.SidebarGroupLabel
        >
      </hgroup>
      <Input placeholder="Search templates" bind:value={searchQuery} class="mb-3" />
      <!-- <Button class="mt-5 mb-3">
        <PlusIcon />
        <span>Custom section</span>
      </Button> -->
      <Sidebar.GroupContent class="relative">
        <Sidebar.Menu
          class="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted space-y-2.5 overflow-y-auto pb-12"
        >
          {#each filteredTemplates as section, i}
            <Sidebar.MenuItem class={cn("px-1", { "mt-1": i === 0 })}>
              <Sidebar.MenuButton variant="outline" onclick={() => readmeStore.addSection(section)}>
                <span>{section.title}</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
        {#if filteredTemplates.length === 0}
          <p class="text-muted-foreground text-sm">No templates found</p>
        {/if}
      </Sidebar.GroupContent>
    </Sidebar.Group>
    <div
      class={cn(
        "from-primary-100/50 dark:via-gray-850 pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-gradient-to-t to-transparent dark:from-gray-900",
        {
          "opacity-100": totalSectionsLength > 10,
          "opacity-0": totalSectionsLength <= 10
        }
      )}
    ></div>
  </Sidebar.Content>
</Sidebar.Root>
