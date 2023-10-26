export declare class DragWindow {
    ent: HTMLElement;
    handle: HTMLElement;
    left: number;
    top: number;
    dx: number;
    dy: number;
    newEle: HTMLElement;
    start: (e: any) => void;
    end: (e: any) => void;
    over: (e: any) => void;
    constructor(toolId: string, targetId: string);
}
