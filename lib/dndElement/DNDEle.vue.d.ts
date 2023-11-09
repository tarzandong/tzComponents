declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    handlerId: {
        type: import("vue").PropType<string>;
    };
    left: {
        type: import("vue").PropType<string>;
    };
    top: {
        type: import("vue").PropType<string>;
    };
    notFixed: {
        type: import("vue").PropType<boolean>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "drag-start": (position: {
        x: number;
        y: number;
    }) => void;
    "drag-end": (position: {
        x: number;
        y: number;
    }) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    handlerId: {
        type: import("vue").PropType<string>;
    };
    left: {
        type: import("vue").PropType<string>;
    };
    top: {
        type: import("vue").PropType<string>;
    };
    notFixed: {
        type: import("vue").PropType<boolean>;
    };
}>> & {
    "onDrag-start"?: ((position: {
        x: number;
        y: number;
    }) => any) | undefined;
    "onDrag-end"?: ((position: {
        x: number;
        y: number;
    }) => any) | undefined;
}, {}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
