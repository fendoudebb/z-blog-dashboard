<template>
  <div>
    <div style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1" >
      <label>
        <Input clearable v-model="searchIp" placeholder="请输入IP" style="width: 150px;"/>
      </label>
      <Button type="primary" @click="findIp">搜索</Button>
      <Button type="ghost" @click="resetFindIp">重置</Button>
    </div>
    <Table border stripe :data="ipPoolList" :columns="ipPoolListColumns" :loading="ipPoolListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import {getIpPoolList} from "@/api/ip_pool";

  export default {
    name: "ip-pool",
    data() {
      return {
        roles: localStorage.getItem('roles'),
        searchIp: null,
        ipPoolListTableLoading: false,
        ipPoolList: [],
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        ipPoolListColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center',
          },
          // {title: 'ID', key: 'id', align: 'center', sortable: true},
          {title: 'IP', key: 'ip', align: 'center', ellipsis:true, minWidth: 150},
          {title: '国家', key: 'country', align: 'center', ellipsis:true, minWidth: 150},
          {title: '省份', key: 'region', align: 'center', ellipsis:true, minWidth: 100},
          {title: '城市', key: 'city', align: 'center', ellipsis:true, minWidth: 100},
          {title: '运营商', key: 'isp', align: 'center', ellipsis:true, minWidth: 100},
          {title: '国家ID', key: 'country_id', align: 'center', ellipsis:true, minWidth: 100},
          {title: '城市ID', key: 'city_id', align: 'center', ellipsis:true, minWidth: 100},
          {title: '运营商ID', key: 'isp_id', align: 'center', ellipsis:true, minWidth: 100},
          {title: '访问时间', key: 'create_ts', align: 'center', ellipsis:true, minWidth: 150,},
        ]
      }
    },
    methods: {
      findIp() {
        if (!this.searchIp) {
          this.$Message.error("搜索IP不能为空");
          return;
        }
        this.currentPage = 1;
        this.requestIpPoolList();
      },
      resetFindIp() {
        this.currentPage = 1;
        this.searchIp = null;
        this.requestIpPoolList();
      },
      changePage(index) {
        this.currentPage = index;
        this.requestIpPoolList();
      },
      requestIpPoolList() {
        this.ipPoolListTableLoading = true;
        getIpPoolList(this.searchIp, this.currentPage, this.pageSize).then(value => {
          this.totalCount = value.data.count;
          if (this.totalCount > 0) {
            this.ipPoolList = value.data.ip_pool;
          } else {
            this.ipPoolList = [];
          }
          this.ipPoolListTableLoading = false;
        }).catch(() => {
          this.ipPoolListTableLoading = false;
        })
      },
    },
    created() {
      this.requestIpPoolList();
    },
  }
</script>

<style>

</style>
