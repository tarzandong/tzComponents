declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    wrapClass: {
        type: import("vue").PropType<string>;
    };
    itemClass: {
        type: import("vue").PropType<string>;
    };
    direction: {
        type: import("vue").PropType<"row" | "column">;
    };
    itemId: {
        type: import("vue").PropType<string>;
        required: true;
    };
    list: {
        type: import("vue").PropType<any[]>;
        required: true;
    };
}, {
    restore: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (list: any[], changeLog: {
        from: number;
        to: number;
    }) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    wrapClass: {
        type: import("vue").PropType<string>;
    };
    itemClass: {
        type: import("vue").PropType<string>;
    };
    direction: {
        type: import("vue").PropType<"row" | "column">;
    };
    itemId: {
        type: import("vue").PropType<string>;
        required: true;
    };
    list: {
        type: import("vue").PropType<any[]>;
        required: true;
    };
}>> & {
    onChange?: ((list: any[], changeLog: {
        from: number;
        to: number;
    }) => any) | undefined;
}, {}, {}>, {
    default?(_: {
        item: any;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
