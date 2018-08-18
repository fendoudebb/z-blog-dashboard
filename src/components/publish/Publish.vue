<template>
  <div style="padding: 5px">
    <Row>
      <Col span="20">
      <Form>
        <FormItem label="文章标题" :label-width="80">
          <Input v-model="articleTitle" placeholder="请输入文章标题..." clearable></Input>
        </FormItem>
      </Form>
      <markdown-editor ref="markdownEditor"
                       style="height: 600px"></markdown-editor>
      </Col>
      <Col span="4" style="padding-left: 5px">
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

        <div style="height: 1px;width: auto;background-color:#E9EAEC;"></div>
        <br>

        <Button type="success" :loading="publishLoading" @click="articleSavePublish">发布</Button>
        <Button type="ghost" :loading="publishLoading" @click="articleSaveDraft" v-if="showDraftBtn">存为草稿
        </Button>
        <!--<Button type="ghost" @click="articlePreview">预览</Button>-->
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
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "publish",
    components: {
      MarkdownEditor
    },
    data() {
      return {
        publishLoading: false,
        articleTitle: '',
        articleKeywords: '',
        articleDescription: '',
        articleCategory: '',
        articleProperty: 'PUBLIC',
        showDraftBtn: true,
        categoryList: [],
        propertyList: [{value: 'PUBLIC', label: '公开'}, {value: 'PRIVATE', label: '个人'}],
      }
    },
    methods: {
      ...mapMutations([
        'setEditArticleId',
        'setTitle',
        'setContent',
        'setArticleProperty',
        'setCategory',
        'setKeywords',
        'setDescription',
      ]),
      ...mapGetters([
        'getUserAccess',
        'getEditArticleId'
      ]),
      ...mapActions([
        'handleCategoryList',
        'handlePublishArticle',
        'handleEditArticle',
        'handleArticleInfo',
        'handlePreviewEditArticle'
      ]),
      articleSave(articleProperty) {
        if (!this.articleTitle) {
          this.$Message.error("文章标题不能为空!");
          return;
        }
        let articleContent = this.$refs.markdownEditor.getValue();
        console.log("articleContent: " + articleContent);
        if (!articleContent) {
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
        this.setContent(articleContent);
        this.setArticleProperty(articleProperty);
        this.setCategory(this.articleCategory);
        this.setKeywords(this.articleKeywords);
        this.setDescription(this.articleDescription);
        this.publishLoading = true;

        if (this.getEditArticleId() > 0) {
          this.handleEditArticle().then(value => {
            this.$Message.success("修改文章成功!");
            this.doAction(articleProperty);
          }).catch(reason => {
            this.publishLoading = false;
            this.$Message.error("修改文章失败!");
          })
        } else {
          this.handlePublishArticle().then(value => {
            this.$Message.success("发布文章成功!");
            this.doAction(articleProperty);
          }).catch(reason => {
            this.publishLoading = false;
            this.$Message.error("发布文章失败!");
          })
        }
      },
      doAction(articleProperty) {
        this.publishLoading = false;
        localStorage.markdownContent = '';
        let location;
        if (articleProperty === 'DRAFT') {
          location = {
            name: 'article_draft'
          };
        } else {
          location = {
            name: 'article_list'
          };
        }
        this.$router.push(location);
      },
      articleSavePublish() {
        this.articleSave(this.articleProperty);
      },
      articleSaveDraft() {
        this.articleSave('DRAFT');
      },
    },
    mounted() {
      let access = this.getUserAccess();
      if (access.indexOf("ROLE_ADMIN") > -1) {
        this.propertyList.push({value: 'ABOUT_US', label: '关于我们'});
        this.propertyList.push({value: 'DISCLAIMER', label: '免责声明'});
      }
      this.handleCategoryList().then(value => {
        console.log("categoryList: " + JSON.stringify(value));
        this.categoryList = value.data;
        if (this.getEditArticleId() > 0) {
          this.handleArticleInfo().then(value => {
            console.log("info: " + JSON.stringify(value));
            this.articleTitle = value.data.title;
            this.articleKeywords = value.data.keywords;
            this.articleDescription = value.data.description;
            let articleCategory = value.data.category;
            for (let i = 0; i < this.categoryList.length; i++) {
              let secondaryCategories = this.categoryList[i].secondaryCategories;
              for (let j = 0; j < secondaryCategories.length; j++) {
                let alias = secondaryCategories[j].alias;
                if (articleCategory === alias) {
                  this.articleCategory = secondaryCategories[j].name;
                }
              }
            }
            let articleProperty = value.data.articleProperty;
            if (articleProperty !== 'DRAFT') {
              this.articleProperty = articleProperty;
              this.showDraftBtn = false;
            }
            this.$refs.markdownEditor.setValue(value.data.content);
          })
        }
      });

    },
    destroyed() {
      console.log("destroy")
      if (this.getEditArticleId() > 0) {
        this.setEditArticleId(-1);
        localStorage.markdownContent = '';
      }
    }
  }
</script>

<style scoped>

</style>
