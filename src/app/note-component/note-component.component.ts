import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailCardComponent } from '../detail-card/detail-card.component';
import { noteData } from '../models/note.class';

@Component({
  selector: 'app-note-component',
  templateUrl: './note-component.component.html',
  styleUrls: ['./note-component.component.scss']
})
export class NoteComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DetailCardComponent){
  }
}
