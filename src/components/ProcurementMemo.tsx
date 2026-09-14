import React, { useState } from 'react';
import { TORDocument, ComparisonAnalysisResult } from '../types';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Building,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

interface ProcurementMemoProps {
  tors: TORDocument[];
  selectedIds: string[];
  aiComparisonResult: ComparisonAnalysisResult | null;
}

export const ProcurementMemo: React.FC<ProcurementMemoProps> = ({
  tors,
  selectedIds,
  aiComparisonResult,
}) => {
  const [copied, setCopied] = useState(false);
  const activeTors = tors.filter((t) => selectedIds.includes(t.id));

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const el = document.getElementById('official-memo-content');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const todayThai = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 text-amber-800 rounded-md">
              <FileText className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              ข้อเสนอแนะเชิงพัสดุและร่างบันทึกข้อความราชการ
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            จัดทำตามรูปแบบหนังสือราชการที่เป็นทางการและระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างฯ พ.ศ. 2560
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'คัดลอกข้อความแล้ว' : 'คัดลอกข้อความ'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์ / บันทึกเป็น PDF</span>
          </button>
        </div>
      </div>

      {/* Strategic Decision Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-2">
            <Building className="w-4 h-4" />
            <span>กรณีสำนักงานขนาดเล็ก (งบจำกัด)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            แนะนำ <strong className="text-slate-900">MOCK-TOR-LPR-01</strong> (งบ 650,000 บาท) ส่งมอบไวใน 60 วัน ครอบคลุม 1 ประตู (2 เลน) หากหน่วยงานต้องการเพียงบันทึกภาพและป้ายทะเบียน ไม่ได้ต้องการสั่งเปิดไม้กั้นอัตโนมัติ
          </p>
          <div className="mt-2 text-[11px] text-blue-600 font-medium">
            ความเสี่ยง: ไม่มีไม้กั้น ต้องพึ่งพาเจ้าหน้าที่ รปภ. ประจำจุด
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs bg-emerald-50/20">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>กรณีความคุ้มค่าสูงสุด (จุดสมดุล)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            แนะนำ <strong className="text-slate-900">MOCK-TOR-LPR-02</strong> หรือ <strong className="text-slate-900">ฉบับคู่เทียบ Edge AI</strong> (งบ 1.45 - 1.85 ลบ.) บูรณาการไม้กั้นอัตโนมัติ กล้อง Overview ระบบ Visitor และรับประกัน 3-5 ปี
          </p>
          <div className="mt-2 text-[11px] text-emerald-700 font-medium">
            จุดเด่น: ความคุ้มค่าทางเศรษฐศาสตร์และลดภาระงาน รปภ. ได้จริง 100%
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-xs">
          <div className="flex items-center gap-2 text-purple-800 font-bold text-sm mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>กรณีศูนย์ราชการ/ความมั่นคงสูง</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            แนะนำ <strong className="text-slate-900">MOCK-TOR-LPR-03</strong> (งบ 4,950,000 บาท) 4 ประตู 8 เลน สถาปัตยกรรม High Availability รองรับ SIEM Syslog, Snapshot Hash และ Edge Cache
          </p>
          <div className="mt-2 text-[11px] text-purple-700 font-medium">
            จุดเด่น: ความต่อเนื่องทางธุรกิจ (DR) และการตรวจสอบย้อนหลังระดับคดีความ
          </div>
        </div>
      </div>

      {/* Official Government Memorandum Format */}
      <div
        id="official-memo-content"
        className="bg-white border border-slate-300 rounded-xl p-8 sm:p-12 shadow-sm font-sarabun text-slate-900 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0"
      >
        {/* Garuda Header Mock / Memo Header */}
        <div className="border-b-2 border-slate-800 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 border-2 border-slate-800 rounded-full flex items-center justify-center font-bold text-xs text-center text-slate-800">
              ตราครุฑ
            </div>
            <div className="text-center flex-1 pr-16">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                บันทึกข้อความ
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-2 text-sm sm:text-base mt-4 font-normal">
            <div>
              <strong>ส่วนราชการ:</strong> ฝ่ายพัสดุและจัดซื้อจัดจ้าง กองบริหารกลาง
            </div>
            <div>
              <strong>โทร:</strong> ๐ ๒xxx xxxx ต่อ xxxx
            </div>
            <div>
              <strong>ที่:</strong> พสด. ๐๒/พิเศษ / ๒๕๖๙
            </div>
            <div>
              <strong>วันที่:</strong> {todayThai}
            </div>
            <div className="col-span-2">
              <strong>เรื่อง:</strong>{' '}
              {aiComparisonResult?.draftOfficialMemo?.subject ||
                'รายงานผลการวิเคราะห์และเปรียบเทียบร่างขอบเขตของงาน (TOR) โครงการจัดหาระบบตรวจจับป้ายทะเบียนรถ (LPR)'}
            </div>
          </div>
        </div>

        {/* Memo Body */}
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-800">
          <p>
            <strong>เรียน</strong>{' '}
            {aiComparisonResult?.draftOfficialMemo?.to ||
              'ประธานคณะกรรมการกำหนดร่างขอบเขตของงานและราคากลาง'}
          </p>

          <p className="indent-8 text-justify">
            <strong>๑. ความเป็นมา:</strong> ตามที่หน่วยงานมีความประสงค์จัดหาระบบตรวจจับและอ่านป้ายทะเบียนรถยนต์อัตโนมัติ (License Plate Recognition: LPR) เพื่อเพิ่มประสิทธิภาพด้านการรักษาความปลอดภัยและอำนวยความสะดวกในการเข้า-ออกพื้นที่ราชการ นั้น เจ้าหน้าที่พัสดุได้ดำเนินการรวบรวมและวิเคราะห์ร่างขอบเขตของงาน (TOR) และเอกสารคุณลักษณะเฉพาะที่เกี่ยวข้อง จำนวน {activeTors.length} ฉบับ เพื่อนำเสนอข้อมูลเชิงเทคนิค ความคุ้มค่าด้านงบประมาณ และความเสี่ยงต่อคณะกรรมการฯ ใช้ประกอบการพิจารณา
          </p>

          <p className="indent-8 text-justify">
            <strong>๒. ข้อเท็จจริงจากการวิเคราะห์เปรียบเทียบ:</strong> จากการตรวจสอบรายละเอียดเอกสาร TOR แต่ละฉบับ สรุปสาระสำคัญได้ดังนี้
          </p>

          <div className="pl-6 space-y-2 text-sm">
            {activeTors.map((tor, idx) => (
              <div key={tor.id} className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <p>
                  <strong>๒.{idx + 1} {tor.code} ({tor.title}):</strong>
                </p>
                <p className="text-xs sm:text-sm text-slate-700 mt-1">
                  • <strong>ผู้ยื่น/จัดทำ:</strong> {tor.submitter} | <strong>วงเงินงบประมาณ:</strong> {tor.budget} | <strong>ระยะเวลาดำเนินการ:</strong> {tor.duration}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
                  • <strong>ขอบเขตและเทคนิค:</strong> {tor.scope} (คะแนนเทคนิค {tor.scores.technical}/10, ความคุ้มค่าราคา {tor.scores.price}/10)
                </p>
                <p className="text-xs text-emerald-800 mt-1">
                  • <strong>จุดเด่น:</strong> {tor.strengths.slice(0, 2).join(', ')}
                </p>
                <p className="text-xs text-amber-800 mt-0.5">
                  • <strong>ข้อพึงระวัง:</strong> {tor.weaknesses.slice(0, 2).join(', ')}
                </p>
              </div>
            ))}
          </div>

          <p className="indent-8 text-justify">
            <strong>๓. ข้อพิจารณาด้านระเบียบการจัดซื้อจัดจ้างและความคุ้มค่า:</strong>
          </p>
          <div className="pl-6 space-y-1.5 text-sm">
            <p className="text-justify">
              ๓.๑ <strong>ด้านความคุ้มค่าตามมาตรา ๘ แห่ง พ.ร.บ. จัดซื้อจัดจ้างฯ พ.ศ. ๒๕๖๐:</strong> หากพิจารณาตามฟังก์ชันการทำงานจริง การเลือกใช้ระบบที่มีการบูรณาการไม้กั้นอัตโนมัติ (เช่น MOCK-TOR-LPR-02 หรือฉบับคู่เทียบ Edge AI) จะช่วยลดกำลังพลเจ้าหน้าที่ รปภ. ได้จริงในระยะยาว ส่งผลให้เกิดความคุ้มค่าทางเศรษฐศาสตร์ (Total Cost of Ownership) สูงกว่าการติดตั้งกล้องบันทึกภาพเพียงอย่างเดียว
            </p>
            <p className="text-justify">
              ๓.๒ <strong>ด้านการคุ้มครองข้อมูลส่วนบุคคล (PDPA):</strong> ภาพถ่ายป้ายทะเบียนรถและภาพใบหน้าผู้ขับขี่ถือเป็นข้อมูลส่วนบุคคล จึงจำเป็นต้องกำหนดเงื่อนไข Retention Policy การเข้ารหัสข้อมูล (Encryption) และข้อห้ามนำภาพถ่ายออกไปประมวลผลหรือฝึกโมเดลภายนอกหน่วยงานอย่างเด็ดขาด
            </p>
            <p className="text-justify">
              ๓.๓ <strong>ด้านระยะเวลาการรับประกันและ SLA:</strong> ควรกำหนดระยะเวลารับประกันไม่น้อยกว่า ๓ ปี และระบุระยะเวลาตอบสนองต่อเหตุขัดข้อง (Response Time) ภายในไม่เกิน ๔ ชั่วโมง เพื่อมิให้กระทบต่อการจราจรเข้า-ออกสถานที่ราชการ
            </p>
          </div>

          <p className="indent-8 text-justify">
            <strong>๔. ข้อเสนอแนะเพื่อโปรดพิจารณา:</strong>
          </p>
          <p className="indent-8 text-justify">
            เจ้าหน้าที่พัสดุเห็นควรเสนอคณะกรรมการกำหนดร่างขอบเขตของงานฯ พิจารณากำหนด TOR โดยใช้สถาปัตยกรรมแบบ <strong>ประมวลผลที่ขอบเครือข่าย (Edge AI)</strong> ร่วมกับ <strong>ไม้กั้นอัตโนมัติ (Barrier Gate)</strong> ตามแนวทางของ MOCK-TOR-LPR-02 หรือฉบับคู่เทียบ เพื่อความเสถียรในการทำงานแม้โครงข่ายขัดข้อง และกำหนดระยะเวลารับประกัน ๓ - ๕ ปี เพื่อประโยชน์สูงสุดของทางราชการ
          </p>

          <p className="pt-2 text-justify">
            จึงเรียนมาเพื่อโปรดพิจารณา
          </p>
        </div>

        {/* Signature Box */}
        <div className="mt-12 flex justify-end">
          <div className="text-center w-64 space-y-2">
            <p className="text-slate-400">...........................................................</p>
            <p className="font-semibold">(ลงชื่อ เจ้าหน้าที่พัสดุผู้จัดทำรายงาน)</p>
            <p className="text-sm text-slate-600">ตำแหน่ง เจ้าพนักงานพัสดุชำนาญงาน</p>
          </div>
        </div>
      </div>
    </div>
  );
};
