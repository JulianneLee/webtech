import { Component } from '@angular/core'
import { AppService } from '../app-service'
import { Subscription } from 'rxjs'

import { TestCase } from '../app-model'

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
  testCasesSub: Subscription;

  ngOnInit() {
    this.appService.getTests()
    this.testCasesSub = this.appService.getTestCaseUpdatedListener()
      .subscribe((testCases: TestCase[]) => {
        this.returnee = testCases.filter(x => x.type == 'Returnee').length;
        this.suspected = testCases.filter(x => x.type == 'Suspected').length;
        this.quarantined = testCases.filter(x => x.type == 'Quarantined').length;
        this.infected = testCases.filter(x => x.type == 'Infected').length;
      })
  }

  constructor(
    public appService: AppService,
    ) {}
}
