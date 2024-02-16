'use client';
import Link from 'next/link';
import React, { useState, useEffect, use } from 'react';

interface User {
  id: string;
  username: string;
};

const Header: React.FC = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);

	useEffect(() => {
		// Call loadEvents when the component mounts
		loadUsers();
	}, []);

	const loadUsers = async () => {
		await fetch(`https://my-planner-app-glo-3202-deploy.vercel.app/api/users`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.rows);
        setUsers(data.rows);
			})
			.catch((error) => {
				console.error('Error fetching events: ', error);
			});
	};



	return (
		<header className="bg-blue-500 text-white body-font shadow w-full">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<Link
					href="/"
					legacyBehavior
				>
					<a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span className="ml-3 text-xl">Event Planner</span>
					</a>
				</Link>
				<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
					<Link
						href="/"
						legacyBehavior
					>
						<a className="mr-5 hover:text-gray-900">Home</a>
					</Link>
					<Link
						href="/pages/about"
						legacyBehavior
					>
						<a className="mr-5 hover:text-gray-900">About</a>
					</Link>
					<Link
						href="/pages/events/create"
						legacyBehavior
					>
						<a className="mr-5 hover:text-gray-900">Create Event</a>
					</Link>
					<div className="relative">
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="mr-5 hover:text-gray-900 focus:outline-none"
						>
							ConnectedUser
						</button>
						{isDropdownOpen && (
            <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              {users.map((user : User, index) => (
                <button
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {user.username}
                </button>
              ))}
            </div>
          )}
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
