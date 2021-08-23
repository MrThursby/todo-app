import React from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

function TodoList({list, fetchCurrent, deleteList,}) {
    let [isDeleted, setIsDeleted] = React.useState(false)

    function lazyDelete() {
        setIsDeleted(true)
        deleteList(list.id)
    }

    return (
        <li className="list-block__item"
            style={isDeleted ? {display: 'none'} : null}>
            <Link to={`/lists/${list.id}`}
                    className="list-block__item-link cursor-pointer"
                    onClick={() => fetchCurrent(list.id)}
                >
                {list.title}
                    &nbsp;
                    ({list.completed_items_count} / {list.items_count})
            </Link>
            <button className="list-block__item-btn btn"
                    onClick={lazyDelete}
                    title={"Delete list"}>&times;</button>
        </li>
    )
}

TodoList.propTypes = {
    list: PropTypes.object,
    fetchCurrent: PropTypes.func,
    deleteList: PropTypes.func
}

export default TodoList