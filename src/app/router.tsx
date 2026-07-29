import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';

const BootPage = lazy(() => import('../pages/BootPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const VantaPage = lazy(() => import('../pages/VantaPage'));
const OperatorsPage = lazy(() => import('../pages/OperatorsPage'));
const OperatorDetailPage = lazy(() => import('../pages/OperatorDetailPage'));
const ArmorsPage = lazy(() => import('../pages/ArmorsPage'));
const ArmorDetailPage = lazy(() => import('../pages/ArmorDetailPage'));
const FactionsPage = lazy(() => import('../pages/FactionsPage'));
const FactionDetailPage = lazy(() => import('../pages/FactionDetailPage'));
const TimelinePage = lazy(() => import('../pages/TimelinePage'));
const TerminalPage = lazy(() => import('../pages/TerminalPage'));
const ArchivesPage = lazy(() => import('../pages/ArchivesPage'));
const ArchiveDocumentPage = lazy(() => import('../pages/ArchiveDocumentPage'));
const InvestigationPage = lazy(() => import('../pages/InvestigationPage'));
const MemoryReconstructionPage = lazy(() => import('../pages/MemoryReconstructionPage'));
const ChapterTwoPage = lazy(() => import('../pages/ChapterTwoPage'));
const SpectralAnalysisPage = lazy(() => import('../pages/SpectralAnalysisPage'));
const ChapterThreePage = lazy(() => import('../pages/ChapterThreePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function Loading() { return <div className="loading-screen" role="status">CHARGEMENT DU SEGMENT CLASSIFIÉ…</div>; }

export function AppRouter() {
  return <HashRouter><Suspense fallback={<Loading />}><Routes><Route path="/" element={<BootPage />} /><Route element={<AppShell />}><Route path="dashboard" element={<DashboardPage />} /><Route path="vanta" element={<VantaPage />} /><Route path="operators" element={<OperatorsPage />} /><Route path="operators/:operatorId" element={<OperatorDetailPage />} /><Route path="armors" element={<ArmorsPage />} /><Route path="armors/:armorId" element={<ArmorDetailPage />} /><Route path="factions" element={<FactionsPage />} /><Route path="factions/:factionId" element={<FactionDetailPage />} /><Route path="timeline" element={<TimelinePage />} /><Route path="terminal" element={<TerminalPage />} /><Route path="archives" element={<ArchivesPage />} /><Route path="archives/:documentId" element={<ArchiveDocumentPage />} /><Route path="investigation" element={<InvestigationPage />} /><Route path="memory" element={<MemoryReconstructionPage />} /><Route path="chapter-two" element={<ChapterTwoPage />} /><Route path="spectral-analysis" element={<SpectralAnalysisPage />} /><Route path="chapter-three" element={<ChapterThreePage />} /><Route path="settings" element={<SettingsPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes></Suspense></HashRouter>;
}
