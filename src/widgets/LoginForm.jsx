// components
import PasswordInput from '@components/PasswordInput';
import BasicCheckbox from '@ui/BasicCheckbox';
import ResetPasswordPopup from '@components/ResetPasswordPopup';

// hooks
import {useForm, Controller} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

// utils
import classNames from 'classnames';
import {useLogin} from "@hooks/useLogin";

const LoginForm = () => {
    const [open, setOpen] = useState(false);
    const {login,error,isLoading}= useLogin();
    const {register, handleSubmit, formState: {errors}, control} = useForm({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        await login(data.email,data.password);
    };

    const handleResetPassword = e => {
        e.preventDefault();
        setOpen(true);
    }

    return (
        <>
            <h1>Account login</h1>
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column g-10" style={{margin: '20px 0 30px'}}>
                    <div className="d-flex flex-column g-20">
                        <input className={classNames('field', {'field--error': errors.email})}
                               type="text"
                               placeholder="Email"
                               {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
                        <Controller control={control}
                                    name="password"
                                    rules={{required: true}}
                                    render={({field: {ref, onChange, value}, fieldState: {error}}) => (
                                        <PasswordInput
                                            className={classNames('field', {'field--error': error})}
                                            value={value}
                                            onChange={e => onChange(e.target.value)}
                                            placeholder="Password"
                                            innerRef={ref}/>
                                    )}
                        />
                    </div>
                    <div className="d-flex align-items-center g-10">
                        <Controller control={control}
                                    name="rememberMe"
                                    render={({field: {ref, onChange, value}}) => (
                                        <BasicCheckbox id="rememberMe"
                                                       checked={value}
                                                       onChange={e => onChange(e.target.checked)}
                                                       innerRef={ref}/>
                                    )}
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                </div>
                {error && <div>{error}</div>}
                <br/>
                <div className="d-flex justify-content-between align-items-center">
                    <button disabled={isLoading} className="btn btn--sm" type="submit">
                        Submit
                    </button>
                    <button disabled={isLoading} className="text-button text-button--sm" onClick={handleResetPassword}>
                        Reset password
                    </button>
                </div>
            </form>
            <ResetPasswordPopup open={open} onClose={() => setOpen(false)}/>
        </>
    )
}

export default LoginForm