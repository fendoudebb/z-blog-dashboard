<template>
  <div style="margin: 20px;padding:20px;background-color: white;">
    <Table border stripe :highlight-row="true" :data="postCommentsList" :columns="postCommentsListColumns" :loading="postCommentsListTableLoading"></Table>
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

    <Modal
      :width="1000"
      v-model="commentReplyModal"
      title="评论回复">
      <Table stripe border :columns="commentReplyColumns" :data="commentReplyList"></Table>


    </Modal>

  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';
  import {replyPostComment} from '@/api/rank_post';

  export default {
    name: "post-comments-list",
    data() {
      return {
        roles: localStorage.getItem('roles'),
        watchCommentPostId: '',
        commentPageSize: this.getPostCommentListSize(),
        commentTotalCount: 1,
        commentCurrentPage: 1,
        commentListTableLoading: false,
        commentModal: false,
        commentReplyModal: false,
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
          {title: 'ID', key: 'postId', align: 'center', ellipsis:true, minWidth: 60,},
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
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 200,
            render: (h, params) => {
              let postStatus = params.row.postStatus;
              let action = [];
              if (postStatus === 'ONLINE') {
                let watchComment = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchComment(params)}}}, '查看评论');
                let watchPost = h('Button', {props: {type: 'success', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchPostById(params.row.postId)}}}, '查看文章');
                action.push(watchComment);
                action.push(watchPost);
              }
              return h('div', [action]);
            }
          }
        ],
        commentList: [],
        commentColumns: [
          {title: '楼层', key: 'floor', align: 'center',minWidth: 80,},
          {title: '昵称', key: 'nickname', align: 'center', minWidth: 100},
          {title: '内容', key: 'content', align: 'center', ellipsis:true, minWidth: 300,
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
                    title: params.row.content
                  }
                }, params.row.content)
              ])
            }
          },
          {title: '留言时间', key: 'commentTime', align: 'center', minWidth: 150},
          {title: '浏览器', key: 'browser', align: 'center', minWidth: 150},
          {title: '操作系统', key: 'os', align: 'center', minWidth: 100},
          {title: 'IP', key: 'ip', align: 'center', minWidth: 150},
          {title: 'IP归属地', key: 'address', align: 'center', minWidth: 150,
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
            title: '状态', key: 'status', align: 'center', minWidth: 100,
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
            title: '操作', key: 'action', align: 'center', minWidth: 200,
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                let watchCommentReply = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchCommentReply(params)}}}, '查看回复');
                let replyComment = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.replyComment(params)}}}, '回复');
                let deleteComment = h('Button', {props: {type: 'error', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.deleteComment(params)}}}, '删除');
                //@formatter:on
                if (params.row.replies != null) {
                  action.push(watchCommentReply);
                }
                let commentStatus = params.row.status;
                if (commentStatus === 'OFFLINE') {

                } else {
                  action.push(replyComment);
                  action.push(deleteComment);
                }
              }
              return h('div', [action]);
            }
          }
        ],
        commentReplyList:[],
        commentReplyColumns:[
          {title: '内容', key: 'replyContent', align: 'center', ellipsis:true, minWidth: 300,
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
                    title: params.row.replyContent
                  }
                }, params.row.replyContent)
              ])
            }
          },
          {title: '留言时间', key: 'replyTime', align: 'center', minWidth: 150},
          {title: '浏览器', key: 'browser', align: 'center', minWidth: 150},
          {title: '操作系统', key: 'os', align: 'center', minWidth: 100},
        ]
      };
    },
    methods: {
      replyPostComment,
      ...mapMutations([
        'setCommentsListPage',
        'setCommentPostId',
        'setCommentId',
        'setPostCommentListPage'
      ]),
      ...mapGetters([
        'getCommentsListSize',
        'getPostCommentListSize',
      ]),
      ...mapActions([
        'handlePostCommentsList',
        'handlePostCommentList',
        'handleDeletePostComment',
        'handleReplyComment',
      ]),
      watchPostById(postId) {
        window.open('https://www.zhangbj.com/p/' + postId + ".html");
      },

      watchCommentReply(params) {
        this.commentReplyModal = true;
        this.commentReplyList = params.row.replies
      },

      replyComment(params) {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.replyContent,
                autofocus: true,
                type:'textarea',
                rows:10,
                placeholder: '请输入回复...'
              },
              on: {
                input: (val) => {
                  this.replyContent = val;
                }
              }
            })
          },
          onOk: () => {
            this.replyPostComment(this.watchCommentPostId, params.row.commentId, this.replyContent).then(res => {
              this.replyContent = '';
              this.$Message.success("回复成功！");
              this.getCommentList();
            }).catch(err => {
              this.$Message.error(err);
            });
          }
        })
      },

      deleteComment(params) {
        this.setCommentId(params.row.commentId);
        this.handleDeletePostComment().then(value => {
          this.$Message.success("删除成功!");
          this.getCommentList()
        });
      },

      onVisibleChange(isShow) {
        if (!isShow) {
          this.watchCommentPostId = '';
          this.commentList = [];
          this.commentCurrentPage = 1;
          this.commentTotalCount = 1;
        }
      },

      watchComment(params) {
        this.watchCommentPostId = params.row.id;
        this.commentModal = true;
        this.getCommentList();
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

      commentChangePage(index) {
        this.commentCurrentPage = index;
        this.setPostCommentListPage(index);
        this.getCommentList();
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
