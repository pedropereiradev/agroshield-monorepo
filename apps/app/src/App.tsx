import {
  useBalance,
  useConnectUI,
  useIsConnected,
  useNetwork,
  useWallet,
} from '@fuels/react';
import { useEffect, useState } from 'react';
import { InsuranceContract, InsuranceNft } from './sway-contracts-api';
import contractIds from './sway-contracts-api/contract-ids.json';

// const CONTRACT_ID = import.meta.env.VITE_INSURANCE_MANAGER_CONTRACT;
// const CONTRACT_ID =
//   '0xe2bb64e38d26bca6b3e0b1f0cb998dbe77ccda707b1998628c2d0a1d62ab623a';
const INSURANCE_MANAGER_CONTRACT_ID = contractIds.insuranceContract;
const INSURANCE_NFT_CONTRACT_ID = contractIds.insuranceNft;

function App() {
  const { connect, isConnecting } = useConnectUI();
  const { isConnected, refetch } = useIsConnected();
  const { wallet } = useWallet();
  const { balance } = useBalance({
    address: wallet?.address.toAddress(),
  });
  const { network } = useNetwork();

  const [transactionId, setTransactionId] = useState('');
  const [insuranceContract, setInsuranceContract] =
    useState<InsuranceContract>();
  const [nftContract, setNftContract] = useState<InsuranceNft>();

  const purchasePolicy = async () => {
    if (!wallet) {
      return alert('Please connect wallet first.');
    }

    if (!insuranceContract) {
      return alert('Insurance Contract not loaded');
    }

    if (!nftContract) {
      return alert('NFT contract not loaded');
    }

    // try {
    const { waitForResult } = await insuranceContract.functions
      .create_insurance(
        'Soy', // crop
        '2024', // season
        '2024-05-01', // start_date
        180, // duration_days
        123, // region_x
        456, // region_y
        10000, // insured_value
        1000, // premium
        'Rainfall', // policy_type
        '2025-05-01', // expiration_date,
        15, // insured_area
        'Ha' // insured_area_unit
      )
      .addContracts([nftContract])
      .call();

    const { logs } = await waitForResult();
    console.log('Logs:', logs);

    // console.log('Transaction response:', tx);

    // setTransactionId(tx.transactionId);
    // alert(`NFT policy purchased! Transaction ID: ${tx.transactionId}`);
    // } catch (error) {
    //   console.log('Purchase error:', error);
    //   // alert('An error occurred, check the console.');
    // }
  };

  useEffect(() => {
    async function getContracts() {
      if (isConnected && wallet) {
        try {
          const insuranceContract = new InsuranceContract(
            INSURANCE_MANAGER_CONTRACT_ID,
            wallet
          );
          const nftContract = new InsuranceNft(
            INSURANCE_NFT_CONTRACT_ID,
            wallet
          );
          setInsuranceContract(insuranceContract);
          setNftContract(nftContract);
        } catch (error) {
          console.error('Error initializing contract:', error);
        }
      }
    }
    getContracts();
  }, [isConnected, wallet, network]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        {isConnected ? (
          <>
            <h3 style={styles.label}>Agroshield</h3>

            {balance && balance.toNumber() === 0 ? (
              <p>
                Get testnet funds from the{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://faucet-testnet.fuel.network/?address=${wallet?.address.toAddress()}`}
                >
                  Fuel Faucet
                </a>{' '}
                to purchase a policy.
              </p>
            ) : (
              <button type="button" onClick={purchasePolicy}>
                Purchase Insurance Policy
              </button>
            )}

            <p>Your Fuel Wallet address is:</p>
            <p>{wallet?.address.toAddress()}</p>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              connect();
            }}
            style={styles.button}
          >
            {isConnecting ? 'Connecting' : 'Connect'}
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'black',
  } as React.CSSProperties,
  container: {
    color: '#ffffffec',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties,
  label: {
    fontSize: '28px',
  },
  counter: {
    color: '#a0a0a0',
    fontSize: '48px',
  },
  button: {
    borderRadius: '8px',
    margin: '24px 0px',
    backgroundColor: '#707070',
    fontSize: '16px',
    color: '#ffffffec',
    border: 'none',
    outline: 'none',
    height: '60px',
    padding: '0 1rem',
    cursor: 'pointer',
  },

  // return (
  //   <div style={{ padding: 20 }}>
  //     <h2>🌾 AgroShield Insurance Test 🌧️</h2>

  //     {!isConnected && (
  //       <button type="button" onClick={() => connect()}>
  //         Connect Fuel Wallet
  //       </button>
  //     )}

  //     {isConnected && (
  //       <>
  //         <button type="button" onClick={purchasePolicy}>
  //           Purchase Insurance Policy
  //         </button>

  //         {transactionId && (
  //           <div>
  //             ✅ Transaction completed successfully! <br />
  //             Transaction ID: <code>{transactionId}</code>
  //           </div>
  //         )}
  //       </>
  //     )}
  //   </div>
  // );
};

export default App;
