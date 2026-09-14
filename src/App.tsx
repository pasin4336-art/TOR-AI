import React, { useState, useMemo } from 'react';
import { DEFAULT_TORS } from './data/defaultTors';
import { TORDocument, ComparisonAnalysisResult, TORFilterOptions } from './types';
import { RadarChart } from './components/RadarChart';
import { ComparisonTable } from './components/ComparisonTable';
import { SimilaritiesAndDifferences } from './components/SimilaritiesAndDifferences';
import { ProcurementMemo } from './components/ProcurementMemo';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { TorDetailDrawer } from './components/TorDetailDrawer';
import { TorFilterBar } from './components/TorFilterBar';
import { ProposalIntakeModal } from './components/ProposalIntakeModal';
import { OfficialPdfReportModal } from './components/OfficialPdfReportModal';
import { DocumentRepositoryView } from './components/DocumentRepositoryView';
import {
  FileText,
  Scale,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  Printer,
  ShieldCheck,
  Building,
  Layers,
  FileCheck2,
  Download,
  Filter,
  FolderArchive,
  HardDrive,
} from 'lucide-react';

const INITIAL_FILTERS: TORFilterOptions = {
  search: '',
  budgetRange: 'all',
  duration: 'all',
  architecture: 'all',
  barrierGate: 'all',
  warranty: 'all',
  minScore: 0,
  sourceType: 'all',
};

