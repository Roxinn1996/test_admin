<template>
  <el-dialog :visible.sync="visibleDialog" :title="title">
    <!-- 内容部分用默认插槽 -->
    <slot></slot>
    <template #footer>
      <!-- 对外继续暴露出底部插槽，可以自定义 -->
      <slot name="footer">
        <span>
          <el-button @click="handleCancel" >取 消</el-button>
          <el-button @click="handleConfirm" type="primary">确 定</el-button>
        </span>
      </slot>

    </template>

  </el-dialog>
</template>

<script>

export default {
  name: 'customDialog',
  props:{
    // 对外暴露visible属性，用于显示隐藏弹框
    visible:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:''
    }
  },
  methods: {
    // 对外抛出cancel事件
    handleCancel(){
      this.$emit('cancel')
    },
    // 对外抛出 confirm事件
    handleConfirm(){
      this.$emit('confirm')
    }
  },
  computed:{
    // 通过计算属性，对.sync进行转换，外部也可以直接使用visible.sync
    visibleDialog:{
      get(){
        return this.visible
      },
      set(){
        this.$emit("update:visible");
      }
    }
  }
}
</script>

<style scoped>

</style>
