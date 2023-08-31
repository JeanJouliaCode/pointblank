<script>
    import { isGameRunning } from "$src/stores.js";
    let timer = 3;

    setInterval(() => {
        timer--;
        if (timer === 0) {
            isGameRunning.update(() => true);
        }
    }, 1000);
</script>

<div class="container">
    <img src="/images/loader.png" alt="loader" />
    <h1>{timer}</h1>
</div>

<style>
    .container {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 20vh;
        aspect-ratio: 1;
    }

    img {
        position: absolute;
        height: 100%;
        animation: loop 1s linear infinite;
    }

    h1 {
        animation: beat 1s linear infinite;
    }

    @keyframes loop {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes beat {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: rotate(1);
        }
    }
</style>
