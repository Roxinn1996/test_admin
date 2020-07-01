<template>
    <div>
       
        <el-button type="primary" @click="demoClick">二次封装dialog</el-button>
        <el-button type="primary" @click="watchClick">watch监听vux变化</el-button>
        <el-button type="primary" @click="watchDemo">另外一种</el-button>
        <customDialog 
            :visible.sync="visibleDialog"
            @cancel="cancelEnent"
            @confirm="confirmEnent"
            title="哈哈哈"
            >
            <div>
                <p>这是二次封装的dialog</p>
            </div>

        </customDialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import customDialog from '@/components/common/custom-dialog/customDialog' //二次封装的dialog
export default {
    name:"demo",
    components:{
        customDialog
    },
    data(){  
        return{
            visibleDialog:false
        }
    },
   
    watch:{
        showpage(newV,oldV){   //利用 computed 连接vuex的变量，在watch内监听
            console.log('监听到变化了'+oldV+'---->'+newV)
        },
        "$store.state.user.demoObj.text":{
            deep:true,
            handler(newV,oldV){
                console.log(newV+'hahaha')
            }
        }
    },
    computed:{
        ...mapGetters(['showpage'])
    },
    methods:{
        //二次封装的dialog点击事件
        demoClick(){
            this.visibleDialog = true;
        },
        //取消回调
        cancelEnent(){
            console.log('取消')
            this.visibleDialog = false;
        },
        //确认回调
        confirmEnent(){
            console.log('确定')
            this.visibleDialog = false;
        },
        //vux监听的点击按钮
        watchClick(){
            console.log(this.showpage)
            this.$store.commit('user/SET_SHOWPAGE',!this.showpage)
            console.log(this.showpage)
        },
        watchDemo(){
            this.$store.commit('user/SET_DEMOOBJ','成功拉~~')

        }
    },
  
}
</script>

<style>

</style>