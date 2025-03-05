import {
    PasswordInput, TextInput, NumberInput, ColorInput, Select, Textarea, Radio,
    Checkbox, Switch, Slider, FileInput, Group, Anchor, Button, MultiSelect
} from "@mantine/core";
import TextUtils from "./text-utils";

const ComponentUtils = (type: string, props: any) => {
    const initialProps = {
        ...props,
        name: props.name, label: TextUtils.capitalizeWords(props.name),
        placeholder: TextUtils.capitalizeWords(props.name),
        mt: 'md', required: true,
    }
    const object: any = {
        anchor: <Anchor {...initialProps} />,
        text: <TextInput {...initialProps} />,
        email: <TextInput  {...initialProps} />,
        password: <PasswordInput  {...initialProps} />,
        multiSelect: <MultiSelect  {...initialProps} />,
        number: <NumberInput  {...initialProps} />,
        color: <ColorInput  {...initialProps} />,
        select: <Select  {...initialProps} />,
        textarea: <Textarea  {...initialProps} />,
        radio: <Radio  {...initialProps} />,
        checkbox: <Checkbox  {...initialProps} />,
        switch: <Switch {...initialProps} />,
        slider: <Slider  {...initialProps} />,
        file: <FileInput {...initialProps} />,
        button: <Button {...initialProps} />,
    };
    return object[type];
};

const GroupUtils = (key: number, props: any, children: any[]) => {
    return (
        <Group key={key} {...props}>
            {children.map(props => ComponentUtils(props.type, props.props))}
        </Group>
    );
}


export { ComponentUtils, GroupUtils }
