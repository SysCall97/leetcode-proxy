const router = require('express').Router();
const getLinkController = require('../controllers/getLinkController');

router.route('/')
.get(getLinkController.getLink)

module.exports = router;