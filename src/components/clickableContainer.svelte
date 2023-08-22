<script>
    let boundingBox;
    import { onMount, onDestroy } from "svelte";
    import { addNewClickable, updateClickable, removeClickable } from "../stores.js";

    export let x;
    export let y;
    export let callback;

    let id = "";

    $: {
        if (x !== undefined && y !== undefined) updateClickable(id, { x, y });
    }

    $: style = !!x && !!y ? `left: ${x}px; top: ${y}px; position: absolute;` : "";

    onMount(async () => {
        const width = boundingBox.clientWidth;
        const height = boundingBox.clientHeight;
        const rect = boundingBox.getBoundingClientRect();
        let _x = x;
        let _y = y;

        if (x === undefined) _x = rect.x - document.getElementById("center").offsetLeft - window.innerWidth * 0.1;

        if (y === undefined) _y = rect.y;

        if (_y < 0) _y = 0;
        if (_x < 0) _x = 0;

        id = addNewClickable({
            x: _x,
            y: _y,
            width,
            height,
            callback,
        });
    });

    onDestroy(async () => {
        removeClickable(id);
    });
</script>

<div bind:this="{boundingBox}" style="{style + 'display: inline-block;'}">
    <slot />
</div>
