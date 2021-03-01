<template>
  <div>
    <div @keyup.enter="findUsername" style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1" >
      <label>
        <Input clearable v-model="searchUsername" placeholder="搜索" style="width: 150px;"/>
      </label>
      <Button type="primary" @click="findUsername">搜索</Button>
      <Button type="ghost" @click="resetSearch">重置</Button>

      <Button type="primary" @click="addNewDashboardUser" style="float: right">
        添加管理员
      </Button>
    </div>
    <Table border stripe :data="dashboardUserList" :columns="dashboardUserListColumns" :loading="dashboardUserListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>

    <Modal
      :mask-closable="false"
      v-model="showUpsertDashboardUserModal"
      :title="dashboardUserModalTitle"
      @on-ok="onModalOkClick">

      <div>
        <label>
          用户名称：
          <Input v-model="dashboardUser.username" clearable placeholder="请输入用户名称" style="width: 400px;margin-right: 10px"/>
        </label>
      </div>
      <div v-if="!this.dashboardUser.id" style="margin-top: 20px">
        <label>
          用户密码：
          <Input v-model="dashboardUser.password" clearable placeholder="请输入用户密码" style="width: 400px;margin-right: 10px"/>
        </label>
      </div>

      <div style="margin-top: 20px">
        <label>
          用户角色：
          <Input v-model="dashboardUser.roles[0]" placeholder="请输入用户角色" style="width: 400px;margin-right: 10px"/>
        </label>
      </div>

      <div v-if="dashboardUser.id" style="margin-top: 20px">
        用户状态：
        <i-switch v-model="dashboardUser.status" size="large" :true-value="0" :false-value="1">
          <span slot="open">启用</span>
          <span slot="close">停用</span>
        </i-switch>
      </div>

    </Modal>
  </div>
</template>

<script>
  import {getDashboardUserList, upsertDashboardUser} from "@/api/dashboard_user";

  export default {
    name: "dashboard-user",
    data() {
      return {
        dashboardUserModalTitle: null,
        showUpsertDashboardUserModal: false,
        searchUsername: null,
        roles: localStorage.getItem('roles'),
        dashboardUserListTableLoading: false,
        dashboardUserList: [],
        dashboardUser: {roles:[]},
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        dashboardUserListColumns: [
          {title: 'ID', key: 'id', align: 'center', ellipsis:true, minWidth: 150,},
          {title: '用户名', key: 'username', align: 'center', ellipsis:true, minWidth: 150,},
          {title: '角色', key: 'roles', align: 'center', ellipsis:true, minWidth: 250,},
          {title: '创建时间', key: 'create_ts', align: 'center', ellipsis:true, minWidth: 150,},
          {title: '修改时间', key: 'update_ts', align: 'center', ellipsis:true, minWidth: 150,},
          {
            title: '状态', key: 'status', align: 'center', ellipsis:true, minWidth: 100,
            render: (h, params) => {
              let postStatus = params.row.status;
              let text = '';
              let color = '';
              if (postStatus === 0) {
                text = '启用';
                color = 'green';
              } else if (postStatus === 1) {
                text = '停用';
                color = 'red';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 150, fixed: 'right',
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                  let update = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.updateDashboardUser(params.row)}}}, '修改');
                //@formatter:on
                action.push(update);
              }
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods: {
      findUsername() {
        if (!this.searchUsername) {
          this.$Message.error("用户名称不能为空");
          return;
        }
        this.currentPage = 1;
        this.requestDashboardUserList();
      },
      resetSearch() {
        this.currentPage = 1;
        this.searchUsername = null;
        this.requestDashboardUserList();
      },
      onModalOkClick() {
        if (!this.dashboardUser.username) {
          this.$Message.error("用户名称不能为空");
          return;
        }
        if (!this.dashboardUser.roles[0]) {
          this.$Message.error("用户角色不能为空");
          return;
        }

        upsertDashboardUser(this.dashboardUser.id, this.dashboardUser.username, this.dashboardUser.password, this.dashboardUser.roles, this.dashboardUser.status).then(() => {
          if (this.dashboardUser.id) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.success("添加成功");
          }
          this.resetDashboardUser();
          this.requestDashboardUserList();
        })
      },
      resetDashboardUser() {
        this.dashboardUser.id = null;
        this.dashboardUser.username = null;
        this.dashboardUser.password = null;
        this.dashboardUser.status = null;
        this.dashboardUser.roles = [];
      },
      updateDashboardUser(param) {
        this.showUpsertDashboardUserModal = true;
        this.dashboardUserModalTitle = "修改管理员";
        this.dashboardUser.id = param.id;
        this.dashboardUser.username = param.username;
        this.dashboardUser.password = param.password;
        this.dashboardUser.roles = param.roles;
        this.dashboardUser.status = param.status;
      },
      addNewDashboardUser() {
        this.showUpsertDashboardUserModal = true;
        this.dashboardUserModalTitle = "新增管理员";
        if (this.dashboardUser.id) {
          this.resetDashboardUser()
        }
      },
      changePage(index) {
        this.currentPage = index;
        this.requestDashboardUserList();
      },
      requestDashboardUserList() {
        this.dashboardUserListTableLoading = true;
        getDashboardUserList(this.searchUsername, this.currentPage, this.pageSize).then(res => {
          this.totalCount = res.data.count;
          if (this.totalCount > 0) {
            this.dashboardUserList = res.data.dashboard_users;
          } else {
            this.dashboardUserList = [];
          }
          this.dashboardUserListTableLoading = false;
        }).catch(() => {
          this.dashboardUserListTableLoading = false;
        });
      }
    },
    created() {
      this.requestDashboardUserList();
    },

  }
</script>

<style scoped>
  .ivu-switch {
    border-color:#ed3f14;
    background-color:#ed3f14
  }

  .ivu-switch-checked {
    border-color:#19be6b;
    background-color:#19be6b
  }
</style>
