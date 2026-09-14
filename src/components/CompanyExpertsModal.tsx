import React, { useState } from 'react';
import { TORDocument, CompanyExpert } from '../types';
import {
  X,
  Users,
  Award,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Search,
  Printer,
  ExternalLink,
  Phone,
  Mail,
  FileBadge,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface CompanyExpertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tor: TORDocument | null;
  allTors?: TORDocument[];
  onSelectTor?: (tor: TORDocument) => void;
}

export const CompanyExpertsModal: React.FC<CompanyExpertsModalProps> = ({
  isOpen,
  onClose,
  tor,
  allTors,
  onSelectTor,
}) => {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTorId, setActiveTorId] = useState<string>(tor?.id || '');

  if (!isOpen || !tor) return null;

  const currentTor = allTors?.find((t) => t.id === activeTorId) || tor;
  const experts = currentTor.experts || [];

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.educationOrCert.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.responsibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (expert.keyProjects &&
        expert.keyProjects.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (selectedRoleFilter === 'all') return true;
    if (selectedRoleFilter === 'pm' && expert.role.toLowerCase().includes('จัดการ') || expert.educationOrCert.includes('PMP')) return true;
    if (selectedRoleFilter === 'ai' && (expert.role.toLowerCase().includes('ai') || expert.role.toLowerCase().includes('vision') || expert.role.toLowerCase().includes('ปัญญา'))) return true;
    if (selectedRoleFilter === 'engineer' && (expert.role.toLowerCase().includes('วิศวกร') || expert.role.toLowerCase().includes('ฮาร์ดแวร์') || expert.role.toLowerCase().includes('เครือข่าย'))) return true;
    if (selectedRoleFilter === 'security' && (expert.role.toLowerCase().includes('ความมั่นคง') || expert.role.toLowerCase().includes('cyber') || expert.educationOrCert.includes('CISSP'))) return true;

    return true;
  });

  const avgExperience =
    experts.length > 0
      ? (experts.reduce((sum, e) => sum + e.experienceYears, 0) / experts.length).toFixed(1)
      : '0';

  const getRoleBadgeColor = (role: string) => {
    const lower = role.toLowerCase();
    if (lower.includes('จัดการ') || lower.includes('ผู้อำนวยการ') || lower.includes('director') || lower.includes('pm')) {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    }
    if (lower.includes('ai') || lower.includes('vision') || lower.includes('ปัญญาประดิษฐ์')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    if (lower.includes('มั่นคง') || lower.includes('cyber') || lower.includes('pdpa')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (lower.includes('ฮาร์ดแวร์') || lower.includes('ไม้กั้น') || lower.includes('ไฟฟ้า') || lower.includes('เครื่องกล')) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-start justify-between relative">
          <div className="space-y-1.5 pr-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                {currentTor.code}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>คะแนนความเชี่ยวชาญ: {currentTor.scores.expertise}/10</span>
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-blue-400 shrink-0" />
              <span>ทำเนียบรายชื่อผู้เชี่ยวชาญและวิศวกรประจำโครงการ</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{currentTor.submitter}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Company Switcher Tabs (if allTors provided) */}
        {allTors && allTors.length > 1 && (
          <div className="bg-slate-100/90 border-b border-slate-200 px-5 py-2 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-slate-500 font-semibold shrink-0">สลับดูบริษัท:</span>
            {allTors.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTorId(t.id);
                  if (onSelectTor) onSelectTor(t);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  t.id === (currentTor.id)
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{t.code}</span>
                <span className="text-[10px] opacity-80">({(t.experts || []).length} ท่าน)</span>
              </button>
            ))}
          </div>
        )}

        {/* Overview Stats Bar */}
        <div className="bg-slate-50 px-5 sm:px-6 py-3.5 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">จำนวนผู้เชี่ยวชาญในทีม</span>
            <strong className="text-sm font-bold text-slate-900 mt-0.5 block flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{experts.length} ท่าน</span>
            </strong>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">ประสบการณ์เฉลี่ย</span>
            <strong className="text-sm font-bold text-slate-900 mt-0.5 block flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>{avgExperience} ปี</span>
            </strong>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">ใบรับรองวิชาชีพหลัก</span>
            <strong className="text-sm font-bold text-slate-900 mt-0.5 block truncate flex items-center gap-1">
              <FileBadge className="w-4 h-4 text-emerald-600" />
              <span>PMP / กว. / CISSP</span>
            </strong>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[11px]">การตรวจสอบคุณสมบัติ</span>
            <strong className="text-sm font-bold text-emerald-700 mt-0.5 block flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ผ่านเกณฑ์ TOR พัสดุ</span>
            </strong>
          </div>
        </div>

        {/* Filters & Search Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>ตำแหน่ง:</span>
            </span>
            <button
              onClick={() => setSelectedRoleFilter('all')}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors font-medium shrink-0 ${
                selectedRoleFilter === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ทั้งหมด ({experts.length})
            </button>
            <button
              onClick={() => setSelectedRoleFilter('pm')}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors font-medium shrink-0 ${
                selectedRoleFilter === 'pm'
                  ? 'bg-purple-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ผู้จัดการโครงการ / PM
            </button>
            <button
              onClick={() => setSelectedRoleFilter('ai')}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors font-medium shrink-0 ${
                selectedRoleFilter === 'ai'
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              AI & Vision Specialist
            </button>
            <button
              onClick={() => setSelectedRoleFilter('engineer')}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors font-medium shrink-0 ${
                selectedRoleFilter === 'engineer'
                  ? 'bg-amber-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              วิศวกรระบบ & ฮาร์ดแวร์
            </button>
            <button
              onClick={() => setSelectedRoleFilter('security')}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors font-medium shrink-0 ${
                selectedRoleFilter === 'security'
                  ? 'bg-red-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ความมั่นคงปลอดภัย
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อ, ใบรับรอง, ผลงาน..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Content: Expert Roster Cards */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
          {filteredExperts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-6">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">
                ไม่พบรายชื่อผู้เชี่ยวชาญตามเงื่อนไขค้นหา
              </p>
              <p className="text-xs text-slate-500 mt-1">
                ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองตำแหน่งงาน
              </p>
              <button
                onClick={() => {
                  setSelectedRoleFilter('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
              >
                ล้างคำค้นหาทั้งหมด
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExperts.map((expert, idx) => (
                <div
                  key={expert.id || idx}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Top line: Name & Role Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {expert.name}
                          </h4>
                          {expert.licenseNumber && (
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-mono">
                              {expert.licenseNumber}
                            </span>
                          )}
                        </div>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-medium border ${getRoleBadgeColor(
                            expert.role
                          )}`}
                        >
                          {expert.role}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-slate-500 block">ประสบการณ์</span>
                        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                          {expert.experienceYears} ปี
                        </span>
                      </div>
                    </div>

                    {/* Education and Certification */}
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                      <div className="flex items-start gap-1.5 text-slate-700">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{expert.educationOrCert}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-slate-600 text-[11.5px] pt-1 border-t border-slate-200/60">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span><strong>หน้าที่ในโครงการ:</strong> {expert.responsibility}</span>
                      </div>
                    </div>

                    {/* Reference Projects */}
                    {expert.keyProjects && expert.keyProjects.length > 0 && (
                      <div>
                        <span className="text-[11px] font-semibold text-slate-600 block mb-1 flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-600" />
                          <span>ผลงานอ้างอิงและโครงการที่ผ่านมา:</span>
                        </span>
                        <ul className="space-y-1">
                          {expert.keyProjects.map((project, pIdx) => (
                            <li
                              key={pIdx}
                              className="text-[11.5px] text-slate-600 flex items-start gap-1.5 bg-amber-50/50 px-2 py-1 rounded border border-amber-100/80"
                            >
                              <span className="text-amber-600 mt-0.5 text-xs">•</span>
                              <span>{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer metadata if available */}
                  {(expert.phone || expert.email) && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      {expert.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{expert.phone}</span>
                        </span>
                      )}
                      {expert.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{expert.email}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Official Verification Notice for Committee */}
          <div className="bg-blue-50/80 rounded-xl border border-blue-200 p-4 text-xs text-blue-900 space-y-1">
            <h5 className="font-bold flex items-center gap-1.5 text-blue-950">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>บันทึกการตรวจสอบสำหรับคณะกรรมการตรวจรับพัสดุ</span>
            </h5>
            <p className="text-blue-800 leading-relaxed">
              ตามระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560
              คู่สัญญาต้องจัดส่งบุคลากรที่มีคุณสมบัติ ตรงตามรายชื่อและใบอนุญาตประกอบวิชาชีพที่เสนอไว้
              หากมีการเปลี่ยนแปลงตัวบุคคล ต้องได้รับความเห็นชอบเป็นลายลักษณ์อักษรจากคณะกรรมการตรวจรับพัสดุล่วงหน้า
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            <span>แสดง <strong>{filteredExperts.length}</strong> จากทั้งหมด <strong>{experts.length}</strong> ท่าน</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>พิมพ์ทำเนียบผู้เชี่ยวชาญ</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
