/**
 * Demonstrates how to load MD2 models.
 * 
 * Credits: https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_md2.html
 *
 */


import * as THREE from '../../libs/three.js-r110/build/three.module.js';
import Stats from '../../libs/three.js-r110/examples/jsm/libs/stats.module.js';
import { GUI } from '../../libs/three.js-r110/examples/jsm/libs/dat.gui.module.js';

import { OrbitControls } from '../../libs/three.js-r110/examples/jsm/controls/OrbitControls.js';
import { MD2Character } from '../../libs/three.js-r110/examples/jsm/misc/MD2Character.js';

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container, camera, scene, renderer;

var character;
var character_2;
var character_3;

var gui, playbackConfig = {
    speed: 1.0,
    wireframe: false
};

var controls;

var clock = new THREE.Clock();

var stats;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    // CAMERA

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 150, 400);

    // SCENE

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 400, 1000);

    // LIGHTS

    scene.add(new THREE.AmbientLight(0x222222));

    var light = new THREE.SpotLight(0xffffff, 5, 1000);
    light.position.set(200, 250, 500);
    light.angle = 0.5;
    light.penumbra = 0.5;

    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    //scene.add( new CameraHelper( light.shadow.camera ) );
    scene.add(light);

    var light = new THREE.SpotLight(0xffffff, 5, 1000);
    light.position.set(- 100, 350, 350);
    light.angle = 0.5;
    light.penumbra = 0.5;

    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    // scene.add( new CameraHelper( light.shadow.camera ) );
    scene.add(light);

    //  GROUND

    var gt = new THREE.TextureLoader().load("../../libs/three.js-r110/examples/textures/terrain/grasslight-big.jpg");
    var gg = new THREE.PlaneBufferGeometry(2000, 2000);
    var gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });

    var ground = new THREE.Mesh(gg, gm);
    ground.rotation.x = - Math.PI / 2;
    ground.material.map.repeat.set(8, 8);
    ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;
    ground.receiveShadow = true;

    scene.add(ground);

    // RENDERER

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container.appendChild(renderer.domElement);

    //

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;

    // STATS

    stats = new Stats();
    container.appendChild(stats.dom);

    // EVENTS

    window.addEventListener('resize', onWindowResize, false);

    // CONTROLS

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 50, 0);
    controls.update();

    // GUI

    gui = new GUI();

    // -------------------------- FERNANDO
    gui.add(playbackConfig, 'speed', 0, 2).onChange(function () {
        character.setPlaybackRate(playbackConfig.speed);
    });

    gui.add(playbackConfig, 'wireframe', false).onChange(function () {
        character.setWireframe(playbackConfig.wireframe);
    });

    // -------------------------- NATAN
    gui.add(playbackConfig, 'speed', 0, 2).onChange(function () {
        character_2.setPlaybackRate(playbackConfig.speed);
    });

    gui.add(playbackConfig, 'wireframe', false).onChange(function () {
        character_2.setWireframe(playbackConfig.wireframe);
    });

    // -------------------------- GEFFE
    gui.add(playbackConfig, 'speed', 0, 2).onChange(function () {
        character_3.setPlaybackRate(playbackConfig.speed);
    });

    gui.add(playbackConfig, 'wireframe', false).onChange(function () {
        character_3.setWireframe(playbackConfig.wireframe);
    });

    // CHARACTER
    // -------------------------- FERNANDO
    var config = {

        baseUrl: "../../libs/three.js-r110/examples/models/md2/ratamahatta/",

        body: "ratamahatta.md2",
        skins: ["ratamahatta.png"],
        weapons: []
    };

    character = new MD2Character();
    character.scale = 2;

    // character.onLoadComplete = function () {
    //     character.setAnimation(character.meshBody.geometry.animations[4].name);
    // };

    character.loadParts(config);

    scene.add(character.root);

    // -------------------------- GERRAR ALUNOS
    var config_2 = []
    var character_2 = []
    for (var i = 0; i < 30; i++) {
        config_2[i] = {

            baseUrl: "../../libs/three.js-r110/examples/models/md2/ratamahatta/",

            body: "ratamahatta.md2",
            skins: ["ratamahatta_natan.png"],
            weapons: []
        };

        if( i % 2 == 1){
            config_2[i].skins = ["ratamahatta_geffe.png"];
        }

        character_2[i] = new MD2Character();
        character_2[i].scale = 0.5;

        character_2[i].loadParts(config_2[i]);

        scene.add(character_2[i].root);

    }

    for (var i = 0; i < 5; i++) {
        character_2[i].root.position.x += i*-30;
    }

    var j=0;
    for (var i = 5; i < 10; i++) {
        j++;
        character_2[i].root.position.x += 15 + (j*-30);
        character_2[i].root.position.z += 20;
    }

    j=0;
    for (var i = 10; i < 15; i++) {
        j++;
        character_2[i].root.position.x += j*-30;
        character_2[i].root.position.z += -20;
    }

    j=0;
    for (var i = 15; i < 20; i++) {
        j++;
        character_2[i].root.position.x += j*30;
    }

    j=0;
    for (var i = 20; i < 25; i++) {
        j++;
        character_2[i].root.position.x += -15 + (j*30);
        character_2[i].root.position.z += 20;
    }

    j=0;
    for (var i = 25; i < 30; i++) {
        j++;
        character_2[i].root.position.x += -15 + (j*30);
        character_2[i].root.position.z += -20;
    }
}

// EVENT HANDLERS

function onWindowResize() {

    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();

}

// GUI

function labelize(text) {

    var parts = text.split(".");

    if (parts.length > 1) {

        parts.length -= 1;
        return parts.join(".");

    }

    return text;

}

//

function setupWeaponsGUI(character) {

    var folder = gui.addFolder("Weapons");

    var generateCallback = function (index) {

        return function () {

            character.setWeapon(index);

        };

    };

    var guiItems = [];

    for (var i = 0; i < character.weapons.length; i++) {

        var name = character.weapons[i].name;

        playbackConfig[name] = generateCallback(i);
        guiItems[i] = folder.add(playbackConfig, name).name(labelize(name));

    }

}

//

function setupSkinsGUI(character) {

    var folder = gui.addFolder("Skins");

    var generateCallback = function (index) {

        return function () {

            character.setSkin(index);

        };

    };

    var guiItems = [];

    for (var i = 0; i < character.skinsBody.length; i++) {

        var name = character.skinsBody[i].name;

        playbackConfig[name] = generateCallback(i);
        guiItems[i] = folder.add(playbackConfig, name).name(labelize(name));

    }

}

//

function setupGUIAnimations(character) {
    var folder = gui.addFolder("Animations");

    var generateCallback = function (animationClip) {

        return function () {

            character.setAnimation(animationClip.name);

        };

    };

    var i = 0, guiItems = [];
    var animations = character.meshBody.geometry.animations;

    for (var i = 0; i < animations.length; i++) {

        var clip = animations[i];

        playbackConfig[clip.name] = generateCallback(clip);
        guiItems[i] = folder.add(playbackConfig, clip.name, clip.name);

        i++;

    }
}

function animate() {
    requestAnimationFrame(animate);
    render();

    stats.update();
}

function render() {
    var delta = clock.getDelta();
    character.update(delta);

    character.root.rotation.y += 0.02;
    renderer.render(scene, camera);
}

function onKeyDown(event) {
    var keyCode = event.which;
    var speed = 0.8;

    if (keyCode == 65) {
        character.root.position.x -= speed;
    } else if (keyCode == 68) {
        character.root.position.x += speed;
    }
};

document.addEventListener("keydown", onKeyDown, false);