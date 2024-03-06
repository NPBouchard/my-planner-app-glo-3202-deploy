export interface IEventForm {
	eventName: string;
	eventDate: string;
	eventDescription: string;
	eventLocation: string;
}

export interface User {
	username: string;
	id: string;
	// Add other user properties as needed
  }
  
  export interface AuthContextType {
	user: User | null;
	signIn: (username: string, password: string) => void;
	signOut: () => void;
	loading: boolean;
  }