import { SORT_ORDER } from "../constants/contacts.js";
import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
        page = 1,
        perPage = 3,
        sortBy = '_id',
        sortOrder = SORT_ORDER[0],
        filter = {}
    }) => {
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();

    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
      }

    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
      }

    const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder}).exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData
    };
};

export const getContactById = async (contactId) => {
    const contact = ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const newContact = ContactsCollection.create(payload);
    return newContact;
};

export const patchContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
          new: true,
          includeResultMetadata: true,
          ...options,
        },);

        if (!rawResult || !rawResult.value) return null;

        return rawResult.value;


};

export const deleteContact = async (contactId) => {
    const student = await ContactsCollection.findOneAndDelete({
        _id: contactId,
      });

      return student;
};
