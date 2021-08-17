const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../members');

// gets all members
router.get('/', (req, res) => res.json(members));


//get single members
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id))); 
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
   
});

// create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(), //generates a random universal id using uuid
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    //checking that the email and name are sent with request
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msq: 'Please include a name and email'});
    }

    members.push(newMember); // adding newMember into array
    res.json(members);
    //res.redirect('/');
});

// update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg:'Member updated', member});
            }
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

// delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))}); 
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
   
});


module.exports = router;