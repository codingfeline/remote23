// prettier-ignore
import { Edit, Plus, UserPass, MethodInfoType, useState, ToggleHook, useEffect, NetworkType } from '@components'
import URL from '@components/Url'
import { useRouter } from 'next/navigation'

const NetworkConfig = ({ network, cid }: { network: NetworkType[]; cid: string }) => {
  const router = useRouter()
  const [showSection, setshowSection] = useState(true)

  const handleShowChange = (show: boolean) => {
    setshowSection(show)
  }

  const DnsSplit = () => {
    const dns = network[0].dns
    if (dns) {
      const dnsArr = dns.split(',')
      return dnsArr.map(dn => <input type="text" value={dn} />)
    }
  }

  const space = <Plus className="text-orange-100 hover:text-orange-100 disabled" />

  return (
    <div className="method bg-green-100  border-green-400 ">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Network"
        length={network.length}
        compo="addNetwork"
        cid={cid}
      />
      <div className={`transIn ${!showSection && 'transOut'}`}>
        {network.map(net => {
          return (
            <div key={net._id} className="sub">
              <div className=" bg-green-100">
                <div className="flex justify-between">
                  <Edit onClick={() => router.push(`/editMethod/2/2`)} />
                  <span className="tracking-[4px] bold">{'Network'}</span>
                </div>
                <div className="item">
                  <label htmlFor="name">name</label>
                  <input type="text" value={net.name} readOnly />
                </div>
                <div className="item">
                  <label htmlFor="domain">domain</label>
                  <input type="text" value={net.domain} readOnly />
                </div>
                <div className="item">
                  <label htmlFor="dns">dns</label>
                  <div className="flex flex-col">
                    <DnsSplit />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NetworkConfig
