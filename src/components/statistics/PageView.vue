<template>
  <div style="margin: 20px;padding:20px;background-color: white">
    <Table border stripe :data="pageViewList" :columns="pageViewListColumns" :loading="pageViewListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
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
        pageViewListColumns: [
          {
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: 'URL', key: 'url', align: 'center', ellipsis:true, minWidth: 150,},
          {title: '访问时间', key: 'createTime', align: 'center' , ellipsis:true, minWidth: 150,},
          {title: '浏览器', key: 'browser', align: 'center' , ellipsis:true, minWidth: 150,},
          {title: '操作系统', key: 'os', align: 'center' , ellipsis:true, minWidth: 150,},
          {title: 'IP', key: 'ip', align: 'center' , ellipsis:true, minWidth: 150,},
          {title: '地址', key: 'address', align: 'center' , ellipsis:true, minWidth: 150,},
          {
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 150,
            render: (h, params) => {
              let watch;
              let url = params.row.url;
              if (url != null && url.indexOf('/p/') === 0) {
                watch = h('Button', {props: {type: 'success', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchPost(url)}}}, '查看文章');
              }
              return h('div', [watch]);
            }
          }
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
      watchPost(url) {
        window.open('https://www.zhangbj.com' + url);
      },
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

</style>
