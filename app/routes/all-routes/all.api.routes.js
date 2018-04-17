const {
    Router,
} = require('express');


const CategoriesController = require('./categories.controller');

const init = (app, data) => {
    const controller = new CategoriesController(data);

    const router = new Router();
    app.use('/api/Category', router);

    router
        .post('/createCategory', async (req, res) => {
            if (req.user) {
                const category = await controller.createCategory(req.body);
                res.status(201)
                    .send(category);
            }
            res.redirect('/');
        })
        .get('/:cat', async (req, res) => {
            const {
                cat,
            } = req.params;
            const threads = await controller.getAllThreadsByCatName(cat);
            const posts = await controller.getAllPostsbyId(threads);

            const model = {
                threads,
                posts,
                catName: cat,
            };
            res.send(model);
        });
};

module.exports = {
    init,
};