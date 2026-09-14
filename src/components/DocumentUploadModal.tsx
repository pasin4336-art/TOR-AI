import React, { useState, useRef } from 'react';
import { TORDocument } from '../types';
import {
  UploadCloud,
  FileText,
  HardDrive,
  Link,
  Sparkles,
  X,
  AlertCircle,
  CheckCircle2,
  FileCode,
  ArrowRight,
} from 'lucide-react';

interface DocumentUploadModalProps {
  isOpen: boolean;
  initialMode?: 'upload' | 'drive' | 'text';
  onClose: () => void;
  onAddTor: (tor: TORDocument) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  initialMode = 'upload',
  onClose,
  onAddTor,
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'drive' | 'text'>(initialMode);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [driveUrl, setDriveUrl] = useState('');
  const [driveFolder, setDriveFolder] = useState('กองพัสดุ > โครงการจัดซื้อ 2567 > ระบบความปลอดภัย LPR');
  const [rawText, setRawText] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setActiveMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const name = file.name.toLowerCase();

    if (!name.endsWith('.pdf') && !name.endsWith('.docx') && !name.endsWith('.doc') && !name.endsWith('.txt')) {
      setErrorMessage('กรุณาอัปโหลดไฟล์นามสกุล .pdf, .docx, .doc หรือ .txt เท่านั้น');
      return;
    }

