import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CalculatorService, CalculatorResults } from '../calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.less']
})
export class CalculatorComponent implements OnInit {

  public result: CalculatorResults;

  constructor(
    private cService: CalculatorService,
  ) { }

  ngOnInit() {
  }

  public formSubmit(f: FormGroup): void {
    this.result = this.cService.calculate(f.value);
  }
}
