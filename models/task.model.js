import mongoose from "mongoose";


/*
name (String): required, min5, max100
description (String): required, min5, max200
status (string): required, enum: ['new','started']
user: user who created the task

*/

const taskSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Task name is required'],
        minLength: 5,
        maxLength: 100
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: 5,
        maxLength: 200
    },

    status: {
        type: String,
        enum: ['new', 'in-progress'],
        default: 'new'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
})


const Task = mongoose.model('Task', taskSchema);

export default Task;