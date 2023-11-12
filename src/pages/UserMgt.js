import AdminSidebar from '../components/AdminSidebar'
import { BiPurchaseTagAlt } from 'react-icons/bi'
import '../styles/UserMgt.scss'

export default function UserMgt() {
    return (
        <>
        <div className="user-container">
        <AdminSidebar />
         <section className="user-mgt-body">
            <div className="user-mgt-container">
                <div className="user-mgt-text">
                    <BiPurchaseTagAlt className="purchase-tag"/>
                    <h1>Purchases</h1>
                </div>
            </div>
            <div className="purchase-history-ctn">
                <div className="purchase-box">
                <h1>Bill to: <span>Niko Soriano</span></h1>
                <h1>Location: <span>Purok Chico, Barangay Sto. Nino, Panabo City, Davao Del Norte</span></h1>
                <h1>Invoice Number: <span>4508</span></h1>
                <h1>Ordered Item: <span>1 x Bicol Express, 4 x Lechon Baboy</span></h1>
                <h1>Date Issued: <span>11/11/2023</span></h1>
                <h1>Total Bill: <span>450 PHP</span></h1>
                <p>Remove</p>
                </div>
            </div>
         </section>
         </div>
        </>
    )
}