declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    wrapClass: {
        type: import("vue").PropType<string>;
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
    change: (list: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    wrapClass: {
        type: import("vue").PropType<string>;
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
    onChange?: ((list: any[]) => any) | undefined;
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
