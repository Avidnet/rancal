import { Injectable } from '@angular/core';

export interface CalculatorOptions {
  nodePower: number;
  nodeAntennaTX: number;
  gatewaySensitivity: number;
  gatewayAntennaGain: number;
  gatewayNoise: number;
  rcMode: 'City' | 'Rural';
  gatewayHeight: number;
  endNodeHeight: number;
  frequency: 500 | 868 | 2400;
}

export interface CalculatorResults {
  linkBudget: number;
  maxRange: number;
  sqkm: number;
}

/**
 * CalculatorService calculates link budget.
 */
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  public calculate(opts: CalculatorOptions): CalculatorResults {
    // Waviot Model
    const df = Math.pow(10, -2.2); // Direct Factor
    const fof = [0.3, -0.15] // Frequency Obstacle Factor, [2.4 Ghz, 500 MHz]
    const ple = [4, 4.15, 4.20] // Path Loss Exponent

    // options
    const nP = opts.nodePower;
    const nATX = opts.nodeAntennaTX;
    const gSens = opts.gatewaySensitivity;
    const gAG = opts.gatewayAntennaGain;
    const gN = opts.gatewayNoise;

    const gH = opts.gatewayHeight;
    const enH = opts.endNodeHeight;

    const linkBudget = nP + nATX - gSens + gAG - gN; // link budget in dBm

    var pleVal;
    if (opts.rcMode == "Rural") {
      pleVal = ple[0];
    } else {
      pleVal = ple[1];
    }

    let maxRange, sqkm;
    if (opts.frequency === 500) {
      maxRange = (df * Math.sqrt(gH * enH / 500) * Math.pow(10, linkBudget / (10 * (pleVal + fof[1]))) * 1000);
    }
    if (opts.frequency === 868) {
      maxRange = (df * Math.sqrt(gH * enH / 868) * Math.pow(10, linkBudget / (10 * pleVal)) * 1000);
    }
    if (opts.frequency === 2400) {
      maxRange = (df * Math.sqrt(gH * enH / 2400) * Math.pow(10, linkBudget / (10 * (pleVal + fof[0]))) * 1000);
    }

    sqkm = 3.14 * Math.pow(maxRange / 1000, 2);

    return {
      linkBudget,
      maxRange,
      sqkm
    };
  }
}
