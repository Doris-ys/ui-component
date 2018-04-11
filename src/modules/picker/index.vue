<template>
    <div class="page">
        <picker :values="values" title="picker" :isShow="true"></picker>
    </div>
</template>
<script>
import Picker from '@/components/picker'
export default {
    name: 'dome-picker',
    data() {
        return {
            values: [
                ['迷宫一样', '转一个圈', '无所谓', 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
                [4, 5, 6],
                [7, 8, 9]
            ]
        }
    },
    components: {
        Picker
    }
}

</script>
