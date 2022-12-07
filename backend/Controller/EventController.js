import express from 'express';
import Event from '../models/EventModel.js';
import asyncHadnler from 'express-async-handler'
       

        const addHobbie = asyncHadnler(async(req,res)=>{
            const {id} = req.params;
            const {hobbie} = req.body;
            const event = await Event.findById(id);
            if(event){
                event.hobbies.push(hobbie);
                const updatedEvent = await event.save();
                res.json(updatedEvent);
            }else{
                res.status(404);
                throw new Error('Event not found');
            }
        });



            const getEvents =  asyncHadnler( async (req,res)=> {
               
                const hobbies = req.body.hobbie 
                //? 
                // {
                //     hobbies : {
                //           $regex : req.query.hobbies,
                //             $options:'i'
                //     }
                // } : {}
                
                const keyword = req.query.Keyword ? {
                 name : {
                    $regex : req.query.Keyword,
                    $options:'i'
                 }   
                } : {}

                if(hobbies){
                    const events = await Event.find({...keyword,hobbies})
                    res.json(events)
                }else{
            const Events = await Event.find({...keyword})
            res.json(Events);
                }
            });


            const getEventById = asyncHadnler(async(req,res)=>{
                const {id} = req.params;
                const event = await Event.findById(id).populate('interestedVeterans');
                if(event){
                    res.json(event);
                }else{
                    res.status(404);
                    throw new Error('Event not found');
                }
            })


        
export {getEvents,addHobbie,getEventById}