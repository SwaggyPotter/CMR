import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent {
  bankName : any
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(){
      this.bankName = this.route.snapshot.paramMap.get('id')
      console.log('the id is: ',this.bankName)
  }
}
