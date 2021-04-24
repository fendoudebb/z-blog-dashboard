<template>
  <div>
    <div>
      <span class="expand-key">标签: </span>
      <div v-for="(topic, index) in row.topics" :key="index" style="display: inline-block">
        <!--      <span class="expand-value">{{ topic }}</span>-->
        <Tag type="border" :closable='isAdmin' color="green" @click.native="openTopicHtml(topic)" @on-close="handleClose(topic)">{{ topic }}</Tag>
      </div>
      <Button v-if="row.topics && (row.topics.length < 3)" type="primary" size="small"  @click="addTopicFunc">添加</Button>
    </div>
    <br>
    <span class="expand-key">创建时间: </span>
    <span class="expand-value">{{ row.create_ts }}</span>
    <br>
    <br>
    <span class="expand-key">是否原创: </span>
    <span class="expand-value">{{ row.prop === 0 ? '原创' : '转载' }}</span>
    <br>
    <br>
    <span class="expand-key">是否公开: </span>
    <span class="expand-value">{{ row.post_status === 1 ? '个人' : '公开' }}</span>
    <br>
    <br>
  </div>
</template>

<script>
  import {addPostTopic, deletePostTopic} from '@/api/post';

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
      openTopicHtml(topic) {
        window.open('/topic/' + topic + ".html");
      },
      handleClose(topic) {
        this.$Modal.confirm(
          {
            title: "删除分类",
            content: "是否删除《" + this.row.title + "》一文的 " + topic + " 分类？",
            okText: "确认删除",
            closable: true,
            onOk: () => {
              deletePostTopic(this.row.id, topic).then(res => {
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
            addPostTopic(this.row.id, this.newTopic).then(res => {
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
