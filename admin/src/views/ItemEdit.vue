<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form :model="model" @submit.native.prevent="save" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        icon: ""
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: this.id ? "修改成功" : "创建成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    async afterUpload(res) {
      this.model.icon = res.url;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

