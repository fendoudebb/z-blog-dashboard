<template>
  <div>
    <div style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1">
      <label>
        <Input clearable v-model="searchTopic" placeholder="搜索" style="width: 150px;"/>
      </label>
      <Button type="primary" @click="findTopic">搜索</Button>
      <Button type="ghost" @click="resetSearch">重置</Button>

      <Button type="primary" @click="addNewTopic" style="float: right">
        添加标签
      </Button>
    </div>
    <Table border stripe :data="topicList" :columns="topicListColumns" :loading="topicListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
      <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
            show-total></Page>
    </div>

    <Modal
      v-model="showUpsertTopicModal"
      :title="topicModalTitle"
      @on-ok="onUpsertTopicModalOkClick">

      <div>
        <label>
          标签：
          <Input v-model="topicName" clearable placeholder="请输入标签" style="width: 400px;margin-right: 10px"></Input>
        </label>
      </div>
      <div style="margin-top: 20px" v-if="modifyTopicId">
        排序：
        <InputNumber clearable :min="1" v-model="topicSort" number placeholder="请输入排序"
                     style="width: 400px;margin-right: 10px"/>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {getTopicList, upsertTopic} from "@/api/topic";

  export default {
    name: "topic",
    data() {
      return {
        roles: localStorage.getItem('roles'),
        topicName: null,
        topicSort: null,
        modifyTopicId: null,
        showUpsertTopicModal: false,
        topicModalTitle: null,
        searchTopic: null,
        topicListTableLoading: false,
        topicList: [],
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        topicListColumns: [
          {title: 'ID', key: 'id', align: 'center', ellipsis: true, minWidth: 50,},
          {title: '标签', key: 'name', align: 'center', ellipsis: true, minWidth: 100,},
          {title: '排序', key: 'sort', align: 'center', ellipsis: true, minWidth: 50,},
          {title: '创建时间', key: 'create_ts', align: 'center', ellipsis: true, minWidth: 150,},
          {title: '更新时间', key: 'update_ts', align: 'center', ellipsis: true, minWidth: 150,},
          {
            title: '操作', key: 'action', align: 'center', ellipsis: true, minWidth: 50,
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                let updateTopic = h('Button', {
                  props: {type: 'primary', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.updateOldTopic(params.row)
                    }
                  }
                }, '修改');
                //@formatter:on
                action.push(updateTopic);
              }
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods: {
      resetSearch() {
        this.currentPage = 1;
        this.searchTopic = null;
        this.requestTopicList();
      },
      findTopic() {
        if (!this.searchTopic) {
          this.$Message.error("搜索标签不能为空");
          return;
        }
        this.currentPage = 1;
        this.requestTopicList();
      },

      onUpsertTopicModalOkClick() {
        if (!this.topicName) {
          this.$Message.error("标签不能为空");
          return;
        }
        if (this.modifyTopicId && !this.topicSort) {
          this.$Message.error("排序不能为空");
          return;
        }
        upsertTopic(this.modifyTopicId, this.topicName, this.topicSort).then(() => {
          if (this.modifyTopicId) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.success("添加成功");
          }
          this.resetTopicEntity();
          this.requestTopicList();
        })
      },
      updateOldTopic(params) {
        this.showUpsertTopicModal = true;
        this.topicModalTitle = "修改标签";
        this.modifyTopicId = params.id;
        this.topicName = params.name;
        this.topicSort = params.sort;
      },
      addNewTopic() {
        this.showUpsertTopicModal = true;
        this.topicModalTitle = "添加标签";
        this.resetTopicEntity();
      },
      resetTopicEntity() {
        this.modifyTopicId = null;
        this.topicName = null;
        this.topicSort = null;
      },
      changePage(index) {
        this.currentPage = index;
        this.requestTopicList();
      },
      requestTopicList() {
        this.topicListTableLoading = true;
        getTopicList(this.searchTopic, this.currentPage, this.pageSize).then(res => {
          this.totalCount = res.data.count;
          if (this.totalCount > 0) {
            this.topicList = res.data.topics;
          } else {
            this.topicList = [];
          }
          this.topicListTableLoading = false;
        }).catch(() => {
          this.topicListTableLoading = false;
        });
      }
    },
    created() {
      this.requestTopicList();
    },

  }
</script>

<style scoped>

</style>
