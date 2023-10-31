import AdminSidebar from '../components/AdminSidebar'
import '../styles/AdminPanel.scss'

export default function Admin() {
    return (
        <>
        <div className="dashboard-container">
         <AdminSidebar />
          <div className="dashboard-page">
            <section className="menu-stats-container">
                <h1>Admin panel</h1>
            </section>
          </div>
         </div>
        </>
    )
}