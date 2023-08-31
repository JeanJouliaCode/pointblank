<script>
    import Ballon from "$src/components/balloon.svelte";
    import { isGameRunning, updateScore, missedBullet } from "$src/stores.js";
    import { get } from "svelte/store";
    let ballons = [true, true, true, true, true, true];
    let lastballoonPopDate = 0;

    const ballonPop = (id) => {
        if (get(isGameRunning)) {
            ballons[id] = false;

            if (Date.now() - lastballoonPopDate < 100) {
                updateScore(0, 150);
            } else {
                updateScore(0, 100);
                lastballoonPopDate = Date.now();
            }
        }
    };

    missedBullet.subscribe((value) => {
        if (get(isGameRunning)) {
            updateScore(0, -50);
        }
    });
</script>

<div class="page" id="page">
    {#if $isGameRunning}
        {#each ballons as ballon, i}
            {#if ballon}
                <Ballon on:pop="{() => ballonPop(i)}" />
            {/if}
        {/each}
    {/if}
</div>

<style>
    .page {
        height: 100%;
        width: 100%;
    }
</style>
