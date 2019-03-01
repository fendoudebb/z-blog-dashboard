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
          {title: '阅读数', key: 'pv', align: 'center'},
          {title: '评论数', key: 'commentCount', align: 'center'},
          {title: '点赞数', key: 'likeCount', align: 'center'},
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
                    this.edit(params.row.postId)
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
        'setPostId',
        'setAuditStatus',
        'setEditPostId'
      ]),
      ...mapGetters([
        'getListSize'
      ]),
      ...mapActions([
        'handlePostList',
        'handlePostStatus'
      ]),
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
        this.setPostId(post.id);
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
