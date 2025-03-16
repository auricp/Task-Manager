import User from '../models/user.model.js';


export const getUsers = async (req, res, next) => {
    try {
        // get all users
        const users = await User.find();

        res.status(200).send({
            success: true,
            data: users
        })

    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {

        const id = req.params.id;

        // find user based on id
        const user = await User.findById(id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).send({
            success: true,
            body: user
        })
    } catch (error) {
        next(error);
    }
}