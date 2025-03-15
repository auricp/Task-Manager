import mongoose from "mongoose";
import Task from '../models/task.model.js'


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