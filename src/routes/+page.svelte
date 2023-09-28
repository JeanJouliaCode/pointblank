<script>
    import ClickableContainer from "../components/clickableContainer.svelte";
    import { goto } from "$app/navigation";
    import { get } from "svelte/store";
    import { id, registeredUser, disclamerCliked, isGameStarted, resetBullets } from "$src/stores.js";
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
            if (get(registeredUser).length >= 1) {
                isGameStarted.update(() => true);
                resetBullets();
                goto("/game-description");
            }
            targetDown = false;
        }, 700);
    }

    function dismissModal() {
        console.log("dismissModal");
        disclamerCliked.update(() => true);
    }
</script>

{#if !$disclamerCliked}
    <div class="modal-overlay">
        <div class="modal">
            <h1>Disclaimer</h1>
            <p>
                You will need you're phone to play this game. <br />
            </p>
            <button on:click="{dismissModal}">Start</button>
        </div>
    </div>
{/if}

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

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }

    .modal {
        width: 50vw;
        height: 50vh;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    p {
        font-size: 3vh;
    }

    button {
        width: 20vh;
        height: 5vh;
        border-radius: 10px;
        background-color: rgb(0, 255, 0);
        border: none;
        cursor: pointer;
        font-size: 3vh;
    }
</style>
