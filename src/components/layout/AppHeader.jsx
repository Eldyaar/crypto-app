import { useEffect, useState } from 'react'
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'


const headerStyle = {
   width: '100%',
   position: 'sticky',
   top: 0,
   zIndex: 10,
   textAlign: 'center',
   height: 60,
   padding: '1rem',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}


const AppHeader = () => {
   const [select, setSelect] = useState(false)
   const [coin, setCoin] = useState(null)
   const [modal, setModal] = useState(false)
   const [drawer, setDrawer] = useState(false)
   const { crypto } = useCrypto()

   useEffect(() => {
      const keypress = event => {
         if (event.key === '/') {
            setSelect((prev) => !prev)
         }
      }
      document.addEventListener('keypress', keypress)
      return () => document.removeEventListener('keypress', keypress)
   }, [])

   const handleSelect = (value) => {
      setCoin(crypto.find((c => c.id === value))) 
      setModal(true)
   }


   return (
      <Layout.Header style={headerStyle}>
         <Select
            style={{
               width: 250,
            }}
            open={select}
            onSelect={handleSelect}
            onClick={() => setSelect((prev) => !prev)}
            value='press / to open'
            options={crypto.map(({ name, id, icon }) => ({
               label: name,
               value: id, 
               icon: icon
            }))}
            optionRender={(option) => (
               <Space>
                  <img 
                     style={{ width: 20 }} 
                     src={option.data.icon} 
                     alt={option.data.label} 
                  />{' '}
                  { option.data.label }
               </Space>
            )}
         />
         <Button type='primary' onClick={() => setDrawer(true)}>Add Asset</Button>

         <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
            <CoinInfoModal coin={coin} />
         </Modal>

         <Drawer 
            destroyOnClose 
            width={550} 
            title="Add Asset" 
            onClose={() => setDrawer(false)} 
            open={drawer}
         >
            <AddAssetForm onClose={() => setDrawer(false)} />
         </Drawer>
      </Layout.Header>
   )
}

export default AppHeader
