<template>
  <div class="height-full notification-wrapper">
    <div class="d-flex align-center justify-space-between pa-5">
      <h2 class="title-wrapper">Danh sách thông báo</h2>
      <v-btn @click="addNotify()" color="primary">
        <v-icon class="mr-4">mdi-plus-box-multiple</v-icon>
        Thêm mới
      </v-btn>
    </div>
    <div class="pa-5">
      <v-card
        v-for="item in notify"
        v-bind:key="item.id"
        class="mb-5 notification"
        tile
      >
        <v-list-item>
          <v-list-item-content>
            <div class="d-flex">
              <v-list-item-title class="title d-flex align-center">
                <v-icon class="mr-3">mdi-star</v-icon> {{ item.title }}
              </v-list-item-title>
              <v-icon @click="deleteNoti(item)">mdi-delete</v-icon>
            </div>
            <p class="content">
              {{ item.content }}
            </p>
            <p class="date">
              <v-icon class="mr-3">mdi-update</v-icon> Ngày thêm :
              {{ item.extra_date }}
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-dialog v-model="popupDelete" persistent max-width="400">
        <v-card>
          <v-card-title class="text-h5"> Xác nhận xóa thông báo </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="popupDelete = false">
              Hủy bỏ
            </v-btn>
            <v-btn color="green darken-1" text @click="requestDelete()">
              Xác nhận
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog v-model="popupAddNotify" width="800">
      <v-card>
        <AddNotify />
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as notification from "../../api/notification/notification";
import AddNotify from "../Notifications/AddNotification";
export default {
  components: { AddNotify },
  data() {
    return {
      notify: "",
      deleteNotify: "",
      popupDelete: false,
      popupAddNotify: false,
    };
  },
  async mounted() {
    this.notify = await notification.getNotification();
  },
  methods: {
    deleteNoti(itemNotify) {
      this.deleteNotify = itemNotify;
      this.popupDelete = true;
    },
    async requestDelete() {
      this.popupDelete = false;
      await notification.deleteNotification(
        this.deleteNotify.id
      );
      location.reload();

    },
    addNotify() {
      this.popupAddNotify = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  p.content {
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    opacity: 0.5;
  }
  p.date {
    text-align: end;
  }
}
.title-wrapper {
  font-size: 1.5em !important;
  text-transform: uppercase;
}
</style>
