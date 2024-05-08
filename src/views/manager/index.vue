<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <MyMenu></MyMenu>
        <!-- <el-menu background-color="#333" text-color="#fff" active-text-color="#ffd04b" :route="true" class="menu">
          <el-submenu index="personal" :key="1">
            <template slot="title">
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">个人中心</el-menu-item>
          </el-submenu>
        </el-menu> -->
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import MyMenu from '../../components/MyMenu.jsx';
export default {
  components: {
    MyMenu
  }
}
</script>
<style scoped>
.menu {
  border-right: none;
}

.el-aside {
  background: #333;
  opacity: 0.8
}
</style>