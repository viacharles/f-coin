(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{D7sm:function(e,t,n){"use strict";n.r(t),n.d(t,"ChatModule",function(){return _});var s=n("ofXK"),i=n("tyNb"),r=n("IzEk"),o=n("pLZG"),a=n("zx2A");class c{constructor(e){this.notifier=e}call(e,t){const n=new d(e),s=Object(a.c)(this.notifier,new a.a(n));return s&&!n.seenValue?(n.add(s),t.subscribe(n)):n}}class d extends a.b{constructor(e){super(e),this.seenValue=!1}notifyNext(){this.seenValue=!0,this.complete()}notifyComplete(){}}var h=n("lJxs"),l=function(e){return e[e.FetchChatHistory=1]="FetchChatHistory",e[e.SendMessage=2]="SendMessage",e}({}),u=n("SlXt"),f=n("itXk"),g=n("fXoL"),b=n("PvES"),p=n("DZuR"),m=n("Jgta"),y=n("a/YC"),M=n("N+D2");let v=(()=>{class e extends p.a{constructor(e,t,n){super(e,t),this.$overlay=n,this.databaseName="messageCenter"}fetchMessageRecord(e,t){const n=this.$overlay.startLoading(),s=document.activeElement;return s.blur(),new Promise(i=>{this.$fb.getDoc("messageCenter",e).collection("history").get().subscribe(e=>{this.$overlay.endLoading(n,s),i(e.docs.map(e=>e.data()).filter(({userId:e})=>e===t))})})}send(e,t,n){const s=this.$overlay.startLoading(),i=document.activeElement;return i.blur(),new Promise(r=>{this.$fb.getDoc("messageCenter",e).collection("history").add({message:t,isRead:!1,userId:n,sendTime:m.a.firestore.Timestamp.now()}).then(t=>{this.$logger.systemMessage(`message ${t.id} has successfully created.`),this.$fb.getDoc("messageCenter",e).collection("history").doc(t.id).update({id:t.id}).then(()=>{this.$overlay.endLoading(s,i),r(!0)})})})}}return e.\u0275fac=function(t){return new(t||e)(g.Rb(y.a),g.Rb(b.a),g.Rb(M.a))},e.\u0275prov=g.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),w=(()=>{class e extends class{constructor(e){this.$logger=e}fireEvent(e){return this.$logger.debugMessage(`${this.featureName} event ${e.action} has been triggered.`),this.resolveAction(e).then(e=>e)}}{constructor(e,t){super(e),this.$message=t,this.featureName="Chat"}resolveAction({action:e,id:t,friendId:n,message:s}){return new Promise(i=>{switch(e){case l.FetchChatHistory:this.$message.fetchMessageRecord(t,n).then(e=>{this.$logger.systemMessage(`Total ${e.length} messages with friend ${n} has successfully fetched.`),i(e)});break;case l.SendMessage:i(this.$message.send(t,s,n))}})}}return e.\u0275fac=function(t){return new(t||e)(g.Rb(b.a),g.Rb(v))},e.\u0275prov=g.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var C=n("LJo4"),$=n("3Pt+");let x=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=g.Cb({type:e,selectors:[["app-chat-announcement"]],decls:2,vars:0,template:function(e,t){1&e&&(g.Nb(0,"p"),g.lc(1,"chat-announcement works!"),g.Mb())},styles:["[_nghost-%COMP%]{display:block}"]}),e})();function O(e,t){1&e&&g.Jb(0,"app-chat-announcement")}const P=[{path:":id",component:(()=>{class e extends u.a{constructor(e,t,n){super(),this.$feature=e,this.$user=t,this.activatedRoute=n,this.message="",this.history=[],this.friend=null,this.userId=null}ngOnInit(){var e;this.$user.user$.pipe(Object(r.a)(1)).subscribe(e=>this.userId=e.id),Object(f.a)([this.$user.friends$.pipe(Object(o.a)(e=>e.length>0)),this.activatedRoute.params]).pipe((e=this.onDestroy$,t=>t.lift(new c(e))),Object(h.a)(([e,{id:t}])=>({friends:e,id:t}))).subscribe(({id:e,friends:t})=>this.initial(e,t))}afterKeydown(e){var t;"Enter"===e.key&&this.$feature.fireEvent({action:l.SendMessage,id:this.userId,message:this.message,friendId:null===(t=this.friend)||void 0===t?void 0:t.id}).then(()=>this.message="")}initial(e,t){this.friend=t.find(({id:t})=>t===e),this.$feature.fireEvent({action:l.FetchChatHistory,friendId:e,id:this.userId}).then(e=>this.history=e)}}return e.\u0275fac=function(t){return new(t||e)(g.Ib(w),g.Ib(C.a),g.Ib(i.a))},e.\u0275cmp=g.Cb({type:e,selectors:[["app-chat"]],features:[g.vb],decls:23,vars:5,consts:[[1,"w-100"],["tHeader",""],[1,"material-icons"],[4,"ngIf"],["tFooter",""],["placeholder","\u8acb\u8f38\u5165\u8a0a\u606f",1,"p-0",3,"ngModel","ngModelChange","keydown"],[1,"d-flex","flex-row","align-itmes-center"],["rotate45","",1,"material-icons"]],template:function(e,t){if(1&e&&(g.Nb(0,"header",0,1),g.Nb(2,"nav"),g.Nb(3,"h3"),g.lc(4),g.Mb(),g.Jb(5,"em"),g.Mb(),g.Nb(6,"nav"),g.Nb(7,"em",2),g.lc(8,"search"),g.Mb(),g.Nb(9,"em",2),g.lc(10,"content_paste"),g.Mb(),g.Mb(),g.jc(11,O,1,0,"app-chat-announcement",3),g.Mb(),g.Nb(12,"section"),g.lc(13," 123\n"),g.Mb(),g.Nb(14,"footer",null,4),g.Nb(16,"textarea",5),g.Ub("ngModelChange",function(e){return t.message=e})("keydown",function(e){return t.afterKeydown(e)}),g.Mb(),g.Nb(17,"nav"),g.Nb(18,"div",6),g.Nb(19,"em",7),g.lc(20,"attach_file"),g.Mb(),g.Nb(21,"em",2),g.lc(22,"bookmark_border"),g.Mb(),g.Mb(),g.Mb(),g.Mb()),2&e){const e=g.ec(1),n=g.ec(15);g.yb(4),g.mc(null==t.friend?null:t.friend.name),g.yb(7),g.ac("ngIf",!1),g.yb(1),g.ic("height","calc(100% - "+e.clientHeight+"px - "+n.clientHeight+"px)"),g.yb(4),g.ac("ngModel",t.message)}},directives:[s.k,$.a,$.f,$.h,x],styles:["[_nghost-%COMP%]{display:block;height:100%}header[_ngcontent-%COMP%], nav[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}header[_ngcontent-%COMP%]{justify-content:space-between;height:50px;padding:0 .5rem;position:relative}header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-right:.5rem}app-chat-announcement[_ngcontent-%COMP%]{width:100%;position:absolute;top:50px;left:0;height:40px}section[_ngcontent-%COMP%]{overflow-y:auto}footer[_ngcontent-%COMP%]{border-top:1px solid #f5f5f5;padding:.5rem 1rem 0}footer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{outline:none;display:block;width:100%;min-height:80px;max-height:140px;border:none;resize:none;font-size:.75rem}footer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder{color:rgba(0,0,0,.2);font-size:.75rem}footer[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{height:40px;display:flex;flex-direction:row;width:100%;justify-content:space-between}"]}),e})()}];let N=(()=>{class e{}return e.\u0275mod=g.Gb({type:e}),e.\u0275inj=g.Fb({factory:function(t){return new(t||e)},imports:[[i.e.forChild(P)],i.e]}),e})();var I=n("FpXt");let _=(()=>{class e{}return e.\u0275mod=g.Gb({type:e}),e.\u0275inj=g.Fb({factory:function(t){return new(t||e)},imports:[[I.a,s.c,N]]}),e})()}}]);