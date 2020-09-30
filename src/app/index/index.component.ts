import { Component } from '@angular/core'
import { AppService } from '../app-service'

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})

export class IndexComponent {
  returnee: number;
  suspected: number;
  quarantined: number;
  infected: number;

  ngOnInit() {
    this.returnee = this.appService.getTests().filter(x => x.type == 'Returnee').length;
    this.suspected = this.appService.getTests().filter(x => x.type == 'Suspected').length;
    this.quarantined = this.appService.getTests().filter(x => x.type == 'Quarantined').length;
    this.infected = this.appService.getTests().filter(x => x.type == 'Infected').length;
  }

  constructor(
    public appService: AppService,
    ) {}
}
