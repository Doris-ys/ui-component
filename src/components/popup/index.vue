<template>
    <transition name="popup">
        <div class="popup" v-show="isShow">
            <mask-layer></mask-layer>
            <div class="popup-content">
                <div class="popup-bar" v-if="title">{{title}}</div>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script>
import MaskLayer from '@/components/mask'
export default {
    name: 'popup',
    props: {
        title: {
            type: String
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    components: {
        MaskLayer
    }
}

</script>
<style lang="scss" scoped>
@import "src/styles/common";
.popup {
    position: fixed;
    bottom: 0;
}

.popup-content {
    position: fixed;
    z-index: 20;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
}

.popup-bar {
    height: px2rem(80);
    border-bottom: 1px solid #ccc;
    line-height: px2rem(80);
    font-size: px2rem(30);
}

.popup-enter,
.popup-leave-active {
    transform: translate3d(-50%, 100%, 0);
}

</style>
