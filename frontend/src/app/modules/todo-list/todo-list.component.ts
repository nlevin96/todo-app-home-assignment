import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  newTasksDataSource= new MatTableDataSource<any>();
  oldTasksDataSource = new MatTableDataSource<any>();

  data: any;

  new_task: any;
  new_deadline: any;
  edit_id: any;

  displayedColumns: string[] = ['task', 'deadline','Edit', 'Completed', 'Delete'];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.updateTasks();
  }

  addTask() {
    this.todoService.addTask(this.new_task, this.new_deadline).subscribe(response => {
      console.log(response);
      this.new_task = '';
      this.new_deadline = undefined;
      this.updateTasks();
    })
  }

  updateTasks() {
    this.todoService.getTasks().subscribe(response => {
      const allTasks: any[] = [];
      this.data = response;
      this.data.forEach((element: any) => {
        allTasks.push(element);
      });
      this.newTasksDataSource.data = allTasks.filter(element => element.completed === false);
      this.oldTasksDataSource.data = allTasks.filter(element => element.completed === true);
    });
  }

  checkTask(element: any) {
    element.completed = !element.completed;
    this.sendUpdate(element);
  }

  updateTask(element: any) {
    this.edit_id = element._id
  }

  sendUpdate(element: any){
    this.todoService.updateTask(element._id, element.content,
      element.deadline, element.completed).subscribe(response => {
        console.log(response);
        this.edit_id = undefined;
        this.updateTasks();
      })
  }

  deleteTask(element: any) {
    this.todoService.deleteTask(element._id).subscribe(response => {
      console.log(response);
      this.updateTasks();
    })
  }

}
