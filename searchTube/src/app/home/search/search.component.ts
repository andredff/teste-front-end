import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('search-input', [
      state('initial', style({
        marginTop: '40vh',
      })),
      state('final', style({
        marginTop: '20px',
      })),
      transition('initial <=> final', animate('500ms ease-in')),

    ])
  ]
})
export class SearchComponent implements OnInit {

  @Output() public atualizarVideos: EventEmitter<string> = new EventEmitter<string>();

  @Output() public limparPesquisa: EventEmitter<string> = new EventEmitter<string>();

  @Input() public searchInput = 'initial';

  public form: FormGroup = new FormGroup({
    'search': new FormControl(null, Validators.required),
  });

  constructor() { }

  ngOnInit() {


  }

  search(value: string) {
    let term = this.form.value.search
    if (term) {
      this.atualizarVideos.emit(term);
      this.searchInput = 'final';
    }
  }

  atualizarEstado(value: string) {
    this.searchInput = value;

  }

}
