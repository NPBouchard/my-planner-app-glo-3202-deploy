'use client';
import { useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';


const SignIn = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
    const auth = useAuth(); // Use the useAuth hook to access signIn

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await auth.signIn(username, password); // Use the signIn method from AuthContext
            redirect('/');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Failed to sign in. Please check your credentials.'); // Adjust the error message as necessary
        }
    };
	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto my-8 p-4 border rounded-lg shadow"
		>
			<div className="mb-4">
				<label
					htmlFor="username"
					className="block text-gray-700 text-sm font-bold mb-2"
				>
					Username
				</label>
				<input
					id="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div className="mb-6">
				<label
					htmlFor="password"
					className="block text-gray-700 text-sm font-bold mb-2"
				>
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			{errorMessage && (
				<p className="text-red-500 text-xs italic">{errorMessage}</p>
			)}
			<div className="flex justify-between items-center">
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Sign In
				</button>
				<Link href="/pages/signup">
					<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
						No account? Sign Up
					</a>
				</Link>
			</div>
		</form>
	);
};

export default SignIn;
