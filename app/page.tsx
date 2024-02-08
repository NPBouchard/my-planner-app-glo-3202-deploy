'use client'
import Format from "./components/Format";
import React, { useState } from "react";
import Link from "next/link";
// Define the component with TypeScript
const Page: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('fonctionnalites');

    // Function to change the active tab, with parameter typed as string
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <Format>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold text-center mb-6">Bienvenue sur Event Planner</h1>
                <p className="text-xl text-center mb-4">
                    La solution ultime pour organiser vos événements en toute simplicité.
                </p>
                <div className="flex justify-center mt-8">
                    <Link href="/pages/events/create" legacyBehavior>
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Créer un événement
                        </a>
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex justify-center my-4">
                    <button
                        className={`px-4 py-2 ${activeTab === 'fonctionnalites' ? 'text-blue-700 font-bold' : 'text-gray-600'}`}
                        onClick={() => handleTabChange('fonctionnalites')}
                    >
                        Fonctionnalités
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'evenements' ? 'text-blue-700 font-bold' : 'text-gray-600'}`}
                        onClick={() => handleTabChange('evenements')}
                    >
                        Événements
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'fonctionnalites' && (
                    <section className="mt-12">
                        <h2 className="text-3xl font-bold text-center mb-4">Fonctionnalités</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="font-bold text-xl mb-2">Planification Facile</h3>
                                <p>Gérez vos événements avec un outil intuitif et accessible à tous.</p>
                            </div>
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="font-bold text-xl mb-2">Collaboration</h3>
                                <p>Invitez vos amis ou collègues à participer à l'organisation de l'événement.</p>
                            </div>
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="font-bold text-xl mb-2">Personnalisation</h3>
                                <p>Personnalisez votre événement pour qu'il corresponde parfaitement à vos attentes.</p>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'evenements' && (
                    <section className="mt-12">
                        <h2 className="text-3xl font-bold text-center mb-4">Événements Créés</h2>
                        {/* Here, you could display a list or grid of events that the user has created. */}
                    </section>
                )}
            </div>
        </Format>
    );
};

export default Page;
