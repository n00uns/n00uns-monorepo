import { Scene3D } from 'enable3d';
export declare class ThreePhysicsComponent extends Scene3D {
    cloth: any;
    controls: any;
    frank: any;
    pingPongAudio: any;
    quackAudio: any;
    glasses: any[];
    shots: number;
    debug: boolean;
    constructor();
    init(): Promise<void>;
    preload(): Promise<void>;
    addStats(total: any): void;
    updateStats(total: any, active: any): void;
    create(): Promise<void>;
    update(time: any): void;
}
