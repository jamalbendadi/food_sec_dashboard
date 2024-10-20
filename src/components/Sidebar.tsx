import { useState } from 'react';
import '@/css/sidebar.css';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className="mobile-header">
                <button
                    className="hamburger"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
                <h1 className="app-title">Food security dashboard</h1>
            </div>

            <nav
                className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''
                    }`}
            >
                <div className="sidebar-header">
                    <h2 className="sidebar-title">{!isCollapsed && 'ℹ️ Info'}</h2>
                    <button
                        className="collapse-button"
                        onClick={toggleSidebar}
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? '→' : '←'}
                    </button>
                </div>
                {!isCollapsed && (
                    <div className="sidebar-content">
                        <div>
                            <h3>Explore the African continent by finding out more about their food security.</h3><br />
                            Hover over a country to view detailed information about its current food security data.
                        </div>
                        <div className='metrics-content'>
                            <h4>Metrics Overview</h4>
                            <ul>
                                <li><strong>FCS (Food Consumption Score):</strong> Evaluates dietary diversity and frequency of food intake.</li>
                                <li><strong>RCSI (Rapid Country Security Index):</strong> Measures overall food security status in a country.</li>
                                <li><strong>Health Access:</strong> Assesses availability and accessibility of healthcare services related to nutrition.</li>
                                <li><strong>Market Access:</strong> Indicates the ease of obtaining food through local markets and supply chains.</li>
                                <li><strong>Phase 3:</strong> Signals severe food insecurity requiring targeted interventions.</li>
                                <li><strong>Phase 4:</strong> Signals critical food insecurity necessitating urgent humanitarian aid.</li>
                                <li><strong>Phase 5:</strong> Signals catastrophic food insecurity with imminent risk of widespread famine.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </nav>

            {isMobileMenuOpen && <div className="overlay" onClick={toggleMobileMenu}></div>}
        </>
    );
};

export default Sidebar;
