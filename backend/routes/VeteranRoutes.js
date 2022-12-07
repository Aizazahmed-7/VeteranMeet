import express from 'express';
import {registerVeteran,updateVeteranProfile,getVetern,AcceptInvite,RejectInvite, loginVeteran,RemoveHobbie,getVeteranById,getFollowedVeterans,getInvitesOrganizations,followEvent,InterestedEvents} from '../Controller/veteranController.js';

const router = express.Router()

router.route('/').get(getVetern).post(loginVeteran);
router.route('/getVeteran/:id').get(getVeteranById);
router.route('/register').post(registerVeteran);
router.route('/updateVeteranProfile').post(updateVeteranProfile).put(RemoveHobbie);
router.route('/getFollowedVeterans').post(getFollowedVeterans);
router.route('/getInvites/:id').get(getInvitesOrganizations);
router.route('/AcceptInvite/:id').post(AcceptInvite);
router.route('/RejectInvite/:id').post(RejectInvite);
router.route('/followEvent/:id').post(followEvent);
router.route('/InterestedEvents/:id').get(InterestedEvents);
   

export default router