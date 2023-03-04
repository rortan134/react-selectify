![useSelectify](https://raw.githubusercontent.com/rortan134/use-selectify/master/.github/assets/use-selectify-banner.png)

<h1 align="center">use-selectify</h1>

<p align="center">The ultimate drag-to-select solution for React. Designed to be fast; Built to be accessible.</p>
<p align="center">
  <a href="https://github.com/rortan134/use-selectify/blob/main/CONTRIBUTING.md">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/use-selectify">
    <img alt="Types Included" src="https://badgen.net/npm/types/use-selectify" />
  </a>
  <a href="https://bundlephobia.com/result?p=use-selectify">
    <img alt="Minizipped Size" src="https://img.shields.io/bundlephobia/minzip/use-selectify" />
  </a>
  <a href="https://github.com/rortan134/use-selectify/blob/main/LICENSE">
    <img alt="MIT License" src="https://badgen.net/github/license/rortan134/use-selectify" />
  </a>
  <a href="https://www.npmjs.com/package/use-selectify">
    <img alt="Package Version" src="https://img.shields.io/npm/v/use-selectify.svg?colorB=green" />
  </a>
  <a href="https://www.npmjs.com/package/use-selectify">
    <img alt="NPM Downloads" src="https://badgen.net/npm/dm/use-selectify" />
  </a>
  <a href="https://twitter.com/meetgilberto">
    <img alt="Follow @meetgilberto on Twitter" src="https://img.shields.io/twitter/follow/meetgilberto.svg?style=social&label=Follow" />
  </a>
</p>

<br />

## Introduction

Drag interactions are one of the most challenging aspects of the web. Having full control over the exact behavior of those interactions is essential, yet most available libraries out there feel like they are still not up to the task.

Recognizing this need, `use-selectify` was created aiming to address those issues and provide a powerful starting point for drag interactions while still remaining a robust approach to complex selections of elements in a React application, all done through a hook.

<!-- Demo & Examples: [use-selectify.vercel.app](https://use-selectify.vercel.app/) -->

## Features

✅ Automatic window scrolling

✅ Flexible and [lightweight](https://bundlephobia.com/package/use-selectify) (4kB gzipped)

✅ Accessible by default

✅ Fine-grained control

✅ Simple to style

✅ Works on every device

✅ SSR support

## Installation

```sh
npm install use-selectify
```

or

```sh
yarn add use-selectify
```

## Anatomy

```tsx
import { useSelectify } from "use-selectify";

export default () => {
    const {
        SelectBoxOutlet,
        selectedElements,
        isDragging,
        hasSelected,
        selectionBox,
        getSelectableElements,
        selectAll,
        clearSelection,
        mutateSelections,
        cancelSelectionBox,
        options,
    } = useSelectify(ref, options);
};
```

-   `ref`: A RefObject containing the parent element that will trigger the selection interactions.
-   `options` (optional): An [object](#options) containing options that can be used to configure the selection behavior.

<details>
<summary>See every prop</summary>
-   `SelectBoxOutlet`: The returned selection box component.
-   `selectedElements`: A list of every element that has been selected through the hook.
-   `isDragging`: Whether the user's pointer is dragging or not.
-   `hasSelected`: Whether there's any element selected. Equal to `selectedElements.length > 0`.
-   `selectionBox`: A Rect indicating the internal values of the SelectBoxOutlet coordinates.
-   `getSelectableElements`: An utility function that returns every selectable element relative to the specified [selection criteria](#options)
-   `selectAll`: An utility function that will select every selectableElement.
-   `clearSelection`: An utility function that will unselect every selected element.
-   `mutateSelections`: An utility function, similar to a [setState](https://beta.reactjs.org/reference/react/useState), that allows you to modify internal selections.
-   `cancelSelectionBox`: An utility function that will instantly cancel the drag-selection without selecting any element.
-   `options`: A copy of the internal hook options.
</details>

## Getting Started

Begin by defining the element that will contain the drag interaction, then render the selection box outlet in it.

```tsx
import * as React from "react";
import { useSelectify } from "use-selectify";

export default function App() {
    const selectionContainerRef = React.useRef(null);
    const { SelectBoxOutlet } = useSelectify(selectionContainerRef, {
        onSelect: (element) => {
            console.log(`selected ${element}`);
            element.innerHTML = "Foo bar";
        },
    });

    return (
        <div ref={selectionContainerRef} style={{ position: "relative" }}>
            <div>I can be selected!</div>
            <SelectBoxOutlet />
        </div>
    );
}
```

By default every element inside the `selectionContainerRef` is a selectable element. To modify this behavior simply specify a selection criteria using [CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors):

```tsx
import * as React from "react";
import { useSelectify } from "use-selectify";

export default function App() {
    const selectionContainerRef = React.useRef(null);
    const { SelectBoxOutlet } = useSelectify(selectionContainerRef, {
        selectCriteria: ".select-this", // will only select elements with the "select-this" class
        onSelect: (element) => {
            console.log(`selected ${element}`);
            element.innerHTML = "Foo bar";
        },
    });

    return (
        <div ref={selectionContainerRef} style={{ position: "relative" }}>
            <div class="select-this">Hello World</div>
            <div>I won't be selected</div>
            <SelectBoxOutlet />
        </div>
    );
}
```

<details>
<summary>Readability Tip</summary>

You can specify the callback function outside of the hook for further customization:

```tsx
const handleSelection = (el: Element) => {
    console.log(`selected ${element}`);
    element.innerHTML = "Bar";
    // ...
};

const handleUnselection = (el: Element) => {
    console.log(`unselected ${element}`);
    element.innerHTML = "Foo";
    // ...
};

const { SelectBoxOutlet } = useSelectify(selectionContainerRef, {
    selectCriteria: ".select-this",
    onSelect: handleSelection,
    onUnselect: handleUnselection,
});
```

</details>

### Styling

By default the selection box comes with some styling. You can override the className prop and specify how you want your selection box to look through the Outlet Component. For Styled Components or Stitches see [how to render your own selection box](#more-usages).

> **Note**
>
> For the absolute positioning to work properly on the selection box, the parent element of the outlet should always be relative: `position: relative;`

```tsx
return (
    <div ref={selectionContainerRef} style={{ position: "relative" }}>
        // ...
        <SelectBoxOutlet className="foo bar" />
    </div>
);
```

Available default themes: `default` | `outline`

> Tip: TailwindCSS and [cva](https://github.com/joe-bell/cva) is a powerful combination for reactive styling.

## Advanced usage

### Mapping reactive components without a callback

```tsx
import * as React from "react";
import { useSelectify } from "use-selectify";

const users = [
    {
        id: 1,
        name: "foo",
        role: "admin",
    },
    {
        id: 1,
        name: "bar",
        role: "editor",
    },
    {
        id: 1,
        name: "foo-bar",
        role: "author",
    },
    {
        id: 1,
        name: "bar-foo",
        role: "author",
    },
];

const ListItem = ({
    selectedElements,
    children,
}: {
    selectedElements: Element[];
    children: React.ReactNode;
}) => {
    const itemRef = React.useRef(null);
    const isSelected = selectedElements.includes(itemRef.current);

    return (
        <li ref={itemRef} className={isSelected ? "list-item-active" : ""}>
            {children}
        </li>
    );
};

export const List = ({ children }: { children: React.ReactNode }) => {
    const containerRef = React.useRef(null);
    const { SelectBoxOutlet, selectedElements } = useSelectify(selectionContainerRef);

    return (
        <div ref={containerRef} className="container">
            <ul className="list">
                {users.map((user) => (
                    <ListItem selectedElements={selectedElements}>{user.name}</ListItem>
                ))}
            </ul>
            <SelectBoxOutlet />
        </div>
    );
};
```

### Declaratively handling selections

If you wish to couple the internal hook selections state with your own, you can leverage the `mutateSelections` function. Similarly to a [setState](https://beta.reactjs.org/reference/react/useState), you can modify which elements are internally selected in a declarative way.

```tsx
// ...

const containerRef = React.useRef(null);
const { SelectBoxOutlet, selectedElements, mutateSelections } = useSelectify(selectionContainerRef);

const selectElement = (elementToSelect) => {
    mutateSelections((prevSelections) => [...prevSelections, elementToSelect]);
};

const unselectElement = (elementToUnselect) => {
    mutateSelections((prevSelections) =>
        prevSelections.filter((element) => element !== elementToSelect)
    );
};
```

### Other use-cases

<details>
<summary>
Disabling mobile selection
</summary>

Use something like [react-device-detect](https://www.npmjs.com/package/react-device-detect) to distinguish if the user-agent is a mobile device or not, then simply disable the hook accordingly.

```tsx
import * as React from "react";
import { isMobile } from "react-device-detect";
import { useSelectify } from "use-selectify";

export default function App() {
    const selectionContainerRef = React.useRef(null);
    const { SelectBoxOutlet } = useSelectify(selectionContainerRef, {
        disabled: isMobile,
    });

    return (
        <div ref={selectionContainerRef} style={{ position: "relative" }}>
            <div>Hello World</div>
            <SelectBoxOutlet />
        </div>
    );
}
```

</details>

<details>
<summary>
Checking whether to start selecting or not
</summary>
If you wanted to check whether an user will start a pinch gesture before starting the selection box, you could simply delay the selection: If two fingers are used in the gesture after that time has passed the selection box will be automatically canceled.

```tsx
const { SelectBoxOutlet } = useSelectify(selectionContainerRef, {
    onDragStart: (event) => {
        setTimeout(() => {}, 250); // wait for 250ms for pinch gestures before starting drag-selection
    },
});
```

The same can be applied to other use cases, if you need to cancel the selection simply return `event.preventDefault()`.

```tsx
const { SelectBoxOutlet } = useSelectify(selectionContainerRef, {
    onDragStart: (event) => {
        let shouldCancel = false;
        setTimeout(() => {}, 200); // wait 200ms before checking if should cancel selection
        /**
         * check if should cancel
         * ...
         **/
        shouldCancel = true;
        if (shouldCancel) {
            return event.preventDefault(); // cancel selection
        }
    },
});
```

</details>

<details>
<summary>
Drawing your own selection box
</summary>

> **Note**
>
> You will not have any of the accessibility features included by default.

Start by creating your box component and pass in the provided `selectionBoxRef`, then apply the `selectionBox` to the styles for the pointer coordinates.

```tsx
export function App() {
    const selectionContainerRef = React.useRef(null);
    const { selectionBoxRef } = useSelectify(selectionContainerRef);

    const MyCustomSelectionBoxOutlet = () => {
        // custom logic...
        return (
            <div
                ref={selectionBoxRef}
                style={{
                    ...selectionBox,
                    boxSizing: "border-box",
                    position: "absolute",
                }}
            />
        );
    };

    return (
        <div ref={selectionContainerRef} style={{ position: "relative" }}>
            <div>I can be selected!</div>
            <MyCustomSelectionBoxOutlet />
        </div>
    );
}
```

> Make sure you add `position: absolute` and `border-box` for floating-ui calculations.

</details>

<details>
<summary>
Combining drag selection with pan & zoom
</summary>

<!-- Creating a figma-like canvas. -->

Work in progress...

</details>

## Options

| Prop                    | Type                                                     | Default          | Description                                                                                                                                             |
| ----------------------- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| maxSelections           | number \| false                                          | -                | Maximum number of elements that can be selected. Will stop selecting after reaching that number and keep already selected elements.                     |
| autoScroll              | boolean                                                  | true             | Automatically try to scroll the window when the pointer approaches the viewport edge while dragging.                                                    |
| autoScrollEdgeDistance  | number                                                   | 100              | Distance in px from the viewport's edges from which the box will try scrolling the window when the pointer approaches the viewport edge while dragging. |
| autoScrollStep          | number                                                   | 40               | Auto scroll speed.                                                                                                                                      |
| disableUnselection      | boolean                                                  | false            | Will keep every item selected after selection. Can be cleared with clearSelection().                                                                    |
| selectCriteria          | string \| undefined                                      | "\*"             | The specific CSS Selector criteria to match for selecting elements.                                                                                     |
| onlySelectOnFullOverlap | boolean                                                  | false            | Will only select the element if the full rect intersects.                                                                                               |
| onlySelectOnDragEnd     | boolean                                                  | false            | Will only select elements after user has stopped dragging or cursor has left the screen while dragging.                                                 |
| selectionDelay          | number                                                   | 0                | Specify a delay in miliseconds before elements are selected, to prevent accidental selection.                                                           |
| label                   | string                                                   | "Drag Selection" | Accessible label for screen readers.                                                                                                                    |
| selectionTolerance      | number                                                   | 0                | Distance in px from which elements can be selected even if the selection box is not visually intersecting.                                              |
| activateOnMetaKey       | boolean                                                  | false            | Only enables the selection box if the user was pressing a meta key while initiating the drag. Included Meta keys are: Shift, Ctrl, Cmd and Alt.         |
| activateOnKey           | string[]                                                 | []               | Only enables the selection box if the user was pressing a specified key while initiating the drag.                                                      |
| theme                   | "default" \| "outline"                                   | "default"        | Included theme options for the selection box appearance.                                                                                                |
| hideOnScroll            | boolean                                                  | false            | Whether to hide the selection box when the window starts scrolling.                                                                                     |
| exclusionZone           | Element \| Element[]                                     | -                | Won't enable the selection box if the user tries initiating the drag from the specified elements.                                                       |
| disabled                | boolean                                                  | false            | Disables the selection box interaction & dragging.                                                                                                      |
| forceMount              | boolean                                                  | false            | Forces the mounting of the selection box on initialization.                                                                                             |
| onSelect                | (element: Element) => void                               | -                | Callback function when an element is selected.                                                                                                          |
| onUnselect              | (unselectedElement: Element) => void                     | -                | Callback function when an element is unselected.                                                                                                        |
| onDragStart             | (e: PointerEvent) => void                                | -                | Callback function when drag starts.                                                                                                                     |
| onDragMove              | (e: PointerEvent, selectedElements: Element[]) => void   | -                | Callback function when dragging.                                                                                                                        |
| onDragEnd               | (e?: PointerEvent, selectedElements?: Element[]) => void | -                | Callback function when drag ends.                                                                                                                       |
| onEscapeKeyDown         | (e: KeyboardEvent) => void                               | -                | Callback function when escape key is pressed.                                                                                                           |

## Accessibility (optional)

By default use-selectify already follows [WAI-ARIA](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) best practices. Though to ensure that drag interactions are as accessible as possible, we must consider the following aspects:

1. Add ARIA attributes: To indicate to assistive technology users that the elements are available for selection, we can use an aria-label to each selectable element. This label should be descriptive and informative, indicating either the purpose of selecting that element or how to select it for screen readers. Additionally, we can use the aria-selected attribute to indicate when elements are selected:

    ```tsx
    const { SelectBoxOutlet } = useSelectify(selectionContainerRef, {
        onSelect: (el) => {
            el.setAttribute("aria-selected", "true");
        },
    });
    // ...
    ```

2. Make elements focusable: To ensure that keyboard-only users can access and select the elements, all functionality should be also operable through the [keyboard alone](http://www.w3.org/TR/WCAG20/#keyboard-operation). Ensure that every selectable element is also focusable. This means either adding a tabindex attribute to the element and setting it to 0 or using an element that is focusable by default.

3. Arrow navigation: Make sure every selectable element can also be selected using the arrow keys.

> Tip: By default, user-select is enabled for all elements, which means the user can select text or elements by dragging the cursor over them, to prevent accidental text selection, Disable user-select on the parent container of the selection box while the user is dragging.

```css
-webkit-user-select: none; /* Safari */
-ms-user-select: none; /* IE 10+ */
user-select: none;
```

## Development

1. Clone the repo into a public GitHub repository (or fork <https://github.com/rortan134/use-selectify/fork>).

    ```sh
    git clone https://github.com/rortan134/use-selectify.git
    ```

2. Go to the project folder

    ```sh
    cd use-selectify
    ```

3. Install packages with yarn

    ```sh
    yarn
    ```

4. Start the Storybook preview for development

    ```sh
    yarn storybook
    ```

## License

Distributed under the MIT License. See LICENSE for more information.
