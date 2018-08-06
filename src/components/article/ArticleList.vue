<template>
  <div>
    <Table border stripe :data="auditArticle" :columns="auditArticleColumns"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :page-size="1" :total="totalElements" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import expandRow from './ArticleDetail';
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "article-list",
    components: {expandRow},
    data() {
      return {
        //  h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
        totalElements: 100,
        currentPage: 1,
        auditArticle: [],
        auditArticleColumns: [
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
          {
            title: '状态', key: 'auditStatus', align: 'center',
            render: (h, params) => {
              let auditStatus = params.row.auditStatus;
              let text = '';
              let color = '';
              if (auditStatus === 0) {
                text = '待审核';
                color = 'orange';
              } else if (auditStatus === 1) {
                text = '上线';
                color = 'green';
              } else if (auditStatus === 2) {
                text = '审核拒绝';
                color = 'red';
              } else if (auditStatus === 3) {
                text = '下线';
                color = 'lightskyblue';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '是否原创', key: 'original', align: 'center', render: (h, params) => {
              let auditStatus = params.row.auditStatus;
              let linkUrl = [];
              if (auditStatus === 1) {
                let original = params.row.original;
                if (original) {
                  let id = params.row.id;
                  let href = 'http://localhost:9999/admin/article/preview/audit/' + id;
                  linkUrl.push(h('a', {domProps: {target: '_blank', href: href}}, href))
                } else {
                  let originalLink = params.row.originalLink;
                  linkUrl.push(h('a', {domProps: {target: '_blank', href: originalLink}}, originalLink))
                }
              } else {
                linkUrl.push(h('div', '未上线'))
              }
              let poptipContent = [
                h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载'),
                h('div', {slot: 'content'}, linkUrl)
              ];
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: "原文链接",
                  placement: 'top'
                }
              }, poptipContent)
            }
          },
          {
            title: '操作', key: 'action', align: 'center',
            render: (h, params) => {
              let action = [];
              let auditStatus = params.row.auditStatus;
              if (auditStatus === 0) {
                action.push(h('Button', {
                  props: {type: 'primary', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.online(params.index)
                    }
                  }
                }, '上线'));
                action.push(h('Button', {
                  props: {type: 'error', size: 'small'}, on: {
                    click: () => {
                      this.online(params.index)
                    }
                  }
                }, '拒绝'));
              } else if (auditStatus === 1) {
                action.push(h('Button', {
                  props: {type: 'warning', size: 'small'}, on: {
                    click: () => {
                      this.online(params.index)
                    }
                  }
                }, '下线'));
              } else if (auditStatus === 2) {

              } else if (auditStatus === 3) {
                action.push(h('Button', {
                  props: {type: 'primary', size: 'small'}, on: {
                    click: () => {
                      this.online(params.index)
                    }
                  }
                }, '上线'));
              }
              return h('div', [
                action,
              ]);
            }
          }
        ]
      };
    },
    methods: {
      ...mapMutations([
        'setPage'
      ]),
      ...mapActions([
        'handleArticleList'
      ]),
      online() {
        this.$Message.success("上线成功！");
      },
      changePage(index) {
        console.log('index: ' + index);
        this.setPage(index - 1);
        this.getArticleList();
      },
      getArticleList() {
        this.handleArticleList().then(value => {
          console.log("value: " + JSON.stringify(value));
          this.totalElements = value.data.totalElements;
          this.auditArticle = value.data.content;
        })
      }
    },
    created() {
      this.getArticleList();
    },
    mounted() {
      this.auditArticle = [
        {
          id: 1,
          title: '标题',
          author: '作者',
          original: true,
          originalLink: '',
          auditStatus: 3,
          keywords: '关键字',
          description: '描述',
          category: '分类',
          updateTime: '2018-07-28'
        }
      ];
    }
  }
</script>

<style scoped>

</style>
