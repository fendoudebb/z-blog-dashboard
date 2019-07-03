<template>
  <div style="margin: 20px;padding:20px;background-color: white;">
    <div style="margin-bottom: 20px">
      <Button type="primary" @click="queryAllIp" :loading="queryLoading">
        <Icon type="ios-search"></Icon>
        查询全部
      </Button>
    </div>
    <Table border stripe :data="ipUnrecognizedList" :columns="ipUnrecognizedListColumns" :loading="ipUnrecognizedListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "ip-unrecognized",
    data() {
      return {
        queryLoading: false,
        ipUnrecognizedListTableLoading: false,
        ipUnrecognizedList: [],
        pageSize: this.getIpUnrecognizedListSize(),
        totalCount: 1,
        currentPage: 1,
        ipUnrecognizedListColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center',
          },
          {title: 'ID', key: 'id', align: 'center', sortable: true,ellipsis:true, minWidth: 150},
          {title: 'IP', key: 'ip', align: 'center', ellipsis:true, minWidth: 150},
          {title: '访问时间', key: 'createTime', align: 'center', ellipsis:true, minWidth: 150,},
          {
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 150,
            render: (h, params) => {
              let action = [];
                //@formatter:off
                let replyMessage = h('Button', {props: {type: 'primary', size: 'small', loading: this.queryLoading}, style: {marginRight: '5px'}, on: {click: () => {this.queryIp(params.row.ip)}}}, '查询');
                //@formatter:on
                action.push(replyMessage);
              return h('div', [action]);
            }
          }
        ]
      }
    },
    methods: {
      ...mapMutations([
        'setIpUnrecognizedListPage',
        'setUnrecognizedIp',
      ]),
      ...mapGetters([
        'getIpUnrecognizedListSize'
      ]),
      ...mapActions([
        'handleIpUnrecognizedList',
        'handleQueryUnrecognizedIp',
      ]),
      queryAllIp() {
        this.queryLoading = true;
        let ips = [];
        this.ipUnrecognizedList.forEach(value => {
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
          this.getIpUnrecognizedList();
        }).catch(reason => {
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
          this.getIpUnrecognizedList();
        }).catch(reason => {
          this.queryLoading = false;
        })
      },
      changePage(index) {
        this.setIpUnrecognizedListPage(index);
        this.getIpUnrecognizedList();
      },
      getIpUnrecognizedList() {
        this.ipUnrecognizedListTableLoading = true;
        this.handleIpUnrecognizedList().then(value => {
          this.totalCount = value.data.totalCount;
          this.ipUnrecognizedList = value.data.unrecognizedIp;
          this.ipUnrecognizedListTableLoading = false;
        }).catch(reason => {
          this.ipUnrecognizedListTableLoading = false;
        })
      },
    },
    created() {
      this.getIpUnrecognizedList();
    },
  }
</script>

<style>

</style>
