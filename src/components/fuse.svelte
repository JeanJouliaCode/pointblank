<script>
    import { onMount } from "svelte";
    import { isGameRunning, currentGame, possibleGame, gameMetadata, resetBullets } from "$src/stores.js";
    import { goto } from "$app/navigation";
    import { get } from "svelte/store";
    let time = gameMetadata[possibleGame[get(currentGame)]].time;
    let fuse;
    let sparkVisisble = false;

    isGameRunning.subscribe((value) => {
        if (value && fuse) {
            startFuse();
        }
    });

    const startFuse = () => {
        sparkVisisble = true;
        fuse.style.transition = `padding ${time}s linear`;
        fuse.style.padding = "0 0 0 0";
        setTimeout(() => {
            sparkVisisble = false;
            setTimeout(() => {
                currentGame.update((value) => {
                    if (value + 1 === possibleGame.length) {
                        return 0;
                    }
                    return value + 1;
                });
                resetBullets();
                goto("/game-description");
            }, 1000);
        }, time * 1000);
    };

    onMount(() => {
        if (get(isGameRunning) && fuse) {
            startFuse();
        }
    });
</script>

<div class="fuse">
    <div class="fuse-wrapper" bind:this="{fuse}">
        <img src="/images/fuse.png" alt="fuse" class="fuse-image" />
    </div>
    {#if sparkVisisble}
        <img src="/images/sparks.gif" alt="" class="spark" />
    {/if}
    <div class="animation"></div>
</div>

<style scoped>
    .fuse-image {
        height: 5vh;
        position: absolute;
        left: 0px;
        top: 0px;
    }

    .fuse-wrapper {
        position: relative;
        overflow: hidden;
        height: 5vh;
        padding: 0 0 0 43.5vh;
    }

    .fuse {
        width: 45vh;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .spark {
        height: 7vh;
        z-index: 3;
        margin-left: -1vh;
    }
</style>
