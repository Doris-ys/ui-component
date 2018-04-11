<template>
    <div class="mask"></div>
</template>
<script>
export default {
    name: 'mask-layer'
}

</script>
<style lang="scss" scoped>
@import "src/styles/common";
.mask {
    position: fixed;
    z-index: 10;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
}

</style>
