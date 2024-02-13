"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Format from '@/app/components/Format';

interface Event {
  name: string;
  date: string;
  description: string;
  location: string;
}

// Yup validation schema
const EventSchema = Yup.object().shape({
  name: Yup.string().required('Event name is required'),
  date: Yup.date().required('Event date is required'),
  description: Yup.string().required('Event description is required'),
  // Add more fields as needed
});

const CreateEventPage: React.FC = () => {
  const userID = 1;

  // Adjusted to accept form values directly
  async function sendQuery(values: Event) {
    await fetch(`https://my-planner-app-glo-3202-deploy.vercel.app/api/events/${userID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error("Error posting events: ", error);
    });
  }

  return (
    <Format>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Créer un Nouvel Événement</h1>
        <Formik
          initialValues={{
            name: '',
            date: '',
            description: '',
            location: '', // If you plan to use 'location', make sure it's included in your form and validation schema
          }}
          validationSchema={EventSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await sendQuery(values);
            setSubmitting(false); // Set submitting to false after the form is submitted
            resetForm(); // Optionally reset the form to initial values
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-lg mx-auto">
              {/* Form fields go here */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {isSubmitting ? 'Creating...' : 'Créer Événement'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Format>
  );
};

export default CreateEventPage;
