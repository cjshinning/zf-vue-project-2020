<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in sliders" :key="item.id">
        <img :src="item.url" alt="" style="width:100%; height:100%;">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as types from '@/store/action-types';

export default {
  computed: {
    ...mapState(['sliders'])
  },
  methods: {
    ...mapActions([types.SET_SLIDERS])
  },
  mounted() {
    if (!this.sliders.length) {
      this[types.SET_SLIDERS]();
    }
  }
}
</script>