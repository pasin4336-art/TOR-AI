import { TORDocument } from '../types';

export const DEFAULT_TORS: TORDocument[] = [
  {
    id: 'mock-tor-01',
    code: 'MOCK-TOR-LPR-01',
    title: 'โครงการจัดหาระบบตรวจจับทะเบียนรถเข้า-ออกสำนักงาน (แบบพื้นฐาน: 1 จุดเข้า-ออก พร้อมระบบบันทึกและค้นหาทะเบียน)',
    submitter: 'บริษัท สยาม ซีเคียวริตี้ ซิสเต็มส์ จำกัด (ผู้ยื่นข้อเสนอที่ 1)',
    budget: '650,000 บาท',
    rawBudgetNumber: 650000,
    duration: '60 วัน นับถัดจากวันลงนามในสัญญา',
    durationDays: 60,
    scope: 'ติดตั้งระบบตรวจจับและอ่านป้ายทะเบียนรถ ประตูหลัก 1 จุด แยกช่องทางเข้า 1 ช่อง และทางออก 1 ช่อง พร้อมระบบบันทึกภาพและค้นหาทะเบียนรถย้อนหลัง สำหรับเจ้าหน้าที่ รปภ. และผู้ดูแลระบบไอที',
    hardware: [
      'กล้องอ่านป้ายทะเบียน LPR ความละเอียด >= 2 MP มี IR/แสงช่วยกลางคืน รองรับ WDR จำนวน 2 ชุด',
      'เครื่องบันทึก/เซิร์ฟเวอร์ จัดเก็บฐานข้อมูลและภาพเหตุการณ์ >= 90 วัน จำนวน 1 ชุด',
      'PoE Network Switch รองรับพอร์ต PoE เพียงพอ มี VLAN จำนวน 1 ชุด',
      'เครื่องสำรองไฟ (UPS) สำรองไฟ >= 15 นาที จำนวน 1 ชุด',
      'ตู้กันน้ำ สายสัญญาณ อุปกรณ์ป้องกันไฟกระชาก เสา/ขายึด งานเก็บสาย 1 งาน'
    ],
    software: [
      'ซอฟต์แวร์ LPR และ Web Management 1 ระบบ',
      'ระบบตรวจจับป้ายทะเบียนรถยนต์ไทย บันทึก วัน/เวลา ช่องทาง ทิศทาง',
      'ค้นหาด้วยเลขทะเบียน ช่วงวัน-เวลา สถานะ Whitelist/Watchlist',
      'กำหนดสิทธิผู้ใช้ 3 ระดับ (ผู้ดูแลระบบ, รปภ., ผู้ตรวจสอบรายงาน)',
      'เกณฑ์ความถูกต้อง: อ่านทะเบียน >= 90% กลางวัน และ >= 85% กลางคืน, ตรวจจับ >= 95%',
      'ส่งออกรายงาน CSV/XLSX และบันทึก Audit Log เข้าสู่ระบบ/แก้ไข/ส่งออก'
    ],
    deliveryAndAcceptance: 'แบ่งตรวจรับ 6 รายการ: 1) ตรวจนับอุปกรณ์ครบตามสัญญา 2) ทดสอบอ่านทะเบียน 50 เที่ยวรถ 3) ทดสอบค้นหาและออกรายงาน 4) ทดสอบ Whitelist/Watchlist 5) ทดสอบสิทธิผู้ใช้ 6) ตรวจเอกสารคู่มือ Admin/User, Network Diagram',
    warrantyAndSla: 'รับประกันอุปกรณ์และระบบ >= 2 ปี, รับแจ้งเหตุภายใน 2 ชม.ทำการ และเริ่มวิเคราะห์ปัญหาภายใน 4 ชม.ทำการ, บริการตรวจสอบสุขภาพระบบ (PM) ทุก 6 เดือน, อัปเดตช่องโหว่ซอฟต์แวร์ฟรีตลอดช่วงรับประกัน',
    qualifications: 'เป็นผู้มีอาชีพขาย/รับจ้างกล้องวงจรปิด เครือข่าย หรือซอฟต์แวร์จัดการภาพ, ไม่เป็นผู้ทิ้งงานของทางราชการ, มีบุคลากรเครือข่าย/เซิร์ฟเวอร์ และช่างติดตั้งเพียงพอ, ไม่ผูกขาดเฉพาะยี่ห้อใด',
    experts: [
      {
        id: 'exp-01-1',
        name: 'นายกมลเดช ชัยมงคล',
        role: 'ผู้จัดการโครงการ (Project Manager)',
        experienceYears: 9,
        educationOrCert: 'วศ.บ. วิศวกรรมคอมพิวเตอร์, ใบรับรอง PMP Certified',
        responsibility: 'บริหารจัดการภาพรวม ควบคุมงวดงาน 60 วัน และประสานงานตรวจรับพัสดุ',
        licenseNumber: 'PMP #219804',
        keyProjects: ['โครงการติดตั้งกล้อง CCTV และระบบบันทึกทะเบียน มหาวิทยาลัยรามคำแหง', 'ระบบ LPR ประตูทางเข้า อบต.บางกรวย']
      },
      {
        id: 'exp-01-2',
        name: 'นายเอกชัย เลิศวิทยา',
        role: 'วิศวกรเครือข่ายและเซิร์ฟเวอร์ (Network & Server Engineer)',
        experienceYears: 7,
        educationOrCert: 'วท.บ. วิทยาการคอมพิวเตอร์, CCNA, MikroTik MTCNA',
        responsibility: 'กำหนดค่า Network Switch, จัดการ VLAN, เซิร์ฟเวอร์จัดเก็บฐานข้อมูล 90 วัน',
        keyProjects: ['ระบบเครือข่ายและศูนย์ข้อมูลย่อย อบจ.ชลบุรี']
      },
      {
        id: 'exp-01-3',
        name: 'นายวิทวัส ทองประเสริฐ',
        role: 'หัวหน้าช่างเทคนิคติดตั้งฮาร์ดแวร์ LPR (Hardware Lead)',
        experienceYears: 10,
        educationOrCert: 'ปวส. ช่างไฟฟ้าและอิเล็กทรอนิกส์, หนังสือรับรองความรู้ความสามารถช่างไฟฟ้าภายในอาคาร',
        responsibility: 'ควบคุมงานเดินสายสัญญาณ UTP/Fiber, ติดตั้งเสากล้อง และระบบ Surge Protection',
        licenseNumber: 'ชฟ. 44109',
        keyProjects: ['งานปรับปรุงระบบกล้องวงจรปิด อาคารที่ทำการไปรษณีย์ไทย 12 สาขา']
      }
    ],
    strengths: [
      'งบประมาณประหยัด เหมาะสมกับงบประมาณขนาดเล็ก (650,000 บาท)',
      'ระยะเวลาดำเนินการกระชับ เพียง 60 วัน ส่งมอบงานได้รวดเร็ว',
      'ระบบพื้นฐานครบถ้วน มีสิทธิผู้ใช้ 3 ระดับ และ Audit Log ตามระเบียบราชการเบื้องต้น',
      'เกณฑ์ตรวจรับชัดเจน (ทดสอบ 50 เที่ยวรถ พร้อมภาพถ่ายและ Log)'
    ],
    weaknesses: [
      'ไม่มีระบบควบคุมไม้กั้นอัตโนมัติ (Barrier Gate) ทำได้เฉพาะบันทึกและแจ้งเตือน',
      'กล้องความละเอียดขั้นต่ำ 2 MP ไม่มีกล้อง Overview สำหรับมองมุมกว้างของตัวรถ',
      'ไม่มีระบบลงทะเบียนผู้มาติดต่อล่วงหน้า (Visitor Management)',
      'ระยะเวลารับประกันเพียง 2 ปี (น้อยกว่า TOR อื่นที่ให้ 3-5 ปี)',
      'ไม่รองรับระบบประมวลผลที่ขอบเครือข่าย (Edge AI) หากเซิร์ฟเวอร์ล่มจะหยุดทำงาน'
    ],
    scores: {
      timeline: 9.5,
      expertise: 7.0,
      scope: 6.5,
      technical: 6.5,
      price: 9.5
    },
    scoreRationales: {
      timeline: 'ระยะเวลา 60 วัน มีความกระชับสูง สอดคล้องกับขนาดงาน 1 ประตู เหมาะกับกรณีที่หน่วยงานต้องการเร่งรัดเบิกจ่ายงบประมาณ',
      expertise: 'กำหนดคุณสมบัติพื้นฐานทั่วไป ไม่ได้ระบุมูลค่าสัญญาผลงานเดิมขั้นต่ำ หรือหนังสือรับรองผลงานเฉพาะทางระดับสูง',
      scope: 'ครอบคลุมเฉพาะงานตรวจจับและค้นหา 1 ประตู (2 เลน) ขาดส่วนเชื่อมต่อไม้กั้นและระบบผู้มาติดต่อ',
      technical: 'สถาปัตยกรรมแบบรวมศูนย์พื้นฐาน กล้อง 2 MP ความแม่นยำ 90%/85% เหมาะกับงานระดับเริ่มต้น',
      price: 'วงเงินงบประมาณ 650,000 บาท มีความคุ้มค่าสูงสุดสำหรับหน่วยงานที่ต้องการเพียงระบบตรวจจับป้ายทะเบียนพื้นฐาน'
    },
    sourceType: 'preset',
    hasBarrierGate: false,
    architectureType: 'central_server',
    warrantyYears: 2
  },
  {
    id: 'mock-tor-02',
    code: 'MOCK-TOR-LPR-02',
    title: 'โครงการระบบ AI ตรวจจับทะเบียนและควบคุมรถเข้า-ออกสำนักงาน (แบบบูรณาการ: LPR + Barrier Gate + Visitor/Employee Access)',
    submitter: 'บริษัท ดิจิทัล อินฟราสตรัคเจอร์ โซลูชั่นส์ จำกัด (ผู้ยื่นข้อเสนอที่ 2)',
    budget: '1,850,000 บาท',
    rawBudgetNumber: 1850000,
    duration: '90 วัน นับถัดจากวันลงนามในสัญญา',
    durationDays: 90,
    scope: 'ติดตั้งระบบ AI ตรวจจับทะเบียน บูรณาการร่วมกับระบบไม้กั้นอัตโนมัติ (Barrier Gate) 2 ชุด ประตูเข้า-ออก พร้อมกล้อง Overview, Edge/AI Controller 2 ชุด, ระบบลงทะเบียนผู้มาติดต่อ (Visitor Access) ด้วย QR Code และ REST API',
    hardware: [
      'กล้อง LPR Camera 4 ชุด (2 ช่องทางเข้า-ออก พร้อมภาพป้ายและภาพรถ)',
      'กล้อง Overview Camera 4 ชุด (ภาพรวมรถและบริเวณไม้กั้นเพื่อยืนยันเหตุการณ์)',
      'ไม้กั้นอัตโนมัติ Barrier Gate 2 ชุด รองรับ Dry Contact/API พร้อม Safety Sensor ป้องกันไม้ตีรถ/บุคคล และ Manual Release',
      'Edge/AI Controller 2 ชุด ประมวลผลใกล้หน้างานและสั่งงานไม้กั้นตาม Access Policy',
      'Application/Database Server 1 ชุด ติดตั้งภายในศูนย์ข้อมูลหรือ VM',
      'UPS สำรองไฟอุปกรณ์ประตูอย่างน้อย 30 นาที พร้อม Surge Protection'
    ],
    software: [
      'AI/LPR Engine รองรับป้ายทะเบียนไทย ตัวเลข/อักษร/จังหวัด แสดง Confidence Score',
      'รองรับจำแนกประเภทรถ (เก๋ง, กระบะ, ตู้, จยย.) และตรวจจับกลุ่มสีรถ',
      'เกณฑ์: Detection Rate >= 97%, Accuracy >= 92% กลางวัน, 88% กลางคืน, Latency <= 2.5 วินาที',
      'Web Management: Access Policy, Visitor Booking พร้อม QR Code, Threshold Human Review',
      'ระบบรักษาความปลอดภัย: HTTPS, RBAC, MFA สำหรับ Admin, Password Hashing, Audit Log ครบวงจร',
      'REST API และ Webhook สำหรับ Watchlist Alert และเชื่อมต่อระบบ HR/Visitor ภายนอก'
    ],
    deliveryAndAcceptance: 'แบ่งแผนงาน 5 ช่วง (12-13 สัปดาห์) การตรวจรับ UAT 8 รายการ: อ่านทะเบียนกลางวัน 100 เที่ยว (>= 92%), กลางคืน 50 เที่ยว (>= 88%), ทดสอบเปิดไม้กั้นตามสิทธิ, ทดสอบรถไม่มีสิทธิ, Confidence ต่ำเข้า Human Review, Safety Sensor, Audit Log, และ Backup/Restore',
    warrantyAndSla: 'รับประกันระบบและอุปกรณ์ >= 3 ปี, รับแจ้งเหตุวิกฤตภายใน 30 นาที แก้ไขตาม SLA, มีอะไหล่สำรอง (Spare Part) สำหรับกล้อง LPR/Controller/Barrier, PM ตรวจบำรุงรักษาอย่างน้อยปีละ 2 ครั้ง พร้อมรายงานวิเคราะห์เหตุขัดข้อง',
    qualifications: 'เป็นผู้มีอาชีพเกี่ยวกับกล้องวงจรปิด/Access Control, มีบุคลากรเครือข่าย/เซิร์ฟเวอร์/ช่างติดตั้งครบถ้วน, มีผลงานระบบ LPR/Access Control ใกล้เคียงอย่างน้อย 1 ผลงาน, ต้องมีแผนทดสอบความปลอดภัย (Security Test) ก่อนส่งมอบ',
    experts: [
      {
        id: 'exp-02-1',
        name: 'ดร.ปิยวัฒน์ ธนโชคกุล',
        role: 'หัวหน้าทีมวิจัยและพัฒนา AI & Computer Vision (AI Lead)',
        experienceYears: 11,
        educationOrCert: 'ปร.ด. วิศวกรรมคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย, NVIDIA Certified Deep Learning Specialist',
        responsibility: 'พัฒนาและปรับจูนโมเดล AI LPR ทะเบียนไทย, Confidence Score, และระบบจำแนกประเภทรถ',
        keyProjects: ['ระบบอ่านป้ายทะเบียน M-Flow กรมทางหลวง 6 ด่าน', 'ระบบตรวจจับยานพาหนะฝ่าฝืนสัญญาณไฟ กทม.']
      },
      {
        id: 'exp-02-2',
        name: 'นายธีรภัทร วัฒนพงศ์',
        role: 'ผู้จัดการโครงการอาวุโส (Senior PM / Certified PMP)',
        experienceYears: 14,
        educationOrCert: 'วศ.ม. เทคโนโลยีสารสนเทศ, PMP Certified, PRINCE2 Practitioner',
        responsibility: 'วางแผนงาน 90 วัน ควบคุมงานบูรณาการระหว่างระบบ LPR, ไม้กั้น และ Visitor API',
        licenseNumber: 'PMP #187652',
        keyProjects: ['ระบบ Access Control และ Visitor Management อาคารศูนย์ราชการเฉลิมพระเกียรติฯ']
      },
      {
        id: 'exp-02-3',
        name: 'น.ส.มนัสชนก สุขสำราญ',
        role: 'วิศวกรความมั่นคงปลอดภัยและ PDPA Compliance (Security Specialist)',
        experienceYears: 8,
        educationOrCert: 'วศ.บ. ความมั่นคงปลอดภัยไซเบอร์, CISSP, CISA Certified',
        responsibility: 'ตรวจสอบความปลอดภัยระบบ API, การเข้ารหัส HTTPS/Database, และจัดทำแบบบันทึก PDPA',
        licenseNumber: 'CISSP #643190',
        keyProjects: ['การประเมินช่องโหว่ความปลอดภัยไซเบอร์ สำนักงาน ก.พ.ท.']
      },
      {
        id: 'exp-02-4',
        name: 'นายศรัณย์ อัศวเมธา',
        role: 'วิศวกรระบบแมคคาทรอนิกส์และไม้กั้นอัตโนมัติ (Mechatronics Lead)',
        experienceYears: 9,
        educationOrCert: 'วศ.บ. วิศวกรรมเครื่องกล, ใบอนุญาตประกอบวิชาชีพวิศวกรรมควบคุม (กว. ภาคีวิศวกร)',
        responsibility: 'คำนวณฐานรากไม้กั้น, ติดตั้ง Safety Loop Detector, Safety Radar และ Dry Contact Relay',
        licenseNumber: 'ภก. 54210',
        keyProjects: ['ติดตั้งระบบไม้กั้นและตู้จำหน่ายบัตรอัตโนมัติ ลานจอดรถศูนย์การค้าเซ็นทรัล 3 สาขา']
      }
    ],
    strengths: [
      'ระบบบูรณาการครบวงจร ทั้งตรวจจับทะเบียนและสั่งการไม้กั้นอัตโนมัติ (Barrier Gate)',
      'มีกล้อง Overview เพิ่มเติม 4 ชุด สำหรับบันทึกภาพตัวรถและคนขับ เสริมหลักฐานทางคดี',
      'มี Edge/AI Controller ช่วยประมวลผลหน้างาน ลดเวลาตัดสินใจเหลือ <= 2.5 วินาที',
      'มีระบบ Visitor Management รองรับการนัดหมายล่วงหน้าและสร้าง QR Code',
      'สอดคล้องกับ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) มี Retention Policy และห้ามนำภาพไปเทรนโมเดลนอกระบบ',
      'รับประกัน 3 ปี พร้อมสต็อกอะไหล่สำรอง (Spare Parts) หน้างาน'
    ],
    weaknesses: [
      'งบประมาณสูงกว่าแบบพื้นฐานเกือบ 3 เท่า (1,850,000 บาท)',
      'ระยะเวลา 90 วัน ต้องมีการประสานงานปรับปรุงหน้างานโครงสร้างโยธาและเดินสายสำหรับไม้กั้น',
      'ต้องการบุคลากรดูแลรักษาที่มีความรู้ทั้งด้านฮาร์ดแวร์ไม้กั้นและซอฟต์แวร์เครือข่าย'
    ],
    scores: {
      timeline: 8.5,
      expertise: 8.8,
      scope: 9.2,
      technical: 9.0,
      price: 8.5
    },
    scoreRationales: {
      timeline: '90 วัน ถือว่าเหมาะสมกับปริมาณงานที่รวมงานติดตั้งไม้กั้น งานเดินท่อร้อยสาย และงานพัฒนาเชื่อมต่อ API',
      expertise: 'กำหนดให้มีผลงานติดตั้ง LPR/Access Control เดิมอย่างน้อย 1 สัญญา และแผนทดสอบความปลอดภัย',
      scope: 'ครอบคลุมครบทั้ง LPR, กล้อง Overview, ไม้กั้นอัตโนมัติ, ระบบ Visitor, และความปลอดภัย PDPA',
      technical: 'สถาปัตยกรรม Edge Controller + Overview Camera + AI Confidence Score มีความพร้อมใช้งานสูง',
      price: 'วงเงิน 1,850,000 บาท มีความสมเหตุสมผลสูงต่อฟังก์ชันที่ได้รับ ถือเป็นจุดคุ้มค่าทางเศรษฐศาสตร์สำหรับอาคารสำนักงานทั่วไป'
    },
    sourceType: 'preset',
    hasBarrierGate: true,
    architectureType: 'hybrid',
    warrantyYears: 3
  },
  {
    id: 'mock-tor-03',
    code: 'MOCK-TOR-LPR-03',
    title: 'โครงการระบบตรวจจับทะเบียนรถและบริหารจุดเข้า-ออกแบบศูนย์กลาง (แบบความมั่นคงสูง: Multi-Gate + High Availability + Security Monitoring)',
    submitter: 'บริษัท เอ็นเตอร์ไพรส์ ซิสเต็ม อินทิเกรชั่น (ไทยแลนด์) จำกัด (ผู้ยื่นข้อเสนอที่ 3)',
    budget: '4,950,000 บาท',
    rawBudgetNumber: 4950000,
    duration: '120 วัน นับถัดจากวันลงนามในสัญญา',
    durationDays: 120,
    scope: 'บริหารจัดการระบบเข้า-ออก 4 ประตู รวม 8 ช่องทางรถแบบศูนย์กลางระดับ Enterprise (Central Command Dashboard) รองรับ High Availability (HA) ทำงานแบบ Edge Offline Mode ได้แม้โครงข่าย WAN ขัดข้อง พร้อมระบบ Security Monitoring เชื่อมต่อ SIEM',
    hardware: [
      'กล้อง LPR Camera 8 ชุด + Overview Camera 8 ชุด รวม 16 ชุด สำหรับ 8 เลนจราจร',
      'Edge Controller ประจำทุกประตู พร้อม Gate I/O รองรับ Store-and-Forward',
      'Managed Switch รองรับ VLAN, VPN, Firewall Rule ตามหลัก Least Privilege',
      'Central Management Cluster รองรับผู้ใช้พร้อมกัน >= 50 Sessions',
      'ระบบ Database Primary + Replica/Backup (Full Backup รายวัน + Log/Incremental เก็บ >= 30 วัน)',
      'ระบบ Health & Log Monitoring แจ้งเตือนกล้อง Offline, Storage ใกล้เต็ม, Time Drift'
    ],
    software: [
      'Central Command Dashboard: แสดงผล Real-time 4 ประตู 8 ช่องทาง, Map/Floor Plan View, Incident Queue',
      'ความแม่นยำ: Accuracy >= 94% กลางวัน, 90% กลางคืน, Lane Throughput >= 15 คัน/นาที/ช่องทาง',
      'ความพร้อมใช้งาน Availability >= 99.5% ต่อเดือน, RPO <= 24 ชม., RTO <= 8 ชม.',
      'กลไกป้องกันการแก้ไขหลักฐาน Snapshot Hash ตรวจสอบความถูกต้องของไฟล์รูปภาพ',
      'Cybersecurity & PDPA: Network Segmentation, TLS, MFA, Centralized Audit Log ส่ง Syslog/CEF, Masking เลขทะเบียนบนหน้าจอ, Retention Policy 365 วัน',
      'REST API แบบมี Token/OAuth, Rate Limit, Webhook และการนำเข้า CSV/XLSX จำนวนมาก'
    ],
    deliveryAndAcceptance: 'แบ่งการตรวจรับ 10 ขั้นตอน (UAT ครบ 8 เลน, ทดสอบ WAN Disconnect ดูว่า Edge ตัดสินใจจาก Cache ได้, Server Failover, DR Backup/Restore, ตรวจสอบช่องโหว่ VA Report ปิด Critical/High, RBAC/MFA, SIEM Log, Incident Workflow, Performance Test) พร้อม As-built Diagram, Data Flow Diagram, Data Dictionary และอบรมผู้ดูแลระบบ 2 รุ่น (รุ่นละ 6 ชม.) และเจ้าหน้าที่ 2 รุ่น (รุ่นละ 3 ชม.)',
    warrantyAndSla: 'รับประกันรวม >= 3 ปี, SLA 4 ระดับ (P1 Critical: ตอบรับใน 15 นาที กู้คืนใน 4 ชม.), Preventive Maintenance ทุกไตรมาส (ปีละ 4 ครั้ง), รายงาน Monthly Health Report ในช่วง 6 เดือนแรก และแจ้งเตือนช่องโหว่ Patch/Update',
    qualifications: 'ต้องมีทีมงานเฉพาะด้าน System Integration, Network/Security และ Application Administration, ต้องจัดทำ Risk Register แผนบริหารความเสี่ยงตลอดโครงการ และแผน Migration นำเข้าข้อมูลเดิม',
    experts: [
      {
        id: 'exp-03-1',
        name: 'ดร.วรพงศ์ จิตต์อนันต์',
        role: 'ผู้อำนวยการด้านสถาปัตยกรรมระบบ Enterprise (Chief System Architect)',
        experienceYears: 18,
        educationOrCert: 'ปร.ด. วิศวกรรมไฟฟ้าและสารสนเทศ สถาบัน MIT (Fellow), IEEE Senior Member',
        responsibility: 'ออกแบบสถาปัตยกรรม High Availability 4 ประตู 8 เลน และระบบ Centralized Command',
        keyProjects: ['ศูนย์สั่งการและควบคุมระบบตรวจจับยานพาหนะอัจฉริยะ สำนักงานตำรวจแห่งชาติ (บช.น.)', 'ระบบ Core Switch & HA Cluster การรถไฟแห่งประเทศไทย']
      },
      {
        id: 'exp-03-2',
        name: 'น.ส.กัญญาณัฐ บุญยรัตน์',
        role: 'ผู้จัดการโครงการระดับ Enterprise (Senior Enterprise PM)',
        experienceYears: 15,
        educationOrCert: 'MBA, วศ.บ. คอมพิวเตอร์ เกียรตินิยมอันดับ 1, PMP Certified, Agile Scrum Master',
        responsibility: 'บริหารความเสี่ยง (Risk Register), กำกับดูแลการส่งมอบ 120 วัน และการตรวจรับ UAT 10 ขั้นตอน',
        licenseNumber: 'PMP #142098',
        keyProjects: ['โครงการบูรณาการระบบกล้องวงจรปิด LPR และ Access Control ท่าอากาศยานสุวรรณภูมิ', 'ระบบ e-Pass ทางเข้าทำเนียบรัฐบาล']
      },
      {
        id: 'exp-03-3',
        name: 'นายอัครินทร์ สินธุชัย',
        role: 'ผู้เชี่ยวชาญความมั่นคงปลอดภัยไซเบอร์ระดับสูง (Cybersecurity Architect)',
        experienceYears: 13,
        educationOrCert: 'วท.ม. Information Security, CISSP, CISM, CEH Master, Cloud Security Certified',
        responsibility: 'ดูแลระบบ Least Privilege Firewall, การเชื่อมต่อ SIEM Syslog, และการเข้ารหัส Hash ตรวจสอบพยานหลักฐาน',
        licenseNumber: 'CISSP #509823',
        keyProjects: ['ระบบเฝ้าระวังภัยคุกคามทางไซเบอร์และ SOC หน่วยงานรัฐวิสาหกิจด้านพลังงาน']
      },
      {
        id: 'exp-03-4',
        name: 'นายธีรเดช โรจนศิลป์',
        role: 'วิศวกรอาวุโสระบบฐานข้อมูลและ High Availability (Senior DBA / HA Lead)',
        experienceYears: 12,
        educationOrCert: 'วศ.บ. คอมพิวเตอร์, Oracle Certified Master (OCM), AWS Solutions Architect Pro',
        responsibility: 'ออกแบบ Database Replication Primary-Replica, DR Backup/Restore, และ RTO/RPO',
        keyProjects: ['ระบบฐานข้อมูลข้อมูลประชากรและทะเบียนยานพาหนะ ธนาคารพาณิชย์ขนาดใหญ่']
      }
    ],
    strengths: [
      'รองรับขนาดองค์กรขนาดใหญ่ 4 ประตู 8 ช่องทาง บริหารจัดการแบบรวมศูนย์ (Centralized)',
      'สถาปัตยกรรม High Availability รองรับ Edge Offline Mode กรณีอินเทอร์เน็ตหรือเครือข่ายล่ม ประตูยังเปิดได้จาก Local Cache',
      'มาตรฐานความมั่นคงปลอดภัยไซเบอร์ระดับ Enterprise (Network Segmentation, MFA, SIEM Syslog, VA Scan)',
      'มีกลไก Snapshot Hash ป้องกันการปลอมแปลงพยานหลักฐานสำหรับใช้ดำเนินคดีตามกฎหมาย',
      'SLA สูงสุด (P1 ตอบกลับใน 15 นาที, กู้คืนใน 4 ชม.) พร้อม PM ทุกไตรมาส'
    ],
    weaknesses: [
      'วงเงินงบประมาณสูงมาก (4,950,000 บาท) เกินความจำเป็นสำหรับสำนักงานขนาดเล็กหรือขนาดกลาง',
      'ระยะเวลาดำเนินการ 120 วัน และมีความซับซ้อนในการประสานงานระหว่างฝ่ายเครือข่ายและอาคาร',
      'ต้องการผู้ดูแลระบบที่มีความชำนาญสูงด้าน Linux Cluster, Database Replication และ Network Security'
    ],
    scores: {
      timeline: 7.5,
      expertise: 9.8,
      scope: 9.8,
      technical: 9.9,
      price: 6.8
    },
    scoreRationales: {
      timeline: '120 วัน ถือว่าใช้เวลาค่อนข้างนาน เหมาะสมกับขอบเขตขนาดใหญ่ 8 เลน แต่ไม่ตอบโจทย์โครงการเร่งด่วน',
      expertise: 'เกณฑ์ความเชี่ยวชาญเข้มงวดที่สุด ต้องการทีม System Integration, Network Security, Risk Register และ Data Migration',
      scope: 'ขอบเขตครอบคลุมสูงสุด 4 ประตู 8 ช่องทาง ครอบคลุมถึงระดับ DR, RTO/RPO และ Incident Response Queue',
      technical: 'สถาปัตยกรรมระดับ Enterprise ชัดเจน มีทั้ง HA Cluster, Edge Cache, Hash Verification และ SIEM Syslog',
      price: 'วงเงิน 4,950,000 บาท ราคาสูง ต้องพิจารณาความพร้อมด้านงบประมาณและประโยชน์ที่ได้รับของหน่วยงาน'
    },
    sourceType: 'preset',
    hasBarrierGate: true,
    architectureType: 'hybrid',
    warrantyYears: 3
  },
  {
    id: 'mock-tor-04',
    code: 'SPEC-LPR-EDGE-01',
    title: 'รายละเอียดคุณลักษณะเฉพาะ (Specification) ฉบับคู่เทียบ: สถาปัตยกรรมแบบประมวลผลที่ขอบเครือข่าย (Edge AI Architecture)',
    submitter: 'บริษัท นวัตกรรมเอไอ ไฮเทค คอร์ปอเรชั่น จำกัด (ผู้ยื่นข้อเสนอคู่เทียบ)',
    budget: '1,450,000 บาท (ประมาณการ)',
    rawBudgetNumber: 1450000,
    duration: '120 วัน นับถัดจากวันลงนามในสัญญา',
    durationDays: 120,
    scope: 'จัดหาระบบอ่านป้ายทะเบียนรถยนต์อัตโนมัติ (LPR) สถาปัตยกรรมประมวลผลที่ตัวกล้องโดยตรง (Edge AI Deep Learning) เพื่อลดภาระเซิร์ฟเวอร์ส่วนกลาง (Server-less LPR) สั่งเปิดไม้กั้นได้จากตัวกล้องตรงผ่าน Relay Output มี NVR/Management Server 16 TB',
    hardware: [
      'กล้อง Edge AI LPR Camera ความละเอียดสูงไม่น้อยกว่า 5 Megapixel (2592 x 1944 พิกเซล) ชนิด CMOS Sensor',
      'ระบบ Deep Learning Algorithm ฝังตัวในกล้อง (Built-in Edge Analytics)',
      'Relay Output / Alarm Out จากตัวกล้องโดยตรงอย่างน้อย 1 ช่อง สั่งเปิดไม้กั้นในตัวโดยไม่ต้องรอ Server',
      'มีช่องใส่ SD Card สำรองข้อมูลภายในตัวกล้อง (Edge Storage) ขนาด 256 GB สำหรับบันทึกเมื่อเครือข่ายขัดข้อง',
      'รองรับเทคโนโลยี Low Light / Starlight Technology ทำงานในที่แสงน้อยได้ดีเยี่ยม',
      'อุปกรณ์บันทึก NVR/Management Server Rack Mount แบนด์วิดท์ >= 256 Mbps ความจุรวม >= 16 TB'
    ],
    software: [
      'ซอฟต์แวร์ Web-based Application ทำงานแบบ Client-less ไม่ต้องลงโปรแกรมเสริม',
      'อ่านป้ายทะเบียนภาษาไทย หมวดอักษร ตัวเลข จังหวัด ความแม่นยำรวมไม่น้อยกว่า 98%',
      'หน้าจอแสดงผล Real-time Dashboard แสดงภาพรถ ป้ายทะเบียน สถานะ',
      'การเชื่อมต่อ Push Notification ผ่าน Webhook, MQTT หรือ WebSocket แบบ Real-time',
      'Open REST API (JSON) สำหรับระบบ HR และ Visitor Management เพิ่ม/ลบ Whitelist/Blacklist อัตโนมัติ'
    ],
    deliveryAndAcceptance: 'จัดหา ติดตั้ง ตั้งค่า บูรณาการ API และจัดฝึกอบรมภายใน 120 วัน แบ่งงวดงานติดตั้งและการเชื่อมโยงข้อมูล',
    warrantyAndSla: 'ระยะเวลารับประกันยาวนานเป็นพิเศษไม่น้อยกว่า 5 ปี (60 เดือน) แบบครอบคลุมค่าแรงและค่าอะไหล่ทั้งหมด (Comprehensive Warranty), บริการ Support แบบ 8x5 ตอบสนองรีโมตใน 4 ชม., การเปลี่ยนอะไหล่ทดแทนแบบ Next Business Day (NBD On-site Service) ภายในวันทำการถัดไป, บำรุงรักษาเชิงป้องกัน (PM) ปีละ 2 ครั้ง รวม 10 ครั้งตลอด 5 ปี',
    qualifications: 'นิติบุคคลผู้มีความเชี่ยวชาญด้านระบบวิเคราะห์ภาพปัญญาประดิษฐ์และกล้องวงจรปิด มีทีมงานวิศวกรที่ได้รับการรับรองจากผู้ผลิตอุปกรณ์ Edge AI',
    experts: [
      {
        id: 'exp-04-1',
        name: 'นายธนกฤต วิเศษวรการ',
        role: 'วิศวกรผู้เชี่ยวชาญเทคโนโลยี Edge AI & Embedded Vision (Edge AI Specialist)',
        experienceYears: 10,
        educationOrCert: 'วศ.ม. ปัญญาประดิษฐ์และหุ่นยนต์, NVIDIA Jetson Certified AI Specialist',
        responsibility: 'ปรับแต่ง On-device Deep Learning 5MP ในตัวกล้อง, Direct Relay Triggering, และ Starlight Tuning',
        keyProjects: ['ระบบกล้อง AI อัจฉริยะตรวจจับยานพาหนะบนทางด่วนพิเศษ กทพ.', 'กล้องตรวจจับการฝ่าฝืนเลนจักรยาน เทศบาลนครนนทบุรี']
      },
      {
        id: 'exp-04-2',
        name: 'นายปรเมษฐ์ สิริโภคิน',
        role: 'ผู้จัดการโครงการและวิศวกรสื่อสารโทรคมนาคม (Telecom & Project Lead)',
        experienceYears: 8,
        educationOrCert: 'วศ.บ. โทรคมนาคม, PMP Certified, Certified IoT Professional',
        responsibility: 'บริหารสัญญาบริการบำรุงรักษา 5 ปีเต็ม (60 เดือน), การเปลี่ยนอะไหล่ NBD, และบริการ 8x5',
        licenseNumber: 'PMP #231105',
        keyProjects: ['โครงการเมืองอัจฉริยะ (Smart City IoT) ติดตั้งกล้องวงจรปิดและเซนเซอร์ 150 จุด']
      },
      {
        id: 'exp-04-3',
        name: 'นายชลธี ปิ่นเกษร',
        role: 'วิศวกรบูรณาการระบบ IoT และ Open API (API & IoT Engineer)',
        experienceYears: 7,
        educationOrCert: 'วท.บ. เทคโนโลยีสารสนเทศ, AWS Certified Solutions Architect Associate',
        responsibility: 'เชื่อมต่อ Webhook, MQTT, WebSocket เข้ากับระบบ BMS อาคารสำนักงานและ Line Notification',
        keyProjects: ['ระบบสมาร์ทแคมปัส มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี']
      }
    ],
    strengths: [
      'กล้องความละเอียดสูงถึง 5 MP (สูงที่สุดในทุก TOR) ช่วยให้อ่านป้ายทะเบียนและสภาพรถคมชัดเป็นพิเศษ',
      'เทคโนโลยี Edge AI ฝัง Deep Learning ในตัวกล้อง สั่งเปิดไม้กั้นผ่าน Relay ในตัวได้โดยตรง ไม่ต้องรอเซิร์ฟเวอร์',
      'มี Edge Storage (SD Card 256 GB) ในตัวกล้อง บันทึกได้ต่อเนื่องแม้สาย LAN ขาด',
      'ระยะเวลารับประกันยาวนานที่สุดถึง 5 ปี (60 เดือน) ครอบคลุมทั้งค่าแรงและค่าอะไหล่ ช่วยประหยัดงบประมาณบำรุงรักษาระยะยาว',
      'รองรับโพรโทคอลสมัยใหม่ทั้ง MQTT, WebSocket, Webhook สำหรับ Smart Building / IoT'
    ],
    weaknesses: [
      'ระยะเวลาส่งมอบ 120 วัน นานกว่าแบบบูรณาการทั่วไป (90 วัน)',
      'ระดับ SLA กำหนดแบบ 8x5 (จันทร์-ศุกร์ เวลาราชการ) ไม่ครอบคลุมวันหยุดเสาร์-อาทิตย์ หรือเวลากลางคืน',
      'การเปลี่ยนอะไหล่กำหนดเป็น Next Business Day (NBD) อาจทำให้ประตูหยุดทำงานชั่วคราวได้นานกว่าแบบมี Spare Part ทันทีหน้างาน'
    ],
    scores: {
      timeline: 7.8,
      expertise: 8.5,
      scope: 8.8,
      technical: 9.6,
      price: 9.0
    },
    scoreRationales: {
      timeline: '120 วัน ค่อนข้างนานเมื่อเทียบกับงานระดับ 1-2 ประตู แต่สมเหตุสมผลสำหรับอุปกรณ์นำเข้าและงานทดสอบ AI บนตัวกล้อง',
      expertise: 'ระบุความเชี่ยวชาญด้าน Edge AI และ Deep Learning อย่างชัดเจน',
      scope: 'ขอบเขตงานชัดเจน เน้นสถาปัตยกรรม Edge และการเชื่อมต่อ Open API กับระบบภายนอก',
      technical: 'เทคโนโลยีกล้อง 5MP + Built-in AI + Starlight + Direct Relay Output ทันสมัยและทนทานต่อการล่มของระบบเครือข่าย',
      price: 'ราคาประมาณการ 1,450,000 บาท คุ้มค่ามากเมื่อคำนวณรวมระยะเวลารับประกัน 5 ปีเต็ม (TCO ในระยะยาวต่ำสุด)'
    },
    sourceType: 'preset',
    hasBarrierGate: true,
    architectureType: 'edge_ai',
    warrantyYears: 5
  },
  {
    id: 'drive-tor-01',
    code: 'DRIVE-TOR-MOI-2567',
    title: 'ร่าง TOR ระบบกล้องตรวจจับป้ายทะเบียนและระบบรักษาความปลอดภัยอัจฉริยะ (กระทรวงมหาดไทย)',
    submitter: 'สำนักงานปลัดกระทรวง (เชื่อมโยงผ่าน Google Drive กองพัสดุ)',
    budget: '2,200,000 บาท',
    rawBudgetNumber: 2200000,
    duration: '90 วัน นับถัดจากวันลงนามในสัญญา',
    durationDays: 90,
    scope: 'จัดหาระบบ LPR พร้อมระบบไม้กั้นความเร็วสูง 4 ช่องทาง มีระบบอ่านบัตรประชาชน Smart Card ควบคู่การอ่านป้ายทะเบียนรถยนต์สำหรับผู้มาติดต่อ บันทึกภาพลง Cloud Storage ภาครัฐ',
    hardware: [
      'กล้อง LPR 4K Bullet IP Camera พร้อมอินฟราเรดระยะ 30 เมตร จำนวน 4 ชุด',
      'ชุดไม้กั้นอัตโนมัติความเร็วสูง 1.5 วินาที พร้อม Safety Loop และ Laser Sensor 4 ชุด',
      'เครื่องอ่านบัตรประชาชน Smart Card Reader ชนิดกันน้ำและฝุ่น IP65 จำนวน 2 ชุด',
      'Server Rack 2U ติดตั้งใน Data Center กลาง 1 ชุด พร้อม UPS 2 kVA'
    ],
    software: [
      'AI OCR รองรับป้ายทะเบียนรถยนต์ รถจักรยานยนต์ และป้ายประมูล/ป้ายทูต',
      'โมดูลเชื่อมโยงฐานข้อมูลทะเบียนยานพาหนะภาครัฐผ่าน Secure API',
      'ระบบบริหารจัดการผู้มาติดต่อ (Smart Visitor Pass) ผ่าน QR Code',
      'เกณฑ์ความถูกต้อง: อ่านทะเบียน >= 95% กลางวัน, 92% กลางคืน'
    ],
    deliveryAndAcceptance: 'แบ่งงวดส่งมอบ 4 งวดงาน ตรวจรับระบบและทดสอบเชื่อมต่อเครือข่ายความมั่นคงปลอดภัยภาครัฐ GIN',
    warrantyAndSla: 'รับประกัน 3 ปี ซ่อมแซมแบบ On-site Service SLA ตอบสนองภายใน 1 ชม. ตลอด 24 ชม.',
    qualifications: 'นิติบุคคลมีทุนจดทะเบียนไม่น้อยกว่า 10 ล้านบาท และมีผลงานติดตั้งระบบ LPR ให้หน่วยงานราชการไม่น้อยกว่า 2 ล้านบาท',
    experts: [
      {
        id: 'exp-drv-1',
        name: 'นายเกียรติศักดิ์ บุญประคอง',
        role: 'หัวหน้าคณะทำงานและสถาปนิกโครงข่ายรัฐ (Network Architect Lead)',
        experienceYears: 16,
        educationOrCert: 'วศ.ม. คอมพิวเตอร์, วศ.บ. โทรคมนาคม, หนังสือรับรองวิศวกรชำนาญการพิเศษ',
        responsibility: 'ควบคุมการเชื่อมต่อเครือข่ายความมั่นคงปลอดภัยภาครัฐ GIN, ฐานข้อมูลทะเบียน, และ Smart Visitor Pass',
        licenseNumber: 'วศก. 88190',
        keyProjects: ['ระบบเครือข่ายสารสนเทศศาลากลางจังหวัด 12 จังหวัด', 'ระบบ LPR จุดผ่านแดนถาวร กรมการปกครอง']
      },
      {
        id: 'exp-drv-2',
        name: 'ร.ต.อ.หญิง สุพัตรา เจริญศิลป์',
        role: 'ผู้เชี่ยวชาญระบบตรวจจับและนิติวิทยาศาสตร์ดิจิทัล (Digital Forensics & LPR)',
        experienceYears: 12,
        educationOrCert: 'นศ.บ. นิติวิทยาศาสตร์ดิจิทัล, ป.โท อาชญาวิทยา, Certified Forensic Examiner',
        responsibility: 'วางเกณฑ์จัดเก็บภาพหลักฐาน 4K, Smart Card OCR, และระบบแจ้งเตือนบัญชีเฝ้าระวังความมั่นคง',
        keyProjects: ['ระบบทะเบียนยานพาหนะและกล้องอ่านป้ายความมั่นคงชายแดนใต้']
      }
    ],
    strengths: [
      'ดึงเอกสารต้นฉบับตรงจาก Google Drive กองพัสดุ มีประวัติเวอร์ชันและผู้แก้ไขชัดเจน',
      'รองรับการอ่านบัตร Smart Card ร่วมกับทะเบียนรถ ยกระดับความมั่นคงปลอดภัยสถานที่ราชการ',
      'ไม้กั้นความเร็วสูง 1.5 วินาที ลดปัญหาการจราจรติดขัดช่วงเช้าและเย็น'
    ],
    weaknesses: [
      'ต้องประสานงานเชื่อมต่อเครือข่าย GIN ของภาครัฐ อาจมีความล่าช้าในการเปิดพอร์ต',
      'งบประมาณ 2.2 ล้านบาท ค่อนข้างสูงสำหรับอาคารทั่วไป'
    ],
    scores: {
      timeline: 8.8,
      expertise: 9.2,
      scope: 9.4,
      technical: 9.3,
      price: 8.0
    },
    scoreRationales: {
      timeline: '90 วัน เหมาะสมกับงาน 4 ช่องทางที่ต้องเชื่อมโยงระบบเครือข่ายราชการ',
      expertise: 'กำหนดคุณสมบัติผู้ยื่นและผลงานเดิมชัดเจน มีความน่าเชื่อถือสูง',
      scope: 'ครอบคลุม LPR, ไม้กั้น, Smart Card และ Visitor Pass',
      technical: 'เทคโนโลยี 4K LPR ร่วมกับ Smart Card Reader และ Cloud Storage มาตรฐานรัฐ',
      price: '2,200,000 บาท สมเหตุสมผลกับอุปกรณ์เกรดอุตสาหกรรม 4 ช่องทาง'
    },
    sourceType: 'drive',
    fileName: 'TOR_LPR_Gov_Central_2567.docx',
    driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74B/view',
    driveFolder: 'กองพัสดุ > โครงการจัดซื้อ 2567 > ระบบความปลอดภัย LPR',
    driveFileId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74B',
    fileSize: '4.8 MB',
    hasBarrierGate: true,
    architectureType: 'hybrid',
    warrantyYears: 3,
    submittedAt: '2026-09-10 14:30'
  },
  {
    id: 'drive-tor-02',
    code: 'DRIVE-SPEC-BMA-AI',
    title: 'ข้อกำหนดทางเทคนิค (TOR) ระบบตรวจจับและประมวลผลทะเบียนรถแบบ Edge AI ประจำประตูทางเข้า (กรุงเทพมหานคร)',
    submitter: 'สำนักการจราจรและขนส่ง (ดึงจาก Google Drive)',
    budget: '1,380,000 บาท',
    rawBudgetNumber: 1380000,
    duration: '60 วัน นับถัดจากวันลงนามในสัญญา',
    durationDays: 60,
    scope: 'จัดหาและติดตั้งกล้องอ่านป้ายทะเบียนระบบ Edge AI พร้อมไฟแฟลช White LED Strobe ในตัว ประตูเข้า-ออก 2 ประตู (4 ช่องทาง) ส่งข้อมูลตรงเข้า Cloud Server',
    hardware: [
      'กล้อง LPR แบบมี AI ชิปประมวลผลในตัว พร้อม White LED Strobe Flash 4 ชุด',
      'เสาเหล็กชุบกัลวาไนซ์พร้อมขายึดปรับมุม 4 ชุด',
      'Switch อุตสาหกรรมกันน้ำและตู้ควบคุมกลางแจ้ง 2 ชุด',
      'Industrial UPS สำรองไฟ 45 นาที 2 ชุด'
    ],
    software: [
      'ซอฟต์แวร์ตรวจจับป้ายทะเบียนและสีรถยนต์แบบ Real-time',
      'ระบบแจ้งเตือน Line Notify / Telegram เมื่อพบรถในบัญชีเฝ้าระวัง Watchlist',
      'Web Dashboard สรุปสถิติปริมาณรถรายชั่วโมงและรายวัน'
    ],
    deliveryAndAcceptance: 'ติดตั้งและส่งมอบภายใน 60 วัน ทดสอบความแม่นยำรวมไม่น้อยกว่า 96%',
    warrantyAndSla: 'รับประกันอุปกรณ์ 2 ปี ฟรีค่าบริการตรวจเช็ค PM ทุก 4 เดือน',
    qualifications: 'มีผลงานทางด้านติดตั้งกล้องวงจรปิด หรือระบบ AI ตรวจจับภาพ อย่างน้อย 1 สัญญา',
    strengths: [
      'เอกสารแชร์ผ่าน Google Drive มีลิงก์เปิดดูสเปกและไฟล์แนบได้ทันที',
      'ติดตั้งรวดเร็ว 60 วัน เนื่องจากใช้กล้อง Edge AI ไม่ต้องเดินสายเซิร์ฟเวอร์ขนาดใหญ่',
      'มีไฟแฟลช Strobe ในตัว แก้ปัญหาแสงสะท้อนและป้ายทะเบียนมืดสนิทเวลากลางคืน'
    ],
    weaknesses: [
      'ไม่มีระบบไม้กั้นอัตโนมัติ (เป็นระบบบันทึกและสถิติเท่านั้น)',
      'การรับประกัน 2 ปี (น้อยกว่าเกณฑ์ 3-5 ปีที่นิยมในสัญญาใหญ่)'
    ],
    scores: {
      timeline: 9.3,
      expertise: 8.0,
      scope: 7.8,
      technical: 9.0,
      price: 9.2
    },
    scoreRationales: {
      timeline: '60 วัน รวดเร็วมาก เหมาะกับกรณีติดตั้งทดแทนระบบเดิม',
      expertise: 'เกณฑ์พื้นฐานทั่วไป เหมาะกับงานบันทึกภาพ',
      scope: 'ขาดระบบไม้กั้นอัตโนมัติ เน้นเฉพาะกล้องตรวจจับและสถิติ',
      technical: 'กล้อง Edge AI พร้อม White Strobe ให้ภาพกลางคืนคมชัด',
      price: '1,380,000 บาท ได้กล้อง Edge AI ครบ 4 เลน ถือว่าคุ้มค่ามาก'
    },
    sourceType: 'drive',
    fileName: 'Spec_BMA_EdgeAI_Camera_2026.pdf',
    driveUrl: 'https://drive.google.com/file/d/1Ab9CdeF_GHiJkLmnOpQrStUvWxYz_Drive02/view',
    driveFolder: 'เอกสารกลาง > ฝ่ายระบบความปลอดภัย > สเปก LPR BMA',
    driveFileId: '1Ab9CdeF_GHiJkLmnOpQrStUvWxYz_Drive02',
    fileSize: '3.2 MB',
    hasBarrierGate: false,
    architectureType: 'edge_ai',
    warrantyYears: 2,
    submittedAt: '2026-09-12 09:15'
  },
  {
    id: 'proposal-vendor-01',
    code: 'PROP-2026-001',
    title: 'ข้อเสนอโครงการติดตั้งระบบ AI อ่านป้ายทะเบียนรถและไม้กั้นอัตโนมัติความเร็วสูง (ยื่นออนไลน์)',
    submitter: 'บริษัท ไทย ออโตเมชั่น เทคโนโลยีส์ จำกัด',
    budget: '1,690,000 บาท',
    rawBudgetNumber: 1690000,
    duration: '75 วัน นับถัดจากวันลงนามในสัญญา',
    durationDays: 75,
    scope: 'เสนอติดตั้งกล้องตรวจจับป้ายทะเบียน 4 ชุด ร่วมกับไม้กั้นความเร็วสูง DC Brushless 2 ชุด พร้อมระบบ Web Portal สำหรับเจ้าหน้าที่พัสดุและฝ่ายอาคารสถานที่',
    hardware: [
      'กล้อง LPR 4 MP Starlight Low Light 4 ชุด',
      'กล้อง Overview 2 MP บันทึกภาพมุมกว้าง 4 ชุด',
      'ไม้กั้นอัตโนมัติ DC Brushless Motor ทนทาน 5 ล้านครั้ง 2 ชุด',
      'Edge Processing Box และ UPS 1000VA 2 ชุด'
    ],
    software: [
      'ซอฟต์แวร์ Thai LPR Core Engine ความแม่นยำ 98.2%',
      'ระบบ Blacklist Real-time Alert ผ่าน Line Notify และ Sound Alarm',
      'ระบบ Visitor Management ออก e-Pass ผ่าน QR Code',
      'API เชื่อมต่อระบบ HR เข้า-ออกงานพนักงาน'
    ],
    deliveryAndAcceptance: 'แบ่งส่งมอบ 3 งวดงาน ทดสอบ UAT 200 คัน พร้อมคู่มือภาษาไทย',
    warrantyAndSla: 'รับประกัน 3 ปีเต็ม SLA แก้ปัญหาด่วนภายใน 2 ชม. มีอะไหล่สำรองพร้อมเปลี่ยนทันที',
    qualifications: 'มีทุนจดทะเบียน 20 ล้านบาท หนังสือรับรองมาตรฐาน ISO 9001:2015 และผลงาน LPR ราชการ 5 สัญญา',
    experts: [
      {
        id: 'exp-prop-1',
        name: 'นายชวาล ชื่นอารมณ์',
        role: 'ผู้อำนวยการฝ่ายวิศวกรรม / Project Director (สามัญวิศวกร)',
        experienceYears: 13,
        educationOrCert: 'วศ.บ. ไฟฟ้ากำลัง, ใบอนุญาต กว. สามัญวิศวกร เลขที่ สฟก. 9812, ISO 9001 Lead Auditor',
        responsibility: 'ผู้มีอำนาจลงนามทางวิศวกรรม ควบคุมมาตรฐานการติดตั้งไม้กั้น DC Brushless และทดสอบความปลอดภัย',
        licenseNumber: 'สฟก. 9812',
        phone: '02-889-1234',
        email: 'chawan@thaiauto-tech.co.th',
        keyProjects: ['ระบบไม้กั้นและกล้อง LPR นิคมอุตสาหกรรมมาบตาพุด 8 ช่องทาง', 'ระบบตรวจจับทะเบียนเข้าออกคลังสินค้า Kerry Express']
      },
      {
        id: 'exp-prop-2',
        name: 'ดร.สิริมา แสงสุวรรณ',
        role: 'หัวหน้าทีมพัฒนา AI LPR Engine (Chief AI Scientist)',
        experienceYears: 9,
        educationOrCert: 'ปร.ด. วิทยาการคอมพิวเตอร์และปัญญาประดิษฐ์, ผลงานวิจัยตีพิมพ์การรู้จำป้ายทะเบียนรถไทยในสภาพฝนตก',
        responsibility: 'ดูแลความถูกต้องของ Thai LPR Core Engine ความแม่นยำ 98.2% และการอัปเดตโมเดลตลอด 3 ปี',
        phone: '081-445-6789',
        email: 'sirima@thaiauto-tech.co.th',
        keyProjects: ['พัฒนาโมเดล OCR ภาษาไทยและหมวดจังหวัดสำหรับระบบ LPR ทางหลวง', 'ระบบอ่านป้ายทะเบียนรถทัวร์สถานีหมอชิต']
      },
      {
        id: 'exp-prop-3',
        name: 'นายณัฐนนท์ ภักดีชน',
        role: 'วิศวกรบริการและควบคุม SLA ประจำโครงการ (Service & SLA Lead)',
        experienceYears: 7,
        educationOrCert: 'วศ.บ. อิเล็กทรอนิกส์, Certificate of Barrier Gate Specialist จากโรงงานผู้ผลิต',
        responsibility: 'รับผิดชอบการดูแลแก้ไขปัญหาด่วนภายใน 2 ชม. (SLA) และการตรวจเช็ค Preventive Maintenance ทุก 4 เดือน',
        phone: '089-771-2233',
        keyProjects: ['หัวหน้าทีม Support ระบบ Access Control อาคารทรูทาวเวอร์']
      }
    ],
    strengths: [
      'ยื่นเสนอโครงการอย่างเป็นทางการผ่านระบบ พร้อมเลขทะเบียนนิติบุคคล 0105561008891',
      'ราคายื่นเสนอ 1,690,000 บาท ต่ำกว่าราคากลางประมาณ 8.6%',
      'ไม้กั้นมอเตอร์ DC Brushless คุณภาพสูง ทนทาน 5 ล้านรอบ พร้อม Safety Loop',
      'มีหนังสือรับรองมาตรฐาน ISO 9001 และวิศวกรประจำโครงการ'
    ],
    weaknesses: [
      'ระยะเวลา 75 วัน ต้องเร่งรัดงานติดตั้งและงานเทพื้นสำหรับฐานไม้กั้น'
    ],
    scores: {
      timeline: 9.0,
      expertise: 9.4,
      scope: 9.3,
      technical: 9.2,
      price: 9.4
    },
    scoreRationales: {
      timeline: '75 วัน เร็วกว่าเกณฑ์ 90 วันทั่วไปของงานไม้กั้น',
      expertise: 'มี ISO 9001 และผลงานราชการ 5 โครงการ มีความเชี่ยวชาญสูงมาก',
      scope: 'ให้ครบทั้ง LPR, Overview, ไม้กั้น DC Brushless และ Visitor e-Pass',
      technical: 'เทคโนโลยีกล้อง Starlight + AI Box + มอเตอร์ DC Brushless ได้มาตรฐานสากล',
      price: '1,690,000 บาท ประหยัดงบประมาณและให้สเปกเกินเกณฑ์ขั้นต่ำ'
    },
    sourceType: 'proposal',
    taxId: '0105561008891',
    contactPerson: 'นายวรพจน์ ธนสารวิริยะ (ผู้จัดการฝ่ายเทคนิค)',
    contactPhone: '02-890-1234, 081-456-7890',
    contactEmail: 'contact@thaiauto-tech.co.th',
    hasBarrierGate: true,
    architectureType: 'hybrid',
    warrantyYears: 3,
    submittedAt: '2026-09-13 11:20'
  }
];

