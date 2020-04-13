<template>
  <div>
    <div style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1">
      <Button type="primary" @click="addLink">
        新建友链
      </Button>
    </div>
    <Table border stripe :data="linkList" :columns="linkListColumns" :loading="linkListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
      <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
            show-total></Page>
    </div>

    <Modal
      v-model="showLinkModal"
      :title="linkTitle"
      @on-ok="onModalOkClick">
      <div>
        <label>
          网站名称：
          <Input v-model="website" clearable placeholder="请输入网站名称" style="width: 300px;margin-right: 10px"/>
        </label>
      </div>
      <div style="margin-top: 20px">
        <label>
          网站链接：
          <Input v-model="url" clearable placeholder="请输入网站链接" style="width: 300px;margin-right: 10px"/>
        </label>
      </div>
      <div style="margin-top: 20px">
        <label>
          网站站长：
          <Input v-model="webmaster" clearable placeholder="请输入网站站长" style="width: 300px;margin-right: 10px"/>
        </label>
      </div>
      <div style="margin-top: 20px">
        <label>
          站长邮箱：
          <Input v-model="webmaster_email" clearable placeholder="请输入站长邮箱" style="width: 300px;margin-right: 10px"/>
        </label>
      </div>
      <div v-if="modifyLinkId" style="margin-top: 20px">
        网站排序：<InputNumber clearable :min="1" v-model="modifyLinkSort" number placeholder="请输入网站排序" style="width: 300px;margin-right: 10px"/>
      </div>
    </Modal>
  </div>
</template>

<script>
  import expandRow from './LinkDetail';
  import {getLinkList, upsertLink, auditLink} from "@/api/link";

  export default {
    name: "link-list",
    components: {expandRow},
    data() {
      return {
        roles: localStorage.getItem('roles'),
        modifyLinkId: null,
        modifyLinkSort: null,
        website: null,
        url: null,
        webmaster: null,
        webmaster_email: null,
        showLinkModal: false,
        linkTitle: null,
        linkListTableLoading: false,
        linkList: [],
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        linkListColumns: [
          {
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: '排序', key: 'sort', align: 'center', ellipsis: true, minWidth: 80,},
          {title: 'ID', key: 'id', align: 'center', ellipsis: true, minWidth: 80,},
          {title: '网站名称', key: 'website', align: 'center', ellipsis: true, minWidth: 150,},
          {title: '链接', key: 'url', align: 'center', ellipsis: true, minWidth: 200,},
          {title: '站长', key: 'webmaster', align: 'center', ellipsis: true, minWidth: 100,},
          {
            title: '状态', key: 'status', align: 'center', ellipsis: true, minWidth: 100,
            render: (h, params) => {
              let status = params.row.status;
              let text = '';
              let color = '';
              if (status === 0) {
                text = '上线';
                color = 'green';
              } else if (status === 1) {
                text = '下线';
                color = 'red';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '操作', key: 'action', align: 'center', ellipsis: true, minWidth: 200,
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                  let isOnline = params.row.status === 0;
                  let audit = h('Button', {props: {type: isOnline ? 'error' : 'success' , size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.auditLink(isOnline, params.row)}}}, isOnline ? '下线' : '上线');
                  let updateLink = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.updateLink(params.row)}}}, '修改');
                //@formatter:on
                action.push(audit);
                action.push(updateLink);
              }
              let visit = h('Button', {
                props: {type: 'primary', size: 'small'},
                style: {marginRight: '5px'},
                on: {
                  click: () => {
                    this.visitLink(params.row.link)
                  }
                }
              }, '访问');
              action.push(visit);
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods: {
      onModalOkClick() {
        if (!this.website) {
          this.$Message.error("网站名称不能为空!");
          return;
        }
        if (!this.url) {
          this.$Message.error("网站链接不能为空!");
          return;
        }
        if (!this.webmaster) {
          this.$Message.error("网站站长不能为空!");
          return;
        }
        upsertLink(this.modifyLinkId, this.website, this.url, this.webmaster, this.webmaster_email, this.modifyLinkSort).then(() => {
          if (this.modifyLinkId) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.success("添加成功");
          }
          this.resetLinkEntity()
          this.requestLinkList();
        });
      },

      resetLinkEntity() {
        this.modifyLinkId = null;
        this.modifyLinkSort = null;
        this.website = null;
        this.url = null;
        this.webmaster = null;
        this.webmaster_email = null;
      },

      addLink() {
        this.linkTitle = "新建友链";
        this.showLinkModal = true;
        this.modifyLinkId = null;
      },

      updateLink(param) {
        this.linkTitle = "修改友链";
        this.showLinkModal = true;
        this.modifyLinkId = param.id;
        this.modifyLinkSort = param.sort;
        this.website = param.website;
        this.url = param.url;
        this.webmaster = param.webmaster;
        this.webmaster_email = param.webmaster_email;
      },

      auditLink(isOnline, param) {
        let status = isOnline ? 1 : 0;
        auditLink(param.id, status).then(() => {
          let hint = isOnline ? '下线成功！' : '上线成功！';
          this.$Message.success(hint);
          this.requestLinkList();
        })
      },

      visitLink(link) {
        window.open(link);
      },
      changePage(index) {
        this.currentPage = index;
        this.requestLinkList();
      },
      requestLinkList() {
        this.linkListTableLoading = true;
        getLinkList(this.currentPage, this.pageSize).then(res => {
          this.totalCount = res.data.count;
          this.linkList = res.data.links;
          this.linkListTableLoading = false;
        }).catch(() => {
          this.linkListTableLoading = false;
        });
      }
    },
    created() {
      this.requestLinkList();
    },

  }
</script>

<style scoped>

</style>
