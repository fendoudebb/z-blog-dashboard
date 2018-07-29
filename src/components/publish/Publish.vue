<template>
  <div style="padding: 5px">
    <Row>
      <Col span="16">
      <Form>
        <FormItem label="文章标题" :label-width="80">
          <Input v-model="artitleTitle" placeholder="请输入文章标题..."></Input>
        </FormItem>
      </Form>
      <markdown-editor v-model="content"></markdown-editor>
      </Col>
      <Col span="8" style="padding-left: 5px">
      <Card :bordered="false">
        <p slot="title">
          <!--<Icon type="ios-film-outline"></Icon>-->
          <!--<Icon type="android-send"></Icon>-->
          <Icon type="paper-airplane"></Icon>
          发布
        </p>

        <Icon type="eye"></Icon>
        文章属性：
        <Select v-model="articleProperty" style="width:90px">
          <Option v-for="item in propertyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>

        <br>
        <br>

        <Icon type="android-time"></Icon>
        文章状态：
        <Select v-model="articleStatus" style="width:90px" disabled>
          <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <br>

        <br>
        <div style="height: 1px;width: auto;background-color:#E9EAEC;"></div>
        <br>

        <Button type="success" :loading="publishLoading" @click="articleSavePublish">发布</Button>
        <Button type="ghost" :loading="publishLoading" @click="articleSaveDraft">存为草稿</Button>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/markdown'

  export default {
    name: "publish",
    components: {
      MarkdownEditor
    },
    data() {
      return {
        publishLoading: false,
        artitleTitle:'',
        content: '',
        articleStatus: 'pending',
        articleProperty: 'draft',
        statusList: [
          {
            value: 'pending',
            label: '待审核'
          },
          {
            value: 'disapproved',
            label: '审核拒绝'
          },
          {
            value: 'online',
            label: '上线'
          },
          {
            value: 'offline',
            label: '下线'
          },
        ],
        propertyList: [
          {
            value: 'draft',
            label: '草稿'
          },
          {
            value: 'open',
            label: '公开'
          },
          {
            value: 'personal',
            label: '个人'
          },
        ],
      }
    },
    methods:{
      articleSavePublish() {
        this.publishLoading = true;
        this.$Message.info("publish1");
        setTimeout(function () {
          console.log("publish3")
        }, 3000);
        this.$Message.info("publish2");
      },
      articleSaveDraft() {
        this.publishLoading = true;
        this.$Message.info("draft");
      }
    }
  }
</script>

<style scoped>

</style>
