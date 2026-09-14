import React, { useState } from 'react';
import { TORFilterOptions, TORDocument } from '../types';
import {
  Search,
  SlidersHorizontal,
  X,
  Check,
  ChevronDown,
  RotateCcw,
  Cpu,
  Coins,
  Clock,
  ShieldCheck,
  Building,
} from 'lucide-react';

interface TorFilterBarProps {
  filters: TORFilterOptions;
  onFilterChange: (newFilters: TORFilterOptions) => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

export const TorFilterBar: React.FC<TorFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
  filteredCount,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.budgetRange !== 'all' ||
    filters.duration !== 'all' ||
    filters.architecture !== 'all' ||
    filters.barrierGate !== 'all' ||
    filters.warranty !== 'all' ||
    filters.minScore > 0 ||
    filters.sourceType !== 'all';

  const updateFilter = <K extends keyof TORFilterOptions>(
    key: K,
    value: TORFilterOptions[K]
  ) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
      {/* Top Search & Primary Quick Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="ค้นหาชื่อ TOR, ผู้ยื่น, สเปกกล้อง, ไม้กั้น, หรือคำสำคัญ..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Filter: Budget Range */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>งบ:</span>
          </span>
          <button
            onClick={() => updateFilter('budgetRange', 'all')}
            className={`px-2.5 py-1 text-xs rounded-md transition-all shrink-0 font-medium ${
              filters.budgetRange === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => updateFilter('budgetRange', 'under1m')}
            className={`px-2.5 py-1 text-xs rounded-md transition-all shrink-0 font-medium ${
              filters.budgetRange === 'under1m'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            &lt; 1 ล้าน
          </button>
          <button
            onClick={() => updateFilter('budgetRange', '1mTo2m')}
            className={`px-2.5 py-1 text-xs rounded-md transition-all shrink-0 font-medium ${
              filters.budgetRange === '1mTo2m'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1 - 2 ล้าน
          </button>
          <button
            onClick={() => updateFilter('budgetRange', 'above2m')}
            className={`px-2.5 py-1 text-xs rounded-md transition-all shrink-0 font-medium ${
              filters.budgetRange === 'above2m'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            &gt; 2 ล้าน
          </button>
        </div>

        {/* Toggle Advanced Filters Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isAdvancedOpen || hasActiveFilters
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>ตัวกรองละเอียด</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Advanced Filter Drawer / Panel */}
      {isAdvancedOpen && (
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 animate-in fade-in duration-150">
          {/* 1. Architecture */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              สถาปัตยกรรมระบบ:
            </label>
            <select
              value={filters.architecture}
              onChange={(e) => updateFilter('architecture', e.target.value as any)}
              className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">ทุกสถาปัตยกรรม</option>
              <option value="edge_ai">Edge AI (ในกล้อง)</option>
              <option value="hybrid">Hybrid (Controller)</option>
              <option value="central_server">Central Server รวมศูนย์</option>
            </select>
          </div>

          {/* 2. Barrier Gate */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              ระบบไม้กั้นอัตโนมัติ:
            </label>
            <select
              value={filters.barrierGate}
              onChange={(e) => updateFilter('barrierGate', e.target.value as any)}
              className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">ทั้งหมด</option>
              <option value="with_barrier">มีไม้กั้นอัตโนมัติ</option>
              <option value="without_barrier">บันทึกอย่างเดียว (ไม่มีไม้กั้น)</option>
            </select>
          </div>

          {/* 3. Duration */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              ระยะเวลาส่งมอบ:
            </label>
            <select
              value={filters.duration}
              onChange={(e) => updateFilter('duration', e.target.value as any)}
              className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">ทุกระยะเวลา</option>
              <option value="60">60 วัน (งานเร่งด่วน)</option>
              <option value="90">90 วัน (มาตรฐาน)</option>
              <option value="120">120 วัน (โครงการใหญ่)</option>
            </select>
          </div>

          {/* 4. Warranty */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              การรับประกัน (ปี):
            </label>
            <select
              value={filters.warranty}
              onChange={(e) => updateFilter('warranty', e.target.value as any)}
              className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">ทั้งหมด</option>
              <option value="2">2 ปีขั้นต่ำ</option>
              <option value="3">3 ปี (มี SLA)</option>
              <option value="5">5 ปีเต็ม (TCO ต่ำสุด)</option>
            </select>
          </div>

          {/* 5. Min Technical Score */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              คะแนนเทคนิคขั้นต่ำ (0-10):
            </label>
            <select
              value={filters.minScore.toString()}
              onChange={(e) => updateFilter('minScore', parseFloat(e.target.value))}
              className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="0">ไม่กำหนดขั้นต่ำ</option>
              <option value="7">≥ 7.0 คะแนน</option>
              <option value="8.5">≥ 8.5 คะแนน (ระดับดีมาก)</option>
              <option value="9.5">≥ 9.5 คะแนน (ระดับสูงเลิศ)</option>
            </select>
          </div>

          {/* 6. Source Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              ที่มาของเอกสาร:
            </label>
            <select
              value={filters.sourceType}
              onChange={(e) => updateFilter('sourceType', e.target.value as any)}
              className="w-full text-xs p-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">ทุกแหล่งที่มา</option>
              <option value="preset">ร่าง TOR ในระบบ (Preset)</option>
              <option value="proposal">ข้อเสนอที่ยื่นผ่านหน้าจอ</option>
              <option value="upload">ไฟล์อัปโหลด (.docx/.pdf)</option>
              <option value="drive">อ้างอิงจาก Google Drive</option>
            </select>
          </div>
        </div>
      )}

      {/* Filter Stats & Reset Indicator */}
      <div className="flex items-center justify-between text-xs pt-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-600">
            แสดง <strong>{filteredCount}</strong> จากทั้งหมด <strong>{totalCount}</strong> ฉบับ
          </span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold">
              เปิดใช้งานตัวกรอง
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-red-600 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>ล้างตัวกรองทั้งหมด</span>
          </button>
        )}
      </div>
    </div>
  );
};
