import { Component, OnInit } from '@angular/core';

import { CalculatorService, CalculatorResults, CalculatorOptions } from '../calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.less']
})
export class CalculatorComponent implements OnInit {

  public model: CalculatorOptions = {
    nodePower: 14,
    nodeAntennaTX: 0,
    gatewaySensitivity: -137,
    gatewayAntennaGain: 10,
    gatewayNoise: 10,
    isRural: true,
    gatewayHeight: 25,
    endNodeHeight: 1,
    frequency: 868,
  }

  constructor(
    private cService: CalculatorService,
  ) { }

  ngOnInit() {
  }

  public get result(): CalculatorResults {
    return this.cService.calculate(this.model);
  }
}
