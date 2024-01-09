import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class TaskAdapter extends JSONAPIAdapter {
    host = 'http://localhost:3000'
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    pathForType() {
        return 'tasks'
    }

    urlForQuery(query, modelName) {
        if (query && query.filter && query.filter.authorId) {
            // If authorId is present in the query, append it to the URL
            return `${this.host}/${this.pathForType(modelName)}/author/${query.filter.authorId}`
        }
        // Fallback to the default behavior if authorId is not present
        return super.urlForQuery(query, modelName)
    }

    urlForQueryRecord(query, modelName) {
        if (query && query.filter && query.filter.id) {
            // If authorId is present in the query, append it to the URL
            return `${this.host}/${this.pathForType(modelName)}/${query.filter.id}`
        }
        // Fallback to the default behavior if authorId is not present
        return super.urlForQuery(query, modelName)
    }
}
