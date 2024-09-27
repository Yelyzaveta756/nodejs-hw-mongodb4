import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAllContactsController,
         getContactByIdController,
         createContactController,
         patchContactController,
         deleteContactController
} from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";

export const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));
contactRouter.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
contactRouter.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
contactRouter.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));
contactRouter.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));
