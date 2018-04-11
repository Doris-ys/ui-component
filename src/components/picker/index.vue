<template>
    <popup :isShow="isShow" :title="title">
        <div class="picker-content">
            <div v-for="(col, idx_col) in values" class="picker-col" :key="idx_col" ref="wheel">
                <ul class="picker-col-ul" :index="idx_col">
                    <li v-for="(item, idx_item) in col" :key="idx_item" class="picker-col-li">{{ typeof item === 'object' && item[valueKey] ? item[valueKey] : item }}</li>
                </ul>
            </div>
            <p class="picker-mask picker-mask_top"></p>
            <p class="picker-mask picker-mask_bottom"></p>
        </div>
        <div class="btn" @click="confirm">确定</div>
    </popup>
</template>
<script>
import Popup from '@/components/popup'
export default {
    name: 'picker',
    props: {
        values: {
            type: Array,
            default: function() {
                return []
            }
        },
        valueKay: {
            type: String,
            default: 'name'
        },
        isShow: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            startTop: 0,
            eStartTop: 0,
            active: -1,
            selected: []
        }
    },
    components: {
        Popup
    },
    mounted() {
        this.$nextTick(() => {
            this.blindEvents()
        })
    },
    computed: {
        isSupportTouch() {
            return 'ontouchstart' in window
        },
        transformName() {
            let engine = ''
            if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
                engine = 'presto'
            } else if ('MozAppearance' in document.documentElement.style) {
                engine = 'gecko'
            } else if ('WebkitAppearance' in document.documentElement.style) {
                engine = 'webkit'
            } else if (typeof navigator.cpuClass === 'string') {
                engine = 'trident'
            }
            return { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }[engine]
        },
        itemHeight() {
            return document.querySelector('.picker-col-li').clientHeight
        },
        maxScroll() {
            return this.values[this.active].length - 1
        }
    },
    methods: {
        blindEvents() {
            let els = this.$refs.wheel
            let that = this
            for (let el of els) {
                el.addEventListener(this.isSupportTouch ? 'touchstart' : 'mousedown', that.start)
            }
        },
        start(event) {
            let that = this
            let el = event.target
            let target = this.getTarget(el)
            this.startTop = event.pageY || event.touches[0].pageY
            this.eStartTop = this.getTransformY(target)
            this.active = target.getAttribute('index')

            el.addEventListener(this.isSupportTouch ? 'touchmove' : 'mousemove', that.move)
            el.addEventListener(this.isSupportTouch ? 'touchend' : 'mouseup', that.end)
            event.preventDefault()
        },
        move(event) {
            let target = this.getTarget(event.target)
            let moveTop = event.pageY || event.touches[0].pageY
            let position = this.eStartTop + moveTop - this.startTop
            this.setTransformY(target, position)
        },
        end(event) {
            let that = this
            let el = event.target
            let endTop = this.getTransformY(this.getTarget(el))
            let index = Math.max(0, Math.min(Math.round(-endTop / this.itemHeight), this.maxScroll))

            this.scrollTo(el, index, endTop)
            this.select(index)
            if (!this.isSupportTouch) {
                el.removeEventListener('mousemove', that.move)
                el.removeEventListener('mouseup', that.end)
            } else {
                el.removeEventListener('touchmove', that.move)
                el.removeEventListener('touchend', that.end)
            }
        },
        select(index) {
            this.selected[this.active] = this.values[this.active][index]
        },
        confirm() {
            console.log(this.selected)
        },
        getTarget(target) {
            return target.className === 'picker-col-ul' ? target : target.children[0]
        },
        getTransformY(el) {
            let transform = el.style[this.transformName + 'Transform']
            if (transform) {
                let transformY = transform.split(',')[1]
                let value = transformY.substring(0, transformY.length - 3)
                return parseInt(value)
            }
            return 0
        },
        setTransformY(el, value) {
            el.style[this.transformName + 'Transform'] = ' translate(0px,' + (value ? (value + 'px') : '0px') + ')'
        },
        scrollTo(el, index, endTop) {
            let endPosition = -index * this.itemHeight
            this.setTransformY(el, endPosition)
        }
    }
}

</script>
<style lang="scss" scoped>
@import "src/styles/common";
.picker-content {
    position: relative;
    padding: px2rem(40) px2rem(32);
    height: px2rem(400);
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    font-size: px2rem(28);
    background: linear-gradient(to bottom, #ffffff, #ffffff px2rem(183), #cccccc 0, #cccccc px2rem(185), #ffffff 0, #ffffff px2rem(245), #cccccc 0, #cccccc px2rem(246), #ffffff 0, #ffffff px2rem(400));
    background-size: 100%;
}

.picker-col {
    position: relative;
    flex: 1;
    &-ul {
        position: absolute;
        top: px2rem(143);
        width: 100%;
    }
    &-li {
        font-size: px2rem(26);
        line-height: px2rem(60);
        vertical-align: middle;
        pointer-events: none;
    }
}

.picker-mask {
    position: absolute;
    height: px2rem(100);
    width: 100%;
}

.picker-mask_top {
    top: 0;
    background: linear-gradient(to bottom, #ffffff, transparent);
}

.picker-mask_bottom {
    bottom: 0;
    background: linear-gradient(to top, #ffffff, transparent);
}

.btn {
    width: 100%;
    height: px2rem(100);
    line-height: px2rem(100);
    background-color: skyblue;
    font-size: px2rem(30);
}

</style>
