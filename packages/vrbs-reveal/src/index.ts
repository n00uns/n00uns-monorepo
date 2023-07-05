import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from 'enable3d';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import Click from './utils/click.js';
import { SoftBody, bunnyMesh } from './softbody';

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
    const debug = false;
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed('-ground');

    // position camera
    this.camera.position.set(3, 5, 20);
    this.camera.lookAt(0, 0, 0);
    console.log(this.physics);
    console.log(this.scene);
    this.load.texture('./textures/7.jpg').then(texture => {
      // console.log(texture);
      texture.wrapS = texture.wrapT = 1;
      // texture.repeat.set(25, 25);

      const ground = this.physics.add.ground(
        {
          name: 'ground',
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
        },
      );
      ground.body.setRestitution(1);
    });

    // enable physics debug
    if (debug) {
      this.physics.debug?.enable();
    }

    // this.bunny = new SoftBody(bunnyMesh, this.scene);
    // this.physics.physicsWorld.addSoftBody(this.bunny, 1, -1);
    // console.log(this.bunny);

    //soft body
    const bufferGeometryUtils = BufferGeometryUtils.BufferGeometryUtils;
    const softBodyHelpers = new Ammo.btSoftBodyHelpers();

    const createSoftVolume = (bufferGeom, mass, pressure) => {
      // processGeometry(bufferGeom);

      // this.volume = new THREE.Mesh(bufferGeom, new THREE.MeshPhongMaterial({ color: 0xffffff }));
      // this.volume.castShadow = true;
      // this.volume.receiveShadow = true;
      // this.volume.frustumCulled = false;
      // this.scene.add(this.volume);

      // this.load.texture('./textures/grid.png').then(texture => {
      //   this.volume.material.map = texture;
      //   this.volume.material.needsUpdate = true;
      // });

      new GLTFLoader().loadAsync('./models/frank.glb').then(gltf => {
        const config = {
          breakable: false,
          // fractureImpulse: 5,
          // collisionFlags: 3,
          // width: 1,
          // height: 3.2,
          // depth: 1,
          mass: 15,
          shape: 'convex',
        };

        const model: any = gltf.scene.children[0];
        model.position.y = 0;
        model.scale.set(0.015, 0.015, 0.015);
        const object = new ExtendedObject3D();
        object.add(model);
        object.position.z = -13;
        object.position.x = 4;
        // object.rotation.set(0, 1, 0);
        console.log(model);
        console.log(object);
        this.add.existing(object);
        // this.physics.add.existing(object, config);
        bufferGeom = processGeometry(model.geometry);
        const volumeSoftBody = softBodyHelpers.CreateFromTriMesh(
          this.physics.physicsWorld.getWorldInfo(),
          bufferGeom.ammoVertices,
          bufferGeom.ammoIndices,
          bufferGeom.ammoIndices.length / 3,
          true,
        );

        const sbConfig = volumeSoftBody.get_m_cfg();
        sbConfig.set_viterations(40);
        sbConfig.set_piterations(40);

        // Soft-soft and soft-rigid collisions
        sbConfig.set_collisions(0x11);

        // Friction
        sbConfig.set_kDF(0.1);
        // Damping
        sbConfig.set_kDP(0.01);
        // Pressure
        sbConfig.set_kPR(pressure);
        // Stiffness
        volumeSoftBody.get_m_materials().at(0).set_m_kLST(0.9);
        volumeSoftBody.get_m_materials().at(0).set_m_kAST(0.9);

        volumeSoftBody.setTotalMass(mass, false);
        Ammo.castObject(volumeSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(0.04);
        this.physics.physicsWorld.addSoftBody(volumeSoftBody, 1, -1);
        model.userData.physicsBody = volumeSoftBody;
        // Disable deactivation
        volumeSoftBody.setActivationState(4);
      });

      // Volume physic object
      // const volumeSoftBody = softBodyHelpers.CreateFromTriMesh(
      //   this.physics.physicsWorld.getWorldInfo(),
      //   bufferGeom.ammoVertices,
      //   bufferGeom.ammoIndices,
      //   bufferGeom.ammoIndices.length / 3,
      //   true,
      // );

      // const sbConfig = volumeSoftBody.get_m_cfg();
      // sbConfig.set_viterations(40);
      // sbConfig.set_piterations(40);

      // // Soft-soft and soft-rigid collisions
      // sbConfig.set_collisions(0x11);

      // // Friction
      // sbConfig.set_kDF(0.1);
      // // Damping
      // sbConfig.set_kDP(0.01);
      // // Pressure
      // sbConfig.set_kPR(pressure);
      // // Stiffness
      // volumeSoftBody.get_m_materials().at(0).set_m_kLST(0.9);
      // volumeSoftBody.get_m_materials().at(0).set_m_kAST(0.9);

      // volumeSoftBody.setTotalMass(mass, false);
      // Ammo.castObject(volumeSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(0.04);
      // this.physics.physicsWorld.addSoftBody(volumeSoftBody, 1, -1);
      // this.volume.userData.physicsBody = volumeSoftBody;
      // // Disable deactivation
      // volumeSoftBody.setActivationState(4);
    };

    const processGeometry = bufGeometry => {
      // Ony consider the position values when merging the vertices
      const posOnlyBufGeometry = new THREE.BufferGeometry();
      posOnlyBufGeometry.setAttribute('position', bufGeometry.getAttribute('position'));
      posOnlyBufGeometry.setIndex(bufGeometry.getIndex());

      // Merge the vertices so the triangle soup is converted to indexed triangles
      const indexedBufferGeom = bufferGeometryUtils.mergeVertices(posOnlyBufGeometry);

      // Create index arrays mapping the indexed vertices to bufGeometry vertices
      return mapIndices(bufGeometry, indexedBufferGeom);
    };

    const isEqual = (x1, y1, z1, x2, y2, z2) => {
      const delta = 0.000001;
      return Math.abs(x2 - x1) < delta && Math.abs(y2 - y1) < delta && Math.abs(z2 - z1) < delta;
    };

    const mapIndices = (bufGeometry, indexedBufferGeom) => {
      console.log(bufGeometry);
      // Creates ammoVertices, ammoIndices and ammoIndexAssociation in bufGeometry
      const vertices = bufGeometry.attributes.position.array;
      const idxVertices = indexedBufferGeom.attributes.position.array;
      const indices = indexedBufferGeom.index.array;

      const numIdxVertices = idxVertices.length / 3;
      const numVertices = vertices.length / 3;

      bufGeometry.ammoVertices = idxVertices;
      bufGeometry.ammoIndices = indices;
      bufGeometry.ammoIndexAssociation = [];

      for (let i = 0; i < numIdxVertices; i++) {
        const association = [];
        bufGeometry.ammoIndexAssociation.push(association);

        const i3 = i * 3;

        for (let j = 0; j < numVertices; j++) {
          const j3 = j * 3;
          if (
            isEqual(
              idxVertices[i3],
              idxVertices[i3 + 1],
              idxVertices[i3 + 2],
              vertices[j3],
              vertices[j3 + 1],
              vertices[j3 + 2],
            )
          ) {
            association.push(j3);
          }
        }
      }
      return bufGeometry;
    };

    const volumeMass = 15;
    const sphereGeometry = new THREE.SphereGeometry(1.5, 40, 25);
    sphereGeometry.translate(5, 2, 8);
    createSoftVolume(sphereGeometry, volumeMass, 250);
    //soft body end

    // cloth body
    // ball
    // this.ball = this.physics.add.sphere({ x: 5, y: 2, collisionFlags: 2 });

    // The flag
    const addFlag = () => {
      // bar
      const bar = this.add.cylinder({ y: 7.5, x: -5, height: 5, radiusTop: 0.1, radiusBottom: 0.1 });
      // bar.rotateX(Math.PI / 2);
      bar.rotation.set(1, 0, Math.PI / 2);
      this.physics.add.existing(bar, { collisionFlags: 1, mass: 0 });

      //pole
      const pole = this.add.cylinder({
        y: 2.5,
        z: 0,
        x: -7.5,
        height: 10,
        radiusTop: 0.1,
        radiusBottom: 0.1,
      });
      this.physics.add.existing(pole, { collisionFlags: 1, mass: 0 });

      const clothWidth = 4;
      const clothHeight = 3;
      const clothNumSegmentsZ = clothWidth * 5;
      const clothNumSegmentsY = clothHeight * 5;
      const clothPos = new THREE.Vector3(0, 4.5, 7);

      const clothGeometry = new THREE.PlaneBufferGeometry(
        clothWidth,
        clothHeight,
        clothNumSegmentsZ,
        clothNumSegmentsY,
      );
      clothGeometry.rotateY(Math.PI * 0.5);
      clothGeometry.translate(
        clothPos.x,
        clothPos.y + clothHeight * 0.5,
        clothPos.z - clothWidth * 0.5,
      );

      const clothMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      this.cloth = new THREE.Mesh(clothGeometry, clothMaterial);
      this.cloth.castShadow = true;
      this.cloth.receiveShadow = true;
      this.scene.add(this.cloth);

      this.load.texture('/textures/vrbs.jpg').then(texture => {
        this.cloth.material.map = texture;
        this.cloth.material.needsUpdate = true;
      });

      // Cloth physic object
      const clothCorner00 = new Ammo.btVector3(clothPos.x, clothPos.y + clothHeight, clothPos.z);
      const clothCorner01 = new Ammo.btVector3(
        clothPos.x,
        clothPos.y + clothHeight,
        clothPos.z - clothWidth,
      );
      const clothCorner10 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z);
      const clothCorner11 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z - clothWidth);
      const clothSoftBody = softBodyHelpers.CreatePatch(
        this.physics.physicsWorld.getWorldInfo(),
        clothCorner00,
        clothCorner01,
        clothCorner10,
        clothCorner11,
        clothNumSegmentsZ + 1,
        clothNumSegmentsY + 1,
        0,
        true,
      );
      const sbConfig = clothSoftBody.get_m_cfg();
      sbConfig.set_viterations(10);
      sbConfig.set_piterations(10);

      clothSoftBody.setTotalMass(0.9, false);
      clothSoftBody.rotate(new Ammo.btQuaternion(0, -1.55, 0, 1.55));
      Ammo.castObject(clothSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(0.04);
      this.physics.physicsWorld.addSoftBody(clothSoftBody, 1, -1);
      this.cloth.userData.physicsBody = clothSoftBody;
      // Disable deactivation
      clothSoftBody.setActivationState(4);

      // Glue the cloth to the bar
      const influence = 0.5;
      clothSoftBody.appendAnchor(0, bar.body.ammo, false, influence);
      clothSoftBody.appendAnchor(clothNumSegmentsZ, bar.body.ammo, false, influence);
    };

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

    const addStatue = () => {
      //gltf loader statue
      new GLTFLoader().loadAsync('./models/statue.glb').then(gltf => {
        const config = {
          // breakable: true,
          // fractureImpulse: 5,
          // collisionFlags: 3,
          width: 2,
          height: 6.4,
          depth: 2,
          mass: 10,
          shape: 'box',
        };
        const model: any = gltf.scene.children[0];
        model.position.y = -3.2;
        model.scale.set(10,10,10);
        const object = new ExtendedObject3D();
        object.add(model);
        object.position.z = -2.5;
        object.position.x = 0;
        this.add.existing(object);
        this.physics.add.existing(object, config);
      });
    };

    //gltf loader bank
    const addBank = () => {
      new GLTFLoader().loadAsync('./models/chase.glb').then(gltf => {
        const config = {
          breakable: true,
          // fractureImpulse: 5,
          // collisionFlags: 3,
          // width: 1,
          // height: 3.2,
          // depth: 1,
          // mass: 10,
          shape: 'convex',
        };

        const model: any = gltf.scene.children[0];
        model.traverse(child => {
          if (child.isMesh) {
            child.castShadow = child.receiveShadow = false;
            child.material.metalness = 0;
            child.material.roughness = 1;
          }
        });
        model.position.y = -1.6;
        model.scale.set(2, 2, 2);
        const object = new ExtendedObject3D();
        object.add(model);
        object.position.z = 0;
        object.position.x = -15;
        object.rotation.set(0, 1, 0);
        this.add.existing(object);
        this.physics.add.existing(object, config);
      });
    };

    const addWall = () => {
      const config = {
        depth: 0.5,
        breakable: true,
        fractureImpulse: 5,
        collisionFlags: 3,
      };

      this.load.texture('./textures/wall.png').then(texture => {
        texture.wrapS = texture.wrapT = 1;
        texture.repeat.set(1, 1);

        this.physics.add.box(
          { y: 5, x: 0, z: -10, width: 10, height: 10, ...config },
          {
            phong: {
              map: texture,
              // transparent: true,
              opacity: 0.8,
              // color: 0xffffff,
            },
          },
        );
      });
    };

    const addNft = () => {
      const config = {
        depth: 0.2,
        breakable: false,
      };

      this.load.texture('./textures/vrb.png').then(texture => {
        texture.wrapS = texture.wrapT = 1;
        texture.repeat.set(1, 1);

        const reveal = this.physics.add.box(
          { y: 5, x: 0, z: -10, width: 5, height: 5, ...config },
          {
            phong: {
              map: texture,
              // transparent: true,
              opacity: 0.8,
              // color: 0xffffff,
            },
          },
        );
        reveal.body.setCollisionFlags(2);
      });
    };
    // const addFrank = physics => {
    //   const { factory } = physics;

    //   const config = {
    //     depth: 0.5,
    //     breakable: false,
    //     collisionFlags: 3,
    //   };

    //   const config2 = {
    //     depth: 0.2,
    //     breakable: false,
    //   };

    //   this.load.texture('./textures/vrb.png').then(texture => {
    //     // console.log(texture);
    //     texture.wrapS = texture.wrapT = 1; // RepeatWrapping
    //     texture.repeat.set(1, 1);

    //     physics.add.box({ y: 5, x: 0, z: -10, width: 10, height: 10, ...config });
    //     const reveal = physics.add.box(
    //       { y: 5, x: 0, z: -10, width: 5, height: 5, ...config2 },
    //       {
    //         phong: {
    //           map: texture,
    //           // transparent: true,
    //           opacity: 0.8,
    //           // color: 0xffffff,
    //         },
    //       },
    //     );
    //     reveal.body.setCollisionFlags(2);
    //   });
    // };

    const initCanon = (physics, camera) => {
      const raycaster = new THREE.Raycaster();
      const force = 15;

      window.addEventListener('pointerup', event => {
        // calculate mouse position in normalized device coordinates
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera({ x, y }, camera);

        const pos = new THREE.Vector3();

        pos.copy(raycaster.ray.direction);
        pos.add(raycaster.ray.origin);

        //n00ugles
        new GLTFLoader().loadAsync('./models/n00ugles.glb').then(gltf => {
          const model: any = gltf.scene.children[0];
          model.position.x = pos.x;
          model.position.y = pos.y;
          model.position.z = pos.z;
          model.scale.set(4, 4, 4);
          const object = new ExtendedObject3D();
          object.add(model);
          this.add.existing(object);
          this.physics.add.existing(model, { shape: 'convex', mass: 10 });
          pos.copy(raycaster.ray.direction);
          pos.multiplyScalar(24);
          model.body.applyForce(pos.x * force, pos.y * force, pos.z * force);

          setTimeout(() => {
            this.destroy(object);
            // this.destroy(object);
          }, 2000);
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

    addWall();
    addNft();
    addStatue();
    // addBank(this.physics);
    addFlag();
    // addHouse(this.physics);
    initCanon(this.physics, this.camera);
  }

  update(time) {
    // update ball
    // this.ball.position.x -= Math.sin(time) * 0.1;
    // this.ball.body.needUpdate = true;

    // update cloth
    const softCloth = this.cloth.userData.physicsBody;
    const clothPositions = this.cloth.geometry.attributes.position.array;
    let numVerts = clothPositions.length / 3;
    let nodes = softCloth.get_m_nodes();
    let indexFloat = 0;

    for (let i = 0; i < numVerts; i++) {
      const node = nodes.at(i);
      const nodePos = node.get_m_x();
      clothPositions[indexFloat++] = nodePos.x();
      clothPositions[indexFloat++] = nodePos.y();
      clothPositions[indexFloat++] = nodePos.z();
    }

    this.cloth.geometry.computeVertexNormals();
    this.cloth.geometry.attributes.position.needsUpdate = true;
    this.cloth.geometry.attributes.normal.needsUpdate = true;

    //update soft body
    // const softBody = this.volume.userData.physicsBody;
    // const sbPositions = this.volume.geometry.attributes.position.array;
    // numVerts = sbPositions.length / 3;
    // nodes = softBody.get_m_nodes();
    // indexFloat = 0;

    // for (let i = 0; i < numVerts; i++) {
    //   const node = nodes.at(i);
    //   const nodePos = node.get_m_x();
    //   sbPositions[indexFloat++] = nodePos.x();
    //   sbPositions[indexFloat++] = nodePos.y();
    //   sbPositions[indexFloat++] = nodePos.z();
    // }

    // this.volume.geometry.computeVertexNormals();
    // this.volume.geometry.attributes.position.needsUpdate = true;
    // this.volume.geometry.attributes.normal.needsUpdate = true;

    // const sdt = 1.0 / 60.0 / 10;
    // console.log(this.bunny);
    // for (var step = 0; step < 10; step++) {
    //   this.bunny.preSolve(sdt, -9.81);
    //   this.bunny.solve(sdt);
    //   this.bunny.postSolve(sdt);
    // }

    // gGrabber.increaseTime(gPhysicsScene.dt);
  }
}

// set your project configs
const config = {
  scenes: [ThreePhysicsComponent],
  antialias: true,
  gravity: { x: 0, y: -9.81, z: 0 },
  softBodies: true,
};
PhysicsLoader('/ammo', () => new Project(config));

// const addHouse = physics => {
//   const { factory } = physics;

//   const config = {
//     depth: 0.4,
//     breakable: true,
//     fractureImpulse: 5,
//     collisionFlags: 3,
//   };

//   // front
//   physics.add.box({ y: 3, x: 2, z: 4, width: 4, height: 2, ...config });
//   physics.add.box({ y: 1, x: 2, z: 4, width: 4, height: 2, ...config });
//   physics.add.box({ y: 1, x: -2, z: 4, width: 4, height: 2, ...config });
//   physics.add.box({ y: 3, x: -2, z: 4, width: 4, height: 2, ...config });

//   // back
//   physics.add.box({ y: 1, x: -2, z: 0, width: 4, height: 2, ...config });
//   physics.add.box({ y: 3, x: -2, z: 0, width: 4, height: 2, ...config });
//   physics.add.box({ y: 1, x: 2, z: 0, width: 4, height: 2, ...config });
//   physics.add.box({ y: 3, x: 2, z: 0, width: 4, height: 2, ...config });

//   // left and right
//   physics.add.box({
//     ...config,
//     y: 2,
//     x: -4,
//     z: 2,
//     depth: 4,
//     height: 4,
//     width: 1,
//   });
//   physics.add.box({
//     ...config,
//     y: 2,
//     x: 4,
//     z: 2,
//     depth: 4,
//     height: 4,
//     width: 1,
//   });

//   // roof
//   let r1 = factory.add.box({
//     y: 4.75,
//     x: 0,
//     z: 0.5,
//     width: 8,
//     height: 4,
//     ...config,
//   });
//   let r2 = factory.add.box({
//     y: 4.75,
//     x: 0,
//     z: 3.5,
//     width: 8,
//     height: 4,
//     ...config,
//   });
//   r1.rotateX(Math.PI / 4);
//   r2.rotateX(-Math.PI / 4);
//   physics.add.existing(r1, { collisionFlags: 3, breakable: true });
//   physics.add.existing(r2, { collisionFlags: 3, breakable: true });
// };
