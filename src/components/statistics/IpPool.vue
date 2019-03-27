<template>
  <div style="margin: 20px;padding:20px;background-color: white">
    <Table border stripe :data="ipPoolList" :columns="ipPoolListColumns" :loading="ipPoolListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "ip-pool",
    data() {
      return {
        ipPoolListTableLoading: false,
        ipPoolList: [],
        pageSize: this.getIpPoolListSize(),
        totalCount: 1,
        currentPage: 1,
        ipPoolListColumns: [
          {title: 'ID', key: 'id', align: 'center'},
          {title: 'IP', key: 'ip', align: 'center'},
          {title: '访问时间', key: 'createTime', align: 'center'},
        ]
      }
    },
    methods: {
      ...mapMutations([
        'setIpPoolListPage',
      ]),
      ...mapGetters([
        'getIpPoolListSize'
      ]),
      ...mapActions([
        'handleIpPoolList',
      ]),
      changePage(index) {
        this.setIpPoolListPage(index);
        this.getIpPoolList();
      },
      getIpPoolList() {
        this.ipPoolListTableLoading = true;
        this.handleIpPoolList().then(value => {
          this.totalCount = value.data.totalCount;
          this.ipPoolList = value.data.ipPool;
          this.ipPoolListTableLoading = false;
        }).catch(reason => {
          this.ipPoolListTableLoading = false;
        })
      },
    },
    created() {
      this.getIpPoolList();
    },
  }
</script>

<style>

</style>
