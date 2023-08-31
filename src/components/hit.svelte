<script>
    import { points } from "$src/stores.js";
    export let x;
    export let y;

    let imageElement;
    let scoreValue = null;
    let scoreTimeout;

    $: {
        if (x !== undefined && y !== undefined && imageElement) {
            imageElement.classList.add("hitAnimation");
            setTimeout(() => {
                imageElement.classList.remove("hitAnimation");
            }, 200);
        }
    }

    points.subscribe((value) => {
        clearTimeout(scoreTimeout);
        scoreValue = value.reduce((accu, currentVal) => {
            if (currentVal.date < Date.now() - 100) return accu;
            return accu + currentVal.score;
        }, 0);
        scoreTimeout = setTimeout(() => {
            scoreValue = null;
        }, 200);
    });

    $: pointStyle = `color: ${getColor(scoreValue)};`;

    function getColor(score) {
        switch (true) {
            case score < 0:
                return "red";
                break;
            case score <= 100:
                return "green";
            default:
                return "gold";
        }
    }
</script>

<div style="{`left: ${x}px; top: ${y}px;`}">
    <img bind:this="{imageElement}" src="/images/hit.png" alt="hit" />
    <div class="hitAnimation"></div>
    {#if scoreValue !== null}
        <h1 style="{pointStyle}">{(scoreValue > 0 ? "+" : "") + scoreValue}</h1>
    {/if}
</div>

<style scoped>
    div {
        position: absolute;
        z-index: 10;
    }

    img {
        width: 10vh;
        transform: translate(-50%, -50%);
        opacity: 0;
    }

    .hitAnimation {
        animation: hit 0.2s linear;
    }

    @keyframes hit {
        0% {
            transform: scale(0.2);
            opacity: 0;
            transform: translate(-50%, -50%);
        }
        30% {
            transform: scale(1);
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        100% {
            transform: scale(0.2);
            opacity: 0;
            transform: translate(-50%, -50%);
        }
    }

    h1 {
        z-index: 3;
    }
</style>
