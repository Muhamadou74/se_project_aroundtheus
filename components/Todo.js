// import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// export default class Todo {
//   constructor(text) {
//     this.text = text;
//     this.id = uuidv4();
//   }

//   generateTodo() {
//     const todoItem = document.createElement("li");
//     todoItem.classList.add("todo__item");

//     const label = document.createElement("label");
//     label.setAttribute("for", this.id);
//     label.textContent = this.text;

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.id = this.id;

//     todoItem.appendChild(checkbox);
//     todoItem.appendChild(label);

//     return todoItem;
//   }
// }

import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export default class Todo {
  constructor(text) {
    this.text = text;
    this.id = uuidv4(); // Unique ID for input & label
  }

  generateTodo() {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo__item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = this.id;

    const label = document.createElement("label");
    label.setAttribute("for", this.id);
    label.textContent = this.text;

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);

    return todoItem;
  }
}
