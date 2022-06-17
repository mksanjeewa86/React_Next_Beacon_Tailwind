import {
  BeaconEvent,
  ColorMode,
  defaultEventCallbacks,
  NetworkType
} from '@airgap/beacon-sdk'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Header } from '../components/Header'
import * as actions from '../reducers/actionType'
import { _walletConfig } from '../reducers/walletActions'
import config from '../utils/config'

export default function Home() {
  const dispatch = useDispatch()
  const [Tezos, setTezos] = useState(
    new TezosToolkit('https://ithacanet.smartpy.io'),
  )
  const [wallet, setWallet] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    ;(async () => {
      const wallet_instance = new BeaconWallet({
        name: 'Template',
        preferredNetwork: NetworkType.ITHACANET,
        colorMode: ColorMode.LIGHT,
        disableDefaultEvents: false,
        eventHandlers: {
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT,
          },
          [BeaconEvent.PAIR_SUCCESS]: {
            handler: (data) => {
              return data.publicKey
            },
          },
        },
      })
      Tezos.setWalletProvider(wallet_instance)
      const activeAccount = await wallet_instance.client.getActiveAccount()
      if (activeAccount) {
        const userAddress = await wallet_instance.getPKH()
        const balance = await Tezos.tz.getBalance(userAddress)
        dispatch(
          _walletConfig({
            userAddress: userAddress,
            balance: balance.toNumber(),
          }),
        )
      }
      setWallet(wallet_instance)
    })()
  }, [Tezos, dispatch])

  useEffect(() => {
    async function getProjectData() {
      const storageData = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${config.contractAddress}/storage`,
      )
      const projectData = await axios.get(
        `https://api.ithacanet.tzkt.io/v1/contracts/${config.contractAddress}/bigmaps/projects/keys`,
      )
      setProjects(projectData.data)
      dispatch({
        type: actions.SET_VALUE,
        payload: {
          commision: storageData.data.commision,
          nextProjectId: storageData.data.nextProjectId,
          projects: projectData.data,
          totalCommission: projectData.data.totalCommission,
        },
      })
    }
    getProjectData()
  }, [Tezos, dispatch])

  return (
    <>
      <Header Tezos={Tezos} setTezos={setTezos} wallet={wallet} />
    </>
  )
}
