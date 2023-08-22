<script>
    import ClickableContainer from "../components/clickableContainer.svelte";
    import { onMount } from "svelte";
    import QRCode from "qrcode";

    onMount(() => {
        var canvas = document.getElementById("canvas");

        QRCode.toCanvas(canvas, "sample text", function (error) {
            if (error) console.error(error);
            console.log("success!");
        });
    });
</script>

<div class="container">
    <div class="qrcode-container">
        <div class="target-container">
            <img src="./home/phone.png" alt="target" style="height:40vh" />
            <img src="./home/scan_me.png" alt="target" style="height:8vh" />
        </div>
        <canvas id="canvas" height="200" width="200"></canvas>
    </div>

    <div class="target-container">
        <ClickableContainer>
            <img src="./home/target.png" alt="target" style="height:40vh" />
        </ClickableContainer>
        <img src="./home/shoot_me.png" alt="target" style="height:10vh" />
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

    .qrcode-container {
        display: flex;
    }

    canvas {
        width: 30vh !important;
        height: 30vh !important;
    }
</style>
