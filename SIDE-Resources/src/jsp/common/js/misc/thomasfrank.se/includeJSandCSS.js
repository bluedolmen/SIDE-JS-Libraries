includeJS=function(url,onload,allowCache,type){
	type=type=="style"?"style":"script";
	url=allowCache?url:url+'&nocache='+Math.random();
	url=url.split('?').length>1?url:url.replace(/\&/,'?');
	onload=typeof onload=="function"?onload:function(){};
	var js=document.createElement(type=='script'?'script':'link');
	if(type=='style') {
		js.setAttribute('rel','stylesheet');
		js.setAttribute('type','text/css');
		js.setAttribute('href',url);
	}else{
		js.setAttribute('src',url);
	}
	js.addEventListener && function(){
		js.addEventListener('load',onload,false)}();
		js.onreadystatechange=function(){
			this.readyState=='complete' && onload.call()
		};
		document.getElementsByTagName('head').item(0).appendChild(js);
	};