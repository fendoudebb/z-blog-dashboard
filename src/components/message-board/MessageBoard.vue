<template>
  <div>
    <Table border stripe :data="messageBoardList" :columns="messageBoardListColumns"
           :loading="messageBoardListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
      <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
            show-total></Page>
    </div>

    <Modal
      :width="1000"
      v-model="messageBoardReplyModal"
      @on-visible-change="onMessageBoardReplyModalVisibleChange"
      title="留言回复">
      <Table stripe border :columns="messageBoardReplyColumns" :data="messageBoardReplyList"
             :loading="messageBoardReplyListTableLoading"></Table>
      <div style="margin: 20px;overflow: hidden">
        <Page :page-size="replyPageSize" :total="replyTotalCount" :current="replyCurrentPage" @on-change="replyChangePage" show-elevator
              show-total></Page>
      </div>
    </Modal>
  </div>
</template>

<script>
  import expandRow from './MessageDetail';
  import {
    auditMessageBoard,
    getMessageBoardList,
    getMessageBoardReplyList,
    replyMessageBoard
  } from "@/api/message_board";

  export default {
    name: "message-board",
    components: {expandRow},
    data() {
      return {
        roles: localStorage.getItem('roles'),
        messageBoardId: null,
        messageBoardReplyModal: false,
        messageBoardReplyListTableLoading: false,
        replyPageSize: 10,
        replyCurrentPage: 1,
        replyTotalCount: 1,
        messageBoardReplyList: [],
        messageBoardReplyColumns: [
          {title: 'ID', key: 'id', align: 'center', ellipsis: true, minWidth: 80,},
          {title: '昵称', key: 'nickname', align: 'center', ellipsis: true, minWidth: 150,},
          {
            title: '回复', key: 'content', align: 'center', ellipsis: true, minWidth: 300,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.content
                  }
                }, params.row.content)
              ])
            }
          },
          {title: '回复时间', key: 'create_ts', align: 'center', ellipsis: true, minWidth: 150,},
          {title: '浏览器', key: 'browser', align: 'center', ellipsis: true, minWidth: 150,},
          {title: '操作系统', key: 'os', align: 'center', ellipsis: true, minWidth: 150,},
          {title: 'IP', key: 'ip', align: 'center', ellipsis: true, minWidth: 150,},
          {title: 'IP地址', key: 'address', align: 'center', ellipsis: true, minWidth: 150,},
          {
            title: '状态', key: 'status', align: 'center', ellipsis: true, minWidth: 100,
            render: (h, params) => {
              let status = params.row.status;
              let text = '';
              let color = '';
              if (status === 0) {
                text = '上线';
                color = 'green';
              } else {
                text = '下线';
                color = 'red';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '操作', key: 'action', align: 'center', ellipsis: true, minWidth: 150, fixed: 'right',
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                let replyMessage = h('Button', {
                  props: {type: 'primary', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.replyMessageBoard(params.row.id)
                    }
                  }
                }, '回复');
                let isOnline = params.row.status === 0;
                let audit = h('Button', {
                  props: {type: isOnline ? 'error' : 'success', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.auditMessageBoard(isOnline, params.row)
                    }
                  }
                }, isOnline ? '下线' : '上线');
                //@formatter:on
                action.push(replyMessage);
                action.push(audit);
              }
              return h('div', [action]);
            }
          }
        ],
        currentPage: 1,
        pageSize: 10,
        totalCount: 1,
        messageBoardListTableLoading: false,
        messageBoardList: [],
        messageBoardListColumns: [
          {
            title:"#", type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: 'ID', key: 'id', align: 'center', ellipsis: true, minWidth: 80,},
          {title: '楼层', key: 'floor', align: 'center', ellipsis: true, minWidth: 80,},
          {title: '昵称', key: 'nickname', align: 'center', ellipsis: true, minWidth: 150,},
          {
            title: '留言', key: 'content', align: 'center', ellipsis: true, minWidth: 300,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.content
                  }
                }, params.row.content)
              ])
            }
          },
          {title: '留言时间', key: 'create_ts', align: 'center', ellipsis: true, minWidth: 150,},
          {title: '浏览器', key: 'browser', align: 'center', ellipsis: true, minWidth: 150,},
          {title: '操作系统', key: 'os', align: 'center', ellipsis: true, minWidth: 150,},
          {title: 'IP', key: 'ip', align: 'center', ellipsis: true, minWidth: 150,},
          {title: 'IP地址', key: 'address', align: 'center', ellipsis: true, minWidth: 150,},
          {
            title: '状态', key: 'status', align: 'center', ellipsis: true, minWidth: 100,
            render: (h, params) => {
              let status = params.row.status;
              let text = '';
              let color = '';
              if (status === 0) {
                text = '上线';
                color = 'green';
              } else {
                text = '下线';
                color = 'red';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '操作', key: 'action', align: 'center', ellipsis: true, minWidth: 200, fixed: 'right',
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                let watchReplyMessage = h('Button', {
                  props: {type: 'info', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.watchReply(params.row.id)
                    }
                  }
                }, '查看回复');
                let replyMessage = h('Button', {
                  props: {type: 'primary', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.replyMessageBoard(params.row.id)
                    }
                  }
                }, '回复');
                let isOnline = params.row.status === 0;
                let audit = h('Button', {
                  props: {type: isOnline ? 'error' : 'success', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.auditMessageBoard(isOnline, params.row)
                    }
                  }
                }, isOnline ? '下线' : '上线');
                //@formatter:on
                if (params.row.reply_count) {
                  action.push(watchReplyMessage);
                }
                action.push(replyMessage);
                action.push(audit);
              }
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods: {
      onMessageBoardReplyModalVisibleChange(show) {//show为布尔值
        if (!show) {
          this.messageBoardId = null;
        }
      },
      watchReply(id) {
        this.messageBoardId = id;
        this.messageBoardReplyModal = true;
        this.requestMessageBoardReplyList(id);
      },
      replyChangePage(index) {
        this.replyCurrentPage = index;
        this.requestMessageBoardReplyList(this.messageBoardId);
      },
      requestMessageBoardReplyList(id) {
        this.messageBoardReplyListTableLoading = true;
        getMessageBoardReplyList(id, this.replyCurrentPage, this.replyPageSize).then(res => {
          this.replyTotalCount = res.data.count;
          this.messageBoardReplyList = res.data.message_board;
          this.messageBoardReplyListTableLoading = false;
        }).catch(() => {
          this.messageBoardReplyListTableLoading = false;
        });
      },

      replyMessageBoard(id) {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.reply,
                autofocus: true,
                type: 'textarea',
                rows: 10,
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
            replyMessageBoard(id, this.reply).then(() => {
              this.reply = null;
              this.$Message.success("回复成功");
              if (this.messageBoardId) {
                this.requestMessageBoardReplyList(this.messageBoardId)
              } else {
                this.requestMessageBoardList();
              }
            });
          }
        })
      },
      auditMessageBoard(isOnline, param) {
        let status = isOnline ? 1 : 0;
        auditMessageBoard(param.id, status).then(() => {
          let hint = isOnline ? '下线成功' : '上线成功';
          this.$Message.success(hint);
          if (this.messageBoardId) {
            this.requestMessageBoardReplyList(this.messageBoardId)
          } else {
            this.requestMessageBoardList();
          }
        })
      },

      changePage(index) {
        this.currentPage = index;
        this.requestMessageBoardList();
      },
      requestMessageBoardList() {
        this.messageBoardListTableLoading = true;
        getMessageBoardList(this.currentPage, this.pageSize).then(res => {
          this.totalCount = res.data.count;
          this.messageBoardList = res.data.message_board;
          this.messageBoardListTableLoading = false;
        }).catch(() => {
          this.messageBoardListTableLoading = false;
        });
      }
    },
    created() {
      this.requestMessageBoardList();
    },
  }
</script>

<style scoped>

</style>
