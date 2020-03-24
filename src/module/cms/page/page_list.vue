<template>
  <div>
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',query:{
        page: this.params.page,
        siteId: this.params.siteId
      }}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="180"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="230"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="280"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="auto"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.pageId)">
            编辑
          </el-button>
          <el-button size="small" type="text" @click="del(page.row.pageId)">
            删除
          </el-button>
          <el-button size="small" type="text" @click="preview(page.row.pageId)">
            页面预览
          </el-button>
          <el-button size="small" type="primary" plain @click="postPage(page.row.pageId)">
            发布
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="params.page"
      :page-size="params.size"
      v-on:current-change="pageChange"
      style="float:right">
    </el-pagination>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        siteList: [], //站点列表
        list: [],
        total: 0,
        params: {
          page: 1,//页码
          size: 5, //每页条数
          siteId: '',
          pageAliase: ''
        }

      }
    },
    methods: {
      //查询
      query: function () {
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((result) => {
          this.list = result.queryResult.list
          this.total = result.queryResult.total
        })
      },
      //分页查询
      pageChange: function (page) {
        this.params.page = page;
        this.query();

      },
      edit: function (pageId) {
        //打开修改页面
        this.$router.push({path: '/cms/page/edit/' + pageId})
      },
      del: function (pageId) {

        //确认提示
        this.$confirm('您确认删除吗?', '提示', {}).then(() => {
          //删除页面
          cmsApi.page_del(pageId).then((res) => {
            if (res.success) {
              this.$message.success("删除成功")
              //刷新页面
              this.query();
            } else {
              this.$message.error("删除失败")
            }
          })
        })

      },
      preview: function (pageId) {
        window.open("http://www.xuecheng.com/cms/preview/" + pageId)
      },
      postPage: function (pageId) {
        this.$confirm('确认发布该页面吗?', '提示', {

        }).then(() => {
          cmsApi.page_postPage(pageId).then((res) => {
            if (res.success) {
              console.log('发布页面id=' + pageId);
              this.$message.success('发布成功，请稍后查看结果');
            } else {
              this.$message.error('发布失败');
            }
          });
        })
      }
    },
    //vue对象实例创建之前执行的钩子方法
    created() {
      this.params.page = Number.parseInt(this.$route.query.page || 1); // || 取第一个有效值，如果前面表达式能取到值就用前面的，否则取1
      this.params.siteId = this.$route.query.siteId || ''
    },
    //当DOM元素渲染完成后调用query方法
    mounted() {
      this.query();

      this.siteList = [
        {
          siteId: '5a751fab6abb5044e0d19ea1',
          siteName: '门户主站'
        },
        {
          siteId: '102',
          siteName: '测试站'
        }
      ]
    }
  }
</script>

<style scoped>

</style>
