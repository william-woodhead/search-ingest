jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The bulk controller', () => {
  describe('The stop controller', () => {
    let stop;
    let emit;

    beforeEach(() => {
      stop = require('../index').stop;
      emit = require('../../../../core/event-emitter').emit;
    });

    it('should return a resolved promise', () => {
      return stop().then(() => {
        expect(true).toBe(true);
      });
    });

    it('should emit an event', () => {
      return stop().then(() => {
        expect(emit).toBeCalledWith(EVENTS.BULK_INGEST_STOP);
      });
    });
  });

  describe('The start controller', () => {
    let start;
    let getSlugs;
    let emit;

    beforeEach(() => {
      start = require('../index').start;
      getSlugs = require('../../../../services/s3').getSlugs;
      emit = require('../../../../core/event-emitter').emit;

    });

    it('should request the slugs from S3', () => {
      getSlugs.mockImplementation(() => {
        return Promise.resolve();
      });
      return start({}).then(() => {
        expect(getSlugs).toBeCalledWith({
          bucketkey: 'slugs.txt',
          index: 'london',
          method: 'CREATE',
          type: 'listingContext'
        });
      });
    });

    describe('When the S3 request returns', () => {
      it('should emit an event for a successful request', () => {
        getSlugs.mockImplementation(() => {
          return Promise.resolve(['sluginton-mcgee']);
        });
        return start().then(() => {
          expect(emit).toBeCalledWith(EVENTS.BULK_INGEST, {
            bucketkey: 'slugs.txt',
            index: 'london',
            method: 'CREATE',
            type: 'listingContext',
            slugs: ['sluginton-mcgee']
          });
        });
      });

      it('should emit an event for a failed request', () => {
        const error = new Error();
        getSlugs.mockImplementation(() => {
          return Promise.reject(error);
        });
        return start().then(() => {
          expect(false).toBe(true);
        }).catch((err) => {
          expect(emit).toBeCalledWith(EVENTS.ERROR, error);
        });
      });
    });
  });
});
