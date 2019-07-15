<template>
  <div class="article-container">
    <el-card class="card1">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <span>
          根据筛选条件共查询到
          <b>{{total}}</b> 条结果：
        </span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.cover.images[0]" style="width:100px;heigth:75px;">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="100" height="75" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" plain circle type="primary" @click="edit(scope.row.id)"></el-button>
            <el-button icon="el-icon-delete" plain circle type="danger" @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePager"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      reqParams: {
        page: 1,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 日期控件的数据
      dateValues: [],
      // 文字列表
      tableData: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取列表数据
    this.getArticles()
  },
  methods: {
    edit (id) {
      // this.$router.push('/publish?id=' + id)
      this.$router.push({ path: '/publish', query: { id } })
    },
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定,发删除请求
        await this.$axios.delete(`articles/${id}`)
        //
        this.getArticles()
        this.$message.success('删除成功')
      }).catch(() => {
        // 点击取消
      })
    },
    search () {
      this.getArticles()
    },
    changeDate (value) {
      this.reqParams.begin_pubdate = value[0]
      this.reqParams.end_pubdate = value[1]
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getArticles () {
      const { data: { data } } = await this.$axios
        .get('articles', { params: this.reqParams })
      this.tableData = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.card1 {
  margin-bottom: 20px;
}
.box {
  text-align: center;
}
</style>
