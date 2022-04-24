import React from "react";
import {Link} from "react-router-dom";

const book = (props) => {

    return (
        <tr>
            <td scope={"col"}>{props.book.name}</td>
            <td scope={"col"}>{props.book.category}</td>
            <td scope={"col"}>{props.book.author.name}</td>
            <td scope={"col"}>{props.book.availableCopies}</td>
            <td scope={"col"}>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.book.id)}>Delete</a>
                <Link title={"Edit"} className={"btn btn-light ml-2"}
                      onClick={() => props.onEdit(props.book.id)}
                      to={`/books/edit/${props.book.id}`}>Edit</Link>
                <a title={"Mark as taken"} className={"btn btn-info"}
                      onClick={() => {
                          if (props.book.availableCopies > 0)
                              props.markAsTaken(props.book.id)
                      }
                      }>Mark as taken</a>
            </td>
        </tr>
    )
}

export default book;
