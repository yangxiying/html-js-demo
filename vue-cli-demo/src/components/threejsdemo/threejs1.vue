<template>
  <div>
    <div>
      <el-button @click="initMesh">正方体一</el-button>
      <el-button @click="initDemo">正方体二</el-button>
      <el-button @click="initdemo22">add</el-button>
    </div>
    <div ref="demo1"></div>
    <div ref="demo2"></div>
  </div>
</template>

<script>
import * as THREE from "three";
// import dat from "dat.gui";
export default {
  data: () => ({
    controls: {
      scene: null,
      camera: null,
      renderer: null,
      rotationSpeed: 0.02,
      plane: null,
      mouse: null,
      raycaster: null,
      isShiftDown: null,

      rollOverMesh: null,
      rollOverMaterial: null,

      cubeGeo: null,
      cubeMaterial: null,

      
    },
    objects: []
  }),
  created() {
    this.$nextTick(() => {
      // this.init();
    });
  },
  methods: {
    init() {
      // let { initMesh, controls } = this;
      //   const gui = new dat.GUI(); // gui监测器
      //   gui.add(controls, "rotationSpeed", 0, 0.5);
      // this.initMesh();
      this.initDemo();
    },
    initMesh() {
      this.scene = new THREE.Scene(); // 场景

      this.camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      ); //透视相机 相机.视场(角度)，长宽比，近面，远面
      this.camera.position.x = -20;
      this.camera.position.y = 40;
      this.camera.position.z = 30;
      this.camera.lookAt(this.scene.position);

      this.renderer = new THREE.WebGLRenderer({ antialias: true }); // 渲染器
      this.renderer.setSize(window.innerWidth, window.innerHeight - 100); // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
      this.renderer.shadowMapEnabled = true; // 开启阴影

      let axes = new THREE.AxisHelper(20); // 坐标轴

      let planeGeometry = new THREE.PlaneGeometry(60, 20, 10, 10); // 生成平面
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // 材质
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 0;
      plane.position.y = 0;
      plane.position.z = 0;
      plane.receiveShadow = true;

      let cubeGeometry = new THREE.CubeGeometry(10, 10, 10); //几何体
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.position.x = -4;
      this.cube.position.y = 3;
      this.cube.position.z = 0;
      this.cube.castShadow = true;

      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40, 60, -10);
      spotLight.castShadow = true;

      this.scene.add(axes); // 场景添加坐标轴
      this.scene.add(plane); // 向该场景中添加物体
      this.scene.add(this.cube);
      this.scene.add(spotLight);
      this.$refs.demo1.innerHTML = "";
      this.$refs.demo1.append(this.renderer.domElement);
      this.renderScene();
    },
    renderScene() {
      let { controls, cube, scene, camera, renderer } = this;
      cube.rotation.x += controls.rotationSpeed;
      cube.rotation.y += controls.rotationSpeed;
      cube.rotation.z += controls.rotationSpeed;
      renderer.render(scene, camera); //
      requestAnimationFrame(this.renderScene); //浏览器去执行一次参数中的函数
    },
    //这个是官网的例子
    //https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene
    initDemo() {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      // document.body.appendChild(renderer.domElement);
      this.$refs.demo1.innerHTML = "";
      this.$refs.demo1.appendChild(renderer.domElement);

      var geometry = new THREE.BoxGeometry();
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      var animate = function() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
      //检测当前用户所使用的环境是否支持WebGL
      // if (WEBGL.isWebGLAvailable()) {
      //   animate();
      // } else {
      //   var warning = WEBGL.getWebGLErrorMessage();
      //   this.$refs.demo1.appendChild(warning);
      // }
    },
    initdemo22() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(500, 800, 1300);
      this.camera.lookAt(0, 0, 0);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf0f0f0);

      // roll-over helpers

      var rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
      this.rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true
      });
      this.rollOverMesh = new THREE.Mesh(rollOverGeo, this.rollOverMaterial);
      this.scene.add(this.rollOverMesh);

      // cubes

      this.cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
      this.cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xfeb74c,
        map: new THREE.TextureLoader().load(
          "textures/square-outline-textured.png"
        )
      });

      // grid

      var gridHelper = new THREE.GridHelper(1000, 20);
      this.scene.add(gridHelper);

      //

      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      var geometry = new THREE.PlaneBufferGeometry(1000, 1000);
      geometry.rotateX(-Math.PI / 2);

      this.plane = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ visible: false })
      );
      this.scene.add(this.plane);

      this.objects.push(this.plane);

      // lights

      var ambientLight = new THREE.AmbientLight(0x606060);
      this.scene.add(ambientLight);

      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 0.75, 0.5).normalize();
      this.scene.add(directionalLight);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.demo2.appendChild(this.renderer.domElement);

      document.addEventListener("mousemove", this.onDocumentMouseMove, false);
      document.addEventListener("mousedown", this.onDocumentMouseDown, false);
      document.addEventListener("keydown", this.onDocumentKeyDown, false);
      document.addEventListener("keyup", this.onDocumentKeyUp, false);

      //

      window.addEventListener("resize", this.onWindowResize, false);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    onDocumentMouseMove(event) {
      event.preventDefault();

      this.mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      this.raycaster.setFromCamera(this.mouse, this.camera);

      var intersects = this.raycaster.intersectObjects(this.objects);

      if (intersects.length > 0) {
        var intersect = intersects[0];

        this.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        this.rollOverMesh.position
          .divideScalar(50)
          .floor()
          .multiplyScalar(50)
          .addScalar(25);
      }

      this.render();
    },

    onDocumentMouseDown(event) {
      event.preventDefault();

      this.mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      this.raycaster.setFromCamera(this.mouse, this.camera);

      var intersects = this.raycaster.intersectObjects(this.objects);

      if (intersects.length > 0) {
        var intersect = intersects[0];

        // delete cube

        if (this.isShiftDown) {
          if (intersect.object !== plane) {
            this.scene.remove(intersect.object);

            this.objects.splice(this.objects.indexOf(intersect.object), 1);
          }

          // create cube
        } else {
          var voxel = new THREE.Mesh(this.cubeGeo, this.cubeMaterial);
          voxel.position.copy(intersect.point).add(intersect.face.normal);
          voxel.position
            .divideScalar(50)
            .floor()
            .multiplyScalar(50)
            .addScalar(25);
          this.scene.add(voxel);

          this.objects.push(voxel);
        }

        this.render();
      }
    },

    onDocumentKeyDown(event) {
      switch (event.keyCode) {
        case 16:
          this.isShiftDown = true;
          break;
      }
    },

    onDocumentKeyUp(event) {
      switch (event.keyCode) {
        case 16:
          this.isShiftDown = false;
          break;
      }
    },

    render() {
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style>
</style>