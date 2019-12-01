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
      assert.equal(module.name, 'Nogg-Aholic explorer');
      assert.equal(module.mass, 122);
    });

    it('should create a module with mass from input', () => {
      const module = new ModuleExplorer.Builder()
      .withMass(massIput[0])
      .build();
      assert.equal(module.name, 'Nogg-Aholic explorer');
      assert.equal(module.mass, 119341);
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