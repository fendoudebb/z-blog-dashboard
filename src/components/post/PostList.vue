<template>
  <div style="margin: 20px;padding:20px;background-color: white;">
    <Table border stripe :highlight-row="true" :data="postList" :columns="postListColumns" :loading="postListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
      <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
            show-total></Page>
    </div>

    <Modal
      @on-visible-change="onVisibleChange"
      :width="1000"
      v-model="commentModal"
      title="文章评论">
      <Table stripe border :columns="commentColumns" :data="commentList" :loading="commentListTableLoading"></Table>

      <div style="margin: 20px;overflow: hidden">
        <Page :page-size="commentPageSize" :total="commentTotalCount" :current="commentCurrentPage"
              @on-change="commentChangePage" show-elevator
              show-total></Page>
      </div>
    </Modal>

  </div>
</template>

<script>
  import expandRow from './PostDetail';
  import expandRow2 from './PostCommentDetail';
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "post-list",
    components: {expandRow, expandRow2},
    data() {
      return {
        watchCommentPostId: '',
        commentPageSize: this.getPostCommentListSize(),
        commentTotalCount: 1,
        commentCurrentPage: 1,
        commentListTableLoading: false,
        commentModal: false,
        //  h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
        postListTableLoading: false,
        roles: localStorage.getItem('roles'),
        pageSize: this.getListSize(),
        totalCount: 1,
        currentPage: 1,
        postList: [],
        postListColumns: [
          {
            title:"#",type: 'expand',align: 'center', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: 'ID', key: 'postId', align: 'center', ellipsis:true, minWidth: 80,},
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
          {title: '阅读数', key: 'pv', align: 'center', ellipsis:true, minWidth: 100,},
          {title: '评论数', key: 'commentCount', align: 'center', ellipsis:true, minWidth: 100,},
          {title: '点赞数', key: 'likeCount', align: 'center', ellipsis:true, minWidth: 100,},
          {
            title: '状态', key: 'postStatus', align: 'center', ellipsis:true, minWidth: 100,
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
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 250,
            render: (h, params) => {
              let postStatus = params.row.postStatus;
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                  let watchComment = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchComment(params)}}}, '评论');
                  let online = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.online(params.index)}}}, '上线');
                  let offline = h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.offline(params.index)}}}, '下线');
                  let edit = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.edit(params.row.postId)}}}, '编辑');
                  //@formatter:on
                if (params.row.commentCount > 0) {
                  action.push(watchComment);
                }
                if (postStatus === 'AUDIT' || postStatus === 'OFFLINE') {
                  action.push(online);
                } else if (postStatus === 'ONLINE') {
                  action.push(offline);
                }
                action.push(edit);
              }
              if (postStatus === 'ONLINE') {
                let watch = h('Button', {props: {type: 'success', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchPostById(params.row.postId)}}}, '查看');
                action.push(watch);
              }
              return h('div', [action]);
            }
          }
        ],
        commentList: [],
        commentColumns: [
          {
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow2, {props: {row: params.row}})
            }
          },
          {title: '楼层', key: 'floor', align: 'center'},
          {title: '昵称', key: 'nickname', align: 'center'},
          {title: '留言时间', key: 'commentTime', align: 'center'},
          {title: '浏览器', key: 'browser', align: 'center'},
          {title: '操作系统', key: 'os', align: 'center'},
          {
            title: '状态', key: 'status', align: 'center',
            render: (h, params) => {
              let commentStatus = params.row.status;
              let text = '';
              let color = '';
              if (commentStatus === 'ONLINE') {
                text = '上线';
                color = 'green';
              } else if (commentStatus === 'OFFLINE') {
                text = '下线';
                color = 'red';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '操作', key: 'action', align: 'center',
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                  let deleteMessage = h('Button', {props: {type: 'error', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.deleteComment(params)}}}, '删除');
                //@formatter:on
                let commentStatus = params.row.status;
                if (commentStatus === 'OFFLINE') {

                } else {
                  action.push(deleteMessage);
                }
              }
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods: {
      ...mapMutations([
        'setListPage',
        'setAuditPostId',
        'setAuditStatus',
        'setEditPostId',
        'setCommentPostId',
        'setPostCommentListPage',
        'setCommentId',
      ]),
      ...mapGetters([
        'getListSize',
        'getPostCommentListSize',
      ]),
      ...mapActions([
        'handlePostList',
        'handlePostStatus',
        'handlePostCommentList',
        'handleDeletePostComment',
      ]),
      watchPostById(postId) {
        window.open('https://www.zhangbj.com/p/' + postId + ".html");
      },
      onVisibleChange(isShow) {
        if (!isShow) {
          this.watchCommentPostId = '';
          this.commentList = [];
          this.commentCurrentPage = 1;
          this.commentTotalCount = 1;
        }
      },
      deleteComment(params) {
        this.setCommentId(params.row.commentId);
        this.handleDeletePostComment().then(value => {
          this.$Message.success("删除成功!");
          this.getCommentList()
        });
      },
      watchComment(params) {
        this.watchCommentPostId = params.row.id;
        this.commentModal = true;
        this.getCommentList();
      },
      online(index) {
        this.modifyPostStatus(index, 'ONLINE');
      },
      offline(index) {
        this.modifyPostStatus(index, 'OFFLINE');
      },
      edit(postId) {
        this.setEditPostId(postId);
        this.$router.push({name: 'publish'})
      },
      modifyPostStatus(index, status) {
        let post = this.postList[index];
        this.setAuditPostId(post.postId);
        this.setAuditStatus(status);
        this.handlePostStatus().then(value => {
          this.postList[index].postStatus = status;
          if (status === 'ONLINE') {
            this.$Message.success("文章上线成功!");
          } else if (status === 'OFFLINE') {
            this.$Message.warning("文章已下线!");
          }
        });
      },
      commentChangePage(index) {
        this.commentCurrentPage = index;
        this.setPostCommentListPage(index);
        this.getCommentList();
      },
      changePage(index) {
        this.currentPage = index;
        this.setListPage(index);
        this.getPostList();
      },
      getCommentList() {
        this.commentListTableLoading = true;
        this.setCommentPostId(this.watchCommentPostId);
        this.handlePostCommentList().then(value => {
          this.commentTotalCount = value.data.commentCount;
          this.commentList = value.data.postComment;
          this.commentListTableLoading = false;
        }).catch(reason => {
          this.commentListTableLoading = false;
        })
      },
      getPostList() {
        this.postListTableLoading = true;
        this.handlePostList().then(value => {
          this.totalCount = value.data.totalCount;
          this.postList = value.data.post;
          this.postListTableLoading = false;
        }).catch(reason => {
          this.postListTableLoading = false;
        })
      }
    },
    created() {
      this.getPostList();
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
