import { SORT_ORDER } from "../constants/contacts.js";

const keyOfParseBy = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt'
];

export const parseSortParams = ({sortBy, sortOrder}) => {

    const parseSortOrder = SORT_ORDER.includes(sortOrder) ? sortOrder : SORT_ORDER[0];
    const parseSortBy = keyOfParseBy.includes(sortBy) ? sortBy : "_id";

    return {
        sortBy: parseSortBy,
        sortOrder: parseSortOrder
    };
};
