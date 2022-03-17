<template>
  <div class="text-center">
    <v-dialog v-model="dialogNoti" width="800">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Thông báo - {{ title }}
        </v-card-title>

        <v-card-text class="mt-5">
          {{ content }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogNoti = false"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as notification from "../../api/notification/notification";
export default {
  data() {
    return {
      dialogNoti: true,
      title: "",
      content: "",
    };
  },
  async mounted() {
    const Notify = await notification.getLastestUpdate();
    this.title = Notify[0].title;
    this.content = Notify[0].content;
  },
};
</script>

<style>
</style>
