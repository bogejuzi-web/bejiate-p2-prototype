;(function () {
  var STORAGE_PREFIX = 'bjt-nurse-'

  var SEED = {
    nurses: [
      { id: 'nurse-001', name: '刘敏', account: 'nurse01', password: '123456', department: '内科', status: 'active' },
      { id: 'nurse-002', name: '张倩', account: 'nurse02', password: '123456', department: '内科', status: 'active' },
      { id: 'nurse-003', name: '周芳', account: 'nurse03', password: '123456', department: '外科', status: 'disabled' },
      { id: 'nurse-004', name: '赵宁', account: 'nurse04', password: '123456', department: '心内科', status: 'active' },
      { id: 'nurse-005', name: '胡珊', account: 'nurse05', password: '123456', department: '康复科', status: 'disabled' }
    ],
    admins: [
      { id: 'admin-001', name: '管理员', account: 'admin', password: '123456', role: '平台管理员' }
    ],
    staffMembers: [
      { id: 'staff-001', name: '陈旭', account: '15590086739', phone: '15590086739', email: '123@qq.com', role: '平台管理员', department: '运营部', status: 'active', createdAt: '2026-09-02 09:20' },
      { id: 'staff-002', name: '王大龙', account: '15861511201', phone: '15861511201', email: '8976678567@qq.com', role: '申请人', department: '护理部', status: 'active', createdAt: '2026-08-27 16:45' },
      { id: 'staff-003', name: '潘林芳', account: '13588238645', phone: '13588238645', email: '38546378@qq.com', role: '运营专员', department: '运营部', status: 'active', createdAt: '2026-08-26 17:05' },
      { id: 'staff-004', name: '何静', account: '13690147268', phone: '13690147268', email: 'hejing@example.com', role: '申请人', department: '心内科', status: 'active', createdAt: '2026-09-06 14:30' },
      { id: 'staff-005', name: '梁晨', account: '18837195642', phone: '18837195642', email: 'liangchen@example.com', role: '运营专员', department: '康复科', status: 'disabled', createdAt: '2026-09-08 11:15' }
    ],
    patients: [
      { id: 'patient-001', name: '王女士', patientNo: 'PT-001', phone: '151 0165 8625', consentSigned: true },
      { id: 'patient-002', name: '李先生', patientNo: 'PT-002', phone: '139 2245 7610', consentSigned: true },
      { id: 'patient-003', name: '周女士', patientNo: 'PT-003', phone: '186 3370 1298', consentSigned: true },
      { id: 'patient-004', name: '陈先生', patientNo: 'PT-004', phone: '137 0021 5588', consentSigned: false },
      { id: 'patient-005', name: '赵女士', patientNo: 'PT-005', phone: '132 6605 9911', consentSigned: true },
      { id: 'patient-006', name: '孙先生', patientNo: 'PT-006', phone: '158 7742 3300', consentSigned: true },
      { id: 'patient-007', name: '马女士', patientNo: 'PT-007', phone: '185 4021 7766', consentSigned: true },
      { id: 'patient-008', name: '杨先生', patientNo: 'PT-008', phone: '159 3387 2214', consentSigned: true },
      { id: 'patient-009', name: '吴女士', patientNo: 'PT-009', phone: '136 2218 4506', consentSigned: true },
      { id: 'patient-010', name: '郑先生', patientNo: 'PT-010', phone: '187 5602 9134', consentSigned: true },
      { id: 'patient-011', name: '冯女士', patientNo: 'PT-011', phone: '150 8731 6245', consentSigned: false },
      { id: 'patient-012', name: '高先生', patientNo: 'PT-012', phone: '133 4180 7652', consentSigned: true },
      { id: 'patient-013', name: '宋女士', patientNo: 'PT-013', phone: '189 2475 6301', consentSigned: true },
      { id: 'patient-014', name: '杜先生', patientNo: 'PT-014', phone: '156 6098 3174', consentSigned: false }
    ],
    bindings: [
      { id: 'bind-001', patientId: 'patient-001', nurseId: 'nurse-001', status: 'bound', requestedAt: '2026-08-01 10:00', respondedAt: '2026-08-01 11:00' },
      { id: 'bind-002', patientId: 'patient-002', nurseId: 'nurse-001', status: 'bound', requestedAt: '2026-08-05 09:30', respondedAt: '2026-08-05 20:10' },
      { id: 'bind-003', patientId: 'patient-003', nurseId: 'nurse-001', status: 'rejected', requestedAt: '2026-09-05 14:00', respondedAt: '2026-09-05 20:00', rejectedReason: '患者不同意' },
      { id: 'bind-004', patientId: 'patient-005', nurseId: 'nurse-001', status: 'pending', requestedAt: '2026-09-08 09:00' },
      { id: 'bind-005', patientId: 'patient-006', nurseId: 'nurse-002', status: 'bound', requestedAt: '2026-07-20 10:00', respondedAt: '2026-07-20 15:00' },
      { id: 'bind-006', patientId: 'patient-008', nurseId: 'nurse-001', status: 'bound', requestedAt: '2026-06-10 09:00', respondedAt: '2026-06-10 18:00' },
      { id: 'bind-007', patientId: 'patient-009', nurseId: 'nurse-002', status: 'bound', requestedAt: '2026-08-18 09:15', respondedAt: '2026-08-18 12:05' },
      { id: 'bind-008', patientId: 'patient-010', nurseId: 'nurse-004', status: 'bound', requestedAt: '2026-09-01 10:20', respondedAt: '2026-09-01 15:40' },
      { id: 'bind-009', patientId: 'patient-011', nurseId: 'nurse-004', status: 'pending', requestedAt: '2026-09-09 14:10' },
      { id: 'bind-010', patientId: 'patient-012', nurseId: 'nurse-002', status: 'rejected', requestedAt: '2026-09-04 11:30', respondedAt: '2026-09-05 09:20', rejectedReason: '暂不需要随访服务' },
      { id: 'bind-011', patientId: 'patient-013', nurseId: 'nurse-003', status: 'bound', requestedAt: '2026-07-12 13:30', respondedAt: '2026-07-12 16:10' }
    ],
    consents: [
      { id: 'consent-001', patientId: 'patient-001', title: '患者知情同意书', version: 'V2.0', status: 'signed', signedAt: '2026-08-01 10:32', content: '我已阅读并理解本平台提供的健康管理与随访服务说明，同意申请人在服务期间查看和维护与本服务相关的健康档案信息。' },
      { id: 'consent-002', patientId: 'patient-001', title: '健康信息使用授权', version: 'V1.0', status: 'signed', signedAt: '2026-08-01 10:35', content: '我授权平台在提供随访服务所必需的范围内使用我的健康信息，并知悉我可随时查看已签署协议。' },
      { id: 'consent-003', patientId: 'patient-002', title: '患者知情同意书', version: 'V2.0', status: 'signed', signedAt: '2026-08-05 20:10', content: '我已阅读并理解本平台提供的健康管理与随访服务说明。' },
      { id: 'consent-004', patientId: 'patient-003', title: '患者知情同意书', version: 'V2.0', status: 'unsigned', signedAt: '', content: '请在阅读全部协议内容后确认是否签署。' },
      { id: 'consent-005', patientId: 'patient-008', title: '患者知情同意书', version: 'V2.0', status: 'signed', signedAt: '2026-06-10 18:00', content: '我已阅读并理解本平台提供的健康管理与随访服务说明。' },
      { id: 'consent-006', patientId: 'patient-006', title: '患者知情同意书', version: 'V2.0', status: 'signed', signedAt: '2026-07-20 15:00', content: '我已阅读并理解本平台提供的健康管理与随访服务说明。' },
      { id: 'consent-007', patientId: 'patient-009', title: '患者知情同意书', version: 'V2.0', status: 'signed', signedAt: '2026-08-18 12:05', content: '我同意在服务期间由负责申请人开展健康随访。' },
      { id: 'consent-008', patientId: 'patient-010', title: '患者知情同意书', version: 'V2.0', status: 'signed', signedAt: '2026-09-01 15:40', content: '我已知悉并同意平台在服务所需范围内使用健康信息。' },
      { id: 'consent-009', patientId: 'patient-011', title: '患者知情同意书', version: 'V2.0', status: 'unsigned', signedAt: '', content: '请完成阅读后签署知情同意书。' }
    ],
    templates: [
      {
        id: 't1', name: '我的血压随访', creatorId: 'nurse-001', creatorName: '刘敏', visibility: 'private', status: 'active', usedByPlanCount: 2, updatedAt: '2026-09-09 09:10',
        fields: [
          { id: 'blood-pressure', label: '血压', type: 'text', required: true },
          { id: 'medication', label: '用药情况', type: 'textarea', required: true },
          { id: 'symptom', label: '身体不适', type: 'textarea', required: false }
        ]
      },
      {
        id: 't2', name: '术后恢复评估', creatorId: 'nurse-001', creatorName: '刘敏', visibility: 'private', status: 'active', usedByPlanCount: 1, updatedAt: '2026-09-08 16:20',
        fields: [
          { id: 'pain-score', label: '疼痛评分', type: 'number', required: true, analysisId: 'pain-score', unit: '分' },
          { id: 'wound', label: '伤口情况', type: 'textarea', required: false },
          { id: 'advice', label: '恢复建议', type: 'textarea', required: false }
        ]
      },
      {
        id: 't3', name: '公共健康随访', creatorId: 'nurse-002', creatorName: '张倩', visibility: 'public', status: 'active', usedByPlanCount: 1, updatedAt: '2026-09-07 10:30',
        fields: [
          { id: 'blood-pressure', label: '血压', type: 'text', required: true },
          { id: 'weight', label: '体重', type: 'number', required: false, analysisId: 'weight', unit: 'kg' },
          { id: 'lifestyle', label: '生活方式', type: 'textarea', required: false }
        ]
      },
      {
        id: 't4', name: '糖尿病复诊随访', creatorId: 'nurse-002', creatorName: '张倩', visibility: 'public', status: 'active', usedByPlanCount: 1, updatedAt: '2026-09-06 15:00',
        fields: [
          { id: 'blood-glucose', label: '血糖', type: 'text', required: true },
          { id: 'adherence', label: '用药依从性', type: 'single-choice', required: false, options: ['良好', '一般', '较差'] },
          { id: 'adherence-rate', label: '用药依从率', type: 'percentage', required: false, analysisId: 'adherence-rate', unit: '%' },
          { id: 'risk-signs', label: '风险表现', type: 'multi-choice', required: false, options: ['漏服药', '饮食失控', '运动不足'] },
          { id: 'diet', label: '饮食情况', type: 'textarea', required: false }
        ]
      },
      {
        id: 't5', name: '旧版随访模板', creatorId: 'nurse-001', creatorName: '刘敏', visibility: 'private', status: 'disabled', usedByPlanCount: 0, updatedAt: '2026-08-30 11:00',
        fields: [
          { id: 'blood-pressure', label: '血压', type: 'text', required: false },
          { id: 'note', label: '备注', type: 'textarea', required: false }
        ]
      },
      {
        id: 't6', name: '心血管风险随访', creatorId: 'nurse-004', creatorName: '赵宁', visibility: 'private', status: 'active', usedByPlanCount: 1, updatedAt: '2026-09-09 15:20',
        fields: [
          { id: 'heart-rate', label: '心率', type: 'number', required: true, analysisId: 'heart-rate', unit: '次/分' },
          { id: 'chest-pain', label: '胸闷胸痛情况', type: 'textarea', required: false },
          { id: 'exercise', label: '运动情况', type: 'textarea', required: false }
        ]
      },
      {
        id: 't7', name: '康复训练随访', creatorId: 'nurse-002', creatorName: '张倩', visibility: 'public', status: 'active', usedByPlanCount: 1, updatedAt: '2026-09-08 10:45',
        fields: [
          { id: 'training-frequency', label: '训练频次', type: 'number', required: true, analysisId: 'training-frequency', unit: '次/周' },
          { id: 'mobility', label: '活动能力', type: 'single-choice', required: true, options: ['良好', '一般', '受限'] },
          { id: 'rehab-note', label: '康复备注', type: 'textarea', required: false }
        ]
      },
      {
        id: 't8', name: '睡眠质量追踪', creatorId: 'nurse-002', creatorName: '张倩', visibility: 'public', status: 'disabled', usedByPlanCount: 0, updatedAt: '2026-08-26 09:10',
        fields: [
          { id: 'sleep-hours', label: '睡眠时长', type: 'number', required: true },
          { id: 'sleep-note', label: '睡眠情况', type: 'textarea', required: false }
        ]
      },
    ],
    plans: [
      {
        id: 'plan-001', patientId: 'patient-001', nurseId: 'nurse-001', name: '每周健康随访', firstDate: '2026-08-04', frequency: 'weekly', executionTime: '09:00',
        endCondition: { type: 'date', endDate: '2026-12-31' }, templateId: 't1',
        templateVersionSnapshot: { name: '我的血压随访', fields: [
          { id: 'blood-pressure', label: '血压', type: 'text', required: true },
          { id: 'medication', label: '用药情况', type: 'textarea', required: true },
          { id: 'symptom', label: '身体不适', type: 'textarea', required: false }
        ] },
        status: 'active', nextDate: '2026-09-16'
      },
      {
        id: 'plan-002', patientId: 'patient-001', nurseId: 'nurse-001', name: '每月生活方式随访', firstDate: '2026-08-01', frequency: 'monthly', executionTime: '10:00',
        endCondition: { type: 'date', endDate: '2026-12-01' }, templateId: 't3',
        templateVersionSnapshot: { name: '公共健康随访', fields: [
          { id: 'blood-pressure', label: '血压', type: 'text', required: true },
          { id: 'weight', label: '体重', type: 'number', required: false },
          { id: 'lifestyle', label: '生活方式', type: 'textarea', required: false }
        ] },
        status: 'active', nextDate: '2026-10-01'
      },
      {
        id: 'plan-003', patientId: 'patient-001', nurseId: 'nurse-001', name: '术后恢复随访', firstDate: '2026-07-01', frequency: 'weekly', executionTime: '14:00',
        endCondition: { type: 'occurrences', count: 4 }, templateId: 't2',
        templateVersionSnapshot: { name: '术后恢复评估', fields: [
          { id: 'pain-score', label: '疼痛评分', type: 'number', required: true },
          { id: 'wound', label: '伤口情况', type: 'textarea', required: false },
          { id: 'advice', label: '恢复建议', type: 'textarea', required: false }
        ] },
        status: 'ended'
      },
      {
        id: 'plan-004', patientId: 'patient-002', nurseId: 'nurse-001', name: '糖尿病复诊随访', firstDate: '2026-09-01', frequency: 'weekly', executionTime: '09:00',
        endCondition: { type: 'date', endDate: '2026-11-30' }, templateId: 't4',
        templateVersionSnapshot: { name: '糖尿病复诊随访', fields: [
          { id: 'blood-glucose', label: '血糖', type: 'text', required: true },
          { id: 'adherence', label: '用药依从性', type: 'single-choice', required: false, options: ['良好', '一般', '较差'] },
          { id: 'adherence-rate', label: '用药依从率', type: 'percentage', required: false },
          { id: 'risk-signs', label: '风险表现', type: 'multi-choice', required: false, options: ['漏服药', '饮食失控', '运动不足'] },
          { id: 'diet', label: '饮食情况', type: 'textarea', required: false }
        ] },
        status: 'cancelled'
      },
      {
        id: 'plan-005', patientId: 'patient-008', nurseId: 'nurse-001', name: '血压日常随访', firstDate: '2026-09-15', frequency: 'daily', executionTime: '08:00',
        endCondition: { type: 'occurrences', count: 30 }, templateId: 't1',
        templateVersionSnapshot: { name: '我的血压随访', fields: [
          { id: 'blood-pressure', label: '血压', type: 'text', required: true },
          { id: 'medication', label: '用药情况', type: 'textarea', required: true },
          { id: 'symptom', label: '身体不适', type: 'textarea', required: false }
        ] },
        status: 'draft'
      },
      {
        id: 'plan-006', patientId: 'patient-006', nurseId: 'nurse-002', name: '康复训练跟进', firstDate: '2026-09-03', frequency: 'weekly', executionTime: '15:00',
        endCondition: { type: 'date', endDate: '2026-12-03' }, templateId: 't7',
        templateVersionSnapshot: { name: '康复训练随访', fields: [
          { id: 'training-frequency', label: '训练频次', type: 'number', required: true },
          { id: 'mobility', label: '活动能力', type: 'single-choice', required: true, options: ['良好', '一般', '受限'] },
          { id: 'rehab-note', label: '康复备注', type: 'textarea', required: false }
        ] }, status: 'active', nextDate: '2026-09-17'
      },
      {
        id: 'plan-007', patientId: 'patient-009', nurseId: 'nurse-002', name: '血糖生活方式随访', firstDate: '2026-08-20', frequency: 'weekly', executionTime: '10:30',
        endCondition: { type: 'occurrences', count: 12 }, templateId: 't4',
        templateVersionSnapshot: { name: '糖尿病复诊随访', fields: [
          { id: 'blood-glucose', label: '血糖', type: 'text', required: true },
          { id: 'adherence', label: '用药依从性', type: 'single-choice', required: false, options: ['良好', '一般', '较差'] },
          { id: 'diet', label: '饮食情况', type: 'textarea', required: false }
        ] }, status: 'active', nextDate: '2026-09-17'
      },
      {
        id: 'plan-008', patientId: 'patient-010', nurseId: 'nurse-004', name: '心血管健康随访', firstDate: '2026-09-02', frequency: 'daily', executionTime: '08:30',
        endCondition: { type: 'date', endDate: '2026-10-02' }, templateId: 't6',
        templateVersionSnapshot: { name: '心血管风险随访', fields: [
          { id: 'heart-rate', label: '心率', type: 'number', required: true },
          { id: 'chest-pain', label: '胸闷胸痛情况', type: 'textarea', required: false },
          { id: 'exercise', label: '运动情况', type: 'textarea', required: false }
        ] }, status: 'active', nextDate: '2026-09-10'
      },
      {
        id: 'plan-009', patientId: 'patient-013', nurseId: 'nurse-003', name: '术后康复阶段随访', firstDate: '2026-06-01', frequency: 'monthly', executionTime: '11:00',
        endCondition: { type: 'date', endDate: '2026-09-01' }, templateId: 't2',
        templateVersionSnapshot: { name: '术后恢复评估', fields: [
          { id: 'pain-score', label: '疼痛评分', type: 'number', required: true },
          { id: 'wound', label: '伤口情况', type: 'textarea', required: false },
          { id: 'advice', label: '恢复建议', type: 'textarea', required: false }
        ] }, status: 'ended'
      }
    ],
    tasks: [
      { id: 'task-001', planId: 'plan-001', patientId: 'patient-001', nurseId: 'nurse-001', scheduledDate: '2026-09-09', status: 'due-today' },
      { id: 'task-002', planId: 'plan-001', patientId: 'patient-001', nurseId: 'nurse-001', scheduledDate: '2026-09-02', status: 'done' },
      { id: 'task-003', planId: 'plan-002', patientId: 'patient-001', nurseId: 'nurse-001', scheduledDate: '2026-09-01', status: 'overdue' },
      { id: 'task-004', planId: 'plan-004', patientId: 'patient-002', nurseId: 'nurse-001', scheduledDate: '2026-09-08', status: 'cancelled', cancelReason: '随访计划已取消' },
      { id: 'task-005', planId: 'plan-003', patientId: 'patient-001', nurseId: 'nurse-001', scheduledDate: '2026-07-22', status: 'done' },
      { id: 'task-006', planId: 'plan-001', patientId: 'patient-001', nurseId: 'nurse-001', scheduledDate: '2026-09-16', status: 'pending' },
      { id: 'task-007', planId: 'plan-006', patientId: 'patient-006', nurseId: 'nurse-002', scheduledDate: '2026-09-03', status: 'done' },
      { id: 'task-008', planId: 'plan-006', patientId: 'patient-006', nurseId: 'nurse-002', scheduledDate: '2026-09-10', status: 'due-today' },
      { id: 'task-009', planId: 'plan-006', patientId: 'patient-006', nurseId: 'nurse-002', scheduledDate: '2026-09-17', status: 'pending' },
      { id: 'task-010', planId: 'plan-007', patientId: 'patient-009', nurseId: 'nurse-002', scheduledDate: '2026-09-03', status: 'overdue' },
      { id: 'task-011', planId: 'plan-007', patientId: 'patient-009', nurseId: 'nurse-002', scheduledDate: '2026-09-10', status: 'due-today' },
      { id: 'task-012', planId: 'plan-007', patientId: 'patient-009', nurseId: 'nurse-002', scheduledDate: '2026-09-17', status: 'pending' },
      { id: 'task-013', planId: 'plan-008', patientId: 'patient-010', nurseId: 'nurse-004', scheduledDate: '2026-09-08', status: 'done' },
      { id: 'task-014', planId: 'plan-008', patientId: 'patient-010', nurseId: 'nurse-004', scheduledDate: '2026-09-09', status: 'overdue' },
      { id: 'task-015', planId: 'plan-008', patientId: 'patient-010', nurseId: 'nurse-004', scheduledDate: '2026-09-10', status: 'due-today' },
      { id: 'task-016', planId: 'plan-009', patientId: 'patient-013', nurseId: 'nurse-003', scheduledDate: '2026-08-01', status: 'done' }
    ],
    records: [
      { id: 'record-001', taskId: 'task-002', planId: 'plan-001', patientId: 'patient-001', nurseId: 'nurse-001', followupMethod: 'phone', values: { 'blood-pressure': '126/76 mmHg', medication: '按医嘱用药', symptom: '无明显不适' }, submittedAt: '2026-09-02 09:12' },
      { id: 'record-002', taskId: 'task-005', planId: 'plan-003', patientId: 'patient-001', nurseId: 'nurse-001', followupMethod: 'offline', values: { 'pain-score': '2', wound: '愈合良好', advice: '继续观察，两周后复诊' }, submittedAt: '2026-07-22 14:20' },
      { id: 'record-003', taskId: 'task-007', planId: 'plan-006', patientId: 'patient-006', nurseId: 'nurse-002', values: { 'training-frequency': '4', mobility: '一般', 'rehab-note': '步行耐力较上周有所提升' }, submittedAt: '2026-09-03 15:18' },
      { id: 'record-004', taskId: 'task-013', planId: 'plan-008', patientId: 'patient-010', nurseId: 'nurse-004', values: { 'heart-rate': '72', 'chest-pain': '无胸闷胸痛', exercise: '每日步行 30 分钟' }, submittedAt: '2026-09-08 08:45' },
      { id: 'record-005', taskId: 'task-016', planId: 'plan-009', patientId: 'patient-013', nurseId: 'nurse-003', values: { 'pain-score': '1', wound: '伤口已完全愈合', advice: '保持规律复诊' }, submittedAt: '2026-08-01 11:12' },
      { id: 'record-006', taskId: '', planId: 'plan-003', patientId: 'patient-001', nurseId: 'nurse-001', values: { 'pain-score': '8', wound: '红肿渗液', advice: '建议尽快复诊' }, submittedAt: '2026-09-09 08:30' },
      { id: 'record-007', taskId: '', planId: 'plan-008', patientId: 'patient-010', nurseId: 'nurse-004', values: { 'heart-rate': '108', 'chest-pain': '偶有胸闷', exercise: '暂停运动' }, submittedAt: '2026-09-09 10:20' },
      { id: 'record-008', taskId: '', planId: 'plan-006', patientId: 'patient-006', nurseId: 'nurse-002', values: { 'training-frequency': '1', mobility: '受限', 'rehab-note': '站立困难' }, submittedAt: '2026-09-08 15:40' }
    ],
    alertRules: [
      { id: 'alert-rule-001', name: '术后疼痛高风险', templateId: 't2', fieldId: 'pain-score', fieldLabel: '疼痛评分', fieldType: 'number', operator: 'gt', threshold: 6, level: 'high', status: 'active', updatedAt: '2026-09-10 09:00' },
      { id: 'alert-rule-002', name: '心率偏高提醒', templateId: 't6', fieldId: 'heart-rate', fieldLabel: '心率', fieldType: 'number', operator: 'gt', threshold: 100, level: 'medium', status: 'active', updatedAt: '2026-09-10 09:00' },
      { id: 'alert-rule-003', name: '康复活动能力受限', templateId: 't7', fieldId: 'mobility', fieldLabel: '活动能力', fieldType: 'single-choice', operator: 'equals', expectedValue: '受限', level: 'high', status: 'active', updatedAt: '2026-09-10 09:00' },
      { id: 'alert-rule-004', name: '体重异常波动提示', templateId: 't3', fieldId: 'weight', fieldLabel: '体重', fieldType: 'number', operator: 'outside', lowerBound: 45, upperBound: 90, level: 'low', status: 'active', updatedAt: '2026-09-10 09:00' },
      { id: 'alert-rule-005', name: '旧版睡眠时长提醒', templateId: 't8', fieldId: 'sleep-hours', fieldLabel: '睡眠时长', fieldType: 'number', operator: 'lt', threshold: 4, level: 'low', status: 'disabled', updatedAt: '2026-09-10 09:00' }
      ,{ id: 'alert-rule-006', name: '用药依从率偏低', templateId: 't4', fieldId: 'adherence-rate', fieldLabel: '用药依从率', fieldType: 'percentage', operator: 'lt', threshold: 80, level: 'medium', status: 'active', updatedAt: '2026-09-15 09:00' }
      ,{ id: 'alert-rule-007', name: '出现任一风险表现', templateId: 't4', fieldId: 'risk-signs', fieldLabel: '风险表现', fieldType: 'multi-choice', operator: 'includes-any', triggerValues: ['漏服药', '饮食失控'], level: 'high', status: 'active', updatedAt: '2026-09-15 09:00' }
      ,{ id: 'alert-rule-008', name: '风险表现组合触发', templateId: 't4', fieldId: 'risk-signs', fieldLabel: '风险表现', fieldType: 'multi-choice', operator: 'includes-all', triggerValues: ['漏服药', '饮食失控'], level: 'high', status: 'active', updatedAt: '2026-09-15 09:00' }
    ],
    followupAlerts: [
      { id: 'followup-alert-001', recordId: 'record-006', patientId: 'patient-001', nurseId: 'nurse-001', level: 'high', status: 'pending', createdAt: '2026-09-09 08:30', hits: [{ ruleId: 'alert-rule-001', ruleName: '术后疼痛高风险', fieldId: 'pain-score', fieldLabel: '疼痛评分', operator: 'gt', threshold: 6, value: '8', level: 'high' }] },
      { id: 'followup-alert-002', recordId: 'record-007', patientId: 'patient-010', nurseId: 'nurse-004', level: 'medium', status: 'in-progress', createdAt: '2026-09-09 10:20', lastHandledBy: '管理员', lastHandledAt: '2026-09-09 11:00', hits: [{ ruleId: 'alert-rule-002', ruleName: '心率偏高提醒', fieldId: 'heart-rate', fieldLabel: '心率', operator: 'gt', threshold: 100, value: '108', level: 'medium' }] },
      { id: 'followup-alert-003', recordId: 'record-008', patientId: 'patient-006', nurseId: 'nurse-002', level: 'high', status: 'closed', createdAt: '2026-09-08 15:40', lastHandledBy: '管理员', lastHandledAt: '2026-09-08 16:10', closedBy: '管理员', closedAt: '2026-09-08 16:30', closeNote: '已联系患者并安排线下复诊。', hits: [{ ruleId: 'alert-rule-003', ruleName: '康复活动能力受限', fieldId: 'mobility', fieldLabel: '活动能力', operator: 'equals', expectedValue: '受限', value: '受限', level: 'high' }] }
    ],
    scores: [
      { nurseId: 'nurse-001', period: '2026-08', kpiCompletionRate: 76, timeProgress: 100, monthProgress: 100, enrolledPatientCount: 3, updatedAt: '2026-08-31 23:00' },
      { nurseId: 'nurse-001', period: '2026-09', kpiCompletionRate: 82, timeProgress: 30, monthProgress: 45, enrolledPatientCount: 4, updatedAt: '2026-09-09 08:00' },
      { nurseId: 'nurse-002', period: '2026-09', kpiCompletionRate: 68, timeProgress: 30, monthProgress: 40, enrolledPatientCount: 2, updatedAt: '2026-09-09 08:00' },
      { nurseId: 'nurse-003', period: '2026-09', kpiCompletionRate: 91, timeProgress: 30, monthProgress: 70, enrolledPatientCount: 1, updatedAt: '2026-09-09 08:00' },
      { nurseId: 'nurse-004', period: '2026-09', kpiCompletionRate: 74, timeProgress: 30, monthProgress: 28, enrolledPatientCount: 1, updatedAt: '2026-09-09 08:00' }
    ],
    followupTargets: [
      { nurseId: 'nurse-001', period: '2026-09', durationMonths: 3, startDate: '2026-07-01', endDate: '2026-09-30', goals: { followupCount: 3, coverage: 80, offlineCount: 2, phoneCount: 2, enrolledCount: 3 }, updatedAt: '2026-09-01 09:00' },
      { nurseId: 'nurse-002', period: '2026-09', durationMonths: 3, startDate: '2026-07-01', endDate: '2026-09-30', goals: { followupCount: 4, coverage: 75, offlineCount: 2, phoneCount: 2, enrolledCount: 3 }, updatedAt: '2026-09-01 09:00' },
      { nurseId: 'nurse-003', period: '2026-09', durationMonths: 3, startDate: '2026-07-01', endDate: '2026-09-30', goals: { followupCount: 2, coverage: 80, offlineCount: 1, phoneCount: 1, enrolledCount: 2 }, updatedAt: '2026-09-01 09:00' },
      { nurseId: 'nurse-004', period: '2026-09', durationMonths: 3, startDate: '2026-07-01', endDate: '2026-09-30', goals: { followupCount: 3, coverage: 80, offlineCount: 2, phoneCount: 1, enrolledCount: 2 }, updatedAt: '2026-09-01 09:00' }
    ],
    scoreStages: [
      { id: 'stage-001', name: '2026 年第三季度随访目标', startDate: '2026-07-01', endDate: '2026-09-30', durationMonths: 3, passingRate: 60, goals: { followupCount: 3, coverage: 80, offlineCount: 2, phoneCount: 2, enrolledCount: 3 }, updatedAt: '2026-07-01 09:00' },
      { id: 'stage-002', name: '2026 年第二季度随访目标', startDate: '2026-04-01', endDate: '2026-06-30', durationMonths: 3, passingRate: 60, goals: { followupCount: 2, coverage: 70, offlineCount: 1, phoneCount: 2, enrolledCount: 2 }, updatedAt: '2026-04-01 09:00' },
      { id: 'stage-003', name: '2026 年第一季度随访目标', startDate: '2026-01-01', endDate: '2026-03-31', durationMonths: 3, passingRate: 60, goals: { followupCount: 2, coverage: 60, offlineCount: 1, phoneCount: 1, enrolledCount: 2 }, updatedAt: '2026-01-01 09:00' }
    ],
    consentTemplates: [
      { id: 'ct-002', title: '患者知情同意书', version: 'V2.0', status: 'active', effectiveAt: '2026-07-01', resignPolicy: 'new-only', content: '我已阅读并理解本平台提供的健康管理与随访服务说明，同意申请人在服务期间查看和维护与本服务相关的健康档案信息。本人知悉可随时查看已签署协议，并有权撤回同意。' },
      { id: 'ct-001', title: '患者知情同意书', version: 'V1.0', status: 'archived', effectiveAt: '2026-01-01', resignPolicy: 'new-only', content: '我已阅读并理解本平台提供的健康管理与随访服务说明，同意接受平台的随访服务。' }
    ],
    rolePermissions: [
      {
        role: 'patient', roleName: '患者',
        features: [
          { key: 'sign-consent', label: '签署知情同意', enabled: true, locked: true },
          { key: 'view-health-record', label: '查看健康档案', enabled: true, locked: false },
          { key: 'edit-health-record', label: '按字段权限编辑健康档案', enabled: true, locked: false },
          { key: 'view-consent-history', label: '查看已签署协议', enabled: true, locked: false }
        ]
      },
      {
        role: 'nurse', roleName: '申请人',
        features: [
          { key: 'bind-patient', label: '绑定与解绑患者', enabled: true, locked: false },
          { key: 'manage-template', label: '创建与维护随访模板', enabled: true, locked: false },
          { key: 'manage-plan', label: '创建与维护随访计划', enabled: true, locked: false },
          { key: 'execute-followup', label: '执行随访并更新健康档案', enabled: true, locked: false },
          { key: 'view-score', label: '查看申请人评分', enabled: true, locked: false }
        ]
      },
      {
        role: 'admin', roleName: '管理人员',
        features: [
          { key: 'manage-nurse-account', label: '创建与启停申请人账号', enabled: true, locked: true },
          { key: 'manage-permission', label: '配置功能权限', enabled: true, locked: true },
          { key: 'manage-consent', label: '维护知情同意内容', enabled: true, locked: false },
          { key: 'view-all-data', label: '查看平台全量数据', enabled: true, locked: true },
          { key: 'manage-public-template', label: '维护公共随访模板', enabled: true, locked: false }
        ]
      },
      {
        role: 'foundation', roleName: '基金会管理',
        features: [
          { key: 'view-overview', label: '查看平台数据概览', enabled: true, locked: false },
          { key: 'view-followup-progress', label: '查看随访进度', enabled: true, locked: false },
          { key: 'manage-nurse-account', label: '创建与启停申请人账号', enabled: false, locked: false },
          { key: 'manage-consent', label: '维护知情同意内容', enabled: false, locked: false }
        ]
      }
    ],
    activityForms: [
      {
        id: 'activity-form-001', name: '患教会议申请表', status: 'published', updatedAt: '2026-09-15 09:30',
        fields: [
          { id: 'activity-theme', label: '活动主题', type: 'text', required: true },
          { id: 'activity-type', label: '活动类型', type: 'option', required: true, options: ['线下患教会', '线上宣教', '小组交流'], displayMode: 'dropdown' },
          { id: 'target-groups', label: '适用人群', type: 'multi-option', required: false, options: ['高血压患者', '糖尿病患者', '术后康复患者'], displayMode: 'flat' },
          { id: 'expected-attendees', label: '预计参与人数', type: 'number', required: true },
          { id: 'budget-usage-rate', label: '预算使用率', type: 'percentage', required: false, allowDecimal: true, decimalLimit: 1 },
          { id: 'activity-date', label: '活动日期', type: 'date', required: true },
          { id: 'activity-poster', label: '活动海报', type: 'image', required: false }
        ]
      }
    ],
    activityApplications: [
      { id: 'activity-001', formId: 'activity-form-001', formName: '患教会议申请表', nurseId: 'nurse-001', nurseName: '刘敏', status: 'reviewing', values: { 'activity-theme': '高血压患者秋季自我管理', 'activity-type': '线下患教会', 'target-groups': '高血压患者', 'expected-attendees': '30', 'budget-usage-rate': '65.5', 'activity-date': '2026-10-08', 'activity-poster': '已选择：高血压秋季患教海报.png' }, createdAt: '2026-09-14 10:20', updatedAt: '2026-09-14 10:20' },
      { id: 'activity-002', formId: 'activity-form-001', formName: '患教会议申请表', nurseId: 'nurse-001', nurseName: '刘敏', status: 'returned', values: { 'activity-theme': '糖尿病饮食管理', 'activity-type': '线上宣教', 'expected-attendees': '45' }, createdAt: '2026-09-12 15:10', updatedAt: '2026-09-14 09:00', approval: { result: 'returned', comment: '请补充活动时间、平台和宣教讲师信息后再次提交。', operatorId: 'admin-001', operatorName: '管理员', processedAt: '2026-09-14 09:00' } },
      { id: 'activity-003', formId: 'activity-form-001', formName: '患教会议申请表', nurseId: 'nurse-001', nurseName: '刘敏', status: 'approved', values: { 'activity-theme': '术后康复居家训练', 'activity-type': '小组交流', 'expected-attendees': '20' }, createdAt: '2026-09-08 11:40', updatedAt: '2026-09-09 14:25', approval: { result: 'approved', comment: '活动方案完整，同意开展。', operatorId: 'admin-001', operatorName: '管理员', processedAt: '2026-09-09 14:25' } },
      { id: 'activity-004', formId: 'activity-form-001', formName: '患教会议申请表', nurseId: 'nurse-001', nurseName: '刘敏', status: 'rejected', values: { 'activity-theme': '心血管风险答疑', 'activity-type': '线下患教会', 'expected-attendees': '18' }, createdAt: '2026-09-05 16:10', updatedAt: '2026-09-06 10:00', approval: { result: 'rejected', comment: '本月同类活动名额已满，请勿重新提交。', operatorId: 'admin-001', operatorName: '管理员', processedAt: '2026-09-06 10:00' } },
      { id: 'activity-005', formId: 'activity-form-001', formName: '患教会议申请表', nurseId: 'nurse-001', nurseName: '刘敏', status: 'draft', values: { 'activity-theme': '秋季用药安全宣教' }, createdAt: '2026-09-15 08:45', updatedAt: '2026-09-15 08:45' }
    ],
    activityNotifications: [
      { id: 'activity-notice-001', applicationId: 'activity-002', result: 'returned', title: '活动申请已退回补充', content: '请补充活动时间、平台和宣教讲师信息后再次提交。', createdAt: '2026-09-14 09:00', read: false },
      { id: 'activity-notice-002', applicationId: 'activity-003', result: 'approved', title: '活动申请已通过', content: '活动方案完整，同意开展。', createdAt: '2026-09-09 14:25', read: true },
      { id: 'activity-notice-003', applicationId: 'activity-004', result: 'rejected', title: '活动申请已驳回', content: '本月同类活动名额已满，请勿重新提交。', createdAt: '2026-09-06 10:00', read: true }
    ],
    healthRecords: {
      'patient-001': {
        record: {
          patientId: 'patient-001',
          updatedAt: '2026-09-09 09:00',
          sections: [
            {
              id: 'basic-health', title: '基础健康信息',
              fields: [
                { id: 'height', label: '身高', value: '162 cm', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-08-18 10:30' },
                { id: 'weight', label: '体重', value: '58 kg', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-09-02 09:00' },
                { id: 'bmi', label: 'BMI', value: '22.1', source: 'system', patientEditable: false, nurseEditable: false, updatedAt: '2026-09-02 09:00' },
                { id: 'waistline', label: '腰围', value: '74 cm', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-09-02 09:00' },
                { id: 'blood-type', label: '血型', value: 'A 型', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-08-18 10:30' },
                { id: 'allergy', label: '过敏史', value: '无已知药物过敏', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-08-18 10:30' }
              ]
            },
            {
              id: 'lifestyle', title: '生活方式信息',
              fields: [
                { id: 'smoking', label: '吸烟史', value: '从不吸烟', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-08-18 10:30' },
                { id: 'drinking', label: '饮酒史', value: '偶尔饮酒', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-08-18 10:30' },
                { id: 'exercise', label: '运动频率', value: '每周 3 次', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-09-02 09:00' },
                { id: 'sleep', label: '平均睡眠', value: '7 小时/日', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-09-02 09:00' }
              ]
            },
            {
              id: 'medical-history', title: '既往史与风险信息',
              fields: [
                { id: 'chronic-disease', label: '慢病情况', value: '高血压（规律随访）', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-09-02 09:00' },
                { id: 'family-history', label: '家族史', value: '母亲有高血压史', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-08-18 10:30' },
                { id: 'surgery-history', label: '手术史', value: '无', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-08-18 10:30' },
                { id: 'emergency-contact', label: '紧急联系人', value: '王先生 · 138 1234 5678', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-08-18 10:30' }
              ]
            },
            {
              id: 'follow-up-health', title: '随访健康信息',
              fields: [
                { id: 'blood-pressure', label: '血压', value: '128/78 mmHg', source: 'follow-up', patientEditable: false, nurseEditable: true, updatedAt: '2026-09-02 09:00' },
                { id: 'heart-rate', label: '心率', value: '72 次/分', source: 'follow-up', patientEditable: false, nurseEditable: true, updatedAt: '2026-09-02 09:00' },
                { id: 'fasting-glucose', label: '空腹血糖', value: '5.4 mmol/L', source: 'follow-up', patientEditable: false, nurseEditable: true, updatedAt: '2026-09-02 09:00' },
                { id: 'medication', label: '用药情况', value: '按医嘱用药', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-09-02 09:00' },
                { id: 'symptom', label: '近期症状', value: '无头晕、胸闷等不适', source: 'follow-up', patientEditable: false, nurseEditable: true, updatedAt: '2026-09-02 09:00' }
              ]
            }
          ]
        },
        changes: [
          { id: 'change-001', fieldId: 'blood-pressure', operator: 'follow-up', updatedAt: '2026-09-02 09:00', previousValue: '126/80 mmHg', currentValue: '128/78 mmHg' }
        ]
      },
      'patient-006': {
        record: { patientId: 'patient-006', updatedAt: '2026-09-10 09:10', sections: [
          { id: 'basic-health', title: '基础健康信息', fields: [
            { id: 'height', label: '身高', value: '174 cm', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-07-20 15:00' },
            { id: 'weight', label: '体重', value: '71 kg', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-09-03 15:18' }
          ] },
          { id: 'follow-up-health', title: '随访健康信息', fields: [
            { id: 'training-frequency', label: '训练频次', value: '每周 4 次', source: 'follow-up', patientEditable: false, nurseEditable: true, updatedAt: '2026-09-03 15:18' },
            { id: 'mobility', label: '活动能力', value: '一般', source: 'follow-up', patientEditable: false, nurseEditable: true, updatedAt: '2026-09-03 15:18' }
          ] }
        ] }, changes: []
      },
      'patient-010': {
        record: { patientId: 'patient-010', updatedAt: '2026-09-08 08:45', sections: [
          { id: 'basic-health', title: '基础健康信息', fields: [
            { id: 'height', label: '身高', value: '169 cm', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-09-01 15:40' },
            { id: 'weight', label: '体重', value: '66 kg', source: 'manual', patientEditable: true, nurseEditable: true, updatedAt: '2026-09-08 08:45' }
          ] },
          { id: 'follow-up-health', title: '随访健康信息', fields: [
            { id: 'heart-rate', label: '心率', value: '72 次/分', source: 'follow-up', patientEditable: false, nurseEditable: true, updatedAt: '2026-09-08 08:45' },
            { id: 'exercise', label: '运动情况', value: '每日步行 30 分钟', source: 'follow-up', patientEditable: false, nurseEditable: true, updatedAt: '2026-09-08 08:45' }
          ] }
        ] }, changes: []
      }
    }
  }

  function storageKey(name) {
    return STORAGE_PREFIX + name
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value))
  }

  function getCollection(name) {
    try {
      var raw = window.localStorage.getItem(storageKey(name))
      if (raw) return JSON.parse(raw)
    } catch (e) {}
    return clone(SEED[name] || [])
  }

  function setCollection(name, value) {
    try {
      window.localStorage.setItem(storageKey(name), JSON.stringify(value))
    } catch (e) {}
  }

  function mergeHealthRecord(seed, saved) {
    if (!seed) return saved ? clone(saved) : null
    if (!saved) return clone(seed)
    var seedSections = (seed.record && seed.record.sections) || []
    var savedSections = (saved.record && saved.record.sections) || []
    var sections = seedSections.map(function (seedSection) {
      var savedSection = savedSections.find(function (section) { return section.id === seedSection.id })
      if (!savedSection) return clone(seedSection)
      var seedFields = seedSection.fields || []
      var savedFields = savedSection.fields || []
      return Object.assign({}, seedSection, savedSection, {
        fields: seedFields.map(function (seedField) {
          var savedField = savedFields.find(function (field) { return field.id === seedField.id })
          return savedField ? Object.assign({}, seedField, savedField) : clone(seedField)
        }).concat(savedFields.filter(function (savedField) {
          return !seedFields.some(function (seedField) { return seedField.id === savedField.id })
        }))
      })
    }).concat(savedSections.filter(function (savedSection) {
      return !seedSections.some(function (seedSection) { return seedSection.id === savedSection.id })
    }))
    return Object.assign({}, seed, saved, { record: Object.assign({}, seed.record, saved.record, { sections: sections }) })
  }

  function getHealthRecord(patientId) {
    var seed = SEED.healthRecords[patientId]
    try {
      var raw = window.localStorage.getItem(storageKey('health-' + patientId))
      if (raw) return mergeHealthRecord(seed, JSON.parse(raw))
    } catch (e) {}
    return seed ? clone(seed) : null
  }

  function setHealthRecord(patientId, value) {
    try {
      window.localStorage.setItem(storageKey('health-' + patientId), JSON.stringify(value))
    } catch (e) {}
  }

  function clearSession() {
    try {
      var keys = []
      for (var i = 0; i < window.localStorage.length; i += 1) {
        var k = window.localStorage.key(i)
        if (k && k.indexOf(STORAGE_PREFIX) === 0) keys.push(k)
      }
      keys.forEach(function (k) {
        window.localStorage.removeItem(k)
      })
    } catch (e) {}
  }

  function getCurrentNurseId() {
    try {
      var id = window.localStorage.getItem(storageKey('session-nurse-id'))
      if (id) return id
    } catch (e) {}
    return 'nurse-001'
  }

  function setCurrentNurseId(nurseId) {
    try {
      window.localStorage.setItem(storageKey('session-nurse-id'), nurseId)
    } catch (e) {}
  }

  function findNurseByAccount(account, password) {
    var nurses = getCollection('nurses')
    for (var i = 0; i < nurses.length; i += 1) {
      if (nurses[i].account === account && nurses[i].password === password) return nurses[i]
    }
    return null
  }

  function getCurrentAdminId() {
    try {
      var id = window.localStorage.getItem(storageKey('session-admin-id'))
      if (id) return id
    } catch (e) {}
    return 'admin-001'
  }

  function setCurrentAdminId(adminId) {
    try {
      window.localStorage.setItem(storageKey('session-admin-id'), adminId)
    } catch (e) {}
  }

  function findAdminByAccount(account, password) {
    var admins = getCollection('admins')
    for (var i = 0; i < admins.length; i += 1) {
      if (admins[i].account === account && admins[i].password === password) return admins[i]
    }
    return null
  }

  function setSelectedPatientId(patientId) {
    try {
      window.localStorage.setItem(storageKey('selected-patient-id'), patientId)
    } catch (e) {}
  }

  function getSelectedPatientId() {
    try {
      return window.localStorage.getItem(storageKey('selected-patient-id')) || ''
    } catch (e) {}
    return ''
  }

  function setEditingTemplateId(templateId) {
    try {
      if (templateId) window.localStorage.setItem(storageKey('editing-template-id'), templateId)
      else window.localStorage.removeItem(storageKey('editing-template-id'))
    } catch (e) {}
  }

  function getEditingTemplateId() {
    try {
      return window.localStorage.getItem(storageKey('editing-template-id')) || ''
    } catch (e) {}
    return ''
  }

  window.NURSE_PORTAL_SOURCE = {
    seed: SEED,
    get: getCollection,
    set: setCollection,
    getHealthRecord: getHealthRecord,
    setHealthRecord: setHealthRecord,
    clearSession: clearSession,
    getCurrentNurseId: getCurrentNurseId,
    setCurrentNurseId: setCurrentNurseId,
    findNurseByAccount: findNurseByAccount,
    getCurrentAdminId: getCurrentAdminId,
    setCurrentAdminId: setCurrentAdminId,
    findAdminByAccount: findAdminByAccount,
    setSelectedPatientId: setSelectedPatientId,
    getSelectedPatientId: getSelectedPatientId,
    setEditingTemplateId: setEditingTemplateId,
    getEditingTemplateId: getEditingTemplateId
  }
})()
