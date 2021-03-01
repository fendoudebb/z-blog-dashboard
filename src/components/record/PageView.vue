<template>
  <div>
    <div style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1" >
      <Select @on-change="watchPv" v-model="pvType" style="width:150px">
        <Option v-for="item in pvTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="primary" @click="watchPv">查看</Button>
      <Button type="ghost" @click="resetWatchPv">重置</Button>
    </div>
    <Table border stripe :data="pageViewList" :columns="pageViewListColumns" :loading="pageViewListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import expandRow from './PageViewDetail';
  import {getPageViewList} from "@/api/page_view";

  export default {
    name: "page-view",
    components: {expandRow},
    data() {
      return {
        roles: localStorage.getItem('roles'),
        pvType : 0,
        pvTypeList: [
          {
            value: 0,
            label: "常规"
          },
          {
            value: 1,
            label: "不合法"
          },
        ],
        pageViewListTableLoading: false,
        pageViewList: [],
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        pageViewListColumns: [
          {
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {
            title: 'URL', key: 'url', align: 'center', ellipsis:true, minWidth: 150,
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
                    title: params.row.url
                  }
                }, params.row.url)
              ])
            }
          },
          {
            title: '请求方法', key: 'req_method', align: 'center', ellipsis:true, minWidth: 100,
            render: (h, params) => {
              let reqMethod = params.row.req_method;
              let text;
              if (reqMethod === 0) {
                text = 'GET';
              } else if (reqMethod === 1) {
                text = 'POST';
              } else if (reqMethod === 2) {
                text = 'PUT';
              } else if (reqMethod === 3) {
                text = 'DELETE';
              } else if (reqMethod === 4) {
                text = 'OPTION';
              } else {
                text = 'OTHER';
              }
              // return h('span', [text]);
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: params.row.req_param ? 'red' : ''
                  },
                  domProps: {
                    title: "请求参数\n" + (params.row.req_param ? params.row.req_param : "无")
                  }
                }, text)
              ])
            }
          },
          {title: '访问时间', key: 'create_ts', align: 'center' , ellipsis:true, minWidth: 150,},
          {title: '耗时', key: 'cost_time', align: 'center' , ellipsis:true, minWidth: 100,},
          {title: '浏览器', key: 'browser', align: 'center' , ellipsis:true, minWidth: 150,},
          {title: '操作系统', key: 'os', align: 'center' , ellipsis:true, minWidth: 150,},
          {title: 'IP', key: 'ip', align: 'center' , ellipsis:true, minWidth: 150,},
          {
            title: '地址', key: 'address', align: 'center' , ellipsis:true, minWidth: 200,
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
          {
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 150,
            render: (h, params) => {
              let watch;
              let url = params.row.url;
              let method = params.row.req_method;
              if (method !== 1) { // POST
                if (url != null && url.indexOf('/p/') === 0) {
                  watch = h('Button', {props: {type: 'success', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchPost(url)}}}, '查看文章');
                } else {
                  watch = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchPost(url)}}}, '查看页面');
                }
              }
              return h('div', [watch]);
            }
          }
        ]
      }
    },
    methods: {
      resetWatchPv() {
        this.currentPage = 1;
        this.pvType = 0;
        this.requestPageViewList();
      },
      watchPv() {
        this.currentPage = 1;
        this.requestPageViewList();
      },
      watchPost(url) {
        window.open(url);
      },
      changePage(index) {
        this.currentPage = index;
        this.requestPageViewList();
      },
      requestPageViewList() {
        this.pageViewListTableLoading = true;
        getPageViewList(this.pvType, this.currentPage, this.pageSize).then(res => {
          this.totalCount = res.data.count;
          this.pageViewList = res.data.page_view;
          this.pageViewListTableLoading = false;
        }).catch(() => {
          this.pageViewListTableLoading = false;
        });
      },
    },
    created() {
      this.requestPageViewList();
    },
  }
</script>

<style>

</style>
