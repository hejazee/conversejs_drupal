Strophe.addConnectionPlugin('roster',{_connection:null,_callbacks:[],items:[],ver:null,init:function(conn)
{this._connection=conn;this.items=[];var oldCallback,roster=this,_connect=conn.connect,_attach=conn.attach;var newCallback=function(status)
{if(status==Strophe.Status.ATTACHED||status==Strophe.Status.CONNECTED)
{try
{conn.addHandler(roster._onReceivePresence.bind(roster),null,'presence',null,null,null);conn.addHandler(roster._onReceiveIQ.bind(roster),Strophe.NS.ROSTER,'iq',"set",null,null);}
catch(e)
{Strophe.error(e);}}
if(oldCallback!==null)
oldCallback.apply(this,arguments);};conn.connect=function(jid,pass,callback,wait,hold)
{oldCallback=callback;if(typeof arguments[0]=="undefined")
arguments[0]=null;if(typeof arguments[1]=="undefined")
arguments[1]=null;arguments[2]=newCallback;_connect.apply(conn,arguments);};conn.attach=function(jid,sid,rid,callback,wait,hold,wind)
{oldCallback=callback;if(typeof arguments[0]=="undefined")
arguments[0]=null;if(typeof arguments[1]=="undefined")
arguments[1]=null;if(typeof arguments[2]=="undefined")
arguments[2]=null;arguments[3]=newCallback;_attach.apply(conn,arguments);};Strophe.addNamespace('ROSTER_VER','urn:xmpp:features:rosterver');Strophe.addNamespace('NICK','http://jabber.org/protocol/nick');},supportVersioning:function()
{return(this._connection.features&&this._connection.features.getElementsByTagName('ver').length>0);},get:function(userCallback,ver,items)
{var attrs={xmlns:Strophe.NS.ROSTER};this.items=[];if(this.supportVersioning())
{attrs.ver=ver||'';this.items=items||[];}
var iq=$iq({type:'get','id':this._connection.getUniqueId('roster')}).c('query',attrs);return this._connection.sendIQ(iq,this._onReceiveRosterSuccess.bind(this,userCallback),this._onReceiveRosterError.bind(this,userCallback));},registerCallback:function(call_back)
{this._callbacks.push(call_back);},findItem:function(jid)
{for(var i=0;i<this.items.length;i++)
{if(this.items[i]&&this.items[i].jid==jid)
{return this.items[i];}}
return false;},removeItem:function(jid)
{for(var i=0;i<this.items.length;i++)
{if(this.items[i]&&this.items[i].jid==jid)
{this.items.splice(i,1);return true;}}
return false;},subscribe:function(jid,message,nick){var pres=$pres({to:jid,type:"subscribe"});if(message&&message!==""){pres.c("status").t(message);}
if(nick&&nick!==""){pres.c('nick',{'xmlns':Strophe.NS.NICK}).t(nick);}
this._connection.send(pres);},unsubscribe:function(jid,message)
{var pres=$pres({to:jid,type:"unsubscribe"});if(message&&message!="")
pres.c("status").t(message);this._connection.send(pres);},authorize:function(jid,message)
{var pres=$pres({to:jid,type:"subscribed"});if(message&&message!="")
pres.c("status").t(message);this._connection.send(pres);},unauthorize:function(jid,message)
{var pres=$pres({to:jid,type:"unsubscribed"});if(message&&message!="")
pres.c("status").t(message);this._connection.send(pres);},add:function(jid,name,groups,call_back)
{var iq=$iq({type:'set'}).c('query',{xmlns:Strophe.NS.ROSTER}).c('item',{jid:jid,name:name});for(var i=0;i<groups.length;i++)
{iq.c('group').t(groups[i]).up();}
this._connection.sendIQ(iq,call_back,call_back);},update:function(jid,name,groups,call_back)
{var item=this.findItem(jid);if(!item)
{throw"item not found";}
var newName=name||item.name;var newGroups=groups||item.groups;var iq=$iq({type:'set'}).c('query',{xmlns:Strophe.NS.ROSTER}).c('item',{jid:item.jid,name:newName});for(var i=0;i<newGroups.length;i++)
{iq.c('group').t(newGroups[i]).up();}
return this._connection.sendIQ(iq,call_back,call_back);},remove:function(jid,call_back)
{var item=this.findItem(jid);if(!item)
{throw"item not found";}
var iq=$iq({type:'set'}).c('query',{xmlns:Strophe.NS.ROSTER}).c('item',{jid:item.jid,subscription:"remove"});this._connection.sendIQ(iq,call_back,call_back);},_onReceiveRosterSuccess:function(userCallback,stanza)
{this._updateItems(stanza);userCallback(this.items);},_onReceiveRosterError:function(userCallback,stanza)
{userCallback(this.items);},_onReceivePresence:function(presence)
{var jid=presence.getAttribute('from');var from=Strophe.getBareJidFromJid(jid);var item=this.findItem(from);if(!item)
{return true;}
var type=presence.getAttribute('type');if(type=='unavailable')
{delete item.resources[Strophe.getResourceFromJid(jid)];}
else if(!type)
{item.resources[Strophe.getResourceFromJid(jid)]={show:(presence.getElementsByTagName('show').length!=0)?Strophe.getText(presence.getElementsByTagName('show')[0]):"",status:(presence.getElementsByTagName('status').length!=0)?Strophe.getText(presence.getElementsByTagName('status')[0]):"",priority:(presence.getElementsByTagName('priority').length!=0)?Strophe.getText(presence.getElementsByTagName('priority')[0]):""};}
else
{return true;}
this._call_backs(this.items,item);return true;},_call_backs:function(items,item)
{for(var i=0;i<this._callbacks.length;i++)
{this._callbacks[i](items,item);}},_onReceiveIQ:function(iq)
{var id=iq.getAttribute('id');var from=iq.getAttribute('from');if(from&&from!=""&&from!=this._connection.jid&&from!=Strophe.getBareJidFromJid(this._connection.jid))
return true;var iqresult=$iq({type:'result',id:id,from:this._connection.jid});this._connection.send(iqresult);this._updateItems(iq);return true;},_updateItems:function(iq)
{var query=iq.getElementsByTagName('query');if(query.length!=0)
{this.ver=query.item(0).getAttribute('ver');var self=this;Strophe.forEachChild(query.item(0),'item',function(item)
{self._updateItem(item);});}
this._call_backs(this.items);},_updateItem:function(item)
{var jid=item.getAttribute("jid");var name=item.getAttribute("name");var subscription=item.getAttribute("subscription");var ask=item.getAttribute("ask");var groups=[];Strophe.forEachChild(item,'group',function(group)
{groups.push(Strophe.getText(group));});if(subscription=="remove")
{this.removeItem(jid);return;}
var item=this.findItem(jid);if(!item)
{this.items.push({name:name,jid:jid,subscription:subscription,ask:ask,groups:groups,resources:{}});}
else
{item.name=name;item.subscription=subscription;item.ask=ask;item.groups=groups;}}});