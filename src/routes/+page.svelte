<script>
    import ClickableContainer from "../components/clickableContainer.svelte";
    import { goto } from "$app/navigation";
    import { get } from "svelte/store";
    import { id, registeredUser } from "$src/stores.js";
    import { onMount } from "svelte";
    import QRCode from "qrcode";

    let targetDown = false;

    onMount(() => {
        var canvas = document.getElementById("canvas");

        QRCode.toCanvas(canvas, "https://jeanjouliacode.github.io/phone-light-gun/?id=" + get(id), function (error) {
            if (error) console.error(error);
            console.log("success!");
        });
    });

    function targetShot(id) {
        if (targetDown) return;
        targetDown = true;
        setTimeout(() => {
            if (get(registeredUser).length >= 1) goto("/game-description");
            targetDown = false;
        }, 700);
    }
</script>

<h1>Shoot the screen to register a player</h1>
<div class="player-container">
    {#each $registeredUser as user}
        <h3 style="{`color:${user.position == 0 ? 'red' : 'blue'}`}">P{user.position + 1}</h3>
    {/each}
</div>
<div class="container">
    <div class="qrcode-container">
        <div class="target-container">
            <img src="./images/home/phone.png" alt="target" style="height:40vh" />
            <h2>Scan me</h2>
        </div>
        <canvas id="canvas" height="200" width="200"></canvas>
    </div>

    <div class="target-container">
        <ClickableContainer callback="{targetShot}">
            {#if targetDown}
                <img src="./images/home/target_down.png" alt="target" style="height:40vh" />
            {:else}
                <img src="./images/home/target.png" alt="target" style="height:40vh" />
            {/if}
        </ClickableContainer>
        <h1>Shoot to start</h1>
    </div>
</div>

<style scoped>
    .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .target-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .player-container {
        height: 7vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .qrcode-container {
        display: flex;
    }

    canvas {
        width: 30vh !important;
        height: 30vh !important;
    }
</style>
