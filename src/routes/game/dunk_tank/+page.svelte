<script>
    import ClickableContainer from "$src/components/clickableContainer.svelte";
    import { updateScore } from "$src/stores.js";

    let shot = false;

    function shootTarget(id) {
        if (!shot) {
            shot = true;
        }
        updateScore(id, 500);
    }
</script>

<div>
    {#if shot}
        <img src="/images/dunk_tank/dunk_tank_fall.gif" alt="" />
    {:else}
        <img src="/images/dunk_tank/dunk_tank_start.png" alt="" />
    {/if}

    <div class="target-wrapper">
        <ClickableContainer callback="{shootTarget}">
            <div class="target"></div>
        </ClickableContainer>
    </div>
</div>

<style scoped>
    img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 90vh;
    }

    .target {
        width: 17vh;
        height: 17vh;
    }

    .target-wrapper {
        position: absolute;
        left: 109vh;
        top: 32vh;
    }
</style>
