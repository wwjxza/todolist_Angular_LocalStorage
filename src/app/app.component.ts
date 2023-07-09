import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todomvc';

  allItems: any[] = [];

   constructor() {
    const savedTodos = JSON.parse(localStorage.getItem('todoList') || '[]');
    this.allItems = savedTodos.map((todo) => {
        return {
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            editing: todo.editing
        };
    });
  } 

  @Input()
  newTodoText = '';

  get items() {
      if (this.filter === 'all') {
        return this.allItems;
      }

      return this.allItems.filter((item) => this.filter === 'completed' ? item.completed : !item.completed);
  }

  get remaining() {
    return this.allItems.filter(todo => !todo.completed).length;
  }

  filter: 'all' | 'active' | 'completed' = 'all';

  toggleCompletion(todo) {
    todo.completed = !todo.completed;
    this.updateStore();
  }

  toggleAll() {
    this.allItems.forEach(todo => todo.completed = !todo.completed);
    this.updateStore();
  }

  get completed() {
    return this.allItems.filter(todo => todo.completed);
    this.updateStore();
  }

  removeCompleted() {
    this.allItems = this.allItems.filter(todo => !todo.completed);
    this.updateStore();
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
        this.allItems.push({ id: Date.now(), title: this.newTodoText, completed: false, editing: false });
        this.newTodoText = '';
    }
    this.updateStore();
  }

  removeTodo(todo) {
    this.allItems.splice(this.allItems.indexOf(todo), 1);
    this.updateStore();
  }

  editTodo(todo) {
    todo.editing = true;
    this.editingTodoTitle = todo.title;
  }

  editingTodoTitle = '';

  updateEditingTodo(todo) {
    if (this.editingTodoTitle.length === 0) {
      return this.removeTodo(todo);
    }

    todo.title = this.editingTodoTitle;
    todo.editing = false;
    this.editingTodoTitle = '';
    this.updateStore();
  }

  stopEditing(todo) {
    todo.editing = false;
  }

  updateStore() {
    localStorage.setItem('todoList',  JSON.stringify(this.allItems));
  }
}