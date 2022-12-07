import express from 'express';
import {loginOrganization,registerOrganization,createEvent,addPost,InviteVeteran,getCreatedEvents} from '../Controller/OrganizationController.js'
const router = express.Router()

router.route('/login').post(loginOrganization)
router.route('/register').post(registerOrganization)
router.route('/createEvent').post(createEvent)
router.route('/addPost/:id').post(addPost)
router.route('/inviteVeteran/:id').post(InviteVeteran)
router.route('/CreatedEvents/:id').get(getCreatedEvents)



export default router