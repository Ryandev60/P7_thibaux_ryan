module.exports = app => {
 const postController = require("../controllers/post.controllers.js");

router.get('/', auth, postController.findAll);
router.post('/', auth, postController.create);
router.get('/:id', auth, postController.findOne);
router.put('/:id', auth, postController.update);
router.delete('/:id', auth, postController.delete);

 app.use('/api/post', router);
};