import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { createContext } from 'react';

interface IEventForm {
	eventName: string;
	eventDate: string;
	eventDescription: string;
	eventLocation: string;
}

const initialValues: IEventForm = {
	eventName: '',
	eventDate: '',
	eventDescription: '',
	eventLocation: '',
};

const validationSchema = Yup.object({
	eventName: Yup.string().required('Required'),
	eventDate: Yup.string().required('Required'),
	eventDescription: Yup.string().required('Required'),
	eventLocation: Yup.string().required('Required'),
});

const CreateEventForm: React.FC = () => (
	<Formik
		initialValues={initialValues}
		validationSchema={validationSchema}
		onSubmit={(values, { setSubmitting }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}, 400);
		}}
	>
		<Form>
			<label htmlFor="eventName">Nom de l'événement</label>
			<Field
				name="eventName"
				type="text"
			/>
			<ErrorMessage
				name="eventName"
				component="div"
			/>

			<label htmlFor="eventDate">Date de l'événement</label>
			<Field
				name="eventDate"
				type="date"
			/>
			<ErrorMessage
				name="eventDate"
				component="div"
			/>

			<label htmlFor="eventDescription">Description</label>
			<Field
				name="eventDescription"
				as="textarea"
			/>
			<ErrorMessage
				name="eventDescription"
				component="div"
			/>

			<label htmlFor="eventLocation">Lieu</label>
			<Field
				name="eventLocation"
				type="text"
			/>
			<ErrorMessage
				name="eventLocation"
				component="div"
			/>

			<button type="submit">Créer Événement</button>
		</Form>
	</Formik>
);

export default CreateEventForm;
