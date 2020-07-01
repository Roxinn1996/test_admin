<template>
  <div class="app-container">
   
       <div class="tips">
        <el-button  @click="addClick" type="primary" icon="el-icon-plus">增加</el-button>
       </div>
   
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95" prop="id"  sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        
        <el-table-column label="商品名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="兑换所需积分" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.jifen }}</span>
          </template>
        </el-table-column>

        <el-table-column label="库存" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.num }}
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="状态" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status === '1' ? '发布' : '未发布' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="created_at" label="更改时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ parseTimeFun(scope.row.update_time)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
    
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
              删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"   @pagination="getData"/>
  </div>
</template>

<script>
//axios
import {goodsList} from '@/api/goods';
//工具
import { formatTime } from '@/utils'
//公共组件
import Pagination from '@/components/Pagination'

export default {
  name: 'Index',
  components:{
    Pagination
  },
  data(){
    return{
      listLoading: true,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 5,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
    }
  },
  created(){
    this.getData();
  },
  filters:{
      statusFilter(status) {
      // const statusMap = {
      //   published: 'success',
      //   draft: 'gray',
      //   deleted: 'danger'
      // }
      const statusMap2 = ['danger','success']

      
      return statusMap2[status]
    }
  },
  methods:{
    getData(){
      this.listLoading = true;
      goodsList(this.listQuery).then(res=>{
        this.list = res.data.data;
        this.total = res.data.count;
        this.listLoading = false;
    })
    },
    //时间戳转日期格式
    parseTimeFun(time){

      return  formatTime(time)
    },
    handleUpdate(row){
      console.log(row);
    },
    handleModifyStatus(){

    },
    addClick(){
      this.$router.push('/goods/edit')
    }
     
  },
 


}
</script>

<style scoped>

.tips{
  margin-bottom:  30px;
}
</style>
