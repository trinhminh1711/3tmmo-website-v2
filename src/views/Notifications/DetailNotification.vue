<template>
  <div class="detail_content" v-html="contentNotify"></div>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {
        contentNotify:''
    };
  },
  mounted() {
   this.contentNotify = this.content.replaceAll("'", "");
   console.log(this.contentNotify);
  },
};
</script>

<style lang="scss" scoped>
.detail_content {
  padding: 20px;
}
</style>