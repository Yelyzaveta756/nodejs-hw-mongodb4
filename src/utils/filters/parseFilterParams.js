import { contactType } from "../../validation/contacts.js";

const parseContactType = (type) => {
	const isString = typeof type === 'string';
	if (!isString) return;
	const isType = (gender) => contactType.includes(gender);

	if (isType(type)) return type;
  };
// export const parseIsFavouriteParams = (value) => parseIsFavourite(value);

export const parseIsFavourite = value => {
	if (typeof value === 'boolean') {
		return value;
	}
	if (value === 'true') return true;
	if (value === 'false') return false;

	return value;
};


export const parseFilterParams = (query) => {
	const { contactType,isFavourite } = query;

	const parsedTypeFilter = parseContactType(contactType);
	const parsedIsFavourite = parseIsFavourite(isFavourite);

	return {
		isFavourite: parsedIsFavourite,
		contactType: parsedTypeFilter
	};
};
