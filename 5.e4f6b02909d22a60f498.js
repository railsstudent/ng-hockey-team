(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"4fRq":function(n,l){var e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(e){var t=new Uint8Array(16);n.exports=function(){return e(t),t}}else{var u=new Array(16);n.exports=function(){for(var n,l=0;l<16;l++)0==(3&l)&&(n=4294967296*Math.random()),u[l]=n>>>((3&l)<<3)&255;return u}}},EcEN:function(n,l,e){var t=e("xDdU"),u=e("xk4V"),r=u;r.v1=t,r.v4=u,n.exports=r},I2ZF:function(n,l){for(var e=[],t=0;t<256;++t)e[t]=(t+256).toString(16).substr(1);n.exports=function(n,l){var t=l||0;return[e[n[t++]],e[n[t++]],e[n[t++]],e[n[t++]],"-",e[n[t++]],e[n[t++]],"-",e[n[t++]],e[n[t++]],"-",e[n[t++]],e[n[t++]],"-",e[n[t++]],e[n[t++]],e[n[t++]],e[n[t++]],e[n[t++]],e[n[t++]]].join("")}},"f+oG":function(n,l,e){"use strict";e.r(l);var t={};e.r(t),e.d(t,"TeamActionTypes",function(){return O}),e.d(t,"LoadTeams",function(){return k}),e.d(t,"LoadTeamsSuccess",function(){return M}),e.d(t,"LoadTeamsFailure",function(){return S}),e.d(t,"AddTeam",function(){return P}),e.d(t,"AddTeamSuccess",function(){return R}),e.d(t,"AddTeamFailure",function(){return I}),e.d(t,"LoadTeamRoster",function(){return _}),e.d(t,"LoadTeamsRosterSuccess",function(){return F}),e.d(t,"LoadTeamsRosterFailure",function(){return G});var u=e("CcnG"),r=function(){return function(){}}(),a=e("pMnS"),o=e("4c35"),i=e("Ip0R"),s=e("04Lv"),c=function(){function n(n){this.portalService=n}return n.prototype.ngOnInit=function(){},n}(),d=u.qb({encapsulation:0,styles:["[_nghost-%COMP%] {\n        display: block;\n      }"],data:{}});function b(n){return u.Lb(0,[(n()(),u.jb(0,null,null,0))],null,null)}function m(n){return u.Lb(0,[(n()(),u.sb(0,0,null,null,5,null,null,null,null,null,null,null)),(n()(),u.sb(1,0,null,null,4,"div",[["class","clr-row"]],null,null,null,null,null)),(n()(),u.sb(2,0,null,null,3,"div",[["class","clr-col-12"]],null,null,null,null,null)),(n()(),u.sb(3,0,null,null,2,"div",[["class","card"]],null,null,null,null,null)),(n()(),u.jb(16777216,null,null,1,null,b)),u.rb(5,212992,null,0,o.a,[u.j,u.R],{portal:[0,"portal"]},null)],function(n,l){n(l,5,0,l.context.ngIf)},null)}function f(n){return u.Lb(2,[(n()(),u.jb(16777216,null,null,2,null,m)),u.rb(1,16384,null,0,i.m,[u.R,u.O],{ngIf:[0,"ngIf"]},null),u.Eb(131072,i.b,[u.h])],function(n,l){var e=l.component;n(l,1,0,u.Kb(l,1,0,u.Cb(l,2).transform(e.portalService.portal)))},null)}var p=function(){function n(n,l,e,t){this.portalService=n,this.vcf=l,this.router=e,this.route=t}return n.prototype.ngOnInit=function(){this.portalService.setPortal(new o.c(this.teamTemplate,this.vcf))},n.prototype.navigate=function(n){this.router.navigate([n],{relativeTo:this.route})},n}(),g=e("ZYCi"),v=u.qb({encapsulation:0,styles:[[".container[_ngcontent-%COMP%]{height:100%;display:flex;justify-content:center;align-items:center}.spacer[_ngcontent-%COMP%], app-menu-card[_ngcontent-%COMP%]{flex:1 1 calc(100% / 3)}div.card-block[_ngcontent-%COMP%]{display:flex}div.card-block[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex-grow:1}"]],data:{}});function h(n){return u.Lb(0,[(n()(),u.sb(0,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(n()(),u.Jb(-1,null,[" Team Menu "])),(n()(),u.sb(2,0,null,null,3,"div",[["class","card-block"]],null,null,null,null,null)),(n()(),u.sb(3,0,null,null,2,"button",[["aria-label","Add new team"],["class","btn btn-outline"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.navigate("new")&&t),t},null,null)),(n()(),u.Jb(-1,null,[" Add Team "])),(n()(),u.sb(5,0,null,null,0,"i",[["class","fas fa-plus"]],null,null,null,null,null)),(n()(),u.sb(6,0,null,null,3,"div",[["class","card-block"]],null,null,null,null,null)),(n()(),u.sb(7,0,null,null,2,"button",[["aria-label","List teams"],["class","btn btn-outline"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.navigate("list")&&t),t},null,null)),(n()(),u.Jb(-1,null,[" List Teams "])),(n()(),u.sb(9,0,null,null,0,"i",[["class","fas fa-list-ul"]],null,null,null,null,null)),(n()(),u.sb(10,0,null,null,3,"div",[["class","card-block"]],null,null,null,null,null)),(n()(),u.sb(11,0,null,null,2,"button",[["aria-label","Team standing"],["class","btn btn-outline"]],null,null,null,null,null)),(n()(),u.Jb(-1,null,["Standing "])),(n()(),u.sb(13,0,null,null,0,"i",[["class","fas fa-table"]],null,null,null,null,null))],null,null)}function y(n){return u.Lb(2,[u.Hb(402653184,1,{teamTemplate:0}),(n()(),u.sb(1,0,null,null,4,"div",[["class","container"]],null,null,null,null,null)),(n()(),u.sb(2,0,null,null,0,"span",[["class","spacer"]],null,null,null,null,null)),(n()(),u.sb(3,0,null,null,1,"app-menu-card",[],null,null,null,f,d)),u.rb(4,114688,null,0,c,[s.a],null,null),(n()(),u.sb(5,0,null,null,0,"span",[["class","spacer"]],null,null,null,null,null)),(n()(),u.jb(0,[[1,2],["teamMenu",2]],null,0,null,h))],function(n,l){n(l,4,0)},null)}function T(n){return u.Lb(0,[(n()(),u.sb(0,16777216,null,null,1,"team-menu-card",[],null,null,null,y,v)),u.rb(1,114688,null,0,p,[s.a,u.R,g.o,g.a],null,null)],function(n,l){n(l,1,0)},null)}var O,C=u.ob("team-menu-card",p,T,{},{},[]),A=e("gIcY"),w=e("xLE1"),j=e("zl1X"),x=e("yGQT"),L=e("xMyE");!function(n){n.LoadTeams="[Team] Load Teams",n.LoadTeamsSuccess="[Team] Load Teams Success",n.LoadTeamsFailure="[Team] Load Teams Failed",n.AddTeam="[Team] Add Team",n.AddTeamSuccess="[Team] Add Team Success",n.AddTeamFailure="[Team] Add Team Failure",n.LoadTeamRoster="[Team] Load Team Roster",n.LoadTeamRosterSuccess="[Team] Load Team Roster Success",n.LoadTeamRosterFailure="[Team] Load Team Roster Failure"}(O||(O={}));var k=function(){return function(){this.type=O.LoadTeams}}(),M=function(){return function(n){this.payload=n,this.type=O.LoadTeamsSuccess}}(),S=function(){return function(n){this.payload=n,this.type=O.LoadTeamsFailure}}(),P=function(){return function(n){this.payload=n,this.type=O.AddTeam}}(),R=function(){return function(n){this.payload=n,this.type=O.AddTeamSuccess}}(),I=function(){return function(n){this.payload=n,this.type=O.AddTeamFailure}}(),_=function(){return function(n){this.payload=n,this.type=O.LoadTeamRoster}}(),F=function(){return function(n){this.payload=n,this.type=O.LoadTeamRosterSuccess}}(),G=function(){return function(n){this.payload=n,this.type=O.LoadTeamRosterFailure}}(),J=e("mrSG"),N=function(){return(N=Object.assign||function(n){for(var l,e=1,t=arguments.length;e<t;e++)for(var u in l=arguments[e])Object.prototype.hasOwnProperty.call(l,u)&&(n[u]=l[u]);return n}).apply(this,arguments)},E=function(n,l){var e="function"==typeof Symbol&&n[Symbol.iterator];if(!e)return n;var t,u,r=e.call(n),a=[];try{for(;(void 0===l||l-- >0)&&!(t=r.next()).done;)a.push(t.value)}catch(o){u={error:o}}finally{try{t&&!t.done&&(e=r.return)&&e.call(r)}finally{if(u)throw u.error}}return a},q=function(){for(var n=[],l=0;l<arguments.length;l++)n=n.concat(E(arguments[l]));return n},B=function(n){return n[n.EntitiesOnly=0]="EntitiesOnly",n[n.Both=1]="Both",n[n.None=2]="None",n}({});function D(n){return function(l,e){var t={ids:q(e.ids),entities:N({},e.entities)},u=n(l,t);return u===B.Both?Object.assign({},e,t):u===B.EntitiesOnly?N({},e,{entities:t.entities}):e}}function W(n,l){var e=l(n);return Object(u.ab)()&&void 0===e&&console.warn("@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.","You should probably provide your own `selectId` implementation.","The entity that was passed:",n,"The `selectId` implementation:",l.toString()),e}var $=function(n){var l="function"==typeof Symbol&&n[Symbol.iterator],e=0;return l?l.call(n):{next:function(){return n&&e>=n.length&&(n=void 0),{value:n&&n[e++],done:!n}}}};function z(n){function l(l,e){var t=W(l,n);return t in e.entities?B.None:(e.ids.push(t),e.entities[t]=l,B.Both)}function e(n,e){var t,u,r=!1;try{for(var a=$(n),o=a.next();!o.done;o=a.next())r=l(o.value,e)!==B.None||r}catch(i){t={error:i}}finally{try{o&&!o.done&&(u=a.return)&&u.call(a)}finally{if(t)throw t.error}}return r?B.Both:B.None}function t(n,l){var e=(n instanceof Array?n:l.ids.filter(function(e){return n(l.entities[e])})).filter(function(n){return n in l.entities}).map(function(n){return delete l.entities[n]}).length>0;return e&&(l.ids=l.ids.filter(function(n){return n in l.entities})),e?B.Both:B.None}function u(l,e){var t={};return(l=l.filter(function(n){return n.id in e.entities})).length>0?l.filter(function(l){return function(l,e,t){var u=Object.assign({},t.entities[e.id],e.changes),r=W(u,n),a=r!==e.id;return a&&(l[e.id]=r,delete t.entities[e.id]),t.entities[r]=u,a}(t,l,e)}).length>0?(e.ids=e.ids.map(function(n){return t[n]||n}),B.Both):B.EntitiesOnly:B.None}function r(l,t){var r,a,o=[],i=[];try{for(var s=$(l),c=s.next();!c.done;c=s.next()){var d=c.value,b=W(d,n);b in t.entities?i.push({id:b,changes:d}):o.push(d)}}catch(p){r={error:p}}finally{try{c&&!c.done&&(a=s.return)&&a.call(s)}finally{if(r)throw r.error}}var m=u(i,t),f=e(o,t);switch(!0){case f===B.None&&m===B.None:return B.None;case f===B.Both||m===B.Both:return B.Both;default:return B.EntitiesOnly}}return{removeAll:function(n){return Object.assign({},n,{ids:[],entities:{}})},addOne:D(l),addMany:D(e),addAll:D(function(n,l){return l.ids=[],l.entities={},e(n,l),B.Both}),updateOne:D(function(n,l){return u([n],l)}),updateMany:D(u),upsertOne:D(function(n,l){return r([n],l)}),upsertMany:D(r),removeOne:D(function(n,l){return t([n],l)}),removeMany:D(t),map:D(function(n,l){return u(l.ids.reduce(function(e,t){var u=n(l.entities[t]);return u!==l.entities[t]&&e.push({id:t,changes:u}),e},[]).filter(function(n){return n.id in l.entities}),l)})}}var Y=function(n){var l="function"==typeof Symbol&&n[Symbol.iterator],e=0;return l?l.call(n):{next:function(){return n&&e>=n.length&&(n=void 0),{value:n&&n[e++],done:!n}}}},X=function(){return(X=Object.assign||function(n){for(var l,e=1,t=arguments.length;e<t;e++)for(var u in l=arguments[e])Object.prototype.hasOwnProperty.call(l,u)&&(n[u]=l[u]);return n}).apply(this,arguments)},V=function(n){void 0===n&&(n={});var l=X({sortComparer:!1,selectId:function(n){return n.id}},n),e=l.selectId,t=l.sortComparer,u={getInitialState:function(n){return void 0===n&&(n={}),Object.assign({ids:[],entities:{}},n)}},r={getSelectors:function(n){var l=function(n){return n.ids},e=function(n){return n.entities},t=Object(x.F)(l,e,function(n,l){return n.map(function(n){return l[n]})}),u=Object(x.F)(l,function(n){return n.length});return n?{selectIds:Object(x.F)(n,l),selectEntities:Object(x.F)(n,e),selectAll:Object(x.F)(n,t),selectTotal:Object(x.F)(n,u)}:{selectIds:l,selectEntities:e,selectAll:t,selectTotal:u}}},a=t?function(n,l){var e=z(n);function t(l,e){var t=l.filter(function(l){return!(W(l,n)in e.entities)});return 0===t.length?B.None:(a(t,e),B.Both)}function u(l,e){var t=[],u=l.filter(function(l){return function(l,e,t){if(!(e.id in t.entities))return!1;var u=Object.assign({},t.entities[e.id],e.changes),r=W(u,n);return delete t.entities[e.id],l.push(u),r!==e.id}(t,l,e)}).length>0;if(0===t.length)return B.None;var r=e.ids,o=[];return e.ids=e.ids.filter(function(n,l){return n in e.entities||(o.push(l),!1)}),a(t,e),!u&&o.every(function(n){return e.ids[n]===r[n]})?B.EntitiesOnly:B.Both}function r(l,e){var r,a,o=[],i=[];try{for(var s=Y(l),c=s.next();!c.done;c=s.next()){var d=c.value,b=W(d,n);b in e.entities?i.push({id:b,changes:d}):o.push(d)}}catch(p){r={error:p}}finally{try{c&&!c.done&&(a=s.return)&&a.call(s)}finally{if(r)throw r.error}}var m=u(i,e),f=t(o,e);switch(!0){case f===B.None&&m===B.None:return B.None;case f===B.Both||m===B.Both:return B.Both;default:return B.EntitiesOnly}}function a(e,t){e.sort(l);for(var u=[],r=0,a=0;r<e.length&&a<t.ids.length;){var o=e[r],i=W(o,n),s=t.ids[a];l(o,t.entities[s])<=0?(u.push(i),r++):(u.push(s),a++)}t.ids=u.concat(r<e.length?e.slice(r).map(n):t.ids.slice(a)),e.forEach(function(l,e){t.entities[n(l)]=l})}return{removeOne:e.removeOne,removeMany:e.removeMany,removeAll:e.removeAll,addOne:D(function(n,l){return t([n],l)}),updateOne:D(function(n,l){return u([n],l)}),upsertOne:D(function(n,l){return r([n],l)}),addAll:D(function(n,l){return l.entities={},l.ids=[],t(n,l),B.Both}),addMany:D(t),updateMany:D(u),upsertMany:D(r),map:D(function(n,l){return u(l.ids.reduce(function(e,t){var u=n(l.entities[t]);return u!==l.entities[t]&&e.push({id:t,changes:u}),e},[]),l)})}}(e,t):z(e);return X({selectId:e,sortComparer:t},u,r,a)}(),U=V.getInitialState({selectedTeam:null,error:null,message:null});function Z(n,l){void 0===n&&(n=U);var e=l;switch(e.type){case t.TeamActionTypes.LoadTeamsSuccess:return V.addAll(e.payload.teams,n);case t.TeamActionTypes.LoadTeamsFailure:var u=e.payload.error;return J.a({},n,{selectedTeam:null,message:null,error:void 0===u?null:u});case t.TeamActionTypes.AddTeam:return J.a({},n,{selectedTeam:null,message:null,error:null});case t.TeamActionTypes.AddTeamSuccess:var r=e.payload,a=r.message;return J.a({},V.addOne(r.team,n),{selectedTeam:null,error:null,message:a});case t.TeamActionTypes.AddTeamFailure:return J.a({},n,{selectedTeam:null,message:null,error:e.payload.error});case t.TeamActionTypes.LoadTeamRoster:return J.a({},n,{selectedTeam:null,message:null,error:null});case t.TeamActionTypes.LoadTeamRosterSuccess:return J.a({},n,{selectedTeam:e.payload.team,message:null,error:null});case t.TeamActionTypes.LoadTeamRosterFailure:return J.a({},n,{selectedTeam:null,message:null,error:e.payload.error});default:return n}}var H=V.getSelectors().selectAll,K=Object(x.D)("teams"),Q=Object(x.F)(K,H),nn=Object(x.F)(Q,function(n){return n.map(function(n){return J.a({},n,{points:3*n.numWin+1*n.numDraw+1*n.numOTWin,gamePlayed:n.numWin+n.numDraw+n.numLoss})})}),ln=Object(x.F)(K,function(n){return n.teams},function(n){return n.message}),en=Object(x.F)(K,function(n){return n.teams},function(n){return n.error}),tn=function(){function n(n,l,e,t){this.store=n,this.router=l,this.route=e,this.fb=t}return n.prototype.ngOnInit=function(){var n=this;this.form=this.fb.group({name:new A.f("",{validators:A.v.required,updateOn:"blur"}),division:new A.f("",{validators:A.v.required,updateOn:"blur"})}),this.message$=this.store.pipe(Object(x.G)(ln),Object(L.a)(function(l){l&&(n.formDirective.resetForm(),n.form.reset())})),this.error$=this.store.pipe(Object(x.G)(en))},n.prototype.returnToMenu=function(){this.router.navigate(["../"],{relativeTo:this.route})},n.prototype.addTeam=function(){this.store.dispatch(new t.AddTeam(this.form.value))},n}(),un=u.qb({encapsulation:0,styles:[[".heading[_ngcontent-%COMP%]{height:60px;padding:.25rem;display:flex;justify-content:space-between;align-items:center;flex:1 1 calc(100% / 3)}.heading[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.25rem}.heading[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{width:42px}.form-container[_ngcontent-%COMP%]{margin-top:1rem;border:3px solid #000}.error-box[_ngcontent-%COMP%]{border:2px solid red;background-color:#ffd2d2;color:#d8000c;font-size:1rem;margin-top:1rem;padding:.5rem}.success-box[_ngcontent-%COMP%]{border:2px solid #0f0;background-color:#dff2bf;color:#4f8a10;font-size:1rem;margin-top:1rem;padding:.5rem}"]],data:{}});function rn(n){return u.Lb(0,[(n()(),u.sb(0,0,null,null,1,"div",[["class","success-box"]],null,null,null,null,null)),(n()(),u.Jb(1,null,["",""]))],null,function(n,l){n(l,1,0,l.context.ngIf)})}function an(n){return u.Lb(0,[(n()(),u.sb(0,0,null,null,1,"div",[["class","error-box"]],null,null,null,null,null)),(n()(),u.Jb(1,null,["",""]))],null,function(n,l){n(l,1,0,l.context.ngIf)})}function on(n){return u.Lb(2,[u.Hb(402653184,1,{formDirective:0}),(n()(),u.sb(1,0,null,null,90,"div",[["class","team-container"]],null,null,null,null,null)),(n()(),u.sb(2,0,null,null,6,"div",[["class","heading"]],null,null,null,null,null)),(n()(),u.sb(3,0,null,null,1,"a",[["aria-label","Return to team menu"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.returnToMenu()&&t),t},null,null)),(n()(),u.sb(4,0,null,null,0,"i",[["class","fas fa-chevron-circle-left fa-3x"]],null,null,null,null,null)),(n()(),u.sb(5,0,null,null,2,"div",[["class","title"]],null,null,null,null,null)),(n()(),u.sb(6,0,null,null,1,"span",[["class","center"]],null,null,null,null,null)),(n()(),u.Jb(-1,null,["Add New Team"])),(n()(),u.sb(8,0,null,null,0,"span",[["class","spacer"]],null,null,null,null,null)),(n()(),u.sb(9,0,null,null,76,"div",[["class","form-container"]],null,null,null,null,null)),(n()(),u.sb(10,0,null,null,75,"form",[["clrForm",""],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"clr-form",null],[2,"clr-form-horizontal",null],[2,"clr-form-compact",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(n,l,e){var t=!0,r=n.component;return"submit"===l&&(t=!1!==u.Cb(n,12).onSubmit(e)&&t),"reset"===l&&(t=!1!==u.Cb(n,12).onReset()&&t),"ngSubmit"===l&&(t=!1!==r.addTeam()&&t),t},null,null)),u.rb(11,16384,null,0,A.x,[],null,null),u.rb(12,540672,[[1,4],["f",4]],0,A.h,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),u.Gb(2048,null,A.c,null,[A.h]),u.rb(14,16384,null,0,A.n,[[4,A.c]],null,null),u.Gb(512,null,w.Xd,w.Xd,[]),u.Gb(512,null,w.ae,w.ae,[]),u.rb(17,16384,null,0,w.V,[w.Xd,w.ae],null,null),u.Gb(256,null,w.be,!0,[]),(n()(),u.sb(19,0,null,null,22,"clr-input-container",[],[[2,"clr-form-control",null],[2,"clr-form-control-disabled",null],[2,"clr-row",null]],null,null,j.s,j.l)),u.Gb(512,null,w.Yd,w.Yd,[]),u.Gb(131584,null,w.Zd,w.Zd,[w.Yd]),u.Gb(512,null,w.wc,w.wc,[]),u.rb(23,180224,null,1,w.db,[w.Zd,[2,w.Xd],w.wc,w.Yd],null,null),u.Hb(335544320,2,{label:0}),u.Gb(512,null,w.Wd,w.Wd,[]),(n()(),u.sb(26,0,null,0,2,"label",[["for","name"]],[[1,"for",0]],null,null,null,null)),u.rb(27,212992,[[2,4]],0,w.fb,[[2,w.Wd],[2,w.Xd],[2,w.Yd],u.G,u.k],{forAttr:[0,"forAttr"]},null),(n()(),u.Jb(-1,null,["Name:"])),(n()(),u.sb(29,16777216,null,1,6,"input",[["clrInput",""],["formControlName","name"],["id","name"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"clr-input",null],[8,"id",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var t=!0;return"input"===l&&(t=!1!==u.Cb(n,30)._handleInput(e.target.value)&&t),"blur"===l&&(t=!1!==u.Cb(n,30).onTouched()&&t),"compositionstart"===l&&(t=!1!==u.Cb(n,30)._compositionStart()&&t),"compositionend"===l&&(t=!1!==u.Cb(n,30)._compositionEnd(e.target.value)&&t),"blur"===l&&(t=!1!==u.Cb(n,35).triggerValidation()&&t),t},null,null)),u.rb(30,16384,null,0,A.d,[u.G,u.k,[2,A.a]],null,null),u.Gb(1024,null,A.k,function(n){return[n]},[A.d]),u.rb(32,671744,null,0,A.g,[[3,A.c],[8,null],[8,null],[6,A.k],[2,A.z]],{name:[0,"name"]},null),u.Gb(2048,null,A.l,null,[A.g]),u.rb(34,16384,null,0,A.m,[[4,A.l]],null,null),u.rb(35,212992,null,0,w.cb,[u.R,u.r,[6,A.l],u.G,u.k],{id:[0,"id"]},null),(n()(),u.sb(36,0,null,2,2,"clr-control-helper",[],[[2,"clr-subtext",null]],null,null,j.q,j.j)),u.rb(37,49152,null,0,w.u,[],null,null),(n()(),u.Jb(-1,0,["Name of the new team"])),(n()(),u.sb(39,0,null,3,2,"clr-control-error",[],[[2,"clr-subtext",null]],null,null,j.p,j.i)),u.rb(40,49152,null,0,w.t,[],null,null),(n()(),u.Jb(-1,0,["Name is required!"])),(n()(),u.sb(42,0,null,null,41,"clr-select-container",[],[[2,"clr-form-control",null],[2,"clr-form-control-disabled",null],[2,"clr-row",null]],null,null,j.t,j.m)),u.Gb(512,null,w.Yd,w.Yd,[]),u.Gb(131584,null,w.Zd,w.Zd,[w.Yd]),u.Gb(512,null,w.wc,w.wc,[]),u.rb(46,180224,null,2,w.zb,[w.Zd,[2,w.Xd],w.wc,w.Yd],null,null),u.Hb(335544320,3,{label:0}),u.Hb(335544320,4,{multiple:0}),u.Gb(512,null,w.Wd,w.Wd,[]),(n()(),u.sb(50,0,null,0,2,"label",[],[[1,"for",0]],null,null,null,null)),u.rb(51,212992,[[3,4]],0,w.fb,[[2,w.Wd],[2,w.Xd],[2,w.Yd],u.G,u.k],null,null),(n()(),u.Jb(-1,null,["Division"])),(n()(),u.sb(53,16777216,null,1,24,"select",[["clrSelect",""],["formControlName","division"],["name","division"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"clr-select",null],[8,"id",0]],[[null,"change"],[null,"blur"]],function(n,l,e){var t=!0;return"change"===l&&(t=!1!==u.Cb(n,54).onChange(e.target.value)&&t),"blur"===l&&(t=!1!==u.Cb(n,54).onTouched()&&t),"blur"===l&&(t=!1!==u.Cb(n,61).triggerValidation()&&t),t},null,null)),u.rb(54,16384,null,0,A.t,[u.G,u.k],null,null),u.rb(55,16384,null,0,A.s,[],{required:[0,"required"]},null),u.Gb(1024,null,A.j,function(n){return[n]},[A.s]),u.Gb(1024,null,A.k,function(n){return[n]},[A.t]),u.rb(58,671744,null,0,A.g,[[3,A.c],[6,A.j],[8,null],[6,A.k],[2,A.z]],{name:[0,"name"]},null),u.Gb(2048,null,A.l,null,[A.g]),u.rb(60,16384,null,0,A.m,[[4,A.l]],null,null),u.rb(61,212992,null,0,w.yb,[u.R,u.r,[6,A.l],u.G,u.k],null,null),(n()(),u.sb(62,0,null,null,3,"option",[["value","East"]],null,null,null,null,null)),u.rb(63,147456,null,0,A.p,[u.k,u.G,[2,A.t]],{value:[0,"value"]},null),u.rb(64,147456,null,0,A.A,[u.k,u.G,[8,null]],{value:[0,"value"]},null),(n()(),u.Jb(-1,null,["East"])),(n()(),u.sb(66,0,null,null,3,"option",[["value","South"]],null,null,null,null,null)),u.rb(67,147456,null,0,A.p,[u.k,u.G,[2,A.t]],{value:[0,"value"]},null),u.rb(68,147456,null,0,A.A,[u.k,u.G,[8,null]],{value:[0,"value"]},null),(n()(),u.Jb(-1,null,["South"])),(n()(),u.sb(70,0,null,null,3,"option",[["value","West"]],null,null,null,null,null)),u.rb(71,147456,null,0,A.p,[u.k,u.G,[2,A.t]],{value:[0,"value"]},null),u.rb(72,147456,null,0,A.A,[u.k,u.G,[8,null]],{value:[0,"value"]},null),(n()(),u.Jb(-1,null,["West"])),(n()(),u.sb(74,0,null,null,3,"option",[["value","North"]],null,null,null,null,null)),u.rb(75,147456,null,0,A.p,[u.k,u.G,[2,A.t]],{value:[0,"value"]},null),u.rb(76,147456,null,0,A.A,[u.k,u.G,[8,null]],{value:[0,"value"]},null),(n()(),u.Jb(-1,null,["North"])),(n()(),u.sb(78,0,null,2,2,"clr-control-helper",[],[[2,"clr-subtext",null]],null,null,j.q,j.j)),u.rb(79,49152,null,0,w.u,[],null,null),(n()(),u.Jb(-1,0,["Division of the new team"])),(n()(),u.sb(81,0,null,3,2,"clr-control-error",[],[[2,"clr-subtext",null]],null,null,j.p,j.i)),u.rb(82,49152,null,0,w.t,[],null,null),(n()(),u.Jb(-1,0,["Division is required!"])),(n()(),u.sb(84,0,null,null,1,"button",[["class","btn btn-primary"],["type","submit"]],[[8,"disabled",0]],null,null,null,null)),(n()(),u.Jb(-1,null,["Add"])),(n()(),u.jb(16777216,null,null,2,null,rn)),u.rb(87,16384,null,0,i.m,[u.R,u.O],{ngIf:[0,"ngIf"]},null),u.Eb(131072,i.b,[u.h]),(n()(),u.jb(16777216,null,null,2,null,an)),u.rb(90,16384,null,0,i.m,[u.R,u.O],{ngIf:[0,"ngIf"]},null),u.Eb(131072,i.b,[u.h])],function(n,l){var e=l.component;n(l,12,0,e.form),n(l,27,0,"name"),n(l,32,0,"name"),n(l,35,0,"name"),n(l,51,0),n(l,55,0,""),n(l,58,0,"division"),n(l,61,0),n(l,63,0,"East"),n(l,64,0,"East"),n(l,67,0,"South"),n(l,68,0,"South"),n(l,71,0,"West"),n(l,72,0,"West"),n(l,75,0,"North"),n(l,76,0,"North"),n(l,87,0,u.Kb(l,87,0,u.Cb(l,88).transform(e.message$))),n(l,90,0,u.Kb(l,90,0,u.Cb(l,91).transform(e.error$)))},function(n,l){var e=l.component;n(l,10,0,u.Cb(l,14).ngClassUntouched,u.Cb(l,14).ngClassTouched,u.Cb(l,14).ngClassPristine,u.Cb(l,14).ngClassDirty,u.Cb(l,14).ngClassValid,u.Cb(l,14).ngClassInvalid,u.Cb(l,14).ngClassPending,!0,u.Cb(l,17).layoutService.isHorizontal(),u.Cb(l,17).layoutService.isCompact()),n(l,19,0,!0,null==u.Cb(l,23).control?null:u.Cb(l,23).control.disabled,u.Cb(l,23).addGrid()),n(l,26,0,u.Cb(l,27).forAttr),n(l,29,0,u.Cb(l,34).ngClassUntouched,u.Cb(l,34).ngClassTouched,u.Cb(l,34).ngClassPristine,u.Cb(l,34).ngClassDirty,u.Cb(l,34).ngClassValid,u.Cb(l,34).ngClassInvalid,u.Cb(l,34).ngClassPending,!0,u.Cb(l,35).id),n(l,36,0,!0),n(l,39,0,!0),n(l,42,0,!0,null==u.Cb(l,46).control?null:u.Cb(l,46).control.disabled,u.Cb(l,46).addGrid()),n(l,50,0,u.Cb(l,51).forAttr),n(l,53,0,u.Cb(l,55).required?"":null,u.Cb(l,60).ngClassUntouched,u.Cb(l,60).ngClassTouched,u.Cb(l,60).ngClassPristine,u.Cb(l,60).ngClassDirty,u.Cb(l,60).ngClassValid,u.Cb(l,60).ngClassInvalid,u.Cb(l,60).ngClassPending,!0,u.Cb(l,61).id),n(l,78,0,!0),n(l,81,0,!0),n(l,84,0,e.form.invalid)})}function sn(n){return u.Lb(0,[(n()(),u.sb(0,0,null,null,1,"ng-component",[],null,null,null,on,un)),u.rb(1,114688,null,0,tn,[x.o,g.o,g.a,A.e],null,null)],function(n,l){n(l,1,0)},null)}var cn=u.ob("ng-component",tn,sn,{},{},[]),dn=e("uyLP"),bn=function(){function n(){this.gotoTeam=new u.m}return n.prototype.getLogoUrl=function(){return dn[this.index%dn.length]},n.prototype.showTeamRoster=function(n){this.gotoTeam.emit(n)},n}(),mn=u.qb({encapsulation:0,styles:[[".record[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(80px,1fr))}.summary[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(150px,2fr) minmax(100px,1fr);border-top:1px solid #4a4a4a;font-size:.75rem}.card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .card-header[_ngcontent-%COMP%]   p.p2[_ngcontent-%COMP%]{margin-top:0}.card-img[_ngcontent-%COMP%]{display:flex;justify-content:center}.card-img[_ngcontent-%COMP%]   .img-parent[_ngcontent-%COMP%]{width:128px;padding:.25rem}.card-img[_ngcontent-%COMP%]   .img-parent[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:100%;height:auto;max-width:100%}.card-img[_ngcontent-%COMP%]   .img-parent[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover{cursor:pointer}.card-footer[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.card-footer[_ngcontent-%COMP%]   clr-dropdown[_ngcontent-%COMP%]{margin-right:.5rem}.card-footer[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{margin-right:0}.card-footer[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-right:.5rem}"]],data:{}});function fn(n){return u.Lb(2,[(n()(),u.sb(0,0,null,null,33,"div",[["class","card"]],null,null,null,null,null)),(n()(),u.sb(1,0,null,null,4,"div",[["class","card-header"]],null,null,null,null,null)),(n()(),u.sb(2,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),u.Jb(3,null,["",""])),(n()(),u.sb(4,0,null,null,1,"p",[["class","p2"]],null,null,null,null,null)),(n()(),u.Jb(5,null,["("," Division)"])),(n()(),u.sb(6,0,null,null,2,"div",[["class","card-img"]],null,null,null,null,null)),(n()(),u.sb(7,0,null,null,1,"div",[["class","img-parent"]],null,null,null,null,null)),(n()(),u.sb(8,0,null,null,0,"img",[["alt","team logo"]],[[1,"src",4]],[[null,"click"]],function(n,l,e){var t=!0,u=n.component;return"click"===l&&(t=!1!==u.showTeamRoster(u.team.id)&&t),t},null,null)),(n()(),u.sb(9,0,null,null,19,"div",[["class","card-block"]],null,null,null,null,null)),(n()(),u.sb(10,0,null,null,1,"div",[["class","card-title"]],null,null,null,null,null)),(n()(),u.Jb(-1,null,["Record:"])),(n()(),u.sb(12,0,null,null,16,"div",[["class","card-text"]],null,null,null,null,null)),(n()(),u.sb(13,0,null,null,10,"div",[["class","record"]],null,null,null,null,null)),(n()(),u.sb(14,0,null,null,1,"div",[],null,null,null,null,null)),(n()(),u.Jb(15,null,["Win: ",""])),(n()(),u.sb(16,0,null,null,1,"div",[],null,null,null,null,null)),(n()(),u.Jb(17,null,["Draw: ",""])),(n()(),u.sb(18,0,null,null,1,"div",[],null,null,null,null,null)),(n()(),u.Jb(19,null,["Loss: ",""])),(n()(),u.sb(20,0,null,null,1,"div",[],null,null,null,null,null)),(n()(),u.Jb(21,null,["OT Win: ",""])),(n()(),u.sb(22,0,null,null,1,"div",[],null,null,null,null,null)),(n()(),u.Jb(23,null,["OT Loss: ",""])),(n()(),u.sb(24,0,null,null,4,"div",[["class","summary"]],null,null,null,null,null)),(n()(),u.sb(25,0,null,null,1,"div",[["class","item"]],null,null,null,null,null)),(n()(),u.Jb(26,null,["Game Played: ",""])),(n()(),u.sb(27,0,null,null,1,"div",[["class","item"]],null,null,null,null,null)),(n()(),u.Jb(28,null,["Points: ",""])),(n()(),u.sb(29,0,null,null,4,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),u.sb(30,0,null,null,3,"button",[["class","btn btn-primary"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0,u=n.component;return"click"===l&&(t=!1!==u.showTeamRoster(u.team.id)&&t),t},null,null)),(n()(),u.sb(31,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),u.Jb(-1,null,["Roster"])),(n()(),u.sb(33,0,null,null,0,"i",[["class","fas fa-users"]],null,null,null,null,null))],null,function(n,l){var e=l.component;n(l,3,0,e.team.name),n(l,5,0,e.team.division),n(l,8,0,e.getLogoUrl()),n(l,15,0,e.team.numWin),n(l,17,0,e.team.numDraw),n(l,19,0,e.team.numLoss),n(l,21,0,e.team.numOTWin),n(l,23,0,e.team.numOTLoss),n(l,26,0,e.team.gamePlayed),n(l,28,0,e.team.points)})}var pn=function(){function n(n,l,e){this.store=n,this.router=l,this.route=e}return n.prototype.ngOnInit=function(){this.teams$=this.store.pipe(Object(x.G)(nn)),this.store.dispatch(new t.LoadTeams)},n.prototype.returnToMenu=function(){this.router.navigate(["../"],{relativeTo:this.route})},n.prototype.trackByFunction=function(n,l){return l.id},n.prototype.showTeamRoster=function(n){this.store.dispatch(new t.LoadTeamRoster({teamId:n}))},n}(),gn=u.qb({encapsulation:0,styles:[[".list-container[_ngcontent-%COMP%]{display:grid;grid-template-rows:1fr auto}.team-container[_ngcontent-%COMP%]{display:grid;min-height:100%;grid-template-rows:-webkit-max-content 1fr;grid-template-rows:max-content 1fr}.heading[_ngcontent-%COMP%]{height:60px;padding:.25rem;display:flex;justify-content:space-between;align-items:center;flex:1 1 calc(100% / 3)}.heading[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.25rem}.heading[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{width:42px}"]],data:{}});function vn(n){return u.Lb(0,[(n()(),u.sb(0,0,null,null,2,"div",[["class","clr-col-lg-4 clr-col-md-6 clr-col-sm-6 clr-col-12"]],null,null,null,null,null)),(n()(),u.sb(1,0,null,null,1,"team-summary",[],null,[[null,"gotoTeam"]],function(n,l,e){var t=!0;return"gotoTeam"===l&&(t=!1!==n.component.showTeamRoster(e)&&t),t},fn,mn)),u.rb(2,49152,null,0,bn,[],{team:[0,"team"],index:[1,"index"]},{gotoTeam:"gotoTeam"})],function(n,l){n(l,2,0,l.context.$implicit,l.context.index)},null)}function hn(n){return u.Lb(2,[(n()(),u.sb(0,0,null,null,15,"div",[["class","team-container"]],null,null,null,null,null)),(n()(),u.sb(1,0,null,null,6,"div",[["class","heading"]],null,null,null,null,null)),(n()(),u.sb(2,0,null,null,1,"a",[["aria-label","Return to team menu"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.returnToMenu()&&t),t},null,null)),(n()(),u.sb(3,0,null,null,0,"i",[["class","fas fa-chevron-circle-left fa-3x"]],null,null,null,null,null)),(n()(),u.sb(4,0,null,null,2,"div",[["class","title"]],null,null,null,null,null)),(n()(),u.sb(5,0,null,null,1,"span",[["class","center"]],null,null,null,null,null)),(n()(),u.Jb(-1,null,["Teams"])),(n()(),u.sb(7,0,null,null,0,"span",[["class","spacer"]],null,null,null,null,null)),(n()(),u.sb(8,0,null,null,7,"div",[["class","list-container"]],null,null,null,null,null)),(n()(),u.sb(9,0,null,null,4,"div",[["class","clr-row"]],null,null,null,null,null)),(n()(),u.jb(16777216,null,null,3,null,vn)),u.rb(11,278528,null,0,i.l,[u.R,u.O,u.t],{ngForOf:[0,"ngForOf"],ngForTrackBy:[1,"ngForTrackBy"]},null),u.Eb(131072,i.b,[u.h]),u.rb(13,16384,null,0,w.md,[[2,w.Qc]],{trackBy:[0,"trackBy"]},null),(n()(),u.sb(14,0,null,null,1,"div",[["class","pagination"]],null,null,null,null,null)),(n()(),u.Jb(-1,null,[" dummy pagination "]))],function(n,l){var e=l.component;n(l,11,0,u.Kb(l,11,0,u.Cb(l,12).transform(e.teams$)),e.trackByFunction),n(l,13,0,e.trackByFunction)},null)}function yn(n){return u.Lb(0,[(n()(),u.sb(0,0,null,null,1,"ng-component",[],null,null,null,hn,gn)),u.rb(1,114688,null,0,pn,[x.o,g.o,g.a],null,null)],function(n,l){n(l,1,0)},null)}var Tn=u.ob("ng-component",pn,yn,{},{},[]),On=function(){function n(n,l){this.store=n,this.route=l}return n.prototype.ngOnInit=function(){this.teamId=this.route.snapshot.paramMap.get("teamId")||""},n}(),Cn=u.qb({encapsulation:0,styles:[[""]],data:{}});function An(n){return u.Lb(2,[(n()(),u.sb(0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),u.Jb(1,null,["team-roster works! team id: ",""]))],null,function(n,l){n(l,1,0,l.component.teamId)})}function wn(n){return u.Lb(0,[(n()(),u.sb(0,0,null,null,1,"ng-component",[],null,null,null,An,Cn)),u.rb(1,114688,null,0,On,[x.o,g.a],null,null)],function(n,l){n(l,1,0)},null)}var jn=u.ob("ng-component",On,wn,{},{},[]),xn=function(){return function(){}}(),Ln=e("jYNz"),kn=e("F/XL"),Mn=e("psW0"),Sn=e("67Y/"),Pn=e("9Z1F"),Rn=e("Phjn"),In=e("15JJ"),_n=function(){function n(n,l,e){var u=this;this.actions$=n,this.teamService=l,this.router=e,this.loadTeams$=this.actions$.pipe(Object(Ln.d)(t.TeamActionTypes.LoadTeams),Object(Mn.a)(function(){return u.teamService.getAll().pipe(Object(Sn.a)(function(n){return new t.LoadTeamsSuccess({teams:n})}),Object(Pn.a)(function(n){return console.log(n),Object(kn.a)(new t.LoadTeamsFailure({error:n}))}))})),this.addTeam$=this.actions$.pipe(Object(Ln.d)(t.TeamActionTypes.AddTeam),Object(Sn.a)(function(n){return n.payload}),Object(Rn.a)(function(n){return u.teamService.addTeam(n.division,n.name).pipe(Object(Sn.a)(function(n){return new t.AddTeamSuccess({team:n,message:"Team is created successfully."})}),Object(Pn.a)(function(n){return Object(kn.a)(new t.AddTeamFailure({error:n}))}))})),this.loadTeamRoster$=this.actions$.pipe(Object(Ln.d)(t.TeamActionTypes.LoadTeamRoster),Object(Sn.a)(function(n){return n.payload}),Object(In.a)(function(n){return u.teamService.getTeam(n.teamId).pipe(Object(Sn.a)(function(n){return new t.LoadTeamsRosterSuccess({team:n})}),Object(Pn.a)(function(n){return Object(kn.a)(new t.LoadTeamsRosterFailure({error:n}))}))})),this.loadTeamRosterSuccess$=this.actions$.pipe(Object(Ln.d)(t.TeamActionTypes.LoadTeamRosterSuccess),Object(Sn.a)(function(n){return n.payload}),Object(L.a)(function(n){return u.router.navigate(["/team/roster",n.team.id])}))}return J.b([Object(Ln.b)(),J.d("design:type",Object)],n.prototype,"loadTeams$",void 0),J.b([Object(Ln.b)(),J.d("design:type",Object)],n.prototype,"addTeam$",void 0),J.b([Object(Ln.b)(),J.d("design:type",Object)],n.prototype,"loadTeamRoster$",void 0),J.b([Object(Ln.b)({dispatch:!1}),J.d("design:type",Object)],n.prototype,"loadTeamRosterSuccess$",void 0),n}(),Fn=e("XlPw"),Gn=e("EcEN"),Jn=function(){function n(){}return n.prototype.getAll=function(){var n=localStorage.getItem("teams"),l=n?JSON.parse(n):[];return Object(kn.a)(l)},n.prototype.addTeam=function(n,l){if("bad ass"===l.toLowerCase())return Object(Fn.a)("Bad Ass is not an appropriate team name");var e=localStorage.getItem("teams"),t=e?JSON.parse(e):[];if(t.some(function(n){return n.name.toLowerCase()===l.toLowerCase()}))return Object(Fn.a)(l+" is already used in the league");var u={id:Object(Gn.v4)(),name:l,division:n,numWin:0,numDraw:0,numLoss:0,numOTWin:0,numOTLoss:0},r=t.concat([u]);return localStorage.setItem("teams",JSON.stringify(r)),Object(kn.a)(u)},n.prototype.getTeam=function(n){var l=localStorage.getItem("teams"),e=(l?JSON.parse(l):[]).find(function(l){return l.id===n});return e?Object(kn.a)(e):(console.error("team with "+n+" does not exist."),Object(Fn.a)("Team does not exist"))},n.ngInjectableDef=u.V({factory:function(){return new n},token:n,providedIn:"root"}),n}(),Nn=e("PCNd");e.d(l,"TeamModuleNgFactory",function(){return En});var En=u.pb(r,[],function(n){return u.zb([u.Ab(512,u.j,u.eb,[[8,[a.a,C,cn,Tn,jn,j.A,j.a,j.b,j.d,j.e,j.f,j.g,j.h,j.c,j.w,j.x,j.y,j.z]],[3,u.j],u.z]),u.Ab(4608,i.o,i.n,[u.v,[2,i.D]]),u.Ab(4608,A.e,A.e,[]),u.Ab(4608,A.y,A.y,[]),u.Ab(1073742336,i.c,i.c,[]),u.Ab(1073742336,g.r,g.r,[[2,g.y],[2,g.o]]),u.Ab(1073742336,xn,xn,[]),u.Ab(1024,x.H,function(){return[{}]},[]),u.Ab(1024,x.k,function(){return[{key:"teams",reducerFactory:x.B,metaReducers:[],initialState:void 0}]},[]),u.Ab(1024,x.I,x.J,[u.r,x.H,x.k]),u.Ab(1024,x.s,function(){return[Z]},[]),u.Ab(1024,x.t,function(n){return[n]},[x.s]),u.Ab(1024,x.b,function(n,l,e){return[x.y(n,l,e)]},[u.r,x.s,x.t]),u.Ab(1073873408,x.p,x.p,[x.I,x.b,x.h,x.q]),u.Ab(512,_n,_n,[Ln.a,Jn,g.o]),u.Ab(1024,Ln.i,function(n){return[Ln.e(n)]},[_n]),u.Ab(1073742336,Ln.g,Ln.g,[Ln.f,Ln.i,[2,x.q],[2,x.p]]),u.Ab(1073742336,o.b,o.b,[]),u.Ab(1073742336,A.w,A.w,[]),u.Ab(1073742336,A.r,A.r,[]),u.Ab(1073742336,w.ab,w.ab,[]),u.Ab(1073742336,w.vc,w.vc,[]),u.Ab(1073742336,w.Qd,w.Qd,[]),u.Ab(1073742336,w.T,w.T,[]),u.Ab(1073742336,w.d,w.d,[]),u.Ab(1073742336,w.U,w.U,[]),u.Ab(1073742336,w.r,w.r,[]),u.Ab(1073742336,w.ce,w.ce,[]),u.Ab(1073742336,w.p,w.p,[]),u.Ab(1073742336,w.xc,w.xc,[]),u.Ab(1073742336,w.K,w.K,[]),u.Ab(1073742336,A.i,A.i,[]),u.Ab(1073742336,w.eb,w.eb,[]),u.Ab(1073742336,w.sb,w.sb,[]),u.Ab(1073742336,w.wb,w.wb,[]),u.Ab(1073742336,w.Ab,w.Ab,[]),u.Ab(1073742336,w.Rb,w.Rb,[]),u.Ab(1073742336,w.X,w.X,[]),u.Ab(1073742336,w.jb,w.jb,[]),u.Ab(1073742336,w.Hc,w.Hc,[]),u.Ab(1073742336,w.O,w.O,[]),u.Ab(1073742336,w.sd,w.sd,[]),u.Ab(1073742336,w.E,w.E,[]),u.Ab(1073742336,w.Kb,w.Kb,[]),u.Ab(1073742336,w.Xb,w.Xb,[]),u.Ab(1073742336,w.v,w.v,[]),u.Ab(1073742336,w.nb,w.nb,[]),u.Ab(1073742336,w.ib,w.ib,[]),u.Ab(1073742336,w.i,w.i,[]),u.Ab(1073742336,w.j,w.j,[]),u.Ab(1073742336,w.lb,w.lb,[]),u.Ab(1073742336,w.qb,w.qb,[]),u.Ab(1073742336,w.zd,w.zd,[]),u.Ab(1073742336,w.Pb,w.Pb,[]),u.Ab(1073742336,w.dc,w.dc,[]),u.Ab(1073742336,w.gb,w.gb,[]),u.Ab(1073742336,w.Db,w.Db,[]),u.Ab(1073742336,w.Ub,w.Ub,[]),u.Ab(1073742336,w.tb,w.tb,[]),u.Ab(1073742336,w.hc,w.hc,[]),u.Ab(1073742336,w.a,w.a,[]),u.Ab(1073742336,Nn.a,Nn.a,[]),u.Ab(1073742336,r,r,[]),u.Ab(1024,g.m,function(){return[[{path:"",pathMatch:"full",component:p},{path:"new",component:tn},{path:"list",component:pn},{path:"roster/:teamId",component:On}]]},[])])})},uyLP:function(n){n.exports=["https://angular.io/generated/images/marketing/concept-icons/animations.png","https://angular.io/generated/images/marketing/concept-icons/dependency-injection.png","https://angular.io/generated/images/marketing/concept-icons/universal.png","https://angular.io/generated/images/marketing/concept-icons/augury.png","https://angular.io/generated/images/marketing/concept-icons/cdk.png","https://angular.io/generated/images/marketing/concept-icons/compiler.png","https://angular.io/generated/images/marketing/concept-icons/components.png","https://angular.io/generated/images/marketing/concept-icons/forms.png","https://angular.io/generated/images/marketing/concept-icons/karma.png","https://angular.io/generated/images/marketing/concept-icons/i18n.png"]},xDdU:function(n,l,e){var t,u,r=e("4fRq"),a=e("I2ZF"),o=0,i=0;n.exports=function(n,l,e){var s=l&&e||0,c=l||[],d=(n=n||{}).node||t,b=void 0!==n.clockseq?n.clockseq:u;if(null==d||null==b){var m=r();null==d&&(d=t=[1|m[0],m[1],m[2],m[3],m[4],m[5]]),null==b&&(b=u=16383&(m[6]<<8|m[7]))}var f=void 0!==n.msecs?n.msecs:(new Date).getTime(),p=void 0!==n.nsecs?n.nsecs:i+1,g=f-o+(p-i)/1e4;if(g<0&&void 0===n.clockseq&&(b=b+1&16383),(g<0||f>o)&&void 0===n.nsecs&&(p=0),p>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");o=f,i=p,u=b;var v=(1e4*(268435455&(f+=122192928e5))+p)%4294967296;c[s++]=v>>>24&255,c[s++]=v>>>16&255,c[s++]=v>>>8&255,c[s++]=255&v;var h=f/4294967296*1e4&268435455;c[s++]=h>>>8&255,c[s++]=255&h,c[s++]=h>>>24&15|16,c[s++]=h>>>16&255,c[s++]=b>>>8|128,c[s++]=255&b;for(var y=0;y<6;++y)c[s+y]=d[y];return l||a(c)}},xk4V:function(n,l,e){var t=e("4fRq"),u=e("I2ZF");n.exports=function(n,l,e){var r=l&&e||0;"string"==typeof n&&(l="binary"===n?new Array(16):null,n=null);var a=(n=n||{}).random||(n.rng||t)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,l)for(var o=0;o<16;++o)l[r+o]=a[o];return l||u(a)}}}]);