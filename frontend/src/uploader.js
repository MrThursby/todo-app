function fetchLists() {
    return fetch('http://localhost:8000/api/lists')
        .then(r => r.json())
}

function fetchCurrentList(id) {
    return fetch(`http://localhost:8000/api/lists/${id}`)
        .then(r => r.json())
}

function createList(title) {
    let formData = new FormData()
    formData.append('title', title)

    return fetch(`http://localhost:8000/api/lists`, {method: 'POST', body: formData})
        .then(r => r.json())
}

function destroyList(id) {
    return fetch(`http://localhost:8000/api/lists/${id}`, {method: 'DELETE'})
        .then(r => r.json())
}

function createItem(title, list_id) {
    let formData = new FormData()
    formData.append('title', title)
    formData.append('list_id', list_id)

    return fetch(`http://localhost:8000/api/items`, {method: 'POST', body: formData})
        .then(r => r.json())
}

function updateItem(id, is_completed) {
    let formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('is_completed', (+is_completed).toString())
    return fetch(
        `http://localhost:8000/api/items/${id}`,
        {method: 'POST', body: formData}
    ).then(r => r.json())
}

function destroyItem(id) {
    return fetch(`http://localhost:8000/api/items/${id}`, {method: 'DELETE'})
        .then(r => r.json())
}

export const get = {
    lists: fetchLists,
    current_list: fetchCurrentList
}

export const update = {
    item: updateItem
}

export const destroy = {
    list: destroyList,
    item: destroyItem
}

export const store = {
    list: createList,
    item: createItem
}