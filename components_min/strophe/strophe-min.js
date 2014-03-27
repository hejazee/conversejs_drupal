var Base64=(function(){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var obj={encode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;do{chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+keyStr.charAt(enc1)+keyStr.charAt(enc2)+
keyStr.charAt(enc3)+keyStr.charAt(enc4);}while(i<input.length);return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}}while(i<input.length);return output;}};return obj;})();var hexcase=0;var b64pad="=";var chrsz=8;function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length*chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length*chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length*chrsz));}
function hex_hmac_sha1(key,data){return binb2hex(core_hmac_sha1(key,data));}
function b64_hmac_sha1(key,data){return binb2b64(core_hmac_sha1(key,data));}
function str_hmac_sha1(key,data){return binb2str(core_hmac_sha1(key,data));}
function sha1_vm_test()
{return hex_sha1("abc")=="a9993e364706816aba3e25717850c26c9cd0d89d";}
function core_sha1(x,len)
{x[len>>5]|=0x80<<(24-len%32);x[((len+64>>9)<<4)+15]=len;var w=new Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;var i,j,t,olda,oldb,oldc,oldd,olde;for(i=0;i<x.length;i+=16)
{olda=a;oldb=b;oldc=c;oldd=d;olde=e;for(j=0;j<80;j++)
{if(j<16){w[j]=x[i+j];}
else{w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);}
t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t;}
a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde);}
return[a,b,c,d,e];}
function sha1_ft(t,b,c,d)
{if(t<20){return(b&c)|((~b)&d);}
if(t<40){return b^c^d;}
if(t<60){return(b&c)|(b&d)|(c&d);}
return b^c^d;}
function sha1_kt(t)
{return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}
function core_hmac_sha1(key,data)
{var bkey=str2binb(key);if(bkey.length>16){bkey=core_sha1(bkey,key.length*chrsz);}
var ipad=new Array(16),opad=new Array(16);for(var i=0;i<16;i++)
{ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}
var hash=core_sha1(ipad.concat(str2binb(data)),512+data.length*chrsz);return core_sha1(opad.concat(hash),512+160);}
function safe_add(x,y)
{var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
function rol(num,cnt)
{return(num<<cnt)|(num>>>(32-cnt));}
function str2binb(str)
{var bin=[];var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)
{bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(32-chrsz-i%32);}
return bin;}
function binb2str(bin)
{var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)
{str+=String.fromCharCode((bin[i>>5]>>>(32-chrsz-i%32))&mask);}
return str;}
function binb2hex(binarray)
{var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++)
{str+=hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8+4))&0xF)+
hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8))&0xF);}
return str;}
function binb2b64(binarray)
{var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";var triplet,j;for(var i=0;i<binarray.length*4;i+=3)
{triplet=(((binarray[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(j=0;j<4;j++)
{if(i*8+j*6>binarray.length*32){str+=b64pad;}
else{str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}}
return str;}
var MD5=(function(){var hexcase=0;var b64pad="";var chrsz=8;var safe_add=function(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);};var bit_rol=function(num,cnt){return(num<<cnt)|(num>>>(32-cnt));};var str2binl=function(str){var bin=[];var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)
{bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(i%32);}
return bin;};var binl2str=function(bin){var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)
{str+=String.fromCharCode((bin[i>>5]>>>(i%32))&mask);}
return str;};var binl2hex=function(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++)
{str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+
hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF);}
return str;};var binl2b64=function(binarray){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";var triplet,j;for(var i=0;i<binarray.length*4;i+=3)
{triplet=(((binarray[i>>2]>>8*(i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*((i+2)%4))&0xFF);for(j=0;j<4;j++)
{if(i*8+j*6>binarray.length*32){str+=b64pad;}
else{str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}}
return str;};var md5_cmn=function(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);};var md5_ff=function(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);};var md5_gg=function(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);};var md5_hh=function(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);};var md5_ii=function(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);};var core_md5=function(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var olda,oldb,oldc,oldd;for(var i=0;i<x.length;i+=16)
{olda=a;oldb=b;oldc=c;oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}
return[a,b,c,d];};var core_hmac_md5=function(key,data){var bkey=str2binl(key);if(bkey.length>16){bkey=core_md5(bkey,key.length*chrsz);}
var ipad=new Array(16),opad=new Array(16);for(var i=0;i<16;i++)
{ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}
var hash=core_md5(ipad.concat(str2binl(data)),512+data.length*chrsz);return core_md5(opad.concat(hash),512+128);};var obj={hexdigest:function(s){return binl2hex(core_md5(str2binl(s),s.length*chrsz));},b64digest:function(s){return binl2b64(core_md5(str2binl(s),s.length*chrsz));},hash:function(s){return binl2str(core_md5(str2binl(s),s.length*chrsz));},hmac_hexdigest:function(key,data){return binl2hex(core_hmac_md5(key,data));},hmac_b64digest:function(key,data){return binl2b64(core_hmac_md5(key,data));},hmac_hash:function(key,data){return binl2str(core_hmac_md5(key,data));},test:function(){return MD5.hexdigest("abc")==="900150983cd24fb0d6963f7d28e17f72";}};return obj;})();if(!Function.prototype.bind){Function.prototype.bind=function(obj)
{var func=this;var _slice=Array.prototype.slice;var _concat=Array.prototype.concat;var _args=_slice.call(arguments,1);return function(){return func.apply(obj?obj:this,_concat.call(_args,_slice.call(arguments,0)));};};}
if(!Array.prototype.indexOf)
{Array.prototype.indexOf=function(elt)
{var len=this.length;var from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0){from+=len;}
for(;from<len;from++){if(from in this&&this[from]===elt){return from;}}
return-1;};}
(function(callback){var Strophe;function $build(name,attrs){return new Strophe.Builder(name,attrs);}
function $msg(attrs){return new Strophe.Builder("message",attrs);}
function $iq(attrs){return new Strophe.Builder("iq",attrs);}
function $pres(attrs){return new Strophe.Builder("presence",attrs);}
Strophe={VERSION:"8e14efd",NS:{HTTPBIND:"http://jabber.org/protocol/httpbind",BOSH:"urn:xmpp:xbosh",CLIENT:"jabber:client",AUTH:"jabber:iq:auth",ROSTER:"jabber:iq:roster",PROFILE:"jabber:iq:profile",DISCO_INFO:"http://jabber.org/protocol/disco#info",DISCO_ITEMS:"http://jabber.org/protocol/disco#items",MUC:"http://jabber.org/protocol/muc",SASL:"urn:ietf:params:xml:ns:xmpp-sasl",STREAM:"http://etherx.jabber.org/streams",BIND:"urn:ietf:params:xml:ns:xmpp-bind",SESSION:"urn:ietf:params:xml:ns:xmpp-session",VERSION:"jabber:iq:version",STANZAS:"urn:ietf:params:xml:ns:xmpp-stanzas",XHTML_IM:"http://jabber.org/protocol/xhtml-im",XHTML:"http://www.w3.org/1999/xhtml"},XHTML:{tags:['a','blockquote','br','cite','em','img','li','ol','p','span','strong','ul','body'],attributes:{'a':['href'],'blockquote':['style'],'br':[],'cite':['style'],'em':[],'img':['src','alt','style','height','width'],'li':['style'],'ol':['style'],'p':['style'],'span':['style'],'strong':[],'ul':['style'],'body':[]},css:['background-color','color','font-family','font-size','font-style','font-weight','margin-left','margin-right','text-align','text-decoration'],validTag:function(tag)
{for(var i=0;i<Strophe.XHTML.tags.length;i++){if(tag==Strophe.XHTML.tags[i]){return true;}}
return false;},validAttribute:function(tag,attribute)
{if(typeof Strophe.XHTML.attributes[tag]!=='undefined'&&Strophe.XHTML.attributes[tag].length>0){for(var i=0;i<Strophe.XHTML.attributes[tag].length;i++){if(attribute==Strophe.XHTML.attributes[tag][i]){return true;}}}
return false;},validCSS:function(style)
{for(var i=0;i<Strophe.XHTML.css.length;i++){if(style==Strophe.XHTML.css[i]){return true;}}
return false;}},addNamespace:function(name,value)
{Strophe.NS[name]=value;},Status:{ERROR:0,CONNECTING:1,CONNFAIL:2,AUTHENTICATING:3,AUTHFAIL:4,CONNECTED:5,DISCONNECTED:6,DISCONNECTING:7,ATTACHED:8},LogLevel:{DEBUG:0,INFO:1,WARN:2,ERROR:3,FATAL:4},ElementType:{NORMAL:1,TEXT:3,CDATA:4,FRAGMENT:11},TIMEOUT:1.1,SECONDARY_TIMEOUT:0.1,forEachChild:function(elem,elemName,func)
{var i,childNode;for(i=0;i<elem.childNodes.length;i++){childNode=elem.childNodes[i];if(childNode.nodeType==Strophe.ElementType.NORMAL&&(!elemName||this.isTagEqual(childNode,elemName))){func(childNode);}}},isTagEqual:function(el,name)
{return el.tagName.toLowerCase()==name.toLowerCase();},_xmlGenerator:null,_makeGenerator:function(){var doc;if(document.implementation.createDocument===undefined||document.implementation.createDocument&&document.documentMode&&document.documentMode<10){doc=this._getIEXmlDom();doc.appendChild(doc.createElement('strophe'));}else{doc=document.implementation.createDocument('jabber:client','strophe',null);}
return doc;},xmlGenerator:function(){if(!Strophe._xmlGenerator){Strophe._xmlGenerator=Strophe._makeGenerator();}
return Strophe._xmlGenerator;},_getIEXmlDom:function(){var doc=null;var docStrings=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.5.0","Msxml2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"];for(var d=0;d<docStrings.length;d++){if(doc===null){try{doc=new ActiveXObject(docStrings[d]);}catch(e){doc=null;}}else{break;}}
return doc;},xmlElement:function(name)
{if(!name){return null;}
var node=Strophe.xmlGenerator().createElement(name);var a,i,k;for(a=1;a<arguments.length;a++){if(!arguments[a]){continue;}
if(typeof(arguments[a])=="string"||typeof(arguments[a])=="number"){node.appendChild(Strophe.xmlTextNode(arguments[a]));}else if(typeof(arguments[a])=="object"&&typeof(arguments[a].sort)=="function"){for(i=0;i<arguments[a].length;i++){if(typeof(arguments[a][i])=="object"&&typeof(arguments[a][i].sort)=="function"){node.setAttribute(arguments[a][i][0],arguments[a][i][1]);}}}else if(typeof(arguments[a])=="object"){for(k in arguments[a]){if(arguments[a].hasOwnProperty(k)){node.setAttribute(k,arguments[a][k]);}}}}
return node;},xmlescape:function(text)
{text=text.replace(/\&/g,"&amp;");text=text.replace(/</g,"&lt;");text=text.replace(/>/g,"&gt;");text=text.replace(/'/g,"&apos;");text=text.replace(/"/g,"&quot;");return text;},xmlTextNode:function(text)
{return Strophe.xmlGenerator().createTextNode(text);},xmlHtmlNode:function(html)
{if(window.DOMParser){parser=new DOMParser();node=parser.parseFromString(html,"text/xml");}else{node=new ActiveXObject("Microsoft.XMLDOM");node.async="false";node.loadXML(html);}
return node;},getText:function(elem)
{if(!elem){return null;}
var str="";if(elem.childNodes.length===0&&elem.nodeType==Strophe.ElementType.TEXT){str+=elem.nodeValue;}
for(var i=0;i<elem.childNodes.length;i++){if(elem.childNodes[i].nodeType==Strophe.ElementType.TEXT){str+=elem.childNodes[i].nodeValue;}}
return Strophe.xmlescape(str);},copyElement:function(elem)
{var i,el;if(elem.nodeType==Strophe.ElementType.NORMAL){el=Strophe.xmlElement(elem.tagName);for(i=0;i<elem.attributes.length;i++){el.setAttribute(elem.attributes[i].nodeName.toLowerCase(),elem.attributes[i].value);}
for(i=0;i<elem.childNodes.length;i++){el.appendChild(Strophe.copyElement(elem.childNodes[i]));}}else if(elem.nodeType==Strophe.ElementType.TEXT){el=Strophe.xmlGenerator().createTextNode(elem.nodeValue);}
return el;},createHtml:function(elem)
{var i,el,j,tag,attribute,value,css,cssAttrs,attr,cssName,cssValue,children,child;if(elem.nodeType==Strophe.ElementType.NORMAL){tag=elem.nodeName.toLowerCase();if(Strophe.XHTML.validTag(tag)){try{el=Strophe.xmlElement(tag);for(i=0;i<Strophe.XHTML.attributes[tag].length;i++){attribute=Strophe.XHTML.attributes[tag][i];value=elem.getAttribute(attribute);if(typeof value=='undefined'||value===null||value===''||value===false||value===0){continue;}
if(attribute=='style'&&typeof value=='object'){if(typeof value.cssText!='undefined'){value=value.cssText;}}
if(attribute=='style'){css=[];cssAttrs=value.split(';');for(j=0;j<cssAttrs.length;j++){attr=cssAttrs[j].split(':');cssName=attr[0].replace(/^\s*/,"").replace(/\s*$/,"").toLowerCase();if(Strophe.XHTML.validCSS(cssName)){cssValue=attr[1].replace(/^\s*/,"").replace(/\s*$/,"");css.push(cssName+': '+cssValue);}}
if(css.length>0){value=css.join('; ');el.setAttribute(attribute,value);}}else{el.setAttribute(attribute,value);}}
for(i=0;i<elem.childNodes.length;i++){el.appendChild(Strophe.createHtml(elem.childNodes[i]));}}catch(e){el=Strophe.xmlTextNode('');}}else{el=Strophe.xmlGenerator().createDocumentFragment();for(i=0;i<elem.childNodes.length;i++){el.appendChild(Strophe.createHtml(elem.childNodes[i]));}}}else if(elem.nodeType==Strophe.ElementType.FRAGMENT){el=Strophe.xmlGenerator().createDocumentFragment();for(i=0;i<elem.childNodes.length;i++){el.appendChild(Strophe.createHtml(elem.childNodes[i]));}}else if(elem.nodeType==Strophe.ElementType.TEXT){el=Strophe.xmlTextNode(elem.nodeValue);}
return el;},escapeNode:function(node)
{return node.replace(/^\s+|\s+$/g,'').replace(/\\/g,"\\5c").replace(/ /g,"\\20").replace(/\"/g,"\\22").replace(/\&/g,"\\26").replace(/\'/g,"\\27").replace(/\//g,"\\2f").replace(/:/g,"\\3a").replace(/</g,"\\3c").replace(/>/g,"\\3e").replace(/@/g,"\\40");},unescapeNode:function(node)
{return node.replace(/\\20/g," ").replace(/\\22/g,'"').replace(/\\26/g,"&").replace(/\\27/g,"'").replace(/\\2f/g,"/").replace(/\\3a/g,":").replace(/\\3c/g,"<").replace(/\\3e/g,">").replace(/\\40/g,"@").replace(/\\5c/g,"\\");},getNodeFromJid:function(jid)
{if(jid.indexOf("@")<0){return null;}
return jid.split("@")[0];},getDomainFromJid:function(jid)
{var bare=Strophe.getBareJidFromJid(jid);if(bare.indexOf("@")<0){return bare;}else{var parts=bare.split("@");parts.splice(0,1);return parts.join('@');}},getResourceFromJid:function(jid)
{var s=jid.split("/");if(s.length<2){return null;}
s.splice(0,1);return s.join('/');},getBareJidFromJid:function(jid)
{return jid?jid.split("/")[0]:null;},log:function(level,msg)
{return;},debug:function(msg)
{this.log(this.LogLevel.DEBUG,msg);},info:function(msg)
{this.log(this.LogLevel.INFO,msg);},warn:function(msg)
{this.log(this.LogLevel.WARN,msg);},error:function(msg)
{this.log(this.LogLevel.ERROR,msg);},fatal:function(msg)
{this.log(this.LogLevel.FATAL,msg);},serialize:function(elem)
{var result;if(!elem){return null;}
if(typeof(elem.tree)==="function"){elem=elem.tree();}
var nodeName=elem.nodeName;var i,child;if(elem.getAttribute("_realname")){nodeName=elem.getAttribute("_realname");}
result="<"+nodeName;for(i=0;i<elem.attributes.length;i++){if(elem.attributes[i].nodeName!="_realname"){result+=" "+elem.attributes[i].nodeName.toLowerCase()+"='"+elem.attributes[i].value.replace(/&/g,"&amp;").replace(/\'/g,"&apos;").replace(/>/g,"&gt;").replace(/</g,"&lt;")+"'";}}
if(elem.childNodes.length>0){result+=">";for(i=0;i<elem.childNodes.length;i++){child=elem.childNodes[i];switch(child.nodeType){case Strophe.ElementType.NORMAL:result+=Strophe.serialize(child);break;case Strophe.ElementType.TEXT:result+=Strophe.xmlescape(child.nodeValue);break;case Strophe.ElementType.CDATA:result+="<![CDATA["+child.nodeValue+"]]>";}}
result+="</"+nodeName+">";}else{result+="/>";}
return result;},_requestId:0,_connectionPlugins:{},addConnectionPlugin:function(name,ptype)
{Strophe._connectionPlugins[name]=ptype;}};Strophe.Builder=function(name,attrs)
{if(name=="presence"||name=="message"||name=="iq"){if(attrs&&!attrs.xmlns){attrs.xmlns=Strophe.NS.CLIENT;}else if(!attrs){attrs={xmlns:Strophe.NS.CLIENT};}}
this.nodeTree=Strophe.xmlElement(name,attrs);this.node=this.nodeTree;};Strophe.Builder.prototype={tree:function()
{return this.nodeTree;},toString:function()
{return Strophe.serialize(this.nodeTree);},up:function()
{this.node=this.node.parentNode;return this;},attrs:function(moreattrs)
{for(var k in moreattrs){if(moreattrs.hasOwnProperty(k)){this.node.setAttribute(k,moreattrs[k]);}}
return this;},c:function(name,attrs,text)
{var child=Strophe.xmlElement(name,attrs,text);this.node.appendChild(child);if(!text){this.node=child;}
return this;},cnode:function(elem)
{var xmlGen=Strophe.xmlGenerator();try{var impNode=(xmlGen.importNode!==undefined);}
catch(e){var impNode=false;}
var newElem=impNode?xmlGen.importNode(elem,true):Strophe.copyElement(elem);this.node.appendChild(newElem);this.node=newElem;return this;},t:function(text)
{var child=Strophe.xmlTextNode(text);this.node.appendChild(child);return this;},h:function(html)
{var fragment=document.createElement('body');fragment.innerHTML=html;var xhtml=Strophe.createHtml(fragment);while(xhtml.childNodes.length>0){this.node.appendChild(xhtml.childNodes[0]);}
return this;}};Strophe.Handler=function(handler,ns,name,type,id,from,options)
{this.handler=handler;this.ns=ns;this.name=name;this.type=type;this.id=id;this.options=options||{matchBare:false};if(!this.options.matchBare){this.options.matchBare=false;}
if(this.options.matchBare){this.from=from?Strophe.getBareJidFromJid(from):null;}else{this.from=from;}
this.user=true;};Strophe.Handler.prototype={isMatch:function(elem)
{var nsMatch;var from=null;if(this.options.matchBare){from=Strophe.getBareJidFromJid(elem.getAttribute('from'));}else{from=elem.getAttribute('from');}
nsMatch=false;if(!this.ns){nsMatch=true;}else{var that=this;Strophe.forEachChild(elem,null,function(elem){if(elem.getAttribute("xmlns")==that.ns){nsMatch=true;}});nsMatch=nsMatch||elem.getAttribute("xmlns")==this.ns;}
if(nsMatch&&(!this.name||Strophe.isTagEqual(elem,this.name))&&(!this.type||elem.getAttribute("type")==this.type)&&(!this.id||elem.getAttribute("id")==this.id)&&(!this.from||from==this.from)){return true;}
return false;},run:function(elem)
{var result=null;try{result=this.handler(elem);}catch(e){if(e.sourceURL){Strophe.fatal("error: "+this.handler+" "+e.sourceURL+":"+
e.line+" - "+e.name+": "+e.message);}else if(e.fileName){if(typeof(console)!="undefined"){console.trace();console.error(this.handler," - error - ",e,e.message);}
Strophe.fatal("error: "+this.handler+" "+
e.fileName+":"+e.lineNumber+" - "+
e.name+": "+e.message);}else{Strophe.fatal("error: "+e.message+"\n"+e.stack);}
throw e;}
return result;},toString:function()
{return"{Handler: "+this.handler+"("+this.name+","+
this.id+","+this.ns+")}";}};Strophe.TimedHandler=function(period,handler)
{this.period=period;this.handler=handler;this.lastCalled=new Date().getTime();this.user=true;};Strophe.TimedHandler.prototype={run:function()
{this.lastCalled=new Date().getTime();return this.handler();},reset:function()
{this.lastCalled=new Date().getTime();},toString:function()
{return"{TimedHandler: "+this.handler+"("+this.period+")}";}};Strophe.Request=function(elem,func,rid,sends)
{this.id=++Strophe._requestId;this.xmlData=elem;this.data=Strophe.serialize(elem);this.origFunc=func;this.func=func;this.rid=rid;this.date=NaN;this.sends=sends||0;this.abort=false;this.dead=null;this.age=function(){if(!this.date){return 0;}
var now=new Date();return(now-this.date)/1000;};this.timeDead=function(){if(!this.dead){return 0;}
var now=new Date();return(now-this.dead)/1000;};this.xhr=this._newXHR();};Strophe.Request.prototype={getResponse:function()
{var node=null;if(this.xhr.responseXML&&this.xhr.responseXML.documentElement){node=this.xhr.responseXML.documentElement;if(node.tagName=="parsererror"){Strophe.error("invalid response received");Strophe.error("responseText: "+this.xhr.responseText);Strophe.error("responseXML: "+
Strophe.serialize(this.xhr.responseXML));throw"parsererror";}}else if(this.xhr.responseText){Strophe.error("invalid response received");Strophe.error("responseText: "+this.xhr.responseText);Strophe.error("responseXML: "+
Strophe.serialize(this.xhr.responseXML));}
return node;},_newXHR:function()
{var xhr=null;if(window.XMLHttpRequest){xhr=new XMLHttpRequest();if(xhr.overrideMimeType){xhr.overrideMimeType("text/xml");}}else if(window.ActiveXObject){xhr=new ActiveXObject("Microsoft.XMLHTTP");}
xhr.onreadystatechange=this.func.bind(null,this);return xhr;}};Strophe.Connection=function(service)
{this.service=service;this.jid="";this.domain=null;this.rid=Math.floor(Math.random()*4294967295);this.sid=null;this.streamId=null;this.features=null;this._sasl_data=[];this.do_session=false;this.do_bind=false;this.timedHandlers=[];this.handlers=[];this.removeTimeds=[];this.removeHandlers=[];this.addTimeds=[];this.addHandlers=[];this._authentication={};this._idleTimeout=null;this._disconnectTimeout=null;this.do_authentication=true;this.authenticated=false;this.disconnecting=false;this.connected=false;this.errors=0;this.paused=false;this.hold=1;this.wait=60;this.window=5;this._data=[];this._requests=[];this._uniqueId=Math.round(Math.random()*10000);this._sasl_success_handler=null;this._sasl_failure_handler=null;this._sasl_challenge_handler=null;this.maxRetries=5;this._idleTimeout=setTimeout(this._onIdle.bind(this),100);for(var k in Strophe._connectionPlugins){if(Strophe._connectionPlugins.hasOwnProperty(k)){var ptype=Strophe._connectionPlugins[k];var F=function(){};F.prototype=ptype;this[k]=new F();this[k].init(this);}}};Strophe.Connection.prototype={reset:function()
{this.rid=Math.floor(Math.random()*4294967295);this.sid=null;this.streamId=null;this.do_session=false;this.do_bind=false;this.timedHandlers=[];this.handlers=[];this.removeTimeds=[];this.removeHandlers=[];this.addTimeds=[];this.addHandlers=[];this._authentication={};this.authenticated=false;this.disconnecting=false;this.connected=false;this.errors=0;this._requests=[];this._uniqueId=Math.round(Math.random()*10000);},pause:function()
{this.paused=true;},resume:function()
{this.paused=false;},getUniqueId:function(suffix)
{if(typeof(suffix)=="string"||typeof(suffix)=="number"){return++this._uniqueId+":"+suffix;}else{return++this._uniqueId+"";}},connect:function(jid,pass,callback,wait,hold,route)
{this.jid=jid;this.pass=pass;this.connect_callback=callback;this.disconnecting=false;this.connected=false;this.authenticated=false;this.errors=0;this.wait=wait||this.wait;this.hold=hold||this.hold;this.domain=this.domain||Strophe.getDomainFromJid(this.jid);var body=this._buildBody().attrs({to:this.domain,"xml:lang":"en",wait:this.wait,hold:this.hold,content:"text/xml; charset=utf-8",ver:"1.6","xmpp:version":"1.0","xmlns:xmpp":Strophe.NS.BOSH});if(route){body.attrs({route:route});}
this._changeConnectStatus(Strophe.Status.CONNECTING,null);var _connect_cb=this._connect_callback||this._connect_cb;this._connect_callback=null;this._requests.push(new Strophe.Request(body.tree(),this._onRequestStateChange.bind(this,_connect_cb.bind(this)),body.tree().getAttribute("rid")));this._throttledRequestHandler();},attach:function(jid,sid,rid,callback,wait,hold,wind)
{this.jid=jid;this.sid=sid;this.rid=rid;this.connect_callback=callback;this.domain=Strophe.getDomainFromJid(this.jid);this.authenticated=true;this.connected=true;this.wait=wait||this.wait;this.hold=hold||this.hold;this.window=wind||this.window;this._changeConnectStatus(Strophe.Status.ATTACHED,null);},xmlInput:function(elem)
{return;},xmlOutput:function(elem)
{return;},rawInput:function(data)
{return;},rawOutput:function(data)
{return;},send:function(elem)
{if(elem===null){return;}
if(typeof(elem.sort)==="function"){for(var i=0;i<elem.length;i++){this._queueData(elem[i]);}}else if(typeof(elem.tree)==="function"){this._queueData(elem.tree());}else{this._queueData(elem);}
this._throttledRequestHandler();clearTimeout(this._idleTimeout);this._idleTimeout=setTimeout(this._onIdle.bind(this),100);},flush:function()
{clearTimeout(this._idleTimeout);this._onIdle();},sendIQ:function(elem,callback,errback,timeout){var timeoutHandler=null;var that=this;if(typeof(elem.tree)==="function"){elem=elem.tree();}
var id=elem.getAttribute('id');if(!id){id=this.getUniqueId("sendIQ");elem.setAttribute("id",id);}
var handler=this.addHandler(function(stanza){if(timeoutHandler){that.deleteTimedHandler(timeoutHandler);}
var iqtype=stanza.getAttribute('type');if(iqtype=='result'){if(callback){callback(stanza);}}else if(iqtype=='error'){if(errback){errback(stanza);}}else{throw{name:"StropheError",message:"Got bad IQ type of "+iqtype};}},null,'iq',null,id);if(timeout){timeoutHandler=this.addTimedHandler(timeout,function(){that.deleteHandler(handler);if(errback){errback(null);}
return false;});}
this.send(elem);return id;},_queueData:function(element){if(element===null||!element.tagName||!element.childNodes){throw{name:"StropheError",message:"Cannot queue non-DOMElement."};}
this._data.push(element);},_sendRestart:function()
{this._data.push("restart");this._throttledRequestHandler();clearTimeout(this._idleTimeout);this._idleTimeout=setTimeout(this._onIdle.bind(this),100);},addTimedHandler:function(period,handler)
{var thand=new Strophe.TimedHandler(period,handler);this.addTimeds.push(thand);return thand;},deleteTimedHandler:function(handRef)
{this.removeTimeds.push(handRef);},addHandler:function(handler,ns,name,type,id,from,options)
{var hand=new Strophe.Handler(handler,ns,name,type,id,from,options);this.addHandlers.push(hand);return hand;},deleteHandler:function(handRef)
{this.removeHandlers.push(handRef);},disconnect:function(reason)
{this._changeConnectStatus(Strophe.Status.DISCONNECTING,reason);Strophe.info("Disconnect was called because: "+reason);if(this.connected){this._disconnectTimeout=this._addSysTimedHandler(3000,this._onDisconnectTimeout.bind(this));this._sendTerminate();}},_changeConnectStatus:function(status,condition)
{for(var k in Strophe._connectionPlugins){if(Strophe._connectionPlugins.hasOwnProperty(k)){var plugin=this[k];if(plugin.statusChanged){try{plugin.statusChanged(status,condition);}catch(err){Strophe.error(""+k+" plugin caused an exception "+"changing status: "+err);}}}}
if(this.connect_callback){try{this.connect_callback(status,condition);}catch(e){Strophe.error("User connection callback caused an "+"exception: "+e);}}},_buildBody:function()
{var bodyWrap=$build('body',{rid:this.rid++,xmlns:Strophe.NS.HTTPBIND});if(this.sid!==null){bodyWrap.attrs({sid:this.sid});}
return bodyWrap;},_removeRequest:function(req)
{Strophe.debug("removing request");var i;for(i=this._requests.length-1;i>=0;i--){if(req==this._requests[i]){this._requests.splice(i,1);}}
req.xhr.onreadystatechange=function(){};this._throttledRequestHandler();},_restartRequest:function(i)
{var req=this._requests[i];if(req.dead===null){req.dead=new Date();}
this._processRequest(i);},_processRequest:function(i)
{var req=this._requests[i];var reqStatus=-1;try{if(req.xhr.readyState==4){reqStatus=req.xhr.status;}}catch(e){Strophe.error("caught an error in _requests["+i+"], reqStatus: "+reqStatus);}
if(typeof(reqStatus)=="undefined"){reqStatus=-1;}
if(req.sends>this.maxRetries){this._onDisconnectTimeout();return;}
var time_elapsed=req.age();var primaryTimeout=(!isNaN(time_elapsed)&&time_elapsed>Math.floor(Strophe.TIMEOUT*this.wait));var secondaryTimeout=(req.dead!==null&&req.timeDead()>Math.floor(Strophe.SECONDARY_TIMEOUT*this.wait));var requestCompletedWithServerError=(req.xhr.readyState==4&&(reqStatus<1||reqStatus>=500));if(primaryTimeout||secondaryTimeout||requestCompletedWithServerError){if(secondaryTimeout){Strophe.error("Request "+
this._requests[i].id+" timed out (secondary), restarting");}
req.abort=true;req.xhr.abort();req.xhr.onreadystatechange=function(){};this._requests[i]=new Strophe.Request(req.xmlData,req.origFunc,req.rid,req.sends);req=this._requests[i];}
if(req.xhr.readyState===0){Strophe.debug("request id "+req.id+"."+req.sends+" posting");try{req.xhr.open("POST",this.service,true);}catch(e2){Strophe.error("XHR open failed.");if(!this.connected){this._changeConnectStatus(Strophe.Status.CONNFAIL,"bad-service");}
this.disconnect();return;}
var sendFunc=function(){req.date=new Date();req.xhr.send(req.data);};if(req.sends>1){var backoff=Math.min(Math.floor(Strophe.TIMEOUT*this.wait),Math.pow(req.sends,3))*1000;setTimeout(sendFunc,backoff);}else{sendFunc();}
req.sends++;if(this.xmlOutput!==Strophe.Connection.prototype.xmlOutput){this.xmlOutput(req.xmlData);}
if(this.rawOutput!==Strophe.Connection.prototype.rawOutput){this.rawOutput(req.data);}}else{Strophe.debug("_processRequest: "+
(i===0?"first":"second")+" request has readyState of "+
req.xhr.readyState);}},_throttledRequestHandler:function()
{if(!this._requests){Strophe.debug("_throttledRequestHandler called with "+"undefined requests");}else{Strophe.debug("_throttledRequestHandler called with "+
this._requests.length+" requests");}
if(!this._requests||this._requests.length===0){return;}
if(this._requests.length>0){this._processRequest(0);}
if(this._requests.length>1&&Math.abs(this._requests[0].rid-
this._requests[1].rid)<this.window){this._processRequest(1);}},_onRequestStateChange:function(func,req)
{Strophe.debug("request id "+req.id+"."+req.sends+" state changed to "+
req.xhr.readyState);if(req.abort){req.abort=false;return;}
var reqStatus;if(req.xhr.readyState==4){reqStatus=0;try{reqStatus=req.xhr.status;}catch(e){}
if(typeof(reqStatus)=="undefined"){reqStatus=0;}
if(this.disconnecting){if(reqStatus>=400){this._hitError(reqStatus);return;}}
var reqIs0=(this._requests[0]==req);var reqIs1=(this._requests[1]==req);if((reqStatus>0&&reqStatus<500)||req.sends>5){this._removeRequest(req);Strophe.debug("request id "+
req.id+" should now be removed");}
if(reqStatus==200){if(reqIs1||(reqIs0&&this._requests.length>0&&this._requests[0].age()>Math.floor(Strophe.SECONDARY_TIMEOUT*this.wait))){this._restartRequest(0);}
Strophe.debug("request id "+
req.id+"."+
req.sends+" got 200");func(req);this.errors=0;}else{Strophe.error("request id "+
req.id+"."+
req.sends+" error "+reqStatus+" happened");if(reqStatus===0||(reqStatus>=400&&reqStatus<600)||reqStatus>=12000){this._hitError(reqStatus);if(reqStatus>=400&&reqStatus<500){this._changeConnectStatus(Strophe.Status.DISCONNECTING,null);this._doDisconnect();}}}
if(!((reqStatus>0&&reqStatus<500)||req.sends>5)){this._throttledRequestHandler();}}},_hitError:function(reqStatus)
{this.errors++;Strophe.warn("request errored, status: "+reqStatus+", number of errors: "+this.errors);if(this.errors>4){this._onDisconnectTimeout();}},_doDisconnect:function()
{Strophe.info("_doDisconnect was called");this.authenticated=false;this.disconnecting=false;this.sid=null;this.streamId=null;this.rid=Math.floor(Math.random()*4294967295);if(this.connected){this._changeConnectStatus(Strophe.Status.DISCONNECTED,null);this.connected=false;}
this.handlers=[];this.timedHandlers=[];this.removeTimeds=[];this.removeHandlers=[];this.addTimeds=[];this.addHandlers=[];},_dataRecv:function(req)
{try{var elem=req.getResponse();}catch(e){if(e!="parsererror"){throw e;}
this.disconnect("strophe-parsererror");}
if(elem===null){return;}
if(this.xmlInput!==Strophe.Connection.prototype.xmlInput){this.xmlInput(elem);}
if(this.rawInput!==Strophe.Connection.prototype.rawInput){this.rawInput(Strophe.serialize(elem));}
var i,hand;while(this.removeHandlers.length>0){hand=this.removeHandlers.pop();i=this.handlers.indexOf(hand);if(i>=0){this.handlers.splice(i,1);}}
while(this.addHandlers.length>0){this.handlers.push(this.addHandlers.pop());}
if(this.disconnecting&&this._requests.length===0){this.deleteTimedHandler(this._disconnectTimeout);this._disconnectTimeout=null;this._doDisconnect();return;}
var typ=elem.getAttribute("type");var cond,conflict;if(typ!==null&&typ=="terminate"){if(this.disconnecting){return;}
cond=elem.getAttribute("condition");conflict=elem.getElementsByTagName("conflict");if(cond!==null){if(cond=="remote-stream-error"&&conflict.length>0){cond="conflict";}
this._changeConnectStatus(Strophe.Status.CONNFAIL,cond);}else{this._changeConnectStatus(Strophe.Status.CONNFAIL,"unknown");}
this.disconnect();return;}
var that=this;Strophe.forEachChild(elem,null,function(child){var i,newList;newList=that.handlers;that.handlers=[];for(i=0;i<newList.length;i++){var hand=newList[i];try{if(hand.isMatch(child)&&(that.authenticated||!hand.user)){if(hand.run(child)){that.handlers.push(hand);}}else{that.handlers.push(hand);}}catch(e){}}});},_sendTerminate:function()
{Strophe.info("_sendTerminate was called");var body=this._buildBody().attrs({type:"terminate"});if(this.authenticated){body.c('presence',{xmlns:Strophe.NS.CLIENT,type:'unavailable'});}
this.disconnecting=true;var req=new Strophe.Request(body.tree(),this._onRequestStateChange.bind(this,this._dataRecv.bind(this)),body.tree().getAttribute("rid"));this._requests.push(req);this._throttledRequestHandler();},_connect_cb:function(req,_callback)
{Strophe.info("_connect_cb was called");this.connected=true;var bodyWrap=req.getResponse();if(!bodyWrap){return;}
if(this.xmlInput!==Strophe.Connection.prototype.xmlInput){this.xmlInput(bodyWrap);}
if(this.rawInput!==Strophe.Connection.prototype.rawInput){this.rawInput(Strophe.serialize(bodyWrap));}
var typ=bodyWrap.getAttribute("type");var cond,conflict;if(typ!==null&&typ=="terminate"){cond=bodyWrap.getAttribute("condition");conflict=bodyWrap.getElementsByTagName("conflict");if(cond!==null){if(cond=="remote-stream-error"&&conflict.length>0){cond="conflict";}
this._changeConnectStatus(Strophe.Status.CONNFAIL,cond);}else{this._changeConnectStatus(Strophe.Status.CONNFAIL,"unknown");}
return;}
if(!this.sid){this.sid=bodyWrap.getAttribute("sid");}
if(!this.stream_id){this.stream_id=bodyWrap.getAttribute("authid");}
var wind=bodyWrap.getAttribute('requests');if(wind){this.window=parseInt(wind,10);}
var hold=bodyWrap.getAttribute('hold');if(hold){this.hold=parseInt(hold,10);}
var wait=bodyWrap.getAttribute('wait');if(wait){this.wait=parseInt(wait,10);}
this._authentication.sasl_scram_sha1=false;this._authentication.sasl_plain=false;this._authentication.sasl_digest_md5=false;this._authentication.sasl_anonymous=false;this._authentication.legacy_auth=false;var hasFeatures=bodyWrap.getElementsByTagName("stream:features").length>0;if(!hasFeatures){hasFeatures=bodyWrap.getElementsByTagName("features").length>0;}
var mechanisms=bodyWrap.getElementsByTagName("mechanism");var i,mech,auth_str,hashed_auth_str,found_authentication=false;if(hasFeatures&&mechanisms.length>0){var missmatchedmechs=0;for(i=0;i<mechanisms.length;i++){mech=Strophe.getText(mechanisms[i]);if(mech=='SCRAM-SHA-1'){this._authentication.sasl_scram_sha1=true;}else if(mech=='DIGEST-MD5'){this._authentication.sasl_digest_md5=true;}else if(mech=='PLAIN'){this._authentication.sasl_plain=true;}else if(mech=='ANONYMOUS'){this._authentication.sasl_anonymous=true;}else missmatchedmechs++;}
this._authentication.legacy_auth=bodyWrap.getElementsByTagName("auth").length>0;found_authentication=this._authentication.legacy_auth||missmatchedmechs<mechanisms.length;}
if(!found_authentication){_callback=_callback||this._connect_cb;var body=this._buildBody();this._requests.push(new Strophe.Request(body.tree(),this._onRequestStateChange.bind(this,_callback.bind(this)),body.tree().getAttribute("rid")));this._throttledRequestHandler();return;}
if(this.do_authentication!==false)
this.authenticate();},authenticate:function()
{if(Strophe.getNodeFromJid(this.jid)===null&&this._authentication.sasl_anonymous){this._changeConnectStatus(Strophe.Status.AUTHENTICATING,null);this._sasl_success_handler=this._addSysHandler(this._sasl_success_cb.bind(this),null,"success",null,null);this._sasl_failure_handler=this._addSysHandler(this._sasl_failure_cb.bind(this),null,"failure",null,null);this.send($build("auth",{xmlns:Strophe.NS.SASL,mechanism:"ANONYMOUS"}).tree());}else if(Strophe.getNodeFromJid(this.jid)===null){this._changeConnectStatus(Strophe.Status.CONNFAIL,'x-strophe-bad-non-anon-jid');this.disconnect();}else if(this._authentication.sasl_scram_sha1){var cnonce=MD5.hexdigest(Math.random()*1234567890);var auth_str="n="+Strophe.getNodeFromJid(this.jid);auth_str+=",r=";auth_str+=cnonce;this._sasl_data["cnonce"]=cnonce;this._sasl_data["client-first-message-bare"]=auth_str;auth_str="n,,"+auth_str;this._changeConnectStatus(Strophe.Status.AUTHENTICATING,null);this._sasl_challenge_handler=this._addSysHandler(this._sasl_scram_challenge_cb.bind(this),null,"challenge",null,null);this._sasl_failure_handler=this._addSysHandler(this._sasl_failure_cb.bind(this),null,"failure",null,null);this.send($build("auth",{xmlns:Strophe.NS.SASL,mechanism:"SCRAM-SHA-1"}).t(Base64.encode(auth_str)).tree());}else if(this._authentication.sasl_digest_md5){this._changeConnectStatus(Strophe.Status.AUTHENTICATING,null);this._sasl_challenge_handler=this._addSysHandler(this._sasl_digest_challenge1_cb.bind(this),null,"challenge",null,null);this._sasl_failure_handler=this._addSysHandler(this._sasl_failure_cb.bind(this),null,"failure",null,null);this.send($build("auth",{xmlns:Strophe.NS.SASL,mechanism:"DIGEST-MD5"}).tree());}else if(this._authentication.sasl_plain){auth_str=Strophe.getBareJidFromJid(this.jid);auth_str=auth_str+"\u0000";auth_str=auth_str+Strophe.getNodeFromJid(this.jid);auth_str=auth_str+"\u0000";auth_str=auth_str+this.pass;this._changeConnectStatus(Strophe.Status.AUTHENTICATING,null);this._sasl_success_handler=this._addSysHandler(this._sasl_success_cb.bind(this),null,"success",null,null);this._sasl_failure_handler=this._addSysHandler(this._sasl_failure_cb.bind(this),null,"failure",null,null);hashed_auth_str=Base64.encode(auth_str);this.send($build("auth",{xmlns:Strophe.NS.SASL,mechanism:"PLAIN"}).t(hashed_auth_str).tree());}else{this._changeConnectStatus(Strophe.Status.AUTHENTICATING,null);this._addSysHandler(this._auth1_cb.bind(this),null,null,null,"_auth_1");this.send($iq({type:"get",to:this.domain,id:"_auth_1"}).c("query",{xmlns:Strophe.NS.AUTH}).c("username",{}).t(Strophe.getNodeFromJid(this.jid)).tree());}},_sasl_digest_challenge1_cb:function(elem)
{var attribMatch=/([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/;var challenge=Base64.decode(Strophe.getText(elem));var cnonce=MD5.hexdigest(""+(Math.random()*1234567890));var realm="";var host=null;var nonce="";var qop="";var matches;this.deleteHandler(this._sasl_failure_handler);while(challenge.match(attribMatch)){matches=challenge.match(attribMatch);challenge=challenge.replace(matches[0],"");matches[2]=matches[2].replace(/^"(.+)"$/,"$1");switch(matches[1]){case"realm":realm=matches[2];break;case"nonce":nonce=matches[2];break;case"qop":qop=matches[2];break;case"host":host=matches[2];break;}}
var digest_uri="xmpp/"+this.domain;if(host!==null){digest_uri=digest_uri+"/"+host;}
var A1=MD5.hash(Strophe.getNodeFromJid(this.jid)+":"+realm+":"+this.pass)+":"+nonce+":"+cnonce;var A2='AUTHENTICATE:'+digest_uri;var responseText="";responseText+='username='+
this._quote(Strophe.getNodeFromJid(this.jid))+',';responseText+='realm='+this._quote(realm)+',';responseText+='nonce='+this._quote(nonce)+',';responseText+='cnonce='+this._quote(cnonce)+',';responseText+='nc="00000001",';responseText+='qop="auth",';responseText+='digest-uri='+this._quote(digest_uri)+',';responseText+='response='+this._quote(MD5.hexdigest(MD5.hexdigest(A1)+":"+
nonce+":00000001:"+
cnonce+":auth:"+
MD5.hexdigest(A2)))+',';responseText+='charset="utf-8"';this._sasl_challenge_handler=this._addSysHandler(this._sasl_digest_challenge2_cb.bind(this),null,"challenge",null,null);this._sasl_success_handler=this._addSysHandler(this._sasl_success_cb.bind(this),null,"success",null,null);this._sasl_failure_handler=this._addSysHandler(this._sasl_failure_cb.bind(this),null,"failure",null,null);this.send($build('response',{xmlns:Strophe.NS.SASL}).t(Base64.encode(responseText)).tree());return false;},_quote:function(str)
{return'"'+str.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';},_sasl_digest_challenge2_cb:function(elem)
{this.deleteHandler(this._sasl_success_handler);this.deleteHandler(this._sasl_failure_handler);this._sasl_success_handler=this._addSysHandler(this._sasl_success_cb.bind(this),null,"success",null,null);this._sasl_failure_handler=this._addSysHandler(this._sasl_failure_cb.bind(this),null,"failure",null,null);this.send($build('response',{xmlns:Strophe.NS.SASL}).tree());return false;},_sasl_scram_challenge_cb:function(elem)
{var nonce,salt,iter,Hi,U,U_old;var clientKey,serverKey,clientSignature;var responseText="c=biws,";var challenge=Base64.decode(Strophe.getText(elem));var authMessage=this._sasl_data["client-first-message-bare"]+","+
challenge+",";var cnonce=this._sasl_data["cnonce"]
var attribMatch=/([a-z]+)=([^,]+)(,|$)/;this.deleteHandler(this._sasl_failure_handler);while(challenge.match(attribMatch)){matches=challenge.match(attribMatch);challenge=challenge.replace(matches[0],"");switch(matches[1]){case"r":nonce=matches[2];break;case"s":salt=matches[2];break;case"i":iter=matches[2];break;}}
if(!(nonce.substr(0,cnonce.length)===cnonce)){this._sasl_data=[];return this._sasl_failure_cb(null);}
responseText+="r="+nonce;authMessage+=responseText;salt=Base64.decode(salt);salt+="\0\0\0\1";Hi=U_old=core_hmac_sha1(this.pass,salt);for(i=1;i<iter;i++){U=core_hmac_sha1(this.pass,binb2str(U_old));for(k=0;k<5;k++){Hi[k]^=U[k];}
U_old=U;}
Hi=binb2str(Hi);clientKey=core_hmac_sha1(Hi,"Client Key");serverKey=str_hmac_sha1(Hi,"Server Key");clientSignature=core_hmac_sha1(str_sha1(binb2str(clientKey)),authMessage);this._sasl_data["server-signature"]=b64_hmac_sha1(serverKey,authMessage);for(k=0;k<5;k++){clientKey[k]^=clientSignature[k];}
responseText+=",p="+Base64.encode(binb2str(clientKey));this._sasl_success_handler=this._addSysHandler(this._sasl_success_cb.bind(this),null,"success",null,null);this._sasl_failure_handler=this._addSysHandler(this._sasl_failure_cb.bind(this),null,"failure",null,null);this.send($build('response',{xmlns:Strophe.NS.SASL}).t(Base64.encode(responseText)).tree());return false;},_auth1_cb:function(elem)
{var iq=$iq({type:"set",id:"_auth_2"}).c('query',{xmlns:Strophe.NS.AUTH}).c('username',{}).t(Strophe.getNodeFromJid(this.jid)).up().c('password').t(this.pass);if(!Strophe.getResourceFromJid(this.jid)){this.jid=Strophe.getBareJidFromJid(this.jid)+'/strophe';}
iq.up().c('resource',{}).t(Strophe.getResourceFromJid(this.jid));this._addSysHandler(this._auth2_cb.bind(this),null,null,null,"_auth_2");this.send(iq.tree());return false;},_sasl_success_cb:function(elem)
{if(this._sasl_data["server-signature"]){var serverSignature;var success=Base64.decode(Strophe.getText(elem));var attribMatch=/([a-z]+)=([^,]+)(,|$)/;matches=success.match(attribMatch);if(matches[1]=="v"){serverSignature=matches[2];}
if(serverSignature!=this._sasl_data["server-signature"]){this.deleteHandler(this._sasl_failure_handler);this._sasl_failure_handler=null;if(this._sasl_challenge_handler){this.deleteHandler(this._sasl_challenge_handler);this._sasl_challenge_handler=null;}
this._sasl_data=[];return this._sasl_failure_cb(null);}}
Strophe.info("SASL authentication succeeded.");this.deleteHandler(this._sasl_failure_handler);this._sasl_failure_handler=null;if(this._sasl_challenge_handler){this.deleteHandler(this._sasl_challenge_handler);this._sasl_challenge_handler=null;}
this._addSysHandler(this._sasl_auth1_cb.bind(this),null,"stream:features",null,null);this._sendRestart();return false;},_sasl_auth1_cb:function(elem)
{this.features=elem;var i,child;for(i=0;i<elem.childNodes.length;i++){child=elem.childNodes[i];if(child.nodeName=='bind'){this.do_bind=true;}
if(child.nodeName=='session'){this.do_session=true;}}
if(!this.do_bind){this._changeConnectStatus(Strophe.Status.AUTHFAIL,null);return false;}else{this._addSysHandler(this._sasl_bind_cb.bind(this),null,null,null,"_bind_auth_2");var resource=Strophe.getResourceFromJid(this.jid);if(resource){this.send($iq({type:"set",id:"_bind_auth_2"}).c('bind',{xmlns:Strophe.NS.BIND}).c('resource',{}).t(resource).tree());}else{this.send($iq({type:"set",id:"_bind_auth_2"}).c('bind',{xmlns:Strophe.NS.BIND}).tree());}}
return false;},_sasl_bind_cb:function(elem)
{if(elem.getAttribute("type")=="error"){Strophe.info("SASL binding failed.");var conflict=elem.getElementsByTagName("conflict"),condition;if(conflict.length>0){condition='conflict';}
this._changeConnectStatus(Strophe.Status.AUTHFAIL,condition);return false;}
var bind=elem.getElementsByTagName("bind");var jidNode;if(bind.length>0){jidNode=bind[0].getElementsByTagName("jid");if(jidNode.length>0){this.jid=Strophe.getText(jidNode[0]);if(this.do_session){this._addSysHandler(this._sasl_session_cb.bind(this),null,null,null,"_session_auth_2");this.send($iq({type:"set",id:"_session_auth_2"}).c('session',{xmlns:Strophe.NS.SESSION}).tree());}else{this.authenticated=true;this._changeConnectStatus(Strophe.Status.CONNECTED,null);}}}else{Strophe.info("SASL binding failed.");this._changeConnectStatus(Strophe.Status.AUTHFAIL,null);return false;}},_sasl_session_cb:function(elem)
{if(elem.getAttribute("type")=="result"){this.authenticated=true;this._changeConnectStatus(Strophe.Status.CONNECTED,null);}else if(elem.getAttribute("type")=="error"){Strophe.info("Session creation failed.");this._changeConnectStatus(Strophe.Status.AUTHFAIL,null);return false;}
return false;},_sasl_failure_cb:function(elem)
{if(this._sasl_success_handler){this.deleteHandler(this._sasl_success_handler);this._sasl_success_handler=null;}
if(this._sasl_challenge_handler){this.deleteHandler(this._sasl_challenge_handler);this._sasl_challenge_handler=null;}
this._changeConnectStatus(Strophe.Status.AUTHFAIL,null);return false;},_auth2_cb:function(elem)
{if(elem.getAttribute("type")=="result"){this.authenticated=true;this._changeConnectStatus(Strophe.Status.CONNECTED,null);}else if(elem.getAttribute("type")=="error"){this._changeConnectStatus(Strophe.Status.AUTHFAIL,null);this.disconnect();}
return false;},_addSysTimedHandler:function(period,handler)
{var thand=new Strophe.TimedHandler(period,handler);thand.user=false;this.addTimeds.push(thand);return thand;},_addSysHandler:function(handler,ns,name,type,id)
{var hand=new Strophe.Handler(handler,ns,name,type,id);hand.user=false;this.addHandlers.push(hand);return hand;},_onDisconnectTimeout:function()
{Strophe.info("_onDisconnectTimeout was called");var req;while(this._requests.length>0){req=this._requests.pop();req.abort=true;req.xhr.abort();req.xhr.onreadystatechange=function(){};}
this._doDisconnect();return false;},_onIdle:function()
{var i,thand,since,newList;while(this.addTimeds.length>0){this.timedHandlers.push(this.addTimeds.pop());}
while(this.removeTimeds.length>0){thand=this.removeTimeds.pop();i=this.timedHandlers.indexOf(thand);if(i>=0){this.timedHandlers.splice(i,1);}}
var now=new Date().getTime();newList=[];for(i=0;i<this.timedHandlers.length;i++){thand=this.timedHandlers[i];if(this.authenticated||!thand.user){since=thand.lastCalled+thand.period;if(since-now<=0){if(thand.run()){newList.push(thand);}}else{newList.push(thand);}}}
this.timedHandlers=newList;var body,time_elapsed;if(this.authenticated&&this._requests.length===0&&this._data.length===0&&!this.disconnecting){Strophe.info("no requests during idle cycle, sending "+"blank request");this._data.push(null);}
if(this._requests.length<2&&this._data.length>0&&!this.paused){body=this._buildBody();for(i=0;i<this._data.length;i++){if(this._data[i]!==null){if(this._data[i]==="restart"){body.attrs({to:this.domain,"xml:lang":"en","xmpp:restart":"true","xmlns:xmpp":Strophe.NS.BOSH});}else{body.cnode(this._data[i]).up();}}}
delete this._data;this._data=[];this._requests.push(new Strophe.Request(body.tree(),this._onRequestStateChange.bind(this,this._dataRecv.bind(this)),body.tree().getAttribute("rid")));this._processRequest(this._requests.length-1);}
if(this._requests.length>0){time_elapsed=this._requests[0].age();if(this._requests[0].dead!==null){if(this._requests[0].timeDead()>Math.floor(Strophe.SECONDARY_TIMEOUT*this.wait)){this._throttledRequestHandler();}}
if(time_elapsed>Math.floor(Strophe.TIMEOUT*this.wait)){Strophe.warn("Request "+
this._requests[0].id+" timed out, over "+Math.floor(Strophe.TIMEOUT*this.wait)+" seconds since last activity");this._throttledRequestHandler();}}
clearTimeout(this._idleTimeout);if(this.connected){this._idleTimeout=setTimeout(this._onIdle.bind(this),100);}}};if(callback){callback(Strophe,$build,$msg,$iq,$pres);}})(function(){window.Strophe=arguments[0];window.$build=arguments[1];window.$msg=arguments[2];window.$iq=arguments[3];window.$pres=arguments[4];});