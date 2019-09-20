<template>
  <div style="margin: 20px;padding:20px;background-color: white">
    <div style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1">
      <Button type="primary" @click="addNewLink">
        新建友链
      </Button>
    </div>
    <Table border stripe :data="linksList" :columns="linksListColumns" :loading="linksListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>

    <Modal
      v-model="showLinkModal"
      :title="linkTitle"
      @on-ok="onModalOkClick"
      @on-cancel="onModalCancelClick">

      <div>
        网站名称：<Input v-model="websiteName" clearable placeholder="请输入网站名称" style="width: 150px;margin-right: 10px"></Input>
      </div>
      <div style="margin-top: 20px">
        网站链接：<Input v-model="newLink" clearable placeholder="请输入网站链接" style="width: 150px;margin-right: 10px"></Input>
      </div>
      <div style="margin-top: 20px">
        网站站长：<Input v-model="owner" clearable placeholder="请输入网站站长" style="width: 150px;margin-right: 10px"></Input>
      </div>
      <div style="margin-top: 20px">
        站长邮箱：<Input v-model="ownerEmail" clearable placeholder="请输入站长邮箱" style="width: 150px;margin-right: 10px"></Input>
      </div>

    </Modal>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "links",
    data() {
      return {
        roles: localStorage.getItem('roles'),
        linkId:'',
        isModify:false,
        websiteName:'',
        newLink:'',
        owner:'',
        ownerEmail:'',
        showLinkModal:false,
        linkTitle:'',
        linksListTableLoading: false,
        linksList: [],
        pageSize: this.getLinksListSize(),
        totalCount: 1,
        currentPage: 1,
        linksListColumns: [
          {title: '排序', key: 'sort', align: 'center', ellipsis:true, minWidth: 150,},
          {title: 'ID', key: 'id', align: 'center', ellipsis:true, minWidth: 200,},
          {title: '网站名称', key: 'websiteName', align: 'center', ellipsis:true, minWidth: 200,},
          {title: '链接', key: 'link', align: 'center', ellipsis:true, minWidth: 200,},
          {title: '站长', key: 'owner', align: 'center', ellipsis:true, minWidth: 200,},
          {title: '站长邮箱', key: 'ownerEmail', align: 'center', ellipsis:true, minWidth: 200,},
          {
            title: '状态', key: 'status', align: 'center', ellipsis:true, minWidth: 100,
            render: (h, params) => {
              let postStatus = params.row.status;
              let text = '';
              let color = '';
              if (postStatus === 'ONLINE') {
                text = '上线';
                color = 'green';
              } else if (postStatus === 'OFFLINE') {
                text = '下线';
                color = 'red';
              }
              return h('Tag', {props: {color: color}}, text);
            }
          },
          {
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 250,
            render: (h, params) => {
              let action = [];
              if (this.roles.indexOf("ROLE_ADMIN") > -1) {
                //@formatter:off
                  let isOnline = params.row.status === "ONLINE";
                  let audit = h('Button', {props: {type: isOnline ? 'error' : 'success' , size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.auditLink(isOnline, params)}}}, isOnline ? '下线' : '上线');
                  let modifyContent = h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.modifyContent(params)}}}, '修改');
                  let modifySort = h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.modifySort(params)}}}, '排序');
                //@formatter:on
                action.push(audit);
                action.push(modifyContent);
                action.push(modifySort);
              }
              let visit = h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.visitLink(params.row.link)}}}, '访问');
              action.push(visit);
              return h('div', [action]);
            }
          }
        ]
      };
    },
    methods: {
      ...mapMutations([
        'setLinksListPage',
        'setModifyLinkSortId',
        'setLinkSort',
        'setAddWebsiteName',
        'setAddNewLink',
        'setAddOwner',
        'setAddOwnerEmail',
        'setEditLinkId',
        'setEditWebsiteName',
        'setEditLink',
        'setEditOwner',
        'setEditOwnerEmail',
        'setAuditLinkId',
        'setStatus',
      ]),
      ...mapGetters([
        'getLinksListSize'
      ]),
      ...mapActions([
        'handleLinksList',
        'handleModifyLinkSort',
        'handleAddNewLink',
        'handleEditLink',
        'handleAuditLink',
      ]),
      onModalCancelClick() {
        this.linkId = '';
        this.websiteName = '';
        this.newLink = '';
        this.owner = '';
        this.ownerEmail = '';
      },
      onModalOkClick() {
        if (!this.websiteName) {
          this.$Message.error("网站名称不能为空!");
          return;
        }
        if (!this.newLink) {
          this.$Message.error("网站链接不能为空!");
          return;
        }
        if (!this.owner) {
          this.$Message.error("网站战长不能为空!");
          return;
        }

        if (this.isModify) {
          if (!this.linkId) {
            this.$Message.error("链接ID不能为空!");
            return;
          }
          this.setEditLinkId(this.linkId);
          this.setEditWebsiteName(this.websiteName);
          this.setEditLink(this.newLink);
          this.setEditOwner(this.owner);
          this.setEditOwnerEmail(this.ownerEmail);
          this.handleEditLink().then(value => {
            this.$Message.success("修改成功！");
            this.getLinksList();
          });
        } else {
          this.setAddWebsiteName(this.websiteName);
          this.setAddNewLink(this.newLink);
          this.setAddOwner(this.owner);
          this.setAddOwnerEmail(this.ownerEmail);
          this.handleAddNewLink().then(value => {
            this.$Message.success("添加成功！");
            this.getLinksList();
          });
        }
        this.newLink = '';
        this.websiteName = '';
        this.newLink = '';
        this.owner = '';
        this.ownerEmail = '';
      },

      addNewLink() {
        this.linkTitle = "新建友链";
        this.isModify = false;
        this.showLinkModal = true;
      },

      modifyContent(params) {
        this.linkTitle = "修改友链";
        this.isModify = true;
        this.showLinkModal = true;
        this.linkId = params.row.id;
        this.websiteName = params.row.websiteName;
        this.newLink = params.row.link;
        this.owner = params.row.owner;
        this.ownerEmail = params.row.ownerEmail;
      },

      auditLink(isOnline, params) {
        this.setAuditLinkId(params.row.id);
        this.setStatus(isOnline ? 'OFFLINE' : 'ONLINE');
        this.handleAuditLink().then(value => {
          let hint = isOnline ? '下线成功！' : '上线成功！';
          this.$Message.success(hint);
          this.getLinksList();
        });
      },

      modifySort(params) {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.linkSort,
                autofocus: true,
                placeholder: '请输入排序...'
              },
              on: {
                input: (val) => {
                  this.linkSort = val;
                }
              }
            })
          },
          onOk: () => {
            this.setModifyLinkSortId(params.row.id);
            this.setLinkSort(this.linkSort);
            this.handleModifyLinkSort().then(value => {
              this.$Message.success("修改成功！");
              this.linkSort = '';
              this.getLinksList();
            });
          }
        })
      },
      visitLink(link) {
        window.open(link);
      },
      changePage(index) {
        this.setLinksListPage(index);
        this.getLinksList();
      },
      getLinksList() {
        this.linksListTableLoading = true;
        this.handleLinksList().then(value => {
          this.totalCount = value.data.totalCount;
          this.linksList = value.data.links;
          this.linksListTableLoading = false;
        }).catch(reason => {
          this.linksListTableLoading = false;
        })
      }
    },
    created() {
      this.getLinksList();
    },

  }
</script>

<style scoped>

</style>
