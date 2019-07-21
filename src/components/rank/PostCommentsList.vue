<template>
  <div style="margin: 20px;padding:20px;background-color: white;">
    <Table border stripe :highlight-row="true" :data="postCommentsList" :columns="postCommentsListColumns" :loading="postCommentsListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
      <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
            show-total></Page>
    </div>

  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "post-comments-list",
    data() {
      return {
        //  h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
        postCommentsListTableLoading: false,
        pageSize: this.getCommentsListSize(),
        totalCount: 1,
        currentPage: 1,
        postCommentsList: [],
        postCommentsListColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center',
          },
          {title: 'ID', key: 'postId', align: 'center', ellipsis:true, minWidth: 50,},
          {title: '标题', key: 'title', align: 'center', ellipsis:true, minWidth: 300,
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
                    title: params.row.title
                  }
                }, params.row.title)
              ])
            }
          },
          {title: '评论数', key: 'commentCount', align: 'center', ellipsis:true, minWidth: 100,},
          // {title: '评论数', key: 'commentCount', align: 'center'},
          // {title: '点赞数', key: 'likeCount', align: 'center'},
          {
            title: '状态', key: 'postStatus', align: 'center', ellipsis:true, minWidth: 90,
            render: (h, params) => {
              let postStatus = params.row.postStatus;
              let text = '';
              let color = '';
              if (postStatus === 'AUDIT') {
                text = '待审核';
                color = 'orange';
              } else if (postStatus === 'ONLINE') {
                text = '上线';
                color = 'green';
              } else if (postStatus === 'OFFLINE') {
                text = '下线';
                color = 'red';
              } else if (postStatus === 'PRIVATE') {
                text = '私人';
                color = 'lightskyblue';
              } else if (postStatus === 'DRAFT') {
                text = '草稿';
                color = 'lightskyblue';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 90,
            render: (h, params) => {
              let postStatus = params.row.postStatus;
              let action = [];
              if (postStatus === 'ONLINE') {
                let watch = h('Button', {props: {type: 'success', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchPostById(params.row.postId)}}}, '查看');
                action.push(watch);
              }
              return h('div', [action]);
            }
          }
        ],
      };
    },
    methods: {
      ...mapMutations([
        'setCommentsListPage',
      ]),
      ...mapGetters([
        'getCommentsListSize',
      ]),
      ...mapActions([
        'handlePostCommentsList',
      ]),
      watchPostById(postId) {
        window.open('https://www.zhangbj.com/p/' + postId + ".html");
      },

      changePage(index) {
        this.setCommentsListPage(index);
        this.getPostCommentsList();
      },

      getPostCommentsList() {
        this.postCommentsListTableLoading = true;
        this.handlePostCommentsList().then(value => {
          this.totalCount = value.data.totalCount;
          this.postCommentsList = value.data.post;
          this.postCommentsListTableLoading = false;
        }).catch(reason => {
          this.postCommentsListTableLoading = false;
        })
      }
    },
    created() {
      this.getPostCommentsList();
    },
    mounted() {

    }
  };
</script>

<style scoped>

  .ivu-table-column-center {
    white-space: nowrap !important;
  }
  .ivu-table-cell {
    white-space: nowrap !important;
  }
</style>
