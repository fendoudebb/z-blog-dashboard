<template>
  <div style="margin: 20px;padding:20px;background-color: white">
    <div style="margin-bottom: 20px">
      <Button type="primary" @click="addNewTopic">
        <Icon type="plus-round"></Icon>
        新建标签
      </Button>
    </div>
    <Table border stripe :data="topicList" :columns="topicListColumns" :loading="topicListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "topic",
    data() {
      return {
        roles: localStorage.getItem('roles'),
        topicListTableLoading: false,
        topicList: [],
        pageSize: this.getTopicListSize(),
        totalCount: 1,
        currentPage: 1,
        topicListColumns: [
          {title: 'ID', key: 'id', align: 'center'},
          {title: '标签', key: 'name', align: 'center'},
          {title: '排序', key: 'sort', align: 'center'},
          {
            title: '操作', key: 'action', align: 'center',
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                  let deleteTopic = h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.deleteTopic(params)}}}, '删除');
                  let modifySort = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.modifySort(params)}}}, '修改排序');
                  //@formatter:on
                action.push(deleteTopic);
                action.push(modifySort);

              }
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods: {
      ...mapMutations([
        'setTopicListPage',
        'setTopic',
        'setDeleteTopicId',
        'setModifySortTopicId',
        'setTopicSort',
      ]),
      ...mapGetters([
        'getTopicListSize'
      ]),
      ...mapActions([
        'handleTopicList',
        'handleAddTopic',
        'handleDeleteTopic',
        'handleModifyTopicSort',
      ]),
      deleteTopic(params) {
        this.$Modal.confirm(
          {
            title: "删除标签",
            content: "是否删除《" + params.row.name + "》分类？",
            okText: "确认删除",
            closable: true,
            onOk: () => {
              this.setDeleteTopicId(params.row.id);
              this.handleDeleteTopic().then(value => {
                this.$Message.success("删除成功！");
                this.getTopicList();
              });
            }
          });
      },
      modifySort(params) {
        this.$Message.success("modifySort！");
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.newTopicSort,
                autofocus: true,
                placeholder: '请输入排序...'
              },
              on: {
                input: (val) => {
                  this.newTopicSort = val;
                }
              }
            })
          },
          onOk: () => {
            this.setModifySortTopicId(params.row.id);
            this.setTopicSort(this.newTopicSort);
            this.handleModifyTopicSort().then(value => {
              this.$Message.success("添加成功！");
              this.newTopicSort = '';
              this.getTopicList();
            });
          }
        })
      },
      addNewTopic() {
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
            this.setTopic(this.newTopic);
            this.handleAddTopic().then(value => {
              this.$Message.success("添加成功！");
              this.newTopic = '';
              this.getTopicList();
            });
          }
        })
      },
      getTopicList() {
        this.topicListTableLoading = true;
        this.handleTopicList().then(value => {
          this.totalCount = value.data.totalCount;
          this.topicList = value.data.topic;
          this.topicListTableLoading = false;
        }).catch(reason => {
          this.topicListTableLoading = false;
        })
      }
    },
    created() {
      this.getTopicList();
    },

  }
</script>

<style scoped>

</style>