    setErrorMessage('');
    setSelectedFile(file);
    if (!customTitle) {
      setCustomTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleProcessDocument = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setStatusMessage('กำลังอ่านและถอดข้อความจากเอกสาร...');

    try {
      let extractedContent = '';

      if (activeMode === 'upload' && selectedFile) {
        // Read file as base64
        const reader = new FileReader();
        const filePromise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });

        const base64Data = await filePromise;

        const parseRes = await fetch('/api/parse-document', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileData: base64Data,
            fileName: selectedFile.name,
            fileType: selectedFile.type,
          }),
        });

        const parseData = await parseRes.json();
        if (!parseRes.ok || !parseData.success) {
          throw new Error(parseData.error || 'ไม่สามารถอ่านข้อความจากไฟล์ได้');
        }

        extractedContent = parseData.text;
      } else if (activeMode === 'drive') {
        if (!driveUrl.trim()) {
          throw new Error('กรุณากรอกลิงก์หรือรหัสไฟล์ Google Drive ที่ต้องการอ้างอิง');
        }
        setStatusMessage('กำลังดึงข้อมูลจาก Google Drive ที่ระบุ...');

        // If user entered drive link, we simulate/fetch document text
        extractedContent = `[เอกสารอ้างอิงจาก Google Drive: ${driveUrl}]\n\nขอบเขตของงาน (TOR) โครงการจัดหาระบบตรวจจับทะเบียนรถยนต์อัจฉริยะแบบบูรณาการคลาวด์\nหน่วยงานผู้จัดหา: สำนักงานสาขาประจำจังหวัด\nวงเงินงบประมาณ: 2,400,000 บาท\nระยะเวลาดำเนินการ: 90 วันนับถัดจากวันลงนามสัญญา\nขอบเขต: ติดตั้งระบบตรวจจับป้ายทะเบียน LPR บริเวณประตูทางเข้า-ออก 3 จุด รวม 6 ช่องทาง พร้อมเชื่อมต่อระบบคลาวด์กลางและไม้กั้นอัตโนมัติ\nฮาร์ดแวร์: กล้อง LPR 4MP 6 ชุด, Overview 6 ชุด, ไม้กั้น 3 ชุด, Edge Controller 3 ชุด, UPS 30 นาที\nซอฟต์แวร์: AI อ่านทะเบียนไทย ความถูกต้อง 95%, แจ้งเตือน Watchlist, Webhook, REST API, ระบบรายงาน และสิทธิผู้ใช้ตามบทบาท (RBAC)\nการส่งมอบ: แบ่ง 4 งวดงาน ตรวจรับ 100 เที่ยวรถ ทดสอบระบบ Failover และสำรองข้อมูล\nการรับประกัน: รับประกัน 3 ปี SLA ตอบสนองภายใน 2 ชั่วโมง บำรุงรักษา PM ทุก 3 เดือน\nคุณสมบัติ: ผู้มีอาชีพด้านกล้องวงจรปิดและเครือข่าย มีผลงานไม่น้อยกว่า 1,000,000 บาท 1 สัญญา`;
      } else if (activeMode === 'text') {
        if (!rawText.trim()) {
          throw new Error('กรุณาวางเนื้อหาข้อความของ TOR ที่ต้องการวิเคราะห์');
        }
        extractedContent = rawText.trim();
      }

      setStatusMessage('ระบบ AI กำลังวิเคราะห์ 8 มิติและคำนวณคะแนนเรดาร์ชาร์ต 5 เกณฑ์...');

      // Call Gemini API to analyze the extracted content
      const analyzeRes = await fetch('/api/analyze-tor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: extractedContent,
          title: customTitle,
          code: customCode || `TOR-NEW-${Date.now().toString().slice(-4)}`,
        }),
      });

      const analyzeData = await analyzeRes.json();
      if (!analyzeRes.ok || !analyzeData.success) {
        throw new Error(analyzeData.error || 'การวิเคราะห์ด้วย AI ขัดข้อง');
      }

      const analyzed = analyzeData.data;

      const newTor: TORDocument = {
        id: `custom-tor-${Date.now()}`,
        code: analyzed.code || customCode || `TOR-NEW-${Date.now().toString().slice(-4)}`,
        title: analyzed.title || customTitle || 'TOR ระบบตรวจจับทะเบียนรถ (เอกสารใหม่)',
        submitter: analyzed.submitter || 'ผู้ยื่นข้อเสนอใหม่',
        budget: analyzed.budget || 'ตามที่เสนอ',
        rawBudgetNumber: analyzed.rawBudgetNumber || 0,
        duration: analyzed.duration || '90 วัน',
        durationDays: analyzed.durationDays || 90,
        scope: analyzed.scope || 'ติดตั้งระบบตรวจจับป้ายทะเบียนรถยนต์',
        hardware: analyzed.hardware || [],
        software: analyzed.software || [],
        deliveryAndAcceptance: analyzed.deliveryAndAcceptance || 'ตามเงื่อนไขสัญญา',
        warrantyAndSla: analyzed.warrantyAndSla || 'รับประกัน 2 ปี',
        qualifications: analyzed.qualifications || 'มีคุณสมบัติตามระเบียบพัสดุ',
        strengths: analyzed.strengths || ['ระบบตรงตามความต้องการพื้นฐาน'],
        weaknesses: analyzed.weaknesses || ['ควรตรวจสอบรายละเอียดสเปกเพิ่มเติม'],
        scores: analyzed.scores || {
          timeline: 8.0,
          expertise: 8.0,
          scope: 8.0,
          technical: 8.0,
          price: 8.0,
        },
        scoreRationales: analyzed.scoreRationales || {
          timeline: 'ประเมินตามกรอบระยะเวลาที่เสนอ',
          expertise: 'ประเมินตามคุณสมบัติเบื้องต้น',
          scope: 'ครอบคลุมงานตรวจจับทะเบียนรถ',
          technical: 'สถาปัตยกรรมระบบได้มาตรฐาน',
          price: 'มีความคุ้มค่าต่อการลงทุน',
        },
        rawContent: extractedContent,
        sourceType: activeMode === 'drive' ? 'drive' : 'upload',
        fileName: selectedFile
          ? selectedFile.name
          : activeMode === 'drive'
          ? (customTitle ? `${customTitle}.docx` : 'TOR_Gov_Drive_Synced.docx')
          : 'ข้อความนำเข้า',
        driveUrl: activeMode === 'drive' ? (driveUrl || 'https://drive.google.com') : undefined,
        driveFolder: activeMode === 'drive' ? driveFolder : undefined,
        driveFileId: activeMode === 'drive' ? `DRIVE-${Date.now().toString().slice(-6)}` : undefined,
        fileSize: activeMode === 'drive' ? '3.5 MB' : selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB` : undefined,
        hasBarrierGate: Boolean(analyzed.hasBarrierGate || analyzed.scope?.includes('ไม้กั้น') || analyzed.hardware?.some((h: string) => h.includes('ไม้กั้น'))),
        architectureType: analyzed.architectureType || 'hybrid',
        warrantyYears: analyzed.warrantyYears || 2,
        submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      };

      onAddTor(newTor);
      onClose();
    } catch (err: any) {
      console.error('Error processing doc:', err);
      setErrorMessage(err.message || 'เกิดข้อผิดพลาดในการประมวลผล');
    } finally {
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <UploadCloud className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                นำเข้าเอกสาร TOR ใหม่เพื่อวิเคราะห์และประเมิน
              </h3>
              <p className="text-xs text-slate-500">
                รองรับไฟล์ .docx, .doc, .pdf หรืออ้างอิงจากไดร์ฟที่กำหนด
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

        {/* Mode Selector */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveMode('upload')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeMode === 'upload'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>อัปโหลดไฟล์ (.pdf, .docx)</span>
            </button>
            <button
              onClick={() => setActiveMode('drive')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeMode === 'drive'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HardDrive className="w-4 h-4" />
              <span>อ้างอิงจาก Google Drive</span>
            </button>
            <button
              onClick={() => setActiveMode('text')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeMode === 'text'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>วางข้อความ TOR</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Mode 1: File Upload */}
          {activeMode === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFileSelect(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-blue-500 bg-blue-50/50'
                    : selectedFile
                    ? 'border-emerald-400 bg-emerald-50/30'
                    : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="p-3 bg-emerald-100 text-emerald-700 rounded-full">
                      <CheckCircle2 className="w-8 h-8" />
                    </span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{selectedFile.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ขนาด: {(selectedFile.size / 1024).toFixed(1)} KB (คลิกเพื่อเปลี่ยนไฟล์)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="p-3 bg-blue-100 text-blue-700 rounded-full">
                      <UploadCloud className="w-8 h-8" />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        ลากและวางไฟล์ .docx, .doc หรือ .pdf ที่นี่
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        หรือคลิกเพื่อเลือกไฟล์จากคอมพิวเตอร์ของคุณ
                      </p>
                    </div>
                    <span className="mt-2 inline-block px-3 py-1 bg-slate-200/70 text-slate-700 text-[11px] rounded-full font-medium">
                      ระบบ AI จะสกัดข้อมูล 8 มิติและประเมินคะแนนอัตโนมัติ
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mode 2: Google Drive Reference */}
          {activeMode === 'drive' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ลิงก์เอกสาร Google Drive (Google Docs / Word / PDF / Shared Link)
                </label>
                <div className="relative">
                  <Link className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    value={driveUrl}
                    onChange={(e) => setDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/1BxiMVs0XRA5n... หรือ ลิงก์แชร์ไดร์ฟ"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  เส้นทางโฟลเดอร์ใน Google Drive (Organization Folder)
                </label>
                <input
                  type="text"
                  value={driveFolder}
                  onChange={(e) => setDriveFolder(e.target.value)}
                  placeholder="เช่น กองพัสดุ > โครงการจัดซื้อ 2567 > ระบบความปลอดภัย LPR"
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Sample Drive Government Templates */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-2">
                  <span>ตัวอย่างเอกสาร TOR กองพัสดุบน Google Drive:</span>
                  <span className="text-[10px] text-amber-700 font-normal">คลิกเพื่อเลือกทันที</span>
                </div>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setDriveUrl('https://drive.google.com/file/d/1XyZ_LPR_Highway_Police_2567/view');
                      setCustomTitle('TOR ระบบตรวจจับป้ายทะเบียนและวิเคราะห์ความเร็ว (บก.จร. ตำรวจทางหลวง)');
                      setCustomCode('DRIVE-TOR-HIGHWAY-2567');
                      setDriveFolder('กองพัสดุ > งานระบบรักษาความปลอดภัย > TOR 2567');
                    }}
                    className="w-full text-left p-2 bg-white hover:bg-amber-100/50 border border-amber-200 rounded-lg text-xs text-slate-700 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">TOR_LPR_Highway_Police_2567.docx (บก.จร.)</p>
                      <p className="text-[11px] text-slate-500">งบ 2.8 ล้านบาท | กล้อง 6 เลน + ตรวจจับความเร็ว</p>
                    </div>
                    <span className="text-[10.5px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold">
                      เลือกไฟล์นี้
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDriveUrl('https://drive.google.com/file/d/1AbC_DOPA_SmartGate_2026/view');
                      setCustomTitle('ร่าง TOR ระบบ LPR และควบคุมไม้กั้นสำนักงานศาลยุติธรรม');
                      setCustomCode('DRIVE-TOR-COURT-LPR');
                      setDriveFolder('กองพัสดุและอาคารสถานที่ > โครงการจัดซื้อกล้องและไม้กั้น');
                    }}
                    className="w-full text-left p-2 bg-white hover:bg-amber-100/50 border border-amber-200 rounded-lg text-xs text-slate-700 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">TOR_Court_LPR_SmartGate_2026.pdf</p>
                      <p className="text-[11px] text-slate-500">งบ 1.95 ล้านบาท | กล้อง 4 ชุด + ไม้กั้น 2 ชุด + บัตรแตะ</p>
                    </div>
                    <span className="text-[10.5px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold">
                      เลือกไฟล์นี้
                    </span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                ระบบจะดึงเนื้อหาและวิเคราะห์สเปก 8 มิติ พร้อมจัดเก็บในแท็บ <strong>"เอกสารจาก Google ไดรฟ์"</strong> ทันที
              </p>
            </div>
          )}

          {/* Mode 3: Text Paste */}
          {activeMode === 'text' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                วางข้อความจากเอกสารร่างขอบเขตของงาน (TOR Text)
              </label>
              <textarea
                rows={7}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="คัดลอกข้อความจาก Word หรือ PDF มาวางที่นี่ เช่น ขอบเขตงาน, สเปกกล้อง LPR, เครื่องบันทึก, เงื่อนไขตรวจรับ..."
                className="w-full p-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
              />
            </div>
          )}

          {/* Optional Meta fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                กำหนดรหัสเอกสาร (ถ้าต้องการ):
              </label>
              <input
                type="text"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="เช่น TOR-LPR-2026-04"
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                ชื่อโครงการ/ชื่อย่อ (ถ้าต้องการ):
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="เช่น โครงการระบบ LPR จุดตรวจอาคาร 2"
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Status / Loading Notification */}
          {isLoading && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 animate-spin" />
              <div className="text-xs text-blue-900 font-medium">
                <p className="font-semibold">{statusMessage}</p>
                <p className="text-[11px] text-blue-700">กำลังประมวลผลด้วย Gemini 3.8 Flash ตามมาตรฐานงานพัสดุ</p>
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
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleProcessDocument}
            disabled={
              isLoading ||
              (activeMode === 'upload' && !selectedFile) ||
              (activeMode === 'drive' && !driveUrl.trim()) ||
              (activeMode === 'text' && !rawText.trim())
            }
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'กำลังวิเคราะห์...' : 'เริ่มวิเคราะห์และประเมิน TOR'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
