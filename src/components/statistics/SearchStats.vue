<template>
  <div style="margin: 20px;padding:20px;background-color: white">
    <Table border stripe :data="searchStatsList" :columns="searchStatsListColumns" :loading="searchStatsListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "search-stats",
    data() {
      return {
        searchStatsListTableLoading: false,
        searchStatsList: [],
        pageSize: this.getSearchStatsListSize(),
        totalCount: 1,
        currentPage: 1,
        searchStatsListColumns: [
          // {title: 'ID', key: 'id', align: 'center'},
          {title: '搜索时间', key: 'createTime', align: 'center'},
          {title: '关键词', key: 'keywords', align: 'center'},
          {title: '耗时', key: 'took', align: 'center'},
          {title: '命中', key: 'hits', align: 'center'},
          {title: '上游地址', key: 'referer', align: 'center'},
          {title: 'IP', key: 'ip', align: 'center'},
          {title: '浏览器', key: 'browser', align: 'center'},
          {title: '操作系统', key: 'os', align: 'center'},
        ]
      }
    },
    methods: {
      ...mapMutations([
        'setSearchStatsListPage',
      ]),
      ...mapGetters([
        'getSearchStatsListSize'
      ]),
      ...mapActions([
        'handleSearchStatsList',
      ]),
      changePage(index) {
        this.setSearchStatsListPage(index);
        this.getSearchStatsList();
      },
      getSearchStatsList() {
        this.searchStatsListTableLoading = true;
        this.handleSearchStatsList().then(value => {
          this.totalCount = value.data.totalCount;
          this.searchStatsList = value.data.searchStats;
          this.searchStatsListTableLoading = false;
        }).catch(reason => {
          this.searchStatsListTableLoading = false;
        })
      },
    },
    created() {
      this.getSearchStatsList();
    },
  }
</script>

<style>

</style>
