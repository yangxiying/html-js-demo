<template>
  <div ref="demo1"></div>
</template>

<script>
import * as THREE from "three";
export default {
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      light: null,
      cube: null,
      width: null,
      height: null
    };
  },
  created() {
    this.$nextTick(() => {
      this.initMesh();
    });
  },
  methods: {
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
    //   this.renderer.shadowMap.enabled = true; // 开启阴影
 
 // 通过下面方式画一条线
      let geometry = new THREE.Geometry();
      let material = new THREE.LineBasicMaterial({ vertexColors: true });
      let color1 = new THREE.Color(0x444444),
        color2 = new THREE.Color(0xff0000);

      // 线的材质可以由2点的颜色决定  (x,y,z)
      let p1 = new THREE.Vector3(-200, 50, 100);
      let p2 = new THREE.Vector3(200, 0, -100);
      geometry.vertices.push(p1);
      geometry.vertices.push(p2);
      geometry.colors.push(color1, color2);

      let line = new THREE.Line(geometry, material, THREE.LineSegments);
      this.scene.add(line);

      this.$refs.demo1.append(this.renderer.domElement);
      //   this.renderScene();
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style>
/* div {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 600px;
  background-color: #eeeeee;
} */
</style>