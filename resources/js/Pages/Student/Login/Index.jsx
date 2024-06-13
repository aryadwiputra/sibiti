import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ error, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nisn: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('student.login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {error && <div className="mb-4 font-medium text-sm text-green-600">{error}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nisn" value="NISN" />

                    <TextInput
                        id="nisn"
                        type="number"
                        name="nisn"
                        value={data.nisn}
                        className="mt-1 block w-full"
                        autoComplete="nisn"
                        isFocused={true}
                        onChange={(e) => setData('nisn', e.target.value)}
                    />

                    <InputError message={errors.nisn} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
