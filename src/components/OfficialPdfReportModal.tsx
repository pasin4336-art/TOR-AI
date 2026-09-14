import React, { useState } from 'react';
import { TORDocument, ComparisonAnalysisResult } from '../types';
import {
  Printer,
  Download,
  X,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Building,
  Scale,
  Award,
  AlertTriangle,
  Layers,
  Sparkles,
} from 'lucide-react';

interface OfficialPdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tors: TORDocument[];
  selectedIds: string[];
  aiComparisonResult: ComparisonAnalysisResult | null;
}

export const OfficialPdfReportModal: React.FC<OfficialPdfReportModalProps> = ({
  isOpen,
  onClose,
  tors,
  selectedIds,
  aiComparisonResult,
}) => {
  const [committeeChair, setCommitteeChair] = useState('ประธานคณะกรรมการตรวจรับพัสดุ');
  const [procurementOfficer, setProcurementOfficer] = useState('เจ้าหน้าที่พัสดุชำนาญงาน');
  const [reportDocNo, setReportDocNo] = useState('พสด. ๐๒/ว ๑๘๔ / ๒๕๖๙');

  if (!isOpen) return null;

  const activeTors = tors.filter((t) => selectedIds.includes(t.id));

  const handleTriggerPrint = () => {
    window.print();
  };

  const todayThai = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate average scores and rank
  const rankedTors = [...activeTors].map((tor) => {
    const avgScore =
      (tor.scores.timeline +
        tor.scores.expertise +
        tor.scores.scope +
        tor.scores.technical +
        tor.scores.price) /
      5;
    return {
      ...tor,
      avgScore,
    };
  }).sort((a, b) => b.avgScore - a.avgScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-slate-100 rounded-2xl border border-slate-300 shadow-2xl w-full max-w-5xl h-[95vh] flex flex-col overflow-hidden">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                รายงานผลการวิเคราะห์เปรียบเทียบ TOR ฉบับทางการ (PDF Ready)
              </h3>
              <p className="text-xs text-slate-500">
                จัดรูปแบบเอกสารราชการ สำหรับเสนอคณะกรรมการตรวจรับพัสดุ / คณะกรรมการจัดซื้อจัดจ้าง
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerPrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>ส่งออกเป็น PDF / สั่งพิมพ์</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/60 print:bg-white print:p-0">
          <div
            id="official-pdf-dossier"
            className="bg-white mx-auto shadow-md print:shadow-none max-w-4xl p-8 sm:p-12 text-slate-900 font-sarabun text-sm leading-relaxed border border-slate-200 print:border-none print:max-w-none print:w-full print:p-0"
          >
            {/* ================= PAGE 1: COVER & OFFICIAL MEMORANDUM ================= */}
            <div className="min-h-[900px] flex flex-col justify-between print:break-after-page">
              <div>
                {/* Garuda Seal */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 border-2 border-slate-900 rounded-full mx-auto flex items-center justify-center font-bold text-sm text-slate-900 tracking-wider">
                    ตราครุฑ
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950 mt-4">
                    บันทึกข้อความ
                  </h2>
                </div>

                {/* Memo Meta Table */}
                <div className="border-b-2 border-slate-900 pb-3 mb-6 grid grid-cols-2 gap-y-2 text-sm">
                  <div>
                    <strong>ส่วนราชการ:</strong> ฝ่ายพัสดุและจัดซื้อจัดจ้าง กองบริหารกลาง
                  </div>
                  <div>
                    <strong>โทร:</strong> ๐ ๒xxx xxxx ต่อ xxxx
                  </div>
                  <div>
                    <strong>ที่:</strong> {reportDocNo}
                  </div>
                  <div>
                    <strong>วันที่:</strong> {todayThai}
                  </div>
                  <div className="col-span-2 pt-1">
                    <strong>เรื่อง:</strong> รายงานผลการวิเคราะห์และเปรียบเทียบร่างขอบเขตของงาน (TOR) และข้อเสนอโครงการจัดหาระบบตรวจจับทะเบียนรถยนต์อัตโนมัติ (LPR)
                  </div>
                </div>

                {/* Body Memo */}
                <div className="space-y-4 text-justify">
                  <p>
                    <strong>เรียน</strong> {committeeChair} และคณะกรรมการตรวจรับพัสดุ
                  </p>

                  <p className="indent-8">
                    <strong>๑. ความเป็นมาและวัตถุประสงค์:</strong> ด้วยหน่วยงานมีความประสงค์จัดหาระบบตรวจจับและอ่านป้ายทะเบียนรถยนต์อัตโนมัติ (License Plate Recognition: LPR) เพื่อเพิ่มประสิทธิภาพในการรักษาความปลอดภัย บริหารจัดการการเข้า-ออกสถานที่ราชการ และบันทึกข้อมูลยานพาหนะตามพระราชบัญญัติการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. ๒๕๖๐ มาตรา ๘ ว่าด้วยความคุ้มค่า โปร่งใส มีประสิทธิภาพ และตรวจสอบได้ นั้น
                  </p>

                  <p className="indent-8">
                    <strong>๒. เอกสารที่นำมาวิเคราะห์เปรียบเทียบ:</strong> ฝ่ายพัสดุได้รวบรวมร่างขอบเขตของงาน (TOR) และข้อเสนอโครงการ จำนวนทั้งสิ้น {activeTors.length} ฉบับ ดังมีรายนามต่อไปนี้:
                  </p>

                  <div className="pl-6 space-y-1.5 text-xs sm:text-sm">
                    {activeTors.map((tor, idx) => (
                      <div key={tor.id} className="flex items-start gap-2">
                        <span className="font-bold shrink-0">๒.{idx + 1}</span>
                        <div>
                          <strong>{tor.code}:</strong> {tor.title} โดย <em>{tor.submitter}</em> (วงเงิน {tor.budget}, ระยะเวลา {tor.duration})
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="indent-8">
                    <strong>๓. สรุปผลการประเมินเบื้องต้น:</strong> จากการประมวลผลวิเคราะห์ด้วยระบบ AI ร่วมกับหลักเกณฑ์ทางพัสดุภาครัฐ พบว่าข้อเสนอที่มีความคุ้มค่าและมีความพร้อมทางสถาปัตยกรรมสูงสุดในลำดับที่ ๑ ได้แก่ <strong>{rankedTors[0]?.code}</strong> ด้วยคะแนนประเมินเฉลี่ย <strong>{rankedTors[0]?.avgScore.toFixed(1)}/๑๐</strong>
                  </p>
                </div>
              </div>

              {/* Signatures on Page 1 */}
              <div className="mt-12 pt-6 flex justify-end">
                <div className="text-center w-64 space-y-2">
                  <p className="text-slate-400">...........................................................</p>
                  <p className="font-semibold">(ลงชื่อ ...........................................................)</p>
                  <p className="text-xs text-slate-700">{procurementOfficer}</p>
                  <p className="text-xs text-slate-500">ผู้จัดทำรายงานเปรียบเทียบพัสดุ</p>
                </div>
              </div>
            </div>

            {/* Print Divider */}
            <div className="my-8 border-b-2 border-dashed border-slate-300 print:hidden"></div>

            {/* ================= PAGE 2: 5-DIMENSION RADAR MATRIX & EXECUTIVE SUMMARY ================= */}
            <div className="min-h-[900px] flex flex-col justify-between print:break-after-page print:pt-6">
              <div>
                <div className="border-b border-slate-800 pb-2 mb-4">
                  <h3 className="text-base font-bold text-slate-900 uppercase">
                    ตอนที่ ๑: ตารางสรุปผลคะแนนประเมินเรดาร์ชาร์ต ๕ มิติ (เกณฑ์ละ ๑๐ คะแนน)
                  </h3>
                  <p className="text-xs text-slate-600">
                    ประเมินตามกรอบ: ระยะเวลา (Timeline), ความเชี่ยวชาญ (Expertise), ขอบเขต (Scope), เทคนิค (Technical), และราคา/ความคุ้มค่า (Price)
                  </p>
                </div>

                {/* Score Summary Table */}
                <table className="w-full border-collapse border border-slate-800 text-xs sm:text-sm mb-6">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900">
                      <th className="border border-slate-800 p-2 text-center w-12">ลำดับ</th>
                      <th className="border border-slate-800 p-2 text-left">รหัสและชื่อเอกสาร TOR</th>
                      <th className="border border-slate-800 p-2 text-center">๑. ระยะเวลา</th>
                      <th className="border border-slate-800 p-2 text-center">๒. เชี่ยวชาญ</th>
                      <th className="border border-slate-800 p-2 text-center">๓. ขอบเขต</th>
                      <th className="border border-slate-800 p-2 text-center">๔. เทคนิค</th>
                      <th className="border border-slate-800 p-2 text-center">๕. ราคา</th>
                      <th className="border border-slate-800 p-2 text-center bg-blue-50 font-bold">เฉลี่ยรวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankedTors.map((tor, idx) => (
                      <tr key={tor.id} className={idx === 0 ? 'bg-emerald-50/50 font-medium' : ''}>
                        <td className="border border-slate-800 p-2 text-center">{idx + 1}</td>
                        <td className="border border-slate-800 p-2">
                          <strong className="block text-slate-950">{tor.code}</strong>
                          <span className="text-xs text-slate-600">{tor.title}</span>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            งบ: {tor.budget} | เวลา: {tor.duration}
                          </div>
                        </td>
                        <td className="border border-slate-800 p-2 text-center">{tor.scores.timeline.toFixed(1)}</td>
                        <td className="border border-slate-800 p-2 text-center">{tor.scores.expertise.toFixed(1)}</td>
                        <td className="border border-slate-800 p-2 text-center">{tor.scores.scope.toFixed(1)}</td>
                        <td className="border border-slate-800 p-2 text-center">{tor.scores.technical.toFixed(1)}</td>
                        <td className="border border-slate-800 p-2 text-center">{tor.scores.price.toFixed(1)}</td>
                        <td className="border border-slate-800 p-2 text-center font-bold text-blue-900 bg-blue-50/70">
                          {tor.avgScore.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Score Rationales Details */}
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2">
                  คำอธิบายเหตุผลและข้อเท็จจริงประกอบการให้คะแนนแต่ละฉบับ:
                </h4>
                <div className="space-y-3 text-xs leading-relaxed">
                  {activeTors.map((tor) => (
                    <div key={tor.id} className="p-3 border border-slate-300 rounded bg-slate-50/40">
                      <div className="flex justify-between font-bold text-slate-900 mb-1">
                        <span>{tor.code}: {tor.title}</span>
                        <span className="text-blue-800 font-bold">คะแนนเฉลี่ย {(
                          (tor.scores.timeline +
                            tor.scores.expertise +
                            tor.scores.scope +
                            tor.scores.technical +
                            tor.scores.price) /
                          5
                        ).toFixed(1)}/10</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-700">
                        <p>• <strong>ระยะเวลา:</strong> {tor.scoreRationales.timeline}</p>
                        <p>• <strong>ความเชี่ยวชาญ:</strong> {tor.scoreRationales.expertise}</p>
                        <p>• <strong>ขอบเขตงาน:</strong> {tor.scoreRationales.scope}</p>
                        <p>• <strong>เทคนิคที่ใช้:</strong> {tor.scoreRationales.technical}</p>
                        <p className="sm:col-span-2">• <strong>ราคาและความคุ้มค่า:</strong> {tor.scoreRationales.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right text-xs text-slate-400 pt-4 border-t border-slate-200">
                หน้า ๒ จาก ๔
              </div>
            </div>

            {/* Print Divider */}
            <div className="my-8 border-b-2 border-dashed border-slate-300 print:hidden"></div>

            {/* ================= PAGE 3: 8-DIMENSION COMPARISON MATRIX ================= */}
            <div className="min-h-[900px] flex flex-col justify-between print:break-after-page print:pt-6">
              <div>
                <div className="border-b border-slate-800 pb-2 mb-4">
                  <h3 className="text-base font-bold text-slate-900 uppercase">
                    ตอนที่ ๒: ตารางเปรียบเทียบเชิงลึก ๘ มิติ (Comprehensive 8-Dimension Matrix)
                  </h3>
                  <p className="text-xs text-slate-600">
                    เปรียบเทียบตาม ๘ หัวข้อที่ระเบียบพัสดุกำหนดเพื่อการตรวจพิจารณาของคณะกรรมการ
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Category 1 & 2: Submitter & Budget */}
                  <div className="border border-slate-300 rounded overflow-hidden">
                    <div className="bg-slate-100 p-2 font-bold text-slate-900 border-b border-slate-300">
                      ๑. ผู้ยื่นข้อเสนอ ราคา และระยะเวลาดำเนินการ
                    </div>
                    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeTors.map((tor) => (
                        <div key={tor.id} className="p-2 border border-slate-200 rounded">
                          <strong className="text-blue-900 block">{tor.code}</strong>
                          <div>ผู้ยื่น: {tor.submitter}</div>
                          <div>วงเงิน: <strong>{tor.budget}</strong></div>
                          <div>ระยะเวลา: <strong>{tor.duration}</strong></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: Hardware & Software */}
                  <div className="border border-slate-300 rounded overflow-hidden">
                    <div className="bg-slate-100 p-2 font-bold text-slate-900 border-b border-slate-300">
                      ๒. ขอบเขตงาน อุปกรณ์ฮาร์ดแวร์ และซอฟต์แวร์ AI
                    </div>
                    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeTors.map((tor) => (
                        <div key={tor.id} className="p-2 border border-slate-200 rounded">
                          <strong className="text-blue-900 block mb-1">{tor.code}</strong>
                          <p className="text-slate-700 mb-1.5 line-clamp-3"><strong>ขอบเขต:</strong> {tor.scope}</p>
                          <div className="mb-1">
                            <strong>ฮาร์ดแวร์หลัก:</strong>
                            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                              {tor.hardware.slice(0, 3).map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>ซอฟต์แวร์/AI:</strong>
                            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                              {tor.software.slice(0, 2).map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 4: Delivery, Warranty & Qualifications */}
                  <div className="border border-slate-300 rounded overflow-hidden">
                    <div className="bg-slate-100 p-2 font-bold text-slate-900 border-b border-slate-300">
                      ๓. การส่งมอบงาน การรับประกัน (SLA) และคุณสมบัติ
                    </div>
                    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeTors.map((tor) => (
                        <div key={tor.id} className="p-2 border border-slate-200 rounded">
                          <strong className="text-blue-900 block mb-1">{tor.code}</strong>
                          <p className="text-slate-700 text-[11px] mb-1"><strong>ส่งมอบ:</strong> {tor.deliveryAndAcceptance}</p>
                          <p className="text-slate-700 text-[11px] mb-1"><strong>รับประกัน:</strong> {tor.warrantyAndSla}</p>
                          <p className="text-slate-700 text-[11px]"><strong>คุณสมบัติ:</strong> {tor.qualifications}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right text-xs text-slate-400 pt-4 border-t border-slate-200">
                หน้า ๓ จาก ๔
              </div>
            </div>

            {/* Print Divider */}
            <div className="my-8 border-b-2 border-dashed border-slate-300 print:hidden"></div>

            {/* ================= PAGE 4: RECOMMENDATIONS & COMMITTEE SIGN-OFF ================= */}
            <div className="min-h-[900px] flex flex-col justify-between print:pt-6">
              <div>
                <div className="border-b border-slate-800 pb-2 mb-4">
                  <h3 className="text-base font-bold text-slate-900 uppercase">
                    ตอนที่ ๓: ข้อเสนอแนะเชิงพัสดุและมติเพื่อโปรดพิจารณา
                  </h3>
                  <p className="text-xs text-slate-600">
                    ข้อพิจารณาทางกฎหมาย การคุ้มครองข้อมูลส่วนบุคคล (PDPA) และมติคณะกรรมการตรวจรับพัสดุ
                  </p>
                </div>

                <div className="space-y-4 text-justify text-xs sm:text-sm leading-relaxed">
                  <p className="indent-8">
                    <strong>๑. ข้อพิจารณาด้านความคุ้มค่าตามมาตรา ๘ แห่ง พ.ร.บ. การจัดซื้อจัดจ้างฯ พ.ศ. ๒๕๖๐:</strong>
                  </p>
                  <p className="pl-6">
                    จากการวิเคราะห์เชิงลึก พบว่าการเลือกระบบที่มีการ <strong>ประมวลผลที่ขอบเครือข่าย (Edge AI)</strong> และ <strong>บูรณาการเชื่อมต่อไม้กั้นอัตโนมัติ (Barrier Gate)</strong> มีความคุ้มค่าทางเศรษฐศาสตร์สูงสุด (Total Cost of Ownership) เนื่องจากสามารถลดกำลังพลเจ้าหน้าที่ รปภ. ได้จริงถึง ๒ อัตราต่อจุดตรวจ และทำงานได้อย่างต่อเนื่องแม้อินเทอร์เน็ตภายนอกหรือระบบเซิร์ฟเวอร์หลักจะขัดข้อง
                  </p>

                  <p className="indent-8">
                    <strong>๒. ข้อพึงระวังด้านการคุ้มครองข้อมูลส่วนบุคคล (PDPA) และความปลอดภัยไซเบอร์:</strong>
                  </p>
                  <p className="pl-6">
                    ภาพถ่ายป้ายทะเบียนรถและภาพใบหน้าผู้ขับขี่ถือเป็นข้อมูลส่วนบุคคล จึงต้องกำหนดให้ผู้รับจ้างต้องมีมาตรการเข้ารหัสข้อมูล (Encryption), จำกัดสิทธิผู้เข้าถึงข้อมูล (Role-Based Access Control) และห้ามนำข้อมูลหรือภาพถ่ายออกไปประมวลผลหรือฝึกโมเดล AI ภายนอกระบบงานของทางราชการโดยเด็ดขาด
                  </p>

                  <p className="indent-8">
                    <strong>๓. ข้อเสนอแนะของฝ่ายพัสดุ:</strong>
                  </p>
                  <p className="pl-6">
                    ฝ่ายพัสดุเห็นควรเสนอคณะกรรมการตรวจรับพัสดุ พิจารณาเลือกรับร่างขอบเขตของงานและข้อเสนอของ <strong>{rankedTors[0]?.code}</strong> ซึ่งได้รับคะแนนประเมินสูงสุด และกำหนดเงื่อนไขการรับประกันไม่น้อยกว่า ๓ - ๕ ปี เพื่อประโยชน์สูงสุดแก่ทางราชการ
                  </p>
                </div>

                {/* Committee Resolution Box */}
                <div className="mt-6 p-4 border-2 border-slate-800 rounded bg-slate-50/50">
                  <h5 className="font-bold text-slate-950 text-xs sm:text-sm mb-2">
                    มติของคณะกรรมการตรวจรับพัสดุ:
                  </h5>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>เห็นชอบตามรายงานผลการวิเคราะห์เปรียบเทียบของฝ่ายพัสดุ</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>ให้ปรับแก้ร่างขอบเขตของงานในประเด็น: ..........................................................................</span>
                    </label>
                  </div>
                </div>

                {/* Committee Signatures Block */}
                <div className="mt-8 pt-4">
                  <h5 className="text-center font-bold text-sm mb-6">
                    คณะกรรมการตรวจรับพัสดุ
                  </h5>
                  <div className="grid grid-cols-3 gap-6 text-center text-xs">
                    <div className="space-y-1">
                      <p className="text-slate-400">.....................................................</p>
                      <p className="font-semibold">(.....................................................)</p>
                      <p className="text-slate-600">ประธานกรรมการ</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400">.....................................................</p>
                      <p className="font-semibold">(.....................................................)</p>
                      <p className="text-slate-600">กรรมการ</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400">.....................................................</p>
                      <p className="font-semibold">(.....................................................)</p>
                      <p className="text-slate-600">กรรมการและเลขานุการ</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right text-xs text-slate-400 pt-4 border-t border-slate-200">
                หน้า ๔ จาก ๔ | ระบบสนับสนุนงานพัสดุภาครัฐ AI LPR Analytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
