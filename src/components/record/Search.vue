<template>
  <div>
    <div style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1" >
      <Button type="primary" @click="resetWatchRecord">刷新</Button>
    </div>
    <Table border stripe :data="searchRecordList" :columns="searchRecordListColumns" :loading="searchRecordListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import {getSearchRecordList} from "@/api/search_record";

  export default {
    name: "search-record",
    data() {
      return {
        roles: localStorage.getItem('roles'),
        searchRecordListTableLoading: false,
        searchRecordList: [],
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        searchRecordListColumns: [
          // {title: 'ID', key: 'id', align: 'center'},
          {title: '搜索时间', key: 'create_ts', align: 'center', ellipsis:true, minWidth: 150,},
          {
            title: '关键词', key: 'keywords', align: 'center', ellipsis:true, minWidth: 200,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.keywords
                  }
                }, params.row.keywords)
              ])
            }
          },
          {title: '耗时', key: 'took', align: 'center', ellipsis:true, minWidth: 100,},
          {title: '命中', key: 'hits', align: 'center', ellipsis:true, minWidth: 100,},
          {
            title: '上游地址', key: 'referer', align: 'center', ellipsis:true, minWidth: 250,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.referer
                  }
                }, params.row.referer)
              ])
            }
          },
          {title: 'IP', key: 'ip', align: 'center', ellipsis:true, minWidth: 150,},
          {
            title: '地址', key: 'address', align: 'center', ellipsis:true, minWidth: 200,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.address
                  }
                }, params.row.address)
              ])
            }
          },
          {title: '浏览器', key: 'browser', align: 'center', ellipsis:true, minWidth: 150,},
          {title: '操作系统', key: 'os', align: 'center', ellipsis:true, minWidth: 150,},
        ]
      }
    },
    methods: {
      changePage(index) {
        this.currentPage = index;
        this.requestSearchRecordList();
      },
      resetWatchRecord() {
        this.currentPage = 1;
        this.requestSearchRecordList();
      },
      requestSearchRecordList() {
        this.searchRecordListTableLoading = true;
        getSearchRecordList(this.currentPage, this.pageSize).then(res => {
          this.totalCount = res.data.count;
          this.searchRecordList = res.data.search_record;
          this.searchRecordListTableLoading = false;
        }).catch(() => {
          this.searchRecordListTableLoading = false;
        });

      },
    },
    created() {
      this.requestSearchRecordList();
    },
  }
</script>

<style>

</style>
