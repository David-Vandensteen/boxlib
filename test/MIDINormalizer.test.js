import { expect } from 'chai';
import { describe, it } from 'mocha';

import { MIDINormalizer } from '#src/lib/MIDINormalizer';

describe('MIDINormalizer', () => {
  describe('#message()', () => {
    it('should return a normalized message', () => {
      const message = {
        velocity: 200,
        channel: 20,
        value: 300,
        note: 150,
        controller: -50,
      };
      const expected = {
        velocity: 127,
        channel: 15,
        value: 127,
        note: 127,
        controller: 0,
      };
      expect(MIDINormalizer.message(message)).to.deep.equal(expected);
    });
  });

  describe('#controller()', () => {
    it('should return the controller value if it is within range', () => {
      const controller = 50;
      expect(MIDINormalizer.controller(controller)).to.equal(50);
    });

    it('should return 0 if the controller value is less than 0', () => {
      const controller = -10;
      expect(MIDINormalizer.controller(controller)).to.equal(0);
    });

    it('should return 127 if the controller value is greater than 127', () => {
      const controller = 150;
      expect(MIDINormalizer.controller(controller)).to.equal(127);
    });
  });

  describe('#channel()', () => {
    it('should return the channel value if it is within range', () => {
      const channel = 5;
      expect(MIDINormalizer.channel(channel)).to.equal(5);
    });

    it('should return 0 if the channel value is less than 0', () => {
      const channel = -2;
      expect(MIDINormalizer.channel(channel)).to.equal(0);
    });

    it('should return 15 if the channel value is greater than 15', () => {
      const channel = 20;
      expect(MIDINormalizer.channel(channel)).to.equal(15);
    });
  });

  describe('#value()', () => {
    it('should return the value if it is within range', () => {
      const value = 100;
      expect(MIDINormalizer.value(value)).to.equal(100);
    });

    it('should return 0 if the value is less than 0', () => {
      const value = -5;
      expect(MIDINormalizer.value(value)).to.equal(0);
    });

    it('should return 127 if the value is greater than 127', () => {
      const value = 200;
      expect(MIDINormalizer.value(value)).to.equal(127);
    });
  });
});
