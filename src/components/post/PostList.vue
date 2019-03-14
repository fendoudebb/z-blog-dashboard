<template>
  <div>
    <Table border stripe :data="postList" :columns="postListColumns" :loading="postListTableLoading"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import expandRow from './PostDetail';
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "post-list",
    components: {expandRow},
    data() {
      return {
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
            title: '分类', key: 'topics', align: 'center',
            render: (h, params) => {
              let topics = params.row.topics;
              if (topics != null) {
                let tags = topics.map(topic => {
                  return h('Tag', {
                    props: {color: "green", type: "border", closable: true}, on: {
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
                if (topics.length < 3) {
                  tags.push(h('Button', {
                    props: {type: 'primary', size: 'small'}, on: {
                      click: () => {
                        this.addTopicFunc(params.row);
                      }
                    }
                  }, '添加'));
                }
                return h('div', tags)
              } else {
                return h('Button', {
                  props: {type: 'primary', size: 'small'}, on: {
                    click: () => {
                      this.addTopicFunc(params.row);
                    }
                  }
                }, '添加');
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
                  let online = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.online(params.index)}}}, '上线');
                  let offline = h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.offline(params.index)}}}, '下线');
                  //@formatter:on
                if (postStatus === 'AUDIT' || postStatus === 'OFFLINE') {
                  action.push(online);
                } else if (postStatus === 'ONLINE') {
                  action.push(offline);
                }
              }
              let edit = h('Button', {
                props: {type: 'primary', size: 'small'},
                style: {marginRight: '5px'},
                on: {
                  click: () => {
                    this.edit(params.row.id)
                  }
                }
              }, '编辑');
              action.push(edit);
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
        'setDeleteTopic'
      ]),
      ...mapGetters([
        'getListSize'
      ]),
      ...mapActions([
        'handlePostList',
        'handlePostStatus',
        'handleAddPostTopic',
        'handleDeletePostTopic',
      ]),
      addTopicFunc(params) {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.newTopic,
                autofocus: true,
                placeholder: '请输入分类名...'
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
        this.setAuditPostId(post.id);
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
      changePage(index) {
        this.setListPage(index);
        this.getPostList();
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
