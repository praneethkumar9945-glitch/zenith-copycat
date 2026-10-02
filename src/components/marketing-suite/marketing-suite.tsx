import { useState, useMemo } from 'react';
import {
  Sidebar, TopBar, NotificationsPanel, roleConfigs,
  type RoleConfig,
} from '@/components/marketing-suite/components/layout/Sidebar';
import { notifications as initialNotifications } from '@/components/marketing-suite/data/mockData';
import type { Role, Notification } from '@/components/marketing-suite/types';
import { CoverPage } from '@/components/marketing-suite/pages/CoverPage';

// Marketing Head pages
import { BrandingReputation } from '@/components/marketing-suite/pages/marketing/BrandingReputation';
import { PRMediaManagement } from '@/components/marketing-suite/pages/marketing/PRMediaManagement';
import { CampaignManagement } from '@/components/marketing-suite/pages/marketing/CampaignManagement';
import { DigitalMarketingOverview } from '@/components/marketing-suite/pages/marketing/DigitalMarketingOverview';
import { TeamCoordination } from '@/components/marketing-suite/pages/marketing/TeamCoordination';

// Sales pages
import {
  LeadManagement, EnquiryManagement, FollowUps, Counselling,
  ConversionTracking, SalesReports,
} from '@/components/marketing-suite/pages/sales/SalesPages';

// Digital Marketing pages
import {
  DigitalCampaignManagement, WebsiteManagement, SocialMediaManagement,
  SEOManagement, DigitalAnalytics, LeadGeneration,
} from '@/components/marketing-suite/pages/digital/DigitalPages';

// Content / Brand pages
import {
  ContentCreation, MarketingMaterials, SocialMediaContentPage,
  ContentReviewApproval, ContentLibrary,
} from '@/components/marketing-suite/pages/content/ContentPages';

// Events & Outreach pages
import {
  EventManagement, SchoolOutreachPage, PartnershipCoordination,
  OutreachLeadGeneration, EventPerformanceReports,
} from '@/components/marketing-suite/pages/events/EventsPages';

function App() {
  const [role, setRole] = useState<Role>('marketing-head');
  const [activePage, setActivePage] = useState('branding');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showCoverPage, setShowCoverPage] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const roleConfig: RoleConfig = useMemo(
    () => roleConfigs.find((r) => r.id === role) || roleConfigs[0],
    [role]
  );

  const handleNavigate = (pageId: string) => {
    setActivePage(pageId);
  };

  const handleSelectRole = (roleId: string) => {
    const newRole = roleId as Role;
    setRole(newRole);
    const newConfig = roleConfigs.find((r) => r.id === newRole);
    setActivePage(newConfig?.nav[0]?.id || 'branding');
    setShowCoverPage(false);
  };

  const handleSwitchRole = (newRole: Role) => {
    setRole(newRole);
    setShowRoleSwitcher(false);
    const newConfig = roleConfigs.find((r) => r.id === newRole);
    setActivePage(newConfig?.nav[0]?.id || 'branding');
    setShowCoverPage(false);
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Filter notifications for current role
  const roleNotifications = notifications.filter(
    (n) => n.role === role || n.role === 'all'
  );
  const unreadCount = roleNotifications.filter((n) => !n.read).length;

  // Get breadcrumb and page title
  const currentNav = roleConfig.nav.find((n) => n.id === activePage);
  const pageTitle = showCoverPage ? 'Marketing, Admissions & PR' : (currentNav?.label || 'Overview');
  const breadcrumb = showCoverPage ? ['Marketing, Admissions & PR'] : [pageTitle];

  const renderPage = () => {
    switch (role) {
      case 'marketing-head':
        switch (activePage) {
          case 'branding': return <BrandingReputation />;
          case 'pr-media': return <PRMediaManagement />;
          case 'campaigns': return <CampaignManagement />;
          case 'digital-overview': return <DigitalMarketingOverview />;
          case 'team-coordination': return <TeamCoordination />;
          default: return <BrandingReputation />;
        }
      case 'sales':
        switch (activePage) {
          case 'leads': return <LeadManagement />;
          case 'enquiries': return <EnquiryManagement />;
          case 'followups': return <FollowUps />;
          case 'counselling': return <Counselling />;
          case 'conversion': return <ConversionTracking />;
          case 'reports': return <SalesReports />;
          default: return <LeadManagement />;
        }
      case 'digital':
        switch (activePage) {
          case 'digital-campaigns': return <DigitalCampaignManagement />;
          case 'website': return <WebsiteManagement />;
          case 'social-media': return <SocialMediaManagement />;
          case 'seo': return <SEOManagement />;
          case 'analytics': return <DigitalAnalytics />;
          case 'lead-gen': return <LeadGeneration />;
          default: return <DigitalCampaignManagement />;
        }
      case 'content':
        switch (activePage) {
          case 'content-creation': return <ContentCreation />;
          case 'materials': return <MarketingMaterials />;
          case 'social-content': return <SocialMediaContentPage />;
          case 'review': return <ContentReviewApproval />;
          case 'library': return <ContentLibrary />;
          default: return <ContentCreation />;
        }
      case 'events':
        switch (activePage) {
          case 'events': return <EventManagement />;
          case 'school-outreach': return <SchoolOutreachPage />;
          case 'partnerships': return <PartnershipCoordination />;
          case 'outreach-leads': return <OutreachLeadGeneration />;
          case 'event-reports': return <EventPerformanceReports />;
          default: return <EventManagement />;
        }
      default:
        return <BrandingReputation />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] bg-secondary/30 -m-4 md:-m-6">
      {!showCoverPage && (
        <Sidebar
          role={roleConfig}
          activePage={activePage}
          onNavigate={handleNavigate}
          onSwitchRole={() => setShowCoverPage(true)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {!showCoverPage && !sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/25"
          onClick={() => setSidebarCollapsed(true)}
          aria-hidden="true"
        />
      )}

      <div>
        <TopBar
          breadcrumb={breadcrumb}
          pageTitle={pageTitle}
          role={roleConfig}
          notifications={{ unread: unreadCount }}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          noSidebar={showCoverPage}
        />

        <main className="p-4 md:p-6 max-w-[1600px] mx-auto">
          {showCoverPage
            ? <CoverPage roles={roleConfigs} onSelectRole={handleSelectRole} sidebarCollapsed={sidebarCollapsed} />
            : renderPage()}
        </main>
      </div>

      <NotificationsPanel
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={roleNotifications}
        onMarkRead={handleMarkRead}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Role Switcher Modal */}
      {showRoleSwitcher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowRoleSwitcher(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">Switch Role</h2>
              <p className="text-sm text-slate-500 mt-0.5">Select a role to view its workspace</p>
            </div>
            <div className="p-4 space-y-2">
              {roleConfigs.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleSwitchRole(r.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors text-left ${
                    role === r.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${r.color}`}>
                    {r.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.nav.length} modules available</p>
                  </div>
                  {role === r.id && (
                    <span className="ml-auto text-xs font-medium text-blue-600">Current</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
