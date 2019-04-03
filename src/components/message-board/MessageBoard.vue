<template>
  <div style="margin: 20px;padding:20px;background-color: white">
    <Table border stripe :data="messageList" :columns="messageListColumns" :loading="messageListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
      <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
            show-total></Page>
    </div>
  </div>
</template>

<script>
  import expandRow from './MessageDetail';
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "message-board",
    components: {expandRow},
    data() {
      return {
        roles: localStorage.getItem('roles'),
        messageListTableLoading:false,
        messageList:[],
        messageListColumns: [
          {
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: '楼层', key: 'floor', align: 'center'},
          {title: '昵称', key: 'nickname', align: 'center'},
          {title: '留言时间', key: 'commentTime', align: 'center'},
          {title: '浏览器', key: 'browser', align: 'center'},
          {title: '操作系统', key: 'os', align: 'center'},
          {
            title: '状态', key: 'status', align: 'center',
            render: (h, params) => {
              let commentStatus = params.row.status;
              let text = '';
              let color = '';
              if (commentStatus === 'ONLINE') {
                text = '上线';
                color = 'green';
              } else if (commentStatus === 'OFFLINE') {
                text = '下线';
                color = 'red';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '操作', key: 'action', align: 'center',
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                  let replyMessage = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.replyMessage(params)}}}, '回复');
                  let deleteMessage = h('Button', {props: {type: 'error', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.deleteMessage(params)}}}, '删除');
                //@formatter:on
                action.push(replyMessage);
                action.push(deleteMessage);
              }
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods:{
      ...mapMutations([
        'setMessageBoardListPage',
        'setMessageId',
        'setReplyMessageId',
        'setReplyContent',
      ]),
      ...mapGetters([
        'getMessageBoardListSize'
      ]),
      ...mapActions([
        'handleMessageBoardList',
        'handleDeleteMessage',
        'handleReplyMessage',
      ]),
      replyMessage(params) {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.reply,
                autofocus: true,
                placeholder: '请输入回复...'
              },
              on: {
                input: (val) => {
                  this.reply = val;
                }
              }
            })
          },
          onOk: () => {
            this.setReplyMessageId(params.row.id);
            this.setReplyContent(this.reply);
            this.handleReplyMessage().then(value => {
              this.reply = '';
              this.$Message.success("回复成功！");
              this.getMessageBoardList();
            });
          }
        })
      },
      deleteMessage(params){
        this.$Modal.confirm(
          {
            title: "删除留言",
            content: "是否删除" + params.row.nickname + "用户的留言？",
            okText: "确认删除",
            closable: true,
            onOk: () => {
              this.setMessageId(params.row.id);
              this.handleDeleteMessage().then(value => {
                this.$Message.success("删除成功！");
                this.getMessageBoardList();
              });
            }
          });
      },
      changePage(index) {
        this.setMessageBoardListPage(index);
        this.getMessageBoardList();
      },
      getMessageBoardList() {
        this.messageListTableLoading = true;
        this.handleMessageBoardList().then(value => {
          this.totalCount = value.data.totalCount;
          this.messageList = value.data.comments;
          this.messageListTableLoading = false;
        }).catch(reason => {
          this.messageListTableLoading = false;
        })
      }
    },
    created() {
      this.getMessageBoardList();
    },
  }
</script>

<style scoped>

</style>
