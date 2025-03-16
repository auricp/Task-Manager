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

export const getTask = async (req, res, next) => {
    try {
        
        // get all tasks from the specific user
        const id = req.params.id;

        // get all Tasks that have the current users user tag (get the userId from authorize func)
        const tasks = await Task.find({ user: id })

        res.render('tasks/index', { title: 'Home Page', tasks: tasks || []});


        // render home page
        /*
        Task.findById(id)
            .then((result) => {
                res.render('tasks/index', { title: 'Home Page', tasks: result || []});
            })
            .catch((err) => next(err));
        */
        /*
        Task.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('tasks/index', { title: 'Home Page', tasks: result});
        })
        .catch((err) => next(err));
        */

    } catch (error) {
        next(error);
    }
}

export const editTask = async (req, res, next) => {
    try {
        const id = req.params.id;

        const task = await Task.findByIdAndUpdate(id, {
            name: req.body.name,
            description: req.body.description
        })

        res.status(200).send({
            success: true,
            data: task
        })


    } catch (error) {
        next(error);
    }


}

export const deleteTask = async (req, res, next) => {
    try {
        // delete the task
        res.send({
            message: 'HERE'
        }
        )
        const id = req.params.id;

        const deleted = await Task.findByIdAndDelete(id);

        if (!deleted) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        /*
        res.status(200).send({
            success: true,
            message: 'Task deleted!'
        })
        */
       
    } catch (error) {
        next(error)
    }
}