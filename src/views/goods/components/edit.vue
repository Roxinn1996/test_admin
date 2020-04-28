<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" >
      
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name"  placeholder="请输入"/>
      </el-form-item>

      <!-- 多选 -->
      <!-- <el-form-item label="商品类型">
        <el-select v-model="form.goods_type" multiple collapse-tags placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.cat_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="商品类型">
        <el-select v-model="form.goods_type"  placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.cat_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="兑换积分" prop="jifen">
        <el-input v-model.number="form.jifen" />
      </el-form-item>

      <el-form-item label="库存量" prop="num">
        <el-input v-model.number="form.num" />
      </el-form-item>


      <el-form-item label="上传">
        <el-input v-model="form.goods['img']" />
      </el-form-item>


      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0" >下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品详细" >
        <tinymce v-model="form.goods['content']" :height="300" :width="600"/>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('formRef')">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import { api_goods_type , api_post_add_goods } from '@/api/goods'
  import tinymce from '@/components/Tinymce'
  export default {
    name:'Edit',
    components:{
      tinymce
    },
    data() {
      return {
        loading:true,
        form: {
          name: '', //名字
          jifen: '', //积分
          num: '', //库存
          goods:{'content':'','img':''},  //这个给后端保存json字符串
          goods_type: '', //类型  这个可以设置为默认值
          status:1, //状态
        },
        options: [],
        rules:{
          name:[
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
          ],
          jifen:[
            {required: true, message: '请输入兑换所需积分', trigger: 'blur'},
            {type:'number', message: '积分必须为数字值', trigger: 'blur' }
          ],
          num:[
            {required: true, message: '请输入库存量', trigger: 'blur'},
            {type:'number',  message: '库存量必须为数字值', trigger: 'blur' }
          ],
          status:[
            {required: true}
          ],
          goods:[
            {required: true, message: '请输入商品描述', trigger: 'blur'},
            { min: 3, message: '长度不少于3个字符', trigger: 'blur' }
          ]
          
        }
      }
    },
    created(){
      this.getType();
    },
    methods: {
      getType(){
        api_goods_type().then(res=>{
          this.options = res.data.data
          this.loading = false;
        })
      },
      onSubmit(formName) {
        this.loading = true;
         this.$refs[formName].validate((valid) => {
          if (valid) {
            //验证成功
            this.$message('submit!')
            api_post_add_goods(this.form).then(res=>{
              this.loading = false;
              console.log(res);
            })
          } else {
            this.$message('error submit!!!')
            this.loading = false;
            return false;
          }
        });

      },
      onCancel() {
        // this.$message({
        //   message: 'cancel!',
        //   type: 'warning'
        // })
        this.$router.back();
      },
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
.app-container {
    padding-right: 50%;
}
</style>