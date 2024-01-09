import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
    @service router;
    @service navbarFunctions;
    
    @tracked name = ""

    actions = {
        submit: async () => {
            try {
                    const existingAuthor = await this.store.queryRecord('author', {
                        filter: {
                            name: this.name
                        }
                    })
                    if (existingAuthor.name) {
                        this.setProperties({
                          name: ""
                        })
                        window.alert("Success!")
                        this.navbarFunctions.differentPage()
                        this.navbarFunctions.updateAuthorId(existingAuthor.id)
                        this.router.transitionTo('tasks', existingAuthor.id)
                    } else {
                        window.alert('User does not exist.');
                    }
            } catch (error) {
                console.error("Error:", error)
                window.alert("An error has occured")
            }
        }
    }
}
