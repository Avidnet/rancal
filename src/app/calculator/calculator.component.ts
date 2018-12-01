import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.less']
})
export class CalculatorComponent implements OnInit {

  constructor(
    private cService: CalculatorService,
  ) { }

  ngOnInit() {
  }

  public formSubmit(f: FormGroup): void {
    console.log(f.value);
  }
}
