'use client';
import Format from './components/Format';
import React, { useEffect } from 'react';
import Link from 'next/link';
import EventList from './script/EventList';
import Cookies from 'js-cookie';
import { useRequireAuth } from './hooks/useRequireAuth';

function getLocation(): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(
				new Error("La géolocalisation n'est pas supportée par ce navigateur.")
			);
		} else {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		}
	});
}

async function askForLocationConsent(): Promise<void> {
	try {
		const position = await getLocation();
		const consent = confirm(
			'Souhaitez-vous que nous enregistrions votre localisation pour améliorer votre expérience ?'
		);
		if (consent) {
			const { latitude, longitude } = position.coords;
			Cookies.set('location', JSON.stringify({ latitude, longitude }), {
				expires: 2,
			});
			console.log('Location saved in cookie: ', position.coords);
		}
	} catch (error) {
		console.error('Erreur lors de la récupération de la localisation:', error);
	}
}

const Page: React.FC = () => {
	useEffect(() => {
		const localisation = Cookies.get('location');
		if (!localisation) {
			askForLocationConsent();
		}
	}, []);

	const user = useRequireAuth();

	if(!user) return null;
	
	return (
		<Format>
			<div className="max-w-6xl mx-auto px-4 py-8">
				<h1 className="text-5xl font-bold text-center mb-6">
					Bienvenue sur Event Planner
				</h1>
				<p className="text-xl text-center mb-4">
					La solution ultime pour organiser vos événements en toute simplicité.
				</p>
				<div className="flex justify-center mt-8">
					<Link
						href="/pages/events/create"
						legacyBehavior
					>
						<a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Créer un événement
						</a>
					</Link>
				</div>
				<EventList></EventList>
			</div>
		</Format>
	);
};

export default Page;
