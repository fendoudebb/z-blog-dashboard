webpackJsonp([6],{Jxqd:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("Dd8w"),a=o.n(i),n=o("SJI6"),l={name:"ip-pool",data:function(){return{ipPoolListTableLoading:!1,ipPoolList:[],pageSize:this.getIpPoolListSize(),totalCount:1,currentPage:1,ipPoolListColumns:[{title:"ID",key:"id",align:"center"},{title:"IP",key:"ip",align:"center"},{title:"访问时间",key:"createTime",align:"center"}]}},methods:a()({},Object(n.mapMutations)(["setIpPoolListPage"]),Object(n.mapGetters)(["getIpPoolListSize"]),Object(n.mapActions)(["handleIpPoolList"]),{changePage:function(t){this.setIpPoolListPage(t),this.getIpPoolList()},getIpPoolList:function(){var t=this;this.ipPoolListTableLoading=!0,this.handleIpPoolList().then(function(e){t.totalCount=e.data.totalCount,t.ipPoolList=e.data.ipPool,t.ipPoolListTableLoading=!1}).catch(function(e){t.ipPoolListTableLoading=!1})}}),created:function(){this.getIpPoolList()}},s={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticStyle:{margin:"20px",padding:"20px","background-color":"white"}},[o("Table",{attrs:{border:"",stripe:"",data:t.ipPoolList,columns:t.ipPoolListColumns,loading:t.ipPoolListTableLoading}}),t._v(" "),o("div",{staticStyle:{margin:"20px",overflow:"hidden"}},[o("Page",{attrs:{"page-size":t.pageSize,total:t.totalCount,current:t.currentPage,"show-elevator":"","show-total":""},on:{"on-change":t.changePage}})],1)],1)},staticRenderFns:[]};var r=o("VU/8")(l,s,!1,function(t){o("lXr3")},null,null);e.default=r.exports},lXr3:function(t,e){}});
//# sourceMappingURL=6.a0cce6ab95ddde8347fb.js.map