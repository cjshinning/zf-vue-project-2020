<template>
  <div id="app" style="min-width: 960px;">
    <el-container>
      <el-header>
        <PageHeader></PageHeader>
      </el-header>
      <router-view></router-view>
      <el-footer>
        <PageFooter></PageFooter>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';

export default {
  components: {
    PageHeader,
    PageFooter
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.el-header {
  background: #333;
}

.el-footer {
  background: #333;
}

.el-main {
  min-height: calc(100vh - 120px);
}
</style>
