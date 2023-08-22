<script>
    /**
     * @type {number}
     */
    export let x;
    /**
     * @type {number}
     */
    export let y;
</script>

<div class="dot" style="{`left: ${x}px; top: ${y}px`}"></div>

<style scoped>
    .dot {
        left: 0px;
        width: 10px;
        height: 10px;
        background-color: rgb(0, 0, 0);
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
</style>
