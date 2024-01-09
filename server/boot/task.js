const { emberCompatibleList, emberCompatibleObject } = require("../ember-compatible")

module.exports = (app) => {
    var router = app.loopback.Router()
    var tasks = app.models.Task
    
    router.get("/", async (req, res) => {
        const listOfTasks = await tasks.find({
            order: 'dueDate ASC'
        })
        res.json(emberCompatibleList(listOfTasks, "tasks"))
    })

    router.get("/:id", async (req, res) => {
        const id = req.params.id
        const task = await tasks.findById(id)
        res.json(emberCompatibleObject(task, "tasks"))
    })

    router.get("/author/:id", async (req, res) => {
        const id = req.params.id
        const listOfTasks = await tasks.find({
            where: { authorId: id },
            order: 'dueDate ASC'
        })
        res.json(emberCompatibleList(listOfTasks, "tasks"))
    })
    
    router.post("/", async (req, res) => {
        const task = req.body
        const newTask = await tasks.create(task)
        res.json(emberCompatibleObject(newTask, "tasks"))
    })

    router.patch("/:id", async (req, res) => {
        const task = req.body
        const id = req.params.id
        const newTask = await tasks.upsertWithWhere({ id: id }, task)
        res.json(emberCompatibleObject(newTask, "tasks"))
    })

    router.delete("/:id", async (req, res) => {
        const id = req.params.id
        const task = await tasks.findById(id)
        await tasks.destroyById(id)
        res.json(emberCompatibleObject(task, "tasks"))
    })

    app.use("/tasks", router);
}