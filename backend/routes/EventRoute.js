import express from 'express';
import {getEvents,addHobbie,getEventById} from '../Controller/EventController.js'
const router = express.Router()

router.route('/:id').get(getEventById)
 router.route('/getEvents').post(getEvents)
 router.route('/addHobbie/:id').post(addHobbie)
 

export default router