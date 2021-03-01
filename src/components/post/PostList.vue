<template>
  <div>
    <div style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1" >
      <div @keyup.enter="searchPostById" style="display: inline-block">
        <InputNumber clearable :min="1" v-model="searchPostId" number placeholder="请输入文章id" style="width: 150px;"/>
      </div>
      <Select @on-change="searchPostById" v-model="rankType" style="width:150px">
        <Option v-for="item in rankTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="primary" @click="searchPostById">搜索</Button>
      <Button type="ghost" @click="resetSearch">重置</Button>
    </div>
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

    <Modal
      :width="1000"
      v-model="commentReplyModal"
      title="评论回复">
      <Table stripe border :columns="commentReplyColumns" :data="commentReplyList"></Table>
    </Modal>

  </div>
</template>

<script>
  import expandRow from './PostDetail';
  import expandRow2 from './PostCommentDetail';
  import {getPostList, modifyPostStatus, getPostCommentList, deletePostComment, replyPostComment} from '@/api/post';

  export default {
    name: "post-list",
    components: {expandRow, expandRow2},
    data() {
      return {
        rankType : null,
        rankTypeList: [
          {
            value: "comment_count",
            label: "评论数"
          },
          {
            value: "like_count",
            label: "点赞数"
          },
          {
            value: "pv",
            label: "阅读数"
          },
        ],
        searchPostId: null,
        watchCommentPostId: null,
        commentTotalCount: 1,
        commentCurrentPage: 1,
        commentPageSize: 10,
        commentListTableLoading: false,
        commentModal: false,
        commentReplyModal: false,
        //  h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
        postListTableLoading: false,
        roles: localStorage.getItem('roles'),
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        postList: [],
        postListColumns: [
          {
            title:"#",type: 'expand',align: 'center', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: 'ID', key: 'id', align: 'center', ellipsis:true, minWidth: 80,},
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
          {title: '评论数', key: 'comment_count', align: 'center', ellipsis:true, minWidth: 100,},
          {title: '点赞数', key: 'like_count', align: 'center', ellipsis:true, minWidth: 100,},
          {
            title: '状态', key: 'post_status', align: 'center', ellipsis:true, minWidth: 100,
            render: (h, params) => {
              let postStatus = params.row.post_status;
              let text = '';
              let color = '';
              if (postStatus === 0) {
                text = '上线';
                color = 'green';
              } else if (postStatus === 1) {
                text = '下线';
                color = 'red';
              } else if (postStatus === 2) {
                text = '私人';
                color = 'lightskyblue';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 250, fixed: 'right',
            render: (h, params) => {
              let postStatus = params.row.post_status;
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                  let watchComment = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchComment(params)}}}, '评论');
                  let online = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.online(params.row.id)}}}, '上线');
                  let offline = h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.offline(params.row.id)}}}, '下线');
                  let edit = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.edit(params.row.id)}}}, '编辑');
                  //@formatter:on
                if (params.row.comment_count > 0) {
                  action.push(watchComment);
                }
                if (postStatus === 1) {
                  action.push(online);
                } else if (postStatus === 0) {
                  action.push(offline);
                }
                action.push(edit);
              }
              if (postStatus === 0) {
                let watch = h('Button', {props: {type: 'success', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchPostById(params.row.id)}}}, '查看');
                action.push(watch);
              }
              return h('div', [action]);
            }
          }
        ],
        commentList: [],
        commentColumns: [
          {
            type: 'expand', width: 30, render: (h, params) => {
              return h(expandRow2, {props: {row: params.row}})
            }
          },
          {title: '楼层', key: 'floor', align: 'center', minWidth: 20,},
          {
            title: '昵称', key: 'nickname', align: 'center', minWidth: 50,
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
                    title: params.row.nickname
                  }
                }, params.row.nickname)
              ])
            }
          },
          {
            title: '评论', key: 'content', align: 'center', minWidth: 80,
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
          {title: '留言时间', key: 'comment_date', align: 'center', minWidth: 50,},
          {title: '浏览器', key: 'browser', align: 'center', minWidth: 50,},
          {title: '操作系统', key: 'os', align: 'center', minWidth: 50,},
          {
            title: '状态', key: 'status', align: 'center', minWidth: 30,
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
            title: '操作', key: 'action', align: 'center', minWidth: 150, fixed: 'right',
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                  let watchCommentReply = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchCommentReply(params)}}}, '查看回复');
                  let replyComment = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.replyComment(params)}}}, '回复');
                  let deleteMessage = h('Button', {props: {type: 'error', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.deleteComment(params)}}}, '删除');
                //@formatter:on
                if (params.row.replies != null) {
                  action.push(watchCommentReply);
                }
                let commentStatus = params.row.status;
                if (commentStatus === 'OFFLINE') {

                } else {
                  action.push(replyComment);
                  action.push(deleteMessage);
                }
              }
              return h('div', [action]);
            }
          }
        ],
        commentReplyList:[],
        commentReplyColumns:[
          {title: '内容', key: 'content', align: 'center', ellipsis:true,
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
          {title: '留言时间', key: 'reply_date', align: 'center', },
          {title: '浏览器', key: 'browser', align: 'center', },
          {title: '操作系统', key: 'os', align: 'center', },
        ]
      };
    },
    methods: {
      resetSearch() {
        this.currentPage = 1;
        this.searchPostId = null;
        this.rankType = null;
        this.requestPostList();
      },
      searchPostById() {
        this.currentPage = 1;
        this.requestPostList();
      },
      watchPostById(postId) {
        window.open('/p/' + postId + ".html");
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
            replyPostComment(this.watchCommentPostId, params.row.id, this.replyContent).then(() => {
              this.replyContent = '';
              this.$Message.success("回复成功！");
              this.requestCommentList();
            });
          }
        })
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
        deletePostComment(this.watchCommentPostId, params.row.id).then(() => {
          this.$Message.success("删除成功!");
          this.requestCommentList()
        });
      },
      watchComment(params) {
        this.watchCommentPostId = params.row.id;
        this.commentModal = true;
        this.requestCommentList();
      },
      online(postId) {
        this.requestModifyPostStatus(postId, 0);
      },
      offline(postId) {
        this.requestModifyPostStatus(postId, 1);
      },
      edit(postId) {
        this.$router.push({path: 'publish', query: {postId: postId}})
      },
      commentChangePage(index) {
        this.commentCurrentPage = index;
        this.requestCommentList();
      },
      changePage(index) {
        this.currentPage = index;
        this.requestPostList();
      },
      requestCommentList() {
        this.commentListTableLoading = true;
        getPostCommentList(this.watchCommentPostId, this.commentCurrentPage, this.commentPageSize).then(res => {
          this.commentTotalCount = res.data.count;
          this.commentList = res.data.comments;
          this.commentListTableLoading = false;
        }).catch(() => {
          this.commentListTableLoading = false;
        });
      },
      requestModifyPostStatus(postId, status) {
        modifyPostStatus(postId, status).then(() => {
          if (status === 0) {
            this.$Message.success("文章上线成功");
          } else if (status === 1) {
            this.$Message.success("文章下线成功");
          }
          this.requestPostList();
        });
      },
      requestPostList() {
        this.postListTableLoading = true;
        getPostList(this.searchPostId, this.rankType, this.currentPage, this.pageSize).then(res => {
          this.totalCount = res.data.count;
          if (this.totalCount > 0) {
            this.postList = res.data.posts;
          } else {
            this.postList = [];
          }
          this.postListTableLoading = false;
        }).catch(() => {
          this.postListTableLoading = false;
        });
      }
    },
    created() {
      if (this.$route.params.postId) {
        this.searchPostId = this.$route.params.postId
      }
      this.requestPostList();
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
