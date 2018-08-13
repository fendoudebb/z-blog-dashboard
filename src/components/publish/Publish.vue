<template>
  <div style="padding: 5px">
    <Row>
      <Col span="16">
      <Form>
        <FormItem label="文章标题" :label-width="80">
          <Input v-model="articleTitle" placeholder="请输入文章标题..." clearable></Input>
        </FormItem>
      </Form>
      <markdown-editor v-model="articleContent"></markdown-editor>
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
        <Input v-model="articleStatus" style="width:90px" readonly></Input>
        <br>

        <br>
        <div style="height: 1px;width: auto;background-color:#E9EAEC;"></div>
        <br>

        <Button type="success" :loading="publishLoading" @click="articleSavePublish">发布</Button>
        <Button type="ghost" :loading="publishLoading" @click="articleSaveDraft">存为草稿</Button>
        <Button type="ghost" @click="articlePreview">预览</Button>
      </Card>
      <br>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          分类
        </p>
        <Select v-model="articleCategory" clearable>
          <OptionGroup v-for="primaryCategory in categoryList" :key="primaryCategory.id" :label="primaryCategory.alias">
            <Option v-for="secondaryCategory in primaryCategory.secondaryCategories" :value="secondaryCategory.name"
                    :key="secondaryCategory.id">{{ secondaryCategory.alias }}
            </Option>
          </OptionGroup>
          <!--<Option v-for="item in categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        </Select>
      </Card>
      <br>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="key"></Icon>
          关键词
        </p>
        <Input v-model="articleKeywords" placeholder="请输入文章关键词..." clearable></Input>
      </Card>
      <br>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="compose"></Icon>
          描述
        </p>
        <Input v-model="articleDescription" placeholder="请输入文章描述..." clearable></Input>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/markdown';
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "publish",
    components: {
      MarkdownEditor
    },
    data() {
      return {
        publishLoading: false,
        articleTitle: '',
        articleContent: '',
        articleKeywords: '',
        articleDescription: '',
        articleCategory: '',
        articleStatus: '待审核',
        articleProperty: 'PUBLIC',
        categoryList: [],
        propertyList: [{value: 'PUBLIC', label: '公开'}, {value: 'PRIVATE', label: '个人'},
        ],
      }
    },
    methods: {
      ...mapMutations([
        'setTitle',
        'setContent',
        'setArticleProperty',
        'setCategory',
        'setKeywords',
        'setDescription',
      ]),
      ...mapActions([
        'handlePublishArticle',
        'handleCategoryList'
      ]),
      articleSave(articleProperty) {
        if (!this.articleTitle) {
          this.$Message.error("文章标题不能为空!");
          return;
        }
        if (!this.articleContent) {
          this.$Message.error("文章内容不能为空!");
          return;
        }
        if (!this.articleProperty) {
          this.$Message.error("文章属性不能为空!");
          return;
        }
        if (!this.articleCategory) {
          this.$Message.error("文章分类不能为空!");
          return;
        }
        if (!this.articleKeywords) {
          this.$Message.error("文章关键词不能为空!");
          return;
        }
        if (!this.articleDescription) {
          this.$Message.error("文章描述不能为空!");
          return;
        }
        this.setTitle(this.articleTitle);
        this.setContent(this.articleContent);
        this.setArticleProperty(articleProperty);
        this.setCategory(this.articleCategory);
        this.setKeywords(this.articleKeywords);
        this.setDescription(this.articleDescription);
        this.publishLoading = true;
        this.handlePublishArticle().then(value => {
          this.publishLoading = false;
          this.$Message.success("publish success");
        }).catch(reason => {
          this.publishLoading = false;
          this.$Message.error("publish fail");
        })
      },
      articleSavePublish() {
        this.articleSave(this.articleProperty);
      },
      articleSaveDraft() {
        this.articleSave('DRAFT');
      },
      articlePreview() {
        this.$Message.info("Preview");
      }
    },
    mounted() {
      this.handleCategoryList().then(value => {
        this.categoryList = value.data;
      });
    }
  }
</script>

<style scoped>

</style>
