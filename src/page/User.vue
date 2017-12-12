<template>
  <div class="userContainer">
    <md-table>
      <md-table-header>
          <md-table-row>
              <md-table-head>姓名</md-table-head>
              <md-table-head>账号</md-table-head>
              <md-table-head>权限</md-table-head>
              <md-table-head>删除</md-table-head>
          </md-table-row>
      </md-table-header>

      <md-table-body>
          <md-table-row v-for="(row, rowIndex) in users" :key="rowIndex" :md-item="row">
              <md-table-cell>{{ row.name }}</md-table-cell>
              <md-table-cell>{{ row.username }}</md-table-cell>
              <md-table-cell>
                <md-select
                  placeholder="角色"
                  v-model="row.role"
                  @closed="changeRole(rowIndex)">
                  <md-option value="0">管理员</md-option>
                  <md-option value="1">终审者</md-option>
                  <md-option value="2">评论者</md-option>
                  <md-option value="3">一般使用者</md-option>
                </md-select>
              </md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button md-raised md-accent" @click="showDeleteDialog(row)">
                  X
                </md-button>
              </md-table-cell>
          </md-table-row>
      </md-table-body>
    </md-table>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
      <md-dialog-title>确定要删除？</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="deleteUser()">是</md-button>
        <md-button class="md-primary" @click="closeDeleteDialog()">否</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <snackbar ref="snackbar"></snackbar>
    <loading ref="loading"></loading>
  </div>
</template>

<script>

import { userListReq, deleteUserReq } from '@/service';
import snackbar from '@/components/SnackBar';
import loading from '@/components/Loading';

export default {
  data: () => ({
    nowuser: {},
    users: [
    ],
  }),
  mounted() {
    this.initData();
  },
  components: {
    loading,
    snackbar,
  },
  methods: {
    initData() {
      userListReq().then((success) => {
        if (success.User !== undefined) {
          this.users = [];
          const res = success.User;
          for (let i = 0; i < res.length; i += 1) {
            this.users.push({
              id: res[i].id,
              name: res[i].name,
              username: res[i].username,
              role: ''.concat(res[i].role),
            });
          }
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.snackbar.msg = '不知名错误！';
        this.$refs.snackbar.open();
      });
    },
    showDeleteDialog(user) {
      this.nowuser = user;
      this.$refs.dialog.open();
    },
    closeDeleteDialog() {
      this.$refs.dialog.close();
    },
    deleteUser() {
      this.$refs.loading.open();
      deleteUserReq(this.nowuser.id).then((success) => {
        if (success.message === 'success') {
          this.$refs.snackbar.msg = '删除完毕';
          this.$refs.snackbar.open();
          this.initData();
        } else {
          this.$refs.snackbar.msg = '删除失败';
          this.$refs.snackbar.open();
        }
        this.$refs.dialog.close();
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.snackbar.msg = '不知名错误！';
        this.$refs.snackbar.open();
        this.$refs.loading.close();
      });
    },
    changeRole(index) {
      setTimeout(() => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(this.users[index].role);
      }, 500);
    },
  },
};
</script>

<style>
.userContainer {
    margin-top: 3%;
    padding-top: 3%;
    padding-bottom: 3%;
    margin-left: 5%;
    width: 90%;
}
.md-table .md-table-cell.md-has-action .md-table-cell-container {
  justify-content: space-around;
  font-size: 15pt;
}
.md-table .md-table-head {
  text-align: center;
  font-size: 15pt;
}
.md-table .md-table-cell {
  text-align: center;
  font-size: 15pt;
}
</style>
