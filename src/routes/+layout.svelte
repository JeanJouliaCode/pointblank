<script>
    import { onMount, onDestroy } from "svelte";
    import Hit from "../components/hit.svelte";
    import { callClickedElement, clickables } from "../stores.js";
    export const prerender = true;
    export const trailingSlash = "always";

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
        const { Peer } = await import("peerjs");
        var peer = new Peer("jjeeaann2013");

        peer.on("open", (id) => {
            console.log("My peer ID is: " + id);

            peer.on("connection", (conn) => {
                conn.on("data", (data) => {
                    const position = getBulletPosition(data);
                    if (position) {
                        x = position.x;
                        y = position.y;

                        callClickedElement(x, y);
                    }
                });
            });
        });
    });

    function clickScreen(event) {
        console.log("click", event);
        x = event.offsetX;
        y = event.offsetY;
        callClickedElement(x, y);
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
    .hitbox {
        position: absolute;
        background: rgba(31, 105, 189, 0.096);
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

    :global(body) {
        margin: 0;
    }

    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
    }
</style>
