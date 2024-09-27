import { getAllContacts, getContactById, createContact, patchContact, deleteContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/filters/parseFilterParams.js";
import createHttpError from "http-errors";

export const getAllContactsController = async (req, res) => {
const { page, perPage } = parsePaginationParams(req.query);
const { sortBy, sortOrder } = parseSortParams(req.query);
const filter = parseFilterParams(req.query);
const userId = req.user._id;

    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter: {...filter, userId}
    });
    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await getContactById({_id: contactId, userId});

    if (!contact) {
        throw createHttpError(404, `Contact not found`);
      }

    res.json({
        status: 200,
        message: `Successfully found contact with id=${contactId}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
    const contact = await createContact({userId, ...req.body});

    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;

  const contact = await patchContact({userId, _id: contactId}, req.body);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
      }

    res.status(200).json({
        status: 200,
	      message: "Successfully patched a contact!",
        data: contact,
      });
};


export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await deleteContact(contactId, userId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
      }
      res.status(204).send();
};

