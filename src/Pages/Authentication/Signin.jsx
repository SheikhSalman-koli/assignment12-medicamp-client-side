import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import UseAuth from '../../Hooks/useAuth';
import SocialLogin from '../../Components/SharedComponents/SocialLogin';
import { saveUser } from '../../Components/SharedComponents/Utils';


const Signin = () => {

    const { signInUser, loading,} = UseAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const email = data?.email
        const password = data?.password

        try {
            const result = await signInUser(email, password)
            // console.log(result?.user);
            navigate('/')

            // save user in DB
            const userInfo = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                photo: result?.user?.photoURL,
                role: 'user'
            }
            await saveUser(userInfo)

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-pink-100 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Welcome Back</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },

                            })}
                            placeholder="Enter your email"
                            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Minimum 6 characters',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                    message: 'Must include at least one uppercase and one lowercase letter',
                                },
                            })}
                            placeholder="Enter your password"
                            className={`input input-bordered w-full ${errors.password ? 'input-error' : ''
                                }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-full">
                        {loading?(<span className="loading loading-spinner loading-lg"></span>) : 'login'}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="link link-primary font-medium">
                        Register
                    </Link>
                </p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Signin;
