<template>
  <div class="pa-5">
    <h1 class="ml-4 mb-10">
      <v-icon size="40">mdi-certificate</v-icon> Thêm mới thông báo
    </h1>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="title"
            label="Tiêu đề"
            outlined
            shaped
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-textarea
            v-model="content"
            outlined
            name="input-7-4"
            label="Nội dung"
          ></v-textarea>
        </v-col>
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="secondary"
          @click="addNotify()"
        >
          <v-icon>mdi-bell-plus</v-icon> Thêm thông báo
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as notification from "../../api/notification/notification";
export default {
  data() {
    return {
      loader: null,
      loading: false,
      title: "",
      content: "",
    };
  },
  methods: {
    async addNotify() {
      const date = new Date();
      const dateString = date.toLocaleDateString();
      await notification.addNotification(
        this.title,
        this.content,
        dateString
      );
      this.loader = "loading";
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => {
        this[l] = false;
       // alert("Thêm thành công");
       // location.reload();
      }, 1000);
    },
  },
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
