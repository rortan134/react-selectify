// From https://github.com/radix-ui/primitives/blob/main/packages/react/use-escape-keydown/src/useEscapeKeydown.tsx
import * as React from "react";
import { useCallbackRef } from "@radix-ui/react-use-callback-ref";

/**
 * Listens for when the escape key is down
 */
function useEscapeKeydown(onEscapeKeyDownProp?: (event: KeyboardEvent) => void, ownerDocument: Document = globalThis?.document) {
    const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp);

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onEscapeKeyDown(event);
            }
        };
        ownerDocument.addEventListener("keydown", handleKeyDown);
        return () => ownerDocument.removeEventListener("keydown", handleKeyDown);
    }, [onEscapeKeyDown, ownerDocument]);
}

export { useEscapeKeydown };
