const API_URL = 'http://localhost:8000';

function fetchLists() {
    return fetch(`${API_URL}/api/lists`)
        .then(r => r.json())
}

function fetchList(id, searchString) {
    searchString = searchString.toString()

    if(searchString !== ''){
        searchString = `?search=${searchString}`
    }

    return fetch(`${API_URL}/api/lists/${id+searchString}`)
        .then(r => r.json())
}

function createList(title) {
    let formData = new FormData()
    formData.append('title', title)

    return fetch(`${API_URL}/api/lists`, {method: 'POST', body: formData})
        .then(r => r.json())
}

function destroyList(id) {
    return fetch(`${API_URL}/api/lists/${id}`, {method: 'DELETE'})
        .then(r => r.json())
}

function createItem(title, list_id) {
    let formData = new FormData()
    formData.append('title', title)
    formData.append('list_id', list_id)

    return fetch(`${API_URL}/api/items`, {method: 'POST', body: formData})
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
    return fetch(`${API_URL}/api/items/${id}`, {method: 'DELETE'})
        .then(r => r.json())
}

export const get = {
    lists: fetchLists,
    list: fetchList
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