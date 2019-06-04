<template>
  <div style="margin: 20px;padding:20px;background-color: white">
    <Table border stripe :data="postList" :columns="postListColumns" :loading="postListTableLoading"></Table>
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
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: 'ID', key: 'postId', align: 'center'},
          {title: '标题', key: 'title', align: 'center'},
          {
            title: '标签', key: 'topics', align: 'center',
            render: (h, params) => {
              let topics = params.row.topics;
              if (topics != null) {
                let tags = topics.map(topic => {
                  return h('Tag', {
                    props: {color: "green", type: "border", closable: this.roles.indexOf("ROLE_ADMIN") > -1}, on: {
                      "on-close": () => {//绑定事件
                        /*this.deleteTopicPost = params.row;
                        this.deleteTopic = topic;
                        this.deleteTopicModal = true;*/
                        this.$Modal.confirm(
                          {
                            title: "删除分类",
                            content: "是否删除《" + params.row.title + "》一文的 " + topic + " 分类？",
                            okText: "确认删除",
                            closable: true,
                            onOk: () => {
                              this.setDeleteTopicPostId(params.row.id);
                              this.setDeleteTopic(topic);
                              this.handleDeletePostTopic().then(value => {
                                params.row.topics.splice(params.row.topics.indexOf(topic), 1);
                                this.$Message.success("删除成功！");
                              });
                            }
                          });

                      }
                    }
                  }, topic)
                });
                if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                  if (topics.length < 3) {
                    tags.push(h('Button', {
                      props: {type: 'primary', size: 'small'}, on: {
                        click: () => {
                          this.addTopicFunc(params.row);
                        }
                      }
                    }, '添加'));
                  }
                }
                return h('div', tags)
              } else {
                if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                  return h('Button', {
                    props: {type: 'primary', size: 'small'}, on: {
                      click: () => {
                        this.addTopicFunc(params.row);
                      }
                    }
                  }, '添加');
                }
              }
            }
          },
          {title: '阅读数', key: 'pv', align: 'center'},
          // {title: '评论数', key: 'commentCount', align: 'center'},
          // {title: '点赞数', key: 'likeCount', align: 'center'},
          {
            title: '状态', key: 'postStatus', align: 'center',
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
            title: '操作', key: 'action', align: 'center',
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                let postStatus = params.row.postStatus;
                //@formatter:off
                  let watchComment = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.watchComment(params)}}}, '评论');
                  let online = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.online(params.index)}}}, '上线');
                  let offline = h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.offline(params.index)}}}, '下线');
                  let edit = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.edit(params.row.id)}}}, '编辑');
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
        'setAddTopicPostId',
        'setDeleteTopicPostId',
        'setAddTopic',
        'setDeleteTopic',
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
        'handleAddPostTopic',
        'handleDeletePostTopic',
        'handlePostCommentList',
        'handleDeletePostComment',
      ]),
      addTopicFunc(params) {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.newTopic,
                autofocus: true,
                placeholder: '请输入标签名...'
              },
              on: {
                input: (val) => {
                  this.newTopic = val;
                }
              }
            })
          },
          onOk: () => {
            this.setAddTopicPostId(params.id);
            this.setAddTopic(this.newTopic);
            this.handleAddPostTopic().then(value => {
              if (params.hasOwnProperty('topics')) {
                params.topics.push(this.newTopic);
              } else {
                params.topics = [this.newTopic];
              }
              this.newTopic = '';
              this.$Message.success("添加成功！");
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
        this.$router.push({name: 'publish_index'})
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
        this.setPostCommentListPage(index);
        this.getCommentList();
      },
      changePage(index) {
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

</style>
