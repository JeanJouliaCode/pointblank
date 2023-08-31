<script>
    import { onMount } from "svelte";
    import { currentGame, possibleGame, isGameRunning } from "$src/stores.js";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";
    const descriptions = ["The goal of the game is too pop as much ballon as possible with only 3 bullet"];

    onMount(() => {
        setTimeout(() => {
            goto("/game/" + possibleGame[get(currentGame)]);
        }, 5000);
        isGameRunning.update(() => false);
    });
</script>

<div class="page">
    <h1>{descriptions[$currentGame]}</h1>
</div>

<style scoped>
    .page {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
