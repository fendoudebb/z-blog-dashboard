<template>
  <div>
    <Table border stripe :data="articleList" :columns="articleListColumns"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :page-size="pageSize" :total="totalElements" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import expandRow from './ArticleDetail';
  import {previewAuditArticleUrl} from '@/api/url';
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "article-list",
    components: {expandRow},
    data() {
      return {
        //  h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
        access: sessionStorage.getItem('access'),
        pageSize: this.getListSize(),
        totalElements: 1,
        currentPage: 1,
        articleList: [],
        articleListColumns: [
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
              if (auditStatus === 'UNDER_REVIEW') {
                text = '待审核';
                color = 'orange';
              } else if (auditStatus === 'ONLINE') {
                text = '上线';
                color = 'green';
              } else if (auditStatus === 'REJECT') {
                text = '审核拒绝';
                color = 'red';
              } else if (auditStatus === 'OFFLINE') {
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
              if (auditStatus === 'ONLINE') {
                let original = params.row.original;
                if (original) {
                  let id = params.row.id;
                  let category = params.row.category;
                  if (category !== 'system') {
                    let href = process.env.BASE_URL + '/article/' + category + '/' + id;
                    linkUrl.push(h('a', {domProps: {target: '_blank', href: href}}, href))
                  }
                } else {
                  let originalLink = params.row.originalLink;
                  linkUrl.push(h('a', {domProps: {target: '_blank', href: originalLink}}, originalLink))
                }
              } else {
                let id = params.row.id;
                let href = process.env.BASE_URL + previewAuditArticleUrl + '/' + id;
                linkUrl.push(h('a', {domProps: {target: '_blank', href: href}}, href))
              }
              let poptipContent = [
                h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载'),
                h('div', {slot: 'content'}, linkUrl)
              ];
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: auditStatus === 'ONLINE' ? '原文链接' : '预览链接',
                  placement: 'top'
                }
              }, poptipContent)
            }
          },
          {
            title: '操作', key: 'action', align: 'center',
            render: (h, params) => {
              let action = [];
              if (this.access.indexOf("ROLE_ADMIN") > -1) {
                let auditStatus = params.row.auditStatus;
                //@formatter:off
                  let online = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.online(params.index)}}}, '上线');
                  let reject = h('Button', {props: {type: 'error', size: 'small'},  style: {marginRight: '5px'}, on: {click: () => {this.reject(params.index)}}}, '拒绝');
                  let offline = h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.offline(params.index)}}}, '下线');
                  //@formatter:on
                if (auditStatus === 'UNDER_REVIEW') {
                  action.push(online);
                  action.push(reject);
                } else if (auditStatus === 'ONLINE') {
                  action.push(offline);
                } else if (auditStatus === 'OFFLINE') {
                  action.push(online);
                } else if (auditStatus === 'REJECT') {
                  action.push(online);
                }
              }
              let edit = h('Button', {
                props: {type: 'primary', size: 'small'},
                style: {marginRight: '5px'},
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }, '编辑');
              action.push(edit);
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods: {
      ...mapMutations([
        'setListPage',
        'setArticleId',
        'setAuditStatus',
        'setEditArticleId'
      ]),
      ...mapGetters([
        'getListSize'
      ]),
      ...mapActions([
        'handleArticleList',
        'handleArticleStatus'
      ]),
      online(index) {
        this.modifyArticleStatus(index, 'ONLINE');
      },
      offline(index) {
        this.modifyArticleStatus(index, 'OFFLINE');
      },
      reject(index) {
        this.modifyArticleStatus(index, 'REJECT');
      },
      edit(index) {
        this.setEditArticleId(this.articleList[index].id);
        this.$router.push({name: 'publish_index'})
      },
      modifyArticleStatus(index, status) {
        console.log("index: " + index);
        let articleList = this.articleList[index];
        this.setArticleId(articleList.id);
        this.setAuditStatus(status);
        this.handleArticleStatus().then(value => {
          this.articleList[index].auditStatus = status;
          if (status === 'ONLINE') {
            this.$Message.success("文章上线成功!");
          } else if (status === 'OFFLINE') {
            this.$Message.warning("文章已下线!");
          } else if (status === 'REJECT') {
            this.$Message.error("文章审核不通过!");
          }
        });
        console.log("Json: " + JSON.stringify(articleList));
      },
      changePage(index) {
        console.log('index: ' + index);
        this.setListPage(index - 1);
        this.getArticleList();
      },
      getArticleList() {
        this.handleArticleList().then(value => {
          console.log("value: " + JSON.stringify(value));
          this.totalElements = value.data.totalElements;
          this.articleList = value.data.content;
        })
      }
    },
    created() {
      this.getArticleList();
    },
    mounted() {

    }
  };
</script>

<style scoped>

</style>
