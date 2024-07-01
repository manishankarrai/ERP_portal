const express = require('express');
const { User, encrypt, decrypt } = require('./userModel'); // Adjust the path as necessary

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const decryptedId = decrypt(req.params.id);
        const user = await User.findOne({ _id: decryptedId });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        const encryptedUsers = users.map(user => {
            user._id = encrypt(user._id.toString());
            return user;
        });
        res.send(encryptedUsers);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a user by ID
router.patch('/users/:id', async (req, res) => {
    try {
        const decryptedId = decrypt(req.params.id);
        const user = await User.findOneAndUpdate({ _id: decryptedId, isDeleted: false }, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const decryptedId = decrypt(req.params.id);
        const user = await User.findOneAndUpdate({ _id: decryptedId, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
