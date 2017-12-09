<template>
<div class="userContainer">
  <md-table v-once>
    <md-table-header>
        <md-table-row>
            <md-table-head>姓名</md-table-head>
            <md-table-head>账号</md-table-head>
            <md-table-head>权限</md-table-head>
            <md-table-head>删除</md-table-head>
        </md-table-row>
    </md-table-header>

    <md-table-body>
        <md-table-row v-for="(row, index) in 3" :key="index">
            <md-table-cell>{{ users[index].name }}</md-table-cell>
            <md-table-cell>{{ users[index].username }}</md-table-cell>
            <md-table-cell>
              <md-select
                placeholder="角色"
                v-model="users[index].role"
                @selected="changeRole(index)">
                <md-option value="0">管理员</md-option>
                <md-option value="1">终审者</md-option>
                <md-option value="2">评论者</md-option>
                <md-option value="3">一般使用者</md-option>
              </md-select>
            </md-table-cell>
            <md-table-cell>
              <md-button class="md-icon-button md-raised md-accent" @click="showDeleteDialog(users[index])">
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
</div>
</template>

<script>

export default {
  data: () => ({
    nowuser: {},
    users: [
      {
        name: 'ckj',
        username: 'ckj',
        role: '0',
        id: 123,
      },
      {
        name: 'wzx',
        username: 'wzx',
        role: '1',
        id: 123,
      },
      {
        name: 'zyz',
        username: 'zyz',
        role: '2',
        id: 123,
      },
    ],
  }),
  methods: {
    showDeleteDialog(user) {
      this.nowuser = user;
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(user.role);
      this.$refs.dialog.open();
    },
    closeDeleteDialog() {
      this.$refs.dialog.close();
    },
    deleteUser() {
      this.$refs.dialog.open();
    },
    changeRole(index) {
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(index);
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
