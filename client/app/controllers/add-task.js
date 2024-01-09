import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AddTaskController extends Controller {
    @service router;
    
    @tracked title = ""
    @tracked description = ""
    @tracked status = { label: "todo" }
    @tracked dueDate = ""
    @tracked time = ""

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
                        const id = this.router.currentRoute.params.authorId
                        date.add(hourValue, 'hours').add(minuteValue, 'minutes')
                        const newTask = this.store.createRecord('task', {
                            title: newTitle,
                            description: newDescription,
                            status: this.status.label,
                            dueDate: date._d,
                            authorId: id
                        })
                        if (newTask.isValid) {
                            await newTask.save()
                            window.alert('Successfully submitted form data!')
                            this.setProperties({
                              title: "",
                              description: "",
                              status: { label: "todo" },
                              dueDate: "",
                              time: ""
                            })
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

    init() {
        super.init(...arguments)
        this.radioOptions = [
            {
              label: 'todo'
            },
            {
              label: 'in-progress'
            },
            {
              label: 'completed'
            }
        ]
    }
}
