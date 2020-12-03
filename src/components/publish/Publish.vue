<template>
  <div>
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

      <div style="margin-top: 20px">
        文章属性：
        <Select v-model="postStatus" style="width:120px">
          <Option :value=0>上线</Option>
          <Option :value=1>下线</Option>
          <Option :value=2>私有</Option>
        </Select>
        <!--        <i-switch v-model="postStatus" size="large" :true-value=0 :false-value=2>-->
        <!--          <span slot="open">公开</span>-->
        <!--          <span slot="close">私人</span>-->
        <!--        </i-switch>-->
      </div>

      <div style="margin-top: 20px" v-for="(topic, index) in postTopics" :key="index">
        文章标签：
        <Input v-model="topic.value" placeholder="请输入标签" style="width: 150px;margin-right: 10px"></Input>
        <Button type="primary" size="small" shape="circle" icon="plus-round" @click="addTopicInput"></Button>
        <Button type="error" size="small" shape="circle" icon="minus-round" @click="deleteTopicInput(index)" v-if="index > 0"></Button>
      </div>

    </Modal>
  </div>
</template>

<script>
  import marked from 'marked';
  import MarkdownEditor from '@/components/markdown';
  import {getPostInfo, publishPost} from "@/api/publish";

  marked.setOptions({
    renderer: new marked.Renderer(),
    headerIds: false,
    langPrefix: 'language-',
    mangle: false,
    // smartypants: true,
    // smartLists:true,
    xhtml: false
  });



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
        postStatus: 0,
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
          this.$Message.error("最多添加三个分类");
          return;
        }
        this.postTopics.push({});
      },
      postPublish() {
        if (!this.postTitle) {
          this.$Message.error("文章标题不能为空");
          return;
        }
        let postContent = this.$refs.markdownEditor.getValue();
        if (!postContent) {
          this.$Message.error("文章内容不能为空");
          return;
        }
        if (!this.postTopics) {
          this.$Message.error("文章分类不能为空");
          return;
        }
        let topics = [];
        for(let i = 0; i < this.postTopics.length; i ++) {
          let postTopic = this.postTopics[i];
          if (postTopic.hasOwnProperty('value') && postTopic.value.length > 0) {
            topics.push(postTopic.value);
          }
        }

        this.publishLoading = true;

        let contentHtml = marked(postContent);
        let pureContent = contentHtml.replace(/<[^>]+>/g,"");

        let data = {
          title: this.postTitle,
          topics: topics,
          content: postContent,
          content_html: contentHtml,
          prop: this.postProp,
          post_status: this.postStatus,
          description: pureContent.substring(0, 80),
          keywords: this.postTitle + "。" + topics.join(),
          word_count: pureContent.length
        };

        if (this.$route.query.postId) {
          data.id = parseInt(this.$route.query.postId)
        }

        publishPost(data).then(res => {
          this.publishLoading = false;
          if (res.code === 0) {
            this.$Message.success("操作成功");
            this.$router.push({name:'post', params:{postId: res.data.id}});
          } else {
            this.$Message.success("操作失败");
          }
        }).catch(() => {
          this.publishLoading = false;
        });
      },
    },
    created() {
      if (this.$route.query.postId) {
        getPostInfo(parseInt(this.$route.query.postId)).then(res => {
          this.postTitle = res.data.title;
          this.$refs.markdownEditor.setValue(res.data.content);
          this.postProp = res.data.prop;
          this.postStatus = res.data.post_status;
          let topics = res.data.topics;
          if (topics != null) {
            if (topics.length > 0) {
              this.postTopics = [];
            }
            for(let i = 0; i < topics.length; i ++){
              this.postTopics.push({'value': topics[i]});
            }
          }
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      if (!this.$route.query.postId && this.$refs.markdownEditor.getValue()) {
        this.$Modal.confirm({
          content:'内容还未保存，是否离开？',
          title:'提示',
          okText: '离开',
          cancelText: '取消',
          onOk: function () {
            // 正常跳转
            next()
          },
          onCancel: function () {
            // 如果取消跳转地址栏会变化，这时保持地址栏不变
            window.history.go(1)
          }
        });
      } else {
        next()
      }

    },
    destroyed() {

    }
  }
</script>

<style scoped>

</style>
