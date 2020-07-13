const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')


// ---Import Schemas & Middleware---
const Thought = require('../models/Thought')
const User = require('../models/User')
const auth = require('../middleware/auth')


// ---ADD thoughts - Private Route---
router.post('/', [auth, [
   check('title', 'Title required!').not().isEmpty(),
   check('category', 'Choose a category!').not().isEmpty(),
   check('content', 'Missing content!').not().isEmpty(),
]], (req, res) => {
   const ers = validationResult(req)
   if (!ers.isEmpty()) {
      return res.json({ ers: ers.array() })
   }

   const { title, category, content } = req.body
   const post = new Thought({
      title,
      category,
      content,
      author: req.user.id
   })
   post.save().then(post => res.json(post)).catch(err => res.json(err.message))
})


// --- GET Thoughts ---
// ---GET Thoughts - Public Route---
// ---Get All Recent Thoughts---
router.get('/recent', auth, (req, res) => {
   Thought.find().sort({ date: -1 }).then(thoughts => res.json(thoughts)).catch(err => console.log(err.message))
})
// ---Get All Recent Thoughts of the connected user---
router.get('/recentConnected', auth, (req, res) => {
   Thought.find({author: req.user.id}).sort({ date: -1 }).then(thoughts => res.json(thoughts)).catch(err => console.log(err.message))
})


// ---GET One-Thought---
router.get('/:id', auth, (req, res) => {
   Thought.findOne({ thought: req.thought.id }).then(thought => res.json(thought)).catch(err => console.log(err.message))
})


// ---MODIFY Thoughts - Private Route---
router.put('/:id', auth, (req, res) => {
   const { title, category, content } = req.body

   // ---Build A Thought Object---
   let thFields = {}
   if (title) thFields.title = title
   if (category) thFields.category = category
   if (content) thFields.content = content

   Thought.findById(req.params.id)
      .then(thought => {
         if (!thought) { return res.json({ msg: 'Inexistent Thought!' }) }
         else if (thought.author.toString() !== req.user.id) { res.json({ msg: 'Not Authorized!' }) }
         else { Thought.findByIdAndUpdate(req.params.id, { $set: thFields }, (err, data) => { res.json({ msg: 'Thought Updated!' }) }) }
      })

})


// REMOVE Thoughts
router.delete('/:id', auth, (req, res) => {
   Thought.findByIdAndDelete(req.params.id)
      .then(() => res.send('Thought Deleted'))
})

// ---ADD Likes---
router.put('/likes/:id', auth, (req, res) => {
   

   Thought.findById(req.params.id).then(thought => {
      if (!thought) { res.json({ msg: "thoughts does not exist" }) ; 
   console.log("thiught not found") }
      else {
         console.log("thought found and trying to update")
         Thought.findByIdAndUpdate(req.params.id, { $push: { likes: req.user.id } }, { returnOriginal: false }, data => { res.json(thought.likes) })
         
      }
   }).catch(err => console.log(err.message))
   
})

// ---Remove Likes---
router.put('/unlikes/:id', (req, res) => {
   Thought.findById(req.params.id).then(thought => {
      if (!thought) { res.json({ msg: "thoughts does not exist" }) ; 
   console.log("thiught not found") }
      else {
         console.log("thought found and trying to update")
         Thought.findByIdAndUpdate(req.params.id, { $pull: { likedBy: req.user.id } }, { returnOriginal: false }, data => { res.json(thought.likedBy) } )
      }
   }).catch(err => console.log(err.message))
})

// --- Add Votes---
router.put('/vote/:id', auth, async (req, res) => {
   try {
      const thought = await Thought.findById(req.params.id);

      // ---Check if the thought has already been voted---
      if(thought.votes.filter(vote => vote.user.toString() === req.user.id).length > 0) {
         return res.status(400).json({msg: 'Thought already voted ...'});
      }
      
      thought.votes.unshift({user: req.user.id});

      await thought.save();
      res.json(thought.votes);

   } catch (err) {
      console.error(err.message)
      res.status(500).send('Something went wrong in the server ...')
   }
});

// --- Remove Votes---
router.put('/unvote/:id', auth, async (req, res) => {
   try {
      const thought = await Thought.findById(req.params.id);

      // ---Check if the thought has already been voted---
      if(thought.votes.filter(vote => vote.user.toString() === req.user.id).length === 0) {
         return res.status(400).json({msg: 'Thought not yet been voted ...'});
      }
      
      // ---Set the remove index---
      const removeIndex = thought.votes.map(vote => vote.user.toString().indexOf(req.user.id));
      thought.votes.splice(removeIndex, 1);

      await thought.save();
      res.json(thought.votes);

   } catch (err) {
      console.error(err.message)
      res.status(500).send('Something went wrong in the server ...')
   }
});

module.exports = router