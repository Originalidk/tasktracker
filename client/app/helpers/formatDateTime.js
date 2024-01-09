import { helper } from '@ember/component/helper';

function formatDateTime(dueDate) {
    const dateTime = dueDate.toArray()[0]
    return moment(dateTime).format("DD/MMM/YYYY HH:mm")
}

export default helper(formatDateTime)