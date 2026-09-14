import React, { useState } from 'react';
import { TORDocument, ComparisonAnalysisResult } from '../types';
import {
  CheckCircle2,
  Split,
  Sparkles,
  AlertOctagon,
  ShieldCheck,
  Scale,
  RefreshCw,
  Info,
} from 'lucide-react';

interface SimilaritiesAndDifferencesProps {
  tors: TORDocument[];
  selectedIds: string[];
  aiComparisonResult: ComparisonAnalysisResult | null;
  isLoadingAi: boolean;
  onRefreshAiComparison: () => void;
}

export const SimilaritiesAndDifferences: React.FC<SimilaritiesAndDifferencesProps> = ({
  tors,
  selectedIds,
  aiComparisonResult,
  isLoadingAi,
  onRefreshAiComparison,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'similarities' | 'differences' | 'matrix'>('all');

  const activeTors = tors.filter((t) => selectedIds.includes(t.id));

  // Default baseline similarities derived directly from the official documents
  const baselineSimilarities = [
    {
      title: 'การตรวจจับและอ่านป้ายทะเบียนรถยนต์ไทย (LPR Core)',
      description:
        'ทุก TOR กำหนดให้รองรับการอ่านป้ายทะเบียนภาษาไทย หมวดอักษร ตัวเลข และหมวดจังหวัด พร้อมบันทึกภาพถ่ายตัวรถ วัน เวลา และทิศทางการเข้า-ออก',
      reference: 'หมวดขอบเขตงานและคุณลักษณะซอฟต์แวร์',
    },
    {
      title: 'การบริหารจัดการบัญชีทะเบียน (Whitelist & Watchlist/Blacklist)',
      description:
        'ทุกฉบับกำหนดให้มีระบบจัดการทะเบียนอนุญาต (Whitelist) และทะเบียนเฝ้าระวัง (Watchlist) พร้อมการแจ้งเตือนบนหน้าจอเมื่อตรวจพบรถในบัญชีเฝ้าระวัง',
      reference: 'หมวดความสามารถของซอฟต์แวร์',
    },
    {
      title: 'ระบบรักษาความปลอดภัยเบื้องต้นและบันทึกประวัติ (Audit Log)',
      description:
        'ทุก TOR บังคับให้มี Audit Trail บันทึกการเข้าสู่ระบบ การแก้ไขสิทธิ และการส่งออกข้อมูล เพื่อความโปร่งใสและตรวจสอบย้อนหลังได้',
      reference: 'หมวด Cybersecurity & Governance',
    },
    {
      title: 'การเชื่อมต่อระบบเครือข่ายและการเข้าถึงผ่าน Web Management',
      description:
        'รองรับการบริหารจัดการและค้นหาข้อมูลผ่านเว็บเบราว์เซอร์ (Web Application) และการส่งออกรายงานในรูปแบบ CSV หรือ Excel',
      reference: 'หมวดระบบบริหารจัดการ',
    },
    {
      title: 'ระยะเวลารับประกันขั้นต่ำไม่น้อยกว่า 2 ปี',
      description:
        'ทุก TOR กำหนดให้มีระยะเวลารับประกันความชำรุดบกพร่องของอุปกรณ์และระบบงานไม่น้อยกว่า 2 ปี พร้อมบริการบำรุงรักษาเชิงป้องกัน (PM) เป็นระยะ',
      reference: 'หมวดเงื่อนไขการรับประกันและ SLA',
    },
  ];

  // Baseline structural differences across the analyzed TORs
  const baselineDifferences = [
    {
      aspect: 'สถาปัตยกรรมการประมวลผล (Architecture)',
      details: [
        {
          tor: 'MOCK-01 (แบบพื้นฐาน)',
          text: 'ประมวลผลที่เซิร์ฟเวอร์กลาง (Central Server) ขาดความสามารถในการทำงานอิสระหากเครือข่ายล่ม',
          badge: 'Centralized',
          badgeColor: 'bg-slate-100 text-slate-700',
        },
        {
          tor: 'MOCK-02 (แบบบูรณาการ)',
          text: 'ผสมผสานระหว่าง Edge/AI Controller ประจำจุดเข้า-ออก และ App/DB Server ส่วนกลาง',
          badge: 'Hybrid Edge Controller',
          badgeColor: 'bg-blue-100 text-blue-700',
        },
        {
          tor: 'MOCK-03 (แบบความมั่นคงสูง)',
          text: 'สถาปัตยกรรม Multi-Gate พร้อม Central Management Cluster, DB Replication, Edge Cache Store-and-Forward ทำงานได้แม้ออฟไลน์',
          badge: 'High Availability Cluster',
          badgeColor: 'bg-purple-100 text-purple-700',
        },
        {
          tor: 'ฉบับคู่เทียบ (Edge AI)',
          text: 'ประมวลผล Deep Learning ฝังในตัวกล้องตรง (Built-in Edge Analytics) มี SD Card 256GB และ Relay สั่งเปิดไม้กั้นโดยไม่ต้องพึ่ง Server',
          badge: 'Server-less Edge AI',
          badgeColor: 'bg-emerald-100 text-emerald-700',
        },
      ],
    },
    {
      aspect: 'การควบคุมไม้กั้นอัตโนมัติ (Barrier Gate)',
      details: [
        {
          tor: 'MOCK-01',
          text: 'ไม่มีการสั่งการไม้กั้น เป็นเพียงระบบบันทึกภาพและแจ้งเตือน รปภ. เท่านั้น',
          badge: 'บันทึกอย่างเดียว',
          badgeColor: 'bg-amber-100 text-amber-800',
        },
        {
          tor: 'MOCK-02',
          text: 'รวมไม้กั้นอัตโนมัติ 2 ชุด พร้อม Safety Sensor และ Human Override ทันที',
          badge: 'ไม้กั้นครบวงจร',
          badgeColor: 'bg-emerald-100 text-emerald-800',
        },
        {
          tor: 'MOCK-03',
          text: 'ควบคุมไม้กั้น 4 ประตู (8 ช่องทาง) รองรับอัตราการไหล Throughput 15 คัน/นาที/ช่อง',
          badge: 'Multi-Gate Enterprise',
          badgeColor: 'bg-purple-100 text-purple-800',
        },
        {
          tor: 'ฉบับคู่เทียบ',
          text: 'กล้องต่อสายสัญญาณ Relay Output ตรงเข้าบอร์ดไม้กั้นเดิมได้ทันที',
          badge: 'Direct Relay Out',
          badgeColor: 'bg-blue-100 text-blue-800',
        },
      ],
    },
    {
      aspect: 'ความละเอียดกล้องและมุมมอง (Camera Specs)',
      details: [
        {
          tor: 'MOCK-01',
          text: 'กล้อง LPR 2 ชุด ความละเอียด >= 2 MP (ไม่มีกล้อง Overview)',
          badge: '2 MP',
          badgeColor: 'bg-slate-100 text-slate-700',
        },
        {
          tor: 'MOCK-02',
          text: 'กล้อง LPR 4 ชุด + กล้อง Overview 4 ชุด (รวม 8 ชุด เพื่อยืนยันภาพรวมรถและคนขับ)',
          badge: 'LPR + Overview',
          badgeColor: 'bg-blue-100 text-blue-700',
        },
        {
          tor: 'MOCK-03',
          text: 'กล้อง LPR 8 ชุด + กล้อง Overview 8 ชุด รวม 16 ชุด รองรับ 8 ช่องทาง',
          badge: '16 Cameras',
          badgeColor: 'bg-purple-100 text-purple-700',
        },
        {
          tor: 'ฉบับคู่เทียบ',
          text: 'กล้อง Edge AI ความละเอียดสูงพิเศษ >= 5 MP (2592x1944) พร้อม Starlight Low Light',
          badge: '5 MP Starlight',
          badgeColor: 'bg-emerald-100 text-emerald-700',
        },
      ],
    },
    {
      aspect: 'ระยะเวลาและการรับประกัน (Duration & Warranty)',
      details: [
        {
          tor: 'MOCK-01',
          text: 'ส่งมอบ 60 วัน | รับประกัน 2 ปี | PM ทุก 6 เดือน | งบ 650,000 บาท',
          badge: '60 วัน / 2 ปี',
          badgeColor: 'bg-amber-100 text-amber-800',
        },
        {
          tor: 'MOCK-02',
          text: 'ส่งมอบ 90 วัน | รับประกัน 3 ปี | SLA 30 นาที/มี Spare Parts | งบ 1,850,000 บาท',
          badge: '90 วัน / 3 ปี',
          badgeColor: 'bg-blue-100 text-blue-800',
        },
        {
          tor: 'MOCK-03',
          text: 'ส่งมอบ 120 วัน | รับประกัน 3 ปี | SLA P1-P4 (15 นาที) | งบ 4,950,000 บาท',
          badge: '120 วัน / 3 ปี SLA',
          badgeColor: 'bg-purple-100 text-purple-800',
        },
        {
          tor: 'ฉบับคู่เทียบ',
          text: 'ส่งมอบ 120 วัน | รับประกันยาวนาน 5 ปี (60 เดือน) อะไหล่ฟรี | งบประมาณ 1,450,000 บาท',
          badge: '120 วัน / 5 ปีเต็ม',
          badgeColor: 'bg-emerald-100 text-emerald-800',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-md">
              <Scale className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              วิเคราะห์ความเหมือน ความต่าง และไฮไลท์จุดเด่น-จุดด้อย
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            จำแนกข้อกำหนดทางเทคนิคและเงื่อนไขสัญญาอย่างเป็นทางการ เพื่อการตัดสินใจของคณะกรรมการ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefreshAiComparison}
            disabled={isLoadingAi}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAi ? 'animate-spin' : ''}`} />
            <span>{isLoadingAi ? 'กำลังวิเคราะห์ด้วย Gemini...' : 'ประเมินเปรียบเทียบด้วย AI'}</span>
          </button>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ภาพรวมทั้งหมด
        </button>
        <button
          onClick={() => setActiveSubTab('similarities')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'similarities'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ความเหมือน (5 รายการมาตรฐาน)
        </button>
        <button
          onClick={() => setActiveSubTab('differences')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'differences'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ความต่างสำคัญ (4 ด้านหลัก)
        </button>
        <button
          onClick={() => setActiveSubTab('matrix')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeSubTab === 'matrix'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ตารางจุดเด่น-จุดด้อย (ไฮไลท์)
        </button>
      </div>

      {/* AI Overview if available */}
      {aiComparisonResult && (
        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm mb-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>บทวิเคราะห์ภาพรวมโดย Gemini AI (อย่างเป็นทางการ)</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {aiComparisonResult.overview}
          </p>
        </div>
      )}

      {/* 1. Similarities Section */}
      {(activeSubTab === 'all' || activeSubTab === 'similarities') && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-bold text-slate-800 text-base">
                ความเหมือนเชิงมาตรฐานระหว่าง TOR (Baseline Commonality)
              </h4>
              <p className="text-xs text-slate-500">
                คุณสมบัติและเกณฑ์ขั้นต่ำที่ทุก TOR กำหนดไว้ตรงกันในสาระสำคัญ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {baselineSimilarities.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-blue-100 bg-blue-50/30 hover:bg-blue-50/60 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {item.title}
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                    <span className="inline-block mt-2 text-[10.5px] font-medium text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded">
                      อ้างอิง: {item.reference}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Differences Section */}
      {(activeSubTab === 'all' || activeSubTab === 'differences') && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
            <Split className="w-5 h-5 text-purple-600" />
            <div>
              <h4 className="font-bold text-slate-800 text-base">
                ความต่างที่มีนัยสำคัญต่อการจัดซื้อจัดจ้าง (Key Architectural Divergences)
              </h4>
              <p className="text-xs text-slate-500">
                จุดแตกต่างทางสถาปัตยกรรม เทคโนโลยี อุปกรณ์ และเงื่อนไขสัญญา
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {baselineDifferences.map((diff, dIdx) => (
              <div
                key={dIdx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all"
              >
                <h5 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span>{diff.aspect}</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {diff.details.map((dItem, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="text-xs font-bold text-slate-800 truncate">
                            {dItem.tor}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${dItem.badgeColor}`}
                          >
                            {dItem.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{dItem.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Strengths and Weaknesses Matrix (Highlighted) */}
      {(activeSubTab === 'all' || activeSubTab === 'matrix') && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <div>
              <h4 className="font-bold text-slate-800 text-base">
                ตารางเปรียบเทียบจุดเด่น - จุดด้อย ระหว่าง TOR (ไฮไลท์ข้อความ)
              </h4>
              <p className="text-xs text-slate-500">
                สรุปข้อได้เปรียบเชิงสมรรถนะ และข้อพึงระวังตามระเบียบพัสดุสำหรับแต่ละฉบับ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeTors.map((tor) => (
              <div
                key={tor.id}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 flex flex-col justify-between"
              >
                <div>
                  <div className="border-b border-slate-200 pb-2 mb-3">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded inline-block">
                      {tor.code}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                      {tor.title}
                    </h5>
                    <div className="text-xs text-slate-500 mt-0.5">
                      งบ: <strong>{tor.budget}</strong> | เวลา: {tor.duration}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="mb-3">
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>จุดเด่น (Strengths)</span>
                    </div>
                    <div className="space-y-1.5">
                      {tor.strengths.map((str, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-2 rounded bg-emerald-50/90 border border-emerald-200/80 text-[11px] text-emerald-900 leading-relaxed font-normal flex items-start gap-1.5"
                        >
                          <span className="text-emerald-600 font-bold shrink-0">✓</span>
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-800 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>จุดด้อย / ข้อพึงระวัง (Weaknesses)</span>
                    </div>
                    <div className="space-y-1.5">
                      {tor.weaknesses.map((weak, wIdx) => (
                        <div
                          key={wIdx}
                          className="p-2 rounded bg-amber-50/90 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed font-normal flex items-start gap-1.5"
                        >
                          <span className="text-amber-600 font-bold shrink-0">!</span>
                          <span>{weak}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500">
                    คะแนนประเมิน AI: <strong className="text-blue-700">{tor.scores.technical}/10 ด้านเทคนิค</strong> | <strong className="text-emerald-700">{tor.scores.price}/10 ราคา</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
