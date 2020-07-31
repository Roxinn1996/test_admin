<template>
    <div>
       
        <el-button type="primary" @click="demoClick">二次封装dialog</el-button>
        <el-button type="primary" @click="watchClick">watch监听vux变化</el-button>
        <el-button type="primary" @click="watchDemoText">改text</el-button>
        <el-button type="primary" @click="watchDemoAge">改age</el-button>
        <el-button type="primary" @click="calculateTime('2020-03-29 16:51:36','2020-03-28 22:24:45')">计算时间</el-button>
        <el-button type="primary" @click="apiClick">跨域api</el-button>
        <el-button type="primary" class="CopyTextKeyWord" data-clipboard-text="打得好啊，我是废物">复制</el-button>
        <!-- 阻止事件冒泡 -->
        <div class="demo" @click="demo1">
            <div @click.stop="demo2">哈哈哈</div>
        </div>

        <customDialog 
            :visible.sync="visibleDialog"
            @cancel="cancelEnent"
            @confirm="confirmEnent"
            @hook:updated ="hookMounted"
            @opened="dialogOpened"
            title="哈哈哈"
            >
            <div>
                <p>这是二次封装的dialog</p>
            </div>

        </customDialog>
    </div>
</template>

<script>
import api from '@/api/index'
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
        },
        "$store.state.user.demoObj.age"(newV,oldV){
            console.log(newV+'ageage')
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
        watchDemoText(){
            this.$store.commit('user/SET_DEMOOBJ','改text成功拉~~')
        },
        watchDemoAge(){
            this.$store.commit('user/SET_DEMOOBJAGE','改age成功拉~~')
        },
        dialogOpened(){
            console.log('打开了！')
        },
        calculateTime(payTime,lastShipTime){
            // console.log(new Date().getTime())
            this.timeFn(payTime,lastShipTime)
        },
        timeFn(d1,d2) {//di作为一个变量传进来
            //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
            let dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
            let dateEnd =new Date(d2.replace(/-/g, "/"));//获取当前时间
            let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
            if(dateDiff < 0 ){
                 return  console.log('已超时')
            }
            let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
            let leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
            let hours=Math.floor(leave1/(3600*1000))//计算出小时数
            //计算相差分钟数
            let leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
            let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
            //计算相差秒数
            let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
            let seconds=Math.round(leave3/1000)
            if(dayDiff == 0){
                // return  "剩余"+hours+"小时"+minutes+"分钟"
              return  console.log(" 相差 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")

            }
            console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
            // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数",hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
        },
        hookMounted(){
            console.log('监听子组件')
        },
        apiClick(){
            api.User.showShopInfo().then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        demo1(){
            console.log('11111')
        },
        demo2(){
            console.log('222')
        },
        

    },
  
}
</script>

<style lang="scss" scoped>
.demo{
    height: 200px;
    width: 300px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px;
    & div{
        height: 30px;
        cursor: pointer;
        
    }
}

</style>
