import Veteran from '../models/VeteranModel.js'
import Event from '../models/EventModel.js';
import asyncHadnler from 'express-async-handler'



    const loginVeteran = asyncHadnler(async(req,res)=>{
        const {email,password} = req.body;
        const veteran = await Veteran.findOne({email}) 
        if (veteran) {
            if (veteran.password === password) {
                res.json(veteran)
            } else {
                res.status(401)
                throw new Error('Invalid email or password')
            }
        }
    })


    const registerVeteran = asyncHadnler ( async (req,res) =>{

        const {name,email,password,image}=req.body;
        const VeteranExist = await Veteran.findOne({email})
        
        if(VeteranExist){
            res.status(400)
            throw new Error('user already exists')
        }
        const veteran = await Veteran.create({
            name,
            email,
            password,
            image
        })
    
        if(veteran){
            res.status(201).json({
                _id:veteran._id,
                 name:veteran.name,
                email:veteran.email,
                image:veteran.image,
                password:veteran.password,
                hobbies:veteran.hobbies,
                occupation:veteran.occupation,
                posts:veteran.posts,
                followedVeterans:veteran.followedVeterans,
                interestedEvents:veteran.interestedEvents,
                stars:veteran.stars
                
            })
        }else{
            res.status(400)
            throw new Error('invalid user data')
        }
      
        } )


        const updateVeteranProfile =asyncHadnler( async (req,res) =>{

            const user = await Veteran.findById(req.body._id)
            console.log(req.body)
            if(user){
                user.name = req.body.name || user.name 
                user.email = req.body.email || user.email
                user.stars = req.body.stars || user.stars
                user.image = req.body.image || user.image
                if(req.body.hobbies)
                user.hobbies.push(req.body.hobbies)
                if(req.body.post)
                user.posts.push(req.body.post)
                if(req.body.followedVeteran){
                    user.followedVeterans.push(req.body.followedVeteran)
                }
                if(req.body.interestedEvents)
                user.interestedEvents.push(req.body.interestedEvent)
                
                user.occupation = req.body.occupation || user.occupation     
                if(req.body.password){
                    user.password = req.body.password
                }
                const updatedUser  = await user.save()
                res.json(updatedUser)
        
            }else{
                res.status(404)
                throw new Error ('User not found')
            }
            
        }) 


        const RemoveHobbie = asyncHadnler(async (req,res) =>{
            const user = await Veteran.findById(req.body._id);
            if(user){
                user.hobbies.splice(req.body.index,1)
                user.save()
                
                res.json(user)
            }
            else{
                res.status(404)
                throw new Error ('User not found')
            }
        })
        
        
            const getVetern =  asyncHadnler( async (req,res)=> {
                const pageSize = 6
                const page = Number(req.query.pageNumber) || 1
            
                const keyword = req.query.Keyword ? {
                 name : {
                    $regex : req.query.Keyword,
                    $options:'i'
                 }   
                } : {}
            
            
            const count = await Veteran.countDocuments({...keyword})
            const veterans = await Veteran.find({...keyword})
            res.json(veterans);
            });

            const getVeteranById = asyncHadnler(async (req,res) =>{
                const veteran = await Veteran.findById(req.params.id)
                if(veteran){
                    res.json(veteran)
                }else{
                    res.status(404)
                    throw new Error('Veteran not found')
                }
            })


            const getFollowedVeterans = asyncHadnler(async (req,res) =>{
                const veteran = await Veteran.findById(req.body._id).populate('followedVeterans','name image occupation _id')
                if(veteran){
                    res.json(veteran)
                }else{
                    res.status(404)
                    throw new Error('Veteran not found')
                }
            })

            const getInvitesOrganizations = asyncHadnler(async (req,res) =>{
                const veteran = await Veteran.findById(req.params.id).populate('organizationInvite.organization organizationInvite.event','name image _id')
                if(veteran){
                    res.json(veteran)
                }else{
                    res.status(404)
                    throw new Error('Veteran not found')
                }
            })

            const followEvent = asyncHadnler(async (req,res) =>{
                const veteran = await Veteran.findById(req.params.id)
                if(veteran){
                    const eventId = req.body.eventId;
                    const event = await Event.findById(eventId)
                    if(event){
                        event.interestedVeterans.push(req.params.id)
                        event.save()
                    }
                    else{
                        console.log('event not found')
                    }
                    veteran.interestedEvents.push(eventId);
                    veteran.save()
                    res.json(veteran)
                }else{
                    res.status(404)
                    throw new Error('Veteran not found')
                }
            })

            const AcceptInvite = asyncHadnler(async (req,res) =>{
                const veteran = await Veteran.findById(req.params.id)
                if(veteran){
                    const eventId = veteran.organizationInvite[req.body.index].event
                    const event = await Event.findById(eventId)
                    event.interestedVeterans.push(req.params.id)
                    event.save()
                    veteran.interestedEvents.push(eventId);
                    veteran.organizationInvite.splice(req.body.index,1)
                    veteran.save()
                    res.json(veteran)
                }else{
                    res.status(404)
                    throw new Error('Veteran not found')
                }
            })

            const RejectInvite = asyncHadnler(async (req,res) =>{
                const veteran = await Veteran.findById(req.params.id)
                if(veteran){
                    veteran.organizationInvite.splice(req.body.index,1)
                    veteran.save()
                    res.json(veteran)
                }else{
                    res.status(404)
                    throw new Error('Veteran not found')
                }
            }
            )

            const InterestedEvents = asyncHadnler(async (req,res) =>{
                const veteran = await Veteran.findById(req.params.id).populate('interestedEvents','name image _id')
                if(veteran){
                    res.json(veteran)
                }else{
                    res.status(404)
                    throw new Error('Veteran not found')
                }
            })


export {registerVeteran,updateVeteranProfile,getVetern,loginVeteran,RemoveHobbie,getVeteranById,getFollowedVeterans,getInvitesOrganizations,AcceptInvite,RejectInvite,followEvent,InterestedEvents}