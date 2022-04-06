<template>
  <div style="height:100%" class="d-flex flex-column justify-space-between">
    <div style="height:80%">
      <vue-editor style="height:100%" v-model="content"></vue-editor>
    </div>
    <div>
      <v-btn color="blue-grey" class="ma-2 white--text" @click="addNotify">
        Đăng
        <v-icon right dark> mdi-cloud-upload </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import * as notification from "../../api/notification/notification";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      loader: null,
      loading: false,
      content: "<h3>Nhập nội dung</h3>",
    };
  },
  methods: {
    async addNotify() {
      const date = new Date();
      const dateString = date.toLocaleDateString();
      await notification.addNotification(this.content, dateString);
      alert("Update thành công");
      location.reload();
    },
  },
  watch: {},
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
