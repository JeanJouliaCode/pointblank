<script>
    import { isGameRunning, registeredUser } from "$src/stores.js";
    import Fuse from "$src/components/fuse.svelte";
    import Loader from "$src/components/loader.svelte";
</script>

<div class="page">
    <div class="pointContainer">
        {#each $registeredUser as user}
            <h1 style="{`color:${user.position == 0 ? 'red' : 'blue'}`}">P{user.position + 1}</h1>
            <h1>={user.score}</h1>
        {/each}
    </div>
    <slot />
    {#if !$isGameRunning}
        <Loader />
    {/if}
    <div class="fuse-wrapper">
        <Fuse />
    </div>
</div>

<style scoped>
    .page {
        height: 100%;
        width: 100%;
    }

    .fuse-wrapper {
        position: absolute;
        bottom: 2vh;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .pointContainer {
        position: absolute;
        top: 0px;
        width: 100%;
        display: flex;
    }
</style>
