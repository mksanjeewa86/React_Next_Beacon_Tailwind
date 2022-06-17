import { ConnectButton } from './buttons/ConnectButton'
import { ProjectCteateButton } from './buttons/ProjectCreateButton'

export const Navbar = ({ Tezos, setTezos, wallet }) => {
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
      <div style={{ backgroundColor: 'blue' }}>
        <ProjectCteateButton />
        <ConnectButton Tezos={Tezos} setTezos={setTezos} wallet={wallet} />
      </div>
    </nav>
  )
}
