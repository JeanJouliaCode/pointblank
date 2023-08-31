<script>
    let ballon;
    import ClickableContainer from "./clickableContainer.svelte";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";

    let x = 0;
    let y = 0;
    let pop = false;
    const dispatch = createEventDispatcher();

    onMount(() => {
        const center = document.getElementById("page");
        let vitesseX = Math.floor(Math.random() * 2 + 3) * (Math.random() > 0.5 ? 1 : -1);
        let vitesseY = Math.floor(Math.random() * 2 + 3) * (Math.random() > 0.5 ? 1 : -1);

        const heightBallon = center.offsetHeight - ballon.offsetHeight;
        const widthBallon = center.offsetWidth - ballon.offsetWidth;

        x = Math.floor(Math.random() * widthBallon);
        y = Math.floor(Math.random() * heightBallon);

        const moveBallon = () => {
            let _x = x + vitesseX;
            let _y = y + vitesseY;

            if (widthBallon <= _x || _x <= 0) {
                vitesseX = -vitesseX;

                if (_x < 0) _x = 0;
                if (_x > widthBallon) _x = widthBallon;
            }

            if (heightBallon < _y || _y < 0) {
                vitesseY = -vitesseY;

                if (_y < 0) y = 0;
                if (_y > heightBallon) _y = heightBallon;
            }

            x = _x > 0 ? _x : 1;
            y = _y > 0 ? _y : 1;
            requestAnimationFrame(moveBallon);
        };

        requestAnimationFrame(moveBallon);
    });

    function shootBallon() {
        pop = true;
        setTimeout(() => {
            dispatch("pop");
        }, 200);
    }
</script>

<ClickableContainer x="{x}" y="{y}" callback="{shootBallon}">
    {#if pop}
        <img class="balloon pop" src="/images/balloon/balloonPop.png" alt="ballon" />
    {:else}
        <img bind:this="{ballon}" class="balloon" src="/images/balloon/balloon.png" alt="ballon" />
    {/if}
</ClickableContainer>

<style>
    .balloon {
        height: 35vh;
        aspect-ratio: 1/1.5;
    }

    .pop {
        animation: pop 0.2s linear;
    }

    @keyframes pop {
        0% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1.4);
        }
    }
</style>
