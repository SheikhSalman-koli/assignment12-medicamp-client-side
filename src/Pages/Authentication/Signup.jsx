import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import UseAuth from '../../Hooks/useAuth';
import { saveUser, uploadPhoto } from '../../Components/SharedComponents/Utils';
import SocialLogin from '../../Components/SharedComponents/SocialLogin';
import Swal from 'sweetalert2';



const Signup = () => {

    const {loading, createUser , updateUser} = UseAuth()
    const navigate = useNavigate()
    // console.log(createUser);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async(data) => {
        // console.log('Registration data:', data);
        const name = data?.name
        const email = data?.email
        const password = data?.password
        const image = data?.photo?.[0]
        const photo = await uploadPhoto(image)

        // console.log(name, email, password, image, photo);
        
        try{

            const result = await createUser(email, password)
            if(result){
                Swal.fire('user logged in successfully!')
                 navigate('/')
            }
            const emailHolder = result?.user

            const updatedDoc = {
                ...emailHolder,
                displayName: name,
                photoURL: photo
            }
            await updateUser(updatedDoc)

            // save user in DB
            const userInfo = {
                name: name,
                email: email,
                photo: photo,
                role: 'user'
            }
            await saveUser(userInfo)

           

        } catch (error) {
            console.log(error);
        }
        // reset(); 
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-white  py-6 to-blue-100 flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="Your Name"
                            className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

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
                            placeholder="enter your email"
                            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('photo', {
                                required: 'Photo URL is required',
                            })}
                            placeholder="photo-url"
                            className={`input input-bordered w-full ${errors.photo ? 'input-error' : ''}`}
                        />
                        {errors.photo && (
                            <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
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
                            placeholder="Create a strong password"
                            className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button 
                    type="submit" 
                    className="btn btn-primary w-full">
                        {loading ? <span className="loading loading-spinner text-neutral"></span> : 'Register'}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/signin" className="link link-primary font-medium">
                        Login
                    </Link>
                </p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Signup;
