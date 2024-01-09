import EmberRouter from '@ember/routing/router';
import config from 'client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('tasks', { path: 'tasks/:authorId' });
  this.route('not-found', { path: '/*path' });
  this.route('add-task', { path: 'add-task/:authorId' });
  this.route('author', { path: 'author/:authorId' });
  this.route('login');
  this.route('edit-task', { path: 'edit-task/:authorId/:id' });
});
