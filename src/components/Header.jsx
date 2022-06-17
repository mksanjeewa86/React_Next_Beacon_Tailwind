import { ConnectButton } from '../common/buttons/ConnectButton'
import { ProjectCteateButton } from '../common/buttons/ProjectCreateButton'

export const Header = ({ Tezos, setTezos, wallet }) => {
  return (
    <nav
      style={{
        backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
      }}
    >
      <div></div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ProjectCteateButton />
        <ConnectButton Tezos={Tezos} setTezos={setTezos} wallet={wallet} />
      </div>
    </nav>
  )
}
