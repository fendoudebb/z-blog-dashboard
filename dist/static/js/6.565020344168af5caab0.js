webpackJsonp([6],{"7PXo":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("Dd8w"),n=s.n(a),r={name:"message-detail",props:{row:Object}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("span",{staticClass:"expand-key"},[e._v("ID: ")]),e._v(" "),s("span",{staticClass:"expand-value"},[e._v(e._s(e.row.id))]),e._v(" "),s("br"),e._v(" "),s("br"),e._v(" "),s("span",{staticClass:"expand-key"},[e._v("IP: ")]),e._v(" "),s("span",{staticClass:"expand-value"},[e._v(e._s(e.row.ip))]),e._v(" "),s("br"),e._v(" "),s("br"),e._v(" "),s("span",{staticClass:"expand-key"},[e._v("留言内容: ")]),e._v(" "),s("span",{staticClass:"expand-value"},[e._v(e._s(e.row.content))]),e._v(" "),s("br"),e._v(" "),s("br"),e._v(" "),s("span",{staticClass:"expand-key"},[e._v("User-Agent: ")]),e._v(" "),s("span",{staticClass:"expand-value"},[e._v(e._s(e.row.userAgent))]),e._v(" "),s("br"),e._v(" "),s("br"),e._v(" "),e._l(e.row.reply,function(t,a){return s("div",{key:a},[s("span",{staticClass:"expand-key"},[e._v("回复内容: ")]),s("span",{staticClass:"expand-value"},[e._v(e._s(t.content))]),e._v(" "),s("br"),e._v(" "),s("span",{staticClass:"expand-key"},[e._v("时间: ")]),s("span",{staticClass:"expand-value"},[e._v(e._s(new Date(1e3*t.commentTime.$date.$numberLong).toLocaleString()))]),e._v(" "),s("br"),e._v(" "),s("span",{staticClass:"expand-key"},[e._v("浏览器: ")]),s("span",{staticClass:"expand-value"},[e._v(e._s(t.browser))]),e._v(" "),s("br"),e._v(" "),s("span",{staticClass:"expand-key"},[e._v("ip: ")]),s("span",{staticClass:"expand-value"},[e._v(e._s(t.ip))]),e._v(" "),s("br"),e._v(" "),s("br")])})],2)},staticRenderFns:[]};var o=s("VU/8")(r,i,!1,function(e){s("MZtH")},"data-v-237ebb02",null).exports,l=s("SJI6"),c={name:"message-board",components:{expandRow:o},data:function(){var e=this;return{roles:localStorage.getItem("roles"),messageListTableLoading:!1,messageList:[],messageListColumns:[{type:"expand",width:50,render:function(e,t){return e(o,{props:{row:t.row}})}},{title:"楼层",key:"floor",align:"center"},{title:"昵称",key:"nickname",align:"center"},{title:"留言时间",key:"commentTime",align:"center"},{title:"浏览器",key:"browser",align:"center"},{title:"操作系统",key:"os",align:"center"},{title:"状态",key:"status",align:"center",render:function(e,t){var s=t.row.status,a="",n="";return"ONLINE"===s?(a="上线",n="green"):"OFFLINE"===s&&(a="下线",n="red"),e("Tag",{props:{color:n}},a)}},{title:"操作",key:"action",align:"center",render:function(t,s){var a=[];if(e.roles.indexOf("ROLE_ADMIN")>-1){var n=t("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.replyMessage(s)}}},"回复"),r=t("Button",{props:{type:"error",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.deleteMessage(s)}}},"删除");a.push(n),a.push(r)}return t("div",[a])}}]}},methods:n()({},Object(l.mapMutations)(["setMessageBoardListPage","setMessageId","setReplyMessageId","setReplyContent"]),Object(l.mapGetters)(["getMessageBoardListSize"]),Object(l.mapActions)(["handleMessageBoardList","handleDeleteMessage","handleReplyMessage"]),{replyMessage:function(e){var t=this;this.$Modal.confirm({render:function(e){return e("Input",{props:{value:t.reply,autofocus:!0,placeholder:"请输入回复..."},on:{input:function(e){t.reply=e}}})},onOk:function(){t.setReplyMessageId(e.row.id),t.setReplyContent(t.reply),t.handleReplyMessage().then(function(e){t.reply="",t.$Message.success("回复成功！"),t.getMessageBoardList()})}})},deleteMessage:function(e){var t=this;this.$Modal.confirm({title:"删除留言",content:"是否删除"+e.row.nickname+"用户的留言？",okText:"确认删除",closable:!0,onOk:function(){t.setMessageId(e.row.id),t.handleDeleteMessage().then(function(e){t.$Message.success("删除成功！"),t.getMessageBoardList()})}})},changePage:function(e){this.setMessageBoardListPage(e),this.getMessageBoardList()},getMessageBoardList:function(){var e=this;this.messageListTableLoading=!0,this.handleMessageBoardList().then(function(t){e.totalCount=t.data.totalCount,e.messageList=t.data.comments,e.messageListTableLoading=!1}).catch(function(t){e.messageListTableLoading=!1})}}),created:function(){this.getMessageBoardList()}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{margin:"20px",padding:"20px","background-color":"white"}},[s("Table",{attrs:{border:"",stripe:"",data:e.messageList,columns:e.messageListColumns,loading:e.messageListTableLoading}}),e._v(" "),s("div",{staticStyle:{margin:"20px",overflow:"hidden"}},[s("Page",{attrs:{"page-size":e.pageSize,total:e.totalCount,current:e.currentPage,"show-elevator":"","show-total":""},on:{"on-change":e.changePage}})],1)],1)},staticRenderFns:[]};var p=s("VU/8")(c,d,!1,function(e){s("kJJV")},"data-v-30bb4757",null);t.default=p.exports},MZtH:function(e,t){},kJJV:function(e,t){}});
//# sourceMappingURL=6.565020344168af5caab0.js.map