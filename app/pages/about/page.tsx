'use client'
import React from 'react';
import Format from '@/app/components/Format';

const AboutPage: React.FC = () => {
	return (
		<Format>
			<div className="max-w-4xl mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold text-center mb-4">
					À propos de Event Planner
				</h1>
				<p className="text-lg text-center">
					Event Planner est une application conçue pour vous aider à organiser,
					planifier et partager vos événements facilement et efficacement.
				</p>
				<p className="text-lg text-center mt-4">
					Notre mission est de fournir une plateforme intuitive et conviviale
					qui simplifie la gestion d'événements, que ce soit pour des réunions
					familiales, des conférences professionnelles, ou des rassemblements
					sociaux.
				</p>
			</div>
		</Format>
	);
};

export default AboutPage;
