import { useDispatch, useSelector } from 'react-redux'
import { connectWallet, disconnectWallet } from '../../reducers/walletActions'

export const ConnectButton = ({ Tezos, setTezos, wallet }) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => {
    return state.walletConfig.user
  })

  const handleConnectWallet = async () => {
    dispatch(connectWallet({ Tezos, wallet }))
  }

  const handleDisconnectWallet = async () => {
    dispatch(disconnectWallet({ wallet, setTezos }))
  }

  return (
    <button
      className="bg-blue-600 text-white p-2 m-1 rounded-lg hover:bg-blue-700"
      onClick={
        selector.userAddress === ''
          ? handleConnectWallet
          : handleDisconnectWallet
      }
    >
      <div className="flex flex-row">
        <p className="mr-2 mt-[2px]">💳</p>
        <p>
          {selector.userAddress !== ''
            ? selector.userAddress.slice(0, 4) +
              '...' +
              selector.userAddress.slice(
                selector.userAddress.length - 4,
                selector.userAddress.length,
              )
            : 'Connect Wallet'}
        </p>
      </div>
    </button>
  )
}
