import * as THREE from './libs/three/build/three.module.js';

import {TrackballControls} from './libs/three/examples/jsm/controls/TrackballControls.js';

import {EffectComposer} from './libs/three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from './libs/three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from './libs/three/examples/jsm/postprocessing/UnrealBloomPass.js';

var gui = new dat.GUI({load: JSON, preset: 'Default', width: 260});
var effekseerContext;

onload = function(){
    init();
}

function initEffect(renderer){
    effekseer.initRuntime('js/effekseer.wasm', ()=>{
        effekseerContext = effekseer.createContext();
        effekseerContext.init(renderer.getContext());

        playEffect('effects/test/uvscroll/test_uvscroll.efk');
    });
}

function updateEffect(camera){
    if( !effekseerContext ) return;
    effekseerContext.update();
    effekseerContext.setProjectionMatrix(camera.projectionMatrix.elements);
    effekseerContext.setCameraMatrix(camera.matrixWorldInverse.elements);
    effekseerContext.draw();
}

function playEffect(path){
    if( !effekseerContext ) return;
    var effect = effekseerContext.loadEffect(
        path,
        1,
        function(){
            var pos = new THREE.Vector3(0,0,0);
            if(targetMatrix){
                var t = targetMatrix.matrixWorld.elements;
                pos.x = t[12];
                pos.y = t[13];
                pos.z = t[14];
            }
            effekseerContext.stopAll();
            effekseerContext.play(effect, pos.x, pos.y, pos.z);
    });
}

function stopEffect(){
    effekseerContext && effekseerContext.stopAll();
}


var bloomParameter = new function(){
    this.visible = false;
    this.strength = 1;
    this.radius = 0.4;
    this.threshold = 0.8;
}

var gridParameter = {
    isVisible: true,
}

var targetMatrix;

function setBgColor(c){
    renderer.setClearColor( new THREE.Color(c[0], c[1], c[2]), c[3]);
    bgColor = [c[0], c[1], c[2], c[3]];
}

function updateBgColor(hex){
    var r = parseInt(hex.substring(1,3),16)/255.0;
    var g = parseInt(hex.substring(3,5),16)/255.0;
    var b = parseInt(hex.substring(5,7),16)/255.0;
    var a = 1;
    setBgColor([r,g,b,a]);
}

//  メニューの初期化
function initDebugMenu(scene){
    let lightParams = [
        {visible: true, color: [1,1,1], x:-1, y:1, z:1, intensity: 1},
        {visible: false, color: [1,1,1], x:1, y:1, z:1, intensity: 1},
        {visible: false, color: [1,1,1], x:0, y:-1, z:1, intensity: 1},
    ];

    var numLights = lightParams.length;

    var LightItemFormat = function(){
        this.visible;
        this.x;
        this.y;
        this.z;
        this.color;
        this.intensity;
    };

    var lightItems = [];

    for(var i=0; i<numLights; i++){
        var item = new LightItemFormat();
        var param = lightParams[i];
        item.visible = param.visible;
        item.x = param.x;
        item.y = param.y;
        item.z = param.z;
        item.color = [param.color[0]*255, param.color[1]*255, param.color[2]*255];
        item.intensity = param.intensity;
        lightItems.push(item);
    }

    var sceneLights = [];
    for(var i=0;i<numLights; i++){
        sceneLights.push(new THREE.DirectionalLight());
    }

    var folder = gui.addFolder('Lights');
    var folderLights = new Array(numLights);
    for(var i=0; i<numLights; i++){
        var f = folder.addFolder(`Light${i}`);
        var light = sceneLights[i];
        var item = lightItems[i];

        gui.remember(item);

        folderLights[i] = f;

        (function(light, f, item){
            var poschange = ()=>{light.position.set(item.x, item.y, item.z);};
            f.add(item, 'visible').onChange(()=>{light.visible = item.visible;});
            f.add(item, 'x', -10, 10).onChange(poschange);
            f.add(item, 'y', -10, 10).onChange(poschange);
            f.add(item, 'z', -10, 10).onChange(poschange);
            f.addColor(item, 'color').onChange(()=>{
                light.color.setRGB(item.color[0]/255, item.color[1]/255, item.color[2]/255);
            });
            f.add(item, 'intensity', 0, 1).onChange(()=>{light.intensity = item.intensity;});
        })(light, f, item);
    }

    for(var i=0; i<numLights; i++){
        var l = lightItems[i];
        var light = sceneLights[i];
        
        light.position.set(l.x, l.y, l.z);
        light.color.setRGB(l.color[0]/255, l.color[1]/255, l.color[2]/255);
        light.visible = l.visible;
        light.intensity = l.intensity;
        scene.add(light);
    }

    var lightAmbient = new THREE.AmbientLight();
    var ambientItem = {
        color: [128, 128, 128],
    };
    gui.remember(ambientItem);
    var updateAmbient = ()=>{lightAmbient.color.setRGB(ambientItem.color[0]/255, ambientItem.color[1]/255, ambientItem.color[2]/255);};
    var folderAmbient = folder.addFolder('Ambient');
    var ctrlAmbient = folderAmbient.addColor(ambientItem, 'color');
    ctrlAmbient.onChange(updateAmbient);
    updateAmbient();
    scene.add( lightAmbient );

    gui.remember(bloomParameter);
    var folderBloom = folder.addFolder('Bloom');
    folderBloom.add(bloomParameter, 'visible');
    folderBloom.add(bloomParameter, 'strength', 0, 5);
    folderBloom.add(bloomParameter, 'radius', 0, 1);
    folderBloom.add(bloomParameter, 'threshold', 0, 1);

    var cameraItem = {
        reset: ()=>{
            cameraControl.reset();
        },
    };
    var folderCamera = gui.addFolder('Camera');
    folderCamera.add(cameraItem, 'reset');

    var folderGrid = gui.addFolder('Grid');
    gui.remember(gridParameter);
    folderGrid.add(gridParameter, 'isVisible');
}

