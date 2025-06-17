import assert from 'node:assert';
import {
  type InsuranceManager_RegisterPolicyEvent,
  TestHelpers,
} from 'generated';
const { MockDb, InsuranceManager } = TestHelpers;

describe('InsuranceManager contract RegisterPolicyEvent event tests', () => {
  const mockDb = MockDb.createMockDb();

  // Creating mock for InsuranceManager contract RegisterPolicyEvent event
  const event = InsuranceManager.RegisterPolicyEvent.mock({
    data: {} /* It mocks event fields with default values, so you only need to provide data */,
  });

  it('InsuranceManager_RegisterPolicyEvent is created correctly', async () => {
    // Processing the event
    const mockDbUpdated =
      await InsuranceManager.RegisterPolicyEvent.processEvent({
        event,
        mockDb,
      });

    // Getting the actual entity from the mock database
    const actualInsuranceManagerRegisterPolicyEvent =
      mockDbUpdated.entities.InsuranceManager_RegisterPolicyEvent.get(
        `${event.chainId}_${event.block.height}_${event.logIndex}`
      );

    const expectedInsuranceManagerRegisterPolicyEvent: InsuranceManager_RegisterPolicyEvent =
      {
        id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
      };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(
      actualInsuranceManagerRegisterPolicyEvent,
      expectedInsuranceManagerRegisterPolicyEvent,
      'Actual InsuranceManagerRegisterPolicyEvent should be the same as the expectedInsuranceManagerRegisterPolicyEvent'
    );
  });
});
