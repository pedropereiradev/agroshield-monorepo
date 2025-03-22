import { useEffect, useState } from 'react';
import './App.css';
import { NftInsuranceContract } from './sway-api';
import {
  useBalance,
  useConnectUI,
  useIsConnected,
  useWallet,
} from '@fuels/react';
import { BN, getMintedAssetId, hexlify } from 'fuels';

const CONTRACT_ID =
  '0x0094f68a5dc98b25a3e35ed6ee9258ec240316776ba54bce59fdcd5086b95b64';

const toB256 = (input: string): `0x${string}` => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);

  if (bytes.length > 32) throw new Error('sub_id muito longo (máx 32 bytes)');

  const padded = new Uint8Array(32);
  padded.set(bytes);

  return hexlify(padded) as `0x${string}`;
};

function App() {
  const [contract, setContract] = useState<NftInsuranceContract>();
  const [txId, setTxId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean | null>(null);
  const [totalSupply, setTotalSupply] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<string | null>(null);
  const [assetId, setAssetId] = useState<string>('0x...');
  const [subId, setSubId] = useState<string>('demo-nft');

  const { connect, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  const { balance } = useBalance({
    address: wallet?.address.toAddress(),
    //  assetId: wallet?.provider.getBaseAssetId(),
  });

  useEffect(() => {
    async function getInitialCount() {
      if (isConnected && wallet) {
        const nftContract = new NftInsuranceContract(CONTRACT_ID, wallet);
        //  await getCount(nftContract);
        setContract(nftContract);
      }
    }

    getInitialCount();
  }, [isConnected, wallet]);

  useEffect(() => {
    async function asset() {
      const walletAssetId = await wallet?.provider.getBaseAssetId();
      setAssetId(walletAssetId ?? '0x...');
    }

    asset();
  }, [wallet]);

  const handleMint = async () => {
    if (!contract) {
      return alert('Contract not loaded');
    }

    if (!wallet) {
      return alert('Wallet not loaded');
    }

    const amount = new BN(1);

    const address = wallet.address;
    const addressInput = { bits: address.toB256() };
    const addressIdentityInput = { Address: addressInput };

    const subIdB256 = toB256(subId);

    console.log({ addressIdentityInput, subId, amount, subIdB256 });

    const minted = await contract.functions
      .mint(addressIdentityInput, subIdB256, amount)
      .call();

    setTxId(minted.transactionId);

    alert('NFT mintada!');
  };

  const handleBurn = async () => {
    if (!contract) {
      return alert('Contract not loaded');
    }

    const amount = new BN(1);
    const subIdB256 = toB256(subId);

    await contract.functions.burn(subIdB256, amount).call();

    alert('NFT queimada!');
  };

  const handlePause = async () => {
    if (!contract) {
      return alert('Contract not loaded');
    }

    await contract.functions.pause().call();
    alert('Contrato pausado');
  };

  const handleUnpause = async () => {
    if (!contract) {
      return alert('Contract not loaded');
    }

    await contract.functions.unpause().call();
    alert('Contrato despausado');
  };

  const checkPaused = async () => {
    if (!contract) {
      return alert('Contract not loaded');
    }

    const result = await contract.functions.is_paused().get();

    setIsPaused(result.value);
  };

  const checkTotalSupply = async () => {
    if (!contract) {
      return alert('Contract not loaded');
    }
    const subIdB256 = toB256(subId);
    const asset = getMintedAssetId(CONTRACT_ID, subIdB256);
    const assetIdInput = { bits: asset };

    const result = await contract.functions.total_supply(assetIdInput).get();

    console.log(result);

    const { value } = result;

    setTotalSupply(value?.toString() ?? '0');
  };

  const checkMetadata = async () => {
    if (!contract) {
      return alert('Contract not loaded');
    }
    const subIdB256 = toB256(subId);
    const asset = getMintedAssetId(CONTRACT_ID, subIdB256);
    const assetIdInput = { bits: asset };

    const result = await contract.functions
      .metadata(assetIdInput, 'description')
      .get();

    console.log(result);

    setMetadata(result.value ? JSON.stringify(result.value) : 'Sem metadado');
  };

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>🔗 NFT Fuel – POC</h1>
      {isConnected ? (
        <div>
          <label>
            Sub ID:{' '}
            <input
              value={subId}
              onChange={(e) => setSubId(e.target.value)}
              style={{ marginBottom: 10 }}
            />
          </label>
          <br />

          <label>
            Asset ID:{' '}
            <input
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              style={{ marginBottom: 10 }}
            />
          </label>

          <div style={{ marginTop: 20 }}>
            <button type="button" onClick={handleMint}>
              ✅ Mint NFT
            </button>{' '}
            <button type="button" onClick={handleBurn}>
              🔥 Burn NFT
            </button>{' '}
            <button type="button" onClick={handlePause}>
              ⏸️ Pause
            </button>{' '}
            <button type="button" onClick={handleUnpause}>
              ▶️ Unpause
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
            <button type="button" onClick={checkPaused}>
              🔍 Ver se está pausado
            </button>{' '}
            {isPaused !== null && <span>{isPaused ? 'Pausado' : 'Ativo'}</span>}
          </div>

          <div style={{ marginTop: 20 }}>
            <button type="button" onClick={checkTotalSupply}>
              🔍 Ver Total Supply
            </button>{' '}
            {totalSupply && <span>{totalSupply}</span>}
          </div>

          <div style={{ marginTop: 20 }}>
            <button type="button" onClick={checkMetadata}>
              🔍 Ver Metadata
            </button>{' '}
            {metadata && <pre>{metadata}</pre>}
          </div>

          {txId && (
            <p>
              Última TX:{' '}
              <a
                href={`https://fuellabs.github.io/block-explorer-v2/transaction/${txId}`}
                target="_blank"
                rel="noreferrer"
              >
                {txId}
              </a>
            </p>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            connect();
          }}
        >
          {isConnecting ? 'Connecting' : 'Connect'}
        </button>
      )}
    </div>
  );
}
export default App;
