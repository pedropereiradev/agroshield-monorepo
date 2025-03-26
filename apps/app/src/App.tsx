import { useConnectUI, useWallet } from '@fuels/react';

function App() {
  const { connect } = useConnectUI();
  const { wallet } = useWallet();
  return (
    <div>
      <button type="button" onClick={connect}>
        Conectar
      </button>
      {wallet && <p>Conectado como {wallet.address.toAddress()}</p>}
    </div>
  );
}

export default App;
