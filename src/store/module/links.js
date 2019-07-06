import {getLinksList, modifyLinkSort, addNewLink, editLink, auditLink} from '@/api/links';

export default {
  state: {
    page: 1,
    size: 10,
    modifyLinkSortId: '',
    linkSort: 1,
    addWebsiteName: '',
    addNewLink:'',
    addOwner:'',
    addOwnerEmail:'',
    editLinkId:'',
    editWebsiteName:'',
    editLink:'',
    editOwner:'',
    editOwnerEmail:'',
    auditLinkId:'',
    status:'',
  },
  mutations: {
    setLinksListPage(state, page) {
      state.page = page
    },
    setModifyLinkSortId(state, modifyLinkSortId) {
      state.modifyLinkSortId = modifyLinkSortId
    },
    setLinkSort(state, linkSort) {
      state.linkSort = linkSort
    },
    setAddWebsiteName(state, addWebsiteName) {
      state.addWebsiteName = addWebsiteName
    },
    setAddNewLink(state, addNewLink) {
      state.addNewLink = addNewLink
    },
    setAddOwner(state, addOwner) {
      state.addOwner = addOwner
    },
    setAddOwnerEmail(state, addOwnerEmail) {
      state.addOwnerEmail = addOwnerEmail
    },
    setEditLinkId(state, editLinkId) {
      state.editLinkId = editLinkId
    },
    setEditWebsiteName(state, editWebsiteName) {
      state.editWebsiteName = editWebsiteName
    },
    setEditLink(state, editLink) {
      state.editLink = editLink
    },
    setEditOwner(state, editOwner) {
      state.editOwner = editOwner
    },
    setEditOwnerEmail(state, editOwnerEmail) {
      state.editOwnerEmail = editOwnerEmail
    },
    setAuditLinkId(state, auditLinkId) {
      state.auditLinkId = auditLinkId
    },
    setStatus(state, status) {
      state.status = status
    },
  },
  getters: {
    getLinksListSize: state => {
      return state.size;
    }
  },
  actions: {
    handleLinksList({state, commit}) {
      return new Promise((resolve, reject) => {
        getLinksList(state.page, state.size).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleModifyLinkSort({state, commit}) {
      return new Promise((resolve, reject) => {
        modifyLinkSort(state.modifyLinkSortId, state.linkSort).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleAddNewLink({state, commit}) {
      return new Promise((resolve, reject) => {
        addNewLink(state.editWebsiteName, state.editLink, state.editOwner, state.editOwnerEmail).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleEditLink({state, commit}) {
      return new Promise((resolve, reject) => {
        editLink(state.editLinkId, state.editWebsiteName, state.editLink, state.editOwner, state.editOwnerEmail).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },
    handleAuditLink({state, commit}) {
      return new Promise((resolve, reject) => {
        auditLink(state.auditLinkId, state.status).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    },

  },

};
