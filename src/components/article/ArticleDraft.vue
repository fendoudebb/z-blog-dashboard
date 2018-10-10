<template>
  <div>
    <Table border stripe :data="articleDraft" :columns="articleDraftColumns" :loading="articleDraftTableLoading"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :page-size="pageSize" :total="totalElements" :current="currentPage" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import expandRow from './ArticleDetail';
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    components: {expandRow},
    data() {
      return {
        //  h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
        articleDraftTableLoading: false,
        pageSize: this.getDraftPage(),
        totalElements: 1,
        currentPage: 1,
        articleDraft: [],
        articleDraftColumns: [
          {
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: 'ID', key: 'id', align: 'center'},
          {title: '标题', key: 'title', align: 'center'},
          {title: '作者', key: 'author', align: 'center'},
          {
            title: '是否原创', key: 'original', align: 'center', render: (h, params) => {
              return h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
            }
          },
          {
            title: '操作', key: 'action', align: 'center',
            //@formatter:off
            render: (h, params) => {return h('div', [h('Button', {props: {type: 'primary', size: 'small'}, on: {click: () => {this.edit(params.index)}}}, '编辑'),]);}
            //@formatter:on
          },
        ]
      };
    },
    methods: {
      ...mapMutations([
        'setDraftPage',
        'setEditArticleId'
      ]),
      ...mapGetters([
        'getDraftPage'
      ]),
      ...mapActions([
        'handleArticleDraft'
      ]),
      edit(index) {
        this.setEditArticleId(this.articleDraft[index].id);
        this.$router.push({name: 'publish_index'})
      },
      changePage(index) {
        console.log('index: ' + index);
        this.setDraftPage(index - 1);
        this.getArticleDraft();
      },
      getArticleDraft() {
        this.articleDraftTableLoading = true;
        this.handleArticleDraft().then(value => {
          console.log("value: " + JSON.stringify(value));
          this.totalElements = value.data.totalElements;
          this.articleDraft = value.data.content;
          this.articleDraftTableLoading = false;
        }).catch(reason => {
          this.articleDraftTableLoading = false;
        })
      }
    },
    created() {
      this.getArticleDraft();
    },
    mounted() {

    }
  };
</script>

<style scoped>

</style>
