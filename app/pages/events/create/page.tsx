'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Format from '@/app/components/Format';

interface Event {
  name: string;
  date: string;
  description: string;
}

const CreateEventPage: React.FC = () => {
  const [event, setEvent] = useState<Event>({
    name: '',
    date: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Here, you would integrate the logic to save the event
    // in your database or global state
    if(event.name.trim.length > 0 && event.date.length > 0 && event.description.length > 0){
        console.log('Event Created:', event);
    }
  };

  

  return (
    <Format>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Créer un Nouvel Événement</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Nom de l'événement
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="Nom de votre événement" name="name" value={event.name} onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
                Date de l'événement
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="date" type="date" placeholder="Date de l'événement" name="date" value={event.date} onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-48 resize-none" id="description" placeholder="Décrivez votre événement" name="description" value={event.description} onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
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
