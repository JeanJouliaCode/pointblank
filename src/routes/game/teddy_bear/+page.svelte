<script>
    import TeddyBear from "$src/components/teddyBear.svelte";
    import { isGameRunning, updateScore } from "$src/stores";
    import { onDestroy } from "svelte";

    const teddyTypes = ["banana", "carot", "elephant", "goose", "bomb", "bear"];
    let teddyBears = [];
    let interval;
    let targetedTeddy = null;

    function setTeddyBears() {
        teddyBears = [...teddyTypes];
        teddyBears.sort(() => 0.5 - Math.random());
    }

    function removeTeddyBears() {
        teddyBears = [];
    }

    function chooseTarget() {
        targetedTeddy = null;
        setTimeout(() => {
            targetedTeddy = teddyTypes.filter((teddy) => teddy !== "bomb")[Math.floor(Math.random() * (teddyTypes.length - 1))];
        }, 500);
    }

    function shootTeddy({ detail: { teddyType, id } }) {
        console.log("cliked");
        if (teddyType) {
            if (teddyType === targetedTeddy) {
                updateScore(id, 100);
            } else if (teddyType === "bomb") {
                updateScore(id, -100);
            } else {
                updateScore(id, -50);
            }
        }
    }

    const durationBetweenRounds = 2000;
    const durationRounds = 2000;

    isGameRunning.subscribe((value) => {
        if (!interval && value) {
            interval = setInterval(() => {
                setTeddyBears();
                setTimeout(() => {
                    removeTeddyBears();
                    chooseTarget();
                }, durationRounds);
            }, durationBetweenRounds + durationRounds);
            chooseTarget();
        }
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div>
    <div class="television">
        <TeddyBear teddyType="{targetedTeddy}" locked="{true}" />
    </div>
    <img src="/images/teddybear/support.png" alt="" class="support" />
    <div class="animal-row-top">
        <TeddyBear teddyType="{teddyBears[0]}" on:clicked="{shootTeddy}" />
        <TeddyBear teddyType="{teddyBears[1]}" on:clicked="{shootTeddy}" />
        <TeddyBear teddyType="{teddyBears[2]}" on:clicked="{shootTeddy}" />
    </div>
    <div class="animal-row">
        <TeddyBear teddyType="{teddyBears[3]}" on:clicked="{shootTeddy}" />
        <TeddyBear teddyType="{teddyBears[4]}" on:clicked="{shootTeddy}" />
        <TeddyBear teddyType="{teddyBears[5]}" on:clicked="{shootTeddy}" />
    </div>
</div>

<style scoped>
    .support {
        position: absolute;
        width: 90vh;
        bottom: 10vh;
        left: 50%;
        transform: translateX(-50%);
    }

    .television {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 5vh;
    }

    .animal-row {
        display: flex;
        justify-content: space-around;
        width: 80vh;
        position: absolute;
        bottom: 27.5vh;
        left: 50%;
        transform: translateX(-50%);
    }

    .animal-row-top {
        display: flex;
        justify-content: space-around;
        width: 80vh;
        position: absolute;
        bottom: 49vh;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
