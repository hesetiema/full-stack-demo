<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form :model="model" @submit.native.prevent="save" label-width="80px">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple placeholder="请选择">
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.difficult" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.skills" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.attack" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.survive" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.itemsGo" multiple placeholder="请选择">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.itemsBack" multiple placeholder="请选择">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对战技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却消耗">
                <el-input v-model="item.coolAndExpend"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description" :rows="4"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-tabs>
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
        avatar: "",
        title: "",
        categories: [],
        scores: {
          difficult: 0,
          attack: 0,
          skills: 0,
          survive: 0
        },
        skills: []
      },
      categories: [],
      items: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/heros", this.model);
      }
      this.$router.push("/heros/list");
      this.$message({
        type: "success",
        message: this.id ? "修改成功" : "创建成功"
      });
    },
    async afterUpload(res) {
      this.model.avatar = res.url;
    },
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`);
      this.model = { ...this.model, ...res.data };
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItems();
  }
};
</script>


