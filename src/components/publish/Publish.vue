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
        私人文章：
        <i-switch v-model="postIsPrivate" size="large">
          <span slot="open">私人</span>
          <span slot="close">公开</span>
        </i-switch>
      </div>
    </Modal>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/markdown';
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "publish",
    components: {
      MarkdownEditor
    },
    data() {
      return {
        publishPostModal: false,
        postProp: 'ORIGINAL',
        postPropMapper: [{value: 'ORIGINAL', label: '原创'}, {value: 'COPY', label: '转载'}],
        postTopics: [{}],
        postTopicMapper: [],
        postIsPrivate: false,
        publishLoading: false,
        postTitle: '',
      }
    },
    methods: {
      ...mapMutations([
        'setEditPostId',
        'setTitle',
        'setContent',
        'setPostProp',
        'setPostIsPrivate',
        'setTopics',
      ]),
      ...mapGetters([
        'getUserAccess',
        'getEditPostId'
      ]),
      ...mapActions([
        'handlePublishPost',
        'handleEditPost',
        'handlePostInfo',
      ]),
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
        this.setTitle(this.postTitle);
        this.setContent(postContent);
        this.setPostProp(this.postProp);
        this.setPostIsPrivate(this.postIsPrivate ? 1 : 0);

        this.setTopics(topics);
        this.publishLoading = true;

        if (this.getEditPostId()) {
          this.handleEditPost().then(value => {
            this.$Message.success("修改文章成功!");
            this.doAction();
          }).catch(reason => {
            this.publishLoading = false;
            this.$Message.error("修改文章失败!");
          })
        } else {
          this.handlePublishPost().then(value => {
            this.$Message.success("发布文章成功!");
            this.doAction();
          }).catch(reason => {
            this.publishLoading = false;
            this.$Message.error("发布文章失败!");
          })
        }
      },
      doAction() {
        this.publishLoading = false;
        localStorage.markdownContent = '';
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
    mounted() {
      if (this.getEditPostId()) {
        this.handlePostInfo().then(value => {
          this.setEditPostId(value.data.postId);
          this.postTitle = value.data.title;
          this.$refs.markdownEditor.setValue(value.data.content);
          this.postProp = value.data.postProp;
          let topics = value.data.topics;
          if (topics != null) {
            if (topics.length > 0) {
              this.postTopics = [];
            }
            for(let i = 0; i < topics.length; i ++){
              this.postTopics.push({'value': topics[i]});
            }
          }
          if (value.data.postStatus === 'PRIVATE') {
            this.postIsPrivate = true
          }
        })
      }
    },
    destroyed() {
      if (this.getEditPostId()) {
        this.setEditPostId('');
        localStorage.markdownContent = '';
      }
    }
  }
</script>

<style scoped>

</style>
