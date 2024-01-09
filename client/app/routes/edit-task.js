import Route from '@ember/routing/route';

export default class EditTaskRoute extends Route {
    queryParams = {
        param1: { refreshModel: true },
        param2: { refreshModel: true }
    }

    async model(params) {
        try {
            const response = await this.store.queryRecord('task', {
                filter: {
                    'id': params.id
                }
            })
            return response
        } catch (error) {
            console.error("Error:", error)
        }
    }

    toDate(dueDate) {
        return moment(dueDate).format("DD/MM/YYYY")
    }

    toTime(dueDate) {
        return moment(dueDate).format("HHmm")
    }

    setupController(controller, model) {
        super.setupController(controller, model);
        controller.set('title', model.title);
        controller.set('description', model.description);
        controller.set('dueDate', this.toDate(model.dueDate));
        controller.set('time', this.toTime(model.dueDate));
    }
}
