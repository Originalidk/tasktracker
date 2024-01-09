import Model, { attr, belongsTo } from '@ember-data/model';
import TaskAdapter from '../adapters/task';

export default class TaskModel extends Model {
    @attr('string') title;
    @attr('string') description;
    @attr('string') status;
    @attr('date') dueDate;
    @attr('number') authorId;
}
