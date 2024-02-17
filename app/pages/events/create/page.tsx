'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Format from '@/app/components/Format';
import Cookies from 'js-cookie';
import { MapPinIcon } from '@heroicons/react/16/solid';
import { StarIcon } from '@heroicons/react/16/solid';
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from '@/app/script/AccessToLocalStorage';

interface Event {
	name: string;
	date: string;
	description: string;
	location: string;
}

interface User {
	id: string;
	username: string;
}

const CreateEventPage: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);

	const [event, setEvent] = useState<Event>({
		name: '',
		date: '',
		description: '',
		location: '',
	});

	const [favList, setFavList] = useState<string[] | null>(null);

	useEffect(() => {
		// Call loadEvents when the component mounts
		const storedUser: User | null = loadFromLocalStorage<User>('selectedUser');
		if (storedUser) {
			setUser(storedUser);
		}

		const favList: string[] | null = loadFromLocalStorage<string[]>('favList');
		if (favList) {
			setFavList(favList);
		}
	}, []);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEvent((prevState) => ({
			...prevState,
			[name]: value.slice(0, name === 'description' ? 256 : 32), // Enforcing limits directly in the handler as an additional measure
		}));
	};

	const validateEvent = (event: Event): boolean => {
		if (!event.name || !event.date || !event.description || !event.location) {
			alert('All fields are required and must be filled out.');
			return false;
		}
		if (event.name.length > 32 || event.location.length > 32) {
			alert('The name and location must not exceed 32 characters.');
			return false;
		}
		if (event.description.length > 256) {
			alert('The description must not exceed 256 characters.');
			return false;
		}
		// Additional validation checks can be added here
		return true;
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validateEvent(event)) {
			sendQuery();
			console.log('Event Created:', event.name);
		}
	};

	async function sendQuery() {
		await fetch(
			`https://my-planner-app-glo-3202-deploy.vercel.app/api/events/${user?.id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(event),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error('Error posting events: ', error);
			});
	}

	const UseActualLocation = () => {
		const localisation = Cookies.get('location') || '';

		setEvent((prevEvent) => ({
			...prevEvent,
			location: localisation,
		}));
	};

	const addLocationToFavorite = () => {
		let isOk = true;
		if (!event.location) {
			alert('Location field is required and must be filled out.');
			isOk = false;
		}
		if (event.location.length > 32) {
			alert('The name and location must not exceed 32 characters.');
			isOk = false;
		}

		if (isOk) {
			let favList: string[] | null = loadFromLocalStorage<string[]>('favList');
			if (favList) {
        if(favList.length <= 15){
          favList.push(event.location);
        } else {
          alert("Maximum of 15 favorites, clear your cache to get new one.")
        }
			} else {
				favList = [event.location];
			}

			saveToLocalStorage('favList', favList);
		}
	};

	return (
		<Format>
			<div className="max-w-4xl mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-center mb-6">
					Créer un Nouvel Événement
					<MapPinIcon
						className="w-6 h-6 bg-blue-500 hover:bg-blue-700 text-white rounded"
						onClick={UseActualLocation}
					>
						Location Actuelle
					</MapPinIcon>
					<StarIcon className="w-6 h-6 bg-blue-500 hover:bg-blue-700 text-white rounded">
						Add to favorite
					</StarIcon>
				</h1>

				<form
					onSubmit={handleSubmit}
					className="w-full max-w-lg mx-auto"
				>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="name"
							>
								Nom de l'événement
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="name"
								type="text"
								placeholder="Nom de votre événement"
								name="name"
								maxLength={32}
								value={event.name}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="date"
							>
								Date de l'événement
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
								id="date"
								type="date"
								placeholder="Date de l'événement"
								name="date"
								value={event.date}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="location"
							>
								Location
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="location"
								type="text"
								placeholder="Location de votre événement"
								name="location"
								maxLength={32}
								value={event.location}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="description"
							>
								Description
							</label>
							<textarea
								className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-48 resize-none"
								id="description"
								placeholder="Décrivez votre événement"
								name="description"
								maxLength={256}
								value={event.description}
								onChange={handleChange}
							></textarea>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								type="submit"
							>
								Créer Événement
							</button>
						</div>
					</div>
				</form>
			</div>
		</Format>
	);
};

export default CreateEventPage;