export default function App() {
  const [tors, setTors] = useState<TORDocument[]>(DEFAULT_TORS);
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'mock-tor-01',
    'mock-tor-02',
    'drive-tor-01',
    'proposal-vendor-01',
  ]);
  const [filters, setFilters] = useState<TORFilterOptions>(INITIAL_FILTERS);
  const [activeTab, setActiveTab] = useState<
    'repository' | 'matrix' | 'radar' | 'compare' | 'memo'
  >('repository');

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadModalMode, setUploadModalMode] = useState<'upload' | 'drive' | 'text'>('upload');
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isPdfReportModalOpen, setIsPdfReportModalOpen] = useState(false);
  const [inspectingTor, setInspectingTor] = useState<TORDocument | null>(null);

  const handleOpenUploadModal = (mode: 'upload' | 'drive' | 'text' = 'upload') => {
    setUploadModalMode(mode);
    setIsUploadModalOpen(true);
  };

  const [aiComparisonResult, setAiComparisonResult] = useState<ComparisonAnalysisResult | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  // Filter logic
  const filteredTors = useMemo(() => {
    return tors.filter((tor) => {
      // 1. Keyword search
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        const match =
          tor.title.toLowerCase().includes(q) ||
          tor.code.toLowerCase().includes(q) ||
          tor.submitter.toLowerCase().includes(q) ||
          tor.scope.toLowerCase().includes(q) ||
          tor.hardware.some((h) => h.toLowerCase().includes(q)) ||
          tor.software.some((s) => s.toLowerCase().includes(q));
        if (!match) return false;
      }

      // 2. Budget range
      if (filters.budgetRange === 'under1m' && tor.rawBudgetNumber >= 1000000) return false;
      if (
        filters.budgetRange === '1mTo2m' &&
        (tor.rawBudgetNumber < 1000000 || tor.rawBudgetNumber > 2000000)
      )
        return false;
      if (filters.budgetRange === 'above2m' && tor.rawBudgetNumber <= 2000000) return false;

      // 3. Duration
      if (filters.duration !== 'all') {
        const targetDays = parseInt(filters.duration, 10);
        if (tor.durationDays !== targetDays) return false;
      }

      // 4. Architecture
      if (filters.architecture !== 'all') {
        if (tor.architectureType && tor.architectureType !== filters.architecture) return false;
      }

      // 5. Barrier gate
      if (filters.barrierGate === 'with_barrier' && tor.hasBarrierGate === false) return false;
      if (filters.barrierGate === 'without_barrier' && tor.hasBarrierGate !== false) return false;

      // 6. Warranty
      if (filters.warranty !== 'all') {
        const targetW = parseInt(filters.warranty, 10);
        if (tor.warrantyYears && tor.warrantyYears !== targetW) return false;
      }

      // 7. Min Score
      if (filters.minScore > 0) {
        if (tor.scores.technical < filters.minScore) return false;
      }

      // 8. Source Type
      if (filters.sourceType !== 'all') {
        if (tor.sourceType !== filters.sourceType) return false;
      }

      return true;
    });
  }, [tors, filters]);

  const toggleSelectTor = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 1) {
        showNotification('ต้องเลือก TOR อย่างน้อย 1 ฉบับเพื่อการแสดงผล');
        return;
      }
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectFilteredAll = () => {
    const filteredIds = filteredTors.map((t) => t.id);
    setSelectedIds(Array.from(new Set([...selectedIds, ...filteredIds])));
    showNotification(`เลือก TOR ตามผลตัวกรองจำนวน ${filteredIds.length} ฉบับ`);
  };

  const handleAddTor = (newTor: TORDocument) => {
    setTors((prev) => [newTor, ...prev]);
    setSelectedIds((prev) => [newTor.id, ...prev]);
    showNotification(`นำเข้าเอกสาร ${newTor.code} สำเร็จ และอัปเดตเรดาร์ชาร์ตแล้ว`);
  };

  const handleAddProposal = (newProposal: TORDocument) => {
    setTors((prev) => [newProposal, ...prev]);
    setSelectedIds((prev) => [newProposal.id, ...prev]);
    showNotification(
      `บันทึกข้อเสนอของ "${newProposal.submitter}" สำเร็จ พร้อมผลประเมินคะแนน AI แล้ว`
    );
  };

  const handleRefreshAiComparison = async () => {
    const activeTors = tors.filter((t) => selectedIds.includes(t.id));
    if (activeTors.length < 2) {
      showNotification('ต้องเลือก TOR อย่างน้อย 2 ฉบับเพื่อทำการเปรียบเทียบด้วย AI');
      return;
    }

    setIsLoadingAi(true);
    try {
      const response = await fetch('/api/compare-tors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tors: activeTors }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'การเปรียบเทียบด้วย AI ขัดข้อง');
      }

      setAiComparisonResult(data.data);
      if (data.data?.isFallback) {
        showNotification('อัปเดตผลการวิเคราะห์เปรียบเทียบตามระเบียบพัสดุเรียบร้อยแล้ว');
      } else {
        showNotification('อัปเดตผลการวิเคราะห์เปรียบเทียบด้วย Gemini สำเร็จ');
      }
    } catch (err: any) {
      console.error('Error during AI comparison:', err);
      const errStr = String(err?.message || err);
      if (errStr.includes('503') || errStr.includes('high demand') || errStr.includes('UNAVAILABLE')) {
        showNotification('ระบบ AI ภายนอกมีผู้ใช้งานหนาแน่นชั่วคราว ระบบได้เปิดการวิเคราะห์ตามเกณฑ์พัสดุอัตโนมัติให้ท่านแล้ว');
      } else {
        showNotification(`การประมวลผลเปรียบเทียบ: ${errStr}`);
      }
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Government-Themed Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & System Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                <Scale className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    ระบบ AI วิเคราะห์และเปรียบเทียบ TOR พัสดุ
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    <span>ระเบียบพัสดุ พ.ศ. 2560</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">
                  โครงการระบบตรวจจับและอ่านป้ายทะเบียนรถ (License Plate Recognition: LPR)
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Button 0: View Documents & Google Drive Repository */}
              <button
                onClick={() => setActiveTab('repository')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                  activeTab === 'repository'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                <HardDrive className="w-4 h-4 text-amber-600" />
                <span className="hidden md:inline">คลังเอกสาร & Google ไดรฟ์</span>
                <span className="md:hidden">เอกสาร & ไดรฟ์</span>
                <span className="px-1.5 py-0.2 bg-amber-200/80 text-amber-900 rounded-full text-[10px]">
                  {tors.length}
                </span>
              </button>

              {/* Button 1: Submit Proposal on Screen */}
              <button
                onClick={() => setIsProposalModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200 transition-colors shadow-2xs"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span className="hidden lg:inline">รับข้อเสนอโครงการผ่านหน้าจอ</span>
                <span className="lg:hidden">รับข้อเสนอ</span>
              </button>

              {/* Button 2: Upload TOR Document */}
              <button
                onClick={() => handleOpenUploadModal('upload')}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200 transition-colors"
              >
                <UploadCloud className="w-4 h-4" />
                <span className="hidden xl:inline">นำเข้า TOR (.docx/.pdf)</span>
                <span className="xl:hidden">นำเข้า TOR</span>
              </button>

              {/* Button 3: Export PDF Report for Committee */}
              <button
                onClick={() => setIsPdfReportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ส่งออก PDF กรรมการ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Banner */}
      {notification && (
        <div className="bg-blue-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-sm animate-in fade-in print:hidden">
          {notification}
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* NEW FEATURE: Filter Bar */}
        <TorFilterBar
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={() => setFilters(INITIAL_FILTERS)}
          totalCount={tors.length}
          filteredCount={filteredTors.length}
        />

        {/* Document Selector Strip (Choose which TORs to compare) */}
        <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                เอกสารและข้อเสนอในระบบ (เลือกเปรียบเทียบ {selectedIds.length} จาก {tors.length} ฉบับ)
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              {filteredTors.length < tors.length && (
                <button
                  onClick={handleSelectFilteredAll}
                  className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <Filter className="w-3 h-3" />
                  <span>เลือกตามตัวกรอง ({filteredTors.length} ฉบับ)</span>
                </button>
              )}
              <button
                onClick={() => setSelectedIds(tors.map((t) => t.id))}
                className="text-slate-600 hover:text-slate-900 hover:underline font-medium"
              >
                เลือกทั้งหมด ({tors.length})
              </button>
            </div>
          </div>

          {filteredTors.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <Filter className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-700">ไม่พบเอกสาร TOR ที่ตรงกับเงื่อนไขตัวกรอง</p>
              <button
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="mt-2 text-blue-600 font-semibold hover:underline"
              >
                คลิกเพื่อล้างตัวกรองทั้งหมด
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredTors.map((tor) => {
                const isSelected = selectedIds.includes(tor.id);
                return (
                  <div
                    key={tor.id}
                    onClick={() => toggleSelectTor(tor.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {tor.code}
                        </span>
                        {tor.sourceType === 'proposal' && (
                          <span className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                            ยื่นผ่านหน้าจอ
                          </span>
                        )}
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'border border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected ? '✓' : ''}
                      </span>
                    </div>

                    <h3 className="font-semibold text-slate-900 text-xs line-clamp-2 leading-snug">
                      {tor.title}
                    </h3>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800">{tor.budget}</span>
                      <span className="text-slate-500">{tor.durationDays} วัน</span>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-slate-500">
                      <span>เทคนิค: <strong className="text-blue-700">{tor.scores.technical}/10</strong></span>
                      <span>{tor.hasBarrierGate !== false ? 'มีไม้กั้น' : 'ไม่มีไม้กั้น'}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingTor(tor);
                      }}
                      className="mt-2 w-full py-1 text-[11px] text-blue-700 hover:text-blue-900 font-medium hover:bg-blue-100/50 rounded flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>ดูรายละเอียดสเปกเต็ม</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Primary View Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 gap-2 overflow-x-auto pb-0.5">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('repository')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'repository'
                  ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <FolderArchive className="w-4 h-4" />
              <span>คลังเอกสาร & Google ไดรฟ์</span>
              <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded-full text-[10.5px] font-bold">
                {tors.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'matrix'
                  ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>ตารางเปรียบเทียบ 8 มิติ</span>
            </button>

            <button
              onClick={() => setActiveTab('radar')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'radar'
                  ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>กราฟเรดาร์ 5 มิติ</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'compare'
                  ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>ความเหมือน-ความต่าง & จุดเด่น/ด้อย</span>
            </button>

            <button
              onClick={() => setActiveTab('memo')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'memo'
                  ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ข้อเสนอแนะ & ร่างบันทึกข้อความราชการ</span>
            </button>
          </div>

          <div className="pb-1 hidden lg:flex items-center gap-2">
            <button
              onClick={() => setIsPdfReportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ส่งออก PDF ทางการ</span>
            </button>
            <button
              onClick={handleRefreshAiComparison}
              disabled={isLoadingAi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isLoadingAi ? 'animate-spin' : ''}`} />
              <span>{isLoadingAi ? 'กำลังวิเคราะห์...' : 'ประมวลผลเปรียบเทียบ AI'}</span>
            </button>
          </div>
        </div>

        {/* Tab 0: Document & Proposal Repository (เอกสารทั้งหมด & Google ไดรฟ์) */}
        {activeTab === 'repository' && (
          <DocumentRepositoryView
            tors={tors}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelectTor}
            onSelectAll={(ids) => setSelectedIds(ids)}
            onInspectTor={(tor) => setInspectingTor(tor)}
            onOpenUploadModal={handleOpenUploadModal}
            onOpenProposalModal={() => setIsProposalModalOpen(true)}
          />
        )}

        {/* Tab 1: Comparison Matrix */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <ComparisonTable
              tors={tors}
              selectedIds={selectedIds}
              onSelectTor={(tor) => setInspectingTor(tor)}
            />
          </div>
        )}

        {/* Tab 2: Radar Chart */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            <RadarChart tors={tors} selectedIds={selectedIds} />

            {/* Assessment methodology explanation */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>หลักเกณฑ์การให้คะแนนเรดาร์ชาร์ต 5 มิติ (เกณฑ์ละ 10 คะแนน)</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs text-slate-600 mt-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <strong className="text-slate-800 block mb-1">1. ระยะเวลา (10 คะแนน)</strong>
                  ประเมินจากความสมเหตุสมผลของกรอบเวลาส่งมอบ ไม่สั้นจนเสี่ยงงานสะดุด และไม่ยาวเกินความจำเป็นในการเร่งรัดเบิกจ่ายงบประมาณ
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <strong className="text-slate-800 block mb-1">2. ความเชี่ยวชาญ (10 คะแนน)</strong>
                  ประเมินจากผลงานที่ผ่านมา หนังสือรับรองผลงาน ทีมวิศวกรประจำโครงการ แผนบริหารความเสี่ยง (Risk Register) และแผนถ่ายทอดเทคโนโลยี
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <strong className="text-slate-800 block mb-1">3. ขอบเขตงาน (10 คะแนน)</strong>
                  ประเมินจากความครบถ้วนตามวัตถุประสงค์ เช่น จำนวนประตู เลนจราจร ไม้กั้นอัตโนมัติ กล้องภาพรวม และระบบนัดหมายผู้มาติดต่อ
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <strong className="text-slate-800 block mb-1">4. เทคนิคที่นำมาใช้ (10 คะแนน)</strong>
                  ประเมินจากความแม่นยำ AI สถาปัตยกรรม (Edge AI vs Central Server), ความละเอียดกล้อง, High Availability, SLA และความปลอดภัย PDPA
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <strong className="text-slate-800 block mb-1">5. ราคาและความคุ้มค่า (10 คะแนน)</strong>
                  ประเมินจากความคุ้มค่าของงบประมาณต่อฟังก์ชันที่ได้รับ (Total Cost of Ownership) และระยะเวลารับประกันรวม
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Similarities & Differences */}
        {activeTab === 'compare' && (
          <SimilaritiesAndDifferences
            tors={tors}
            selectedIds={selectedIds}
            aiComparisonResult={aiComparisonResult}
            isLoadingAi={isLoadingAi}
            onRefreshAiComparison={handleRefreshAiComparison}
          />
        )}

        {/* Tab 4: Official Memo */}
        {activeTab === 'memo' && (
          <ProcurementMemo
            tors={tors}
            selectedIds={selectedIds}
            aiComparisonResult={aiComparisonResult}
          />
        )}
      </main>

      {/* Upload / Google Drive Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        initialMode={uploadModalMode}
        onClose={() => setIsUploadModalOpen(false)}
        onAddTor={handleAddTor}
      />

      {/* NEW FEATURE: Proposal Intake Modal */}
      <ProposalIntakeModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        onSubmitProposal={handleAddProposal}
      />

      {/* NEW FEATURE: Formatted Official PDF Report Modal for Procurement Committee */}
      <OfficialPdfReportModal
        isOpen={isPdfReportModalOpen}
        onClose={() => setIsPdfReportModalOpen(false)}
        tors={tors}
        selectedIds={selectedIds}
        aiComparisonResult={aiComparisonResult}
      />

      {/* Inspect TOR Detail Drawer */}
      <TorDetailDrawer
        tor={inspectingTor}
        onClose={() => setInspectingTor(null)}
      />

      {/* Government Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 print:hidden">
        <p>
          ระบบสนับสนุนเจ้าหน้าที่พัสดุและคณะกรรมการตรวจรับพัสดุ | พระราชบัญญัติการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. ๒๕๖๐
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          ประมวลผลและให้ข้อเสนอแนะโดยโมเดล Gemini 3.8 Flash อิงตามหลักเกณฑ์ในเอกสารที่กำหนดเท่านั้น
        </p>
      </footer>
    </div>
  );
}
