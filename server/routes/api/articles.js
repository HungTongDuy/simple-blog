const mongoose = require('mongoose');
const router = require('express').Router();
const articleController = require('./../../controllers/articleController');

/**
*   POST add an article
*  body:
*  { 
*    "text": "<p>dgdgdgdgdgdgdg</p>",
*    "title": "dfgdgfgdg",
*    "claps": 0,
*    "description": "<p>dgdgdgdgdgdgdg</p>...",
*    "feature_img": "",
*    "__v": 0,
*    "author_id": "5b56d160a96e1f3e90e8f372"
* }
 */
router.post('/', articleController.addArticle);

/**
 * get all articles
 */
router.get('/', articleController.getAll);

/**
 * clap on an article
 */
router.post('/clap', articleController.clapArticle);

/**
*  POST comment on an article
*  body:
*  {	
*     "article_id": "5b56dcea97d92f5ea8ecd969",
*     "author_id": "5b56d160a96e1f3e90e8f372",
*     "comment": "Nice post!"
*  }
*/
router.post('/comment', articleController.commentArticle);

/**
 * get a particlular article to view
 */
router.get('/:id', articleController.getArticle);

module.exports = router;