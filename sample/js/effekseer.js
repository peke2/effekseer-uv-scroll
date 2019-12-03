
var effekseer_native = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return (
function(effekseer_native) {
  effekseer_native = effekseer_native || {};

var Module=typeof effekseer_native!=="undefined"?effekseer_native:{};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_HAS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_HAS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_NODE=ENVIRONMENT_HAS_NODE&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";var nodeFS;var nodePath;read_=function shell_read(filename,binary){var ret;if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);quit_=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){return read(f)}}readBinary=function readBinary(f){var data;if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit==="function"){quit_=function(status){quit(status)}}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}read_=function shell_read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=function readBinary(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)};setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];function warnOnce(text){if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;err(text)}}var asm2wasmImports={"f64-rem":function(x,y){return x%y},"debugger":function(){}};var functionPointers=new Array(0);var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime;if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(typeof WebAssembly!=="object"){err("no native wasm support detected")}function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}var wasmMemory;var wasmTable;var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];assert(func,"Cannot call unknown function "+ident+", make sure it is exported");return func}function ccall(ident,returnType,argTypes,args,opts){var toC={"string":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret},"array":function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string")return UTF8ToString(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);ret=convertReturnValue(ret);if(stack!==0)stackRestore(stack);return ret}function cwrap(ident,returnType,argTypes,opts){argTypes=argTypes||[];var numericArgs=argTypes.every(function(type){return type==="number"});var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments,opts)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(u8Array[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=u8Array[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|u8Array[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function UTF16ToString(ptr){var endPtr=ptr;var idx=endPtr>>1;while(HEAP16[idx])++idx;endPtr=idx<<1;if(endPtr-ptr>32&&UTF16Decoder){return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr))}else{var i=0;var str="";while(1){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)return str;++i;str+=String.fromCharCode(codeUnit)}}}function allocateUTF8(str){var size=lengthBytesUTF8(str)+1;var ret=_malloc(size);if(ret)stringToUTF8Array(str,HEAP8,ret,size);return ret}function allocateUTF8OnStack(str){var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8Array(str,HEAP8,ret,size);return ret}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}var WASM_PAGE_SIZE=65536;var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var DYNAMIC_BASE=5303280,DYNAMICTOP_PTR=60368;var INITIAL_TOTAL_MEMORY=Module["TOTAL_MEMORY"]||33554432;if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"]}else{wasmMemory=new WebAssembly.Memory({"initial":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE,"maximum":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE})}if(wasmMemory){buffer=wasmMemory.buffer}INITIAL_TOTAL_MEMORY=buffer.byteLength;updateGlobalBufferAndViews(buffer);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var Math_abs=Math.abs;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_min=Math.min;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}var wasmBinaryFile="effekseer.core.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(){try{if(wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(wasmBinaryFile)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary()})}return new Promise(function(resolve,reject){resolve(getBinary())})}function createWasm(env){var info={"env":env,"global":{"NaN":NaN,Infinity:Infinity},"global.Math":Math,"asm2wasm":asm2wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiatedSource(output){receiveInstance(output["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function"){fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");instantiateArrayBuffer(receiveInstantiatedSource)})})}else{return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}Module["asm"]=function(global,env,providedBuffer){env["memory"]=wasmMemory;env["table"]=wasmTable=new WebAssembly.Table({"initial":1764,"maximum":1764,"element":"anyfunc"});env["__memory_base"]=1024;env["__table_base"]=0;var exports=createWasm(env);return exports};var tempDouble;var tempI64;var ASM_CONSTS=[function($0,$1){return Module._loadBinary(UTF16ToString($0),$1)!=null},function($0,$1,$2,$3){var buffer=Module._loadBinary(UTF16ToString($0),$3);var memptr=_malloc(buffer.byteLength);HEAP8.set(new Uint8Array(buffer),memptr);setValue($1,memptr,"i32");setValue($2,buffer.byteLength,"i32")},function($0){return Module._loadImage(UTF16ToString($0))!=null},function($0,$1){var binding=GLctx.getParameter(GLctx.TEXTURE_BINDING_2D);var img=Module._loadImage(UTF16ToString($0));GLctx.bindTexture(GLctx.TEXTURE_2D,GL.textures[$1]);GLctx.texImage2D(GLctx.TEXTURE_2D,0,GLctx.RGBA,GLctx.RGBA,GLctx.UNSIGNED_BYTE,img);if(Module._isPowerOfTwo(img)){GLctx.generateMipmap(GLctx.TEXTURE_2D)}GLctx.bindTexture(GLctx.TEXTURE_2D,binding)}];function _emscripten_asm_const_iii(code,a0,a1){return ASM_CONSTS[code](a0,a1)}function _emscripten_asm_const_ii(code,a0){return ASM_CONSTS[code](a0)}function _emscripten_asm_const_iiiii(code,a0,a1,a2,a3){return ASM_CONSTS[code](a0,a1,a2,a3)}function ___cxa_allocate_exception(size){return _malloc(size)}var ___exception_infos={};function ___cxa_pure_virtual(){ABORT=true;throw"Pure virtual function called!"}var ___exception_last=0;function ___cxa_throw(ptr,type,destructor){___exception_infos[ptr]={ptr:ptr,adjusted:[ptr],type:type,destructor:destructor,refcount:0,caught:false,rethrown:false};___exception_last=ptr;if(!("uncaught_exception"in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv.uncaught_exceptions=1}else{__ZSt18uncaught_exceptionv.uncaught_exceptions++}throw ptr}function ___cxa_uncaught_exceptions(){return __ZSt18uncaught_exceptionv.uncaught_exceptions}function ___lock(){}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}function ___map_file(pathname,size){___setErrNo(1);return-1}var PATH={splitPath:function(filename){var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return splitPathRe.exec(filename).slice(1)},normalizeArray:function(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up;up--){parts.unshift("..")}}return parts},normalize:function(path){var isAbsolute=path.charAt(0)==="/",trailingSlash=path.substr(-1)==="/";path=PATH.normalizeArray(path.split("/").filter(function(p){return!!p}),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path},dirname:function(path){var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return"."}if(dir){dir=dir.substr(0,dir.length-1)}return root+dir},basename:function(path){if(path==="/")return"/";var lastSlash=path.lastIndexOf("/");if(lastSlash===-1)return path;return path.substr(lastSlash+1)},extname:function(path){return PATH.splitPath(path)[3]},join:function(){var paths=Array.prototype.slice.call(arguments,0);return PATH.normalize(paths.join("/"))},join2:function(l,r){return PATH.normalize(l+"/"+r)}};var SYSCALLS={buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:0,get:function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(){var ret=UTF8ToString(SYSCALLS.get());return ret},get64:function(){var low=SYSCALLS.get(),high=SYSCALLS.get();return low},getZero:function(){SYSCALLS.get()}};function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall145(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();return SYSCALLS.doReadv(stream,iov,iovcnt)}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(stream,HEAPU8[ptr+j])}ret+=len}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall221(which,varargs){SYSCALLS.varargs=varargs;try{return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall5(which,varargs){SYSCALLS.varargs=varargs;try{var pathname=SYSCALLS.getStr(),flags=SYSCALLS.get(),mode=SYSCALLS.get();var stream=FS.open(pathname,flags,mode);return stream.fd}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function __emscripten_syscall_munmap(addr,len){if(addr===-1||len===0){return-22}var info=SYSCALLS.mappings[addr];if(!info)return 0;if(len===info.len){var stream=FS.getStream(info.fd);SYSCALLS.doMsync(addr,stream,len,info.flags);FS.munmap(stream);SYSCALLS.mappings[addr]=null;if(info.allocated){_free(info.malloc)}}return 0}function ___syscall91(which,varargs){SYSCALLS.varargs=varargs;try{var addr=SYSCALLS.get(),len=SYSCALLS.get();return __emscripten_syscall_munmap(addr,len)}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___unlock(){}function _abort(){Module["abort"]()}function _emscripten_set_main_loop_timing(mode,value){Browser.mainLoop.timingMode=mode;Browser.mainLoop.timingValue=value;if(!Browser.mainLoop.func){return 1}if(mode==0){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setTimeout(){var timeUntilNextTick=Math.max(0,Browser.mainLoop.tickStartTime+value-_emscripten_get_now())|0;setTimeout(Browser.mainLoop.runner,timeUntilNextTick)};Browser.mainLoop.method="timeout"}else if(mode==1){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_rAF(){Browser.requestAnimationFrame(Browser.mainLoop.runner)};Browser.mainLoop.method="rAF"}else if(mode==2){if(typeof setImmediate==="undefined"){var setImmediates=[];var emscriptenMainLoopMessageId="setimmediate";var Browser_setImmediate_messageHandler=function(event){if(event.data===emscriptenMainLoopMessageId||event.data.target===emscriptenMainLoopMessageId){event.stopPropagation();setImmediates.shift()()}};addEventListener("message",Browser_setImmediate_messageHandler,true);setImmediate=function Browser_emulated_setImmediate(func){setImmediates.push(func);if(ENVIRONMENT_IS_WORKER){if(Module["setImmediates"]===undefined)Module["setImmediates"]=[];Module["setImmediates"].push(func);postMessage({target:emscriptenMainLoopMessageId})}else postMessage(emscriptenMainLoopMessageId,"*")}}Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setImmediate(){setImmediate(Browser.mainLoop.runner)};Browser.mainLoop.method="immediate"}return 0}function _emscripten_get_now(){abort()}function _emscripten_set_main_loop(func,fps,simulateInfiniteLoop,arg,noSetTiming){noExitRuntime=true;assert(!Browser.mainLoop.func,"emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");Browser.mainLoop.func=func;Browser.mainLoop.arg=arg;var browserIterationFunc;if(typeof arg!=="undefined"){browserIterationFunc=function(){Module["dynCall_vi"](func,arg)}}else{browserIterationFunc=function(){Module["dynCall_v"](func)}}var thisMainLoopId=Browser.mainLoop.currentlyRunningMainloop;Browser.mainLoop.runner=function Browser_mainLoop_runner(){if(ABORT)return;if(Browser.mainLoop.queue.length>0){var start=Date.now();var blocker=Browser.mainLoop.queue.shift();blocker.func(blocker.arg);if(Browser.mainLoop.remainingBlockers){var remaining=Browser.mainLoop.remainingBlockers;var next=remaining%1==0?remaining-1:Math.floor(remaining);if(blocker.counted){Browser.mainLoop.remainingBlockers=next}else{next=next+.5;Browser.mainLoop.remainingBlockers=(8*remaining+next)/9}}console.log('main loop blocker "'+blocker.name+'" took '+(Date.now()-start)+" ms");Browser.mainLoop.updateStatus();if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;setTimeout(Browser.mainLoop.runner,0);return}if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;Browser.mainLoop.currentFrameNumber=Browser.mainLoop.currentFrameNumber+1|0;if(Browser.mainLoop.timingMode==1&&Browser.mainLoop.timingValue>1&&Browser.mainLoop.currentFrameNumber%Browser.mainLoop.timingValue!=0){Browser.mainLoop.scheduler();return}else if(Browser.mainLoop.timingMode==0){Browser.mainLoop.tickStartTime=_emscripten_get_now()}if(Browser.mainLoop.method==="timeout"&&Module.ctx){err("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");Browser.mainLoop.method=""}Browser.mainLoop.runIter(browserIterationFunc);if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;if(typeof SDL==="object"&&SDL.audio&&SDL.audio.queueNewAudioData)SDL.audio.queueNewAudioData();Browser.mainLoop.scheduler()};if(!noSetTiming){if(fps&&fps>0)_emscripten_set_main_loop_timing(0,1e3/fps);else _emscripten_set_main_loop_timing(1,1);Browser.mainLoop.scheduler()}if(simulateInfiniteLoop){throw"SimulateInfiniteLoop"}}var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:function(){Browser.mainLoop.scheduler=null;Browser.mainLoop.currentlyRunningMainloop++},resume:function(){Browser.mainLoop.currentlyRunningMainloop++;var timingMode=Browser.mainLoop.timingMode;var timingValue=Browser.mainLoop.timingValue;var func=Browser.mainLoop.func;Browser.mainLoop.func=null;_emscripten_set_main_loop(func,0,false,Browser.mainLoop.arg,true);_emscripten_set_main_loop_timing(timingMode,timingValue);Browser.mainLoop.scheduler()},updateStatus:function(){if(Module["setStatus"]){var message=Module["statusMessage"]||"Please wait...";var remaining=Browser.mainLoop.remainingBlockers;var expected=Browser.mainLoop.expectedBlockers;if(remaining){if(remaining<expected){Module["setStatus"](message+" ("+(expected-remaining)+"/"+expected+")")}else{Module["setStatus"](message)}}else{Module["setStatus"]("")}}},runIter:function(func){if(ABORT)return;if(Module["preMainLoop"]){var preRet=Module["preMainLoop"]();if(preRet===false){return}}try{func()}catch(e){if(e instanceof ExitStatus){return}else{if(e&&typeof e==="object"&&e.stack)err("exception thrown: "+[e,e.stack]);throw e}}if(Module["postMainLoop"])Module["postMainLoop"]()}},isFullscreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function(){if(!Module["preloadPlugins"])Module["preloadPlugins"]=[];if(Browser.initted)return;Browser.initted=true;try{new Blob;Browser.hasBlobConstructor=true}catch(e){Browser.hasBlobConstructor=false;console.log("warning: no blob constructor, cannot create blobs with mimetypes")}Browser.BlobBuilder=typeof MozBlobBuilder!="undefined"?MozBlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:!Browser.hasBlobConstructor?console.log("warning: no BlobBuilder"):null;Browser.URLObject=typeof window!="undefined"?window.URL?window.URL:window.webkitURL:undefined;if(!Module.noImageDecoding&&typeof Browser.URLObject==="undefined"){console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");Module.noImageDecoding=true}var imagePlugin={};imagePlugin["canHandle"]=function imagePlugin_canHandle(name){return!Module.noImageDecoding&&/\.(jpg|jpeg|png|bmp)$/i.test(name)};imagePlugin["handle"]=function imagePlugin_handle(byteArray,name,onload,onerror){var b=null;if(Browser.hasBlobConstructor){try{b=new Blob([byteArray],{type:Browser.getMimetype(name)});if(b.size!==byteArray.length){b=new Blob([new Uint8Array(byteArray).buffer],{type:Browser.getMimetype(name)})}}catch(e){warnOnce("Blob constructor present but fails: "+e+"; falling back to blob builder")}}if(!b){var bb=new Browser.BlobBuilder;bb.append(new Uint8Array(byteArray).buffer);b=bb.getBlob()}var url=Browser.URLObject.createObjectURL(b);var img=new Image;img.onload=function img_onload(){assert(img.complete,"Image "+name+" could not be decoded");var canvas=document.createElement("canvas");canvas.width=img.width;canvas.height=img.height;var ctx=canvas.getContext("2d");ctx.drawImage(img,0,0);Module["preloadedImages"][name]=canvas;Browser.URLObject.revokeObjectURL(url);if(onload)onload(byteArray)};img.onerror=function img_onerror(event){console.log("Image "+url+" could not be decoded");if(onerror)onerror()};img.src=url};Module["preloadPlugins"].push(imagePlugin);var audioPlugin={};audioPlugin["canHandle"]=function audioPlugin_canHandle(name){return!Module.noAudioDecoding&&name.substr(-4)in{".ogg":1,".wav":1,".mp3":1}};audioPlugin["handle"]=function audioPlugin_handle(byteArray,name,onload,onerror){var done=false;function finish(audio){if(done)return;done=true;Module["preloadedAudios"][name]=audio;if(onload)onload(byteArray)}function fail(){if(done)return;done=true;Module["preloadedAudios"][name]=new Audio;if(onerror)onerror()}if(Browser.hasBlobConstructor){try{var b=new Blob([byteArray],{type:Browser.getMimetype(name)})}catch(e){return fail()}var url=Browser.URLObject.createObjectURL(b);var audio=new Audio;audio.addEventListener("canplaythrough",function(){finish(audio)},false);audio.onerror=function audio_onerror(event){if(done)return;console.log("warning: browser could not fully decode audio "+name+", trying slower base64 approach");function encode64(data){var BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var PAD="=";var ret="";var leftchar=0;var leftbits=0;for(var i=0;i<data.length;i++){leftchar=leftchar<<8|data[i];leftbits+=8;while(leftbits>=6){var curr=leftchar>>leftbits-6&63;leftbits-=6;ret+=BASE[curr]}}if(leftbits==2){ret+=BASE[(leftchar&3)<<4];ret+=PAD+PAD}else if(leftbits==4){ret+=BASE[(leftchar&15)<<2];ret+=PAD}return ret}audio.src="data:audio/x-"+name.substr(-3)+";base64,"+encode64(byteArray);finish(audio)};audio.src=url;Browser.safeSetTimeout(function(){finish(audio)},1e4)}else{return fail()}};Module["preloadPlugins"].push(audioPlugin);function pointerLockChange(){Browser.pointerLock=document["pointerLockElement"]===Module["canvas"]||document["mozPointerLockElement"]===Module["canvas"]||document["webkitPointerLockElement"]===Module["canvas"]||document["msPointerLockElement"]===Module["canvas"]}var canvas=Module["canvas"];if(canvas){canvas.requestPointerLock=canvas["requestPointerLock"]||canvas["mozRequestPointerLock"]||canvas["webkitRequestPointerLock"]||canvas["msRequestPointerLock"]||function(){};canvas.exitPointerLock=document["exitPointerLock"]||document["mozExitPointerLock"]||document["webkitExitPointerLock"]||document["msExitPointerLock"]||function(){};canvas.exitPointerLock=canvas.exitPointerLock.bind(document);document.addEventListener("pointerlockchange",pointerLockChange,false);document.addEventListener("mozpointerlockchange",pointerLockChange,false);document.addEventListener("webkitpointerlockchange",pointerLockChange,false);document.addEventListener("mspointerlockchange",pointerLockChange,false);if(Module["elementPointerLock"]){canvas.addEventListener("click",function(ev){if(!Browser.pointerLock&&Module["canvas"].requestPointerLock){Module["canvas"].requestPointerLock();ev.preventDefault()}},false)}}},createContext:function(canvas,useWebGL,setInModule,webGLContextAttributes){if(useWebGL&&Module.ctx&&canvas==Module.canvas)return Module.ctx;var ctx;var contextHandle;if(useWebGL){var contextAttributes={antialias:false,alpha:false,majorVersion:1};if(webGLContextAttributes){for(var attribute in webGLContextAttributes){contextAttributes[attribute]=webGLContextAttributes[attribute]}}if(typeof GL!=="undefined"){contextHandle=GL.createContext(canvas,contextAttributes);if(contextHandle){ctx=GL.getContext(contextHandle).GLctx}}}else{ctx=canvas.getContext("2d")}if(!ctx)return null;if(setInModule){if(!useWebGL)assert(typeof GLctx==="undefined","cannot set in module if GLctx is used, but we are a non-GL context that would replace it");Module.ctx=ctx;if(useWebGL)GL.makeContextCurrent(contextHandle);Module.useWebGL=useWebGL;Browser.moduleContextCreatedCallbacks.forEach(function(callback){callback()});Browser.init()}return ctx},destroyContext:function(canvas,useWebGL,setInModule){},fullscreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullscreen:function(lockPointer,resizeCanvas,vrDevice){Browser.lockPointer=lockPointer;Browser.resizeCanvas=resizeCanvas;Browser.vrDevice=vrDevice;if(typeof Browser.lockPointer==="undefined")Browser.lockPointer=true;if(typeof Browser.resizeCanvas==="undefined")Browser.resizeCanvas=false;if(typeof Browser.vrDevice==="undefined")Browser.vrDevice=null;var canvas=Module["canvas"];function fullscreenChange(){Browser.isFullscreen=false;var canvasContainer=canvas.parentNode;if((document["fullscreenElement"]||document["mozFullScreenElement"]||document["msFullscreenElement"]||document["webkitFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvasContainer){canvas.exitFullscreen=Browser.exitFullscreen;if(Browser.lockPointer)canvas.requestPointerLock();Browser.isFullscreen=true;if(Browser.resizeCanvas){Browser.setFullscreenCanvasSize()}else{Browser.updateCanvasDimensions(canvas)}}else{canvasContainer.parentNode.insertBefore(canvas,canvasContainer);canvasContainer.parentNode.removeChild(canvasContainer);if(Browser.resizeCanvas){Browser.setWindowedCanvasSize()}else{Browser.updateCanvasDimensions(canvas)}}if(Module["onFullScreen"])Module["onFullScreen"](Browser.isFullscreen);if(Module["onFullscreen"])Module["onFullscreen"](Browser.isFullscreen)}if(!Browser.fullscreenHandlersInstalled){Browser.fullscreenHandlersInstalled=true;document.addEventListener("fullscreenchange",fullscreenChange,false);document.addEventListener("mozfullscreenchange",fullscreenChange,false);document.addEventListener("webkitfullscreenchange",fullscreenChange,false);document.addEventListener("MSFullscreenChange",fullscreenChange,false)}var canvasContainer=document.createElement("div");canvas.parentNode.insertBefore(canvasContainer,canvas);canvasContainer.appendChild(canvas);canvasContainer.requestFullscreen=canvasContainer["requestFullscreen"]||canvasContainer["mozRequestFullScreen"]||canvasContainer["msRequestFullscreen"]||(canvasContainer["webkitRequestFullscreen"]?function(){canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"])}:null)||(canvasContainer["webkitRequestFullScreen"]?function(){canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])}:null);if(vrDevice){canvasContainer.requestFullscreen({vrDisplay:vrDevice})}else{canvasContainer.requestFullscreen()}},requestFullScreen:function(lockPointer,resizeCanvas,vrDevice){err("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");Browser.requestFullScreen=function(lockPointer,resizeCanvas,vrDevice){return Browser.requestFullscreen(lockPointer,resizeCanvas,vrDevice)};return Browser.requestFullscreen(lockPointer,resizeCanvas,vrDevice)},exitFullscreen:function(){if(!Browser.isFullscreen){return false}var CFS=document["exitFullscreen"]||document["cancelFullScreen"]||document["mozCancelFullScreen"]||document["msExitFullscreen"]||document["webkitCancelFullScreen"]||function(){};CFS.apply(document,[]);return true},nextRAF:0,fakeRequestAnimationFrame:function(func){var now=Date.now();if(Browser.nextRAF===0){Browser.nextRAF=now+1e3/60}else{while(now+2>=Browser.nextRAF){Browser.nextRAF+=1e3/60}}var delay=Math.max(Browser.nextRAF-now,0);setTimeout(func,delay)},requestAnimationFrame:function(func){if(typeof requestAnimationFrame==="function"){requestAnimationFrame(func);return}var RAF=Browser.fakeRequestAnimationFrame;RAF(func)},safeCallback:function(func){return function(){if(!ABORT)return func.apply(null,arguments)}},allowAsyncCallbacks:true,queuedAsyncCallbacks:[],pauseAsyncCallbacks:function(){Browser.allowAsyncCallbacks=false},resumeAsyncCallbacks:function(){Browser.allowAsyncCallbacks=true;if(Browser.queuedAsyncCallbacks.length>0){var callbacks=Browser.queuedAsyncCallbacks;Browser.queuedAsyncCallbacks=[];callbacks.forEach(function(func){func()})}},safeRequestAnimationFrame:function(func){return Browser.requestAnimationFrame(function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}})},safeSetTimeout:function(func,timeout){noExitRuntime=true;return setTimeout(function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}},timeout)},safeSetInterval:function(func,timeout){noExitRuntime=true;return setInterval(function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}},timeout)},getMimetype:function(name){return{"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png","bmp":"image/bmp","ogg":"audio/ogg","wav":"audio/wav","mp3":"audio/mpeg"}[name.substr(name.lastIndexOf(".")+1)]},getUserMedia:function(func){if(!window.getUserMedia){window.getUserMedia=navigator["getUserMedia"]||navigator["mozGetUserMedia"]}window.getUserMedia(func)},getMovementX:function(event){return event["movementX"]||event["mozMovementX"]||event["webkitMovementX"]||0},getMovementY:function(event){return event["movementY"]||event["mozMovementY"]||event["webkitMovementY"]||0},getMouseWheelDelta:function(event){var delta=0;switch(event.type){case"DOMMouseScroll":delta=event.detail/3;break;case"mousewheel":delta=event.wheelDelta/120;break;case"wheel":delta=event.deltaY;switch(event.deltaMode){case 0:delta/=100;break;case 1:delta/=3;break;case 2:delta*=80;break;default:throw"unrecognized mouse wheel delta mode: "+event.deltaMode}break;default:throw"unrecognized mouse wheel event: "+event.type}return delta},mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:function(event){if(Browser.pointerLock){if(event.type!="mousemove"&&"mozMovementX"in event){Browser.mouseMovementX=Browser.mouseMovementY=0}else{Browser.mouseMovementX=Browser.getMovementX(event);Browser.mouseMovementY=Browser.getMovementY(event)}if(typeof SDL!="undefined"){Browser.mouseX=SDL.mouseX+Browser.mouseMovementX;Browser.mouseY=SDL.mouseY+Browser.mouseMovementY}else{Browser.mouseX+=Browser.mouseMovementX;Browser.mouseY+=Browser.mouseMovementY}}else{var rect=Module["canvas"].getBoundingClientRect();var cw=Module["canvas"].width;var ch=Module["canvas"].height;var scrollX=typeof window.scrollX!=="undefined"?window.scrollX:window.pageXOffset;var scrollY=typeof window.scrollY!=="undefined"?window.scrollY:window.pageYOffset;if(event.type==="touchstart"||event.type==="touchend"||event.type==="touchmove"){var touch=event.touch;if(touch===undefined){return}var adjustedX=touch.pageX-(scrollX+rect.left);var adjustedY=touch.pageY-(scrollY+rect.top);adjustedX=adjustedX*(cw/rect.width);adjustedY=adjustedY*(ch/rect.height);var coords={x:adjustedX,y:adjustedY};if(event.type==="touchstart"){Browser.lastTouches[touch.identifier]=coords;Browser.touches[touch.identifier]=coords}else if(event.type==="touchend"||event.type==="touchmove"){var last=Browser.touches[touch.identifier];if(!last)last=coords;Browser.lastTouches[touch.identifier]=last;Browser.touches[touch.identifier]=coords}return}var x=event.pageX-(scrollX+rect.left);var y=event.pageY-(scrollY+rect.top);x=x*(cw/rect.width);y=y*(ch/rect.height);Browser.mouseMovementX=x-Browser.mouseX;Browser.mouseMovementY=y-Browser.mouseY;Browser.mouseX=x;Browser.mouseY=y}},asyncLoad:function(url,onload,onerror,noRunDep){var dep=!noRunDep?getUniqueRunDependency("al "+url):"";readAsync(url,function(arrayBuffer){assert(arrayBuffer,'Loading data file "'+url+'" failed (no arrayBuffer).');onload(new Uint8Array(arrayBuffer));if(dep)removeRunDependency(dep)},function(event){if(onerror){onerror()}else{throw'Loading data file "'+url+'" failed.'}});if(dep)addRunDependency(dep)},resizeListeners:[],updateResizeListeners:function(){var canvas=Module["canvas"];Browser.resizeListeners.forEach(function(listener){listener(canvas.width,canvas.height)})},setCanvasSize:function(width,height,noUpdates){var canvas=Module["canvas"];Browser.updateCanvasDimensions(canvas,width,height);if(!noUpdates)Browser.updateResizeListeners()},windowedWidth:0,windowedHeight:0,setFullscreenCanvasSize:function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen>>2];flags=flags|8388608;HEAP32[SDL.screen>>2]=flags}Browser.updateCanvasDimensions(Module["canvas"]);Browser.updateResizeListeners()},setWindowedCanvasSize:function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen>>2];flags=flags&~8388608;HEAP32[SDL.screen>>2]=flags}Browser.updateCanvasDimensions(Module["canvas"]);Browser.updateResizeListeners()},updateCanvasDimensions:function(canvas,wNative,hNative){if(wNative&&hNative){canvas.widthNative=wNative;canvas.heightNative=hNative}else{wNative=canvas.widthNative;hNative=canvas.heightNative}var w=wNative;var h=hNative;if(Module["forcedAspectRatio"]&&Module["forcedAspectRatio"]>0){if(w/h<Module["forcedAspectRatio"]){w=Math.round(h*Module["forcedAspectRatio"])}else{h=Math.round(w/Module["forcedAspectRatio"])}}if((document["fullscreenElement"]||document["mozFullScreenElement"]||document["msFullscreenElement"]||document["webkitFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvas.parentNode&&typeof screen!="undefined"){var factor=Math.min(screen.width/w,screen.height/h);w=Math.round(w*factor);h=Math.round(h*factor)}if(Browser.resizeCanvas){if(canvas.width!=w)canvas.width=w;if(canvas.height!=h)canvas.height=h;if(typeof canvas.style!="undefined"){canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}else{if(canvas.width!=wNative)canvas.width=wNative;if(canvas.height!=hNative)canvas.height=hNative;if(typeof canvas.style!="undefined"){if(w!=wNative||h!=hNative){canvas.style.setProperty("width",w+"px","important");canvas.style.setProperty("height",h+"px","important")}else{canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}}},wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:function(){var handle=Browser.nextWgetRequestHandle;Browser.nextWgetRequestHandle++;return handle}};var AL={QUEUE_INTERVAL:25,QUEUE_LOOKAHEAD:.1,DEVICE_NAME:"Emscripten OpenAL",CAPTURE_DEVICE_NAME:"Emscripten OpenAL capture",ALC_EXTENSIONS:{ALC_SOFT_pause_device:true,ALC_SOFT_HRTF:true},AL_EXTENSIONS:{AL_EXT_float32:true,AL_SOFT_loop_points:true,AL_SOFT_source_length:true,AL_EXT_source_distance_model:true,AL_SOFT_source_spatialize:true},_alcErr:0,alcErr:0,deviceRefCounts:{},alcStringCache:{},paused:false,stringCache:{},contexts:{},currentCtx:null,buffers:{0:{id:0,refCount:0,audioBuf:null,frequency:0,bytesPerSample:2,channels:1,length:0}},paramArray:[],_nextId:1,newId:function(){return AL.freeIds.length>0?AL.freeIds.pop():AL._nextId++},freeIds:[],scheduleContextAudio:function(ctx){if(Browser.mainLoop.timingMode===1&&document["visibilityState"]!="visible"){return}for(var i in ctx.sources){AL.scheduleSourceAudio(ctx.sources[i])}},scheduleSourceAudio:function(src,lookahead){if(Browser.mainLoop.timingMode===1&&document["visibilityState"]!="visible"){return}if(src.state!==4114){return}var currentTime=AL.updateSourceTime(src);var startTime=src.bufStartTime;var startOffset=src.bufOffset;var bufCursor=src.bufsProcessed;for(var i=0;i<src.audioQueue.length;i++){var audioSrc=src.audioQueue[i];startTime=audioSrc._startTime+audioSrc._duration;startOffset=0;bufCursor+=audioSrc._skipCount+1}if(!lookahead){lookahead=AL.QUEUE_LOOKAHEAD}var lookaheadTime=currentTime+lookahead;var skipCount=0;while(startTime<lookaheadTime){if(bufCursor>=src.bufQueue.length){if(src.looping){bufCursor%=src.bufQueue.length}else{break}}var buf=src.bufQueue[bufCursor%src.bufQueue.length];if(buf.length===0){skipCount++;if(skipCount===src.bufQueue.length){break}}else{var audioSrc=src.context.audioCtx.createBufferSource();audioSrc.buffer=buf.audioBuf;audioSrc.playbackRate.value=src.playbackRate;if(buf.audioBuf._loopStart||buf.audioBuf._loopEnd){audioSrc.loopStart=buf.audioBuf._loopStart;audioSrc.loopEnd=buf.audioBuf._loopEnd}var duration=0;if(src.type===4136&&src.looping){duration=Number.POSITIVE_INFINITY;audioSrc.loop=true;if(buf.audioBuf._loopStart){audioSrc.loopStart=buf.audioBuf._loopStart}if(buf.audioBuf._loopEnd){audioSrc.loopEnd=buf.audioBuf._loopEnd}}else{duration=(buf.audioBuf.duration-startOffset)/src.playbackRate}audioSrc._startOffset=startOffset;audioSrc._duration=duration;audioSrc._skipCount=skipCount;skipCount=0;audioSrc.connect(src.gain);if(typeof audioSrc.start!=="undefined"){startTime=Math.max(startTime,src.context.audioCtx.currentTime);audioSrc.start(startTime,startOffset)}else if(typeof audioSrc.noteOn!=="undefined"){startTime=Math.max(startTime,src.context.audioCtx.currentTime);audioSrc.noteOn(startTime)}audioSrc._startTime=startTime;src.audioQueue.push(audioSrc);startTime+=duration}startOffset=0;bufCursor++}},updateSourceTime:function(src){var currentTime=src.context.audioCtx.currentTime;if(src.state!==4114){return currentTime}if(!isFinite(src.bufStartTime)){src.bufStartTime=currentTime-src.bufOffset/src.playbackRate;src.bufOffset=0}var nextStartTime=0;while(src.audioQueue.length){var audioSrc=src.audioQueue[0];src.bufsProcessed+=audioSrc._skipCount;nextStartTime=audioSrc._startTime+audioSrc._duration;if(currentTime<nextStartTime){break}src.audioQueue.shift();src.bufStartTime=nextStartTime;src.bufOffset=0;src.bufsProcessed++}if(src.bufsProcessed>=src.bufQueue.length&&!src.looping){AL.setSourceState(src,4116)}else if(src.type===4136&&src.looping){var buf=src.bufQueue[0];if(buf.length===0){src.bufOffset=0}else{var delta=(currentTime-src.bufStartTime)*src.playbackRate;var loopStart=buf.audioBuf._loopStart||0;var loopEnd=buf.audioBuf._loopEnd||buf.audioBuf.duration;if(loopEnd<=loopStart){loopEnd=buf.audioBuf.duration}if(delta<loopEnd){src.bufOffset=delta}else{src.bufOffset=loopStart+(delta-loopStart)%(loopEnd-loopStart)}}}else if(src.audioQueue[0]){src.bufOffset=(currentTime-src.audioQueue[0]._startTime)*src.playbackRate}else{if(src.type!==4136&&src.looping){var srcDuration=AL.sourceDuration(src)/src.playbackRate;if(srcDuration>0){src.bufStartTime+=Math.floor((currentTime-src.bufStartTime)/srcDuration)*srcDuration}}for(var i=0;i<src.bufQueue.length;i++){if(src.bufsProcessed>=src.bufQueue.length){if(src.looping){src.bufsProcessed%=src.bufQueue.length}else{AL.setSourceState(src,4116);break}}var buf=src.bufQueue[src.bufsProcessed];if(buf.length>0){nextStartTime=src.bufStartTime+buf.audioBuf.duration/src.playbackRate;if(currentTime<nextStartTime){src.bufOffset=(currentTime-src.bufStartTime)*src.playbackRate;break}src.bufStartTime=nextStartTime}src.bufOffset=0;src.bufsProcessed++}}return currentTime},cancelPendingSourceAudio:function(src){AL.updateSourceTime(src);for(var i=1;i<src.audioQueue.length;i++){var audioSrc=src.audioQueue[i];audioSrc.stop()}if(src.audioQueue.length>1){src.audioQueue.length=1}},stopSourceAudio:function(src){for(var i=0;i<src.audioQueue.length;i++){src.audioQueue[i].stop()}src.audioQueue.length=0},setSourceState:function(src,state){if(state===4114){if(src.state===4114||src.state==4116){src.bufsProcessed=0;src.bufOffset=0}else{}AL.stopSourceAudio(src);src.state=4114;src.bufStartTime=Number.NEGATIVE_INFINITY;AL.scheduleSourceAudio(src)}else if(state===4115){if(src.state===4114){AL.updateSourceTime(src);AL.stopSourceAudio(src);src.state=4115}}else if(state===4116){if(src.state!==4113){src.state=4116;src.bufsProcessed=src.bufQueue.length;src.bufStartTime=Number.NEGATIVE_INFINITY;src.bufOffset=0;AL.stopSourceAudio(src)}}else if(state===4113){if(src.state!==4113){src.state=4113;src.bufsProcessed=0;src.bufStartTime=Number.NEGATIVE_INFINITY;src.bufOffset=0;AL.stopSourceAudio(src)}}},initSourcePanner:function(src){if(src.type===4144){return}var templateBuf=AL.buffers[0];for(var i=0;i<src.bufQueue.length;i++){if(src.bufQueue[i].id!==0){templateBuf=src.bufQueue[i];break}}if(src.spatialize===1||src.spatialize===2&&templateBuf.channels===1){if(src.panner){return}src.panner=src.context.audioCtx.createPanner();AL.updateSourceGlobal(src);AL.updateSourceSpace(src);src.panner.connect(src.context.gain);src.gain.disconnect();src.gain.connect(src.panner)}else{if(!src.panner){return}src.panner.disconnect();src.gain.disconnect();src.gain.connect(src.context.gain);src.panner=null}},updateContextGlobal:function(ctx){for(var i in ctx.sources){AL.updateSourceGlobal(ctx.sources[i])}},updateSourceGlobal:function(src){var panner=src.panner;if(!panner){return}panner.refDistance=src.refDistance;panner.maxDistance=src.maxDistance;panner.rolloffFactor=src.rolloffFactor;panner.panningModel=src.context.hrtf?"HRTF":"equalpower";var distanceModel=src.context.sourceDistanceModel?src.distanceModel:src.context.distanceModel;switch(distanceModel){case 0:panner.distanceModel="inverse";panner.refDistance=3.40282e38;break;case 53249:case 53250:panner.distanceModel="inverse";break;case 53251:case 53252:panner.distanceModel="linear";break;case 53253:case 53254:panner.distanceModel="exponential";break}},updateListenerSpace:function(ctx){var listener=ctx.audioCtx.listener;if(listener.positionX){listener.positionX.value=ctx.listener.position[0];listener.positionY.value=ctx.listener.position[1];listener.positionZ.value=ctx.listener.position[2]}else{listener.setPosition(ctx.listener.position[0],ctx.listener.position[1],ctx.listener.position[2])}if(listener.forwardX){listener.forwardX.value=ctx.listener.direction[0];listener.forwardY.value=ctx.listener.direction[1];listener.forwardZ.value=ctx.listener.direction[2];listener.upX.value=ctx.listener.up[0];listener.upY.value=ctx.listener.up[1];listener.upZ.value=ctx.listener.up[2]}else{listener.setOrientation(ctx.listener.direction[0],ctx.listener.direction[1],ctx.listener.direction[2],ctx.listener.up[0],ctx.listener.up[1],ctx.listener.up[2])}for(var i in ctx.sources){AL.updateSourceSpace(ctx.sources[i])}},updateSourceSpace:function(src){if(!src.panner){return}var panner=src.panner;var posX=src.position[0];var posY=src.position[1];var posZ=src.position[2];var dirX=src.direction[0];var dirY=src.direction[1];var dirZ=src.direction[2];var listener=src.context.listener;var lPosX=listener.position[0];var lPosY=listener.position[1];var lPosZ=listener.position[2];if(src.relative){var lBackX=-listener.direction[0];var lBackY=-listener.direction[1];var lBackZ=-listener.direction[2];var lUpX=listener.up[0];var lUpY=listener.up[1];var lUpZ=listener.up[2];var inverseMagnitude=function(x,y,z){var length=Math.sqrt(x*x+y*y+z*z);if(length<Number.EPSILON){return 0}return 1/length};var invMag=inverseMagnitude(lBackX,lBackY,lBackZ);lBackX*=invMag;lBackY*=invMag;lBackZ*=invMag;invMag=inverseMagnitude(lUpX,lUpY,lUpZ);lUpX*=invMag;lUpY*=invMag;lUpZ*=invMag;var lRightX=lUpY*lBackZ-lUpZ*lBackY;var lRightY=lUpZ*lBackX-lUpX*lBackZ;var lRightZ=lUpX*lBackY-lUpY*lBackX;invMag=inverseMagnitude(lRightX,lRightY,lRightZ);lRightX*=invMag;lRightY*=invMag;lRightZ*=invMag;lUpX=lBackY*lRightZ-lBackZ*lRightY;lUpY=lBackZ*lRightX-lBackX*lRightZ;lUpZ=lBackX*lRightY-lBackY*lRightX;var oldX=dirX;var oldY=dirY;var oldZ=dirZ;dirX=oldX*lRightX+oldY*lUpX+oldZ*lBackX;dirY=oldX*lRightY+oldY*lUpY+oldZ*lBackY;dirZ=oldX*lRightZ+oldY*lUpZ+oldZ*lBackZ;oldX=posX;oldY=posY;oldZ=posZ;posX=oldX*lRightX+oldY*lUpX+oldZ*lBackX;posY=oldX*lRightY+oldY*lUpY+oldZ*lBackY;posZ=oldX*lRightZ+oldY*lUpZ+oldZ*lBackZ;posX+=lPosX;posY+=lPosY;posZ+=lPosZ}if(panner.positionX){panner.positionX.value=posX;panner.positionY.value=posY;panner.positionZ.value=posZ}else{panner.setPosition(posX,posY,posZ)}if(panner.orientationX){panner.orientationX.value=dirX;panner.orientationY.value=dirY;panner.orientationZ.value=dirZ}else{panner.setOrientation(dirX,dirY,dirZ)}var oldShift=src.dopplerShift;var velX=src.velocity[0];var velY=src.velocity[1];var velZ=src.velocity[2];var lVelX=listener.velocity[0];var lVelY=listener.velocity[1];var lVelZ=listener.velocity[2];if(posX===lPosX&&posY===lPosY&&posZ===lPosZ||velX===lVelX&&velY===lVelY&&velZ===lVelZ){src.dopplerShift=1}else{var speedOfSound=src.context.speedOfSound;var dopplerFactor=src.context.dopplerFactor;var slX=lPosX-posX;var slY=lPosY-posY;var slZ=lPosZ-posZ;var magSl=Math.sqrt(slX*slX+slY*slY+slZ*slZ);var vls=(slX*lVelX+slY*lVelY+slZ*lVelZ)/magSl;var vss=(slX*velX+slY*velY+slZ*velZ)/magSl;vls=Math.min(vls,speedOfSound/dopplerFactor);vss=Math.min(vss,speedOfSound/dopplerFactor);src.dopplerShift=(speedOfSound-dopplerFactor*vls)/(speedOfSound-dopplerFactor*vss)}if(src.dopplerShift!==oldShift){AL.updateSourceRate(src)}},updateSourceRate:function(src){if(src.state===4114){AL.cancelPendingSourceAudio(src);var audioSrc=src.audioQueue[0];if(!audioSrc){return}var duration;if(src.type===4136&&src.looping){duration=Number.POSITIVE_INFINITY}else{duration=(audioSrc.buffer.duration-audioSrc._startOffset)/src.playbackRate}audioSrc._duration=duration;audioSrc.playbackRate.value=src.playbackRate;AL.scheduleSourceAudio(src)}},sourceDuration:function(src){var length=0;for(var i=0;i<src.bufQueue.length;i++){var audioBuf=src.bufQueue[i].audioBuf;length+=audioBuf?audioBuf.duration:0}return length},sourceTell:function(src){AL.updateSourceTime(src);var offset=0;for(var i=0;i<src.bufsProcessed;i++){offset+=src.bufQueue[i].audioBuf.duration}offset+=src.bufOffset;return offset},sourceSeek:function(src,offset){var playing=src.state==4114;if(playing){AL.setSourceState(src,4113)}if(src.bufQueue[src.bufsProcessed].audioBuf!==null){src.bufsProcessed=0;while(offset>src.bufQueue[src.bufsProcessed].audioBuf.duration){offset-=src.bufQueue[src.bufsProcessed].audiobuf.duration;src.bufsProcessed++}src.bufOffset=offset}if(playing){AL.setSourceState(src,4114)}},getGlobalParam:function(funcname,param){if(!AL.currentCtx){return null}switch(param){case 49152:return AL.currentCtx.dopplerFactor;case 49155:return AL.currentCtx.speedOfSound;case 53248:return AL.currentCtx.distanceModel;default:AL.currentCtx.err=40962;return null}},setGlobalParam:function(funcname,param,value){if(!AL.currentCtx){return}switch(param){case 49152:if(!Number.isFinite(value)||value<0){AL.currentCtx.err=40963;return}AL.currentCtx.dopplerFactor=value;AL.updateListenerSpace(AL.currentCtx);break;case 49155:if(!Number.isFinite(value)||value<=0){AL.currentCtx.err=40963;return}AL.currentCtx.speedOfSound=value;AL.updateListenerSpace(AL.currentCtx);break;case 53248:switch(value){case 0:case 53249:case 53250:case 53251:case 53252:case 53253:case 53254:AL.currentCtx.distanceModel=value;AL.updateContextGlobal(AL.currentCtx);break;default:AL.currentCtx.err=40963;return}break;default:AL.currentCtx.err=40962;return}},getListenerParam:function(funcname,param){if(!AL.currentCtx){return null}switch(param){case 4100:return AL.currentCtx.listener.position;case 4102:return AL.currentCtx.listener.velocity;case 4111:return AL.currentCtx.listener.direction.concat(AL.currentCtx.listener.up);case 4106:return AL.currentCtx.gain.gain.value;default:AL.currentCtx.err=40962;return null}},setListenerParam:function(funcname,param,value){if(!AL.currentCtx){return}if(value===null){AL.currentCtx.err=40962;return}var listener=AL.currentCtx.listener;switch(param){case 4100:if(!Number.isFinite(value[0])||!Number.isFinite(value[1])||!Number.isFinite(value[2])){AL.currentCtx.err=40963;return}listener.position[0]=value[0];listener.position[1]=value[1];listener.position[2]=value[2];AL.updateListenerSpace(AL.currentCtx);break;case 4102:if(!Number.isFinite(value[0])||!Number.isFinite(value[1])||!Number.isFinite(value[2])){AL.currentCtx.err=40963;return}listener.velocity[0]=value[0];listener.velocity[1]=value[1];listener.velocity[2]=value[2];AL.updateListenerSpace(AL.currentCtx);break;case 4106:if(!Number.isFinite(value)||value<0){AL.currentCtx.err=40963;return}AL.currentCtx.gain.gain.value=value;break;case 4111:if(!Number.isFinite(value[0])||!Number.isFinite(value[1])||!Number.isFinite(value[2])||!Number.isFinite(value[3])||!Number.isFinite(value[4])||!Number.isFinite(value[5])){AL.currentCtx.err=40963;return}listener.direction[0]=value[0];listener.direction[1]=value[1];listener.direction[2]=value[2];listener.up[0]=value[3];listener.up[1]=value[4];listener.up[2]=value[5];AL.updateListenerSpace(AL.currentCtx);break;default:AL.currentCtx.err=40962;return}},getBufferParam:function(funcname,bufferId,param){if(!AL.currentCtx){return}var buf=AL.buffers[bufferId];if(!buf||bufferId===0){AL.currentCtx.err=40961;return}switch(param){case 8193:return buf.frequency;case 8194:return buf.bytesPerSample*8;case 8195:return buf.channels;case 8196:return buf.length*buf.bytesPerSample*buf.channels;case 8213:if(buf.length===0){return[0,0]}else{return[(buf.audioBuf._loopStart||0)*buf.frequency,(buf.audioBuf._loopEnd||buf.length)*buf.frequency]}default:AL.currentCtx.err=40962;return null}},setBufferParam:function(funcname,bufferId,param,value){if(!AL.currentCtx){return}var buf=AL.buffers[bufferId];if(!buf||bufferId===0){AL.currentCtx.err=40961;return}if(value===null){AL.currentCtx.err=40962;return}switch(param){case 8196:if(value!==0){AL.currentCtx.err=40963;return}break;case 8213:if(value[0]<0||value[0]>buf.length||value[1]<0||value[1]>buf.Length||value[0]>=value[1]){AL.currentCtx.err=40963;return}if(buf.refCount>0){AL.currentCtx.err=40964;return}if(buf.audioBuf){buf.audioBuf._loopStart=value[0]/buf.frequency;buf.audioBuf._loopEnd=value[1]/buf.frequency}break;default:AL.currentCtx.err=40962;return}},getSourceParam:function(funcname,sourceId,param){if(!AL.currentCtx){return null}var src=AL.currentCtx.sources[sourceId];if(!src){AL.currentCtx.err=40961;return null}switch(param){case 514:return src.relative;case 4097:return src.coneInnerAngle;case 4098:return src.coneOuterAngle;case 4099:return src.pitch;case 4100:return src.position;case 4101:return src.direction;case 4102:return src.velocity;case 4103:return src.looping;case 4105:if(src.type===4136){return src.bufQueue[0].id}else{return 0}case 4106:return src.gain.gain.value;case 4109:return src.minGain;case 4110:return src.maxGain;case 4112:return src.state;case 4117:if(src.bufQueue.length===1&&src.bufQueue[0].id===0){return 0}else{return src.bufQueue.length}case 4118:if(src.bufQueue.length===1&&src.bufQueue[0].id===0||src.looping){return 0}else{return src.bufsProcessed}case 4128:return src.refDistance;case 4129:return src.rolloffFactor;case 4130:return src.coneOuterGain;case 4131:return src.maxDistance;case 4132:return AL.sourceTell(src);case 4133:var offset=AL.sourceTell(src);if(offset>0){offset*=src.bufQueue[0].frequency}return offset;case 4134:var offset=AL.sourceTell(src);if(offset>0){offset*=src.bufQueue[0].frequency*src.bufQueue[0].bytesPerSample}return offset;case 4135:return src.type;case 4628:return src.spatialize;case 8201:var length=0;var bytesPerFrame=0;for(var i=0;i<src.bufQueue.length;i++){length+=src.bufQueue[i].length;if(src.bufQueue[i].id!==0){bytesPerFrame=src.bufQueue[i].bytesPerSample*src.bufQueue[i].channels}}return length*bytesPerFrame;case 8202:var length=0;for(var i=0;i<src.bufQueue.length;i++){length+=src.bufQueue[i].length}return length;case 8203:return AL.sourceDuration(src);case 53248:return src.distanceModel;default:AL.currentCtx.err=40962;return null}},setSourceParam:function(funcname,sourceId,param,value){if(!AL.currentCtx){return}var src=AL.currentCtx.sources[sourceId];if(!src){AL.currentCtx.err=40961;return}if(value===null){AL.currentCtx.err=40962;return}switch(param){case 514:if(value===1){src.relative=true;AL.updateSourceSpace(src)}else if(value===0){src.relative=false;AL.updateSourceSpace(src)}else{AL.currentCtx.err=40963;return}break;case 4097:if(!Number.isFinite(value)){AL.currentCtx.err=40963;return}src.coneInnerAngle=value;if(src.panner){src.panner.coneInnerAngle=value%360}break;case 4098:if(!Number.isFinite(value)){AL.currentCtx.err=40963;return}src.coneOuterAngle=value;if(src.panner){src.panner.coneOuterAngle=value%360}break;case 4099:if(!Number.isFinite(value)||value<=0){AL.currentCtx.err=40963;return}if(src.pitch===value){break}src.pitch=value;AL.updateSourceRate(src);break;case 4100:if(!Number.isFinite(value[0])||!Number.isFinite(value[1])||!Number.isFinite(value[2])){AL.currentCtx.err=40963;return}src.position[0]=value[0];src.position[1]=value[1];src.position[2]=value[2];AL.updateSourceSpace(src);break;case 4101:if(!Number.isFinite(value[0])||!Number.isFinite(value[1])||!Number.isFinite(value[2])){AL.currentCtx.err=40963;return}src.direction[0]=value[0];src.direction[1]=value[1];src.direction[2]=value[2];AL.updateSourceSpace(src);break;case 4102:if(!Number.isFinite(value[0])||!Number.isFinite(value[1])||!Number.isFinite(value[2])){AL.currentCtx.err=40963;return}src.velocity[0]=value[0];src.velocity[1]=value[1];src.velocity[2]=value[2];AL.updateSourceSpace(src);break;case 4103:if(value===1){src.looping=true;AL.updateSourceTime(src);if(src.type===4136&&src.audioQueue.length>0){var audioSrc=src.audioQueue[0];audioSrc.loop=true;audioSrc._duration=Number.POSITIVE_INFINITY}}else if(value===0){src.looping=false;var currentTime=AL.updateSourceTime(src);if(src.type===4136&&src.audioQueue.length>0){var audioSrc=src.audioQueue[0];audioSrc.loop=false;audioSrc._duration=src.bufQueue[0].audioBuf.duration/src.playbackRate;audioSrc._startTime=currentTime-src.bufOffset/src.playbackRate}}else{AL.currentCtx.err=40963;return}break;case 4105:if(src.state===4114||src.state===4115){AL.currentCtx.err=40964;return}if(value===0){for(var i in src.bufQueue){src.bufQueue[i].refCount--}src.bufQueue.length=1;src.bufQueue[0]=AL.buffers[0];src.bufsProcessed=0;src.type=4144}else{var buf=AL.buffers[value];if(!buf){AL.currentCtx.err=40963;return}for(var i in src.bufQueue){src.bufQueue[i].refCount--}src.bufQueue.length=0;buf.refCount++;src.bufQueue=[buf];src.bufsProcessed=0;src.type=4136}AL.initSourcePanner(src);AL.scheduleSourceAudio(src);break;case 4106:if(!Number.isFinite(value)||value<0){AL.currentCtx.err=40963;return}src.gain.gain.value=value;break;case 4109:if(!Number.isFinite(value)||value<0||value>Math.min(src.maxGain,1)){AL.currentCtx.err=40963;return}src.minGain=value;break;case 4110:if(!Number.isFinite(value)||value<Math.max(0,src.minGain)||value>1){AL.currentCtx.err=40963;return}src.maxGain=value;break;case 4128:if(!Number.isFinite(value)||value<0){AL.currentCtx.err=40963;return}src.refDistance=value;if(src.panner){src.panner.refDistance=value}break;case 4129:if(!Number.isFinite(value)||value<0){AL.currentCtx.err=40963;return}src.rolloffFactor=value;if(src.panner){src.panner.rolloffFactor=value}break;case 4130:if(!Number.isFinite(value)||value<0||value>1){AL.currentCtx.err=40963;return}src.coneOuterGain=value;if(src.panner){src.panner.coneOuterGain=value}break;case 4131:if(!Number.isFinite(value)||value<0){AL.currentCtx.err=40963;return}src.maxDistance=value;if(src.panner){src.panner.maxDistance=value}break;case 4132:if(value<0||value>AL.sourceDuration(src)){AL.currentCtx.err=40963;return}AL.sourceSeek(src,value);break;case 4133:var srcLen=AL.sourceDuration(src);if(srcLen>0){var frequency;for(var bufId in src.bufQueue){if(bufId!==0){frequency=src.bufQueue[bufId].frequency;break}}value/=frequency}if(value<0||value>srcLen){AL.currentCtx.err=40963;return}AL.sourceSeek(src,value);break;case 4134:var srcLen=AL.sourceDuration(src);if(srcLen>0){var bytesPerSec;for(var bufId in src.bufQueue){if(bufId!==0){var buf=src.bufQueue[bufId];bytesPerSec=buf.frequency*buf.bytesPerSample*buf.channels;break}}value/=bytesPerSec}if(value<0||value>srcLen){AL.currentCtx.err=40963;return}AL.sourceSeek(src,value);break;case 4628:if(value!==0&&value!==1&&value!==2){AL.currentCtx.err=40963;return}src.spatialize=value;AL.initSourcePanner(src);break;case 8201:case 8202:case 8203:AL.currentCtx.err=40964;break;case 53248:switch(value){case 0:case 53249:case 53250:case 53251:case 53252:case 53253:case 53254:src.distanceModel=value;if(AL.currentCtx.sourceDistanceModel){AL.updateContextGlobal(AL.currentCtx)}break;default:AL.currentCtx.err=40963;return}break;default:AL.currentCtx.err=40962;return}},captures:{},sharedCaptureAudioCtx:null,requireValidCaptureDevice:function(deviceId,funcname){if(deviceId===0){AL.alcErr=40961;return null}var c=AL.captures[deviceId];if(!c){AL.alcErr=40961;return null}var err=c.mediaStreamError;if(err){AL.alcErr=40961;return null}return c}};function _alBufferData(bufferId,format,pData,size,freq){if(!AL.currentCtx){return}var buf=AL.buffers[bufferId];if(!buf){AL.currentCtx.err=40963;return}if(freq<=0){AL.currentCtx.err=40963;return}var audioBuf=null;try{switch(format){case 4352:if(size>0){audioBuf=AL.currentCtx.audioCtx.createBuffer(1,size,freq);var channel0=audioBuf.getChannelData(0);for(var i=0;i<size;++i){channel0[i]=HEAPU8[pData++]*.0078125-1}}buf.bytesPerSample=1;buf.channels=1;buf.length=size;break;case 4353:if(size>0){audioBuf=AL.currentCtx.audioCtx.createBuffer(1,size>>1,freq);var channel0=audioBuf.getChannelData(0);pData>>=1;for(var i=0;i<size>>1;++i){channel0[i]=HEAP16[pData++]*30517578125e-15}}buf.bytesPerSample=2;buf.channels=1;buf.length=size>>1;break;case 4354:if(size>0){audioBuf=AL.currentCtx.audioCtx.createBuffer(2,size>>1,freq);var channel0=audioBuf.getChannelData(0);var channel1=audioBuf.getChannelData(1);for(var i=0;i<size>>1;++i){channel0[i]=HEAPU8[pData++]*.0078125-1;channel1[i]=HEAPU8[pData++]*.0078125-1}}buf.bytesPerSample=1;buf.channels=2;buf.length=size>>1;break;case 4355:if(size>0){audioBuf=AL.currentCtx.audioCtx.createBuffer(2,size>>2,freq);var channel0=audioBuf.getChannelData(0);var channel1=audioBuf.getChannelData(1);pData>>=1;for(var i=0;i<size>>2;++i){channel0[i]=HEAP16[pData++]*30517578125e-15;channel1[i]=HEAP16[pData++]*30517578125e-15}}buf.bytesPerSample=2;buf.channels=2;buf.length=size>>2;break;case 65552:if(size>0){audioBuf=AL.currentCtx.audioCtx.createBuffer(1,size>>2,freq);var channel0=audioBuf.getChannelData(0);pData>>=2;for(var i=0;i<size>>2;++i){channel0[i]=HEAPF32[pData++]}}buf.bytesPerSample=4;buf.channels=1;buf.length=size>>2;break;case 65553:if(size>0){audioBuf=AL.currentCtx.audioCtx.createBuffer(2,size>>3,freq);var channel0=audioBuf.getChannelData(0);var channel1=audioBuf.getChannelData(1);pData>>=2;for(var i=0;i<size>>3;++i){channel0[i]=HEAPF32[pData++];channel1[i]=HEAPF32[pData++]}}buf.bytesPerSample=4;buf.channels=2;buf.length=size>>3;break;default:AL.currentCtx.err=40963;return}buf.frequency=freq;buf.audioBuf=audioBuf}catch(e){AL.currentCtx.err=40963;return}}function _alDeleteBuffers(count,pBufferIds){if(!AL.currentCtx){return}for(var i=0;i<count;++i){var bufId=HEAP32[pBufferIds+i*4>>2];if(bufId===0){continue}if(!AL.buffers[bufId]){AL.currentCtx.err=40961;return}if(AL.buffers[bufId].refCount){AL.currentCtx.err=40964;return}}for(var i=0;i<count;++i){var bufId=HEAP32[pBufferIds+i*4>>2];if(bufId===0){continue}AL.deviceRefCounts[AL.buffers[bufId].deviceId]--;delete AL.buffers[bufId];AL.freeIds.push(bufId)}}function _alSourcei(sourceId,param,value){switch(param){case 514:case 4097:case 4098:case 4103:case 4105:case 4128:case 4129:case 4131:case 4132:case 4133:case 4134:case 4628:case 8201:case 8202:case 53248:AL.setSourceParam("alSourcei",sourceId,param,value);break;default:AL.setSourceParam("alSourcei",sourceId,param,null);break}}function _alDeleteSources(count,pSourceIds){if(!AL.currentCtx){return}for(var i=0;i<count;++i){var srcId=HEAP32[pSourceIds+i*4>>2];if(!AL.currentCtx.sources[srcId]){AL.currentCtx.err=40961;return}}for(var i=0;i<count;++i){var srcId=HEAP32[pSourceIds+i*4>>2];AL.setSourceState(AL.currentCtx.sources[srcId],4116);_alSourcei(srcId,4105,0);delete AL.currentCtx.sources[srcId];AL.freeIds.push(srcId)}}function _alGenBuffers(count,pBufferIds){if(!AL.currentCtx){return}for(var i=0;i<count;++i){var buf={deviceId:AL.currentCtx.deviceId,id:AL.newId(),refCount:0,audioBuf:null,frequency:0,bytesPerSample:2,channels:1,length:0};AL.deviceRefCounts[buf.deviceId]++;AL.buffers[buf.id]=buf;HEAP32[pBufferIds+i*4>>2]=buf.id}}function _alGenSources(count,pSourceIds){if(!AL.currentCtx){return}for(var i=0;i<count;++i){var gain=AL.currentCtx.audioCtx.createGain();gain.connect(AL.currentCtx.gain);var src={context:AL.currentCtx,id:AL.newId(),type:4144,state:4113,bufQueue:[AL.buffers[0]],audioQueue:[],looping:false,pitch:1,dopplerShift:1,gain:gain,minGain:0,maxGain:1,panner:null,bufsProcessed:0,bufStartTime:Number.NEGATIVE_INFINITY,bufOffset:0,relative:false,refDistance:1,maxDistance:3.40282e38,rolloffFactor:1,position:[0,0,0],velocity:[0,0,0],direction:[0,0,0],coneOuterGain:0,coneInnerAngle:360,coneOuterAngle:360,distanceModel:53250,spatialize:2,get playbackRate(){return this.pitch*this.dopplerShift}};AL.currentCtx.sources[src.id]=src;HEAP32[pSourceIds+i*4>>2]=src.id}}function _alGetSourcei(sourceId,param,pValue){var val=AL.getSourceParam("alGetSourcei",sourceId,param);if(val===null){return}if(!pValue){AL.currentCtx.err=40963;return}switch(param){case 514:case 4097:case 4098:case 4103:case 4105:case 4112:case 4117:case 4118:case 4128:case 4129:case 4131:case 4132:case 4133:case 4134:case 4135:case 4628:case 8201:case 8202:case 53248:HEAP32[pValue>>2]=val;break;default:AL.currentCtx.err=40962;return}}function _alListenerfv(param,pValues){if(!AL.currentCtx){return}if(!pValues){AL.currentCtx.err=40963;return}switch(param){case 4100:case 4102:AL.paramArray[0]=HEAPF32[pValues>>2];AL.paramArray[1]=HEAPF32[pValues+4>>2];AL.paramArray[2]=HEAPF32[pValues+8>>2];AL.setListenerParam("alListenerfv",param,AL.paramArray);break;case 4111:AL.paramArray[0]=HEAPF32[pValues>>2];AL.paramArray[1]=HEAPF32[pValues+4>>2];AL.paramArray[2]=HEAPF32[pValues+8>>2];AL.paramArray[3]=HEAPF32[pValues+12>>2];AL.paramArray[4]=HEAPF32[pValues+16>>2];AL.paramArray[5]=HEAPF32[pValues+20>>2];AL.setListenerParam("alListenerfv",param,AL.paramArray);break;default:AL.setListenerParam("alListenerfv",param,null);break}}function _alSourcePause(sourceId){if(!AL.currentCtx){return}var src=AL.currentCtx.sources[sourceId];if(!src){AL.currentCtx.err=40961;return}AL.setSourceState(src,4115)}function _alSourcePlay(sourceId){if(!AL.currentCtx){return}var src=AL.currentCtx.sources[sourceId];if(!src){AL.currentCtx.err=40961;return}AL.setSourceState(src,4114)}function _alSourceStop(sourceId){if(!AL.currentCtx){return}var src=AL.currentCtx.sources[sourceId];if(!src){AL.currentCtx.err=40961;return}AL.setSourceState(src,4116)}function _alSourcef(sourceId,param,value){switch(param){case 4097:case 4098:case 4099:case 4106:case 4109:case 4110:case 4128:case 4129:case 4130:case 4131:case 4132:case 4133:case 4134:case 8203:AL.setSourceParam("alSourcef",sourceId,param,value);break;default:AL.setSourceParam("alSourcef",sourceId,param,null);break}}function _alSourcefv(sourceId,param,pValues){if(!AL.currentCtx){return}if(!pValues){AL.currentCtx.err=40963;return}switch(param){case 4097:case 4098:case 4099:case 4106:case 4109:case 4110:case 4128:case 4129:case 4130:case 4131:case 4132:case 4133:case 4134:case 8203:var val=HEAPF32[pValues>>2];AL.setSourceParam("alSourcefv",sourceId,param,val);break;case 4100:case 4101:case 4102:AL.paramArray[0]=HEAPF32[pValues>>2];AL.paramArray[1]=HEAPF32[pValues+4>>2];AL.paramArray[2]=HEAPF32[pValues+8>>2];AL.setSourceParam("alSourcefv",sourceId,param,AL.paramArray);break;default:AL.setSourceParam("alSourcefv",sourceId,param,null);break}}function _alcCreateContext(deviceId,pAttrList){if(!(deviceId in AL.deviceRefCounts)){AL.alcErr=40961;return 0}var options=null;var attrs=[];var hrtf=null;pAttrList>>=2;if(pAttrList){var attr=0;var val=0;while(true){attr=HEAP32[pAttrList++];attrs.push(attr);if(attr===0){break}val=HEAP32[pAttrList++];attrs.push(val);switch(attr){case 4103:if(!options){options={}}options.sampleRate=val;break;case 4112:case 4113:break;case 6546:switch(val){case 0:hrtf=false;break;case 1:hrtf=true;break;case 2:break;default:AL.alcErr=40964;return 0}break;case 6550:if(val!==0){AL.alcErr=40964;return 0}break;default:AL.alcErr=40964;return 0}}}var AudioContext=window.AudioContext||window.webkitAudioContext;var ac=null;try{if(options){ac=new AudioContext(options)}else{ac=new AudioContext}}catch(e){if(e.name==="NotSupportedError"){AL.alcErr=40964}else{AL.alcErr=40961}return 0}if(typeof ac.createGain==="undefined"){ac.createGain=ac.createGainNode}var gain=ac.createGain();gain.connect(ac.destination);var ctx={deviceId:deviceId,id:AL.newId(),attrs:attrs,audioCtx:ac,listener:{position:[0,0,0],velocity:[0,0,0],direction:[0,0,0],up:[0,0,0]},sources:[],interval:setInterval(function(){AL.scheduleContextAudio(ctx)},AL.QUEUE_INTERVAL),gain:gain,distanceModel:53250,speedOfSound:343.3,dopplerFactor:1,sourceDistanceModel:false,hrtf:hrtf||false,_err:0,get err(){return this._err},set err(val){if(this._err===0||val===0){this._err=val}}};AL.deviceRefCounts[deviceId]++;AL.contexts[ctx.id]=ctx;if(hrtf!==null){for(var ctxId in AL.contexts){var c=AL.contexts[ctxId];if(c.deviceId===deviceId){c.hrtf=hrtf;AL.updateContextGlobal(c)}}}return ctx.id}function _alcMakeContextCurrent(contextId){if(contextId===0){AL.currentCtx=null;return 0}else{AL.currentCtx=AL.contexts[contextId];return 1}}function _alcOpenDevice(pDeviceName){if(pDeviceName){var name=UTF8ToString(pDeviceName);if(name!==AL.DEVICE_NAME){return 0}}if(typeof AudioContext!=="undefined"||typeof webkitAudioContext!=="undefined"){var deviceId=AL.newId();AL.deviceRefCounts[deviceId]=0;return deviceId}else{return 0}}function _emscripten_get_now_is_monotonic(){return 0||ENVIRONMENT_IS_NODE||typeof dateNow!=="undefined"||typeof performance==="object"&&performance&&typeof performance["now"]==="function"}function _clock_gettime(clk_id,tp){var now;if(clk_id===0){now=Date.now()}else if(clk_id===1&&_emscripten_get_now_is_monotonic()){now=_emscripten_get_now()}else{___setErrNo(22);return-1}HEAP32[tp>>2]=now/1e3|0;HEAP32[tp+4>>2]=now%1e3*1e3*1e3|0;return 0}var EGL={errorCode:12288,defaultDisplayInitialized:false,currentContext:0,currentReadSurface:0,currentDrawSurface:0,contextAttributes:{alpha:false,depth:false,stencil:false,antialias:false},stringCache:{},setErrorCode:function(code){EGL.errorCode=code},chooseConfig:function(display,attribList,config,config_size,numConfigs){if(display!=62e3){EGL.setErrorCode(12296);return 0}if(attribList){for(;;){var param=HEAP32[attribList>>2];if(param==12321){var alphaSize=HEAP32[attribList+4>>2];EGL.contextAttributes.alpha=alphaSize>0}else if(param==12325){var depthSize=HEAP32[attribList+4>>2];EGL.contextAttributes.depth=depthSize>0}else if(param==12326){var stencilSize=HEAP32[attribList+4>>2];EGL.contextAttributes.stencil=stencilSize>0}else if(param==12337){var samples=HEAP32[attribList+4>>2];EGL.contextAttributes.antialias=samples>0}else if(param==12338){var samples=HEAP32[attribList+4>>2];EGL.contextAttributes.antialias=samples==1}else if(param==12544){var requestedPriority=HEAP32[attribList+4>>2];EGL.contextAttributes.lowLatency=requestedPriority!=12547}else if(param==12344){break}attribList+=8}}if((!config||!config_size)&&!numConfigs){EGL.setErrorCode(12300);return 0}if(numConfigs){HEAP32[numConfigs>>2]=1}if(config&&config_size>0){HEAP32[config>>2]=62002}EGL.setErrorCode(12288);return 1}};function _eglGetProcAddress(name_){return _emscripten_GetProcAddress(name_)}function _emscripten_get_heap_size(){return HEAP8.length}var GL={counter:1,lastError:0,buffers:[],mappedBuffers:{},programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],vaos:[],contexts:{},currentContext:null,offscreenCanvases:{},timerQueriesEXT:[],programInfos:{},stringCache:{},unpackAlignment:4,init:function(){GL.miniTempBuffer=new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);for(var i=0;i<GL.MINI_TEMP_BUFFER_SIZE;i++){GL.miniTempBufferViews[i]=GL.miniTempBuffer.subarray(0,i+1)}},recordError:function recordError(errorCode){if(!GL.lastError){GL.lastError=errorCode}},getNewId:function(table){var ret=GL.counter++;for(var i=table.length;i<ret;i++){table[i]=null}return ret},MINI_TEMP_BUFFER_SIZE:256,miniTempBuffer:null,miniTempBufferViews:[0],getSource:function(shader,count,string,length){var source="";for(var i=0;i<count;++i){var len=length?HEAP32[length+i*4>>2]:-1;source+=UTF8ToString(HEAP32[string+i*4>>2],len<0?undefined:len)}return source},createContext:function(canvas,webGLContextAttributes){var ctx=canvas.getContext("webgl",webGLContextAttributes)||canvas.getContext("experimental-webgl",webGLContextAttributes);return ctx?GL.registerContext(ctx,webGLContextAttributes):0},registerContext:function(ctx,webGLContextAttributes){var handle=_malloc(8);var context={handle:handle,attributes:webGLContextAttributes,version:webGLContextAttributes.majorVersion,GLctx:ctx};if(ctx.canvas)ctx.canvas.GLctxObject=context;GL.contexts[handle]=context;if(typeof webGLContextAttributes.enableExtensionsByDefault==="undefined"||webGLContextAttributes.enableExtensionsByDefault){GL.initExtensions(context)}return handle},makeContextCurrent:function(contextHandle){GL.currentContext=GL.contexts[contextHandle];Module.ctx=GLctx=GL.currentContext&&GL.currentContext.GLctx;return!(contextHandle&&!GLctx)},getContext:function(contextHandle){return GL.contexts[contextHandle]},deleteContext:function(contextHandle){if(GL.currentContext===GL.contexts[contextHandle])GL.currentContext=null;if(typeof JSEvents==="object")JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);if(GL.contexts[contextHandle]&&GL.contexts[contextHandle].GLctx.canvas)GL.contexts[contextHandle].GLctx.canvas.GLctxObject=undefined;_free(GL.contexts[contextHandle]);GL.contexts[contextHandle]=null},acquireInstancedArraysExtension:function(ctx){var ext=ctx.getExtension("ANGLE_instanced_arrays");if(ext){ctx["vertexAttribDivisor"]=function(index,divisor){ext["vertexAttribDivisorANGLE"](index,divisor)};ctx["drawArraysInstanced"]=function(mode,first,count,primcount){ext["drawArraysInstancedANGLE"](mode,first,count,primcount)};ctx["drawElementsInstanced"]=function(mode,count,type,indices,primcount){ext["drawElementsInstancedANGLE"](mode,count,type,indices,primcount)}}},acquireVertexArrayObjectExtension:function(ctx){var ext=ctx.getExtension("OES_vertex_array_object");if(ext){ctx["createVertexArray"]=function(){return ext["createVertexArrayOES"]()};ctx["deleteVertexArray"]=function(vao){ext["deleteVertexArrayOES"](vao)};ctx["bindVertexArray"]=function(vao){ext["bindVertexArrayOES"](vao)};ctx["isVertexArray"]=function(vao){return ext["isVertexArrayOES"](vao)}}},acquireDrawBuffersExtension:function(ctx){var ext=ctx.getExtension("WEBGL_draw_buffers");if(ext){ctx["drawBuffers"]=function(n,bufs){ext["drawBuffersWEBGL"](n,bufs)}}},initExtensions:function(context){if(!context)context=GL.currentContext;if(context.initExtensionsDone)return;context.initExtensionsDone=true;var GLctx=context.GLctx;if(context.version<2){GL.acquireInstancedArraysExtension(GLctx);GL.acquireVertexArrayObjectExtension(GLctx);GL.acquireDrawBuffersExtension(GLctx)}GLctx.disjointTimerQueryExt=GLctx.getExtension("EXT_disjoint_timer_query");var automaticallyEnabledExtensions=["OES_texture_float","OES_texture_half_float","OES_standard_derivatives","OES_vertex_array_object","WEBGL_compressed_texture_s3tc","WEBGL_depth_texture","OES_element_index_uint","EXT_texture_filter_anisotropic","EXT_frag_depth","WEBGL_draw_buffers","ANGLE_instanced_arrays","OES_texture_float_linear","OES_texture_half_float_linear","EXT_blend_minmax","EXT_shader_texture_lod","WEBGL_compressed_texture_pvrtc","EXT_color_buffer_half_float","WEBGL_color_buffer_float","EXT_sRGB","WEBGL_compressed_texture_etc1","EXT_disjoint_timer_query","WEBGL_compressed_texture_etc","WEBGL_compressed_texture_astc","EXT_color_buffer_float","WEBGL_compressed_texture_s3tc_srgb","EXT_disjoint_timer_query_webgl2"];var exts=GLctx.getSupportedExtensions()||[];exts.forEach(function(ext){if(automaticallyEnabledExtensions.indexOf(ext)!=-1){GLctx.getExtension(ext)}})},populateUniformTable:function(program){var p=GL.programs[program];var ptable=GL.programInfos[program]={uniforms:{},maxUniformLength:0,maxAttributeLength:-1,maxUniformBlockNameLength:-1};var utable=ptable.uniforms;var numUniforms=GLctx.getProgramParameter(p,35718);for(var i=0;i<numUniforms;++i){var u=GLctx.getActiveUniform(p,i);var name=u.name;ptable.maxUniformLength=Math.max(ptable.maxUniformLength,name.length+1);if(name.slice(-1)=="]"){name=name.slice(0,name.lastIndexOf("["))}var loc=GLctx.getUniformLocation(p,name);if(loc){var id=GL.getNewId(GL.uniforms);utable[name]=[u.size,id];GL.uniforms[id]=loc;for(var j=1;j<u.size;++j){var n=name+"["+j+"]";loc=GLctx.getUniformLocation(p,n);id=GL.getNewId(GL.uniforms);GL.uniforms[id]=loc}}}}};function _emscripten_glActiveTexture(x0){GLctx["activeTexture"](x0)}function _emscripten_glAttachShader(program,shader){GLctx.attachShader(GL.programs[program],GL.shaders[shader])}function _emscripten_glBeginQueryEXT(target,id){GLctx.disjointTimerQueryExt["beginQueryEXT"](target,GL.timerQueriesEXT[id])}function _emscripten_glBindAttribLocation(program,index,name){GLctx.bindAttribLocation(GL.programs[program],index,UTF8ToString(name))}function _emscripten_glBindBuffer(target,buffer){GLctx.bindBuffer(target,GL.buffers[buffer])}function _emscripten_glBindFramebuffer(target,framebuffer){GLctx.bindFramebuffer(target,GL.framebuffers[framebuffer])}function _emscripten_glBindRenderbuffer(target,renderbuffer){GLctx.bindRenderbuffer(target,GL.renderbuffers[renderbuffer])}function _emscripten_glBindTexture(target,texture){GLctx.bindTexture(target,GL.textures[texture])}function _emscripten_glBindVertexArrayOES(vao){GLctx["bindVertexArray"](GL.vaos[vao])}function _emscripten_glBlendColor(x0,x1,x2,x3){GLctx["blendColor"](x0,x1,x2,x3)}function _emscripten_glBlendEquation(x0){GLctx["blendEquation"](x0)}function _emscripten_glBlendEquationSeparate(x0,x1){GLctx["blendEquationSeparate"](x0,x1)}function _emscripten_glBlendFunc(x0,x1){GLctx["blendFunc"](x0,x1)}function _emscripten_glBlendFuncSeparate(x0,x1,x2,x3){GLctx["blendFuncSeparate"](x0,x1,x2,x3)}function _emscripten_glBufferData(target,size,data,usage){GLctx.bufferData(target,data?HEAPU8.subarray(data,data+size):size,usage)}function _emscripten_glBufferSubData(target,offset,size,data){GLctx.bufferSubData(target,offset,HEAPU8.subarray(data,data+size))}function _emscripten_glCheckFramebufferStatus(x0){return GLctx["checkFramebufferStatus"](x0)}function _emscripten_glClear(x0){GLctx["clear"](x0)}function _emscripten_glClearColor(x0,x1,x2,x3){GLctx["clearColor"](x0,x1,x2,x3)}function _emscripten_glClearDepthf(x0){GLctx["clearDepth"](x0)}function _emscripten_glClearStencil(x0){GLctx["clearStencil"](x0)}function _emscripten_glColorMask(red,green,blue,alpha){GLctx.colorMask(!!red,!!green,!!blue,!!alpha)}function _emscripten_glCompileShader(shader){GLctx.compileShader(GL.shaders[shader])}function _emscripten_glCompressedTexImage2D(target,level,internalFormat,width,height,border,imageSize,data){GLctx["compressedTexImage2D"](target,level,internalFormat,width,height,border,data?HEAPU8.subarray(data,data+imageSize):null)}function _emscripten_glCompressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,imageSize,data){GLctx["compressedTexSubImage2D"](target,level,xoffset,yoffset,width,height,format,data?HEAPU8.subarray(data,data+imageSize):null)}function _emscripten_glCopyTexImage2D(x0,x1,x2,x3,x4,x5,x6,x7){GLctx["copyTexImage2D"](x0,x1,x2,x3,x4,x5,x6,x7)}function _emscripten_glCopyTexSubImage2D(x0,x1,x2,x3,x4,x5,x6,x7){GLctx["copyTexSubImage2D"](x0,x1,x2,x3,x4,x5,x6,x7)}function _emscripten_glCreateProgram(){var id=GL.getNewId(GL.programs);var program=GLctx.createProgram();program.name=id;GL.programs[id]=program;return id}function _emscripten_glCreateShader(shaderType){var id=GL.getNewId(GL.shaders);GL.shaders[id]=GLctx.createShader(shaderType);return id}function _emscripten_glCullFace(x0){GLctx["cullFace"](x0)}function _emscripten_glDeleteBuffers(n,buffers){for(var i=0;i<n;i++){var id=HEAP32[buffers+i*4>>2];var buffer=GL.buffers[id];if(!buffer)continue;GLctx.deleteBuffer(buffer);buffer.name=0;GL.buffers[id]=null;if(id==GL.currArrayBuffer)GL.currArrayBuffer=0;if(id==GL.currElementArrayBuffer)GL.currElementArrayBuffer=0}}function _emscripten_glDeleteFramebuffers(n,framebuffers){for(var i=0;i<n;++i){var id=HEAP32[framebuffers+i*4>>2];var framebuffer=GL.framebuffers[id];if(!framebuffer)continue;GLctx.deleteFramebuffer(framebuffer);framebuffer.name=0;GL.framebuffers[id]=null}}function _emscripten_glDeleteProgram(id){if(!id)return;var program=GL.programs[id];if(!program){GL.recordError(1281);return}GLctx.deleteProgram(program);program.name=0;GL.programs[id]=null;GL.programInfos[id]=null}function _emscripten_glDeleteQueriesEXT(n,ids){for(var i=0;i<n;i++){var id=HEAP32[ids+i*4>>2];var query=GL.timerQueriesEXT[id];if(!query)continue;GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);GL.timerQueriesEXT[id]=null}}function _emscripten_glDeleteRenderbuffers(n,renderbuffers){for(var i=0;i<n;i++){var id=HEAP32[renderbuffers+i*4>>2];var renderbuffer=GL.renderbuffers[id];if(!renderbuffer)continue;GLctx.deleteRenderbuffer(renderbuffer);renderbuffer.name=0;GL.renderbuffers[id]=null}}function _emscripten_glDeleteShader(id){if(!id)return;var shader=GL.shaders[id];if(!shader){GL.recordError(1281);return}GLctx.deleteShader(shader);GL.shaders[id]=null}function _emscripten_glDeleteTextures(n,textures){for(var i=0;i<n;i++){var id=HEAP32[textures+i*4>>2];var texture=GL.textures[id];if(!texture)continue;GLctx.deleteTexture(texture);texture.name=0;GL.textures[id]=null}}function _emscripten_glDeleteVertexArraysOES(n,vaos){for(var i=0;i<n;i++){var id=HEAP32[vaos+i*4>>2];GLctx["deleteVertexArray"](GL.vaos[id]);GL.vaos[id]=null}}function _emscripten_glDepthFunc(x0){GLctx["depthFunc"](x0)}function _emscripten_glDepthMask(flag){GLctx.depthMask(!!flag)}function _emscripten_glDepthRangef(x0,x1){GLctx["depthRange"](x0,x1)}function _emscripten_glDetachShader(program,shader){GLctx.detachShader(GL.programs[program],GL.shaders[shader])}function _emscripten_glDisable(x0){GLctx["disable"](x0)}function _emscripten_glDisableVertexAttribArray(index){GLctx.disableVertexAttribArray(index)}function _emscripten_glDrawArrays(mode,first,count){GLctx.drawArrays(mode,first,count)}function _emscripten_glDrawArraysInstancedANGLE(mode,first,count,primcount){GLctx["drawArraysInstanced"](mode,first,count,primcount)}var __tempFixedLengthArray=[];function _emscripten_glDrawBuffersWEBGL(n,bufs){var bufArray=__tempFixedLengthArray[n];for(var i=0;i<n;i++){bufArray[i]=HEAP32[bufs+i*4>>2]}GLctx["drawBuffers"](bufArray)}function _emscripten_glDrawElements(mode,count,type,indices){GLctx.drawElements(mode,count,type,indices)}function _emscripten_glDrawElementsInstancedANGLE(mode,count,type,indices,primcount){GLctx["drawElementsInstanced"](mode,count,type,indices,primcount)}function _emscripten_glEnable(x0){GLctx["enable"](x0)}function _emscripten_glEnableVertexAttribArray(index){GLctx.enableVertexAttribArray(index)}function _emscripten_glEndQueryEXT(target){GLctx.disjointTimerQueryExt["endQueryEXT"](target)}function _emscripten_glFinish(){GLctx["finish"]()}function _emscripten_glFlush(){GLctx["flush"]()}function _emscripten_glFramebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer){GLctx.framebufferRenderbuffer(target,attachment,renderbuffertarget,GL.renderbuffers[renderbuffer])}function _emscripten_glFramebufferTexture2D(target,attachment,textarget,texture,level){GLctx.framebufferTexture2D(target,attachment,textarget,GL.textures[texture],level)}function _emscripten_glFrontFace(x0){GLctx["frontFace"](x0)}function __glGenObject(n,buffers,createFunction,objectTable){for(var i=0;i<n;i++){var buffer=GLctx[createFunction]();var id=buffer&&GL.getNewId(objectTable);if(buffer){buffer.name=id;objectTable[id]=buffer}else{GL.recordError(1282)}HEAP32[buffers+i*4>>2]=id}}function _emscripten_glGenBuffers(n,buffers){__glGenObject(n,buffers,"createBuffer",GL.buffers)}function _emscripten_glGenFramebuffers(n,ids){__glGenObject(n,ids,"createFramebuffer",GL.framebuffers)}function _emscripten_glGenQueriesEXT(n,ids){for(var i=0;i<n;i++){var query=GLctx.disjointTimerQueryExt["createQueryEXT"]();if(!query){GL.recordError(1282);while(i<n)HEAP32[ids+i++*4>>2]=0;return}var id=GL.getNewId(GL.timerQueriesEXT);query.name=id;GL.timerQueriesEXT[id]=query;HEAP32[ids+i*4>>2]=id}}function _emscripten_glGenRenderbuffers(n,renderbuffers){__glGenObject(n,renderbuffers,"createRenderbuffer",GL.renderbuffers)}function _emscripten_glGenTextures(n,textures){__glGenObject(n,textures,"createTexture",GL.textures)}function _emscripten_glGenVertexArraysOES(n,arrays){__glGenObject(n,arrays,"createVertexArray",GL.vaos)}function _emscripten_glGenerateMipmap(x0){GLctx["generateMipmap"](x0)}function _emscripten_glGetActiveAttrib(program,index,bufSize,length,size,type,name){program=GL.programs[program];var info=GLctx.getActiveAttrib(program,index);if(!info)return;var numBytesWrittenExclNull=bufSize>0&&name?stringToUTF8(info.name,name,bufSize):0;if(length)HEAP32[length>>2]=numBytesWrittenExclNull;if(size)HEAP32[size>>2]=info.size;if(type)HEAP32[type>>2]=info.type}function _emscripten_glGetActiveUniform(program,index,bufSize,length,size,type,name){program=GL.programs[program];var info=GLctx.getActiveUniform(program,index);if(!info)return;var numBytesWrittenExclNull=bufSize>0&&name?stringToUTF8(info.name,name,bufSize):0;if(length)HEAP32[length>>2]=numBytesWrittenExclNull;if(size)HEAP32[size>>2]=info.size;if(type)HEAP32[type>>2]=info.type}function _emscripten_glGetAttachedShaders(program,maxCount,count,shaders){var result=GLctx.getAttachedShaders(GL.programs[program]);var len=result.length;if(len>maxCount){len=maxCount}HEAP32[count>>2]=len;for(var i=0;i<len;++i){var id=GL.shaders.indexOf(result[i]);HEAP32[shaders+i*4>>2]=id}}function _emscripten_glGetAttribLocation(program,name){return GLctx.getAttribLocation(GL.programs[program],UTF8ToString(name))}function emscriptenWebGLGet(name_,p,type){if(!p){GL.recordError(1281);return}var ret=undefined;switch(name_){case 36346:ret=1;break;case 36344:if(type!=0&&type!=1){GL.recordError(1280)}return;case 36345:ret=0;break;case 34466:var formats=GLctx.getParameter(34467);ret=formats?formats.length:0;break}if(ret===undefined){var result=GLctx.getParameter(name_);switch(typeof result){case"number":ret=result;break;case"boolean":ret=result?1:0;break;case"string":GL.recordError(1280);return;case"object":if(result===null){switch(name_){case 34964:case 35725:case 34965:case 36006:case 36007:case 32873:case 34229:case 34068:{ret=0;break}default:{GL.recordError(1280);return}}}else if(result instanceof Float32Array||result instanceof Uint32Array||result instanceof Int32Array||result instanceof Array){for(var i=0;i<result.length;++i){switch(type){case 0:HEAP32[p+i*4>>2]=result[i];break;case 2:HEAPF32[p+i*4>>2]=result[i];break;case 4:HEAP8[p+i>>0]=result[i]?1:0;break}}return}else{try{ret=result.name|0}catch(e){GL.recordError(1280);err("GL_INVALID_ENUM in glGet"+type+"v: Unknown object returned from WebGL getParameter("+name_+")! (error: "+e+")");return}}break;default:GL.recordError(1280);err("GL_INVALID_ENUM in glGet"+type+"v: Native code calling glGet"+type+"v("+name_+") and it returns "+result+" of type "+typeof result+"!");return}}switch(type){case 1:tempI64=[ret>>>0,(tempDouble=ret,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[p>>2]=tempI64[0],HEAP32[p+4>>2]=tempI64[1];break;case 0:HEAP32[p>>2]=ret;break;case 2:HEAPF32[p>>2]=ret;break;case 4:HEAP8[p>>0]=ret?1:0;break}}function _emscripten_glGetBooleanv(name_,p){emscriptenWebGLGet(name_,p,4)}function _emscripten_glGetBufferParameteriv(target,value,data){if(!data){GL.recordError(1281);return}HEAP32[data>>2]=GLctx.getBufferParameter(target,value)}function _emscripten_glGetError(){var error=GLctx.getError()||GL.lastError;GL.lastError=0;return error}function _emscripten_glGetFloatv(name_,p){emscriptenWebGLGet(name_,p,2)}function _emscripten_glGetFramebufferAttachmentParameteriv(target,attachment,pname,params){var result=GLctx.getFramebufferAttachmentParameter(target,attachment,pname);if(result instanceof WebGLRenderbuffer||result instanceof WebGLTexture){result=result.name|0}HEAP32[params>>2]=result}function _emscripten_glGetIntegerv(name_,p){emscriptenWebGLGet(name_,p,0)}function _emscripten_glGetProgramInfoLog(program,maxLength,length,infoLog){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";var numBytesWrittenExclNull=maxLength>0&&infoLog?stringToUTF8(log,infoLog,maxLength):0;if(length)HEAP32[length>>2]=numBytesWrittenExclNull}function _emscripten_glGetProgramiv(program,pname,p){if(!p){GL.recordError(1281);return}if(program>=GL.counter){GL.recordError(1281);return}var ptable=GL.programInfos[program];if(!ptable){GL.recordError(1282);return}if(pname==35716){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1}else if(pname==35719){HEAP32[p>>2]=ptable.maxUniformLength}else if(pname==35722){if(ptable.maxAttributeLength==-1){program=GL.programs[program];var numAttribs=GLctx.getProgramParameter(program,35721);ptable.maxAttributeLength=0;for(var i=0;i<numAttribs;++i){var activeAttrib=GLctx.getActiveAttrib(program,i);ptable.maxAttributeLength=Math.max(ptable.maxAttributeLength,activeAttrib.name.length+1)}}HEAP32[p>>2]=ptable.maxAttributeLength}else if(pname==35381){if(ptable.maxUniformBlockNameLength==-1){program=GL.programs[program];var numBlocks=GLctx.getProgramParameter(program,35382);ptable.maxUniformBlockNameLength=0;for(var i=0;i<numBlocks;++i){var activeBlockName=GLctx.getActiveUniformBlockName(program,i);ptable.maxUniformBlockNameLength=Math.max(ptable.maxUniformBlockNameLength,activeBlockName.length+1)}}HEAP32[p>>2]=ptable.maxUniformBlockNameLength}else{HEAP32[p>>2]=GLctx.getProgramParameter(GL.programs[program],pname)}}function _emscripten_glGetQueryObjecti64vEXT(id,pname,params){if(!params){GL.recordError(1281);return}var query=GL.timerQueriesEXT[id];var param=GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query,pname);var ret;if(typeof param=="boolean"){ret=param?1:0}else{ret=param}tempI64=[ret>>>0,(tempDouble=ret,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[params>>2]=tempI64[0],HEAP32[params+4>>2]=tempI64[1]}function _emscripten_glGetQueryObjectivEXT(id,pname,params){if(!params){GL.recordError(1281);return}var query=GL.timerQueriesEXT[id];var param=GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query,pname);var ret;if(typeof param=="boolean"){ret=param?1:0}else{ret=param}HEAP32[params>>2]=ret}function _emscripten_glGetQueryObjectui64vEXT(id,pname,params){if(!params){GL.recordError(1281);return}var query=GL.timerQueriesEXT[id];var param=GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query,pname);var ret;if(typeof param=="boolean"){ret=param?1:0}else{ret=param}tempI64=[ret>>>0,(tempDouble=ret,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[params>>2]=tempI64[0],HEAP32[params+4>>2]=tempI64[1]}function _emscripten_glGetQueryObjectuivEXT(id,pname,params){if(!params){GL.recordError(1281);return}var query=GL.timerQueriesEXT[id];var param=GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query,pname);var ret;if(typeof param=="boolean"){ret=param?1:0}else{ret=param}HEAP32[params>>2]=ret}function _emscripten_glGetQueryivEXT(target,pname,params){if(!params){GL.recordError(1281);return}HEAP32[params>>2]=GLctx.disjointTimerQueryExt["getQueryEXT"](target,pname)}function _emscripten_glGetRenderbufferParameteriv(target,pname,params){if(!params){GL.recordError(1281);return}HEAP32[params>>2]=GLctx.getRenderbufferParameter(target,pname)}function _emscripten_glGetShaderInfoLog(shader,maxLength,length,infoLog){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";var numBytesWrittenExclNull=maxLength>0&&infoLog?stringToUTF8(log,infoLog,maxLength):0;if(length)HEAP32[length>>2]=numBytesWrittenExclNull}function _emscripten_glGetShaderPrecisionFormat(shaderType,precisionType,range,precision){var result=GLctx.getShaderPrecisionFormat(shaderType,precisionType);HEAP32[range>>2]=result.rangeMin;HEAP32[range+4>>2]=result.rangeMax;HEAP32[precision>>2]=result.precision}function _emscripten_glGetShaderSource(shader,bufSize,length,source){var result=GLctx.getShaderSource(GL.shaders[shader]);if(!result)return;var numBytesWrittenExclNull=bufSize>0&&source?stringToUTF8(result,source,bufSize):0;if(length)HEAP32[length>>2]=numBytesWrittenExclNull}function _emscripten_glGetShaderiv(shader,pname,p){if(!p){GL.recordError(1281);return}if(pname==35716){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1}else if(pname==35720){var source=GLctx.getShaderSource(GL.shaders[shader]);var sourceLength=source===null||source.length==0?0:source.length+1;HEAP32[p>>2]=sourceLength}else{HEAP32[p>>2]=GLctx.getShaderParameter(GL.shaders[shader],pname)}}function stringToNewUTF8(jsString){var length=lengthBytesUTF8(jsString)+1;var cString=_malloc(length);stringToUTF8(jsString,cString,length);return cString}function _emscripten_glGetString(name_){if(GL.stringCache[name_])return GL.stringCache[name_];var ret;switch(name_){case 7939:var exts=GLctx.getSupportedExtensions()||[];exts=exts.concat(exts.map(function(e){return"GL_"+e}));ret=stringToNewUTF8(exts.join(" "));break;case 7936:case 7937:case 37445:case 37446:var s=GLctx.getParameter(name_);if(!s){GL.recordError(1280)}ret=stringToNewUTF8(s);break;case 7938:var glVersion=GLctx.getParameter(GLctx.VERSION);{glVersion="OpenGL ES 2.0 ("+glVersion+")"}ret=stringToNewUTF8(glVersion);break;case 35724:var glslVersion=GLctx.getParameter(GLctx.SHADING_LANGUAGE_VERSION);var ver_re=/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;var ver_num=glslVersion.match(ver_re);if(ver_num!==null){if(ver_num[1].length==3)ver_num[1]=ver_num[1]+"0";glslVersion="OpenGL ES GLSL ES "+ver_num[1]+" ("+glslVersion+")"}ret=stringToNewUTF8(glslVersion);break;default:GL.recordError(1280);return 0}GL.stringCache[name_]=ret;return ret}function _emscripten_glGetTexParameterfv(target,pname,params){if(!params){GL.recordError(1281);return}HEAPF32[params>>2]=GLctx.getTexParameter(target,pname)}function _emscripten_glGetTexParameteriv(target,pname,params){if(!params){GL.recordError(1281);return}HEAP32[params>>2]=GLctx.getTexParameter(target,pname)}function _emscripten_glGetUniformLocation(program,name){name=UTF8ToString(name);var arrayIndex=0;if(name[name.length-1]=="]"){var leftBrace=name.lastIndexOf("[");arrayIndex=name[leftBrace+1]!="]"?parseInt(name.slice(leftBrace+1)):0;name=name.slice(0,leftBrace)}var uniformInfo=GL.programInfos[program]&&GL.programInfos[program].uniforms[name];if(uniformInfo&&arrayIndex>=0&&arrayIndex<uniformInfo[0]){return uniformInfo[1]+arrayIndex}else{return-1}}function emscriptenWebGLGetUniform(program,location,params,type){if(!params){GL.recordError(1281);return}var data=GLctx.getUniform(GL.programs[program],GL.uniforms[location]);if(typeof data=="number"||typeof data=="boolean"){switch(type){case 0:HEAP32[params>>2]=data;break;case 2:HEAPF32[params>>2]=data;break;default:throw"internal emscriptenWebGLGetUniform() error, bad type: "+type}}else{for(var i=0;i<data.length;i++){switch(type){case 0:HEAP32[params+i*4>>2]=data[i];break;case 2:HEAPF32[params+i*4>>2]=data[i];break;default:throw"internal emscriptenWebGLGetUniform() error, bad type: "+type}}}}function _emscripten_glGetUniformfv(program,location,params){emscriptenWebGLGetUniform(program,location,params,2)}function _emscripten_glGetUniformiv(program,location,params){emscriptenWebGLGetUniform(program,location,params,0)}function _emscripten_glGetVertexAttribPointerv(index,pname,pointer){if(!pointer){GL.recordError(1281);return}HEAP32[pointer>>2]=GLctx.getVertexAttribOffset(index,pname)}function emscriptenWebGLGetVertexAttrib(index,pname,params,type){if(!params){GL.recordError(1281);return}var data=GLctx.getVertexAttrib(index,pname);if(pname==34975){HEAP32[params>>2]=data["name"]}else if(typeof data=="number"||typeof data=="boolean"){switch(type){case 0:HEAP32[params>>2]=data;break;case 2:HEAPF32[params>>2]=data;break;case 5:HEAP32[params>>2]=Math.fround(data);break;default:throw"internal emscriptenWebGLGetVertexAttrib() error, bad type: "+type}}else{for(var i=0;i<data.length;i++){switch(type){case 0:HEAP32[params+i*4>>2]=data[i];break;case 2:HEAPF32[params+i*4>>2]=data[i];break;case 5:HEAP32[params+i*4>>2]=Math.fround(data[i]);break;default:throw"internal emscriptenWebGLGetVertexAttrib() error, bad type: "+type}}}}function _emscripten_glGetVertexAttribfv(index,pname,params){emscriptenWebGLGetVertexAttrib(index,pname,params,2)}function _emscripten_glGetVertexAttribiv(index,pname,params){emscriptenWebGLGetVertexAttrib(index,pname,params,5)}function _emscripten_glHint(x0,x1){GLctx["hint"](x0,x1)}function _emscripten_glIsBuffer(buffer){var b=GL.buffers[buffer];if(!b)return 0;return GLctx.isBuffer(b)}function _emscripten_glIsEnabled(x0){return GLctx["isEnabled"](x0)}function _emscripten_glIsFramebuffer(framebuffer){var fb=GL.framebuffers[framebuffer];if(!fb)return 0;return GLctx.isFramebuffer(fb)}function _emscripten_glIsProgram(program){program=GL.programs[program];if(!program)return 0;return GLctx.isProgram(program)}function _emscripten_glIsQueryEXT(id){var query=GL.timerQueriesEXT[id];if(!query)return 0;return GLctx.disjointTimerQueryExt["isQueryEXT"](query)}function _emscripten_glIsRenderbuffer(renderbuffer){var rb=GL.renderbuffers[renderbuffer];if(!rb)return 0;return GLctx.isRenderbuffer(rb)}function _emscripten_glIsShader(shader){var s=GL.shaders[shader];if(!s)return 0;return GLctx.isShader(s)}function _emscripten_glIsTexture(id){var texture=GL.textures[id];if(!texture)return 0;return GLctx.isTexture(texture)}function _emscripten_glIsVertexArrayOES(array){var vao=GL.vaos[array];if(!vao)return 0;return GLctx["isVertexArray"](vao)}function _emscripten_glLineWidth(x0){GLctx["lineWidth"](x0)}function _emscripten_glLinkProgram(program){GLctx.linkProgram(GL.programs[program]);GL.populateUniformTable(program)}function _emscripten_glPixelStorei(pname,param){if(pname==3317){GL.unpackAlignment=param}GLctx.pixelStorei(pname,param)}function _emscripten_glPolygonOffset(x0,x1){GLctx["polygonOffset"](x0,x1)}function _emscripten_glQueryCounterEXT(id,target){GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.timerQueriesEXT[id],target)}function __computeUnpackAlignedImageSize(width,height,sizePerPixel,alignment){function roundedToNextMultipleOf(x,y){return x+y-1&-y}var plainRowSize=width*sizePerPixel;var alignedRowSize=roundedToNextMultipleOf(plainRowSize,alignment);return height*alignedRowSize}var __colorChannelsInGlTextureFormat={6402:1,6406:1,6407:3,6408:4,6409:1,6410:2,35904:3,35906:4};var __sizeOfGlTextureElementType={5121:1,5123:2,5125:4,5126:4,32819:2,32820:2,33635:2,34042:4,36193:2};function emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat){var sizePerPixel=__colorChannelsInGlTextureFormat[format]*__sizeOfGlTextureElementType[type];if(!sizePerPixel){GL.recordError(1280);return}var bytes=__computeUnpackAlignedImageSize(width,height,sizePerPixel,GL.unpackAlignment);var end=pixels+bytes;switch(type){case 5121:return HEAPU8.subarray(pixels,end);case 5126:return HEAPF32.subarray(pixels>>2,end>>2);case 5125:case 34042:return HEAPU32.subarray(pixels>>2,end>>2);case 5123:case 33635:case 32819:case 32820:case 36193:return HEAPU16.subarray(pixels>>1,end>>1);default:GL.recordError(1280)}}function _emscripten_glReadPixels(x,y,width,height,format,type,pixels){var pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,format);if(!pixelData){GL.recordError(1280);return}GLctx.readPixels(x,y,width,height,format,type,pixelData)}function _emscripten_glReleaseShaderCompiler(){}function _emscripten_glRenderbufferStorage(x0,x1,x2,x3){GLctx["renderbufferStorage"](x0,x1,x2,x3)}function _emscripten_glSampleCoverage(value,invert){GLctx.sampleCoverage(value,!!invert)}function _emscripten_glScissor(x0,x1,x2,x3){GLctx["scissor"](x0,x1,x2,x3)}function _emscripten_glShaderBinary(){GL.recordError(1280)}function _emscripten_glShaderSource(shader,count,string,length){var source=GL.getSource(shader,count,string,length);GLctx.shaderSource(GL.shaders[shader],source)}function _emscripten_glStencilFunc(x0,x1,x2){GLctx["stencilFunc"](x0,x1,x2)}function _emscripten_glStencilFuncSeparate(x0,x1,x2,x3){GLctx["stencilFuncSeparate"](x0,x1,x2,x3)}function _emscripten_glStencilMask(x0){GLctx["stencilMask"](x0)}function _emscripten_glStencilMaskSeparate(x0,x1){GLctx["stencilMaskSeparate"](x0,x1)}function _emscripten_glStencilOp(x0,x1,x2){GLctx["stencilOp"](x0,x1,x2)}function _emscripten_glStencilOpSeparate(x0,x1,x2,x3){GLctx["stencilOpSeparate"](x0,x1,x2,x3)}function _emscripten_glTexImage2D(target,level,internalFormat,width,height,border,format,type,pixels){GLctx.texImage2D(target,level,internalFormat,width,height,border,format,type,pixels?emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat):null)}function _emscripten_glTexParameterf(x0,x1,x2){GLctx["texParameterf"](x0,x1,x2)}function _emscripten_glTexParameterfv(target,pname,params){var param=HEAPF32[params>>2];GLctx.texParameterf(target,pname,param)}function _emscripten_glTexParameteri(x0,x1,x2){GLctx["texParameteri"](x0,x1,x2)}function _emscripten_glTexParameteriv(target,pname,params){var param=HEAP32[params>>2];GLctx.texParameteri(target,pname,param)}function _emscripten_glTexSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels){var pixelData=null;if(pixels)pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,0);GLctx.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixelData)}function _emscripten_glUniform1f(location,v0){GLctx.uniform1f(GL.uniforms[location],v0)}function _emscripten_glUniform1fv(location,count,value){if(count<=GL.MINI_TEMP_BUFFER_SIZE){var view=GL.miniTempBufferViews[count-1];for(var i=0;i<count;++i){view[i]=HEAPF32[value+4*i>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*4>>2)}GLctx.uniform1fv(GL.uniforms[location],view)}function _emscripten_glUniform1i(location,v0){GLctx.uniform1i(GL.uniforms[location],v0)}function _emscripten_glUniform1iv(location,count,value){GLctx.uniform1iv(GL.uniforms[location],HEAP32.subarray(value>>2,value+count*4>>2))}function _emscripten_glUniform2f(location,v0,v1){GLctx.uniform2f(GL.uniforms[location],v0,v1)}function _emscripten_glUniform2fv(location,count,value){if(2*count<=GL.MINI_TEMP_BUFFER_SIZE){var view=GL.miniTempBufferViews[2*count-1];for(var i=0;i<2*count;i+=2){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*8>>2)}GLctx.uniform2fv(GL.uniforms[location],view)}function _emscripten_glUniform2i(location,v0,v1){GLctx.uniform2i(GL.uniforms[location],v0,v1)}function _emscripten_glUniform2iv(location,count,value){GLctx.uniform2iv(GL.uniforms[location],HEAP32.subarray(value>>2,value+count*8>>2))}function _emscripten_glUniform3f(location,v0,v1,v2){GLctx.uniform3f(GL.uniforms[location],v0,v1,v2)}function _emscripten_glUniform3fv(location,count,value){if(3*count<=GL.MINI_TEMP_BUFFER_SIZE){var view=GL.miniTempBufferViews[3*count-1];for(var i=0;i<3*count;i+=3){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*12>>2)}GLctx.uniform3fv(GL.uniforms[location],view)}function _emscripten_glUniform3i(location,v0,v1,v2){GLctx.uniform3i(GL.uniforms[location],v0,v1,v2)}function _emscripten_glUniform3iv(location,count,value){GLctx.uniform3iv(GL.uniforms[location],HEAP32.subarray(value>>2,value+count*12>>2))}function _emscripten_glUniform4f(location,v0,v1,v2,v3){GLctx.uniform4f(GL.uniforms[location],v0,v1,v2,v3)}function _emscripten_glUniform4fv(location,count,value){if(4*count<=GL.MINI_TEMP_BUFFER_SIZE){var view=GL.miniTempBufferViews[4*count-1];for(var i=0;i<4*count;i+=4){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*16>>2)}GLctx.uniform4fv(GL.uniforms[location],view)}function _emscripten_glUniform4i(location,v0,v1,v2,v3){GLctx.uniform4i(GL.uniforms[location],v0,v1,v2,v3)}function _emscripten_glUniform4iv(location,count,value){GLctx.uniform4iv(GL.uniforms[location],HEAP32.subarray(value>>2,value+count*16>>2))}function _emscripten_glUniformMatrix2fv(location,count,transpose,value){if(4*count<=GL.MINI_TEMP_BUFFER_SIZE){var view=GL.miniTempBufferViews[4*count-1];for(var i=0;i<4*count;i+=4){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*16>>2)}GLctx.uniformMatrix2fv(GL.uniforms[location],!!transpose,view)}function _emscripten_glUniformMatrix3fv(location,count,transpose,value){if(9*count<=GL.MINI_TEMP_BUFFER_SIZE){var view=GL.miniTempBufferViews[9*count-1];for(var i=0;i<9*count;i+=9){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2];view[i+4]=HEAPF32[value+(4*i+16)>>2];view[i+5]=HEAPF32[value+(4*i+20)>>2];view[i+6]=HEAPF32[value+(4*i+24)>>2];view[i+7]=HEAPF32[value+(4*i+28)>>2];view[i+8]=HEAPF32[value+(4*i+32)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*36>>2)}GLctx.uniformMatrix3fv(GL.uniforms[location],!!transpose,view)}function _emscripten_glUniformMatrix4fv(location,count,transpose,value){if(16*count<=GL.MINI_TEMP_BUFFER_SIZE){var view=GL.miniTempBufferViews[16*count-1];for(var i=0;i<16*count;i+=16){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2];view[i+4]=HEAPF32[value+(4*i+16)>>2];view[i+5]=HEAPF32[value+(4*i+20)>>2];view[i+6]=HEAPF32[value+(4*i+24)>>2];view[i+7]=HEAPF32[value+(4*i+28)>>2];view[i+8]=HEAPF32[value+(4*i+32)>>2];view[i+9]=HEAPF32[value+(4*i+36)>>2];view[i+10]=HEAPF32[value+(4*i+40)>>2];view[i+11]=HEAPF32[value+(4*i+44)>>2];view[i+12]=HEAPF32[value+(4*i+48)>>2];view[i+13]=HEAPF32[value+(4*i+52)>>2];view[i+14]=HEAPF32[value+(4*i+56)>>2];view[i+15]=HEAPF32[value+(4*i+60)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*64>>2)}GLctx.uniformMatrix4fv(GL.uniforms[location],!!transpose,view)}function _emscripten_glUseProgram(program){GLctx.useProgram(GL.programs[program])}function _emscripten_glValidateProgram(program){GLctx.validateProgram(GL.programs[program])}function _emscripten_glVertexAttrib1f(x0,x1){GLctx["vertexAttrib1f"](x0,x1)}function _emscripten_glVertexAttrib1fv(index,v){GLctx.vertexAttrib1f(index,HEAPF32[v>>2])}function _emscripten_glVertexAttrib2f(x0,x1,x2){GLctx["vertexAttrib2f"](x0,x1,x2)}function _emscripten_glVertexAttrib2fv(index,v){GLctx.vertexAttrib2f(index,HEAPF32[v>>2],HEAPF32[v+4>>2])}function _emscripten_glVertexAttrib3f(x0,x1,x2,x3){GLctx["vertexAttrib3f"](x0,x1,x2,x3)}function _emscripten_glVertexAttrib3fv(index,v){GLctx.vertexAttrib3f(index,HEAPF32[v>>2],HEAPF32[v+4>>2],HEAPF32[v+8>>2])}function _emscripten_glVertexAttrib4f(x0,x1,x2,x3,x4){GLctx["vertexAttrib4f"](x0,x1,x2,x3,x4)}function _emscripten_glVertexAttrib4fv(index,v){GLctx.vertexAttrib4f(index,HEAPF32[v>>2],HEAPF32[v+4>>2],HEAPF32[v+8>>2],HEAPF32[v+12>>2])}function _emscripten_glVertexAttribDivisorANGLE(index,divisor){GLctx["vertexAttribDivisor"](index,divisor)}function _emscripten_glVertexAttribPointer(index,size,type,normalized,stride,ptr){GLctx.vertexAttribPointer(index,size,type,!!normalized,stride,ptr)}function _emscripten_glViewport(x0,x1,x2,x3){GLctx["viewport"](x0,x1,x2,x3)}var ENV={};function _getenv(name){if(name===0)return 0;name=UTF8ToString(name);if(!ENV.hasOwnProperty(name))return 0;if(_getenv.ret)_free(_getenv.ret);_getenv.ret=allocateUTF8(ENV[name]);return _getenv.ret}function _glActiveTexture(x0){GLctx["activeTexture"](x0)}function _glAttachShader(program,shader){GLctx.attachShader(GL.programs[program],GL.shaders[shader])}function _glBindBuffer(target,buffer){GLctx.bindBuffer(target,GL.buffers[buffer])}function _glBindTexture(target,texture){GLctx.bindTexture(target,GL.textures[texture])}function _glBlendEquation(x0){GLctx["blendEquation"](x0)}function _glBlendEquationSeparate(x0,x1){GLctx["blendEquationSeparate"](x0,x1)}function _glBlendFunc(x0,x1){GLctx["blendFunc"](x0,x1)}function _glBlendFuncSeparate(x0,x1,x2,x3){GLctx["blendFuncSeparate"](x0,x1,x2,x3)}function _glBufferData(target,size,data,usage){GLctx.bufferData(target,data?HEAPU8.subarray(data,data+size):size,usage)}function _glBufferSubData(target,offset,size,data){GLctx.bufferSubData(target,offset,HEAPU8.subarray(data,data+size))}function _glCompileShader(shader){GLctx.compileShader(GL.shaders[shader])}function _glCreateProgram(){var id=GL.getNewId(GL.programs);var program=GLctx.createProgram();program.name=id;GL.programs[id]=program;return id}function _glCreateShader(shaderType){var id=GL.getNewId(GL.shaders);GL.shaders[id]=GLctx.createShader(shaderType);return id}function _glCullFace(x0){GLctx["cullFace"](x0)}function _glDeleteBuffers(n,buffers){for(var i=0;i<n;i++){var id=HEAP32[buffers+i*4>>2];var buffer=GL.buffers[id];if(!buffer)continue;GLctx.deleteBuffer(buffer);buffer.name=0;GL.buffers[id]=null;if(id==GL.currArrayBuffer)GL.currArrayBuffer=0;if(id==GL.currElementArrayBuffer)GL.currElementArrayBuffer=0}}function _glDeleteProgram(id){if(!id)return;var program=GL.programs[id];if(!program){GL.recordError(1281);return}GLctx.deleteProgram(program);program.name=0;GL.programs[id]=null;GL.programInfos[id]=null}function _glDeleteShader(id){if(!id)return;var shader=GL.shaders[id];if(!shader){GL.recordError(1281);return}GLctx.deleteShader(shader);GL.shaders[id]=null}function _glDeleteTextures(n,textures){for(var i=0;i<n;i++){var id=HEAP32[textures+i*4>>2];var texture=GL.textures[id];if(!texture)continue;GLctx.deleteTexture(texture);texture.name=0;GL.textures[id]=null}}function _glDepthFunc(x0){GLctx["depthFunc"](x0)}function _glDepthMask(flag){GLctx.depthMask(!!flag)}function _glDisable(x0){GLctx["disable"](x0)}function _glDisableVertexAttribArray(index){GLctx.disableVertexAttribArray(index)}function _glDrawElements(mode,count,type,indices){GLctx.drawElements(mode,count,type,indices)}function _glEnable(x0){GLctx["enable"](x0)}function _glEnableVertexAttribArray(index){GLctx.enableVertexAttribArray(index)}function _glGenBuffers(n,buffers){__glGenObject(n,buffers,"createBuffer",GL.buffers)}function _glGenTextures(n,textures){__glGenObject(n,textures,"createTexture",GL.textures)}function _glGenerateMipmap(x0){GLctx["generateMipmap"](x0)}function _glGetAttribLocation(program,name){return GLctx.getAttribLocation(GL.programs[program],UTF8ToString(name))}function _glGetBooleanv(name_,p){emscriptenWebGLGet(name_,p,4)}function _glGetIntegerv(name_,p){emscriptenWebGLGet(name_,p,0)}function _glGetProgramiv(program,pname,p){if(!p){GL.recordError(1281);return}if(program>=GL.counter){GL.recordError(1281);return}var ptable=GL.programInfos[program];if(!ptable){GL.recordError(1282);return}if(pname==35716){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1}else if(pname==35719){HEAP32[p>>2]=ptable.maxUniformLength}else if(pname==35722){if(ptable.maxAttributeLength==-1){program=GL.programs[program];var numAttribs=GLctx.getProgramParameter(program,35721);ptable.maxAttributeLength=0;for(var i=0;i<numAttribs;++i){var activeAttrib=GLctx.getActiveAttrib(program,i);ptable.maxAttributeLength=Math.max(ptable.maxAttributeLength,activeAttrib.name.length+1)}}HEAP32[p>>2]=ptable.maxAttributeLength}else if(pname==35381){if(ptable.maxUniformBlockNameLength==-1){program=GL.programs[program];var numBlocks=GLctx.getProgramParameter(program,35382);ptable.maxUniformBlockNameLength=0;for(var i=0;i<numBlocks;++i){var activeBlockName=GLctx.getActiveUniformBlockName(program,i);ptable.maxUniformBlockNameLength=Math.max(ptable.maxUniformBlockNameLength,activeBlockName.length+1)}}HEAP32[p>>2]=ptable.maxUniformBlockNameLength}else{HEAP32[p>>2]=GLctx.getProgramParameter(GL.programs[program],pname)}}function _glGetShaderiv(shader,pname,p){if(!p){GL.recordError(1281);return}if(pname==35716){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1}else if(pname==35720){var source=GLctx.getShaderSource(GL.shaders[shader]);var sourceLength=source===null||source.length==0?0:source.length+1;HEAP32[p>>2]=sourceLength}else{HEAP32[p>>2]=GLctx.getShaderParameter(GL.shaders[shader],pname)}}function _glGetString(name_){if(GL.stringCache[name_])return GL.stringCache[name_];var ret;switch(name_){case 7939:var exts=GLctx.getSupportedExtensions()||[];exts=exts.concat(exts.map(function(e){return"GL_"+e}));ret=stringToNewUTF8(exts.join(" "));break;case 7936:case 7937:case 37445:case 37446:var s=GLctx.getParameter(name_);if(!s){GL.recordError(1280)}ret=stringToNewUTF8(s);break;case 7938:var glVersion=GLctx.getParameter(GLctx.VERSION);{glVersion="OpenGL ES 2.0 ("+glVersion+")"}ret=stringToNewUTF8(glVersion);break;case 35724:var glslVersion=GLctx.getParameter(GLctx.SHADING_LANGUAGE_VERSION);var ver_re=/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;var ver_num=glslVersion.match(ver_re);if(ver_num!==null){if(ver_num[1].length==3)ver_num[1]=ver_num[1]+"0";glslVersion="OpenGL ES GLSL ES "+ver_num[1]+" ("+glslVersion+")"}ret=stringToNewUTF8(glslVersion);break;default:GL.recordError(1280);return 0}GL.stringCache[name_]=ret;return ret}function _glGetUniformLocation(program,name){name=UTF8ToString(name);var arrayIndex=0;if(name[name.length-1]=="]"){var leftBrace=name.lastIndexOf("[");arrayIndex=name[leftBrace+1]!="]"?parseInt(name.slice(leftBrace+1)):0;name=name.slice(0,leftBrace)}var uniformInfo=GL.programInfos[program]&&GL.programInfos[program].uniforms[name];if(uniformInfo&&arrayIndex>=0&&arrayIndex<uniformInfo[0]){return uniformInfo[1]+arrayIndex}else{return-1}}function _glIsEnabled(x0){return GLctx["isEnabled"](x0)}function _glLinkProgram(program){GLctx.linkProgram(GL.programs[program]);GL.populateUniformTable(program)}function _glShaderSource(shader,count,string,length){var source=GL.getSource(shader,count,string,length);GLctx.shaderSource(GL.shaders[shader],source)}function _glTexImage2D(target,level,internalFormat,width,height,border,format,type,pixels){GLctx.texImage2D(target,level,internalFormat,width,height,border,format,type,pixels?emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat):null)}function _glTexParameteri(x0,x1,x2){GLctx["texParameteri"](x0,x1,x2)}function _glUniform1i(location,v0){GLctx.uniform1i(GL.uniforms[location],v0)}function _glUniform4fv(location,count,value){if(4*count<=GL.MINI_TEMP_BUFFER_SIZE){var view=GL.miniTempBufferViews[4*count-1];for(var i=0;i<4*count;i+=4){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*16>>2)}GLctx.uniform4fv(GL.uniforms[location],view)}function _glUniformMatrix4fv(location,count,transpose,value){if(16*count<=GL.MINI_TEMP_BUFFER_SIZE){var view=GL.miniTempBufferViews[16*count-1];for(var i=0;i<16*count;i+=16){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2];view[i+4]=HEAPF32[value+(4*i+16)>>2];view[i+5]=HEAPF32[value+(4*i+20)>>2];view[i+6]=HEAPF32[value+(4*i+24)>>2];view[i+7]=HEAPF32[value+(4*i+28)>>2];view[i+8]=HEAPF32[value+(4*i+32)>>2];view[i+9]=HEAPF32[value+(4*i+36)>>2];view[i+10]=HEAPF32[value+(4*i+40)>>2];view[i+11]=HEAPF32[value+(4*i+44)>>2];view[i+12]=HEAPF32[value+(4*i+48)>>2];view[i+13]=HEAPF32[value+(4*i+52)>>2];view[i+14]=HEAPF32[value+(4*i+56)>>2];view[i+15]=HEAPF32[value+(4*i+60)>>2]}}else{var view=HEAPF32.subarray(value>>2,value+count*64>>2)}GLctx.uniformMatrix4fv(GL.uniforms[location],!!transpose,view)}function _glUseProgram(program){GLctx.useProgram(GL.programs[program])}function _glVertexAttribPointer(index,size,type,normalized,stride,ptr){GLctx.vertexAttribPointer(index,size,type,!!normalized,stride,ptr)}function _llvm_exp2_f32(x){return Math.pow(2,x)}function _llvm_stackrestore(p){var self=_llvm_stacksave;var ret=self.LLVM_SAVEDSTACKS[p];self.LLVM_SAVEDSTACKS.splice(p,1);stackRestore(ret)}function _llvm_stacksave(){var self=_llvm_stacksave;if(!self.LLVM_SAVEDSTACKS){self.LLVM_SAVEDSTACKS=[]}self.LLVM_SAVEDSTACKS.push(stackSave());return self.LLVM_SAVEDSTACKS.length-1}function _llvm_trap(){abort("trap!")}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest)}function _pthread_cond_wait(){return 0}function abortOnCannotGrowMemory(requestedSize){abort("OOM")}function _emscripten_resize_heap(requestedSize){abortOnCannotGrowMemory(requestedSize)}function __isLeapYear(year){return year%4===0&&(year%100!==0||year%400===0)}function __arraySum(array,index){var sum=0;for(var i=0;i<=index;sum+=array[i++]);return sum}var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date,days){var newDate=new Date(date.getTime());while(days>0){var leap=__isLeapYear(newDate.getFullYear());var currentMonth=newDate.getMonth();var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;newDate.setDate(1);if(currentMonth<11){newDate.setMonth(currentMonth+1)}else{newDate.setMonth(0);newDate.setFullYear(newDate.getFullYear()+1)}}else{newDate.setDate(newDate.getDate()+days);return newDate}}return newDate}function _strftime(s,maxsize,format,tm){var tm_zone=HEAP32[tm+40>>2];var date={tm_sec:HEAP32[tm>>2],tm_min:HEAP32[tm+4>>2],tm_hour:HEAP32[tm+8>>2],tm_mday:HEAP32[tm+12>>2],tm_mon:HEAP32[tm+16>>2],tm_year:HEAP32[tm+20>>2],tm_wday:HEAP32[tm+24>>2],tm_yday:HEAP32[tm+28>>2],tm_isdst:HEAP32[tm+32>>2],tm_gmtoff:HEAP32[tm+36>>2],tm_zone:tm_zone?UTF8ToString(tm_zone):""};var pattern=UTF8ToString(format);var EXPANSION_RULES_1={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var rule in EXPANSION_RULES_1){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_1[rule])}var WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];function leadingSomething(value,digits,character){var str=typeof value==="number"?value.toString():value||"";while(str.length<digits){str=character[0]+str}return str}function leadingNulls(value,digits){return leadingSomething(value,digits,"0")}function compareByDay(date1,date2){function sgn(value){return value<0?-1:value>0?1:0}var compare;if((compare=sgn(date1.getFullYear()-date2.getFullYear()))===0){if((compare=sgn(date1.getMonth()-date2.getMonth()))===0){compare=sgn(date1.getDate()-date2.getDate())}}return compare}function getFirstWeekStartDate(janFourth){switch(janFourth.getDay()){case 0:return new Date(janFourth.getFullYear()-1,11,29);case 1:return janFourth;case 2:return new Date(janFourth.getFullYear(),0,3);case 3:return new Date(janFourth.getFullYear(),0,2);case 4:return new Date(janFourth.getFullYear(),0,1);case 5:return new Date(janFourth.getFullYear()-1,11,31);case 6:return new Date(janFourth.getFullYear()-1,11,30)}}function getWeekBasedYear(date){var thisDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);var janFourthThisYear=new Date(thisDate.getFullYear(),0,4);var janFourthNextYear=new Date(thisDate.getFullYear()+1,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);if(compareByDay(firstWeekStartThisYear,thisDate)<=0){if(compareByDay(firstWeekStartNextYear,thisDate)<=0){return thisDate.getFullYear()+1}else{return thisDate.getFullYear()}}else{return thisDate.getFullYear()-1}}var EXPANSION_RULES_2={"%a":function(date){return WEEKDAYS[date.tm_wday].substring(0,3)},"%A":function(date){return WEEKDAYS[date.tm_wday]},"%b":function(date){return MONTHS[date.tm_mon].substring(0,3)},"%B":function(date){return MONTHS[date.tm_mon]},"%C":function(date){var year=date.tm_year+1900;return leadingNulls(year/100|0,2)},"%d":function(date){return leadingNulls(date.tm_mday,2)},"%e":function(date){return leadingSomething(date.tm_mday,2," ")},"%g":function(date){return getWeekBasedYear(date).toString().substring(2)},"%G":function(date){return getWeekBasedYear(date)},"%H":function(date){return leadingNulls(date.tm_hour,2)},"%I":function(date){var twelveHour=date.tm_hour;if(twelveHour==0)twelveHour=12;else if(twelveHour>12)twelveHour-=12;return leadingNulls(twelveHour,2)},"%j":function(date){return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900)?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,date.tm_mon-1),3)},"%m":function(date){return leadingNulls(date.tm_mon+1,2)},"%M":function(date){return leadingNulls(date.tm_min,2)},"%n":function(){return"\n"},"%p":function(date){if(date.tm_hour>=0&&date.tm_hour<12){return"AM"}else{return"PM"}},"%S":function(date){return leadingNulls(date.tm_sec,2)},"%t":function(){return"\t"},"%u":function(date){return date.tm_wday||7},"%U":function(date){var janFirst=new Date(date.tm_year+1900,0,1);var firstSunday=janFirst.getDay()===0?janFirst:__addDays(janFirst,7-janFirst.getDay());var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);if(compareByDay(firstSunday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;var firstSundayUntilEndJanuary=31-firstSunday.getDate();var days=firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstSunday,janFirst)===0?"01":"00"},"%V":function(date){var janFourthThisYear=new Date(date.tm_year+1900,0,4);var janFourthNextYear=new Date(date.tm_year+1901,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);var endDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);if(compareByDay(endDate,firstWeekStartThisYear)<0){return"53"}if(compareByDay(firstWeekStartNextYear,endDate)<=0){return"01"}var daysDifference;if(firstWeekStartThisYear.getFullYear()<date.tm_year+1900){daysDifference=date.tm_yday+32-firstWeekStartThisYear.getDate()}else{daysDifference=date.tm_yday+1-firstWeekStartThisYear.getDate()}return leadingNulls(Math.ceil(daysDifference/7),2)},"%w":function(date){return date.tm_wday},"%W":function(date){var janFirst=new Date(date.tm_year,0,1);var firstMonday=janFirst.getDay()===1?janFirst:__addDays(janFirst,janFirst.getDay()===0?1:7-janFirst.getDay()+1);var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);if(compareByDay(firstMonday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;var firstMondayUntilEndJanuary=31-firstMonday.getDate();var days=firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstMonday,janFirst)===0?"01":"00"},"%y":function(date){return(date.tm_year+1900).toString().substring(2)},"%Y":function(date){return date.tm_year+1900},"%z":function(date){var off=date.tm_gmtoff;var ahead=off>=0;off=Math.abs(off)/60;off=off/60*100+off%60;return(ahead?"+":"-")+String("0000"+off).slice(-4)},"%Z":function(date){return date.tm_zone},"%%":function(){return"%"}};for(var rule in EXPANSION_RULES_2){if(pattern.indexOf(rule)>=0){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_2[rule](date))}}var bytes=intArrayFromString(pattern,false);if(bytes.length>maxsize){return 0}writeArrayToMemory(bytes,s);return bytes.length-1}function _strftime_l(s,maxsize,format,tm){return _strftime(s,maxsize,format,tm)}Module["requestFullScreen"]=function Module_requestFullScreen(lockPointer,resizeCanvas,vrDevice){err("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");Module["requestFullScreen"]=Module["requestFullscreen"];Browser.requestFullScreen(lockPointer,resizeCanvas,vrDevice)};Module["requestFullscreen"]=function Module_requestFullscreen(lockPointer,resizeCanvas,vrDevice){Browser.requestFullscreen(lockPointer,resizeCanvas,vrDevice)};Module["requestAnimationFrame"]=function Module_requestAnimationFrame(func){Browser.requestAnimationFrame(func)};Module["setCanvasSize"]=function Module_setCanvasSize(width,height,noUpdates){Browser.setCanvasSize(width,height,noUpdates)};Module["pauseMainLoop"]=function Module_pauseMainLoop(){Browser.mainLoop.pause()};Module["resumeMainLoop"]=function Module_resumeMainLoop(){Browser.mainLoop.resume()};Module["getUserMedia"]=function Module_getUserMedia(){Browser.getUserMedia()};Module["createContext"]=function Module_createContext(canvas,useWebGL,setInModule,webGLContextAttributes){return Browser.createContext(canvas,useWebGL,setInModule,webGLContextAttributes)};if(ENVIRONMENT_IS_NODE){_emscripten_get_now=function _emscripten_get_now_actual(){var t=process["hrtime"]();return t[0]*1e3+t[1]/1e6}}else if(typeof dateNow!=="undefined"){_emscripten_get_now=dateNow}else if(typeof performance==="object"&&performance&&typeof performance["now"]==="function"){_emscripten_get_now=function(){return performance["now"]()}}else{_emscripten_get_now=Date.now}var GLctx;GL.init();for(var i=0;i<32;i++)__tempFixedLengthArray.push(new Array(i));function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}var asmGlobalArg={};var asmLibraryArg={"c":abort,"e":___cxa_allocate_exception,"Sb":___cxa_pure_virtual,"d":___cxa_throw,"$a":___cxa_uncaught_exceptions,"o":___lock,"Ga":___map_file,"A":___setErrNo,"la":___syscall140,"aa":___syscall145,"R":___syscall146,"v":___syscall221,"ud":___syscall5,"Q":___syscall54,"P":___syscall6,"Rc":___syscall91,"n":___unlock,"b":_abort,"mc":_alBufferData,"bc":_alDeleteBuffers,"Rb":_alDeleteSources,"Jb":_alGenBuffers,"Cb":_alGenSources,"yb":_alGetSourcei,"H":_alListenerfv,"lb":_alSourcePause,"D":_alSourcePlay,"q":_alSourceStop,"p":_alSourcef,"C":_alSourcefv,"x":_alSourcei,"gb":_alcCreateContext,"fb":_alcMakeContextCurrent,"eb":_alcOpenDevice,"db":_clock_gettime,"w":_eglGetProcAddress,"cb":_emscripten_asm_const_ii,"B":_emscripten_asm_const_iii,"bb":_emscripten_asm_const_iiiii,"ab":_emscripten_get_heap_size,"_a":_emscripten_glActiveTexture,"Za":_emscripten_glAttachShader,"Ya":_emscripten_glBeginQueryEXT,"Xa":_emscripten_glBindAttribLocation,"Wa":_emscripten_glBindBuffer,"Va":_emscripten_glBindFramebuffer,"Ua":_emscripten_glBindRenderbuffer,"Ta":_emscripten_glBindTexture,"Sa":_emscripten_glBindVertexArrayOES,"Ra":_emscripten_glBlendColor,"Qa":_emscripten_glBlendEquation,"Pa":_emscripten_glBlendEquationSeparate,"Oa":_emscripten_glBlendFunc,"Na":_emscripten_glBlendFuncSeparate,"Ma":_emscripten_glBufferData,"La":_emscripten_glBufferSubData,"Ka":_emscripten_glCheckFramebufferStatus,"Ja":_emscripten_glClear,"Ia":_emscripten_glClearColor,"Ha":_emscripten_glClearDepthf,"Fa":_emscripten_glClearStencil,"Ea":_emscripten_glColorMask,"Da":_emscripten_glCompileShader,"Ca":_emscripten_glCompressedTexImage2D,"Ba":_emscripten_glCompressedTexSubImage2D,"Aa":_emscripten_glCopyTexImage2D,"za":_emscripten_glCopyTexSubImage2D,"ya":_emscripten_glCreateProgram,"xa":_emscripten_glCreateShader,"wa":_emscripten_glCullFace,"va":_emscripten_glDeleteBuffers,"ua":_emscripten_glDeleteFramebuffers,"ta":_emscripten_glDeleteProgram,"sa":_emscripten_glDeleteQueriesEXT,"ra":_emscripten_glDeleteRenderbuffers,"qa":_emscripten_glDeleteShader,"pa":_emscripten_glDeleteTextures,"oa":_emscripten_glDeleteVertexArraysOES,"na":_emscripten_glDepthFunc,"ma":_emscripten_glDepthMask,"ka":_emscripten_glDepthRangef,"ja":_emscripten_glDetachShader,"ia":_emscripten_glDisable,"ha":_emscripten_glDisableVertexAttribArray,"ga":_emscripten_glDrawArrays,"fa":_emscripten_glDrawArraysInstancedANGLE,"ea":_emscripten_glDrawBuffersWEBGL,"da":_emscripten_glDrawElements,"ca":_emscripten_glDrawElementsInstancedANGLE,"ba":_emscripten_glEnable,"$":_emscripten_glEnableVertexAttribArray,"_":_emscripten_glEndQueryEXT,"Z":_emscripten_glFinish,"Y":_emscripten_glFlush,"X":_emscripten_glFramebufferRenderbuffer,"W":_emscripten_glFramebufferTexture2D,"V":_emscripten_glFrontFace,"U":_emscripten_glGenBuffers,"T":_emscripten_glGenFramebuffers,"S":_emscripten_glGenQueriesEXT,"Od":_emscripten_glGenRenderbuffers,"Nd":_emscripten_glGenTextures,"Md":_emscripten_glGenVertexArraysOES,"Ld":_emscripten_glGenerateMipmap,"Kd":_emscripten_glGetActiveAttrib,"Jd":_emscripten_glGetActiveUniform,"Id":_emscripten_glGetAttachedShaders,"Hd":_emscripten_glGetAttribLocation,"Gd":_emscripten_glGetBooleanv,"Fd":_emscripten_glGetBufferParameteriv,"Ed":_emscripten_glGetError,"Dd":_emscripten_glGetFloatv,"Cd":_emscripten_glGetFramebufferAttachmentParameteriv,"Bd":_emscripten_glGetIntegerv,"Ad":_emscripten_glGetProgramInfoLog,"zd":_emscripten_glGetProgramiv,"yd":_emscripten_glGetQueryObjecti64vEXT,"xd":_emscripten_glGetQueryObjectivEXT,"wd":_emscripten_glGetQueryObjectui64vEXT,"vd":_emscripten_glGetQueryObjectuivEXT,"td":_emscripten_glGetQueryivEXT,"sd":_emscripten_glGetRenderbufferParameteriv,"rd":_emscripten_glGetShaderInfoLog,"qd":_emscripten_glGetShaderPrecisionFormat,"pd":_emscripten_glGetShaderSource,"od":_emscripten_glGetShaderiv,"nd":_emscripten_glGetString,"md":_emscripten_glGetTexParameterfv,"ld":_emscripten_glGetTexParameteriv,"kd":_emscripten_glGetUniformLocation,"jd":_emscripten_glGetUniformfv,"id":_emscripten_glGetUniformiv,"hd":_emscripten_glGetVertexAttribPointerv,"gd":_emscripten_glGetVertexAttribfv,"fd":_emscripten_glGetVertexAttribiv,"ed":_emscripten_glHint,"dd":_emscripten_glIsBuffer,"cd":_emscripten_glIsEnabled,"bd":_emscripten_glIsFramebuffer,"ad":_emscripten_glIsProgram,"$c":_emscripten_glIsQueryEXT,"_c":_emscripten_glIsRenderbuffer,"Zc":_emscripten_glIsShader,"Yc":_emscripten_glIsTexture,"Xc":_emscripten_glIsVertexArrayOES,"Wc":_emscripten_glLineWidth,"Vc":_emscripten_glLinkProgram,"Uc":_emscripten_glPixelStorei,"Tc":_emscripten_glPolygonOffset,"Sc":_emscripten_glQueryCounterEXT,"Qc":_emscripten_glReadPixels,"Pc":_emscripten_glReleaseShaderCompiler,"Oc":_emscripten_glRenderbufferStorage,"Nc":_emscripten_glSampleCoverage,"Mc":_emscripten_glScissor,"Lc":_emscripten_glShaderBinary,"Kc":_emscripten_glShaderSource,"Jc":_emscripten_glStencilFunc,"Ic":_emscripten_glStencilFuncSeparate,"Hc":_emscripten_glStencilMask,"Gc":_emscripten_glStencilMaskSeparate,"Fc":_emscripten_glStencilOp,"Ec":_emscripten_glStencilOpSeparate,"Dc":_emscripten_glTexImage2D,"Cc":_emscripten_glTexParameterf,"Bc":_emscripten_glTexParameterfv,"Ac":_emscripten_glTexParameteri,"zc":_emscripten_glTexParameteriv,"yc":_emscripten_glTexSubImage2D,"xc":_emscripten_glUniform1f,"wc":_emscripten_glUniform1fv,"vc":_emscripten_glUniform1i,"uc":_emscripten_glUniform1iv,"tc":_emscripten_glUniform2f,"sc":_emscripten_glUniform2fv,"rc":_emscripten_glUniform2i,"qc":_emscripten_glUniform2iv,"pc":_emscripten_glUniform3f,"oc":_emscripten_glUniform3fv,"nc":_emscripten_glUniform3i,"lc":_emscripten_glUniform3iv,"kc":_emscripten_glUniform4f,"jc":_emscripten_glUniform4fv,"ic":_emscripten_glUniform4i,"hc":_emscripten_glUniform4iv,"gc":_emscripten_glUniformMatrix2fv,"fc":_emscripten_glUniformMatrix3fv,"ec":_emscripten_glUniformMatrix4fv,"dc":_emscripten_glUseProgram,"cc":_emscripten_glValidateProgram,"ac":_emscripten_glVertexAttrib1f,"$b":_emscripten_glVertexAttrib1fv,"_b":_emscripten_glVertexAttrib2f,"Zb":_emscripten_glVertexAttrib2fv,"Yb":_emscripten_glVertexAttrib3f,"Xb":_emscripten_glVertexAttrib3fv,"Wb":_emscripten_glVertexAttrib4f,"Vb":_emscripten_glVertexAttrib4fv,"Ub":_emscripten_glVertexAttribDivisorANGLE,"Tb":_emscripten_glVertexAttribPointer,"Qb":_emscripten_glViewport,"Pb":_emscripten_memcpy_big,"Ob":_emscripten_resize_heap,"u":_getenv,"l":_glActiveTexture,"Nb":_glAttachShader,"Mb":_glBindBuffer,"m":_glBindTexture,"Lb":_glBlendEquation,"Kb":_glBlendEquationSeparate,"Ib":_glBlendFunc,"Hb":_glBlendFuncSeparate,"Gb":_glBufferData,"Fb":_glBufferSubData,"O":_glCompileShader,"Eb":_glCreateProgram,"N":_glCreateShader,"k":_glCullFace,"Db":_glDeleteBuffers,"t":_glDeleteProgram,"M":_glDeleteShader,"L":_glDeleteTextures,"K":_glDepthFunc,"J":_glDepthMask,"h":_glDisable,"Bb":_glDisableVertexAttribArray,"z":_glDrawElements,"g":_glEnable,"Ab":_glEnableVertexAttribArray,"zb":_glGenBuffers,"y":_glGenTextures,"I":_glGenerateMipmap,"xb":_glGetAttribLocation,"wb":_glGetBooleanv,"f":_glGetIntegerv,"vb":_glGetProgramiv,"ub":_glGetShaderiv,"tb":_glGetString,"sb":_glGetUniformLocation,"s":_glIsEnabled,"rb":_glLinkProgram,"qb":_glShaderSource,"G":_glTexImage2D,"r":_glTexParameteri,"pb":_glUniform1i,"ob":_glUniform4fv,"nb":_glUniformMatrix4fv,"F":_glUseProgram,"mb":_glVertexAttribPointer,"E":_llvm_exp2_f32,"j":_llvm_stackrestore,"i":_llvm_stacksave,"kb":_llvm_trap,"jb":_pthread_cond_wait,"ib":_strftime_l,"hb":abortOnCannotGrowMemory,"a":DYNAMICTOP_PTR};var asm=Module["asm"](asmGlobalArg,asmLibraryArg,buffer);Module["asm"]=asm;var _EffekseerBeginDraw=Module["_EffekseerBeginDraw"]=function(){return Module["asm"]["Pd"].apply(null,arguments)};var _EffekseerBeginUpdate=Module["_EffekseerBeginUpdate"]=function(){return Module["asm"]["Qd"].apply(null,arguments)};var _EffekseerDraw=Module["_EffekseerDraw"]=function(){return Module["asm"]["Rd"].apply(null,arguments)};var _EffekseerDrawHandle=Module["_EffekseerDrawHandle"]=function(){return Module["asm"]["Sd"].apply(null,arguments)};var _EffekseerEffectGetColorImageCount=Module["_EffekseerEffectGetColorImageCount"]=function(){return Module["asm"]["Td"].apply(null,arguments)};var _EffekseerEffectGetColorImagePath=Module["_EffekseerEffectGetColorImagePath"]=function(){return Module["asm"]["Ud"].apply(null,arguments)};var _EffekseerEndDraw=Module["_EffekseerEndDraw"]=function(){return Module["asm"]["Vd"].apply(null,arguments)};var _EffekseerEndUpdate=Module["_EffekseerEndUpdate"]=function(){return Module["asm"]["Wd"].apply(null,arguments)};var _EffekseerExists=Module["_EffekseerExists"]=function(){return Module["asm"]["Xd"].apply(null,arguments)};var _EffekseerGetglTFBodyURI=Module["_EffekseerGetglTFBodyURI"]=function(){return Module["asm"]["Yd"].apply(null,arguments)};var _EffekseerInit=Module["_EffekseerInit"]=function(){return Module["asm"]["Zd"].apply(null,arguments)};var _EffekseerIsBinaryglTF=Module["_EffekseerIsBinaryglTF"]=function(){return Module["asm"]["_d"].apply(null,arguments)};var _EffekseerIsVertexArrayObjectSupported=Module["_EffekseerIsVertexArrayObjectSupported"]=function(){return Module["asm"]["$d"].apply(null,arguments)};var _EffekseerLoadEffect=Module["_EffekseerLoadEffect"]=function(){return Module["asm"]["ae"].apply(null,arguments)};var _EffekseerPlayEffect=Module["_EffekseerPlayEffect"]=function(){return Module["asm"]["be"].apply(null,arguments)};var _EffekseerReleaseEffect=Module["_EffekseerReleaseEffect"]=function(){return Module["asm"]["ce"].apply(null,arguments)};var _EffekseerReloadResources=Module["_EffekseerReloadResources"]=function(){return Module["asm"]["de"].apply(null,arguments)};var _EffekseerSetCameraLookAt=Module["_EffekseerSetCameraLookAt"]=function(){return Module["asm"]["ee"].apply(null,arguments)};var _EffekseerSetCameraMatrix=Module["_EffekseerSetCameraMatrix"]=function(){return Module["asm"]["fe"].apply(null,arguments)};var _EffekseerSetLocation=Module["_EffekseerSetLocation"]=function(){return Module["asm"]["ge"].apply(null,arguments)};var _EffekseerSetMatrix=Module["_EffekseerSetMatrix"]=function(){return Module["asm"]["he"].apply(null,arguments)};var _EffekseerSetPaused=Module["_EffekseerSetPaused"]=function(){return Module["asm"]["ie"].apply(null,arguments)};var _EffekseerSetProjectionMatrix=Module["_EffekseerSetProjectionMatrix"]=function(){return Module["asm"]["je"].apply(null,arguments)};var _EffekseerSetProjectionOrthographic=Module["_EffekseerSetProjectionOrthographic"]=function(){return Module["asm"]["ke"].apply(null,arguments)};var _EffekseerSetProjectionPerspective=Module["_EffekseerSetProjectionPerspective"]=function(){return Module["asm"]["le"].apply(null,arguments)};var _EffekseerSetRotation=Module["_EffekseerSetRotation"]=function(){return Module["asm"]["me"].apply(null,arguments)};var _EffekseerSetScale=Module["_EffekseerSetScale"]=function(){return Module["asm"]["ne"].apply(null,arguments)};var _EffekseerSetShown=Module["_EffekseerSetShown"]=function(){return Module["asm"]["oe"].apply(null,arguments)};var _EffekseerSetSpeed=Module["_EffekseerSetSpeed"]=function(){return Module["asm"]["pe"].apply(null,arguments)};var _EffekseerSetTargetLocation=Module["_EffekseerSetTargetLocation"]=function(){return Module["asm"]["qe"].apply(null,arguments)};var _EffekseerStopAllEffects=Module["_EffekseerStopAllEffects"]=function(){return Module["asm"]["re"].apply(null,arguments)};var _EffekseerStopEffect=Module["_EffekseerStopEffect"]=function(){return Module["asm"]["se"].apply(null,arguments)};var _EffekseerStopRoot=Module["_EffekseerStopRoot"]=function(){return Module["asm"]["te"].apply(null,arguments)};var _EffekseerTerminate=Module["_EffekseerTerminate"]=function(){return Module["asm"]["ue"].apply(null,arguments)};var _EffekseerUpdate=Module["_EffekseerUpdate"]=function(){return Module["asm"]["ve"].apply(null,arguments)};var _EffekseerUpdateHandle=Module["_EffekseerUpdateHandle"]=function(){return Module["asm"]["we"].apply(null,arguments)};var __ZSt18uncaught_exceptionv=Module["__ZSt18uncaught_exceptionv"]=function(){return Module["asm"]["xe"].apply(null,arguments)};var _emscripten_GetProcAddress=Module["_emscripten_GetProcAddress"]=function(){return Module["asm"]["ye"].apply(null,arguments)};var _free=Module["_free"]=function(){return Module["asm"]["ze"].apply(null,arguments)};var _main=Module["_main"]=function(){return Module["asm"]["Ae"].apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return Module["asm"]["Be"].apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return Module["asm"]["Ee"].apply(null,arguments)};var stackRestore=Module["stackRestore"]=function(){return Module["asm"]["Fe"].apply(null,arguments)};var stackSave=Module["stackSave"]=function(){return Module["asm"]["Ge"].apply(null,arguments)};var dynCall_v=Module["dynCall_v"]=function(){return Module["asm"]["Ce"].apply(null,arguments)};var dynCall_vi=Module["dynCall_vi"]=function(){return Module["asm"]["De"].apply(null,arguments)};Module["asm"]=asm;Module["cwrap"]=cwrap;Module["UTF8ToString"]=UTF8ToString;var calledRun;Module["then"]=function(func){if(calledRun){func(Module)}else{var old=Module["onRuntimeInitialized"];Module["onRuntimeInitialized"]=function(){if(old)old();func(Module)}}return Module};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){args=args||[];var argc=args.length+1;var argv=stackAlloc((argc+1)*4);HEAP32[argv>>2]=allocateUTF8OnStack(thisProgram);for(var i=1;i<argc;i++){HEAP32[(argv>>2)+i]=allocateUTF8OnStack(args[i-1])}HEAP32[(argv>>2)+argc]=0;try{var ret=Module["_main"](argc,argv);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){noExitRuntime=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}err("exception thrown: "+toLog);quit_(1,e)}}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0)return;function doRun(){if(calledRun)return;calledRun=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){if(implicit&&noExitRuntime&&status===0){return}if(noExitRuntime){}else{ABORT=true;EXITSTATUS=status;exitRuntime();if(Module["onExit"])Module["onExit"](status)}quit_(status,new ExitStatus(status))}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what+="";out(what);err(what);ABORT=true;EXITSTATUS=1;throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."}Module["abort"]=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;noExitRuntime=true;run();Module["GL"]=GL;


  return effekseer_native
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
      module.exports = effekseer_native;
    else if (typeof define === 'function' && define['amd'])
      define([], function() { return effekseer_native; });
    else if (typeof exports === 'object')
      exports["effekseer_native"] = effekseer_native;
    "use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var effekseer = function () {
  var Module = {};
  var Core = {};
  var _onloadAssembly = function _onloadAssembly() {};
  var _onerrorAssembly = function _onerrorAssembly() {};
  var _is_runtime_initialized = false;
  var _onRuntimeInitialized = function _onRuntimeInitialized() {
    // C++ functions
    Core = {
      Init: Module.cwrap("EffekseerInit", "number", ["number", "number"]),
      Terminate: Module.cwrap("EffekseerTerminate", "void", ["number"]),
      Update: Module.cwrap("EffekseerUpdate", "void", ["number", "number"]),
      BeginUpdate: Module.cwrap("EffekseerBeginUpdate", "void", ["number"]),
      EndUpdate: Module.cwrap("EffekseerEndUpdate", "void", ["number"]),
      UpdateHandle: Module.cwrap("EffekseerUpdateHandle", "void", ["number", "number", "number"]),
      Draw: Module.cwrap("EffekseerDraw", "void", ["number"]),
      BeginDraw: Module.cwrap("EffekseerBeginDraw", "void", ["number"]),
      EndDraw: Module.cwrap("EffekseerEndDraw", "void", ["number"]),
      DrawHandle: Module.cwrap("EffekseerDrawHandle", "void", ["number", "number"]),
      SetProjectionMatrix: Module.cwrap("EffekseerSetProjectionMatrix", "void", ["number", "number"]),
      SetProjectionPerspective: Module.cwrap("EffekseerSetProjectionPerspective", "void", ["number", "number", "number", "number", "number"]),
      SetProjectionOrthographic: Module.cwrap("EffekseerSetProjectionOrthographic", "void", ["number", "number", "number", "number", "number"]),
      SetCameraMatrix: Module.cwrap("EffekseerSetCameraMatrix", "void", ["number", "number"]),
      SetCameraLookAt: Module.cwrap("EffekseerSetCameraLookAt", "void", ["number", "number", "number", "number", "number", "number", "number", "number", "number", "number"]),
      LoadEffect: Module.cwrap("EffekseerLoadEffect", "number", ["number", "number", "number", "number", "number"]),
      ReleaseEffect: Module.cwrap("EffekseerReleaseEffect", "void", ["number", "number"]),
      ReloadResources: Module.cwrap("EffekseerReloadResources", "void", ["number", "number"]),
      StopAllEffects: Module.cwrap("EffekseerStopAllEffects", "void", ["number"]),
      PlayEffect: Module.cwrap("EffekseerPlayEffect", "number", ["number", "number", "number", "number", "number"]),
      StopEffect: Module.cwrap("EffekseerStopEffect", "void", ["number", "number"]),
      StopRoot: Module.cwrap("EffekseerStopRoot", "void", ["number", "number"]),
      Exists: Module.cwrap("EffekseerExists", "number", ["number", "number"]),
      SetLocation: Module.cwrap("EffekseerSetLocation", "void", ["number", "number", "number", "number", "number"]),
      SetRotation: Module.cwrap("EffekseerSetRotation", "void", ["number", "number", "number", "number", "number"]),
      SetScale: Module.cwrap("EffekseerSetScale", "void", ["number", "number", "number", "number", "number"]),
      SetMatrix: Module.cwrap("EffekseerSetMatrix", "void", ["number", "number", "number"]),
      SetTargetLocation: Module.cwrap("EffekseerSetTargetLocation", "void", ["number", "number", "number", "number", "number"]),
      SetPaused: Module.cwrap("EffekseerSetPaused", "void", ["number", "number", "number"]),
      SetShown: Module.cwrap("EffekseerSetShown", "void", ["number", "number", "number"]),
      SetSpeed: Module.cwrap("EffekseerSetSpeed", "void", ["number", "number", "number"]),
      IsBinaryglTF: Module.cwrap("EffekseerIsBinaryglTF", "number", ["number", "number", "number"]),
      GetglTFBodyURI: Module.cwrap("EffekseerGetglTFBodyURI", "number", ["number", "number", "number"]),
      IsVertexArrayObjectSupported: Module.cwrap("EffekseerIsVertexArrayObjectSupported", "number", ["number"]),
      EffectGetColorImageCount: Module.cwrap("EffekseerEffectGetColorImageCount", "number", ["number"]),
      EffectGetColorImagePath: Module.cwrap("EffekseerEffectGetColorImagePath", "number", ["number", "number"])
    };

    Module._isPowerOfTwo = function (img) {
      return _isImagePowerOfTwo(img);
    };

    Module._loadImage = function (path) {
      var effect = loadingEffect;
      effect.context._makeContextCurrent();

      var res = effect.resources.find(function (res) {
        return res.path == path;
      });
      if (res) {
        return res.isLoaded ? res.image : null;
      }

      var res = { path: path, isLoaded: false, image: null, isRequired: true };
      effect.resources.push(res);

      _loadResource(effect.baseDir + path, function (image) {
        res.image = image;
        res.isLoaded = true;
        effect._update();
      }, effect.onerror);
      return null;
    };

    Module._loadBinary = function (path, isRequired) {
      var effect = loadingEffect;
      effect.context._makeContextCurrent();

      var res = effect.resources.find(function (res) {
        return res.path == path;
      });
      if (res) {
        return res.isLoaded ? res.buffer : null;
      }

      var res = { path: path, isLoaded: false, buffer: null, isRequired: isRequired };
      effect.resources.push(res);

      _loadResource(effect.baseDir + path, function (buffer) {
        res.buffer = buffer;
        res.isLoaded = true;
        effect._update();
      }, effect.onerror);
      return null;
    };

    _is_runtime_initialized = true;
    _onloadAssembly();
  };

  var _initalize_wasm = function _initalize_wasm(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      var params = {};
      params.wasmBinary = xhr.response;
      params.onRuntimeInitialized = _onRuntimeInitialized;
      Module = effekseer_native(params);
    };
    xhr.onerror = function () {
      _onerrorAssembly();
    };
    xhr.send(null);
  };

  if (typeof effekseer_native === "undefined") {
    Module = effekseer();
    _onRuntimeInitialized();
  }

  /**
   * A loaded effect data
   * @class
   */

  var EffekseerEffect = function () {
    function EffekseerEffect(context) {
      _classCallCheck(this, EffekseerEffect);

      this.context = context;
      this.nativeptr = 0;
      this.baseDir = "";
      this.isLoaded = false;
      this.scale = 1.0;
      this.resources = [];
      this.main_buffer = null;
    }

    _createClass(EffekseerEffect, [{
      key: "_load",
      value: function _load(buffer) {
        loadingEffect = this;
        this.main_buffer = buffer;
        var memptr = Module._malloc(buffer.byteLength);
        Module.HEAP8.set(new Uint8Array(buffer), memptr);
        this.nativeptr = Core.LoadEffect(this.context.nativeptr, memptr, buffer.byteLength, this.scale);
        Module._free(memptr);
        loadingEffect = null;
        this._update();
      }
    }, {
      key: "_reload",
      value: function _reload() {
        loadingEffect = this;
        var buffer = this.main_buffer;
        var memptr = Module._malloc(buffer.byteLength);
        Module.HEAP8.set(new Uint8Array(buffer), memptr);
        Core.ReloadResources(this.context.nativeptr, this.nativeptr, memptr, buffer.byteLength);
        Module._free(memptr);
        loadingEffect = null;
      }
    }, {
      key: "_update",
      value: function _update() {
        var loaded = this.nativeptr != 0;
        if (this.resources.length > 0) {
          for (var i = 0; i < this.resources.length; i++) {
            if (!this.resources[i].isLoaded && this.resources[i].isRequired) {
              loaded = false;
              break;
            }
          }
          if (loaded) {
            this._reload();
          }
        }
        if (!this.isLoaded && loaded) {
          this.isLoaded = true;
          if (this.onload) this.onload();
        }
      }

      /**
       * get paths to color images
       * @returns {array[string]} paths to color images
       */

    }, {
      key: "getColorImagePaths",
      value: function getColorImagePaths() {
        var arr = [];
        var count = Core.EffectGetColorImageCount(this.nativeptr);
        for (var i = 0; i < count; i++) {
          var _ptr = Core.EffectGetColorImagePath(this.nativeptr, i);
          str = Module.UTF8ToString(_ptr);
          arr.push(str);
        }
        return arr;
      }
    }]);

    return EffekseerEffect;
  }();

  /**
   * A handle that played effect instance.
   * @class
   */


  var EffekseerHandle = function () {
    function EffekseerHandle(context, native) {
      _classCallCheck(this, EffekseerHandle);

      this.context = context;
      this.native = native;
    }

    /**
     * Stop this effect instance.
     */


    _createClass(EffekseerHandle, [{
      key: "stop",
      value: function stop() {
        Core.StopEffect(this.context.nativeptr, this.native);
      }

      /**
       * Stop the root node of this effect instance.
       */

    }, {
      key: "stopRoot",
      value: function stopRoot() {
        Core.StopRoot(this.context.nativeptr, this.native);
      }

      /**
       * if returned false, this effect is end of playing.
       * @property {boolean}
       */

    }, {
      key: "exists",
      get: function get() {
        return !!Core.Exists(this.context.nativeptr, this.native);
      }

      /**
       * Set the location of this effect instance.
       * @param {number} x X value of location
       * @param {number} y Y value of location
       * @param {number} z Z value of location
       */

    }, {
      key: "setLocation",
      value: function setLocation(x, y, z) {
        Core.SetLocation(this.context.nativeptr, this.native, x, y, z);
      }

      /**
       * Set the rotation of this effect instance.
       * @param {number} x X value of euler angle
       * @param {number} y Y value of euler angle
       * @param {number} z Z value of euler angle
       */

    }, {
      key: "setRotation",
      value: function setRotation(x, y, z) {
        Core.SetRotation(this.context.nativeptr, this.native, x, y, z);
      }

      /**
       * Set the scale of this effect instance.
       * @param {number} x X value of scale factor
       * @param {number} y Y value of scale factor
       * @param {number} z Z value of scale factor
       */

    }, {
      key: "setScale",
      value: function setScale(x, y, z) {
        Core.SetScale(this.context.nativeptr, this.native, x, y, z);
      }

      /**
       * Set the model matrix of this effect instance.
       * @param {array} matrixArray An array that is requred 16 elements
       */

    }, {
      key: "setMatrix",
      value: function setMatrix(matrixArray) {
        var stack = Module.stackSave();
        var arrmem = Module.stackAlloc(4 * 16);
        Module.HEAPF32.set(matrixArray, arrmem >> 2);
        Core.SetMatrix(this.context.nativeptr, this.native, arrmem);
        Module.stackRestore(stack);
      }

      /**
       * Set the target location of this effect instance.
       * @param {number} x X value of target location
       * @param {number} y Y value of target location
       * @param {number} z Z value of target location
       */

    }, {
      key: "setTargetLocation",
      value: function setTargetLocation(x, y, z) {
        Core.SetTargetLocation(this.context.nativeptr, this.native, x, y, z);
      }

      /**
       * Set the paused flag of this effect instance.
       * if specified true, this effect playing will not advance.
       * @param {boolean} paused Paused flag
       */

    }, {
      key: "setPaused",
      value: function setPaused(paused) {
        Core.SetPaused(this.context.nativeptr, this.native, paused);
      }

      /**
       * Set the shown flag of this effect instance.
       * if specified false, this effect will be invisible.
       * @param {boolean} shown Shown flag
       */

    }, {
      key: "setShown",
      value: function setShown(shown) {
        Core.SetShown(this.context.nativeptr, this.native, shown);
      }

      /**
       * Set playing speed of this effect.
       * @param {number} speed Speed ratio
       */

    }, {
      key: "setSpeed",
      value: function setSpeed(speed) {
        Core.SetSpeed(this.context.nativeptr, this.native, speed);
      }
    }]);

    return EffekseerHandle;
  }();

  var _isImagePowerOfTwo = function _isImagePowerOfTwo(image) {
    return !(image.width & image.width - 1) && !(image.height & image.height - 1);
  };

  var calcNextPowerOfTwo = function calcNextPowerOfTwo(v) {
    var sizes = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

    var foundInd = -1;
    for (var i = 0; i < sizes.length; i++) {
      if (sizes[i] >= v) {
        return sizes[i];
      }
    }

    for (var i = sizes.length - 1; i >= 0; i--) {
      if (sizes[i] <= v) {
        return sizes[i];
      }
    }
    return 1;
  };

  var _convertPowerOfTwoImage = function _convertPowerOfTwoImage(image) {
    if (!_isImagePowerOfTwo(image)) {
      var canvas = document.createElement("canvas");
      canvas.width = calcNextPowerOfTwo(image.width);
      canvas.height = calcNextPowerOfTwo(image.height);
      var context2d = canvas.getContext("2d");
      context2d.drawImage(image, 0, 0, image.width, image.height);
      image = canvas;
    }

    return image;
  };

  var _loadBinFile = function _loadBinFile(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      onload(xhr.response);
    };
    xhr.onerror = function () {
      if (!(typeof onerror === "undefined")) onerror('not found', url);
    };
    xhr.send(null);
  };

  var _loadResource = function _loadResource(path, onload, onerror) {
    var extindex = path.lastIndexOf(".");
    var ext = extindex >= 0 ? path.slice(extindex) : "";
    if (ext == ".png" || ext == ".jpg") {
      (function () {
        var image = new Image();
        image.onload = function () {
          var converted_image = _convertPowerOfTwoImage(image);
          onload(converted_image);
        };
        image.onerror = function () {
          if (!(typeof onerror === "undefined")) onerror('not found', path);
        };

        image.crossOrigin = "anonymous";
        image.src = path;
      })();
    } else {
      _loadBinFile(path, function (buffer) {
        onload(buffer);
      }, onerror);
    }
  };

  var loadingEffect = null;

  var ContextStates = function () {
    function ContextStates(gl) {
      _classCallCheck(this, ContextStates);

      this.gl = gl;
      this.ext_vao = null;
      this.effekseer_vao = null;
      this.current_vao = null;
      this.current_vbo = null;
      this.current_ibo = null;

      this.ext_vao = gl.getExtension('OES_vertex_array_object');
      if (this.ext_vao != null) {
        this.effekseer_vao = this.ext_vao.createVertexArrayOES();
      }
    }

    _createClass(ContextStates, [{
      key: "save",
      value: function save() {
        this.current_vbo = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
        this.current_ibo = this.gl.getParameter(this.gl.ELEMENT_ARRAY_BUFFER_BINDING);
        if (this.ext_vao != null) {
          this.current_vao = this.gl.getParameter(this.ext_vao.VERTEX_ARRAY_BINDING_OES);
          this.ext_vao.bindVertexArrayOES(this.effekseer_vao);
        }
      }
    }, {
      key: "restore",
      value: function restore() {
        if (this.ext_vao != null) {
          this.ext_vao.bindVertexArrayOES(this.current_vao);
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.current_vbo);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.current_ibo);
      }
    }]);

    return ContextStates;
  }();

  var EffekseerContext = function () {
    function EffekseerContext() {
      _classCallCheck(this, EffekseerContext);
    }

    _createClass(EffekseerContext, [{
      key: "_loadBinary_with_effect_cache",
      value: function _loadBinary_with_effect_cache(path, effect, onload, onerror) {
        var res = effect.resources.find(function (res) {
          return res.path == path;
        });
        if (res) {
          onload();
          return res.isLoaded ? res.buffer : null;
        }

        var res = { path: path, isLoaded: false, buffer: null, isRequired: true };
        effect.resources.push(res);

        _loadBinFile(effect.baseDir + path, function (buffer) {
          res.buffer = buffer;
          res.isLoaded = true;
          onload(buffer);
        }, onerror);
        return null;
      }
    }, {
      key: "_getglTFBodyURI",
      value: function _getglTFBodyURI(buffer) {
        var memptr = Module._malloc(buffer.byteLength);
        Module.HEAP8.set(new Uint8Array(buffer), memptr);
        ptr = Core.GetglTFBodyURI(context.nativeptr, memptr, buffer.byteLength);
        str = Module.UTF8ToString(ptr);
        Module._free(memptr);
        return str;
      }
    }, {
      key: "_isBinaryglTF",
      value: function _isBinaryglTF(context, buffer) {
        var memptr = Module._malloc(buffer.byteLength);
        Module.HEAP8.set(new Uint8Array(buffer), memptr);
        var ret = Core.IsBinaryglTF(context.nativeptr, memptr, buffer.byteLength);
        Module._free(memptr);
        return ret > 0;
      }
    }, {
      key: "_makeContextCurrent",
      value: function _makeContextCurrent() {
        Module.GL.makeContextCurrent(this.ctx);
      }

      /**
       * Initialize graphics system.
       * @param {WebGLRenderingContext} webglContext WebGL Context
       * @param {object} settings Some settings with Effekseer initialization
       */

    }, {
      key: "init",
      value: function init(webglContext, settings) {
        this.gl = webglContext;
        this.contextStates = new ContextStates(this.gl);

        window.gl = this.gl;
        // Setup native OpenGL context
        this.ctx = Module.GL.registerContext(webglContext, {
          majorVersion: 1, minorVersion: 0, enableExtensionsByDefault: true
        });
        this._makeContextCurrent();

        if (!settings) {
          settings = {
            instanceMaxCount: 4000,
            squareMaxCount: 10000
          };
        }

        // Initializes Effekseer core.
        this.contextStates.save();
        this.nativeptr = Core.Init(settings.instanceMaxCount, settings.squareMaxCount);
        this.contextStates.restore();
      }

      /**
       * Advance frames.
       * @param {number=} deltaFrames number of advance frames
       */

    }, {
      key: "update",
      value: function update(deltaFrames) {
        if (!deltaFrames) deltaFrames = 1.0;
        // Update frame
        Core.Update(this.nativeptr, deltaFrames);
      }
    }, {
      key: "beginUpdate",
      value: function beginUpdate() {
        Core.BeginUpdate(this.nativeptr);
      }
    }, {
      key: "endUpdate",
      value: function endUpdate() {
        Core.EndUpdate(this.nativeptr);
      }
    }, {
      key: "updateHandle",
      value: function updateHandle(handle, deltaFrames) {
        Core.UpdateHandle(this.nativeptr, handle.native, deltaFrames);
      }

      /**
       * Main rendering.
       */

    }, {
      key: "draw",
      value: function draw() {
        this._makeContextCurrent();

        // Save WebGL states
        var program = this.gl.getParameter(gl.CURRENT_PROGRAM);

        // Draw the effekseer core
        this.contextStates.save();
        Core.Draw(this.nativeptr);
        this.contextStates.restore();

        // Restore WebGL states
        this.gl.useProgram(program);
      }
    }, {
      key: "beginDraw",
      value: function beginDraw() {
        Core.BeginDraw(this.nativeptr);
      }
    }, {
      key: "endDraw",
      value: function endDraw() {
        Core.EndDraw(this.nativeptr);
      }
    }, {
      key: "drawHandle",
      value: function drawHandle(handle) {
        Core.DrawHandle(this.nativeptr, handle.native);
      }

      /**
       * Set camera projection from matrix.
       * @param {array} matrixArray An array that is requred 16 elements
       */

    }, {
      key: "setProjectionMatrix",
      value: function setProjectionMatrix(matrixArray) {
        var stack = Module.stackSave();
        var arrmem = Module.stackAlloc(4 * 16);
        Module.HEAPF32.set(matrixArray, arrmem >> 2);
        Core.SetProjectionMatrix(this.nativeptr, arrmem);
        Module.stackRestore(stack);
      }

      /**
       * Set camera projection from perspective parameters.
       * @param {number} fov Field of view in degree
       * @param {number} aspect Aspect ratio
       * @param {number} near Distance of near plane
       * @param {number} aspect Distance of far plane
       */

    }, {
      key: "setProjectionPerspective",
      value: function setProjectionPerspective(fov, aspect, near, far) {
        Core.SetProjectionPerspective(this.nativeptr, fov, aspect, near, far);
      }

      /**
       * Set camera projection from orthographic parameters.
       * @param {number} width Width coordinate of the view plane
       * @param {number} height Height coordinate of the view plane
       * @param {number} near Distance of near plane
       * @param {number} aspect Distance of far plane
       */

    }, {
      key: "setProjectionOrthographic",
      value: function setProjectionOrthographic(width, height, near, far) {
        Core.SetProjectionOrthographic(this.nativeptr, width, height, near, far);
      }

      /**
       * Set camera view from matrix.
       * @param {array} matrixArray An array that is requred 16 elements
       */

    }, {
      key: "setCameraMatrix",
      value: function setCameraMatrix(matrixArray) {
        var stack = Module.stackSave();
        var arrmem = Module.stackAlloc(4 * 16);
        Module.HEAPF32.set(matrixArray, arrmem >> 2);
        Core.SetCameraMatrix(this.nativeptr, arrmem);
        Module.stackRestore(stack);
      }

      /**
       * Set camera view from lookat parameters.
       * @param {number} positionX X value of camera position
       * @param {number} positionY Y value of camera position
       * @param {number} positionZ Z value of camera position
       * @param {number} targetX X value of target position
       * @param {number} targetY Y value of target position
       * @param {number} targetZ Z value of target position
       * @param {number} upvecX X value of upper vector
       * @param {number} upvecY Y value of upper vector
       * @param {number} upvecZ Z value of upper vector
       */

    }, {
      key: "setCameraLookAt",
      value: function setCameraLookAt(positionX, positionY, positionZ, targetX, targetY, targetZ, upvecX, upvecY, upvecZ) {
        Core.SetCameraLookAt(this.nativeptr, positionX, positionY, positionZ, targetX, targetY, targetZ, upvecX, upvecY, upvecZ);
      }

      /**
       * Set camera view from lookat vector parameters.
       * @param {object} position camera position
       * @param {object} target target position
       * @param {object=} upvec upper vector
       */

    }, {
      key: "setCameraLookAtFromVector",
      value: function setCameraLookAtFromVector(position, target, upvec) {
        upvecVector = (typeof upvecVector === "undefined" ? "undefined" : _typeof(upvecVector)) === "object" ? upvecVector : { x: 0, y: 1, z: 0 };
        Core.SetCameraLookAt(this.nativeptr, position.x, position.y, position.z, target.x, target.y, target.z, upvec.x, upvec.y, upvec.z);
      }

      /**
       * Load the effect data file (and resources).
       * @param {string} path A URL of effect file (*.efk)
       * @param {number} scale A magnification rate for the effect. The effect is loaded magnificating with this specified number.
       * @param {function=} onload A function that is called at loading complete
       * @param {function=} onerror A function that is called at loading error. First argument is a message. Second argument is an url.
       * @returns {EffekseerEffect} The effect data
       */

    }, {
      key: "loadEffect",
      value: function loadEffect(path) {
        var scale = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];

        var _this = this;

        var onload = arguments[2];
        var onerror = arguments[3];

        this._makeContextCurrent();

        var effect = new EffekseerEffect(this);
        var dirIndex = path.lastIndexOf("/");

        if (typeof scale === "function") {
          console.log("Error : second arguments is number from version 1.5");
          effect.scale = 1.0;
          effect.onload = scale;
          effect.onerror = onload;
        } else {
          effect.scale = scale;
          effect.onload = onload;
          effect.onerror = onerror;
        }

        if (typeof path === "string") {
          effect.baseDir = dirIndex >= 0 ? path.slice(0, dirIndex + 1) : "";
          _loadBinFile(path, function (buffer) {

            if (_this._isBinaryglTF(_this, buffer)) {
              // glTF
              bodyPath = _this._getglTFBodyURI(buffer);

              _this._loadBinary_with_effect_cache(bodyPath, effect, function (bufferBody) {
                effect._load(buffer);
              }, effect.onerror);
            } else {
              effect._load(buffer);
            }
          }, effect.onerror);
        } else if (typeof path === "arraybuffer") {
          var buffer = path;
          effect._load(buffer);
        }

        return effect;
      }

      /**
       * Release the specified effect. Don't touch the instance of effect after released.
       * @param {EffekseerEffect} effect The loaded effect
       */

    }, {
      key: "releaseEffect",
      value: function releaseEffect(effect) {
        this._makeContextCurrent();

        if (effect == null) {
          console.warn("the effect is null.");
          return;
        }

        if (!effect.isLoaded) {
          console.warn("the effect has not be loaded yet.");
          return;
        }

        if (effect.nativeptr == null) {
          console.warn("the effect has been released.");
          return;
        }

        Core.ReleaseEffect(this.nativeptr, effect.nativeptr);
        effect.nativeptr = null;
      }

      /**
       * Play the specified effect.
       * @param {EffekseerEffect} effect The loaded effect
       * @param {number} x X value of location that is emited
       * @param {number} y Y value of location that is emited
       * @param {number} z Z value of location that is emited
       * @returns {EffekseerHandle} The effect handle
       */

    }, {
      key: "play",
      value: function play(effect, x, y, z) {
        if (!effect || !effect.isLoaded) {
          return null;
        }
        if (x === undefined) x = 0;
        if (y === undefined) y = 0;
        if (z === undefined) z = 0;
        var handle = Core.PlayEffect(this.nativeptr, effect.nativeptr, x, y, z);
        return handle >= 0 ? new EffekseerHandle(this, handle) : null;
      }

      /**
       * Stop the all effects.
       */

    }, {
      key: "stopAll",
      value: function stopAll() {
        Core.StopAllEffects(this.nativeptr);
      }

      /**
       * Set the resource loader function.
       * @param {function} loader
       */

    }, {
      key: "setResourceLoader",
      value: function setResourceLoader(loader) {
        _loadResource = loader;
      }

      /**
       * Get whether VAO is supported
       */

    }, {
      key: "isVertexArrayObjectSupported",
      value: function isVertexArrayObjectSupported() {
        return Core.IsVertexArrayObjectSupported(this.nativeptr);
      }
    }]);

    return EffekseerContext;
  }();

  /**
   * Effekseer Context
   * @class
   */


  var Effekseer = function () {
    function Effekseer() {
      _classCallCheck(this, Effekseer);
    }

    _createClass(Effekseer, [{
      key: "initRuntime",
      value: function initRuntime(path, onload, onerror) {
        if (typeof effekseer_native === "undefined") {
          onload();
          return;
        }

        _onloadAssembly = onload;
        _onerrorAssembly = onerror;
        _initalize_wasm(path);
      }

      /**
       * Create a context to render in multiple scenes
       * @returns {EffekseerContext} context
       */

    }, {
      key: "createContext",
      value: function createContext() {
        if (!_is_runtime_initialized) {
          return null;
        }

        return new EffekseerContext();
      }

      /**
      * Release specified context. After that, don't touch a context
      * @param {EffekseerContext} context context
      */

    }, {
      key: "releaseContext",
      value: function releaseContext(context) {
        if (context.nativeptr == null) {
          return;
        }
        Core.Terminate(context.nativeptr);
        context.nativeptr = null;
      }

      /**
       * Initialize graphics system.
       * @param {WebGLRenderingContext} webglContext WebGL Context
       * @param {object} settings Some settings with Effekseer initialization
       */

    }, {
      key: "init",
      value: function init(webglContext, settings) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext = new EffekseerContext();
        this.defaultContext.init(webglContext, settings);
      }

      /**
       * Advance frames.
       * @param {number=} deltaFrames number of advance frames
       */

    }, {
      key: "update",
      value: function update(deltaFrames) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.update(deltaFrames);
      }
    }, {
      key: "beginUpdate",
      value: function beginUpdate() {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.beginUpdate();
      }
    }, {
      key: "endUpdate",
      value: function endUpdate() {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.endUpdate();
      }
    }, {
      key: "updateHandle",
      value: function updateHandle(handle, deltaFrames) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.updateHandle(handle, deltaFrames);
      }

      /**
       * Main rendering.
       */

    }, {
      key: "draw",
      value: function draw() {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.draw();
      }
    }, {
      key: "beginDraw",
      value: function beginDraw() {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.beginDraw();
      }
    }, {
      key: "endDraw",
      value: function endDraw() {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.endDraw();
      }
    }, {
      key: "drawHandle",
      value: function drawHandle(handle) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.drawHandle(handle);
      }

      /**
       * Set camera projection from matrix.
       * @param {array} matrixArray An array that is requred 16 elements
       */

    }, {
      key: "setProjectionMatrix",
      value: function setProjectionMatrix(matrixArray) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.setProjectionMatrix(matrixArray);
      }

      /**
       * Set camera projection from perspective parameters.
       * @param {number} fov Field of view in degree
       * @param {number} aspect Aspect ratio
       * @param {number} near Distance of near plane
       * @param {number} aspect Distance of far plane
       */

    }, {
      key: "setProjectionPerspective",
      value: function setProjectionPerspective(fov, aspect, near, far) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.SetProjectionPerspective(fov, aspect, near, far);
      }

      /**
       * Set camera projection from orthographic parameters.
       * @param {number} width Width coordinate of the view plane
       * @param {number} height Height coordinate of the view plane
       * @param {number} near Distance of near plane
       * @param {number} aspect Distance of far plane
       */

    }, {
      key: "setProjectionOrthographic",
      value: function setProjectionOrthographic(width, height, near, far) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.setProjectionOrthographic(width, height, near, far);
      }

      /**
       * Set camera view from matrix.
       * @param {array} matrixArray An array that is requred 16 elements
       */

    }, {
      key: "setCameraMatrix",
      value: function setCameraMatrix(matrixArray) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.setCameraMatrix(matrixArray);
      }

      /**
       * Set camera view from lookat parameters.
       * @param {number} positionX X value of camera position
       * @param {number} positionY Y value of camera position
       * @param {number} positionZ Z value of camera position
       * @param {number} targetX X value of target position
       * @param {number} targetY Y value of target position
       * @param {number} targetZ Z value of target position
       * @param {number} upvecX X value of upper vector
       * @param {number} upvecY Y value of upper vector
       * @param {number} upvecZ Z value of upper vector
       */

    }, {
      key: "setCameraLookAt",
      value: function setCameraLookAt(positionX, positionY, positionZ, targetX, targetY, targetZ, upvecX, upvecY, upvecZ) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.setCameraLookAt(positionX, positionY, positionZ, targetX, targetY, targetZ, upvecX, upvecY, upvecZ);
      }

      /**
       * Set camera view from lookat vector parameters.
       * @param {object} position camera position
       * @param {object} target target position
       * @param {object=} upvec upper vector
       */

    }, {
      key: "setCameraLookAtFromVector",
      value: function setCameraLookAtFromVector(position, target, upvec) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.setCameraLookAtFromVector(position, target, upvec);
      }

      /**
       * Load the effect data file (and resources).
       * @param {string} path A URL of effect file (*.efk)
       * @param {number} scale A magnification rate for the effect. The effect is loaded magnificating with this specified number.
       * @param {function=} onload A function that is called at loading complete
       * @param {function=} onerror A function that is called at loading error. First argument is a message. Second argument is an url.
       * @returns {EffekseerEffect} The effect data
       */

    }, {
      key: "loadEffect",
      value: function loadEffect(path) {
        var scale = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];
        var onload = arguments[2];
        var onerror = arguments[3];

        console.warn('deprecated : please use through createContext.');
        return this.defaultContext.loadEffect(path, scale, onload, onerror);
      }

      /**
       * Release the specified effect. Don't touch the instance of effect after released.
       * @param {EffekseerEffect} effect The loaded effect
       */

    }, {
      key: "releaseEffect",
      value: function releaseEffect(effect) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.releaseEffect(effect);
      }

      /**
       * Play the specified effect.
       * @param {EffekseerEffect} effect The loaded effect
       * @param {number} x X value of location that is emited
       * @param {number} y Y value of location that is emited
       * @param {number} z Z value of location that is emited
       * @returns {EffekseerHandle} The effect handle
       */

    }, {
      key: "play",
      value: function play(effect, x, y, z) {
        console.warn('deprecated : please use through createContext.');
        return this.defaultContext.play(effect, x, y, z);
      }

      /**
       * Stop the all effects.
       */

    }, {
      key: "stopAll",
      value: function stopAll() {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.stopAll();
      }

      /**
       * Set the resource loader function.
       * @param {function} loader
       */

    }, {
      key: "setResourceLoader",
      value: function setResourceLoader(loader) {
        console.warn('deprecated : please use through createContext.');
        this.defaultContext.setResourceLoader(loader);
      }

      /**
       * Get whether VAO is supported
       */

    }, {
      key: "isVertexArrayObjectSupported",
      value: function isVertexArrayObjectSupported() {
        console.warn('deprecated : please use through createContext.');
        return this.defaultContext.isVertexArrayObjectSupported();
      }
    }]);

    return Effekseer;
  }();

  return new Effekseer();
}();

// Add support for CommonJS libraries such as browserify.
if (typeof exports !== 'undefined') {
  exports = effekseer;
}