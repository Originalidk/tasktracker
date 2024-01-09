const { emberCompatibleList, emberCompatibleObject } = require("../ember-compatible")

module.exports = (app) => {
    var router = app.loopback.Router()
    var authors = app.models.Author;
    var tasks = app.models.Task;
    
    router.get("/", async (req, res) => {
        const listOfAuthors = await authors.find()
        res.json(emberCompatibleList(listOfAuthors, "authors"));
    })

    router.get("/name", async (req, res) => {
        const { name } = req.query.filter
        const author = await authors.findOne({ where: { name: name } })
        res.json(emberCompatibleObject(author, "authors"));
    })

    router.get("/:id", async (req, res) => {
        const id = req.params.id
        const author = await authors.findById(id)
        res.json(emberCompatibleObject(author, "authors"));
    })
    
    router.post("/", async (req, res) => {
            const author = req.body
            authors.create(author).then((newAuthor) => {
                res.json(emberCompatibleObject(newAuthor, "authors"));
            }).catch((error) => {
                if (error.code === '23505') {
                    res.status(422).json({
                        errors: [{
                            status: '422',
                            code: 'UNIQUENESS_VIOLATION',
                            title: 'Uniqueness Violation',
                            detail: 'Author with the same name already exists.',
                        }]
                    })
                } else {
                    res.status(500).json({
                        errors: [{
                          status: 500,
                          message: 'Internal Server Error',
                        }],
                    })
                }
            })
    })

    router.patch("/:id", async (req, res) => {
        const author = req.body
        const id = req.params.id
        await authors.upsertWithWhere({ id: id }, author).then((newAuthor) => {
            res.json(emberCompatibleObject(newAuthor, "authors"))
        }).catch((error) => {
            console.log(error)
            if (error.code === '23505') {
                res.status(422).json({
                    errors: [{
                        status: '422',
                        code: 'UNIQUENESS_VIOLATION',
                        title: 'Uniqueness Violation',
                        detail: 'Author with the same name already exists.',
                    }]
                })
            } else {
                res.status(500).json({
                    errors: [{
                      status: 500,
                      message: 'Internal Server Error',
                    }],
                })
            }
        })
    })

    router.delete("/:id", async (req, res) => {
        const id = req.params.id
        const author = await authors.findById(id)
        await authors.destroyById(id)
        await tasks.destroyAll({ authorId: id })
        res.json(emberCompatibleObject(author, "authors"))
    })

    app.use("/authors", router);
}