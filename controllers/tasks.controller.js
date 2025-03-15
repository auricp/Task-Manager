import mongoose from "mongoose";
import Task from '../models/task.model.js'
import User from '../models/user.model.js'


export const createTask = async (req, res, next) => {

    try{

        // create task with everything in the body
        // also pass the user id in and send to response

        const task = await Task.create({
            ... req.body,

            user: req.user._id
        })

        res.status(201).send({
            success: true,
            data: task
        })

    } catch (error) {
        next(error);
    }
}

export const getTask = async (req, res, next) => {
    try {
        
        // get all Tasks that have the current users user tag (get the userId from authorize func)
        const tasks = await Task.find({ user: req.user._id })

        res.status(200).send({
            success: true,
            data: tasks
        })

    } catch (error) {
        next(error);
    }
}