<template>
  <div>
    <Table border stripe :data="articleDraft" :columns="articleDraftColumns"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :page-size="1" :total="totalElements" :current="currentPage" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import expandRow from './ArticleDetail';
  import {mapMutations, mapActions} from 'vuex';

  export default {
    components: {expandRow},
    data() {
      return {
        //  h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
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
          // {title: '关键字', key: 'keywords', align: 'center'},
          // {title: '描述', key: 'description', align: 'center'},
          // {title: '分类', key: 'category', align: 'center'},
          // {title: '更新时间', key: 'updateTime', align: 'center'},
          {
            title: '是否原创', key: 'original', align: 'center', render: (h, params) => {
              return h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
            }
          },
          {
            title: '操作', key: 'action', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'primary', size: 'small'}, on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, '编辑'),
              ]);
            }
          },
        ]
      }
    },
    methods: {
      ...mapMutations([
        'setDraftPage'
      ]),
      ...mapActions([
        'handleArticleDraft'
      ]),
      edit() {
        this.$Message.success("edit！");
      },
      changePage(index) {
        console.log('index: ' + index);
        this.setDraftPage(index - 1);
        this.getArticleDraft();
      },
      getArticleDraft() {
        this.handleArticleDraft().then(value => {
          console.log("value: " + JSON.stringify(value));
          this.totalElements = value.data.totalElements;
          this.articleDraft = value.data.content;
        })
      }
    },
    created() {
      this.getArticleDraft();
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
