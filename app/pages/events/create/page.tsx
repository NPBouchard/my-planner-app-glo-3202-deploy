import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Format from '@/app/components/Format';

// Defining TypeScript interface for form values
interface IFormInput {
  eventName: string;
  eventDate: Date | null; // Using Date or null depending on your validation logic
  eventDescription: string;
  eventLocation: string;
}

// Yup validation schema
const schema = yup.object().shape({
  eventName: yup.string().required('Le nom de l\'événement est requis'),
  eventDate: yup.date().required('La date de l\'événement est requise').typeError('Vous devez entrer une date valide'),
  eventDescription: yup.string().required('La description de l\'événement est requise'),
  eventLocation: yup.string().required('Le lieu de l\'événement est requis'),
});

const CreateEventPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<IFormInput>({
    resolver : yupResolver(schema)
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    // Here, you would integrate the logic to send the form data to your API or manage it locally
  };

  return (
    <Format>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label htmlFor="eventName" className="block text-gray-700 text-sm font-bold mb-2">Nom de l'événement</label>
        <input id="eventName" type="text" {...register('eventName')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <p className="text-red-500 text-xs italic">{errors.eventName?.message}</p>
      </div>
      
      <div>
        <label htmlFor="eventDate" className="block text-gray-700 text-sm font-bold mb-2">Date de l'événement</label>
        <input id="eventDate" type="date" {...register('eventDate')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <p className="text-red-500 text-xs italic">{errors.eventDate?.message}</p>
      </div>
      
      <div>
        <label htmlFor="eventDescription" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea id="eventDescription" {...register('eventDescription')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"></textarea>
        <p className="text-red-500 text-xs italic">{errors.eventDescription?.message}</p>
      </div>
      
      <div>
        <label htmlFor="eventLocation" className="block text-gray-700 text-sm font-bold mb-2">Lieu</label>
        <input id="eventLocation" type="text" {...register('eventLocation')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <p className="text-red-500 text-xs italic">{errors.eventLocation?.message}</p>
      </div>
      
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Créer Événement</button>
      </form>
    </Format>
  );
};

export default CreateEventPage;
