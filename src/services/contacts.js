import { SORT_ORDER } from "../constants/contacts.js";
import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
        page = 1,
        perPage = 3,
        sortBy = '_id',
        sortOrder = SORT_ORDER[0],
        filter = {},
        userId,
    }) => {
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();

    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
      }

    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
      }

      contactsQuery.where('userId').equals(userId);

    const contactsCount = await ContactsCollection.find({userId}).merge(contactsQuery).countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder}).exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData
    };
};

export const getContactById = async (contactId, userId) => {
    const contact = ContactsCollection.findOne({ _id: contactId, userId });
    return contact;
};

export const createContact = async (payload) => {
  return await ContactsCollection.create(payload);

};

export const patchContact = async (contactId, userId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId, userId },
        payload,
        {
          new: true,
          includeResultMetadata: true,
          ...options,
        },);

        if (!rawResult || !rawResult.value) return null;

        return rawResult.value;
};

export const deleteContact = async (contactId, userId) => {
    const student = await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
      return student;
};
