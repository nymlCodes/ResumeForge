'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
    const router = useRouter();
    // 1. Core State Tracking
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    // 2. Generic Input Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 3. Demo Credentials Auto-Fill Hook
    const handleDemoFill = () => {
        setFormData({
            email: 'demo.developer@resume-forge.ai',
            password: 'SecureDemoPassword2026',
        });
        console.log('💡 Demo credentials injected into state.');
    };

    // 4. Submission Console Output
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data, error } = await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || 'Login failed. Please try again.');
            return;
        }

        toast.success('Signed in successfully!');
        router.push('/');
    };

    // 5. Google OAuth Handler
    const handleGoogleSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: 'google',
            // callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || 'Google sign-in failed. Please try again.');
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#F8F7FF] dark:bg-zinc-950">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md space-y-8 p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-xl shadow-indigo-100/40 dark:shadow-zinc-900/80"
            >
                <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500 dark:text-zinc-400">
                        Or{' '}
                        <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                            create a new workspace profile
                        </Link>
                    </p>
                </div>

                {/* Demo Helper Action */}
                {/* <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-xl flex items-center justify-between">
                    <div className="text-xs text-gray-600 dark:text-zinc-400">
                        <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-0.5">Presentation Mode</span>
                        Quickly load sample profile credentials.
                    </div>
                    <button
                        type="button"
                        onClick={handleDemoFill}
                        className="text-xs font-semibold px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
                    >
                        Auto-Fill
                    </button>
                </div> */}

                {/* Google Sign-In */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
                >
                    <FcGoogle className="w-5 h-5" />
                    Continue with Google
                </button>

                {/* <p
                    
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
                >
                    <FcGoogle className="w-5 h-5" />
                    Google login is currently unavailabel
                </p> */}

                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-700" />
                    <span className="text-xs text-gray-400 dark:text-zinc-500 uppercase tracking-wider">or</span>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-700" />
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-700 text-sm transition-all"
                                placeholder="alex@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-11 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-700 text-sm transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35"
                        >
                            Sign In & Log Data
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}