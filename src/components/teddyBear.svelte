<script>
    import ClickableContainer from "$src/components/clickableContainer.svelte";
    import { createEventDispatcher } from "svelte";

    export let teddyType;
    export let locked = false;
    const dispatchEvent = createEventDispatcher();

    function clicked(id) {
        if (teddyType && !locked) {
            dispatchEvent("clicked", { id, teddyType });
            teddyType = null;
        }
    }
</script>

<div>
    <ClickableContainer callback="{clicked}">
        {#if teddyType === "banana"}
            <img src="teddybear/banana.png" alt="" class="teddySize" />
        {:else if teddyType === "carot"}
            <img src="teddybear/carot.png" alt="" class="teddySize" />
        {:else if teddyType === "elephant"}
            <img src="teddybear/elephant.png" alt="" class="teddySize" />
        {:else if teddyType === "goose"}
            <img src="teddybear/goose.png" alt="" class="teddySize" />
        {:else if teddyType === "bomb"}
            <img src="teddybear/bomb.png" alt="" class="teddySize" />
        {:else if teddyType === "bear"}
            <img src="teddybear/bear.png" alt="" class="teddySize" />
        {:else}
            <div class="teddySize"></div>
        {/if}
    </ClickableContainer>
</div>

<style scoped>
    .teddySize {
        width: 20vh;
        aspect-ratio: 1;
    }
</style>
