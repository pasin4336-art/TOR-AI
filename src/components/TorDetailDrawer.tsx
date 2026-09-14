import React from 'react';
import { TORDocument } from '../types';
import {
  X,
  Building2,
  Coins,
  Clock,
  LayoutGrid,
  Cpu,
  Truck,
  CheckCircle2,
  Award,
  Sparkles,
  AlertTriangle,
  FileCode,
  HardDrive,
  ExternalLink,
  FileCheck2,
  User,
  Phone,
  Mail,
  Users,
  GraduationCap,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';

interface TorDetailDrawerProps {
  tor: TORDocument | null;
  onClose: () => void;
}

export const TorDetailDrawer: React.FC<TorDetailDrawerProps> = ({ tor, onClose }) => {
  if (!tor) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-blue-600 text-white mb-2">
              {tor.code}
            </span>
            <h3 className="font-bold text-slate-900 text-lg leading-snug">
              {tor.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{tor.submitter}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-800">
          {/* Overview Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-semibold text-amber-800 block">วงเงินงบประมาณ</span>
              <strong className="text-sm font-bold text-amber-950 mt-0.5 block">{tor.budget}</strong>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <span className="text-[11px] font-semibold text-blue-800 block">ระยะเวลาดำเนินการ</span>
              <strong className="text-sm font-bold text-blue-950 mt-0.5 block">{tor.duration}</strong>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-semibold text-emerald-800 block">คะแนนเทคนิค</span>
              <strong className="text-sm font-bold text-emerald-950 mt-0.5 block">{tor.scores.technical}/10</strong>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
              <span className="text-[11px] font-semibold text-purple-800 block">คะแนนความคุ้มค่า</span>
              <strong className="text-sm font-bold text-purple-950 mt-0.5 block">{tor.scores.price}/10</strong>
            </div>
          </div>

          {/* Google Drive Information Box */}
          {tor.sourceType === 'drive' && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-amber-600" />
                  <span>เอกสารเชื่อมโยงผ่าน Google Drive กองพัสดุ</span>
                </span>
                {tor.fileSize && (
                  <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                    ขนาด {tor.fileSize}
                  </span>
                )}
              </div>
              <div className="text-xs text-amber-950 space-y-1">
                {tor.fileName && (
                  <p>
                    <strong className="text-amber-900">ชื่อไฟล์:</strong> {tor.fileName}
                  </p>
                )}
                {tor.driveFolder && (
                  <p>
                    <strong className="text-amber-900">โฟลเดอร์:</strong> {tor.driveFolder}
                  </p>
                )}
                {tor.driveFileId && (
                  <p className="font-mono text-[11px] text-amber-800">
                    <strong>Drive File ID:</strong> {tor.driveFileId}
                  </p>
                )}
              </div>
              {tor.driveUrl && (
                <div className="pt-1">
                  <a
                    href={tor.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                  >
                    <span>เปิดดูเอกสารฉบับเต็มใน Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Vendor Proposal Information Box */}
          {tor.sourceType === 'proposal' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>ข้อมูลข้อเสนอโครงการ (ยื่นออนไลน์ผ่านหน้าจอ)</span>
                </span>
                {tor.taxId && (
                  <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Tax ID: {tor.taxId}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-950">
                {tor.contactPerson && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{tor.contactPerson}</span>
                  </div>
                )}
                {tor.contactPhone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{tor.contactPhone}</span>
                  </div>
                )}
                {tor.contactEmail && (
                  <div className="flex items-center gap-1.5 sm:col-span-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{tor.contactEmail}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Scores and Rationales */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              การประเมินคะแนน 5 มิติ (เกณฑ์ละ 10 คะแนน)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>1. ระยะเวลา:</span>
                  <span className="text-blue-700 font-bold">{tor.scores.timeline}/10</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{tor.scoreRationales?.timeline}</p>
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>2. ความเชี่ยวชาญทีมงาน:</span>
                  <span className="text-blue-700 font-bold">{tor.scores.expertise}/10</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{tor.scoreRationales?.expertise}</p>
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>3. ขอบเขตงาน:</span>
                  <span className="text-blue-700 font-bold">{tor.scores.scope}/10</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{tor.scoreRationales?.scope}</p>
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>4. เทคนิคที่นำมาใช้:</span>
                  <span className="text-blue-700 font-bold">{tor.scores.technical}/10</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{tor.scoreRationales?.technical}</p>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>5. ราคาและความคุ้มค่า:</span>
                  <span className="text-blue-700 font-bold">{tor.scores.price}/10</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{tor.scoreRationales?.price}</p>
              </div>
            </div>
          </div>

          {/* Scope */}
          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
              <LayoutGrid className="w-4 h-4 text-blue-600" />
              <span>ขอบเขตการพัฒนาระบบ (Scope of Work)</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
              {tor.scope}
            </p>
          </div>

          {/* Hardware List */}
          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>อุปกรณ์ฮาร์ดแวร์</span>
            </h4>
            <ul className="space-y-1.5 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              {tor.hardware.map((hw, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{hw}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Software List */}
          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>ซอฟต์แวร์ และคุณลักษณะ AI</span>
            </h4>
            <ul className="space-y-1.5 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              {tor.software.map((sw, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>{sw}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Expertise & Experts Roster */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>ความเชี่ยวชาญของบริษัท และรายชื่อผู้เชี่ยวชาญ</span>
              </h4>
              {tor.experts && tor.experts.length > 0 && (
                <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  {tor.experts.length} ท่าน
                </span>
              )}
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  คุณสมบัติและการรับรองของบริษัท:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  {tor.qualifications}
                </p>
              </div>

              {tor.experts && tor.experts.length > 0 ? (
                <div className="pt-2.5 border-t border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1 mb-2">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>บุคลากรหลักและผู้เชี่ยวชาญประจำโครงการ:</span>
                  </span>

                  <div className="space-y-2">
                    {tor.experts.map((exp, idx) => (
                      <div
                        key={exp.id || idx}
                        className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <strong className="text-xs font-bold text-slate-900">
                            {exp.name}
                          </strong>
                          <span className="text-[10.5px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 w-fit">
                            ประสบการณ์ {exp.experienceYears} ปี
                          </span>
                        </div>
                        <p className="text-[11.5px] text-blue-800 font-medium mt-0.5">
                          {exp.role}
                        </p>
                        <div className="mt-1 flex items-start gap-1.5 text-[11px] text-slate-600">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{exp.educationOrCert}</span>
                        </div>
                        {exp.responsibility && (
                          <div className="mt-1 text-[11px] text-slate-600 pl-5">
                            <span className="font-semibold text-slate-700">หน้าที่:</span> {exp.responsibility}
                          </div>
                        )}
                        {exp.licenseNumber && (
                          <div className="mt-1 text-[11px] text-emerald-700 pl-5 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{exp.licenseNumber}</span>
                          </div>
                        )}
                        {exp.keyProjects && exp.keyProjects.length > 0 && (
                          <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[10.5px] text-slate-500 pl-5">
                            <span className="font-semibold text-slate-700">ผลงานสำคัญ:</span>{' '}
                            {exp.keyProjects.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-400 italic">
                  ไม่มีข้อมูลระบุรายชื่อผู้เชี่ยวชาญเฉพาะเจาะจงในเอกสารฉบับนี้
                </div>
              )}
            </div>
          </div>

          {/* Acceptance & SLA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-2 text-xs">
                <Truck className="w-4 h-4 text-purple-600" />
                <span>การส่งมอบงาน & UAT</span>
              </h4>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                {tor.deliveryAndAcceptance}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>การรับประกัน & SLA</span>
              </h4>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                {tor.warrantyAndSla}
              </p>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>จุดเด่นสำคัญ</span>
              </span>
              <div className="space-y-1">
                {tor.strengths.map((str, idx) => (
                  <div key={idx} className="p-2 bg-emerald-50 text-emerald-900 rounded text-xs border border-emerald-200">
                    ✓ {str}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1 mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>จุดด้อย / ข้อพึงระวังสำหรับเจ้าหน้าที่พัสดุ</span>
              </span>
              <div className="space-y-1">
                {tor.weaknesses.map((weak, idx) => (
                  <div key={idx} className="p-2 bg-amber-50 text-amber-900 rounded text-xs border border-amber-200">
                    ! {weak}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
