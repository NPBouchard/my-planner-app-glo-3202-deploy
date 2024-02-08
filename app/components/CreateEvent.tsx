import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IEventForm } from '@/app/types';

// Schéma de validation Yup adapté pour TypeScript
const schema = yup.object({
  eventName: yup.string().required('Le nom de l\'événement est requis'),
  eventDate: yup.string().required('La date de l\'événement est requise').typeError('Vous devez entrer une date valide'),
  eventDescription: yup.string().required('La description de l\'événement est requise'),
  eventLocation: yup.string().required('Le lieu de l\'événement est requis'),
}).required();

const CreateEventForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IEventForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IEventForm> = data => {
    console.log(data);
    // Ici, vous intégrerez la logique pour envoyer les données du formulaire à votre API ou les gérer localement
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="eventName" className="block">Nom de l'événement</label>
        <input id="eventName" type="text" {...register('eventName')} className="input" />
        <p>{errors.eventName?.message}</p>
      </div>
      
      <div>
        <label htmlFor="eventDate" className="block">Date de l'événement</label>
        <input id="eventDate" type="date" {...register('eventDate')} className="input" />
        <p>{errors.eventDate?.message && true}</p>
      </div>
      
      <div>
        <label htmlFor="eventDescription" className="block">Description</label>
        <textarea id="eventDescription" {...register('eventDescription')} className="input"></textarea>
        <p>{errors.eventDescription?.message}</p>
      </div>
      
      <div>
        <label htmlFor="eventLocation" className="block">Lieu</label>
        <input id="eventLocation" type="text" {...register('eventLocation')} className="input" />
        <p>{errors.eventLocation?.message}</p>
      </div>
      
      <button type="submit" className="btn">Créer Événement</button>
    </form>
  );
};

export default CreateEventForm;
