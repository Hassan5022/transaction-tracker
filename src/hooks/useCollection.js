// hooks
import { useEffect, useRef, useState } from "react";
// config file
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);

	// to prevent infinite loop
	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

	useEffect(() => {
		let response = projectFirestore.collection(collection);

		if (query) response = response.where(...query);
		if (orderBy) response = response.orderBy(...orderBy);

		const unsubscribe = response.onSnapshot(
			(snapshot) => {
				let results = [];
				snapshot.docs.forEach((doc) => {
					results.push({ ...doc.data(), id: doc.id });
				});

				// update states
				setDocuments(results);
				setError(null);
			},
			(error) => {
				console.log(error);
				setError("Could not fetch the data");
			}
		);

		// unsubscribe on unmount
		return () => unsubscribe();
	}, [collection, query, orderBy]);

	return { error, documents };
};
