<template>
  <div>
    <div>
      <span class="expand-key">标签: </span>
      <div v-for="(topic, index) in row.topics" :key="index" style="display: inline-block">
        <!--      <span class="expand-value">{{ topic }}</span>-->
        <Tag type="border" :closable='isAdmin' color="green" @on-close="handleClose(topic)">{{ topic }}</Tag>
      </div>
      <Button v-if="row.topics.length < 3" type="primary" size="small"  @click="addTopicFunc">添加</Button>
    </div>
    <br>
    <span class="expand-key">创建时间: </span>
    <span class="expand-value">{{ row.postTime }}</span>
    <br>
    <br>
    <span class="expand-key">是否原创: </span>
    <span class="expand-value">{{ row.postProp === 'COPY' ? '转载' : '原创' }}</span>
    <br>
    <br>
    <span class="expand-key">是否公开: </span>
    <span class="expand-value">{{ row.postStatus === 'PRIVATE' ? '个人' : '公开' }}</span>
    <br>
    <br>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "post-detail",
    props: {
      row: Object
    },
    data() {
      return {
        isAdmin: localStorage.getItem('roles').indexOf("ROLE_ADMIN") > -1
      }
    },
    methods:{
      ...mapMutations([
        'setAddTopicPostId',
        'setDeleteTopicPostId',
        'setAddTopic',
        'setDeleteTopic',
      ]),
      ...mapActions([
        'handleAddPostTopic',
        'handleDeletePostTopic',
      ]),

      handleClose(topic) {
        this.$Modal.confirm(
          {
            title: "删除分类",
            content: "是否删除《" + this.row.title + "》一文的 " + topic + " 分类？",
            okText: "确认删除",
            closable: true,
            onOk: () => {
              this.setDeleteTopicPostId(this.row.id);
              this.setDeleteTopic(topic);
              this.handleDeletePostTopic().then(value => {
                this.row.topics.splice(this.row.topics.indexOf(topic), 1);
                this.$Message.success("删除成功！");
              });
            }
          });
      },
      addTopicFunc() {
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
            this.setAddTopicPostId(this.row.id);
            this.setAddTopic(this.newTopic);
            this.handleAddPostTopic().then(value => {
              if (this.row.hasOwnProperty('topics')) {
                this.row.topics.push(this.newTopic);
              } else {
                this.row.topics = [this.newTopic];
              }
              this.newTopic = '';
              this.$Message.success("添加成功！");
            });
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
