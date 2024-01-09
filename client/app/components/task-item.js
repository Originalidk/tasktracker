import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TaskItemComponent extends Component {
    @service store
    @service router;

    @tracked status = null

    dropdownItems = ['todo', 'in-progress', 'completed']

    @action
    async changeStatus(item, id) {
        this.status = item
        const task = await this.store.findRecord('task', id)
        task.status = item
        await task.save()
    }

    @action
    async deleteTask(id) {
        const task = this.store.peekRecord('task', id)
        task.deleteRecord();
        if (task.isDeleted) {
            await task.save()
        } else {
            window.alert("Error occured. Task is still not deleted.")
        }
    }

    @action
    editTask(authorId, id) {
        this.router.transitionTo('edit-task', authorId, id)
    }
}
