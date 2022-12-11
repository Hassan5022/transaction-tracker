// hooks
import { useEffect, useReducer, useState } from "react";
// config file
import { projectFirestore, timestamp } from "../firebase/config";

const initialState = {
	error: null,
	document: null,
	isPending: false,
	success: null,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {error: null, document: null, success: null, isPending:true}
        case 'ADDED_DOCUMENT':
            return {error: null, document: action.payload, success: true, isPending: false}
        case 'DELETED_DOCUMENT':
            return {error: null, document: null, success: true, isPending: false}
        case 'ERROR':
            return {error: action.payload, document: null, success: false, isPending:false}
		default:
			return state;
	}
};

export const useFirestore = (collection) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

	const res = projectFirestore.collection(collection);

	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) dispatch(action);
	};

    const createdAt = timestamp.fromDate(new Date())

	// add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const addedDocument = await res.add({...doc, createdAt})
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
        } catch (error) {
            dispatchIfNotCancelled({type:'ERROR', payload:error.message})
        }
    };
	// delete a document
	const deleteDocument = async (id) => {
		dispatch({ type: 'IS_PENDING' })
		try {
			await res.doc(id).delete()
			dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
			
		} catch (error) {
			console.log(error)
			dispatchIfNotCancelled({type:'ERROR', payload: 'Could not delete'})
		}
	};

	// cleanup function
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { response, addDocument, deleteDocument };
};
