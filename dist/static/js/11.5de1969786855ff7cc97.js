webpackJsonp([11],{QloA:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Dd8w"),s=n.n(i),o=n("SJI6"),a={name:"post-comments-list",data:function(){var t=this;return{postCommentsListTableLoading:!1,pageSize:this.getCommentsListSize(),totalCount:1,currentPage:1,postCommentsList:[],postCommentsListColumns:[{type:"index",width:60,align:"center"},{title:"ID",key:"postId",align:"center",ellipsis:!0,minWidth:50},{title:"标题",key:"title",align:"center",ellipsis:!0,minWidth:300,render:function(t,e){return t("div",[t("span",{style:{display:"inline-block",width:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},domProps:{title:e.row.title}},e.row.title)])}},{title:"评论数",key:"commentCount",align:"center",ellipsis:!0,minWidth:100},{title:"状态",key:"postStatus",align:"center",ellipsis:!0,minWidth:90,render:function(t,e){var n=e.row.postStatus,i="",s="";return"AUDIT"===n?(i="待审核",s="orange"):"ONLINE"===n?(i="上线",s="green"):"OFFLINE"===n?(i="下线",s="red"):"PRIVATE"===n?(i="私人",s="lightskyblue"):"DRAFT"===n&&(i="草稿",s="lightskyblue"),t("Tag",{props:{color:s}},i)}},{title:"操作",key:"action",align:"center",ellipsis:!0,minWidth:90,render:function(e,n){var i=[];if("ONLINE"===n.row.postStatus){var s=e("Button",{props:{type:"success",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.watchPostById(n.row.postId)}}},"查看");i.push(s)}return e("div",[i])}}]}},methods:s()({},Object(o.mapMutations)(["setCommentsListPage"]),Object(o.mapGetters)(["getCommentsListSize"]),Object(o.mapActions)(["handlePostCommentsList"]),{watchPostById:function(t){window.open("https://www.zhangbj.com/p/"+t+".html")},changePage:function(t){this.setCommentsListPage(t),this.getPostCommentsList()},getPostCommentsList:function(){var t=this;this.postCommentsListTableLoading=!0,this.handlePostCommentsList().then(function(e){t.totalCount=e.data.totalCount,t.postCommentsList=e.data.post,t.postCommentsListTableLoading=!1}).catch(function(e){t.postCommentsListTableLoading=!1})}}),created:function(){this.getPostCommentsList()},mounted:function(){}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{margin:"20px",padding:"20px","background-color":"white"}},[n("Table",{attrs:{border:"",stripe:"","highlight-row":!0,data:t.postCommentsList,columns:t.postCommentsListColumns,loading:t.postCommentsListTableLoading}}),t._v(" "),n("div",{staticStyle:{margin:"20px",overflow:"hidden"}},[n("Page",{attrs:{"page-size":t.pageSize,total:t.totalCount,current:t.currentPage,"show-elevator":"","show-total":""},on:{"on-change":t.changePage}})],1)],1)},staticRenderFns:[]};var r=n("VU/8")(a,l,!1,function(t){n("SNXk")},"data-v-51f190e2",null);e.default=r.exports},SNXk:function(t,e){}});
//# sourceMappingURL=11.5de1969786855ff7cc97.js.map