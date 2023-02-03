import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deleteconfirm',
  templateUrl: './deleteconfirm.component.html',
  styleUrls: ['./deleteconfirm.component.css']
})
export class DeleteconfirmComponent {

  @Input() item: string | undefined   // @ ___ is a decorator in angular



  //event creation
  //eventemitter class
  @Output() onCancel = new EventEmitter()   //passing an event
  @Output() onDelete = new EventEmitter()

  cancel() {
    this.onCancel.emit() //start the event using emit() method
  }

  delete() {
    this.onDelete.emit(this.item)
  }
}
