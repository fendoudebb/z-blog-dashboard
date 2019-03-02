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
        <Select v-model="postIsCopy" style="width:120px">
          <Option v-for="item in postIsCopyMapper" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px">
        文章分类：
        <Select v-model="postTopic" style="width:150px">
          <Option v-for="item in postTopicMapper" :value="item.id" :key="item.value">{{ item.name }}</Option>
        </Select>
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
        postIsCopy: 0,
        postIsCopyMapper: [{value: 0, label: '原创'}, {value: 1, label: '转载'}],
        postTopic: [],
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
        'setPostIsPrivate',
        'setTopic',
        'setKeywords',
        'setDescription',
      ]),
      ...mapGetters([
        'getUserAccess',
        'getEditPostId'
      ]),
      ...mapActions([
        'handleTopicList',
        'handlePublishPost',
        'handleEditPost',
        'handlePostInfo',
      ]),
      postPublish() {
        if (!this.postTitle) {
          this.$Message.error("文章标题不能为空!");
          return;
        }
        let postContent = this.$refs.markdownEditor.getValue();
        console.log("postContent: " + postContent);
        if (!postContent) {
          this.$Message.error("文章内容不能为空!");
          return;
        }
        if (!this.postTopic) {
          this.$Message.error("文章分类不能为空!");
          return;
        }
        this.setTitle(this.postTitle);
        this.setContent(postContent);
        this.setPostIsPrivate(this.postIsPrivate ? 1 : 0);
        this.setTopic(this.postTopic);
        this.publishLoading = true;

        if (this.getEditPostId() > 0) {
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
            console.log(reason);
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
        this.$router.push({name:'post_list'});
      },
    },
    mounted() {
      this.handleTopicList().then(value => {
        this.postTopicMapper = value.data.topic;
        if (this.getEditPostId() > 0) {
          this.handlePostInfo().then(value => {
            this.postTitle = value.data.title;
            this.$refs.markdownEditor.setValue(value.data.content);
          })
        }
      });

    },
    destroyed() {
      console.log("destroy");
      if (this.getEditPostId() > 0) {
        this.setEditPostId(-1);
        localStorage.markdownContent = '';
      }
    }
  }
</script>

<style scoped>

</style>
