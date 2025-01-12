<script lang="ts" module>
  import type { WithElementRef } from "bits-ui";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { type VariantProps, tv } from "tailwind-variants";

  export const buttonVariants = tv({
    base: [
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium",
      "ring-offset-background focus-visible:outline-none focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset-2",
      "transition-all duration-200 cursor-pointer",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:size-4.5 [&_svg]:shrink-0"
    ],
    variants: {
      variant: {
        default: ["bg-primary text-primary-foreground", "hover:bg-primary/90"],
        secondary: ["bg-secondary border text-secondary-foreground"],
        accent: [
          "bg-black text-white dark:bg-white dark:text-black",
          "hover:bg-primary hover:text-primary-foreground hover:border-transparent"
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90",
          "focus-visible:ring-destructive"
        ],
        ghost: ["bg-ghost text-ghost-foreground", "hover:bg-ghost/90", "focus-visible:ring-ghost"],
        outline: [
          "border border-input bg-background",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-ring"
        ]
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  });

  export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
  export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
      class?: ClassNameValue;
    };
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { ClassNameValue } from "tailwind-merge";

  let {
    class: className,
    variant = "default",
    size = "default",
    ref = $bindable(null),
    href = undefined,
    type = "button",
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  <a bind:this={ref} class={cn(buttonVariants({ variant, size, className }))} {href} {...restProps}>
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    class={cn(buttonVariants({ variant, size, className }))}
    {type}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
