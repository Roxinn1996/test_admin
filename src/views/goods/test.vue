<template>
    <div>
        {{demoObj}}
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:'test',
    methods:{

    },
    computed:{
        ...mapGetters({
            demoObj:'demoObj',
        })
    }

}
</script>

<style lang="scss" scoped>

</style>