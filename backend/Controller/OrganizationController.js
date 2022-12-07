import Veteran from '../models/VeteranModel.js'
import Organization from '../models/OrganizationModel.js';
import Event from '../models/EventModel.js';
import asyncHadnler from 'express-async-handler'



    const loginOrganization = asyncHadnler(async(req,res)=>{
        const {email,password} = req.body;
        const organization = await Organization.findOne({email}) 
        if (organization) {
            if (organization.password === password) {
                res.json(organization)
            } else {
                res.status(401)
                throw new Error('Invalid email or password')
            }
        }
    })

    
    const addPost = asyncHadnler(async(req,res)=>{
        const {id} = req.params;
        const {text,image} = req.body;
        const organization = await Organization.findById(id);
        if (organization) {
            organization.posts.push({text,image})
            await organization.save()
            res.json(organization)
        } else {
            res.status(404)
            throw new Error('Organization not found')
        }
    })

    const registerOrganization = asyncHadnler ( async (req,res) =>{
        const {name,email,password,image,description}=req.body;
        const OrganizationExist = await Organization.findOne({email})
        if(OrganizationExist){
            res.status(400)
            throw new Error('user already exists')
        }
        const organization = await Organization.create({
            name,
            email,
            password,
            image,
            description
        })
        if(organization){
            res.status(201).json(organization)
        }else{
            res.status(400)
            throw new Error('invalid user data')
        }
        })

        const createEvent = asyncHadnler(async(req,res)=>{
            const {name,description,location,organizationId,image,date,stars}=req.body;
            const event = await Event.create({
                name,
                description,
                location,
                organization:organizationId,
                image,
                date,
                stars
            })
            if(event){
                const organization = await Organization.findById(organizationId).populate('CreatedEvents');
                organization.CreatedEvents.push(event._id);
                await organization.save()
                res.status(201).json(event)
            }else{
                res.status(400)
                throw new Error('invalid event data')
            }
        })


        const InviteVeteran = asyncHadnler(async(req,res)=>{
            const {id} = req.params;
            const {eventId,veteranId} = req.body;
            const veteran = await Veteran.findById(veteranId)
            if(veteran){
                veteran.organizationInvite.push({organization:id,event:eventId})
                await veteran.save()
                res.json(veteran)
            }
            else {
                res.status(404)
                throw new Error('Veteran not found')
            }
        })


        const getCreatedEvents = asyncHadnler(async(req,res)=>{
            const {id} = req.params;
            const organization = await Organization.findById(id).populate('CreatedEvents');
            if(organization){
                res.json(organization.CreatedEvents)
            }else{
                res.status(404)
                throw new Error('Organization not found')
            }
        })

          

export {loginOrganization,registerOrganization,createEvent,addPost,InviteVeteran,getCreatedEvents}