import Route from '@ember/routing/route';

export default class TasksRoute extends Route {
    async model(params) {
        try {
            const response = await this.store.query('task', {
                filter: {
                    'authorId': params.authorId
                }
            })
            return response
        } catch (error) {
            console.error("Error:", error)
        }
    }
}
