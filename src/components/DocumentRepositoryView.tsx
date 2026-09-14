import React, { useState, useMemo } from 'react';
import { TORDocument } from '../types';
import {
  FolderArchive,
  HardDrive,
  FileText,
  FileCheck2,
  UploadCloud,
  ExternalLink,
  Search,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
  Plus,
  Shield,
  Clock,
  DollarSign,
  Tag,
  Building,
  User,
  Phone,
  Mail,
  Layers,
  ArrowUpDown,
  CheckSquare,
  Square,
  Sparkles,
  ChevronRight,
  FolderOpen,
  Users,
} from 'lucide-react';
import { CompanyExpertsModal } from './CompanyExpertsModal';

interface DocumentRepositoryViewProps {
  tors: TORDocument[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onInspectTor: (tor: TORDocument) => void;
  onOpenUploadModal: (initialMode?: 'upload' | 'drive' | 'text') => void;
  onOpenProposalModal: () => void;
}

type RepositoryCategory = 'all' | 'drive' | 'proposal' | 'preset' | 'upload';

export const DocumentRepositoryView: React.FC<DocumentRepositoryViewProps> = ({
  tors,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onInspectTor,
  onOpenUploadModal,
  onOpenProposalModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<RepositoryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'score' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedExpertDoc, setSelectedExpertDoc] = useState<TORDocument | null>(null);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);

