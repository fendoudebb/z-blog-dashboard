<template>
  <div>
    <Table border stripe :data="postList" :columns="postListColumns" :loading="postListTableLoading"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
      </div>
    </div>
    <Modal v-model="deleteTopicModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>将删除《{{deleteTopicPost.title}}》一文中的{{deleteTopic}}分类。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="deleteTopicModalLoading" @click="deleteTopicFunc(deleteTopicPost)">删除</Button>
      </div>
    </Modal>
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
        deleteTopicModal: false,
        deleteTopicModalLoading: false,
        deleteTopicPost:'',
        deleteTopic:'',
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
                        this.deleteTopicPost = params.row;
                        this.deleteTopic = topic;
                        this.deleteTopicModal = true;
                      }
                    }
                  }, topic)
                });
                if (topics.length < 3) {
                  tags.push(h('Button', {
                    props: {type: 'primary', size: 'small'}, on: {
                      click: () => {
                        this.$Message.success("添加!");
                      }
                    }
                  }, '添加'));
                }
                return h('div', tags)
              } else {
                return h('Button', {
                  props: {type: 'primary', size: 'small'}, on: {
                    click: () => {
                      this.$Message.success("添加!");
                    }
                  }
                }, '添加')
              }

            }
          },
          {title: '阅读数', key: 'pv', align: 'center'},
          // {title: '评论数', key: 'commentCount', align: 'center'},
          // {title: '点赞数', key: 'likeCount', align: 'center'},
          {
            title: '状态', key: 'status', align: 'center',
            render: (h, params) => {
              let status = params.row.status;
              let text = '';
              let color = '';
              if (status === 0) {
                text = '待审核';
                color = 'orange';
              } else if (status === 1) {
                text = '上线';
                color = 'green';
              } else if (status === 2) {
                text = '下线';
                color = 'red';
              } else if (status === 3) {
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
                let status = params.row.status;
                //@formatter:off
                  let online = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.online(params.index)}}}, '上线');
                  let offline = h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.offline(params.index)}}}, '下线');
                  //@formatter:on
                if (status === 0) {
                  action.push(online);
                } else if (status === 1) {
                  action.push(offline);
                } else if (status === 2) {
                  action.push(online);
                } else if (status === 3) {
                  action.push(online);
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
      deleteTopicFunc(deleteTopicPost) {
        this.deleteTopicModalLoading = true;
        this.setDeleteTopicPostId(deleteTopicPost.id);
        this.setDeleteTopic(this.deleteTopic);
        this.handleDeletePostTopic().then(value => {
          deleteTopicPost.topics.splice(deleteTopicPost.topics.indexOf(this.deleteTopic), 1);
          this.$Message.success("删除成功！");
          this.deleteTopicModalLoading = false;
          this.deleteTopicModal = false;
        }).catch(reason => {
          this.deleteTopicModalLoading = false;
          this.deleteTopicModal = false;
        })

      },
      online(index) {
        this.modifyPostStatus(index, 1);
      },
      offline(index) {
        this.modifyPostStatus(index, 2);
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
          this.postList[index].status = status;
          if (status === 1) {
            this.$Message.success("文章上线成功!");
          } else if (status === 2) {
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
