<script>
    import { onMount, onDestroy } from "svelte";
    import { get } from "svelte/store";
    import { id, callClickedElement, clickables, disclamerCliked, removeBulletFromMagazin, isGameStarted } from "$src/stores.js";
    import Hit from "../components/hit.svelte";

    let bullet1;
    let bullet2;
    let bullet3;
    let theme1;
    let theme2;
    let emptyClip;

    function playSound() {
        bullet1.currentTime = 0;
        bullet2.currentTime = 0;
        bullet3.currentTime = 0;
        [bullet1, bullet2, bullet3][Math.floor(Math.random() * 3)].play();
    }

    function playTheme() {
        theme1 = new Audio("theme1.mp3");
        theme1.loop = true;
        theme1.play();
        if (theme2) theme2.pause();
    }

    function playGameTheme() {
        theme2 = new Audio("theme2.mp3");
        theme2.loop = true;
        theme2.play();
        theme1.pause();
    }

    isGameStarted.subscribe((value) => {
        if (value) {
            playGameTheme();
        }
    });

    disclamerCliked.subscribe((value) => {
        if (value) {
            playTheme();
        }
    });

    let x = -20;
    let y = -20;
    function getBulletPosition(data) {
        const centerWidth = document.getElementById("center")?.clientWidth;
        const borderWidth = window.innerWidth * 0.1;
        const centerHeight = window.innerHeight;

        const totalWidth = centerWidth + borderWidth;
        const x = data.x * totalWidth - borderWidth / 2;
        const y = -data.y * totalWidth + centerHeight / 2;
        return { x, y };
    }

    onMount(async () => {
        bullet1 = new Audio("bullet1.mp3");
        bullet2 = new Audio("bullet2.mp3");
        bullet3 = new Audio("bullet3.mp3");
        emptyClip = new Audio("clipSound.mp3");
        const { Peer } = await import("peerjs");
        var peer = new Peer(get(id));

        peer.on("open", (id) => {
            console.log("My peer ID is: " + id);

            peer.on("connection", (conn) => {
                conn.on("data", (data) => {
                    const position = getBulletPosition(data.position);
                    if (position) {
                        takeTheShoot(position.x, position.y, data.id);
                    }
                });
            });
        });
    });

    function clickScreen(event) {
        if (!get(disclamerCliked)) return;
        takeTheShoot(event.offsetX, event.offsetY, "computerUser");
    }

    function takeTheShoot(_x, _y, idUser) {
        const isBulletShot = removeBulletFromMagazin(idUser);
        if (isBulletShot) {
            playSound();
            x = _x;
            y = _y;
            callClickedElement(x, y, idUser);
        } else {
            emptyClip.play();
        }
    }

    onDestroy(() => {
        console.log("destroyed");
    });
</script>

<main>
    <div class="center" id="center">
        <div class="click-screen" on:mousedown="{clickScreen}"></div>
        {#each $clickables as clickable}
            <div class="hitbox" style="{`width: ${clickable.width}px;height: ${clickable.height}px;left:${clickable.x}px;top:${clickable.y}px`}"></div>
        {/each}
        <Hit x="{x}" y="{y}" />
        <slot />
    </div>
</main>

<style scoped>
    :global(h1) {
        font-size: 7vh;
        text-align: center;
        margin: 0px;
    }

    :global(h2) {
        font-size: 7vh;
        text-align: center;
        margin: 0px;
    }

    :global(h3) {
        font-size: 7vh;
        text-align: center;
        margin: 0px;
    }

    .hitbox {
        position: absolute;
    }

    .center {
        height: 100vh;
        position: relative;
        aspect-ratio: 6/4;
        overflow: hidden;
        background: rgb(255, 251, 217);
        border-left: 10vw solid rgb(0, 255, 0);
        border-right: 10vw solid rgb(0, 255, 0);
    }

    .click-screen {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
    }

    @font-face {
        font-family: "kindergarten";
        font-style: normal;
        font-weight: 400;
        src: url("/kindergarten.ttf") format("truetype");
    }

    :global(body) {
        margin: 0;
        font-family: "kindergarten";
    }

    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
    }
</style>
