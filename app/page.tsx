"use client"
import Format from "./components/Format";
import React from "react";
import Link from "next/link";
import EventList from "./script/EventList";


const Page: React.FC = () => {
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
                <EventList></EventList>
            </div>
        </Format>
    );
};

export default Page;
