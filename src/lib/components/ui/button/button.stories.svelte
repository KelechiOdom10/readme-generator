<script module>
  import { defineMeta, type Args, setTemplate } from "@storybook/addon-svelte-csf";
  import { Github } from "lucide-svelte";

  import Button from "./button.svelte";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: "select",
        options: ["primary", "secondary", "accent", "destroy-outline", "destroy", "filled"]
      },
      size: {
        control: "select",
        options: ["default", "sm", "lg", "icon"]
      },
      disabled: {
        control: "boolean"
      },
      children: { control: "text" },
      href: {
        control: "text"
      }
    }
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>)}
  <Button {...args}>{"Click me"}</Button>
{/snippet}

<Story name="Default" args={{ variant: "default" }} />

<Story name="Secondary" args={{ variant: "secondary" }} />
<Story name="Accent" args={{ variant: "accent" }} />

<Story name="Small" args={{ size: "sm" }} />

<Story name="Large" args={{ size: "lg" }} />

<Story name="Disabled" args={{ disabled: true }} />

<Story name="With Leading Icon">
  <Button
    ><Github class="mr-2 h-4 w-4" />
    Send</Button
  >
</Story>

<Story name="With Trailing Icon">
  <Button
    >Send
    <Github class="ml-2 h-4 w-4" /></Button
  >
</Story>

<Story name="Icon Only" args={{ size: "icon" }}>
  <Button size="icon"><Github /></Button>
</Story>
