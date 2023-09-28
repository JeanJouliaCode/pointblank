<script>
    import { onMount } from "svelte";
    import { currentGame, possibleGame, isGameRunning, gameMetadata } from "$src/stores.js";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";

    onMount(() => {
        setTimeout(() => {
            goto("/game/" + possibleGame[get(currentGame)]);
        }, 5000);
        isGameRunning.update(() => false);
    });

    let description = gameMetadata[possibleGame[get(currentGame)]].description;
</script>

<div class="page">
    <h1>{description}</h1>
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
