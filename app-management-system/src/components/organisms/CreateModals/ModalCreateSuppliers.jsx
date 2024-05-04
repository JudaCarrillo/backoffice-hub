import React from 'react'

export function ModalCreateSuppliers ({ modalName, title, onReceiveRows }) {
  const [showModal, setShowModal] = useState(false);
  const [supplierData, setSupplierData] = useState({
    company_name: '',
    contact_name: '',
    contact_title: '',
    address: '',
    city: '',
    region: '',
    postal_code: 0,
    country: '',
    phone: '',
    fax: '',
    home_page: '',
  });
  
  return (
    <div>ModalSuppliers</div>
  )
}

export default ModalSuppliers