(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"+5HZ":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("0451");t.ResizeObservation=function(){function e(e){this.target=e,this.$$broadcastWidth=this.$$broadcastHeight=0}return Object.defineProperty(e.prototype,"broadcastWidth",{get:function(){return this.$$broadcastWidth},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"broadcastHeight",{get:function(){return this.$$broadcastHeight},enumerable:!0,configurable:!0}),e.prototype.isActive=function(){var e=s.ContentRect(this.target);return!!e&&(e.width!==this.broadcastWidth||e.height!==this.broadcastHeight)},e}()},"0451":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ContentRect=function(e){if("getBBox"in e){var t=e.getBBox();return Object.freeze({height:t.height,left:0,top:0,width:t.width})}var n=window.getComputedStyle(e);return Object.freeze({height:parseFloat(n.height||"0"),left:parseFloat(n.paddingLeft||"0"),top:parseFloat(n.paddingTop||"0"),width:parseFloat(n.width||"0")})}},D7sm:function(e,t,n){"use strict";n.r(t),n.d(t,"ChatModule",function(){return W});var s=n("ofXK"),i=n("tyNb"),r=n("CmIU");n("phrh").e.get(r.f.Chat);var o=n("IzEk"),a=n("pLZG"),c=n("zx2A");function d(e){return t=>t.lift(new g(e))}class g{constructor(e){this.notifier=e}call(e,t){const n=new l(e),s=Object(c.c)(this.notifier,new c.a(n));return s&&!n.seenValue?(n.add(s),t.subscribe(n)):n}}class l extends c.b{constructor(e){super(e),this.seenValue=!1}notifyNext(){this.seenValue=!0,this.complete()}notifyComplete(){}}var h=n("lJxs"),u=function(e){return e[e.FetchChatHistory=1]="FetchChatHistory",e[e.ReadMessage=2]="ReadMessage",e[e.SendMessage=3]="SendMessage",e[e.CreateSocket=4]="CreateSocket",e[e.CloseSocket=5]="CloseSocket",e}({}),f=n("SlXt"),p=n("itXk"),b=n("Yzjp");let m=(()=>{class e{}return e.generateResizeObserver=e=>new b.ResizeObserver(t=>t.forEach(t=>e(t))),e})();var v=n("fXoL"),y=n("quSY"),O=n("XNiG"),$=n("0tOT"),w=n("PvES"),M=n("/uUt"),_=n("cp0P"),C=n("DZuR"),x=n("Jgta"),P=n("a/YC"),T=n("N+D2");let k=(()=>{class e extends C.a{constructor(e,t,n){super(e,t),this.$overlay=n,this.databaseName="messageCenter"}onHistoryUpdated$(e){return this.$fb.getCollection(this.databaseName).doc(e).collection("history").valueChanges().pipe(Object(h.a)(e=>e),Object(M.a)((e,t)=>0===t.filter(({id:t,isRead:n})=>{var s;return t&&(!e.find(e=>e.id===t)||(null===(s=e.find(e=>e.id===t))||void 0===s?void 0:s.isRead)!==n)}).length))}fetchMessageRecord(e,t){const n=this.$overlay.startLoading(),s=document.activeElement;return s.blur(),new Promise(i=>{this.$fb.getDoc("messageCenter",e).collection("history").get().subscribe(e=>{this.$overlay.endLoading(n,s),i(e.docs.map(e=>e.data()).filter(({userId:e})=>e===t))})})}send(e,t,n){const s=this.$overlay.startLoading(),i=document.activeElement;return i.blur(),new Promise(r=>{this.$fb.getDoc("messageCenter",e).collection("history").add({message:t,isRead:!1,userId:n,sendTo:n,sendTime:x.a.firestore.Timestamp.now()}).then(t=>{this.$fb.getDoc("messageCenter",e).collection("history").doc(t.id).update({id:t.id}).then(()=>{this.$overlay.endLoading(s,i),r(t.id)})})})}sync(e,t,n,s){const i=this.$overlay.startLoading(),r=document.activeElement;return r.blur(),new Promise(o=>{this.$fb.getDoc("messageCenter",n).collection("history").doc(s).set({id:s,message:t,isRead:!1,userId:e,sendTo:n,sendTime:x.a.firestore.Timestamp.now()}).then(()=>{this.$overlay.endLoading(i,r),o(!0)})})}read(e,t){return new Promise(n=>{Object(_.a)(t.map(t=>this.$fb.getDoc("messageCenter",e).collection("history").doc(t).update({isRead:!0}))).subscribe(()=>n(!0))})}}return e.\u0275fac=function(t){return new(t||e)(v.Sb(P.a),v.Sb(w.a),v.Sb(T.a))},e.\u0275prov=v.Fb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),I=(()=>{class e extends $.a{constructor(e,t){super(e),this.$message=t,this.ws=new y.a,this.messageHistory=new O.a,this.messageHistory$=this.messageHistory.asObservable(),this.featureName="Chat"}resolveAction({action:e,id:t,friendId:n,message:s,messageIds:i}){return new Promise(r=>{switch(e){case u.FetchChatHistory:this.$message.fetchMessageRecord(t,n).then(e=>{this.$logger.systemMessage(`Total ${history.length} messages with friend ${n} has successfully fetched.`),r(e)});break;case u.ReadMessage:this.readMessages(t,n,i);break;case u.SendMessage:r(this.addMessageRecord(t,n,s));break;case u.CreateSocket:this.$logger.systemMessage("chat ws has already created."),this.ws=this.$message.onHistoryUpdated$(t).subscribe(e=>{this.$logger.systemMessage(`Total ${e.length} messages with friend ${n} has successfully fetched.`),this.messageHistory.next(e.filter(({userId:e})=>e===n).sort((e,t)=>e.sendTime.toDate().toISOString()>t.sendTime.toDate().toISOString()?1:-1))});break;case u.CloseSocket:this.ws&&(this.ws.unsubscribe(),this.$logger.systemMessage("chat ws has already destroyed.")),r(!0)}})}readMessages(e,t,n){this.$message.read(e,n),this.$message.read(t,n)}addMessageRecord(e,t,n){return new Promise(s=>this.$message.send(e,n,t).then(i=>this.$message.sync(e,n,t,i).then(()=>s(!0))))}}return e.\u0275fac=function(t){return new(t||e)(v.Sb(w.a),v.Sb(k))},e.\u0275prov=v.Fb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var R=n("LJo4"),D=n("3Pt+");let N=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=v.Db({type:e,selectors:[["app-chat-announcement"]],decls:2,vars:0,template:function(e,t){1&e&&(v.Ob(0,"p"),v.pc(1,"chat-announcement works!"),v.Nb())},styles:["[_nghost-%COMP%]{display:block}"]}),e})(),S=(()=>{class e{transform(e){const t=Array.from(e.toDate().toLocaleTimeString().replace(/:\d{1,2}/,""));return t.splice(2,0," "),t.join("")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=v.Ib({name:"chatTime",type:e,pure:!0}),e})(),E=(()=>{class e{transform(e){const t=e.toDate();let n="";switch(t.getDay()){case 0:n="\u65e5";break;case 1:n="\u4e00";break;case 2:n="\u4e8c";break;case 3:n="\u4e09";break;case 4:n="\u56db";break;case 5:n="\u4e94";break;case 6:n="\u516d"}const s=t.toLocaleDateString().replace(/^\d{1,2}:/,"").split("/");return s.shift(),this.isToday(t)?"\u4eca\u5929":this.isYestday(t)?"\u6628\u5929":`${s[0]}\u6708${s[1]}\u65e5(${n})`}isToday(e){return e.getDate()===(new Date).getDate()}isYestday(e){const t=new Date;return t!==e&&new Date(t.getTime()-864e5).getDate()===e.getDate()}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=v.Ib({name:"chatDate",type:e,pure:!0}),e})();const z=["tMessages"];function j(e,t){1&e&&v.Kb(0,"app-chat-announcement")}function H(e,t){if(1&e&&(v.Ob(0,"li",21),v.Ob(1,"p"),v.pc(2),v.Zb(3,"chatDate"),v.Nb(),v.Nb()),2&e){const e=v.Yb().$implicit;v.yb(2),v.qc(v.ac(3,1,e.sendTime))}}function F(e,t){if(1&e&&v.Kb(0,"img",22),2&e){const e=v.Yb(3);v.dc("src",e.friend.avatar||e.defaultAvatar,v.kc)}}function L(e,t){1&e&&(v.Ob(0,"p"),v.pc(1,"\u5df2\u8b80"),v.Nb())}function A(e,t){if(1&e&&(v.Mb(0),v.nc(1,H,4,3,"li",13),v.Ob(2,"li",14),v.Ob(3,"div",15),v.nc(4,F,1,1,"img",16),v.Nb(),v.Ob(5,"div",17),v.Ob(6,"p",18),v.pc(7),v.Nb(),v.Ob(8,"div",19),v.nc(9,L,2,0,"p",5),v.Ob(10,"p",20),v.pc(11),v.Zb(12,"chatTime"),v.Nb(),v.Nb(),v.Nb(),v.Nb(),v.Lb()),2&e){const e=t.$implicit,n=t.index,s=v.Yb(2);v.yb(1),v.dc("ngIf",s.showDateDivider(s.messageHistory,n,e)),v.yb(1),v.Bb("message__myself",e.sendTo!==s.userId)("message__friend",e.sendTo===s.userId),v.yb(2),v.dc("ngIf",s.showAvatar(s.messageHistory,n,e)),v.yb(3),v.qc(e.message),v.yb(2),v.dc("ngIf",e.isRead&&e.sendTo!==s.userId),v.yb(2),v.qc(v.ac(12,9,e.sendTime))}}function Y(e,t){if(1&e){const e=v.Pb();v.Mb(0),v.Ob(1,"header",2,3),v.Ob(3,"nav"),v.Ob(4,"h3"),v.pc(5),v.Nb(),v.Kb(6,"em"),v.Nb(),v.Ob(7,"nav"),v.Ob(8,"em",4),v.pc(9,"search"),v.Nb(),v.Ob(10,"em",4),v.pc(11,"content_paste"),v.Nb(),v.Nb(),v.nc(12,j,1,0,"app-chat-announcement",5),v.Nb(),v.Ob(13,"section",6),v.Ob(14,"ul",2,7),v.nc(16,A,13,11,"ng-container",8),v.Nb(),v.Nb(),v.Ob(17,"footer",null,9),v.Ob(19,"textarea",10),v.Vb("ngModelChange",function(t){return v.ic(e),v.Yb().message=t})("keydown",function(t){return v.ic(e),v.Yb().afterKeydown(t)}),v.Nb(),v.Ob(20,"nav"),v.Ob(21,"div",11),v.Ob(22,"em",12),v.pc(23,"attach_file"),v.Nb(),v.Ob(24,"em",4),v.pc(25,"bookmark_border"),v.Nb(),v.Nb(),v.Nb(),v.Nb(),v.Lb()}if(2&e){const e=v.hc(2),t=v.hc(18),n=v.Yb();v.yb(5),v.qc(null==n.friend?null:n.friend.name),v.yb(7),v.dc("ngIf",!1),v.yb(1),v.mc("height","calc(100% - "+e.clientHeight+"px - "+t.clientHeight+"px)"),v.dc("scrollTop",n.scrollTop),v.yb(3),v.dc("ngForOf",n.messageHistory),v.yb(3),v.dc("ngModel",n.message)}}function q(e,t){1&e&&(v.Ob(0,"section",23),v.Ob(1,"span",4),v.pc(2," question_answer "),v.Nb(),v.Ob(3,"p"),v.pc(4,"\u958b\u59cb\u804a\u5929\u5427!"),v.Nb(),v.Nb())}let J=(()=>{class e extends f.a{constructor(e,t,n){super(),this.$feature=e,this.$user=t,this.activatedRoute=n,this.message="",this.messageHistory=[],this.defaultAvatar="assets/images/icons/empty-avatar.jpeg",this.scrollTop=0,this.shouldScroll=!1}ngOnInit(){this.$user.user$.pipe(Object(o.a)(1)).subscribe(e=>this.userId=e.id),Object(p.a)([this.$user.friends$.pipe(Object(a.a)(e=>e.length>0)),this.activatedRoute.params.pipe(Object(a.a)(({id:e})=>!!e))]).pipe(d(this.onDestroy$),Object(h.a)(([e,{id:t}])=>({friends:e,id:t}))).subscribe(({id:e,friends:t})=>this.initial(e,t)),this.$feature.messageHistory$.pipe(d(this.onDestroy$)).subscribe(e=>this.afterMessageHistoriesUpdated(e))}showAvatar(e,t,n){return(0===t||e[t].sendTime.toDate().toISOString().split(":")[1]!==e[t-1].sendTime.toDate().toISOString().split(":")[1])&&n.sendTo===this.userId}showDateDivider(e,t,n){return 0===t||n.sendTime.toDate().toLocaleDateString()!==e[t-1].sendTime.toDate().toLocaleDateString()}afterKeydown(e){var t;"Enter"===e.key&&""!==this.message.trim()&&this.$feature.fireEvent({action:u.SendMessage,id:this.userId,friendId:null===(t=this.friend)||void 0===t?void 0:t.id,message:this.message}).then(()=>this.message="")}afterMessageHistoriesUpdated(e){var t,n;switch(this.observer||this.settingObserver(),this.messageHistory=e,null===(t=e[e.length-1])||void 0===t?void 0:t.sendTo){case this.userId:this.markMessageAsRead(e.filter(({sendTo:e})=>e===this.userId).map(({id:e})=>e));break;case null===(n=this.friend)||void 0===n?void 0:n.id:this.shouldScroll=!0}}initial(e,t){this.scrollTop=0,this.shouldScroll=!0,this.friend=t.find(({id:t})=>t===e),this.$feature.fireEvent({action:u.CloseSocket}).then(()=>{this.$feature.fireEvent({action:u.CreateSocket,id:this.userId,friendId:e})})}markMessageAsRead(e){var t;this.$feature.fireEvent({action:u.ReadMessage,id:this.userId,friendId:null===(t=this.friend)||void 0===t?void 0:t.id,messageIds:e})}settingObserver(){var e;this.observer=m.generateResizeObserver(e=>{this.shouldScroll&&(this.scrollTop=e.contentRect.height,this.shouldScroll=!1)}),this.observer.observe(null===(e=this.tMessages)||void 0===e?void 0:e.nativeElement)}onDestroy(){var e;null===(e=this.observer)||void 0===e||e.disconnect()}}return e.\u0275fac=function(t){return new(t||e)(v.Jb(I),v.Jb(R.a),v.Jb(i.a))},e.\u0275cmp=v.Db({type:e,selectors:[["app-chat"]],viewQuery:function(e,t){if(1&e&&v.tc(z,!0),2&e){let e;v.gc(e=v.Wb())&&(t.tMessages=e.first)}},features:[v.vb],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["empty",""],[1,"w-100"],["tHeader",""],[1,"material-icons"],[4,"ngIf"],[1,"scroll-bar",3,"scrollTop"],["tMessages",""],[4,"ngFor","ngForOf"],["tFooter",""],["placeholder","\u8acb\u8f38\u5165\u8a0a\u606f",1,"p-0",3,"ngModel","ngModelChange","keydown"],[1,"d-flex","flex-row","align-itmes-center"],["rotate45","",1,"material-icons"],["class","date-divider",4,"ngIf"],[1,"message"],[1,"avatar"],["alt","",3,"src",4,"ngIf"],[1,"content"],[1,"text"],[1,"caption"],[1,"time"],[1,"date-divider"],["alt","",3,"src"],[1,"content-empty"]],template:function(e,t){if(1&e&&(v.nc(0,Y,26,7,"ng-container",0),v.nc(1,q,5,0,"ng-template",null,1,v.oc)),2&e){const e=v.hc(2);v.dc("ngIf",t.friend)("ngIfElse",e)}},directives:[s.l,s.k,D.a,D.i,D.k,N],pipes:[S,E],styles:['[_nghost-%COMP%]{display:block;height:100%}header[_ngcontent-%COMP%], nav[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}header[_ngcontent-%COMP%]{justify-content:space-between;height:50px;padding:0 .8rem;position:relative}header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-right:.5rem;font-size:.875rem}app-chat-announcement[_ngcontent-%COMP%]{width:100%;position:absolute;top:50px;left:0;height:40px}footer[_ngcontent-%COMP%]{border-top:1px solid #f5f5f5;padding:.9rem 1rem 0}footer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{outline:none;display:block;width:100%;min-height:80px;max-height:140px;border:none;resize:none;font-size:.75rem}footer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder{color:rgba(0,0,0,.2);font-size:.75rem}footer[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{height:50px;padding:0 0 5px;display:flex;flex-direction:row;width:100%;justify-content:space-between}.content-empty[_ngcontent-%COMP%]{-webkit-user-select:none;user-select:none;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;color:#d0d5db;background:#f2f6f8}.content-empty[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{font-size:120px}.content-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:20px}section[_ngcontent-%COMP%]{overflow-y:auto;padding:0 12px}.date-divider[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.date-divider[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:6px 12px;font-size:.75rem;color:#afb1b5;background-color:#f2f6f8;border-radius:11px}.message[_ngcontent-%COMP%]{align-items:center;margin-right:15px;padding:10px 0;font-size:.875rem}.message[_ngcontent-%COMP%], .message[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{display:flex;flex-direction:row}.message[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{position:relative;align-items:flex-end}.message[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]:before{content:"";position:absolute;z-index:10;top:50px;right:0;width:10px;height:10px;background-color:#539cf0;transform:rotate(45deg)}.message[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{margin:4px 0;padding:10px 9px;word-wrap:break-word;border-radius:16px}.message[_ngcontent-%COMP%]   .caption[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;padding:0 7px;font-size:.75rem;color:#afb1b5;white-space:nowrap}.message[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{padding:3px 0}.message__myself[_ngcontent-%COMP%]{justify-content:flex-end}.message__myself[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{flex-direction:row-reverse}.message__myself[_ngcontent-%COMP%]   .caption[_ngcontent-%COMP%]{align-items:flex-end}.message__myself[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{background:#a3cdfd}.message__friend[_ngcontent-%COMP%]{justify-content:flex-start;align-items:flex-end}.message__friend[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{display:flex;background:#e9ebec}.message__friend[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]{width:41px;margin-right:10px}.message__friend[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:41px;height:41px;border-radius:50%;object-fit:cover}.message__friend[_ngcontent-%COMP%]   .caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:first-child{display:none}']}),e})();const Z=[{path:"",component:J},{path:":id",component:J}];let K=(()=>{class e{}return e.\u0275mod=v.Hb({type:e}),e.\u0275inj=v.Gb({factory:function(t){return new(t||e)},imports:[[i.e.forChild(Z)],i.e]}),e})();var U=n("FpXt");let W=(()=>{class e{}return e.\u0275mod=v.Hb({type:e}),e.\u0275inj=v.Gb({factory:function(t){return new(t||e)},imports:[[U.a,s.c,K]]}),e})()},Yzjp:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("+5HZ"),i=n("xZdO"),r=[],o=function(){function e(e){this.$$observationTargets=[],this.$$activeTargets=[],this.$$skippedTargets=[];var t=function(e){return void 0===e?"Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.":"function"!=typeof e?"Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.":void 0}(e);if(t)throw TypeError(t);this.$$callback=e}return e.prototype.observe=function(e){var t=c("observe",e);if(t)throw TypeError(t);d(this.$$observationTargets,e)>=0||(this.$$observationTargets.push(new s.ResizeObservation(e)),r.indexOf(this)<0&&(r.push(this),f()))},e.prototype.unobserve=function(e){var t=c("unobserve",e);if(t)throw TypeError(t);var n=d(this.$$observationTargets,e);n<0||(this.$$observationTargets.splice(n,1),0===this.$$observationTargets.length&&a(this))},e.prototype.disconnect=function(){this.$$observationTargets=[],this.$$activeTargets=[],a(this)},e}();function a(e){var t=r.indexOf(e);t>=0&&(r.splice(t,1),b())}function c(e,t){return void 0===t?"Failed to execute '"+e+"' on 'ResizeObserver': 1 argument required, but only 0 present.":t&&t.nodeType===window.Node.ELEMENT_NODE?void 0:"Failed to execute '"+e+"' on 'ResizeObserver': parameter 1 is not of type 'Element'."}function d(e,t){for(var n=0;n<e.length;n+=1)if(e[n].target===t)return n;return-1}t.ResizeObserver=o;var g,l=function(e){r.forEach(function(t){t.$$activeTargets=[],t.$$skippedTargets=[],t.$$observationTargets.forEach(function(n){n.isActive()&&(u(n.target)>e?t.$$activeTargets.push(n):t.$$skippedTargets.push(n))})})},h=function(){var e=1/0;return r.forEach(function(t){if(t.$$activeTargets.length){var n=[];t.$$activeTargets.forEach(function(t){var s=new i.ResizeObserverEntry(t.target);n.push(s),t.$$broadcastWidth=s.contentRect.width,t.$$broadcastHeight=s.contentRect.height;var r=u(t.target);r<e&&(e=r)}),t.$$callback(n,t),t.$$activeTargets=[]}}),e},u=function(e){for(var t=0;e.parentNode;)e=e.parentNode,t+=1;return t},f=function(){g||p()},p=function(){g=window.requestAnimationFrame(function(){(function(){var e,t=0;for(l(t);r.some(function(e){return!!e.$$activeTargets.length});)t=h(),l(t);r.some(function(e){return!!e.$$skippedTargets.length})&&(e=new window.ErrorEvent("ResizeLoopError",{message:"ResizeObserver loop completed with undelivered notifications."}),window.dispatchEvent(e))})(),p()})},b=function(){g&&!r.some(function(e){return!!e.$$observationTargets.length})&&(window.cancelAnimationFrame(g),g=void 0)};t.install=function(){return window.ResizeObserver=o}},xZdO:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("0451");t.ResizeObserverEntry=function(){return function(e){this.target=e,this.contentRect=s.ContentRect(e)}}()}}]);