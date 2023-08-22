<script>
    export let x;
    export let y;

    let imageElement;

    $: {
        if (x !== undefined && y !== undefined && imageElement) {
            imageElement.classList.add("hitAnimation");
            setTimeout(() => {
                imageElement.classList.remove("hitAnimation");
            }, 200);
        }
    }
</script>

<div style="{`left: ${x}px; top: ${y}px;`}">
    <img bind:this="{imageElement}" src="hit.png" alt="hit" />
    <div class="hitAnimation"></div>
</div>

<style scoped>
    div {
        position: absolute;
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
</style>
