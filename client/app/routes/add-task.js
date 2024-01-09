import Route from '@ember/routing/route';

export default class AddTaskRoute extends Route {
    queryParams = {
        param: { refreshModel: true }
    }
}
