<script>
    import { onMount } from "svelte";
    import { updateScore } from "$src/stores.js";
    import ClickableContainer from "./clickableContainer.svelte";
    export let originPosition;
    export let targetPosition;
    export let id;
    export let callback;
    export let removeLife;
    let x = 0;
    let y = 0;
    let dead = false;

    let seagullImages = ["/images/seagull/mouette1.png", "/images/seagull/mouette2.png", "/images/seagull/mouette3.png"];

    onMount(() => {
        x = originPosition.x;
        y = originPosition.y;
        const moveSeagull = () => {
            const speed = 0.009;
            const distanceX = targetPosition.x - originPosition.x;
            const distanceY = targetPosition.y - originPosition.y;

            if (y > targetPosition.y && !dead) {
                console.log("removeLife", y, targetPosition.y);
                removeLife();
                callback(id);
                return;
            }

            x += distanceX * speed;
            y += distanceY * speed;
            requestAnimationFrame(moveSeagull);
        };
        requestAnimationFrame(moveSeagull);
    });

    function shootSeagull(idPlayer) {
        dead = true;
        setTimeout(() => {
            callback(id);
            updateScore(idPlayer, 50);
        }, 200);
    }
</script>

<div>
    <ClickableContainer x="{x}" y="{y}" callback="{shootSeagull}">
        {#if dead}
            <img src="/images/seagull/feathers.png" alt="" class="feather-anitmation" />
        {:else}
            <img src="{seagullImages[Math.floor(Math.random() * 3)]}" alt="" style="{originPosition.x < targetPosition.x ? 'transform: scaleX(-1);' : ''}" />
        {/if}
    </ClickableContainer>
</div>

<style>
    img {
        width: 20vh;
        aspect-ratio: 1;
    }

    .feather-anitmation {
        width: 20vh;
        aspect-ratio: 1;
        animation: feather 0.3s linear infinite;
    }

    @keyframes feather {
        0% {
            transform: rotate(0deg) scale(0.5);
        }
        100% {
            transform: rotate(100deg) scale(1);
        }
    }
</style>
