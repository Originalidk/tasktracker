import Route from '@ember/routing/route';

export default class AuthorRoute extends Route {
    queryParams = {
        param1: { refreshModel: true }
    }

    async model(params) {
        try {
            const response = await this.store.queryRecord('author', {
                filter: {
                    'id': params.authorId
                }
            })
            return response.name
        } catch (error) {
            console.error("Error:", error)
        }
    }
}
