<template>
  <div style="margin: 20px;padding:20px;background-color: white;">
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
        ]
      }
    },
    methods: {
      ...mapMutations([
        'setIpUnrecognizedListPage',
      ]),
      ...mapGetters([
        'getIpUnrecognizedListSize'
      ]),
      ...mapActions([
        'handleIpUnrecognizedList',
      ]),
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
