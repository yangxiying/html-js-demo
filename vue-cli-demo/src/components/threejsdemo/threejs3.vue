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
      let xlen = window.innerWidth / 2;
      let ylen = 600;

      this.scene = new THREE.Scene(); // 场景

      this.camera = new THREE.PerspectiveCamera(45, xlen / ylen, 1, 1000); //透视相机 相机.视场(角度)，长宽比，近面，远面
      this.camera.position.x = 0;
      this.camera.position.y = 1000;
      this.camera.position.z = 0;
      this.camera.lookAt(this.scene.position);
      this.camera.up.x = 0;
      this.camera.up.y = 0;
      this.camera.up.z = 1;
      // this.camera.lookAt({
      //   x: 0,
      //   y: 0,
      //   z: 0
      // });

      this.renderer = new THREE.WebGLRenderer({ antialias: true }); // 渲染器
      // this.renderer.setSize(window.innerWidth/2, window.innerHeight - 100); // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度

      this.renderer.setSize(xlen, ylen); // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度

      let light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
      light.position.set(100, 100, 200);
      this.scene.add(light);

      // 通过下面方式画一条线

      let geometry = new THREE.Geometry();
      // B begin
      geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
      geometry.vertices.push(new THREE.Vector3(500, 0, 0));
      // B end

      for (var i = 0; i <= 100; i++) {
        let line = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 0.2 })
        );
        line.position.z = i * 50 - 500;
        this.scene.add(line);

        let line2 = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 0.2 })
        );
        line2.position.x = i * 50 - 500;
        line2.rotation.y = (90 * Math.PI) / 180;
        this.scene.add(line2);
      }

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