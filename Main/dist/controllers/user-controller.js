import { User, Thought } from '../models/index.js';
import { handleNotFound } from '../utils/responses.js';
// get all users
export const getUsers = async (_req, res) => {
    try {
        const dbUserData = await User.find()
            .select('-__v')
            .lean();
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// get single user by id
export const getSingleUser = async (req, res) => {
    try {
        const dbUserData = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
        if (!dbUserData)
            return handleNotFound(res, 'User');
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// create a new user
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// update a user
export const updateUser = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, {
            $set: req.body,
        }, {
            runValidators: true,
            new: true,
        });
        if (!dbUserData)
            return handleNotFound(res, 'User');
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// delete user (BONUS: and delete associated thoughts)
export const deleteUser = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
        if (!dbUserData)
            return handleNotFound(res, 'User');
        // BONUS: get ids of user's `thoughts` and delete them all
        await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        return res.json({ message: 'User and associated thoughts deleted!' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// add friend to friend list
export const addFriend = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!dbUserData)
            return handleNotFound(res, 'User');
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// remove friend from friend list
export const removeFriend = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!dbUserData)
            return handleNotFound(res, 'User');
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
