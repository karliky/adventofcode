const assert = require('assert');

const massIput = require('./factories/input');

describe('Day 1: The Tyranny of the Rocket Equation', () => {
  describe('Module and mass', () => {
    it('should create a module with default mass', () => {
      const module = new ModuleExplorer.Builder().build();
      assert.equal(module.name, 'Nogg-Aholic explorer');
      assert.equal(module.mass, 0);
    });

    it('should create a module with custom mass', () => {
      const module = new ModuleExplorer.Builder()
      .withMass(122)
      .build();
      assert.equal(module.mass, 122);
    });

    it('should create a module with mass from input', () => {
      const module = new ModuleExplorer.Builder()
      .withMass(massIput[0])
      .build();
      assert.equal(module.mass, 119341);
    });
  });

  describe('Module fuel', () => {    
    it('should retrieve the correct fuel', () => {
      const module = new ModuleExplorer.Builder()
      .withMass(massIput[0])
      .build();
      assert.equal(module.mass, 119341);
      assert.equal(GetFuel(module), 39778);
    });

    it('should calculate all the necessary fuel', () => {
      const totalFuel = GetTotalFuel(massIput);
      assert.equal(totalFuel, 3456641);
    });
  });

  describe('Part two - More fuel', () => {    
    it('should calculate a simple module fuel', () => {
      const MODULE_FUEL = 14;
      const module = new ModuleExplorer.Builder()
      .withMass(MODULE_FUEL)
      .build();
      assert.equal(module.mass, MODULE_FUEL);
      assert.equal(GetFuel(module), 2);
    });

    it('should calculate fuel of bigger mass', () => {
      const MODULE_FUEL = 1969;
      assert.equal(GetFuelAdder(MODULE_FUEL), 966);
    });

    it('should calculate fuel of a complex mass', () => {
      const MODULE_FUEL = 100756;
      assert.equal(GetFuelAdder(MODULE_FUEL), 50346);
    });

    it('should calculate all the fuel requirements', () => {
      const allFuel = GetAllFuelRequirement(massIput);
      assert.equal(allFuel, 5182078);
    });
  });

});

class ModuleExplorer {
  constructor(build) {
     this.name = build.name || 'Nogg-Aholic explorer';
     this.mass = build.mass || 0;
  }
  static get Builder() {
     class Builder {
        constructor() {}
        withName(name) {
           this.name = name;
           return this;
        }
        withMass(mass) {
           this.mass = mass;
           return this;
        }
        build() {
           return new ModuleExplorer(this);
        }
     }
     return Builder;
  }
}

function GetFuel(ModuleExplorer) {
  if (!ModuleExplorer.mass) return;
  return Math.floor(ModuleExplorer.mass / 3) - 2;
}

function GetTotalFuel(massIput) {
  return massIput.reduce((previousFuel, mass) => {
    const module = new ModuleExplorer.Builder()
    .withMass(mass)
    .build();
    return GetFuel(module) + previousFuel;
  }, 0);
}

function GetFuelAdder(baseMass, fuelAdder = 0) {
  const module = new ModuleExplorer.Builder().withMass(baseMass).build();
  const fuel = GetFuel(module);
  if (fuel <= 0) return fuelAdder;
  const totalFuel = fuelAdder + fuel;
  return GetFuelAdder(fuel, totalFuel);
}

function GetAllFuelRequirement(massIput) {
  return massIput.reduce((previousFuel, mass) => {
    const fuel = GetFuelAdder(mass);
    return previousFuel + fuel;
  }, 0);
}