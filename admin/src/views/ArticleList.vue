<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="所属分类"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="
              $router.push(`/articles/edit/${scope.row._id}`)
            "
          >编辑</el-button>
          <el-button type="text" size="small" @click.native.prevent="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{_id:'',title:'',categories:''}],
      categories:[{_id:'',name:''}]
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定删除文章《${row.title}》?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/articles/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
      for (let i of this.categories){
        for (let j of this.items){
          if(j.categories === i._id){
            this.$set(j,'name',i.name)
          }
        }
      }
    }
  },
  created() {
    this.fetch();
    this.fetchCategories()
  }
};
</script>
