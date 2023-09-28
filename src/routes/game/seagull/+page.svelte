<script>
    import Fries from "$src/components/fries.svelte";
    import Seagull from "$src/components/seagull.svelte";
    import { onDestroy, onMount } from "svelte";
    import { isGameRunning } from "$src/stores.js";

    let loaded = false;
    let screenWidth = 0;
    let screenHeight = 0;
    let spawnPositions = [];
    let friesLife = 9;

    let spawnClock = null;
    onMount(() => {
        screenWidth = document.getElementById("center")?.clientWidth;
        screenHeight = document.getElementById("center")?.clientHeight;

        spawnPositions = [
            {
                x: screenWidth * -0.1,
                y: -screenHeight * 0.3,
            },
            {
                x: screenWidth * 0.1,
                y: -screenHeight * 0.1,
            },
            {
                x: screenWidth * 0.3,
                y: -screenHeight * 0.1,
            },
            {
                x: screenWidth * 0.7,
                y: -screenHeight * 0.1,
            },
            {
                x: screenWidth * 1.1,
                y: -screenHeight * 0.3,
            },
        ];

        loaded = true;

        isGameRunning.subscribe((value) => {
            if (value && !spawnClock) {
                spawnClock = setInterval(() => {
                    spawnSeagull();
                }, 1100);
            }
        });
    });

    let seagullInstances = [];

    function spawnSeagull() {
        const id = Math.random().toString();
        const componentInstance = new Seagull({
            target: document.getElementById("seagull-page"), // Render the component to the body,
            props: {
                originPosition: spawnPositions[Math.floor(Math.random() * spawnPositions.length)],
                targetPosition: { y: screenHeight * 0.65, x: screenWidth / 2 - (screenHeight * 0.2) / 2 },
                id,
                callback: (id) => {
                    destroySeagull(id);
                },
                removeLife: () => {
                    friesLife--;
                },
            },
        });
        seagullInstances.push({ id, componentInstance });
    }

    function destroySeagull(idSeagull) {
        const val = seagullInstances.find(({ id }) => id === idSeagull);
        if (!val) return;
        const { componentInstance } = val;
        componentInstance.$destroy();
        seagullInstances = seagullInstances.filter(({ _id }) => _id !== idSeagull);
    }

    onDestroy(() => {
        seagullInstances.forEach(({ componentInstance }) => {
            componentInstance.$destroy();
        });
        seagullInstances = [];
        clearInterval(spawnClock);
    });
</script>

{#if loaded}
    <div class="page" id="seagull-page">
        <Fries life="{friesLife}" />
        <!-- <Seagull originPosition="{spawnPositions[0]}" targetPosition="{{ y: screenHeight * 0.65, x: screenWidth / 2 - (screenHeight * 0.2) / 2 }}" />
        <Seagull originPosition="{spawnPositions[1]}" targetPosition="{{ y: screenHeight * 0.65, x: screenWidth / 2 - (screenHeight * 0.2) / 2 }}" /> -->
    </div>
{/if}

<style>
    .page {
        height: 100%;
        width: 100%;
        background-image: url("/images/seagull/background.png");
        background-size: cover;
    }
</style>
