<template>
  <div style="margin: 20px;padding:20px;background-color: white;">
    <!--<div style="margin-bottom: 20px">
      <Button type="primary" @click="queryAllIp" :loading="queryLoading">
        <Icon type="ios-search"></Icon>
        查询全部
      </Button>
    </div>-->
    <Table border stripe :data="ipUnknownList" :columns="ipUnrecognizedListColumns" :loading="ipUnknownListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import {getIpUnknownList} from "@/api/ip_pool";

  export default {
    name: "ip-unknown",
    data() {
      return {
        queryLoading: false,
        ipUnknownListTableLoading: false,
        ipUnknownList: [],
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        ipUnrecognizedListColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center',
          },
          {title: 'IP', key: 'ip', align: 'center', ellipsis:true, minWidth: 150},
          {title: '访问时间', key: 'create_ts', align: 'center', ellipsis:true, minWidth: 150,},
          {title: '最新查询时间', key: 'update_ts', align: 'center', ellipsis:true, minWidth: 150,},
          /*{
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 150,
            render: (h, params) => {
              let action = [];
                //@formatter:off
                let replyMessage = h('Button', {props: {type: 'primary', size: 'small', loading: this.queryLoading}, style: {marginRight: '5px'}, on: {click: () => {this.queryIp(params.row.ip)}}}, '查询');
                //@formatter:on
                action.push(replyMessage);
              return h('div', [action]);
            }
          }*/
        ]
      }
    },
    methods: {
      /*queryAllIp() {
        this.queryLoading = true;
        let ips = [];
        this.ipUnknownList.forEach(value => {
          ips.push(value.ip);
        });
        this.setUnrecognizedIp(ips);
        this.handleQueryUnrecognizedIp().then(value => {
          this.queryLoading = false;
          if (value.data == null) {
            this.$Message.error("查询失败！");
          } else {
            this.$Message.success(value.data);
          }
          this.requestIpUnknownList();
        }).catch(() => {
          this.queryLoading = false;
        })
      },
      queryIp(ip) {
        this.queryLoading = true;
        this.setUnrecognizedIp(ip);
        this.handleQueryUnrecognizedIp().then(value => {
          this.queryLoading = false;
          if (value.data == null) {
            this.$Message.error("查询失败！");
          } else {
            this.$Message.success(value.data);
          }
          this.requestIpUnknownList();
        }).catch(reason => {
          this.queryLoading = false;
        })
      },*/
      changePage(index) {
        this.currentPage = index;
        this.requestIpUnknownList();
      },
      requestIpUnknownList() {
        this.ipUnknownListTableLoading = true;
        getIpUnknownList(this.currentPage, this.pageSize).then(value => {
          this.totalCount = value.data.count;
          this.ipUnknownList = value.data.ip_unknown;
          this.ipUnknownListTableLoading = false;
        }).catch(() => {
          this.ipUnknownListTableLoading = false;
        })
      },
    },
    created() {
      this.requestIpUnknownList();
    },
  }
</script>

<style>

</style>
