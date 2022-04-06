<template>
  <div class="height-full notification-wrapper">
    <div class="d-flex align-center justify-space-between pa-5">
      <h2 class="title-wrapper">Danh sách thông báo</h2>
      <v-btn v-if="showAdmin" @click="addNotify()" color="primary">
        <v-icon  class="mr-4">mdi-plus-box-multiple</v-icon>
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
          <v-list-item-content style="cursor: pointer">
            <div class="d-flex">
              <v-list-item-title
                @click="viewDetailNotify(item.content)"
                class="title d-flex align-center"
              >
                <p class="date">
                  <v-icon class="mr-3">mdi-update</v-icon> Ngày thêm :
                  {{ item.extra_date }}
                </p>
              </v-list-item-title>
              <v-icon v-if="showAdmin" class="delete_notify" @click="deleteNoti(item)"
                >mdi-delete</v-icon
              >
            </div>
            <p
              @click="viewDetailNotify(item.content)"
              v-html="item.content"
              class="content"
            ></p>
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
    <v-dialog v-model="popupAddNotify" width="90%">
      <v-card height="70vh" width="100%">
        <AddNotify />
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <v-dialog v-model="viewDetail" width="1200">
      <v-card>
        <DetailNotify :content="contentDetailNotify" />
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as notification from "../../api/notification/notification";
import AddNotify from "../Notifications/AddNotification";
import * as permission from "../../permission/checkPermission";
import DetailNotify from "../Notifications/DetailNotification.vue";
export default {
  components: { AddNotify, DetailNotify },
  data() {
    return {
      notify: [],
      deleteNotify: "",
      popupDelete: false,
      showAdmin : false,
      popupAddNotify: false,
      viewDetail: false,
      contentDetailNotify: "",
    };
  },
  async mounted() {
    const permision = await permission.checkPermission();
    if (permision == 0) {
      this.getPermission = "admin";
      this.showAdmin = true;
    } else {
      this.getPermission = "user";
      this.showAdmin = false;
    }
    const arrNotify = await notification.getNotification();
    arrNotify.forEach((element) => {
      var dataNotify = {};
      dataNotify.extra_date = element.extra_date.replaceAll("'", "");
      dataNotify.content = element.content.replaceAll("'", "");
      this.notify.push(dataNotify);
    });
  },
  methods: {
    deleteNoti(itemNotify) {
      this.deleteNotify = itemNotify;
      this.popupDelete = true;
    },
    async requestDelete() {
      this.popupDelete = false;
      await notification.deleteNotification(this.deleteNotify.id);
      location.reload();
    },
    viewDetailNotify(value) {
      this.contentDetailNotify = value;
      this.viewDetail = true;
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
