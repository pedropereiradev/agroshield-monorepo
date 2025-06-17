import { TestHelpers } from 'generated';
const { MockDb } = TestHelpers;

describe('InsuranceManager contract RegisterPolicyEvent event tests', () => {
  const mockDb = MockDb.createMockDb();
  //   // Creating mock for InsuranceManager contract RegisterPolicyEvent event
  //   const event = InsuranceManager.RegisterPolicyEvent.mockData({
  //     /* It mocks event fields with default values, so you only need to provide data */
  //     id: '0x000000',
  //     policyId: 'placeholder',
  //     owner: 'placeholder',
  //     insuredValue: '0',
  //     premium: '0',
  //     startDate: '0',
  //     endDate: '0',
  //     policyType: 'Rainfall',
  //     status: 'Pending',
  //     timestamp: ,
  //     blockHeight: '0',
  //     chainId: '0',
  //   });
  it('InsuranceManager_RegisterPolicyEvent is created correctly', async () => {
    //     // Processing the event
    //     const mockDbUpdated =
    //       await InsuranceManager.RegisterPolicyEvent.processEvent({
    //         event,
    //         mockDb,
    //       });
    //     const actualInsuranceManagerRegisterPolicyEvent =
    //       mockDbUpdated.entities.InsuranceManager_RegisterPolicyEvent.get(
    //         `${event.chainId}_${event.block.height}_${event.logIndex}`
    //       );
    //     const expectedInsuranceManagerRegisterPolicyEvent: InsuranceManager_RegisterPolicyEvent =
    //       {
    //         id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
    //         policyId: 'placeholder',
    //         owner: 'placeholder',
    //         insuredValue: '0',
    //         premium: '0',
    //         startDate: '0',
    //         endDate: '0',
    //         policyType: 'Rainfall',
    //         status: 'Pending',
    //         timestamp: event.block.time.toString(),
    //         blockHeight: event.block.height,
    //         chainId: event.chainId,
    //       };
    //     // Asserting that the entity in the mock database is the same as the expected entity
    //     assert.deepEqual(
    //       actualInsuranceManagerRegisterPolicyEvent,
    //       expectedInsuranceManagerRegisterPolicyEvent,
    //       'Actual InsuranceManagerRegisterPolicyEvent should be the same as the expectedInsuranceManagerRegisterPolicyEvent'
    //     );
  });
});
