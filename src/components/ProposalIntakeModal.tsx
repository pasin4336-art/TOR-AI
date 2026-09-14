import React, { useState } from 'react';
import { TORDocument, VendorProposalInput } from '../types';
import {
  Send,
  Building2,
  FileCheck2,
  Coins,
  Clock,
  Sparkles,
  X,
  AlertCircle,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Layers,
  Phone,
  Mail,
  User,
} from 'lucide-react';

interface ProposalIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProposal: (newTor: TORDocument) => void;
}

export const ProposalIntakeModal: React.FC<ProposalIntakeModalProps> = ({
  isOpen,
  onClose,
  onSubmitProposal,
}) => {
  const [formData, setFormData] = useState<VendorProposalInput>({
    title: 'ข้อเสนอโครงการจัดหาระบบตรวจจับทะเบียนรถยนต์อัจฉริยะ',
    code: '',
    vendorName: '',
    taxId: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    proposedPrice: 1650000,
    durationDays: 90,
    scopeDescription: 'ติดตั้งระบบกล้องอ่านป้ายทะเบียนรถยนต์ LPR พร้อมไม้กั้นอัตโนมัติความเร็วสูง 2 ช่องทาง และซอฟต์แวร์บริหารจัดการบันทึกภาพแบบ Real-time',
    barrierGateIncluded: true,
    architecture: 'edge_ai',
    hardwareItems: [
      'กล้อง Edge AI LPR 4MP พร้อม Built-in OCR จำนวน 2 ชุด',
      'กล้อง Overview Full HD ยืนยันภาพรวมตัวรถ จำนวน 2 ชุด',
      'ไม้กั้นอัตโนมัติความเร็วสูง (เปิด-ปิด 1.5 วินาที) พร้อม Safety Loop จำนวน 2 ชุด',
      'เครื่องแม่ข่ายบันทึกภาพ NVR/Server 8TB จำนวน 1 ชุด',
      'เครื่องสำรองไฟฟ้า UPS True Online 1000VA สำรอง 30 นาที',
    ],
    softwareFeatures: [
      'AI Deep Learning ตรวจจับป้ายทะเบียนภาษาไทย แม่นยำ 98%',
      'ระบบบริหารจัดการ Whitelist และเฝ้าระวัง Blacklist แจ้งเตือนแบบ Real-time',
      'หน้าจอ Web-based Dashboard สรุปสถิติปริมาณรถเข้า-ออก',
      'REST API สำหรับส่งข้อมูลต่อไปยังระบบ HR / ERP ภายนอก',
      'เก็บบันทึกประวัติและรูปภาพตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)',
    ],
    deliveryMilestones: 'ส่งมอบ 3 งวดงาน: 1) แผนการทำงานและจัดส่งอุปกรณ์ (30 วัน), 2) ติดตั้งและเชื่อมโยงระบบ (60 วัน), 3) ทดสอบ UAT และอบรมเจ้าหน้าที่ (90 วัน)',
    warrantyYears: 3,
    slaResponseHours: 2,
    pmIntervalMonths: 3,
    qualificationsSummary: 'บริษัทมีประสบการณ์ติดตั้งระบบ LPR และ Access Control ให้หน่วยงานรัฐและเอกชนมาแล้วกว่า 5 ปี มีทีมวิศวกรที่มีใบรับรองจากผู้ผลิตอุปกรณ์',
    pastProjectValue: 'มีผลงานสัญญาระบบรักษาความปลอดภัยกับภาครัฐ มูลค่าไม่น้อยกว่า 1,500,000 บาท',
  });

  const [hardwareInputText, setHardwareInputText] = useState(
    formData.hardwareItems.join('\n')
  );
  const [softwareInputText, setSoftwareInputText] = useState(
    formData.softwareFeatures.join('\n')
  );

  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isExtractingFile, setIsExtractingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Auto-fill from attached proposal document (.pdf, .docx)
  const handleFileUpload = async (file: File) => {
    setAttachedFile(file);
    setIsExtractingFile(true);
    setStatusMessage('กำลังอ่านเอกสารข้อเสนอเพื่อดึงข้อมูลอัตโนมัติ...');
    setErrorMessage('');

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;

      const res = await fetch('/api/parse-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData: base64Data,
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'ไม่สามารถอ่านข้อความจากไฟล์ได้');
      }

      const text = data.text;
      // Pre-fill form if relevant terms exist
      setFormData((prev) => ({
        ...prev,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
        scopeDescription: text.slice(0, 300) + '...',
      }));
      setStatusMessage('ดึงข้อมูลจากเอกสารข้อเสนอเบื้องต้นเรียบร้อยแล้ว');
    } catch (err: any) {
      console.error('File extract error:', err);
      setErrorMessage(err.message || 'ไม่สามารถสกัดข้อมูลจากไฟล์ได้');
    } finally {
      setIsExtractingFile(false);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vendorName.trim()) {
      setErrorMessage('กรุณากรอกชื่อบริษัทหรือผู้ยื่นข้อเสนอ');
      return;
    }

    if (formData.proposedPrice <= 0) {
      setErrorMessage('กรุณาระบุวงเงินราคาที่เสนอให้ถูกต้อง');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setStatusMessage('ระบบ AI กำลังประเมินข้อเสนอตามเกณฑ์เรดาร์ 5 มิติ (เกณฑ์ละ 10 คะแนน)...');

    try {
      const hardwareList = hardwareInputText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const softwareList = softwareInputText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const generatedCode =
        formData.code.trim() ||
        `PROP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Construct comprehensive proposal text for AI analysis
      const proposalDocumentText = `
ข้อเสนอโครงการทางเทคนิคและราคา (Proposal for License Plate Recognition System)
ชื่อโครงการ: ${formData.title}
รหัสข้อเสนอ: ${generatedCode}
ผู้ยื่นข้อเสนอ: ${formData.vendorName}
เลขประจำตัวผู้เสียภาษี: ${formData.taxId || 'ไม่ได้ระบุ'}
ผู้ประสานงาน: ${formData.contactPerson} โทร: ${formData.contactPhone} อีเมล: ${formData.contactEmail}
ราคาที่เสนอ: ${formData.proposedPrice.toLocaleString('th-TH')} บาท
ระยะเวลาดำเนินการ: ${formData.durationDays} วัน
สถาปัตยกรรมระบบ: ${
        formData.architecture === 'edge_ai'
          ? 'Edge AI ประมวลผลที่กล้องโดยตรง'
          : formData.architecture === 'hybrid'
          ? 'Hybrid Controller ประจำช่องทาง'
          : 'Centralized Server รวมศูนย์'
      }
ระบบไม้กั้น: ${formData.barrierGateIncluded ? 'รวมไม้กั้นอัตโนมัติพร้อม Safety Loop' : 'ไม่มีไม้กั้น (บันทึกภาพอย่างเดียว)'}

ขอบเขตของงานและระบบ:
${formData.scopeDescription}

รายการอุปกรณ์ฮาร์ดแวร์ที่เสนอ:
${hardwareList.map((h, i) => `${i + 1}. ${h}`).join('\n')}

คุณลักษณะซอฟต์แวร์และปัญญาประดิษฐ์ AI:
${softwareList.map((s, i) => `${i + 1}. ${s}`).join('\n')}

เงื่อนไขการส่งมอบและการตรวจรับ:
${formData.deliveryMilestones}

การรับประกันและระดับการให้บริการ (SLA):
รับประกัน ${formData.warrantyYears} ปี, ตอบสนองต่อเหตุขัดข้องภายใน ${formData.slaResponseHours} ชั่วโมง, บำรุงรักษาเชิงป้องกัน (PM) ทุก ${formData.pmIntervalMonths} เดือน

คุณสมบัติและผลงานที่ผ่านมา:
${formData.qualificationsSummary}
${formData.pastProjectValue}
      `.trim();

      // Call Gemini API to extract structured scores and evaluation
      const analyzeRes = await fetch('/api/analyze-tor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: proposalDocumentText,
          title: formData.title,
          code: generatedCode,
        }),
      });

      const analyzeData = await analyzeRes.json();
      if (!analyzeRes.ok || !analyzeData.success) {
        throw new Error(analyzeData.error || 'การวิเคราะห์ข้อเสนอด้วย AI ขัดข้อง');
      }

      const analyzed = analyzeData.data;

      const newProposalTOR: TORDocument = {
        id: `proposal-${Date.now()}`,
        code: generatedCode,
        title: formData.title,
        submitter: `${formData.vendorName} (ผู้ยื่นข้อเสนอผ่านหน้าจอ)`,
        budget: `${formData.proposedPrice.toLocaleString('th-TH')} บาท`,
        rawBudgetNumber: formData.proposedPrice,
        duration: `${formData.durationDays} วัน นับถัดจากวันลงนามในสัญญา`,
        durationDays: formData.durationDays,
        scope: formData.scopeDescription,
        hardware: hardwareList.length > 0 ? hardwareList : analyzed.hardware || [],
        software: softwareList.length > 0 ? softwareList : analyzed.software || [],
        deliveryAndAcceptance: formData.deliveryMilestones,
        warrantyAndSla: `รับประกัน ${formData.warrantyYears} ปี (SLA ตอบสนองใน ${formData.slaResponseHours} ชม., PM ทุก ${formData.pmIntervalMonths} เดือน)`,
        qualifications: formData.qualificationsSummary,
        strengths: analyzed.strengths || ['เป็นข้อเสนอที่ยื่นผ่านหน้าจอ มีรายละเอียดอุปกรณ์ครบถ้วน'],
        weaknesses: analyzed.weaknesses || ['ควรตรวจสอบความถูกต้องของสเปกจริงกับเอกสารแนบ'],
        scores: analyzed.scores || {
          timeline: 8.5,
          expertise: 8.5,
          scope: 8.5,
          technical: 8.5,
          price: 8.5,
        },
        scoreRationales: analyzed.scoreRationales || {
          timeline: `ระยะเวลา ${formData.durationDays} วัน เหมาะสมกับเนื้องานที่เสนอ`,
          expertise: 'มีผลงานและทีมงานวิศวกรตามที่เสนอ',
          scope: 'ครอบคลุมงานตรวจจับทะเบียนและไม้กั้น',
          technical: `ใช้สถาปัตยกรรม ${formData.architecture}`,
          price: `วงเงิน ${formData.proposedPrice.toLocaleString()} บาท มีความคุ้มค่า`,
        },
        rawContent: proposalDocumentText,
        sourceType: 'proposal',
        fileName: attachedFile ? attachedFile.name : 'ยื่นผ่านแบบฟอร์มหน้าจอ',
        hasBarrierGate: formData.barrierGateIncluded,
        architectureType: formData.architecture,
        warrantyYears: formData.warrantyYears,
        contactEmail: formData.contactEmail,
        submittedAt: new Date().toLocaleString('th-TH'),
      };

      onSubmitProposal(newProposalTOR);
      onClose();
    } catch (err: any) {
      console.error('Error submitting proposal:', err);
      setErrorMessage(err.message || 'เกิดข้อผิดพลาดในการประมวลผลข้อเสนอ');
    } finally {
      setIsSubmitting(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                รับข้อเสนอโครงการผ่านหน้าจอ (Vendor Proposal Intake)
              </h3>
              <p className="text-xs text-slate-500">
                บันทึกข้อเสนอราคาและคุณลักษณะทางเทคนิค พร้อมให้ระบบ AI วิเคราะห์และเปรียบเทียบในเรดาร์ชาร์ตทันที
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick File Auto-fill Bar */}
        <div className="px-6 py-3 bg-blue-50/70 border-b border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>มีไฟล์เอกสารข้อเสนอ (.pdf, .docx) หรือไม่? ให้อ่านและกรอกแบบฟอร์มอัตโนมัติ:</span>
          </div>
          <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-blue-100 text-blue-700 font-semibold rounded-md border border-blue-200 cursor-pointer shadow-2xs transition-colors shrink-0">
            <Upload className="w-3.5 h-3.5" />
            <span>{attachedFile ? attachedFile.name : 'แนบไฟล์ข้อเสนอ'}</span>
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            />
          </label>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Section 1: ข้อมูลผู้ยื่นข้อเสนอ */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider text-blue-700">
              <Building2 className="w-4 h-4" />
              <span>๑. ข้อมูลบริษัท / ผู้ยื่นข้อเสนอ</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">
                  ชื่อบริษัทหรือนิติบุคคลผู้ยื่นข้อเสนอ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น บริษัท สมาร์ท วิชั่น แอนด์ เทคโนโลยี จำกัด"
                  value={formData.vendorName}
                  onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  เลขประจำตัวผู้เสียภาษีอากร
                </label>
                <input
                  type="text"
                  placeholder="01055xxxxxxxx"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ชื่อผู้ประสานงาน / วิศวกรโครงการ
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="นายวิศวะ ชำนาญการ"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  เบอร์โทรศัพท์ติดต่อ
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="08x-xxx-xxxx"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  อีเมลติดต่อ
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="contact@smartvision.co.th"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: ข้อเสนอราคาและระยะเวลา */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800">
              <Coins className="w-4 h-4" />
              <span>๒. ข้อเสนอราคา ระยะเวลา และสถาปัตยกรรม</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">
                  ชื่อโครงการ / ข้อเสนอ
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ราคาที่เสนอ (บาท รวม VAT) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  required
                  value={formData.proposedPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, proposedPrice: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold text-amber-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ระยะเวลาดำเนินการ (วัน) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="15"
                  max="365"
                  required
                  value={formData.durationDays}
                  onChange={(e) =>
                    setFormData({ ...formData, durationDays: parseInt(e.target.value) || 90 })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold text-blue-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  สถาปัตยกรรมทางเทคนิค
                </label>
                <select
                  value={formData.architecture}
                  onChange={(e) =>
                    setFormData({ ...formData, architecture: e.target.value as any })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="edge_ai">Edge AI (ประมวลผลที่กล้อง)</option>
                  <option value="hybrid">Hybrid (Edge Controller)</option>
                  <option value="central_server">Central Server (รวมศูนย์)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ระบบไม้กั้นอัตโนมัติ (Barrier Gate)
                </label>
                <div className="flex items-center h-10 gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="barrierGate"
                      checked={formData.barrierGateIncluded}
                      onChange={() => setFormData({ ...formData, barrierGateIncluded: true })}
                      className="text-blue-600"
                    />
                    <span className="text-xs font-medium text-slate-700">รวมไม้กั้นในตัว</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer ml-3">
                    <input
                      type="radio"
                      name="barrierGate"
                      checked={!formData.barrierGateIncluded}
                      onChange={() => setFormData({ ...formData, barrierGateIncluded: false })}
                      className="text-blue-600"
                    />
                    <span className="text-xs font-medium text-slate-700">ไม่มีไม้กั้น</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ระยะเวลารับประกัน (ปี)
                </label>
                <select
                  value={formData.warrantyYears}
                  onChange={(e) =>
                    setFormData({ ...formData, warrantyYears: parseInt(e.target.value) || 2 })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="2">2 ปี (ขั้นต่ำ)</option>
                  <option value="3">3 ปี (พร้อม SLA)</option>
                  <option value="5">5 ปี (ครอบคลุมอะไหล่)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  SLA ตอบสนอง (ชั่วโมง)
                </label>
                <input
                  type="number"
                  min="1"
                  max="48"
                  value={formData.slaResponseHours}
                  onChange={(e) =>
                    setFormData({ ...formData, slaResponseHours: parseInt(e.target.value) || 4 })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: ขอบเขตงาน และรายละเอียดสเปก */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider text-purple-700">
              <Cpu className="w-4 h-4" />
              <span>๓. ขอบเขตงาน อุปกรณ์ฮาร์ดแวร์ และซอฟต์แวร์ AI</span>
            </h4>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                ขอบเขตการพัฒนาระบบ (Scope of Work)
              </label>
              <textarea
                rows={2}
                value={formData.scopeDescription}
                onChange={(e) => setFormData({ ...formData, scopeDescription: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  รายการอุปกรณ์ฮาร์ดแวร์ที่นำเสนอ (1 บรรทัดต่อ 1 รายการ)
                </label>
                <textarea
                  rows={4}
                  value={hardwareInputText}
                  onChange={(e) => setHardwareInputText(e.target.value)}
                  placeholder="เช่น กล้อง LPR 4MP 2 ชุด, ไม้กั้น 2 ชุด..."
                  className="w-full p-2.5 border border-slate-200 rounded-lg font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  คุณลักษณะซอฟต์แวร์และ AI ที่นำเสนอ (1 บรรทัดต่อ 1 รายการ)
                </label>
                <textarea
                  rows={4}
                  value={softwareInputText}
                  onChange={(e) => setSoftwareInputText(e.target.value)}
                  placeholder="เช่น AI ตรวจจับป้ายทะเบียนภาษาไทย 98%, ระบบ Whitelist..."
                  className="w-full p-2.5 border border-slate-200 rounded-lg font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: คุณสมบัติบริษัท และผลงานเดิม */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-800">
              <ShieldCheck className="w-4 h-4" />
              <span>๔. ความเชี่ยวชาญของบริษัทและผลงานอ้างอิง</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ความเชี่ยวชาญของทีมงานและหนังสือรับรอง
                </label>
                <textarea
                  rows={2}
                  value={formData.qualificationsSummary}
                  onChange={(e) =>
                    setFormData({ ...formData, qualificationsSummary: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ผลงานเดิมและมูลค่าสัญญาที่เคยดำเนินงาน
                </label>
                <textarea
                  rows={2}
                  value={formData.pastProjectValue}
                  onChange={(e) => setFormData({ ...formData, pastProjectValue: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          {isSubmitting && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 animate-spin" />
              <div className="text-xs text-blue-900 font-medium">
                <p className="font-semibold">{statusMessage}</p>
                <p className="text-[11px] text-blue-700">กำลังประมวลผลด้วย Gemini 3.8 Flash เพื่อสร้าง Radar Score และ Matrix เปรียบเทียบ</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 hidden sm:inline">
            เมื่อยื่นข้อเสนอ ระบบจะนำเข้าสู่ตารางเปรียบเทียบ 8 มิติและเรดาร์ชาร์ตโดยอัตโนมัติ
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'กำลังบันทึกและประเมิน...' : 'ยื่นข้อเสนอและให้ AI ประเมินทันที'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
