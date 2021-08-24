import React from "react"
import PropTypes from "prop-types"
import TodoItem from "./TodoItem";
import {destroy, get, store, update} from "../../uploader";
import {useParams} from 'react-router-dom'

function TodoItems({className, fetchLists}) {
    let {id} = useParams()
    let [list, setList] = React.useState()

    let searchString = ''

    const [searchStringInputValue, setSearchStringInputValue] = React.useState()

    function fetchList() {
        get.list(id, searchString)
            .then(list => {
                setList(list)
            })
            .catch(() => {
                alert('App not working now, try later.')
            })
    }

    if(!list || list.id.toString() !== id) {
        fetchList()
    }

    function createItem(title, list_id) {
        store.item(title, list_id)
            .then(() => {
                fetchLists()
                fetchList()
            })
            .catch(() => {
                alert('Task cannot be created now')
            })
    }

    function updateItem(id, is_completed) {
        update.item(id, is_completed)
            .then(() => {
                fetchLists()
                fetchList()
            })
            .catch(() => {
                fetchLists()
                fetchList()
                alert(`The status "completed" for the task #${id} cannot be changed now`)
            })
    }

    function deleteItem(id) {
        destroy.item(id)
            .then(() => {
                fetchLists()
                fetchList()
            })
            .catch(() => {
                fetchLists()
                fetchList()
                alert(`Task #${id} can't be deleted now`)
            })
    }

    let [addFormValue, setAddFormValue] = React.useState('')

    function handleChangeSearchInput(event) {
        searchString = event.target.value
        fetchList()
        setSearchStringInputValue(event.target.value)
    }

    function handleSubmitAddForm(event) {
        event.preventDefault()
        if(addFormValue){
            createItem(addFormValue, list.id)
        }
        setAddFormValue('')
    }

    return !list ? null : (
        <div className={`list-block ${className}`}>
            <h1 className="list-block__title">{list.title}</h1>
            <form onSubmit={(e) => {e.preventDefault(); fetchList()}}>
                <input className="list-block__search-input form-control"
                       placeholder="Search..."
                       value={searchStringInputValue}
                       onChange={handleChangeSearchInput}
                       type="text"/>
            </form>
            <ul className="list-block__list">
                { list.items.map((item, index) =>
                    <TodoItem
                        item={item}
                        updateItem={updateItem}
                        deleteItem={deleteItem}
                        key={item.id + index}
                    />
                )}
            </ul>

            <form className="list-block__add-form" onSubmit={handleSubmitAddForm}>
                <input className="form-control"
                       placeholder="Add task..."
                       onChange={e => {setAddFormValue(e.target.value)}}
                       value={addFormValue}
                       type="text"/>
            </form>
        </div>
    )
}

TodoItems.propTypes = {
    className: PropTypes.string,
}

export default TodoItems