var base64=base64||function(){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),i=!function(){var n={};return $.each(t,function(t,i){n[i]=t}),n}(),n={};return n.encode=function(n){for(var i=[],f=t,e=n.length,r,u=0;u<e;)r=n[u]<<16|n[u+1]<<8|n[u+2],i.push(f[r>>18],f[r>>12&63],f[r>>6&63],f[r&63]),u+=3;return e%3==1?(i.pop(),i.pop(),i.push("=","=")):(i.pop(),i.push("=")),i.join("")},n.decode=function(n){var e=[],t=n.split(""),u=i,o=t.length,f,r=0;if(o%4)return null;while(r<o)f=u[t[r]]<<18|u[t[r+1]]<<12|u[t[r+2]]<<6|u[t[r+3]],e.push(f>>16,f>>8&255,f&255),r+=4;while(t[--o]=="=")e.pop();return e},n.encodeArrayBuffer=function(n){for(var i=new DataView(n),u=i.byteLength,r=[],t=0;t<u;t++)r.push(i.getUint8(t));return base64.encode(r)},n.toObjectUrl=function(n,t){return"data:"+t+";base64,"+n},n}();$(function(){document.addEventListener("ajaxproxy",function(t){var f=t.detail,i=f.data,r={success:null,status:null,statusText:null,url:i.url,text:null,model:null,request:i,index:f.index},u;i.headers=i.headers||{};i.headers&&(u={},$.each(i.headers,function(n,t){u["Fish-"+n]=t}),i.headers=u);i.refer&&(i.headers["Fish-Referer"]=i.refer);i.headers["Fish-User-Agent"]="Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";i.headers["Fish-Origin"]=/(https?:\/\/[^\/]+\/)/i.exec(i.url)[1];i.headers["Fish-Referer"]||(i.headers["Fish-Referer"]=null);$.ajax(i).done(function(t,i,u){r.success=!0;r.status=u.status;r.statusText=u.statusText;r.text=u.responseText;r.model=t;r.headers=u.getAllResponseHeaders();n(r)}).fail(function(t){r.success=!1;r.status=t.status;r.statusText=t.statusText||"";r.text=t.responseText||"";r.model=null;r.headers=t.getAllResponseHeaders();n(r)});t.preventDefault&&t.preventDefault();t.stopPropagation&&t.stopPropagation()});var n=function(n){var t=new CustomEvent("ajaxproxyfinished",{detail:n});document.dispatchEvent(t)};document.addEventListener("ajaxLoadVerifyCode",function(n){var i=n.detail,t=new XMLHttpRequest;t.open("GET",i.url,!0);t.onreadystatechange=function(){if(t.readyState==4)if(t.status!=200)document.dispatchEvent(new CustomEvent("ajaxproxyfinished",{detail:{url:null,success:!1,index:i.index,headers:t.getAllResponseHeaders()}}));else{var n=base64.toObjectUrl(base64.encodeArrayBuffer(t.response),"image/jpeg");document.dispatchEvent(new CustomEvent("ajaxproxyfinished",{detail:{url:n,success:!0,index:i.index,headers:t.getAllResponseHeaders()}}))}};t.responseType="arraybuffer";t.setRequestHeader("Fish-Referer",i.refer);t.setRequestHeader("Fish-User-Agent","Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)");t.setRequestHeader("Fish-Origin",/(https?:\/\/[^\/]+\/)/.exec(i.url)[1]);i.headers&&$.each(i.headers,function(n,i){t.setRequestHeader("Fish-"+n,i)});t.send(i.data||null);n.preventDefault&&n.preventDefault();n.stopPropagation&&n.stopPropagation()});document.body.dataset.targetExtensionId=chrome.runtime.id;document.body.dataset.targetExtensionVersion=chrome.runtime.getManifest().version;document.body.dataset.mobileSupportInitialized=1;chrome.runtime.sendMessage({action:"getBv"},function(n){document.body.dataset.browserVersion=n.bv;document.dispatchEvent(new CustomEvent("mobileSupportInitialized"))})})