import {
    PasswordInput, TextInput, NumberInput, ColorInput, Select, Textarea, Radio, Text, Title,
    Checkbox, Switch, Slider, FileInput, Group, Anchor, Button, MultiSelect
} from "@mantine/core";
import TextUtils from "./text-utils";

const ComponentUtils = (type: string, props: any, children: any[] = []) => {
    const initialProps = {
        ...props,
        key: Math.random(),
        name: props.name,
        label: TextUtils.capitalizeWords(props.name),
        placeholder: TextUtils.capitalizeWords(props.name),
        mt: 'md',
        required: true,
    };

    const object: any = {
        anchor: <Anchor {...initialProps} />,
        label: <Text {...initialProps} />,
        title: <Title {...initialProps} />,
        text: <TextInput {...initialProps} />,
        email: <TextInput {...initialProps} />,
        password: <PasswordInput {...initialProps} />,
        multiSelect: <MultiSelect {...initialProps} />,
        number: <NumberInput {...initialProps} />,
        color: <ColorInput {...initialProps} />,
        select: <Select {...initialProps} />,
        textarea: <Textarea {...initialProps} />,
        radio: <Radio {...initialProps} />,
        checkbox: <Checkbox {...initialProps} />,
        switch: <Switch {...initialProps} />,
        slider: <Slider {...initialProps} />,
        file: <FileInput {...initialProps} />,
        button: <Button {...initialProps} />,
        group: (
            <Group key={Math.random()} {...props}>
                {children.map((child) => ComponentUtils(child.type, child.props, child.children || []))}
            </Group>
        ),
    };

    return object[type];
};

export { ComponentUtils };
