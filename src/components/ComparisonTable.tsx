import React, { useState } from 'react';
import { TORDocument } from '../types';
import {
  FileText,
  Building2,
  Clock,
  LayoutGrid,
  Cpu,
  Truck,
  Coins,
  Award,
  Sparkles,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  Users,
  GraduationCap,
  ExternalLink,
  Briefcase,
} from 'lucide-react';
import { CompanyExpertsModal } from './CompanyExpertsModal';

interface ComparisonTableProps {
  tors: TORDocument[];
  selectedIds: string[];
  onSelectTor: (tor: TORDocument) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  tors,
  selectedIds,
  onSelectTor,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertTor, setSelectedExpertTor] = useState<TORDocument | null>(null);
  const [isExpertsModalOpen, setIsExpertsModalOpen] = useState(false);
  const [inlineExpandedExperts, setInlineExpandedExperts] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    scope: true,
    tech: true,
    delivery: true,
    prosCons: true,
  });

  const activeTors = tors.filter((t) => selectedIds.includes(t.id));

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleInlineExperts = (torId: string) => {
    setInlineExpandedExperts((prev) => ({
      ...prev,
      [torId]: !prev[torId],
    }));
  };

  const calculateAvgScore = (t: TORDocument) => {
    const scores = Object.values(t.scores);
    if (!scores.length) return 0;
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    return (sum / scores.length).toFixed(1);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-100 text-blue-700 rounded-md">
              <LayoutGrid className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-slate-800">
              ตารางวิเคราะห์เปรียบเทียบ TOR เชิงลึก 8 มิติ
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            วิเคราะห์เปรียบเทียบเคียงข้าง ({activeTors.length} ฉบับที่เลือก) ตามหลักเกณฑ์และระเบียบพัสดุภาครัฐ
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {activeTors.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelectedExpertTor(activeTors[0]);
                setIsExpertsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-semibold transition-colors shadow-2xs whitespace-nowrap"
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>ทำเนียบรายชื่อผู้เชี่ยวชาญ ({activeTors.reduce((acc, t) => acc + (t.experts?.length || 0), 0)} ท่าน)</span>
            </button>
          )}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาข้อความหรือสเปก..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Main Responsive Comparison Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/80">
              <th className="p-3.5 text-xs font-bold text-slate-700 w-56 sticky left-0 bg-slate-100/95 z-10 backdrop-blur-sm">
                หัวข้อการประเมินตาม TOR
              </th>
              {activeTors.map((tor) => (
                <th
                  key={tor.id}
                  className="p-3.5 text-xs font-bold text-slate-800 min-w-[280px] max-w-[340px]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-600 text-white mb-1">
                        {tor.code}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug">
                        {tor.title}
                      </h4>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-200">
                    <span>คะแนนเฉลี่ย AI:</span>
                    <span className="font-bold text-blue-700 text-xs bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {calculateAvgScore(tor)} / 10
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {/* Section 1: ข้อมูลพื้นฐาน & ราคา & ระยะเวลา */}
            <tr className="bg-slate-50/50">
              <td
                colSpan={activeTors.length + 1}
                onClick={() => toggleSection('basic')}
                className="px-4 py-2 text-xs font-bold text-slate-700 cursor-pointer select-none flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-600" />
                  <span>1. ราคา, ระยะเวลา และผู้ยื่นข้อเสนอ</span>
                </div>
                {expandedSections.basic ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </td>
            </tr>

            {expandedSections.basic && (
              <>
                {/* 1. ชื่อ TOR */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-white z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>ชื่อ TOR</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs text-slate-800 leading-relaxed align-top">
                      <p className="font-medium text-slate-900">{tor.title}</p>
                      <span className="text-[11px] text-slate-500">รหัสเอกสาร: {tor.code}</span>
                    </td>
                  ))}
                </tr>

                {/* 2. บริษัทหรือผู้ยื่น TOR */}
                <tr className="hover:bg-slate-50/60 transition-colors bg-slate-50/30">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-slate-50/90 z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>บริษัทหรือผู้ยื่น TOR</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs text-slate-800 align-top">
                      <div className="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        {tor.submitter}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 3. ราคา / วงเงินงบประมาณ */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-white z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>ราคา (งบประมาณ)</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs align-top">
                      <div className="font-bold text-slate-900 text-sm">{tor.budget}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        คะแนนความคุ้มค่า: <strong className="text-amber-700">{tor.scores.price}/10</strong>
                      </div>
                      <div className="text-[11px] text-slate-500 italic mt-0.5">
                        {tor.scoreRationales?.price}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 4. ระยะเวลาดำเนินการ */}
                <tr className="hover:bg-slate-50/60 transition-colors bg-slate-50/30">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-slate-50/90 z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>ระยะเวลาดำเนินการ</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs align-top">
                      <div className="inline-flex items-center gap-1 text-blue-800 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        <Clock className="w-3 h-3" />
                        {tor.duration}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        คะแนนระยะเวลา: <strong className="text-blue-700">{tor.scores.timeline}/10</strong>
                      </div>
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Section 2: ขอบเขตงาน และความเชี่ยวชาญ */}
            <tr className="bg-slate-50/50">
              <td
                colSpan={activeTors.length + 1}
                onClick={() => toggleSection('scope')}
                className="px-4 py-2 text-xs font-bold text-slate-700 cursor-pointer select-none flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  <span>2. ขอบเขตการพัฒนาระบบ และความเชี่ยวชาญผู้ยื่น</span>
                </div>
                {expandedSections.scope ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </td>
            </tr>

            {expandedSections.scope && (
              <>
                {/* 5. ขอบเขตการพัฒนาระบบ */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-white z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />
                    <span>ขอบเขตการพัฒนาระบบ</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs text-slate-700 leading-relaxed align-top">
                      <p className="font-normal text-slate-800">{tor.scope}</p>
                      <div className="mt-1.5 text-[11px] text-indigo-700 font-medium">
                        คะแนนขอบเขตงาน: {tor.scores.scope}/10
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 6. ความเชี่ยวชาญของบริษัทหรือผู้พัฒนา พร้อมรายชื่อผู้เชี่ยวชาญ */}
                <tr className="hover:bg-slate-50/60 transition-colors bg-slate-50/30">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-slate-50/95 z-10 flex flex-col justify-start gap-1.5 border-r border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <Award className="w-4 h-4 text-indigo-600" />
                      <span>ความเชี่ยวชาญของบริษัท</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-blue-700 font-medium bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200/60 w-fit">
                      <Users className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>รายชื่อผู้เชี่ยวชาญ</span>
                    </div>
                  </td>
                  {activeTors.map((tor) => {
                    const experts = tor.experts || [];
                    const isInlineOpen = !!inlineExpandedExperts[tor.id];

                    return (
                      <td key={tor.id} className="p-3 text-xs text-slate-700 leading-relaxed align-top">
                        <p className="text-slate-800 font-normal">{tor.qualifications}</p>
                        <div className="mt-1.5 text-[11px] text-indigo-700 font-medium flex items-center justify-between">
                          <span>คะแนนความเชี่ยวชาญ: {tor.scores.expertise}/10</span>
                          {experts.length > 0 && (
                            <span className="text-slate-500 font-normal text-[10.5px]">
                              {experts.length} ผู้เชี่ยวชาญ
                            </span>
                          )}
                        </div>

                        {/* กล่องรายชื่อผู้เชี่ยวชาญของบริษัท */}
                        <div className="mt-2.5 pt-2.5 border-t border-slate-200/80">
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-blue-600" />
                              <span>รายชื่อผู้เชี่ยวชาญของบริษัท:</span>
                            </span>
                            {experts.length > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedExpertTor(tor);
                                  setIsExpertsModalOpen(true);
                                }}
                                className="text-[10.5px] font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-0.5"
                              >
                                <span>เปิดทำเนียบ ({experts.length})</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {experts.length > 0 ? (
                            <div className="space-y-1.5">
                              {(isInlineOpen ? experts : experts.slice(0, 2)).map((exp, expIdx) => (
                                <div
                                  key={exp.id || expIdx}
                                  className="p-2 rounded-lg bg-white border border-blue-100 shadow-2xs hover:border-blue-300 transition-colors"
                                >
                                  <div className="flex items-start justify-between gap-1">
                                    <strong className="text-slate-900 font-bold text-[11.5px] block truncate">
                                      {exp.name}
                                    </strong>
                                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200 shrink-0">
                                      {exp.experienceYears} ปี
                                    </span>
                                  </div>
                                  <div className="text-blue-800 text-[11px] font-medium truncate mt-0.5">
                                    {exp.role}
                                  </div>
                                  <div className="text-slate-500 text-[10.5px] truncate flex items-center gap-1 mt-0.5">
                                    <GraduationCap className="w-3 h-3 text-slate-400 shrink-0" />
                                    <span>{exp.educationOrCert}</span>
                                  </div>
                                  {isInlineOpen && exp.responsibility && (
                                    <div className="mt-1 pt-1 border-t border-slate-100 text-[10.5px] text-slate-600">
                                      <strong>บทบาท:</strong> {exp.responsibility}
                                    </div>
                                  )}
                                  {isInlineOpen && exp.keyProjects && exp.keyProjects.length > 0 && (
                                    <div className="mt-1 text-[10px] text-slate-500">
                                      <strong>ผลงานเด่น:</strong> {exp.keyProjects[0]}
                                    </div>
                                  )}
                                </div>
                              ))}

                              <div className="flex items-center justify-between pt-1 gap-2">
                                {experts.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => toggleInlineExperts(tor.id)}
                                    className="text-[10.5px] text-slate-600 hover:text-blue-700 font-semibold underline underline-offset-2"
                                  >
                                    {isInlineOpen ? '▲ ย่อรายชื่อ' : `▼ แสดงครบทั้ง ${experts.length} ท่าน`}
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedExpertTor(tor);
                                    setIsExpertsModalOpen(true);
                                  }}
                                  className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium shadow-2xs transition-colors"
                                >
                                  <Users className="w-3 h-3" />
                                  <span>ตรวจประวัติ / วุฒิ</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-400 italic">
                              ไม่มีข้อมูลระบุรายชื่อผู้เชี่ยวชาญเฉพาะเจาะจงในเอกสาร
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </>
            )}

            {/* Section 3: สเปก ฮาร์ดแวร์ และ ซอฟต์แวร์ */}
            <tr className="bg-slate-50/50">
              <td
                colSpan={activeTors.length + 1}
                onClick={() => toggleSection('tech')}
                className="px-4 py-2 text-xs font-bold text-slate-700 cursor-pointer select-none flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3. ซอฟต์แวร์ และฮาร์ดแวร์ที่นำมาใช้</span>
                </div>
                {expandedSections.tech ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </td>
            </tr>

            {expandedSections.tech && (
              <>
                {/* ฮาร์ดแวร์ */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-white z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                    <span>ฮาร์ดแวร์ที่นำมาใช้</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs text-slate-700 align-top">
                      <ul className="space-y-1">
                        {tor.hardware.map((hw, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-1.5 text-[11.5px]">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            <span>{hw}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* ซอฟต์แวร์ */}
                <tr className="hover:bg-slate-50/60 transition-colors bg-slate-50/30">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-slate-50/90 z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>ซอฟต์แวร์ & AI</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs text-slate-700 align-top">
                      <ul className="space-y-1">
                        {tor.software.map((sw, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5 text-[11.5px]">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{sw}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 text-[11px] text-emerald-700 font-medium">
                        คะแนนเทคนิค: {tor.scores.technical}/10
                      </div>
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Section 4: การส่งมอบงาน และการรับประกัน */}
            <tr className="bg-slate-50/50">
              <td
                colSpan={activeTors.length + 1}
                onClick={() => toggleSection('delivery')}
                className="px-4 py-2 text-xs font-bold text-slate-700 cursor-pointer select-none flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-purple-600" />
                  <span>4. การส่งมอบงาน, UAT และการรับประกัน (SLA)</span>
                </div>
                {expandedSections.delivery ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </td>
            </tr>

            {expandedSections.delivery && (
              <>
                {/* การส่งมอบและการตรวจรับ */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-white z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <Truck className="w-3.5 h-3.5 text-purple-500" />
                    <span>การส่งมอบงาน & UAT</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs text-slate-700 leading-relaxed align-top">
                      <p>{tor.deliveryAndAcceptance}</p>
                    </td>
                  ))}
                </tr>

                {/* การรับประกันและ SLA */}
                <tr className="hover:bg-slate-50/60 transition-colors bg-slate-50/30">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-slate-50/90 z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                    <span>การรับประกัน & SLA</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs text-slate-700 leading-relaxed align-top">
                      <p>{tor.warrantyAndSla}</p>
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Section 5: จุดเด่น vs จุดด้อย (ไฮไลท์ข้อความ) */}
            <tr className="bg-slate-50/50">
              <td
                colSpan={activeTors.length + 1}
                onClick={() => toggleSection('prosCons')}
                className="px-4 py-2 text-xs font-bold text-slate-700 cursor-pointer select-none flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>5. สรุปจุดเด่น และจุดด้อยระหว่าง TOR (ไฮไลท์สี)</span>
                </div>
                {expandedSections.prosCons ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </td>
            </tr>

            {expandedSections.prosCons && (
              <>
                {/* จุดเด่น */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-white z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-800 font-bold">จุดเด่นสำคัญ</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs align-top">
                      <div className="space-y-1.5">
                        {tor.strengths.map((str, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-1.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-[11px] leading-relaxed flex items-start gap-1"
                          >
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{str}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* จุดด้อย / ข้อพึงระวัง */}
                <tr className="hover:bg-slate-50/60 transition-colors bg-slate-50/30">
                  <td className="p-3 text-xs font-semibold text-slate-600 sticky left-0 bg-slate-50/90 z-10 flex items-center gap-1.5 border-r border-slate-100">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-amber-800 font-bold">จุดด้อย / ข้อพึงระวัง</span>
                  </td>
                  {activeTors.map((tor) => (
                    <td key={tor.id} className="p-3 text-xs align-top">
                      <div className="space-y-1.5">
                        {tor.weaknesses.map((w, wIdx) => (
                          <div
                            key={wIdx}
                            className="p-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-[11px] leading-relaxed flex items-start gap-1"
                          >
                            <span className="text-amber-600 font-bold">!</span>
                            <span>{w}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ไฮไลท์สีเขียว: จุดเด่น
          </span>
          <span className="flex items-center gap-1 text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> ไฮไลท์สีส้ม: จุดด้อย / ข้อพึงระวัง
          </span>
          <span className="flex items-center gap-1 text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> ไฮไลท์สีฟ้า: คุณลักษณะมาตรฐาน
          </span>
        </div>
        <div>
          <span>คำนวณและประเมินผลตามเอกสารที่ระบุเท่านั้น</span>
        </div>
      </div>

      {/* Modal ทำเนียบรายชื่อผู้เชี่ยวชาญของบริษัท */}
      <CompanyExpertsModal
        isOpen={isExpertsModalOpen}
        onClose={() => setIsExpertsModalOpen(false)}
        tor={selectedExpertTor}
        allTors={activeTors}
        onSelectTor={(tor) => setSelectedExpertTor(tor)}
      />
    </div>
  );
};
