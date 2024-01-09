import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class AuthorAdapter extends JSONAPIAdapter {
    host = 'http://localhost:3000'

    headers = {
        'Content-Type': 'application/json'
    }

    pathForType() {
        return 'authors'
    }

    urlForQuery(query, modelName) {
        if (query && query.filter && query.filter.id) {
            // If authorId is present in the query, append it to the URL
            return `${this.host}/${this.pathForType(modelName)}/${query.filter.id}`
        }
    }

    urlForQueryRecord(query, modelName) {
        if (query && query.filter && query.filter.id) {
            // If authorId is present in the query, append it to the URL
            return `${this.host}/${this.pathForType(modelName)}/${query.filter.id}`
        }
        if (query && query.filter && query.filter.name) {
            // If name is present in the query, append it to the URL
            return `${this.host}/${this.pathForType(modelName)}/name`
        }
        // Fallback to the default behavior if authorId is not present
        return super.urlForQuery(query, modelName)
    }
}
