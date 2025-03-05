import { useForm } from '@mantine/form';
import { useState } from 'react';

const useCustomForm = (initialValues: any, cb: Function) => {
    const form = useForm({ ...initialValues })

    const [formValues, setformValues] = useState<typeof form.values | null>(null);

    const onSubmit = () => {
        form.onSubmit(setformValues)
        cb(formValues)
    };

    return {
        formValues,
        onSubmit
    };
};


// const useForm = (initialValues: Object, onSubmit: Function) => {
//     const [formValues, setFormValues] = useState(initialValues);

//     const handleChange = (e: any) => {
//         const { name, type } = e.target;
//         setFormValues((prevState: any) => ({
//             ...prevState,
//             [name]: type !== 'checkbox' ? e.target.value : e.target.checked
//         }));
//     };

//     const handleSubmit = (e: any) => {
//         e.preventDefault();
//         onSubmit(formValues);
//     };

//     return {
//         formValues,
//         handleChange,
//         handleSubmit
//     };
// };

export default useCustomForm;
