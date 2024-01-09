import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AuthorController extends Controller {
    @service router;
    @service navbarFunctions;
    
    @tracked name = ""

    actions = {
        submit: async () => {
            try {
                const id = this.router.currentRoute.params.authorId
                const author = await this.store.findRecord('author', id)
                const trimmed = this.name.trim()
                if (author && !(trimmed === "")) {
                    author.name = trimmed
                    await author.save()
                    window.alert('Successfully changed name to: ' + trimmed + "!\n"
                        + "Please refresh the page to see your updated name :)")
                    this.setProperties({
                      name: ""
                    })
                } else {
                    this.setProperties({
                        name: ""
                      })
                    window.alert('Please fill in a name.')
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

    @action
    async deleteAuthor() {
        try {
            const authorId = this.router.currentRoute.params.authorId
            const author = this.store.peekRecord('author', authorId)
            author.deleteRecord()
            await author.save()
            window.alert("Author deleted!")
            this.navbarFunctions.indexPage()
            this.router.transitionTo('index')
        } catch (error) {
            console.error("Error: ", error)
            window.alert("Error occured")
        }
    }
}
