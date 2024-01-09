import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
    @service router;
    @service navbarFunctions
    
    @tracked name = ""

    actions = {
        submit: async () => {
            try {
                    const trimmed = this.name.trim()
                    const newAuthor = this.store.createRecord('author', {
                        name: trimmed
                    })
                    if (!(trimmed === "")) {
                        await newAuthor.save()
                        window.alert('Successfully signed up with the name: ' + trimmed)
                        this.setProperties({
                          name: ""
                        })
                        this.navbarFunctions.loginPage()
                    } else {
                        window.alert('Please fill in a name.');
                    }
            } catch (error) {
                if (error.errors && error.errors[0].status === '422') {
                    // Handle uniqueness violation error
                    window.alert(error.errors[0].detail);
                } else {
                    // Handle other errors
                    window.alert('An error has occurred');
                }
            }
        }
    }
}