//  ポストエフェクトの初期化
function initBloom(renderer, scene, camera){
    //  ステンシルを有効にしたレンダーバッファを作成して渡す
    var parameters = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: true
    };
    var size = renderer.getSize( new THREE.Vector2() );
    var pixelRatio = renderer.getPixelRatio();
    var width = size.width;
    var height = size.height;
    var renderTarget = new THREE.WebGLRenderTarget( width * pixelRatio, height * pixelRatio, parameters );
    renderTarget.texture.name = 'StencilEnabled.rt1';

    var composer = new EffectComposer(renderer, renderTarget); 
    var renderPass = new RenderPass(scene, camera); //, overrideMaterial, bgColor, 0.5);
    var screenSize = new THREE.Vector2();
    renderer.getSize(screenSize);
    var bloomPass = new UnrealBloomPass(screenSize, bloomParameter.strength, bloomParameter.radius, bloomParameter.threshold);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    return [bloomPass, composer];
}


var renderer;
var scene;
var bgColor = [0.2, 0.4, 0.3, 1];
var cameraControl;

function init(){
    var wsize = new THREE.Vector2(800, 600);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({stencil: true, alpha: true});

    var camera = new THREE.PerspectiveCamera(75, wsize.x / wsize.y, 0.1, 1000);

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    initEffect(renderer);

    setBgColor(bgColor);

    renderer.state.buffers.stencil.setTest(true);

    renderer.setSize(wsize.x, wsize.y);
    document.getElementById("three").appendChild(renderer.domElement);

    camera.position.z = 5;
    cameraControl = new TrackballControls(camera, renderer.domElement);

    var clock = new THREE.Clock();
    initDebugMenu(scene);

    var grid = new THREE.GridHelper(20, 20);
    scene.add(grid);

    scene.onAfterRender = (renderer, scene, camera)=>{
        updateEffect(camera);
        renderer.state.reset();
    };


    var [bloomPass, composer] = initBloom(renderer, scene, camera);

    var updateProc = function() {
        window.requestAnimationFrame(updateProc);
        stats.begin();
      
        //  グリッドの表示制御
        grid.visible = gridParameter.isVisible;

        renderer.clear(true, true, true);

        cameraControl.update();

        if( composer && bloomParameter.visible ){
            bloomPass.strength = bloomParameter.strength;
            bloomPass.radius = bloomParameter.radius;
            bloomPass.threshold = bloomParameter.threshold;
            composer.render();
        }
        else{
            renderer.render(scene, camera);
        }

        stats.end();
    };

    window.requestAnimationFrame(updateProc);
}


//  モジュール内部なので、外で参照できるよう関数をwindowに公開する。
window.updateBgColor = updateBgColor;
window.playEffect = playEffect;
window.stopEffect = stopEffect;

