<template>
  <div>
    <Table border stripe :data="postDraft" :columns="postDraftColumns" :loading="postDraftTableLoading"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :page-size="pageSize" :total="totalElements" :current="currentPage" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import expandRow from './PostDetail';
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    components: {expandRow},
    data() {
      return {
        //  h('Tag', {props: {color: params.row.original ? 'green' : 'blue'}}, params.row.original ? '原创' : '转载')
        postDraftTableLoading: false,
        pageSize: this.getDraftPage(),
        totalCount: 1,
        currentPage: 1,
        postDraft: [],
        postDraftColumns: [
          {
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: 'ID', key: 'postId', align: 'center'},
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
        'setEditPostId'
      ]),
      ...mapGetters([
        'getDraftPage'
      ]),
      ...mapActions([
        'handlePostDraft'
      ]),
      edit(index) {
        this.setEditPostId(this.postDraft[index].id);
        this.$router.push({name: 'publish_index'})
      },
      changePage(index) {
        console.log('index: ' + index);
        this.setDraftPage(index - 1);
        this.getPostDraft();
      },
      getPostDraft() {
        this.postDraftTableLoading = true;
        this.handlePostDraft().then(value => {
          console.log("value: " + JSON.stringify(value));
          this.totalElements = value.data.totalCount;
          this.postDraft = value.data.content;
          this.postDraftTableLoading = false;
        }).catch(reason => {
          this.postDraftTableLoading = false;
        })
      }
    },
    created() {
      this.getPostDraft();
    },
    mounted() {

    }
  };
</script>

<style scoped>

</style>
