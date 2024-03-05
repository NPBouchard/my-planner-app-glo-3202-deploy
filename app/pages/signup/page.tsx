'use client';
import { useState } from 'react';
import Link from 'next/link';

const SignUp = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Add logic to submit these details to your backend
		console.log(username, password);

		await sendQuerySignUp();
	};

	async function sendQuerySignUp() {
		await fetch(
			`https://my-planner-app-glo-3202-deploy.vercel.app/api/signup`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }), // Correctly passing username and password
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// Handle success, such as showing a success message or redirecting
			})
			.catch((error) => {
				console.error('Error during sign up: ', error);
				// Handle error, such as showing an error message to the user
			});
	}

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
			<div className="flex justify-between items-center">
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Sign Up
				</button>
				<Link href="/pages/signin">
					<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
						Already have an account? Sign In
					</a>
				</Link>
			</div>
		</form>
	);
};

export default SignUp;
