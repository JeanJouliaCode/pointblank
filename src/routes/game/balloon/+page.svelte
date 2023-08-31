<script>
    import Ballon from "$src/components/balloon.svelte";
    import { isGameRunning, updateScore, missedBullet } from "$src/stores.js";
    import { onDestroy } from "svelte";
    import { get } from "svelte/store";
    let ballons = [true, true, true, true, true, true];
    let lastballoonPopDate = 0;

    const ballonPop = ({ index, userId }) => {
        console.log("userId", userId);
        if (get(isGameRunning)) {
            ballons[index] = false;

            if (Date.now() - lastballoonPopDate < 100) {
                updateScore(userId, 150);
            } else {
                updateScore(userId, 100);
                lastballoonPopDate = Date.now();
            }
        }
    };

    const unsubscribe = missedBullet.subscribe((value) => {
        if (get(isGameRunning)) {
            console.log("missedBullet");
            updateScore(value.lastUser, -50);
        }
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="page" id="page">
    {#if $isGameRunning}
        {#each ballons as ballon, i}
            {#if ballon}
                <Ballon on:pop="{(event) => ballonPop({ index: i, userId: event.detail.userId })}" />
            {/if}
        {/each}
    {/if}
</div>

<style>
    .page {
        height: 100%;
        width: 100%;
        background-image: url("images/balloon/wood.png");
    }
</style>
