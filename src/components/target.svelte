<script>
    import ClickableContainer from "./clickableContainer.svelte";

    let x;
    let y;

    const callback = () => {
        console.log("clicked");
        x = 100 + Math.random() * 1200;
        y = 100 + Math.random() * 700;
    };
</script>

<ClickableContainer x="{x}" y="{y}" callback="{callback}">
    <img class="dot" src="./target.png" alt="target" />
</ClickableContainer>

<style scoped>
    .dot {
        aspect-ratio: 1;
        width: 30vh;
    }
</style>
