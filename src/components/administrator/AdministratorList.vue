<template>
  <div style="margin: 20px;padding:20px;background-color: white">
    <div style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1">
      <Button type="primary" @click="addAdministrator">
        <Icon type="person-add"></Icon>
        添加管理员
      </Button>
    </div>
    <Table border stripe :data="administratorList" :columns="administratorListColumns" :loading="administratorListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "administrator",
    data() {
      return {
        roles: localStorage.getItem('roles'),
        administratorListTableLoading: false,
        administratorList: [],
        pageSize: this.getAdministratorListSize(),
        totalCount: 1,
        currentPage: 1,
        administratorListColumns: [
          {title: 'ID', key: 'id', align: 'center', ellipsis:true, minWidth: 150,},
          {title: '用户名', key: 'username', align: 'center', ellipsis:true, minWidth: 150,},
          {title: '密码', key: 'password', align: 'center', ellipsis:true, minWidth: 150,},
          {title: '角色', key: 'roles', align: 'center', ellipsis:true, minWidth: 250,},
          {
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 150,
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                //   let modifyName = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.modifyName(params)}}}, '修改');
                //   let deleteTopic = h('Button', {props: {type: 'error', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.deleteTopic(params)}}}, '删除');
                //@formatter:on
                // action.push(modifyName);
                // action.push(deleteTopic);
              }
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods: {
      ...mapMutations([
        'setAdministratorListPage'
      ]),
      ...mapGetters([
        'getAdministratorListSize'
      ]),
      ...mapActions([
        'handleAdministratorList',
      ]),
      addAdministrator() {
        console.log("111111");
      },
      changePage(index) {
        this.setAdministratorListPage(index);
        this.getAdministratorList();
      },
      getAdministratorList() {
        this.administratorListTableLoading = true;
        this.handleAdministratorList().then(value => {
          this.totalCount = value.data.totalCount;
          this.administratorList = value.data.sysUser;
          this.administratorListTableLoading = false;
        }).catch(reason => {
          this.administratorListTableLoading = false;
        })
      }
    },
    created() {
      this.getAdministratorList();
    },

  }
</script>

<style scoped>

</style>
