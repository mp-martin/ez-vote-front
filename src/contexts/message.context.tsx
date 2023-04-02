import {createContext} from 'react';

export const MessageContext = createContext({
	showMessage: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function,object-shorthand
	setShowMessage: (s: boolean) => {
	},
});
