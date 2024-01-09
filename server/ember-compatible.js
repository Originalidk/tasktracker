const emberCompatibleList = (list, type) => {
    return { "data": list.map((attribute) => {
        const id = attribute.id
        attribute.id = undefined
        return {
            type: type,
            id: id,
            attributes: attribute
        }
    }) }
}

const emberCompatibleObject = (object, type) => {
    let id = 0
    if (object) {
        id = object.id
        object.id = undefined
    }
    return {
        "data": {
            type: type,
            id: id,
            attributes: object
        }
    }
}

module.exports = { emberCompatibleList, emberCompatibleObject }