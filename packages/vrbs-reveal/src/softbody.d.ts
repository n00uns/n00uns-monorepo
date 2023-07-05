export declare class SoftBody {
    constructor(tetMesh: any, scene: any, edgeCompliance?: number, volCompliance?: number);
    translate(x: any, y: any, z: any): void;
    updateMeshes(): void;
    getTetVolume(nr: any): number;
    initPhysics(): void;
    preSolve(dt: any, gravity: any): void;
    solve(dt: any): void;
    postSolve(dt: any): void;
    solveEdges(compliance: any, dt: any): void;
    solveVolumes(compliance: any, dt: any): void;
    squash(): void;
    startGrab(pos: any): void;
    moveGrabbed(pos: any, vel: any): void;
    endGrab(pos: any, vel: any): void;
}
export declare const bunnyMesh: {
    name: string;
    verts: number[];
    tetIds: number[];
    tetEdgeIds: number[];
    tetSurfaceTriIds: number[];
};
