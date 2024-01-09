import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class EditTaskController extends Controller {
    @service router;
    
    @tracked title
    @tracked description
    @tracked dueDate
    @tracked time

    actions = {
        submit: async () => {
            try {
                const newTitle = this.title.trim()
                const newDescription = this.description.trim()
                const date = moment(this.dueDate, 'DD-MM-YYYY')
                if (newTitle === "" || newDescription === "") {
                    window.alert('Please fill in title and description')
                    this.setProperties({
                        title: "",
                        description: ""
                    })
                } else if (isNaN(date._d)) {
                    window.alert('Date must be in DD/MM/YYYY format and valid');
                } else if (!/^[0-9]*$/.test(this.time) || this.time.length != 4) {
                    window.alert('Time must be in HHmm format')
                } else {
                    const hours = this.time.slice(0, 2)
                    const minutes = this.time.slice(2)
                    const hourValue = Number(hours)
                    const minuteValue = Number(minutes)
                    if (hourValue >= 24 || minuteValue >= 60) {
                        window.alert('Time is not valid')
                    } else {
                        const id = this.router.currentRoute.params.id
                        date.add(hourValue, 'hours').add(minuteValue, 'minutes')
                        const task = await this.store.findRecord('task', id)
                        task.title = newTitle
                        task.description = newDescription
                        task.dueDate = date._d
                        const authorId = task.authorId
                        if (task.isValid) {
                            await task.save()
                            window.alert('Successfully edited task!')
                            this.router.transitionTo('tasks', authorId)
                        } else {
                            window.alert('Task is not valid. Please check the form inputs.')
                        }
                    }
                }
            } catch (error) {
                console.error("Error:", error)
                window.alert("An error has occured")
            }
      }
    }
}
