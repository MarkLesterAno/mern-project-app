
// import classes from '../../../assets/styles/authentication.module.css';
// import { ComponentUtils } from '../../../utils/component-utils';
// import { useAuth } from '../../../context/AuthContext';
// import { isEmail, useForm } from '@mantine/form';

// const Invite = () => {
//     const auth = useAuth()
//     const request_form = useForm({
//         mode: 'uncontrolled',
//         initialValues: { email: '' },
//         validate: {
//             email: isEmail('Invalid Email'),
//         }
//     })
//     const onSubmitRequest = request_form.onSubmit(async (values) => {
//         await auth.send_invite({ email: values.email })
//     })
//     const request = [
//         {
//             type: 'text',
//             props: {
//                 ...request_form.getInputProps('email'),
//                 key: request_form.key('email'), name: 'email', label: 'Email',
//                 placeholder: 'Email',
//                 required: true,
//                 type: 'email',
//             }
//         },
//     ];
//     const footer = [
//         {
//             props: { justify: 'space-between', className: classes.controls },
//             children: [
//                 {
//                     type: 'button',
//                     props: {
//                         key: 'button', name: 'button', className: classes.control, children: 'Send Invite',
//                         type: 'submit'
//                     },
//                 },
//             ],
//         },
//     ]
//     return (
//         <form onSubmit={onSubmitRequest}>
//             {request.map(child => ComponentUtils(child.type, child.props))}
//             {footer.map((group, index) => GroupUtils(index, group.props, group.children))}
//         </form>
//     );
// }
// export default Invite