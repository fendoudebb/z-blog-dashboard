<template>
  <div style="padding: 5px">
    <Row>
      <Col span="15">
        <Form>
          <FormItem label="文章标题" :label-width="80">
            <Input v-model="postTitle" placeholder="请输入文章标题..." clearable></Input>
          </FormItem>
        </Form>
      </Col>
      <Col span="8" offset="1">
        <Button type="success" :loading="publishLoading" @click="publishPostModal = true">发布文章</Button>
        <Button type="ghost" :loading="publishLoading" @click="postPublish" >存为草稿</Button>
      </Col>
    </Row>

    <markdown-editor ref="markdownEditor"
                     style="height: 600px;z-index: 1"></markdown-editor>

    <Modal
      v-model="publishPostModal"
      title="发布文章"
      @on-ok="postPublish"
      @on-cancel="cancel">
      <div>
        文章类型：
        <Select v-model="postProp" style="width:120px">
          <Option v-for="item in postPropMapper" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px" v-for="(topic, index) in postTopics" :key="index">
        文章标签：
        <Input v-model="topic.value" placeholder="请输入标签" style="width: 150px;margin-right: 10px"></Input>
        <Button type="primary" size="small" shape="circle" icon="plus-round" @click="addTopicInput"></Button>
        <Button type="error" size="small" shape="circle" icon="minus-round" @click="deleteTopicInput(index)" v-if="index > 0"></Button>
      </div>

      <div style="margin-top: 20px">
        是否公开：
        <i-switch v-model="postIsPublic" size="large">
          <span slot="open">公开</span>
          <span slot="close">私人</span>
        </i-switch>
      </div>
    </Modal>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/markdown';
  import {getPostInfo, publishPost} from "@/api/publish";

  export default {
    name: "publish",
    components: {
      MarkdownEditor
    },
    data() {
      return {
        publishPostModal: false,
        postProp: 0,
        postPropMapper: [{value: 0, label: '原创'}, {value: 1, label: '转载'}],
        postTopics: [{}],
        postTopicMapper: [],
        postIsPublic: true,
        publishLoading: false,
        postTitle: '',
      }
    },
    methods: {
      deleteTopicInput(index) {
        this.postTopics.splice(index,1)
      },
      addTopicInput() {
        if (this.postTopics.length >= 3) {
          this.$Message.error("最多添加三个分类!");
          return;
        }
        this.postTopics.push({});
      },
      postPublish() {
        if (!this.postTitle) {
          this.$Message.error("文章标题不能为空!");
          return;
        }
        let postContent = this.$refs.markdownEditor.getValue();
        if (!postContent) {
          this.$Message.error("文章内容不能为空!");
          return;
        }
        if (!this.postTopics) {
          this.$Message.error("文章分类不能为空!");
          return;
        }
        let topics = [];
        for(let i = 0; i < this.postTopics.length; i ++) {
          let postTopic = this.postTopics[i];
          if (postTopic.hasOwnProperty('value') && postTopic.value.length > 0) {
            topics.push(postTopic.value);
          }
        }
        // this.setTitle(this.postTitle);
        // this.setContent(postContent);
        // this.setPostProp(this.postProp);
        // this.setPostIsPrivate(this.postIsPrivate ? 1 : 0);

        // this.setTopics(topics);
        this.publishLoading = true;

        if (this.$route.query.postId) {
          console.log(this.$refs.markdownEditor.getHtml());
          publishPost({content_html:this.$refs.markdownEditor.getHtml()}).then(res => {

          });
          /*this.handleEditPost().then(value => {
            this.$Message.success("修改文章成功!");
            this.doAction();
          }).catch(() => {
            this.publishLoading = false;
            this.$Message.error("修改文章失败!");
          })*/
        } else {
          this.handlePublishPost().then(value => {
            this.$Message.success("发布文章成功!");
            this.doAction();
          }).catch(() => {
            this.publishLoading = false;
            this.$Message.error("发布文章失败!");
          })
        }
      },
      doAction() {
        this.publishLoading = false;
        // localStorage.markdownContent = '';
        let location;
        /*if (articleProperty === 'DRAFT') {
          location = {
            name: 'article_draft'
          };
        } else {
          location = {
            name: 'article_list'
          };
        }*/
        this.$router.push({name:'post'});
      },
    },
    created() {
      console.log("传递的id#" + this.$route.query.postId);
      if (this.$route.query.postId) {
        getPostInfo(parseInt(this.$route.query.postId)).then(res => {
          this.postTitle = res.data.title;
          this.$refs.markdownEditor.setValue(res.data.content);
          this.postProp = res.data.prop;
          let topics = res.data.topics;
          if (topics != null) {
            if (topics.length > 0) {
              this.postTopics = [];
            }
            for(let i = 0; i < topics.length; i ++){
              this.postTopics.push({'value': topics[i]});
            }
          }
          if (res.data.post_status === 0) {
            this.postIsPublic = true
          }
        })
      }
    },
    destroyed() {
      if (this.$route.query.postId) {
        // localStorage.markdownContent = '';
      }
    }
  }
</script>

<style scoped>

</style>
