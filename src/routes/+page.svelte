<script>
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Github, SunIcon } from "lucide-svelte";
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button
  class="bg-primary text-primary-foreground hover:shadow-offset-sm ring-offset-background focus-visible:ring-primary m-4 inline-flex w-fit items-center justify-center rounded-sm px-5 py-1.5 text-sm font-normal transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-x-1 active:translate-y-1 active:shadow-none"
>
  Login
</button>

<Button variant="accent">Accehnt Button component</Button>
<Button variant="secondary">Secon Button component</Button>
<Button variant="default">Default Button component</Button>
<Button variant="destructive">Destructive Button component</Button>
<Button
  ><Github class="h-4 w-4" />
  Send</Button
>
<Button variant="secondary" size="icon">
  <SunIcon />
</Button>

<Input placeholder="Enter your name" class="m-3 w-full max-w-xs" />