  // Filter items by category & search query
  const filteredDocuments = useMemo(() => {
    return tors
      .filter((doc) => {
        // Category filter
        if (activeCategory === 'drive' && doc.sourceType !== 'drive') return false;
        if (activeCategory === 'proposal' && doc.sourceType !== 'proposal') return false;
        if (activeCategory === 'preset' && doc.sourceType !== 'preset') return false;
        if (activeCategory === 'upload' && doc.sourceType !== 'upload') return false;

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchCode = doc.code.toLowerCase().includes(q);
          const matchTitle = doc.title.toLowerCase().includes(q);
          const matchSubmitter = doc.submitter.toLowerCase().includes(q);
          const matchScope = doc.scope.toLowerCase().includes(q);
          const matchHardware = doc.hardware?.some((h) => h.toLowerCase().includes(q));
          const matchDrive = doc.driveFolder?.toLowerCase().includes(q) || doc.fileName?.toLowerCase().includes(q);
          const matchContact = doc.contactPerson?.toLowerCase().includes(q) || doc.taxId?.includes(q);
          const matchExpert = doc.experts?.some(
            (e) =>
              e.name.toLowerCase().includes(q) ||
              e.role.toLowerCase().includes(q) ||
              e.educationOrCert.toLowerCase().includes(q) ||
              (e.responsibility && e.responsibility.toLowerCase().includes(q))
          );
          return (
            matchCode ||
            matchTitle ||
            matchSubmitter ||
            matchScope ||
            matchHardware ||
            matchDrive ||
            matchContact ||
            matchExpert
          );
        }
        return true;
      })
      .sort((a, b) => {
        let valA: any = 0;
        let valB: any = 0;

        if (sortBy === 'price') {
          valA = a.rawBudgetNumber || 0;
          valB = b.rawBudgetNumber || 0;
        } else if (sortBy === 'score') {
          valA =
            (a.scores.timeline +
              a.scores.expertise +
              a.scores.scope +
              a.scores.technical +
              a.scores.price) /
            5;
          valB =
            (b.scores.timeline +
              b.scores.expertise +
              b.scores.scope +
              b.scores.technical +
              b.scores.price) /
            5;
        } else if (sortBy === 'title') {
          return sortOrder === 'asc'
            ? a.title.localeCompare(b.title, 'th')
            : b.title.localeCompare(a.title, 'th');
        } else {
          // date / id
          valA = a.id;
          valB = b.id;
        }

        if (sortOrder === 'asc') {
          return valA > valB ? 1 : -1;
        }
        return valA < valB ? 1 : -1;
      });
  }, [tors, activeCategory, searchQuery, sortBy, sortOrder]);

  // Document Counts
  const counts = useMemo(() => {
    return {
      all: tors.length,
      drive: tors.filter((t) => t.sourceType === 'drive').length,
      proposal: tors.filter((t) => t.sourceType === 'proposal').length,
      preset: tors.filter((t) => t.sourceType === 'preset').length,
      upload: tors.filter((t) => t.sourceType === 'upload').length,
    };
  }, [tors]);

  const handleSelectAllCurrent = () => {
    const currentIds = filteredDocuments.map((d) => d.id);
    const areAllSelected = currentIds.every((id) => selectedIds.includes(id));
    if (areAllSelected) {
      // Unselect only the currently visible ones
      onSelectAll(selectedIds.filter((id) => !currentIds.includes(id)));
    } else {
      // Select all visible ones
      onSelectAll(Array.from(new Set([...selectedIds, ...currentIds])));
    }
  };

  const getSourceBadge = (doc: TORDocument) => {
    switch (doc.sourceType) {
      case 'drive':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
            <HardDrive className="w-3.5 h-3.5 text-amber-600" />
            <span>Google ไดรฟ์</span>
          </span>
        );
      case 'proposal':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>ข้อเสนอโครงการ (ยื่นออนไลน์)</span>
          </span>
        );
      case 'upload':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
            <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
            <span>เอกสารนำเข้า (.docx/.pdf)</span>
          </span>
        );
      case 'preset':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>ร่าง TOR มาตรฐานพัสดุ</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner with Overview Statistics */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-50 text-blue-800 rounded-lg">
              <FolderArchive className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              คลังเอกสาร TOR และข้อมูลเสนอโครงการทั้งหมด
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            ศูนย์รวมร่างขอบเขตของงาน (TOR), เอกสารซิงก์จาก Google ไดรฟ์, และข้อเสนอโครงการจากผู้ยื่น พร้อมผลประเมินสเปก
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenUploadModal('drive')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold shadow-2xs transition-colors"
          >
            <HardDrive className="w-4 h-4 text-amber-600" />
            <span>เชื่อมโยงจาก Google ไดรฟ์</span>
          </button>

          <button
            onClick={onOpenProposalModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>รับข้อเสนอโครงการใหม่</span>
          </button>

          <button
            onClick={() => onOpenUploadModal('upload')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            <span>อัปโหลดไฟล์ TOR</span>
          </button>
        </div>
      </div>

      {/* 2. Google Drive Notice Banner (when in Drive tab or Drive docs present) */}
      {activeCategory === 'drive' && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                เอกสารที่เชื่อมโยงกับ Google Drive กองพัสดุและหน่วยงานราชการ
              </h4>
              <p className="text-xs text-amber-800/90 mt-0.5">
                ซิงก์ร่าง TOR และบันทึกข้อความราชการแบบ Real-time พร้อมเปิดอ่านไฟล์ฉบับเต็ม ตรวจสอบโฟลเดอร์ และประวัติการจัดทำ
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenUploadModal('drive')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shrink-0 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่มไฟล์จาก Google ไดรฟ์</span>
          </button>
        </div>
      )}

      {/* 3. Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        {/* Sub-tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>เอกสารทั้งหมด</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10.5px] ${
                activeCategory === 'all' ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('drive')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'drive'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-amber-500" />
            <span>เอกสารจาก Google ไดรฟ์</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10.5px] ${
                activeCategory === 'drive'
                  ? 'bg-amber-700 text-amber-100'
                  : 'bg-amber-50 text-amber-800'
              }`}
            >
              {counts.drive}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('proposal')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'proposal'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>ข้อเสนอโครงการ (ยื่นออนไลน์)</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10.5px] ${
                activeCategory === 'proposal'
                  ? 'bg-emerald-700 text-emerald-100'
                  : 'bg-emerald-50 text-emerald-800'
              }`}
            >
              {counts.proposal}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('preset')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === 'preset'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>ร่าง TOR มาตรฐานพัสดุ</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10.5px] ${
                activeCategory === 'preset'
                  ? 'bg-slate-700 text-slate-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {counts.preset}
            </span>
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 self-end sm:self-auto">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
              viewMode === 'cards'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            การ์ดรายละเอียด
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ตารางสรุป
          </button>
        </div>
      </div>

      {/* 4. Search and Sorting Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อเอกสาร, รหัส, บริษัท, โฟลเดอร์ Google Drive, เลขผู้เสียภาษี, หรือสเปกฮาร์ดแวร์..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ล้าง
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">จัดเรียง:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
            >
              <option value="date">วันนำเข้า/แก้ไข</option>
              <option value="price">งบประมาณ/ราคา</option>
              <option value="score">คะแนนเฉลี่ย AI</option>
              <option value="title">ชื่อเอกสาร (ก-ฮ)</option>
            </select>
            <button
              onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600"
              title="สลับลำดับ"
            >
              {sortOrder === 'asc' ? '▲ น้อยไปมาก' : '▼ มากไปน้อย'}
            </button>
          </div>

          <button
            onClick={handleSelectAllCurrent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
          >
            {filteredDocuments.every((d) => selectedIds.includes(d.id)) ? (
              <>
                <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>ยกเลิกเลือกทั้งหมด</span>
              </>
            ) : (
              <>
                <Square className="w-3.5 h-3.5 text-slate-400" />
                <span>เลือกทั้งหมด ({filteredDocuments.length})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5. Document List View */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <FolderArchive className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">ไม่พบเอกสารตามเงื่อนไขที่เลือก</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            ท่านสามารถลองเปลี่ยนคำค้นหา หรือกดนำเข้าเอกสารจาก Google ไดรฟ์ หรือรับข้อเสนอโครงการผ่านหน้าจอ
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => onOpenUploadModal('drive')}
              className="px-3.5 py-2 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold"
            >
              นำเข้าจาก Google ไดรฟ์
            </button>
            <button
              onClick={onOpenProposalModal}
              className="px-3.5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
            >
              รับข้อเสนอโครงการ
            </button>
          </div>
        </div>
      ) : viewMode === 'cards' ? (
        /* CARDS GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => {
            const isSelected = selectedIds.includes(doc.id);
            const avgScore = (
              (doc.scores.timeline +
                doc.scores.expertise +
                doc.scores.scope +
                doc.scores.technical +
                doc.scores.price) /
              5
            ).toFixed(1);

            return (
              <div
                key={doc.id}
                className={`bg-white rounded-xl border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm ${
                  isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200'
                }`}
              >
                {/* Card Top */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[11px] font-bold tracking-tight">
                        {doc.code}
                      </span>
                      {getSourceBadge(doc)}
                    </div>
                    <button
                      onClick={() => onToggleSelect(doc.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                      }`}
                      title={isSelected ? 'คลิกเพื่อนำออกจากการเปรียบเทียบ' : 'คลิกเพื่อเลือกเข้าเปรียบเทียบ'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Submitter */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                      <Building className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{doc.submitter}</span>
                    </div>
                  </div>

                  {/* Google Drive Details (if drive) */}
                  {doc.sourceType === 'drive' && (
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5 text-xs text-amber-900 space-y-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5 truncate">
                          <HardDrive className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">{doc.fileName || 'TOR_GoogleDrive_Doc'}</span>
                        </span>
                        {doc.fileSize && (
                          <span className="text-[10px] bg-amber-100 px-1.5 py-0.5 rounded text-amber-800">
                            {doc.fileSize}
                          </span>
                        )}
                      </div>
                      {doc.driveFolder && (
                        <p className="text-[11px] text-amber-800/80 truncate">
                          📁 {doc.driveFolder}
                        </p>
                      )}
                      {doc.driveUrl && (
                        <a
                          href={doc.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-bold hover:underline pt-0.5"
                        >
                          <span>เปิดใน Google Drive</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Vendor Proposal Details (if proposal) */}
                  {doc.sourceType === 'proposal' && (
                    <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5 text-xs text-emerald-900 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-emerald-950">เลขประจำตัวผู้เสียภาษี:</span>
                        <span className="font-mono text-[11px] bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-800">
                          {doc.taxId || 'ตรวจสอบแล้ว'}
                        </span>
                      </div>
                      {doc.contactPerson && (
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-800">
                          <User className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{doc.contactPerson}</span>
                        </div>
                      )}
                      {doc.contactPhone && (
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-800">
                          <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{doc.contactPhone}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Scope Summary */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {doc.scope}
                  </p>

                  {/* Hardware & Spec highlights */}
                  <div className="flex flex-wrap gap-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        doc.hasBarrierGate !== false
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {doc.hasBarrierGate !== false ? '✓ มีไม้กั้นอัตโนมัติ' : '✕ ไม่มีไม้กั้น'}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {doc.architectureType === 'edge_ai'
                        ? 'Edge AI กล้อง'
                        : doc.architectureType === 'hybrid'
                        ? 'Hybrid Controller'
                        : 'Central Server'}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      ประกัน {doc.warrantyYears || 2} ปี
                    </span>
                    {doc.experts && doc.experts.length > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExpertDoc(doc);
                          setIsExpertModalOpen(true);
                        }}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Users className="w-3 h-3 text-indigo-600" />
                        <span>ผู้เชี่ยวชาญ {doc.experts.length} ท่าน</span>
                      </button>
                    )}
                  </div>

                  {/* Financial & Time Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10.5px] text-slate-400 block">งบประมาณ/ราคา:</span>
                      <span className="font-bold text-slate-900">{doc.budget}</span>
                    </div>
                    <div>
                      <span className="text-[10.5px] text-slate-400 block">ระยะเวลา:</span>
                      <span className="font-bold text-slate-900">{doc.durationDays} วัน</span>
                    </div>
                  </div>

                  {/* Score pills */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-slate-500">คะแนนประเมิน AI:</span>
                      <span className="font-bold text-blue-700">{avgScore} / 10</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span>เทคนิค: <strong>{doc.scores.technical}</strong></span>
                      <span>•</span>
                      <span>ราคา: <strong>{doc.scores.price}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onInspectTor(doc)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>ดูสเปกเต็ม & เกณฑ์ตรวจรับ</span>
                  </button>

                  <button
                    onClick={() => onToggleSelect(doc.id)}
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? '✓ เลือกเปรียบเทียบแล้ว' : '+ เลือกเปรียบเทียบ'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-10">เลือก</th>
                  <th className="py-3 px-4">รหัส / แหล่งที่มา</th>
                  <th className="py-3 px-4 min-w-[240px]">ชื่อ TOR / ข้อเสนอโครงการ</th>
                  <th className="py-3 px-4">ผู้ยื่น / หน่วยงาน</th>
                  <th className="py-3 px-4 text-right">งบประมาณ</th>
                  <th className="py-3 px-4 text-center">ระยะเวลา</th>
                  <th className="py-3 px-4 text-center">ไม้กั้น</th>
                  <th className="py-3 px-4 text-center">คะแนน AI</th>
                  <th className="py-3 px-4 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocuments.map((doc) => {
                  const isSelected = selectedIds.includes(doc.id);
                  const avgScore = (
                    (doc.scores.timeline +
                      doc.scores.expertise +
                      doc.scores.scope +
                      doc.scores.technical +
                      doc.scores.price) /
                    5
                  ).toFixed(1);

                  return (
                    <tr
                      key={doc.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelect(doc.id)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className="font-bold text-slate-900 block">{doc.code}</span>
                          <div>{getSourceBadge(doc)}</div>
                          {doc.sourceType === 'drive' && doc.driveUrl && (
                            <a
                              href={doc.driveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10.5px] text-amber-700 hover:underline inline-flex items-center gap-1"
                            >
                              <span>Drive Link</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 line-clamp-2">{doc.title}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{doc.scope}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-medium">{doc.submitter}</div>
                        {doc.taxId && (
                          <div className="text-[10px] text-slate-500 font-mono">Tax: {doc.taxId}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 whitespace-nowrap">
                        {doc.budget}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap text-slate-700">
                        {doc.durationDays} วัน
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10.5px] font-semibold ${
                            doc.hasBarrierGate !== false
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {doc.hasBarrierGate !== false ? 'มี' : 'ไม่มี'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[11px]">
                          {avgScore}/10
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => onInspectTor(doc)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-700 font-semibold border border-slate-200 rounded text-xs shadow-2xs"
                        >
                          ดูสเปก
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal ทำเนียบรายชื่อผู้เชี่ยวชาญของบริษัท */}
      <CompanyExpertsModal
        isOpen={isExpertModalOpen}
        onClose={() => setIsExpertModalOpen(false)}
        tor={selectedExpertDoc}
        allTors={tors}
        onSelectTor={(doc) => setSelectedExpertDoc(doc)}
      />
    </div>
  );
};
