<template>
  <div>
    <Table border stripe :data="pageViewList" :columns="pvListColumns" :loading="pageViewListTableLoading"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import expandRow from './PageViewDetail';
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "page-view",
    components: {expandRow},
    data() {
      return {
        pageViewListTableLoading: false,
        pageViewList: [],
        pageSize: this.getPageViewListSize(),
        totalCount: 1,
        currentPage: 1,
        pvListColumns: [
          {
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: 'ID', key: 'id', align: 'center'},
          {title: 'URL', key: 'url', align: 'center',className:'url-column'},
          {title: 'IP', key: 'ip', align: 'center'},
          {title: '访问时间', key: 'createTime', align: 'center'},
          {title: '浏览器', key: 'browser', align: 'center'},
          {title: '操作系统', key: 'os', align: 'center'},
        ]
      }
    },
    methods: {
      ...mapMutations([
        'setPageViewListPage',
      ]),
      ...mapGetters([
        'getPageViewListSize'
      ]),
      ...mapActions([
        'handlePageViewList',
      ]),
      changePage(index) {
        this.setPageViewListPage(index);
        this.getPageViewList();
      },
      getPageViewList() {
        this.pageViewListTableLoading = true;
        this.handlePageViewList().then(value => {
          this.totalCount = value.data.totalCount;
          this.pageViewList = value.data.pageView;
          this.pageViewListTableLoading = false;
        }).catch(reason => {
          this.pageViewListTableLoading = false;
        })
      },
    },
    created() {
      this.getPageViewList();
    },
  }
</script>

<style>
  .ivu-table td.url-column span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
</style>
