# Contributing to Teams UI Components: React

## Getting started

Install `node` greater than or equal to v12 and `pnpm`, then run:

```shell
$ pnpm install
```

Then, to start Storybook, run:

```shell
$ pnpm dev
```

To test while Storybook is running, run:

```shell
$ pnpm test:run
```

To run tests also starting Storybook as needed (this will fail if Storybook is already running), run:

```shell
$ pnpm test
```

## Notes on naming

Zod types and TypeScript inferences should have the same name except for the case of the first letter, e.g.:

```ts
const fooProps = z.object({bar: z.number()})
type FooProps = z.infer<typeof fooProps>
```

A union of specific `…PropsOrElement` types characterizing a certain class is called an `…Entity`, e.g. `InlineEntity` includes both text and icon elements. An ordered set of entities is called a `…Sequence`, e.g. `InlineSequence`.

## When implementing a new pattern, be sure to:

1. Create/update all relevant Zod schemas and TypeScript types.
    - **Create the platform-agnostic schema in the `schemas` package first.** Then extend the schema as needed in the implementation package.
    - The Zod schema and TypeScript types should be lowercase and uppercase respectively, e.g. `textPropsOrElement` and `TextPropsOrElement`.
    - If the pattern is an Entity or Sequence of Entities that renders any of a union of subpatterns, be sure the names of the schemas and types indicate as much, e.g. the `Block` component exports the Zod schema `blockEntity` and the TypeScript type `BlockEntity`.
    - If the pattern is first-class (not an Entity or Sequence), it should export `…propsOrElement` schema & type.
    - If the pattern renders a sequence, _always_ use the `Sequence` component; _do not_ just use `.map(…)`.
3. Create/update all relevant component stories
    - Prefer .mdx stories except for tests
    - Offer user-friendly controls / `argTypes` at every opportunity
        - Some components should have nested controls to disambiguate when to render them or to improve ergonomics, e.g. `<Layout layout={[…]}/>`; since Storybook’s `argTypes` can’t un-nest props, it’s recommended to create a `Storybook….tsx` file containing a version of the component specific for Storybook.
    - Write useful documentation
        - What is this component for?
        - Links to design specs
4. Create/update any relevant accessibility tests:
    - Elements receive focus as expected
    - Elements announce correct content when focused / when content changes
    - Space/Enter/Arrow keys have the intended effects
    - Pointer events have the intended effects
5. Component implementation
    - Use [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) (instead of left/rigt), e.g. `marginInlineStart`.
    - Always use theme color aliases; _never_ use CSS color literals.
    - If a slot in the component should support `Escape`,
        - only do so for its JSX syntax style and
        - only outside of tightly-bound parent-child relations (e.g. `Layout` refuses to render `Escape` if it is in its `items` prop since only `LayoutItem` is allowed there).
    - All components should export:
        - `{componentName}Props` and `{componentName}PropsOrElement` zod schema
        - `{ComponentName}Props` and `{ComponentName}PropsOrElement` types based on the zod schemas
        - a `{ComponentName}` functional component (`React.FC`)
        - a `renderIf{ComponentName}` function that renders with either props or an element (if the component has exemplars, renders any props or elements for its exact form _or its exemplars_)
6. Recommended but unenforced code styles
    - `import` statements should occur in the following order with a line break in between:
        1. External dependencies
        2. Indexed internal packages
        3. Direct internal imports
