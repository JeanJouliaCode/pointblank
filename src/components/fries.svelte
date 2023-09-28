<script>
    export let life = 9;
</script>

<div class="fries-container">
    <img src="/images/seagull/frie.png" alt="fries body" />
    <img src="/images/seagull/fries/frie1.png" alt="" style="{life >= 1 ? '' : 'display: none;'}" />
    <img src="/images/seagull/fries/frie2.png" alt="" style="{life >= 2 ? '' : 'display: none;'}" />
    <img src="/images/seagull/fries/frie3.png" alt="" style="{life >= 3 ? '' : 'display: none;'}" />
    <img src="/images/seagull/fries/frie4.png" alt="" style="{life >= 4 ? '' : 'display: none;'}" />
    <img src="/images/seagull/fries/frie5.png" alt="" style="{life >= 5 ? '' : 'display: none;'}" />
    <img src="/images/seagull/fries/frie6.png" alt="" style="{life >= 6 ? '' : 'display: none;'}" />
    <img src="/images/seagull/fries/frie7.png" alt="" style="{life >= 7 ? '' : 'display: none;'}" />
    <img src="/images/seagull/fries/frie8.png" alt="" style="{life >= 8 ? '' : 'display: none;'}" />
    <img src="/images/seagull/fries/frie9.png" alt="" style="{life >= 9 ? '' : 'display: none;'}" />
</div>

<style scoped>
    .fries-container {
        position: absolute;
        height: 30vh;
        width: 30vh;
        bottom: 8vh;
        left: 50%;
        transform: translateX(-50%);
    }

    img {
        width: 100%;
        position: absolute;
    }
</style>
