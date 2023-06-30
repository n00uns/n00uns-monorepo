import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from "enable3d";
import * as THREE from "three";
import Click from "./utils/click.js";

export class ThreePhysicsComponent extends Scene3D {
  constructor() {
    super();
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async preload() {}

  async create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed("-ground");

    // position camera
    this.camera.position.set(3, 7, 18);
    this.camera.lookAt(0, 0, 0);

    this.load.texture('./textures/grid.png').then((texture) => {
      console.log(texture);
      texture.wrapS = texture.wrapT = 1000;
      texture.repeat.set(25, 25);

      let ground = this.physics.add.ground(
        {
          name: "ground",
          width: 50,
          height: 50,
          depth: 1,
          y: -0.5,
        },
        {
          phong: {
            map: texture,
            transparent: true,
            opacity: 0.8,
            color: 0xffffff,
          },
        }
      );
      ground.body.setRestitution(1);
    });

    // enable physics debug
    // if (this.physics.debug) {
    //   this.physics.debug.enable();
    // }

    // add shape with physics
    // let box1 = this.physics.add.box({}, { phong: { color: "green" } });
    // let sphere1 = this.physics.add.sphere(
    //   { y: 5, z: -3 },
    //   { lambert: { color: "yellow" } }
    // );
    // sphere1.body.setBounciness(0.4);
    // sphere1.body.applyForceX(0.3);

    //gltf loader duck
    // new GLTFLoader().loadAsync("/Duck.glb").then((gltf) => {
    //   const duck: any = gltf.scene.children[0];
    //   duck.position.y -= 1;
    //   const object = new ExtendedObject3D();
    //   object.add(duck);
    //   object.position.z = 6;
    //   this.add.existing(object);
    //   // this.physics.add.existing(object, {
    //   //   shape: "box",
    //   //   width: 2,
    //   //   height: 2,
    //   //   depth: 2,
    //   // });

    //   // duck.position.z = 6;
    //   // this.scene.add(duck as any);
    //   this.physics.add.existing(duck, { shape: "convex" });
    // });

    //gltf loader statue
    new GLTFLoader().loadAsync("./models/statue.glb").then((gltf) => {
      const config = {
        // breakable: true,
        // fractureImpulse: 5,
        // collisionFlags: 3,
        width: 1,
        height: 3.2,
        depth: 1,
        mass: 10,
        shape: "box",
      };
      const model: any = gltf.scene.children[0];
      model.position.y = -1.6;
      model.scale.set(5, 5, 5);
      const object = new ExtendedObject3D();
      object.add(model);
      object.position.z = 6;
      this.add.existing(object);
      this.physics.add.existing(object, config);
    });

    //gltf loader statue
    // new GLTFLoader().loadAsync("/n00ugles.glb").then((gltf) => {
    //   const model: any = gltf.scene.children[0];
    //   model.position.y = 10;
    //   model.scale.set(5, 5, 5);
    //   const object = new ExtendedObject3D();
    //   object.add(model);
    //   object.position.z = 6;
    //   this.add.existing(object);
    //   this.physics.add.existing(model, { shape: "convex" });
    // });

    // let box2 = this.physics.add.box(
    //   { x: -10, z: 6 },
    //   { phong: { color: "red" } }
    // );
    // box2.body.applyForceX(15);

    // compound objects
    // let group = new THREE.Group();
    // group.position.z = 9;
    // group.position.y = 5;
    // group.rotation.z -= 1.5;
    // let c1 = this.add.box({ x: -1, y: -1 });
    // let c2 = this.add.box({ x: -1, y: 0 });
    // let c3 = this.add.box({ x: -1, y: 1 });
    // let c4 = this.add.box({ y: 1 });
    // let c5 = this.add.box({ x: 1, y: 1 });
    // let c6 = this.add.box({ x: 2, y: 1 });
    // this.add.existing(group);
    // group.add(c1 as any);
    // group.add(c2 as any);
    // group.add(c3 as any);
    // group.add(c4 as any);
    // group.add(c5 as any);
    // group.add(c6 as any);
    // this.physics.add.existing(group as any);

    const addHouse = (physics) => {
      // extract the object factory from physics
      // the factory will make/add object without physics
      const { factory } = physics;

      const config = {
        depth: 0.4,
        breakable: true,
        fractureImpulse: 5,
        collisionFlags: 3,
      };

      // front
      physics.add.box({ y: 3, x: 2, z: 4, width: 4, height: 2, ...config });
      physics.add.box({ y: 1, x: 2, z: 4, width: 4, height: 2, ...config });
      physics.add.box({ y: 1, x: -2, z: 4, width: 4, height: 2, ...config });
      physics.add.box({ y: 3, x: -2, z: 4, width: 4, height: 2, ...config });

      // back
      physics.add.box({ y: 1, x: -2, z: 0, width: 4, height: 2, ...config });
      physics.add.box({ y: 3, x: -2, z: 0, width: 4, height: 2, ...config });
      physics.add.box({ y: 1, x: 2, z: 0, width: 4, height: 2, ...config });
      physics.add.box({ y: 3, x: 2, z: 0, width: 4, height: 2, ...config });

      // left and right
      physics.add.box({
        ...config,
        y: 2,
        x: -4,
        z: 2,
        depth: 4,
        height: 4,
        width: 1,
      });
      physics.add.box({
        ...config,
        y: 2,
        x: 4,
        z: 2,
        depth: 4,
        height: 4,
        width: 1,
      });

      // roof
      let r1 = factory.add.box({
        y: 4.75,
        x: 0,
        z: 0.5,
        width: 8,
        height: 4,
        ...config,
      });
      let r2 = factory.add.box({
        y: 4.75,
        x: 0,
        z: 3.5,
        width: 8,
        height: 4,
        ...config,
      });
      r1.rotateX(Math.PI / 4);
      r2.rotateX(-Math.PI / 4);
      physics.add.existing(r1, { collisionFlags: 3, breakable: true });
      physics.add.existing(r2, { collisionFlags: 3, breakable: true });
    };

    const addWall = (physics) => {
      const { factory } = physics;

      const config = {
        depth: 0.5,
        breakable: true,
        fractureImpulse: 5,
        collisionFlags: 3,
      };

      const config2 = {
        depth: 0.2,
        breakable: false,
      };

      this.load.texture('./textures/vrb.png').then((texture) => {
        console.log(texture);
        texture.wrapS = texture.wrapT = 1; // RepeatWrapping
        texture.repeat.set(1,1);
  
        physics.add.box({ y: 5, x: 0, z: 0, width: 10, height: 10, ...config });
        let reveal = physics.add.box({ y: 5, x: 0, z: 0, width: 5, height: 5, ...config2 }, {
          phong: {
            map: texture,
            // transparent: true,
            opacity: 0.8,
            // color: 0xffffff,
          },
        });
        reveal.body.setCollisionFlags(2);
      });

    };

    const initCanon = (physics, camera) => {
      const raycaster = new THREE.Raycaster();
      const force = 15;

      window.addEventListener("pointerup", (event) => {
        // calculate mouse position in normalized device coordinates
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera({ x, y }, camera);

        const pos = new THREE.Vector3();

        pos.copy(raycaster.ray.direction);
        pos.add(raycaster.ray.origin);

        //n00ugles
        new GLTFLoader().loadAsync("./models/n00ugles.glb").then((gltf) => {
          const model: any = gltf.scene.children[0];
          model.position.x = pos.x;
          model.position.y = pos.y;
          model.position.z = pos.z;
          model.scale.set(4,4,4);
          const object = new ExtendedObject3D();
          object.add(model);
          this.add.existing(object);
          this.physics.add.existing(model, { shape: "convex", mass:10 });
          pos.copy(raycaster.ray.direction);
          pos.multiplyScalar(24);
          model.body.applyForce(pos.x * force, pos.y * force, pos.z * force);
        });

        //ball
        // const sphere = physics.add.sphere(
        //   {
        //     radius: 0.15,
        //     x: pos.x,
        //     y: pos.y,
        //     z: pos.z,
        //     mass: 20,
        //     bufferGeometry: true,
        //   },
        //   { phong: { color: 0x202020 } }
        // );
        // sphere.body.setBounciness(0.2);

        // pos.copy(raycaster.ray.direction);
        // pos.multiplyScalar(24);

        // sphere.body.applyForce(pos.x * force, pos.y * force, pos.z * force);
      });
    };

    addWall(this.physics);
    // addHouse(this.physics);
    initCanon(this.physics, this.camera);
  }

  update() {}
}

// set your project configs
const config = {
  scenes: [ThreePhysicsComponent],
  antialias: true,
  gravity: { x: 0, y: -9.81, z: 0 },
};
PhysicsLoader("/ammo", () => new Project(config));
