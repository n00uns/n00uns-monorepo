import { Scene3D } from 'enable3d';
export declare class ThreePhysicsComponent extends Scene3D {
    cloth: any;
    constructor();
    init(): Promise<void>;
    preload(): Promise<void>;
    create(): Promise<void>;
    update(time: any): void;
}
