import React, { createContext }from 'react';

import Format from '@/app/components/Format';
import CreateEventForm from '@/app/components/CreateEvent';

const CreateEventPage: React.FC = () => {

  return (
    <Format> 
        <CreateEventForm></CreateEventForm>
    </Format>
  );
};

export default CreateEventPage;
