import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NavbarFunctionsService extends Service {
    @service router;

    @tracked onLogin = this.router.currentRouteName === 'login'
    @tracked onIndex = this.router.currentRouteName === 'index'
    @tracked authorId

    @action
    loginPage() {
        this.onLogin = true
        this.onIndex = false
        this.router.transitionTo('login')
    }

    @action
    indexPage() {
        this.onLogin = false
        this.onIndex = true
        this.router.transitionTo('index')
    }

    @action
    differentPage() {
        this.onLogin = false
        this.onIndex = false
    }

    @action
    updateAuthorId(id) {
        if (id) {
            this.authorId = id
        } else {
            this.authorId = this.router.currentRoute.params.authorId
        }
    }
}
