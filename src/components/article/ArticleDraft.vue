<template>
  <div>
    <Table border stripe :data="articleDraft" :columns="articleDraftColumns"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="totalPage" :current="currentPage" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //  h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
        totalPage:100,
        currentPage:1,
        articleDraft:[],
        articleDraftColumns:[
          {title: 'ID', key: 'id', align: 'center'},
          {title: '标题', key: 'title', align: 'center'},
          {title: '作者', key: 'author', align: 'center'},
          {title: '关键字', key: 'keywords', align: 'center'},
          {title: '描述', key: 'description', align: 'center'},
          {title: '分类', key: 'category', align: 'center'},
          {title: '更新时间', key: 'updateTime', align: 'center'},
          {title: '是否原创', key: 'original', align: 'center',render: (h, params) => {return h('Poptip', {
              props: {
                trigger: 'hover',
                title: "原文链接",
                placement: 'top'
              }
            }, [
              h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载'),
              h('div', {
                slot: 'content'
              }, [
                h('a', {domProps: {target:'_blank',href:'http://www.baidu.com'}}, 'http://www.baidu.com'),
              ])
            ])}
          }
        ]
      }
    },
    methods:{
      online() {
        this.$Message.success("上线成功！");
      },
      changePage() {

      }
    },
    mounted() {
      this.articleDraft = [
        {
          id: 1,
          title: '标题',
          author: '作者',
          keywords: '关键字',
          description: '描述',
          category: '分类',
          original: true,
          originalLink: '',
          updateTime:'2017-08-09'
        }
      ];
    }
  }
</script>

<style scoped>

</style>
