/* ================================================================
   智汇签 · 校园智能报销审批平台 —— 高保真交互原型
   纯前端 Mock 数据驱动，无后端依赖
================================================================ */

/* ---------------- 基础数据 ---------------- */
const COLORS = {
  blue:   ['#EEF2FF', '#2E5BFF'],
  green:  ['#E6F7F1', '#12A678'],
  orange: ['#FEF3E4', '#F5912E'],
  purple: ['#F0EDFE', '#7657F5'],
  cyan:   ['#E5F6FA', '#0EA5C9'],
  red:    ['#FDECEC', '#E5484D']
};

const STATUS = {
  doing:    {label: '审批中',  cls: 'tag-blue'},
  paid:     {label: '已打款',  cls: 'tag-green'},
  rejected: {label: '已驳回',  cls: 'tag-red'},
  draft:    {label: '草稿',    cls: 'tag-gray'}
};

const TYPES = {
  travel:   {label: '差旅费', icon: '✈️', color: 'blue',
             desc: '出差、外出参会的交通、住宿与补助', freq: '约 33%',
             chain: [['申请人提交','张同学','即时'],['部门主管审批','李主任','1 个工作日'],['财务审核','陈会计','1 个工作日'],['出纳打款','财务出纳','1 个工作日']]},
  fund:     {label: '科研 / 项目基金', icon: '🔬', color: 'purple',
             desc: '科研经费、项目基金相关支出报销', freq: '约 42%',
             chain: [['申请人提交','张同学','即时'],['项目负责人审批','王老师','1 个工作日'],['部门 / 科研院审核','李主任','1 个工作日'],['财务审核','陈会计','1 个工作日'],['出纳打款','财务出纳','1 个工作日']]},
  purchase: {label: '大批物资采购', icon: '📦', color: 'orange',
             desc: '设备、耗材等大额物资集中采购报销', freq: '约 17%',
             chain: [['申请人提交','张同学','即时'],['部门主管审批','李主任','1 个工作日'],['采购与财务复核','陈会计','2 个工作日'],['大额审批（≥1万元）','赵校长','1 个工作日',true],['出纳打款','财务出纳','1 个工作日']]},
  activity: {label: '学生活动 / 竞赛经费', icon: '🎯', color: 'green',
             desc: '学科竞赛、社团活动、学生工作经费', freq: '高频 83%',
             chain: [['申请人提交','张同学','即时'],['指导老师审批','王老师','1 个工作日'],['团委 / 部门审批','李主任','1 个工作日'],['财务审核','陈会计','1 个工作日'],['出纳打款','财务出纳','1 个工作日']]}
};

const ROLES = {
  student: {name:'张同学', short:'张', avatar:'av-blue', role:'申请人 · 电子信息学院',
            hello:'本周你有 <b>2</b> 张单据正在审批，<b>1</b> 笔报销 ¥860.00 已到账。报销周期已从「周级」缩短到「天级」。',
            stats:[['blue','📑','本年报销','6 <small>笔</small>',''],
                   ['purple','💰','累计金额','¥10,726',''],
                   ['orange','⏳','进行中','2 <small>笔</small>',''],
                   ['green','✅','已到账','4 <small>笔</small>','']]},
  teacher: {name:'王老师', short:'王', avatar:'av-green', role:'教师 · 项目负责人',
            hello:'您有 <b>1</b> 张项目经费单据待审批，本人 <b>2</b> 张差旅报销正在流转。',
            stats:[['blue','📑','本年报销','11 <small>笔</small>',''],
                   ['purple','💰','累计金额','¥58,420',''],
                   ['orange','🔔','待我审批','1 <small>笔</small>',''],
                   ['green','✅','已办结','8 <small>笔</small>','']]},
  manager: {name:'李主任', short:'李', avatar:'av-orange', role:'部门主管 · 审批人',
            hello:'您有 <b>2</b> 张单据待审批，其中 <b>1</b> 张即将超时，系统已自动催办申请人。',
            stats:[['orange','🔔','待我审批','2 <small>笔</small>',''],
                   ['blue','✔️','本周已办','9 <small>笔</small>',''],
                   ['red','⚠️','超时预警','1 <small>笔</small>',''],
                   ['green','⏱','平均耗时','0.8 <small>天</small>','<span class="trend">低于全校均值</span>']]},
  finance: {name:'陈会计', short:'陈', avatar:'av-purple', role:'财务审批人 · 财务处',
            hello:'今日有 <b>17</b> 张单据待审核，本月已归档 <b>213</b> 张，平均处理时长 2.3 天。',
            stats:[['orange','🔔','今日待审核','17 <small>笔</small>',''],
                   ['blue','📦','本月归档','213 <small>笔</small>',''],
                   ['green','⏱','平均时长','2.3 <small>天</small>','<span class="trend">▼ 38%</span>'],
                   ['purple','💰','本年总额','¥128.6<small>万</small>','']]},
  leader:  {name:'赵校长', short:'赵', avatar:'av-cyan', role:'校领导 · 大额审批',
            hello:'有 <b>1</b> 笔 ≥1 万元的大额采购待您审批，可在移动端快速处理。',
            stats:[['orange','🔔','大额待审','1 <small>笔</small>',''],
                   ['purple','💰','本月大额','¥7.0<small>万</small>',''],
                   ['blue','📊','本年审批','36 <small>笔</small>',''],
                   ['green','⏱','平均耗时','1.2 <small>天</small>','']]}
};

/* 当前角色待办：节点处理人 -> 角色 */
const NODE_HANDLER = { '王老师':'teacher', '李主任':'manager', '陈会计':'finance', '赵校长':'leader' };

/* 单据 Mock */
let CLAIMS = [
  {id:'BX20260912-021', type:'travel', title:'赴杭州参加全国大学生电子设计竞赛', amount:1286.50,
   status:'doing', applicant:'张同学', date:'2026-09-12', sla:'剩余 6 小时', slaWarn:true, place:'杭州 · 浙大紫金港',
   project:'—', invoices:['火车票 ￥538.5','住宿费 ￥460','会务费 ￥288'],
   chain:[['提交申请','张同学','done','09-12 09:20',''],
          ['部门主管审批','李主任','doing','',''],
          ['财务审核','陈会计','todo','',''],
          ['出纳打款','财务出纳','todo','','']]},
  {id:'BX20260915-023', type:'activity', title:'辩论社招新宣传物料制作', amount:680.00,
   status:'doing', applicant:'张同学', date:'2026-09-15', sla:'剩余 2 小时（即将超时）', slaWarn:true, place:'—',
   project:'—', invoices:['打印海报 ￥380','展架横幅 ￥300'],
   chain:[['提交申请','张同学','done','09-14 16:40',''],
          ['指导老师审批','王老师','done','09-15 08:50','同意，社团招新使用'],
          ['团委 / 部门审批','李主任','doing','',''],
          ['财务审核','陈会计','todo','',''],
          ['出纳打款','财务出纳','todo','','']]},
  {id:'BX20260908-015', type:'fund', title:'智能传感器项目实验耗材采购', amount:3420.00,
   status:'doing', applicant:'张同学', date:'2026-09-08', sla:'剩余 1 个工作日', slaWarn:false, place:'—',
   project:'KY-2026-042 · 智能传感器研究', invoices:['传感器模组 ￥2,160','杜邦线/面包板 ￥260','示波器探头 ￥1,000'],
   chain:[['提交申请','张同学','done','09-08 14:12',''],
          ['项目负责人审批','王老师','done','09-09 10:05','经费预算内，同意'],
          ['部门 / 科研院审核','李主任','done','09-10 09:30','审核通过'],
          ['财务审核','陈会计','doing','',''],
          ['出纳打款','财务出纳','todo','','']]},
  {id:'BX20260905-012', type:'purchase', title:'机房升级显示器 20 台（批量采购）', amount:42800.00,
   status:'doing', applicant:'王老师', date:'2026-09-05', sla:'剩余 1 个工作日', slaWarn:false, place:'—',
   project:'—', invoices:['增值税专用发票 ￥42,800','采购合同 1 份','验收单 1 份'],
   chain:[['提交申请','王老师','done','09-05 11:00',''],
          ['部门主管审批','李主任','done','09-06 15:20',''],
          ['采购与财务复核','陈会计','done','09-08 16:40','票据齐全，预算科目正确'],
          ['大额审批（≥1万元）','赵校长','doing','',''],
          ['出纳打款','财务出纳','todo','','']]},
  {id:'BX20260913-020', type:'purchase', title:'实验室办公电脑 5 台', amount:27500.00,
   status:'doing', applicant:'张同学', date:'2026-09-13', sla:'剩余 2 个工作日', slaWarn:false, place:'—',
   project:'—', invoices:['增值税发票 ￥27,500','询价单 3 份'],
   chain:[['提交申请','张同学','done','09-13 10:30',''],
          ['部门主管审批','李主任','done','09-13 17:05','同意'],
          ['采购与财务复核','陈会计','doing','',''],
          ['大额审批（≥1万元）','赵校长','todo','',''],
          ['出纳打款','财务出纳','todo','','']]},
  {id:'BX20260911-019', type:'fund', title:'物联网教改项目教材与套件费', amount:890.00,
   status:'doing', applicant:'刘同学', date:'2026-09-11', sla:'剩余 8 小时', slaWarn:true, place:'—',
   project:'KY-2025-118 · 物联网教学改革', invoices:['开发套件 ￥640','参考教材 ￥250'],
   chain:[['提交申请','刘同学','done','09-11 15:50',''],
          ['项目负责人审批','王老师','doing','',''],
          ['部门 / 科研院审核','李主任','todo','',''],
          ['财务审核','陈会计','todo','',''],
          ['出纳打款','财务出纳','todo','','']], cc:true},
  {id:'BX20260910-018', type:'activity', title:'迎新社团物料费（KT板 / 工作证）', amount:860.00,
   status:'paid', applicant:'张同学', date:'2026-09-09', place:'—', project:'—',
   invoices:['KT 展板 ￥520','工作证挂绳 ￥340'],
   chain:[['提交申请','张同学','done','09-09 10:00',''],
          ['指导老师审批','王老师','done','09-09 14:20','同意'],
          ['团委 / 部门审批','李主任','done','09-10 09:00',''],
          ['财务审核','陈会计','done','09-10 15:30',''],
          ['出纳打款','财务出纳','done','09-11 16:02','已支付至招行尾号3407']]},
  {id:'BX20260828-006', type:'activity', title:'迎新晚会舞台布置与道具', amount:1520.00,
   status:'paid', applicant:'张同学', date:'2026-08-28', place:'—', project:'—',
   invoices:['舞台物料 ￥1,180','道具租赁 ￥340'],
   chain:[['提交申请','张同学','done','08-28 09:10',''],
          ['指导老师审批','王老师','done','08-28 13:00',''],
          ['团委 / 部门审批','李主任','done','08-29 10:20',''],
          ['财务审核','陈会计','done','08-30 11:00',''],
          ['出纳打款','财务出纳','done','08-31 15:40','']]},
  {id:'BX20260901-004', type:'travel', title:'赴上海产学研基地调研差旅', amount:2180.00,
   status:'paid', applicant:'张同学', date:'2026-09-01', place:'上海 · 张江', project:'—',
   invoices:['高铁票 ￥890','住宿费 ￥960','市内交通 ￥330'],
   chain:[['提交申请','张同学','done','09-01 08:40',''],
          ['部门主管审批','李主任','done','09-01 11:20',''],
          ['财务审核','陈会计','done','09-02 09:50',''],
          ['出纳打款','财务出纳','done','09-03 14:15','']]},
  {id:'BX20260903-009', type:'travel', title:'赴北京参加高等教育信息化年会', amount:3560.00,
   status:'rejected', applicant:'张同学', date:'2026-09-03', place:'北京 · 国家会议中心', project:'—',
   invoices:['机票 ￥1,860','住宿费 ￥1,520（超标）'],
   chain:[['提交申请','张同学','done','09-03 09:00',''],
          ['部门主管审批','李主任','done','09-03 16:30','同意'],
          ['财务审核','陈会计','reject','09-04 10:24','住宿费超出差旅标准，且缺少住宿发票，请补充后重新提交'],
          ['出纳打款','财务出纳','todo','','']]},
  {id:'BX20260914-022', type:'activity', title:'RoboMaster 机器人竞赛报名费', amount:2400.00,
   status:'draft', applicant:'张同学', date:'2026-09-14', place:'—', project:'—',
   invoices:['缴费通知（待上传）'],
   chain:[['提交申请','张同学','todo','',''],
          ['指导老师审批','王老师','todo','',''],
          ['团委 / 部门审批','李主任','todo','',''],
          ['财务审核','陈会计','todo','',''],
          ['出纳打款','财务出纳','todo','','']]}
];

/* ---------------- 全局状态 ---------------- */
const App = {
  role: 'student',
  page: 'dashboard',
  mineView: 'list',
  mineTab: 'all',
  approvalTab: 'todo',
  openClaimId: null
};

/* ---------------- 工具 ---------------- */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => '¥' + n.toLocaleString('zh-CN', {minimumFractionDigits:2, maximumFractionDigits:2});
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let toastTimer;
function toast(msg){
  const t = $('#toast');
  t.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none"><path d="M9 12l2 2 4-4" stroke="#12A678" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="#12A678" stroke-width="1.8"/></svg>' + esc(msg);
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2300);
}

/* 当前角色能看到的单据 */
function myClaims(){
  if (App.role === 'student') return CLAIMS.filter(c => c.applicant === '张同学');
  if (App.role === 'teacher') return CLAIMS.filter(c => c.applicant === '王老师');
  return CLAIMS.filter(c => c.applicant === ROLES[App.role].name);
}
function todoClaims(){
  return CLAIMS.filter(c => c.status === 'doing' &&
    c.chain.some(n => n[2] === 'doing' && NODE_HANDLER[n[1]] === App.role));
}
function doneClaims(){
  return CLAIMS.filter(c =>
    c.chain.some(n => (n[2] === 'done' || n[2] === 'reject') && NODE_HANDLER[n[1]] === App.role));
}
function ccClaims(){ return CLAIMS.filter(c => c.cc); }

/* ---------------- 登录 / 角色 ---------------- */
App.login = function(){
  $('#login').style.display = 'none';
  $('#app').style.display = 'flex';
  App.applyRole();
  App.go('dashboard');
};
App.logout = function(){
  $('#app').style.display = 'none';
  $('#login').style.display = 'grid';
  $('#roleSwitch').classList.remove('open');
};

function bindLoginChips(){
  $$('.role-chip').forEach(chip => chip.onclick = () => {
    $$('.role-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    App.role = chip.dataset.role;
  });
}

App.switchRole = function(role){
  App.role = role;
  $('#roleSwitch').classList.remove('open');
  // 同步登录页选中态
  $$('.role-chip').forEach(c => c.classList.toggle('active', c.dataset.role === role));
  App.applyRole();
  App.notice.reloadByRole();
  App.notice.updateBellBadge();
  toast('已切换为：' + ROLES[role].name);
};

App.applyRole = function(){
  const r = ROLES[App.role];
  $('#topName').textContent = r.name;
  $('#topRole').textContent = r.role;
  const av = $('#topAvatar');
  av.textContent = r.short;
  av.className = 'avatar ' + r.avatar;
  // 进程看板副标题按角色问候
  const pbSub = $('#pbSub');
  if (pbSub && !pbSub.dataset.bound){
    pbSub.dataset.bound = '1';
  }

  // 导航权限
  $$('.nav-item').forEach(item => {
    const allow = item.dataset.roles ? item.dataset.roles.split(',').includes(App.role) : true;
    item.style.display = allow ? '' : 'none';
  });
  // 侧栏小贴士只对申请人
  $$('.sidebar-card').forEach(el => {
    const allow = el.dataset.roles ? el.dataset.roles.split(',').includes(App.role) : true;
    el.style.display = allow ? '' : 'none';
  });
  const todoN = todoClaims().length;
  const badge = $('#navTodoCount');
  badge.style.display = todoN ? '' : 'none';
  badge.textContent = todoN;

  App.renderDashboard();
  App.renderMine();
  App.renderApproval();
  App.renderFinance();
  // 若当前页无权限，回工作台
  const cur = $('.nav-item.active');
  if (cur && cur.style.display === 'none') App.go('dashboard');
};

/* ---------------- 路由 ---------------- */
App.go = function(page){
  App.page = page;
  $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === page));
  $$('.page').forEach(p => p.classList.toggle('active', p.dataset.page === page));
  window.scrollTo({top:0});
  if (page === 'finance') App.renderFinance(true);
};

function bindNav(){
  $$('.nav-item').forEach(item => item.onclick = () => {
    if (item.style.display !== 'none'){
      App.go(item.dataset.page);
      document.querySelector('.sidebar').classList.remove('show');
    }
  });
}

/* ---------------- 工作台 ---------------- */
App.renderDashboard = function(){
  const r = ROLES[App.role];
  $('#dashStats').innerHTML = r.stats.map(([c,ico,lab,val,trend]) => `
    <div class="stat-card">
      <div class="sc-ico si-${c}" style="background:${COLORS[c][0]};color:${COLORS[c][1]}">${ico}</div>
      <div><div class="num">${val}</div><div class="lab">${lab} ${trend}</div></div>
    </div>`).join('');

  // 进程看板：展示进行中的单据流程轨道
  const active = CLAIMS.filter(c => c.status === 'doing');
  if (active.length){
    $('#pbSub').innerHTML = `当前有 <b style="color:var(--primary)">${active.length}</b> 张单据正在审批，点击任一条可查看详情`;
    $('#pbLanes').innerHTML = active.map(c => processLane(c)).join('');
  } else {
    $('#pbSub').textContent = '暂无进行中的单据，发起一笔报销试试吧';
    $('#pbLanes').innerHTML = `<div class="pb-empty"><div class="pb-empty-ico">🌿</div>当前没有进行中的单据</div>`;
  }

  $('#typeGrid').innerHTML = Object.entries(TYPES).map(([k,t]) => {
    const [bg,fg] = COLORS[t.color];
    return `<div class="type-card" onclick="App.startCreate('${k}')">
      <div class="tc-top">
        <div class="tc-ico" style="background:${bg};color:${fg}">${t.icon}</div>
        <span class="tc-freq">${t.freq}</span>
      </div>
      <h4>${t.label}</h4>
      <p>${t.desc}</p>
      <div class="tc-chain">${t.chain.slice(0,3).map(x=>`<b>${x[0]}</b>`).join('<span class="tc-arrow">→</span>')} …</div>
    </div>`;
  }).join('');

  // 列表区：审批角色看待办，申请人看进行中
  const isApprover = ['manager','finance','leader','teacher'].includes(App.role);
  let list, title;
  if (isApprover && todoClaims().length){
    list = todoClaims(); title = '待我审批';
  } else {
    list = myClaims().filter(c => c.status === 'doing'); title = '进行中的报销';
  }
  $('#dashListTitle').textContent = title;
  $('#dashList').innerHTML = list.length ? list.slice(0,4).map(c => miniItem(c, isApprover && todoClaims().includes(c))).join('')
    : `<div class="empty" style="box-shadow:none"><div class="empty-ico">🎉</div>当前没有进行中的单据</div>`;
};

function miniItem(c, isTodo){
  const t = TYPES[c.type], [bg,fg] = COLORS[t.color];
  const st = STATUS[c.status];
  return `<div class="mini-item" onclick="App.go('${isTodo ? 'approval' : 'mine'}')">
    <div class="mi-ico" style="background:${bg};color:${fg}">${t.icon}</div>
    <div class="mi-main">
      <b>${esc(c.title)}</b>
      <span>${c.id} · ${esc(c.applicant)} · ${c.date}</span>
    </div>
    <div class="mi-right">
      <div class="mi-amount">${money(c.amount)}</div>
      <div class="mi-node">${isTodo ? '⏳ 待您处理' : (c.chain.find(n=>n[2]==='doing')||[''])[0] || st.label}</div>
    </div>
  </div>`;
}

/* 横向流程轨道：把单据 chain 渲染为 节点-连线-节点 的横向进度条 */
function processLane(c){
  const t = TYPES[c.type], [,fg] = COLORS[t.color];
  const slaHtml = c.sla ? `<span class="pb-lane-sla ${c.slaWarn?'warn':'ok'}">⏱ ${c.sla}</span>` : '';
  const nodes = c.chain;
  // 构建节点与连线
  let html = `<div class="pb-lane" onclick="App.openDrawer('${c.id}')">
    <div class="pb-lane-head">
      <span class="pb-lane-type" style="background:${COLORS[t.color][0]};color:${fg}">${t.icon} ${t.label}</span>
      <b>${esc(c.title)}</b>
      <span class="pb-lane-sla ${c.slaWarn?'warn':'ok'}" title="处理时限">${c.sla?'⏱ '+c.sla:'—'}</span>
      <span class="pb-lane-amount">${money(c.amount)}</span>
      <span class="pb-lane-id">${c.id}</span>
    </div>
    <div class="pb-track">`;
  nodes.forEach((n, i) => {
    const [name, who, state] = n;
    const dotSym = state==='done' ? '✓' : state==='reject' ? '✕' : state==='doing' ? '●' : '';
    const handlerLabel = state==='doing' ? (who + (c.sla? ' · '+c.sla : '')) : '';
    html += `<div class="pb-node ${state}">
      ${state==='doing' ? `<div class="pb-handler">${esc(handlerLabel)}</div>` : ''}
      <div class="pb-dot">${dotSym}</div>
      <div class="pb-name">${esc(name)}</div>
    </div>`;
    if (i < nodes.length - 1){
      // 连线状态：当前段是否已走过 = 本节点已完成；若本节点被驳回则红色虚线
      let lineCls = '';
      if (state === 'done') lineCls = 'done';
      else if (state === 'reject') lineCls = 'reject';
      html += `<div class="pb-line ${lineCls}"></div>`;
    }
  });
  html += `</div></div>`;
  return html;
}

/* ---------------- 发起报销：分步向导 ---------------- */
const W = { type:null, step:1, invoices:[] };

App.startCreate = function(type){
  App.go('create');
  W.type = type; W.step = 1; W.invoices = [];
  // pick 选中
  $$('.pick-card').forEach(el => el.classList.toggle('sel', el.dataset.type === type));
  $('#toStep2').disabled = !type;
  renderPickGrid();
  W.goto(type ? 2 : 1);
};

function renderPickGrid(){
  $('#pickGrid').innerHTML = Object.entries(TYPES).map(([k,t]) => {
    const [bg,fg] = COLORS[t.color];
    return `<div class="pick-card ${W.type===k?'sel':''}" data-type="${k}" onclick="W.pick('${k}')">
      <div class="tc-ico" style="background:${bg};color:${fg}">${t.icon}</div>
      <div><h4>${t.label}</h4><p>${t.desc}</p>
        <div class="pc-chain">链路：${t.chain.map(x=>x[0]).join(' → ')}</div>
      </div>
      <div class="pick-check"></div>
    </div>`;
  }).join('');
}

W.pick = function(type){
  W.type = type;
  renderPickGrid();
  $('#toStep2').disabled = false;
};

W.goto = function(step){
  W.step = step;
  $$('.wstep').forEach(el => el.classList.toggle('active', +el.dataset.step === step));
  $$('.stepper .step').forEach(el => {
    const s = +el.dataset.step;
    el.classList.toggle('active', s === step);
    el.classList.toggle('done', s < step);
  });
  $$('.stepper .step-line').forEach((el,i) => el.classList.toggle('done', i+1 < step));
  if (step === 2) W.fillStep2();
  if (step === 4) W.fillStep4();
};

W.fillStep2 = function(){
  const t = TYPES[W.type];
  // 动态字段
  $('#fgProject').style.display = (W.type === 'fund') ? '' : 'none';
  const travelLike = W.type === 'travel';
  $('#fgPlace').style.display = travelLike ? '' : 'none';
  $('#fgDateStart').style.display = travelLike ? '' : 'none';
  $('#fgDateEnd').style.display = travelLike ? '' : 'none';
  // 差旅专用：出差申请卡片（与报销合并）
  $('#travelApply').style.display = travelLike ? '' : 'none';
  W.checkAmount();
  // 动态明细表
  const tableMap = {
    travel: {cols:['日期','行程 / 区间','交通工具','金额（元）'], rows:[['2026-10-12','学校 → 杭州东站','高铁二等座','538.5'],['2026-10-14','杭州 → 学校','高铁二等座','538.5']]},
    fund:   {cols:['采购日期','支出内容','数量','金额（元）'], rows:[['2026-10-08','传感器模组','12 只','2160'],['2026-10-08','示波器探头','2 个','1000']]},
    purchase:{cols:['物品名称','规格型号','数量','单价（元）','小计（元）'], rows:[['液晶显示器','27 寸 2K','20','2140','42800']]},
    activity:{cols:['物料 / 项目','用途说明','数量','单价（元）','小计（元）'], rows:[['KT 展板','社团招新展示','8','65','520'],['工作证 + 挂绳','工作人员凭证','170','2','340']]}
  };
  const m = tableMap[W.type];
  $('#detailCard').innerHTML = `
    <h3 class="fc-title">${W.type==='travel'?'费用明细 / 票据清单':W.type==='fund'?'费用清单':'采购清单'}
      <em class="tag tag-blue">可增删行</em></h3>
    <table class="detail-table">
      <thead><tr>${m.cols.map(c=>`<th>${c}</th>`).join('')}<th style="width:40px"></th></tr></thead>
      <tbody>${m.rows.map(r=>`<tr>${r.map(v=>`<td><input value="${v}"></td>`).join('')}<td><span class="add-row-btn" onclick="this.closest('tr').remove()">🗑</span></td></tr>`).join('')}</tbody>
    </table>
    <button class="add-row-btn" onclick="W.addRow(${m.cols.length})">＋ 添加一行</button>`;
};

/* 导出当前表单 */
W.exportForm = function(){
  const data = {
    __version: 1,
    type: W.type,
    typeLabel: TYPES[W.type]?.label,
    reason: $('#fReason').value,
    amount: $('#fAmount').value,
    project: $('#fProject')?.value,
    place: $('#fPlace')?.value,
    dateStart: $('#fgDateStart')?.querySelector('input')?.value,
    dateEnd: $('#fgDateEnd')?.querySelector('input')?.value,
    // 差旅专属
    travel: W.type==='travel' ? {
      tReason: $('#tReason').value,
      from: $('#tFrom').value, to: $('#tTo').value,
      dateFrom: $('#tDateFrom').value, dateBack: $('#tDateBack').value,
      transport: $('#tTransport').value,
      companion: $('#tCompanion').value,
      extra: $('#tExtra').value
    } : null,
    invoices: W.invoices,
    exportedAt: new Date().toISOString().slice(0,19).replace('T',' ')
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const typeCn = TYPES[W.type]?.label || '报销';
  const date = new Date().toISOString().slice(0,10);
  a.href = url; a.download = `报销单_${typeCn}_${date}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  toast('已导出为 JSON 文件');
};

/* 导入表单数据 */
W.importForm = function(input){
  const file = input.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try{
      const data = JSON.parse(e.target.result);
      if(!data.type) throw new Error('文件格式不正确');
      // 切换到对应类型
      W.type = data.type;
      // pick 选中态
      $$('.pick-card').forEach(el => el.classList.toggle('sel', el.dataset.type === data.type));
      $('#toStep2').disabled = false;
      // 跳到步骤2并填充
      W.goto(2);
      setTimeout(()=>{
        $('#fReason').value = data.reason || '';
        $('#fAmount').value = data.amount || '';
        if(data.place) $('#fPlace').value = data.place;
        // 日期字段是 input type=date，直接用 querySelector 拿
        const dsInput = document.querySelector('#fgDateStart input'); if(dsInput) dsInput.value = data.dateStart || '';
        const deInput = document.querySelector('#fgDateEnd input'); if(deInput) deInput.value = data.dateEnd || '';
        // 差旅专属字段
        if(data.travel && W.type==='travel'){
          $('#tReason').value = data.travel.tReason || '';
          $('#tFrom').value = data.travel.from || '';
          $('#tTo').value = data.travel.to || '';
          $('#tDateFrom').value = data.travel.dateFrom || '';
          $('#tDateBack').value = data.travel.dateBack || '';
          $('#tTransport').value = data.travel.transport || '高铁 / 火车';
          $('#tCompanion').value = data.travel.companion || '';
          $('#tExtra').value = data.travel.extra || '';
        }
        // 票据
        if(Array.isArray(data.invoices) && data.invoices.length){
          W.invoices = data.invoices;
          W.renderInvoices();
        }
        W.checkAmount();
        toast('已从 JSON 导入数据');
      }, 50);
    } catch(err){
      toast('导入失败：' + err.message);
    }
  };
  reader.readAsText(file);
  input.value = ''; // 重置以便重选同一文件
};

W.addRow = function(cols){
  const tb = $('#detailCard tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = Array(cols).fill('<td><input placeholder="请填写"></td>').join('') +
    '<td><span class="add-row-btn" onclick="this.closest(\'tr\').remove()">🗑</span></td>';
  tb.appendChild(tr);
};

W.checkAmount = function(){
  const v = parseFloat($('#fAmount').value) || 0;
  const hint = $('#amountHint');
  if (v >= 10000){
    hint.textContent = '⚠ 单笔 ≥ 1 万元，系统将自动增加「校领导」审批节点';
    hint.style.color = 'var(--orange)';
  } else if (v > 0 && W.type === 'travel' && v > 3000){
    hint.textContent = '提示：差旅住宿费 / 交通费超出标准时，财务审核可能退回，请确认标准';
  } else {
    hint.textContent = '';
  }
};

/* OCR 模拟：全屏进度遮罩 + 识别后自动回填 */
W.invoices = []; // 票据列表

W.simulateOCR = function(){
  // 全屏进度遮罩
  const overlay = document.createElement('div');
  overlay.className = 'ocr-overlay';
  overlay.innerHTML = `<div class="ocr-progress">
    <div class="spin"></div>
    <b>AI 正在识别发票…</b>
    <span>OCR + 二维码验真 + 重复报销校验</span>
    <div class="ocr-progress-bar"><div class="fill" id="ocrBar"></div></div>
  </div>`;
  document.body.appendChild(overlay);

  const bar = overlay.querySelector('#ocrBar');
  let p = 0;
  const timer = setInterval(()=>{
    p += Math.random()*18+6;
    if(p >= 100){ p = 100; clearInterval(timer); }
    bar.style.width = p + '%';
  }, 120);

  setTimeout(()=>{
    overlay.remove();
    // 识别结果 → 回填到表单
    const amt = '1286.50';
    $('#invCode').value = '033001900111';
    $('#invNo').value = '48291036';
    $('#invDate').value = '2026-10-12';
    $('#invAmt').value = amt;
    $('#invSeller').value = '杭州xx科技有限公司';
    $('#invItem').value = '*运输服务*客运服务';
    W.syncInvAmount();
    // 自动加入列表
    W.addInvoice(true);
    // 顶部滑入成功卡片
    const card = document.createElement('div');
    card.className = 'ocr-success-card';
    card.innerHTML = `<div class="ok-ico">✓</div>
      <div><b>识别完成，已自动回填</b><span>发票代码 033001900111 · ¥${amt} · 验真通过</span></div>
      <div style="display:flex;flex-direction:column;gap:4px">
        <button onclick="this.closest('.ocr-success-card').remove()" style="background:none;border:none;color:var(--ink-3);font-size:11px;cursor:pointer">关闭</button>
      </div>`;
    document.body.appendChild(card);
    setTimeout(()=>card.remove(), 6000);
  }, 1600);
};

W.syncInvAmount = function(){
  const amt = parseFloat($('#invAmt').value) || 0;
  // 更新已存在最后一张的金额
  if(W.invoices.length > 0){
    const last = W.invoices[W.invoices.length-1];
    last.amt = amt;
  }
  W.renderInvoices();
};

W.addInvoice = function(auto){
  const code = $('#invCode').value.trim();
  const no = $('#invNo').value.trim();
  const date = $('#invDate').value;
  const amt = parseFloat($('#invAmt').value) || 0;
  const seller = $('#invSeller').value.trim();
  const item = $('#invItem').value.trim();
  if(!auto && !code && !no && amt===0){ toast('请先填写至少一个字段'); return; }

  W.invoices.push({ code, no, date, amt, seller, item });
  W.renderInvoices();

  // 清空表单（保留空状态下次好填）
  $('#invCode').value = '';
  $('#invNo').value = '';
  $('#invDate').value = '';
  $('#invAmt').value = '';
  $('#invSeller').value = '';
  $('#invItem').value = '';

  if(!auto) toast('已添加一张票据');
};

W.renderInvoices = function(){
  const list = W.invoices;
  const $empty = $('#ieEmpty');
  const $list = $('#ieList');
  if(list.length === 0){
    $empty.style.display = 'flex';
    $list.innerHTML = '';
  } else {
    $empty.style.display = 'none';
    $list.innerHTML = list.map((inv,i)=>`
      <div class="ie-item">
        <div class="ie-thumb">🧾</div>
        <div class="ie-info">
          <b>${inv.no || inv.code || '未知发票'}</b>
          <span>${inv.seller || inv.item || '—'} · ${inv.date || '—'}</span>
        </div>
        <div class="ie-amt">¥${inv.amt.toFixed(2)}</div>
        <div class="ie-del" onclick="App.wizard.removeInvoice(${i})">🗑</div>
      </div>`).join('');
  }
  const total = list.reduce((s,x)=>s+x.amt, 0);
  $('#invCount').textContent = list.length;
  $('#invTotal').textContent = total.toFixed(2);
};

W.removeInvoice = function(i){
  W.invoices.splice(i,1);
  W.renderInvoices();
};

/* 旧的 uploadZone 事件绑定移除（不再需要） */

W.fillStep4 = function(){
  const t = TYPES[W.type];
  const amt = parseFloat($('#fAmount').value) || 0;
  const reason = $('#fReason').value || '（示例）' + ({
    travel:'赴杭州参加全国大学生电子设计竞赛',
    fund:'智能传感器项目实验耗材采购',
    purchase:'机房升级显示器 20 台',
    activity:'社团招新宣传物料制作'}[W.type]);
  const rows = [
    ['报销类型', t.label],
    ['报销事由', reason],
    ['报销金额', money(amt || (W.type==='purchase'?42800:W.type==='fund'?3420:W.type==='travel'?1286.5:860))],
    ['申请人 / 部门', '张同学 · 电子信息学院'],
    ['票据', '1 张（OCR 已核验）'],
    ['收款账户', '招商银行 尾号 3407']
  ];
  if (W.type==='travel') rows.splice(3,0,['出差地点', $('#fPlace').value || '杭州 · 浙大紫金港'],['出差日期','2026-10-12 至 2026-10-14']);
  if (W.type==='fund') rows.splice(3,0,['关联项目', $('#fProject').value.split(' · ')[0]]);
  $('#summaryTable').innerHTML = rows.map(r=>`<tr><td>${r[0]}</td><td>${esc(r[1])}</td></tr>`).join('');
  $('#confirmInvoice').innerHTML = `<div class="im-ico">🧾</div><div><b>增值税电子普通发票</b><span>No.48291036 · 二维码验真通过 · 未重复报销</span></div>
    <span class="tag tag-green" style="margin-left:auto">已核验</span>`;

  // 链路：按金额动态加入大额节点
  const big = amt >= 10000;
  let chain = t.chain.map((x,i)=>{
    const auto = x[3] === true && !big; // 条件不满足的大额节点
    return {name:x[0], who:x[1], sla:x[2], state: i===0 ? 'done' : (i===1?'current':'todo'), hide:auto};
  }).filter(x=>!x.hide);
  $('#chainPreview').innerHTML = chain.map((x,i) => `
    <div class="chain-node ${x.state}">
      <div class="cn-dot">${i===0?'✓':i+1}</div>
      <div class="cn-body">
        <b>${x.name} <span class="cn-sla">⏱ 时限 ${x.sla}</span>${i===1?'<span class="tag tag-orange">当前节点</span>':''}</b>
        <span>处理人：${x.who}${i===0?' · 已完成':''}${i===1?' · 已发送审批通知':''}</span>
      </div>
    </div>`).join('') +
    `<div class="chain-node done"><div class="cn-dot">🏁</div><div class="cn-body"><b>完成打款 <span class="cn-sla">预计 2-4 个工作日</span></b><span>报销款支付至本人银行卡，全程短信通知</span></div></div>`;
};

W.submit = function(){
  const t = TYPES[W.type];
  const amt = parseFloat($('#fAmount').value) || (W.type==='purchase'?42800:W.type==='fund'?3420:W.type==='travel'?1286.5:860);
  const reason = $('#fReason').value || ({
    travel:'赴杭州参加全国大学生电子设计竞赛',
    fund:'智能传感器项目实验耗材采购',
    purchase:'机房升级显示器 20 台',
    activity:'社团招新宣传物料制作'}[W.type]);
  const now = new Date();
  const id = 'BX' + now.getFullYear() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0') + '-' + String(Math.floor(Math.random()*900)+100);
  const chain = t.chain.filter(x => !(x[3]===true && amt<10000)).map((x,i)=>[x[0],x[1], i===0?'done':i===1?'doing':'todo', i===0?'刚刚':'','']);
  chain.push(['出纳打款','财务出纳','todo','','']);
  CLAIMS.unshift({id, type:W.type, title:reason, amount:amt, status:'doing',
    applicant: ROLES[App.role].name, date: now.toISOString().slice(0,10),
    sla:'剩余 1 个工作日', slaWarn:false,
    place: W.type==='travel' ? ($('#fPlace').value||'杭州') : '—',
    project: W.type==='fund' ? $('#fProject').value : '—',
    invoices: W.invoices.length ? W.invoices.map(i=>`${i.seller||i.item||'发票'} ￥${i.amt}`).join(', ') : '电子发票 ￥' + amt, chain});
  // 重置
  $('#fReason').value = ''; $('#fAmount').value = '';
  W.type = null; W.invoices = []; W.renderInvoices();
  toast('提交成功！单据 ' + id + ' 已进入审批流程');
  // 提交后生成新通知
  App.notice.addAfterSubmit(id, W.type, amt);
  App.applyRole();
  App.go('mine');
};
App.wizard = W;

/* ---------------- 通知系统 ---------------- */
const NOTIFY_SEEDS = {
  student: [
    {type:'todo', ico:'📋', tag:'t-todo', title:'你的报销单 BX20260915-018 等待审批人确认', desc:'事由：赴杭州参加电子设计竞赛 · 已提交 4 小时', time:'10 分钟前', unread:true, data:'BX20260915-018'},
    {type:'todo', ico:'⏰', tag:'t-urgent', title:'单据 BX20260914-009 即将超时', desc:'审批人 李主任 已 12 小时未处理，请耐心等待或稍后催办', time:'2 小时前', unread:true, data:'BX20260914-009'},
    {type:'system', ico:'✅', tag:'t-success', title:'单据 BX20260913-021 已通过部门主管审批', desc:'当前环节：财务审核 · 预计 1 个工作日内完成', time:'5 小时前', unread:true, data:'BX20260913-021'},
    {type:'system', ico:'💬', tag:'t-info', title:'系统公告：国庆假期报销受理安排', desc:'10 月 1 日 - 7 日财务窗口暂停，9 日起恢复办理', time:'昨天 17:30', unread:false, data:null},
    {type:'todo', ico:'↩️', tag:'t-urgent', title:'单据 BX20260910-017 被驳回，需要补充材料', desc:'财务意见：缺少住宿费发票，请在线修改重提，无需重新打印', time:'2 天前', unread:false, data:'BX20260910-017'}
  ],
  teacher: [
    {type:'todo', ico:'📋', tag:'t-todo', title:'你有 3 条待审批的报销单', desc:'电子信息学院学生提交，最新一条：学生社团活动经费 ¥680.00', time:'刚刚', unread:true, data:null},
    {type:'system', ico:'✅', tag:'t-success', title:'你审批通过的 BX20260912-015 已流转到财务', desc:'学生：李同学 · 事由：科研基金采购 · 金额 ¥3,160', time:'3 小时前', unread:false, data:'BX20260912-015'},
    {type:'system', ico:'💬', tag:'t-info', title:'系统公告：审批时限提醒', desc:'请在 24 小时内处理待办，超时将自动催办', time:'昨天', unread:false, data:null}
  ],
  manager: [
    {type:'todo', ico:'📋', tag:'t-todo', title:'你有 5 条待审批单据', desc:'其中 2 条即将超时，建议尽快处理', time:'15 分钟前', unread:true, data:null},
    {type:'todo', ico:'⏰', tag:'t-urgent', title:'⚠ BX20260911-023 审批超时', desc:'差旅报销 ¥4,280 · 已 36 小时未处理，系统将升级给分管领导', time:'1 小时前', unread:true, data:'BX20260911-023'},
    {type:'system', ico:'📊', tag:'t-info', title:'本周部门报销统计已生成', desc:'共 23 笔，总金额 ¥86,420，同比上周 +12%', time:'昨天', unread:false, data:null}
  ],
  finance: [
    {type:'todo', ico:'💰', tag:'t-todo', title:'你有 8 张待审核票据', desc:'含 1 张大额（≥1 万）和 3 张差旅发票', time:'5 分钟前', unread:true, data:null},
    {type:'todo', ico:'📋', tag:'t-todo', title:'BX20260915-003 等待打款', desc:'金额 ¥12,860.00 · 所有审批节点已通过，请发起银行转账', time:'刚刚', unread:true, data:'BX20260915-003'},
    {type:'system', ico:'⚠️', tag:'t-urgent', title:'BX20260914-019 发票重复报销', desc:'与历史单据 BX20260828-011 发票代码号码一致，已自动拦截', time:'2 小时前', unread:true, data:'BX20260914-019'},
    {type:'system', ico:'📊', tag:'t-info', title:'月度财务报表已生成', desc:'9 月报销总额 ¥128.6 万，较上月 +8.3%', time:'今天 09:00', unread:false, data:null}
  ],
  leader: [
    {type:'todo', ico:'👑', tag:'t-todo', title:'你有 2 条大额单据待最终审批', desc:'单笔 ≥ 5 万元，需要你和分管副校长双签', time:'20 分钟前', unread:true, data:null},
    {type:'system', ico:'✅', tag:'t-success', title:'BX20260912-028 已完成全部审批', desc:'采购 20 台显示器 ¥42,800，待出纳打款', time:'4 小时前', unread:false, data:'BX20260912-028'},
    {type:'system', ico:'📊', tag:'t-info', title:'校级报销周报已送达', desc:'本周全校报销 126 笔，总金额 ¥328 万', time:'今天 08:00', unread:false, data:null}
  ]
};

App.notice = {
  tab: 'all',
  list: [],

  init(){
    this.reloadByRole();
    this.updateBellBadge();
  },

  reloadByRole(){
    this.list = JSON.parse(JSON.stringify(NOTIFY_SEEDS[App.role] || NOTIFY_SEEDS.student));
  },

  open(){
    $('#noticeDrawer').classList.add('open');
    $('#noticeMask').classList.add('open');
    this.render();
  },

  close(){
    $('#noticeDrawer').classList.remove('open');
    $('#noticeMask').classList.remove('open');
  },

  switchTab(tab){
    this.tab = tab;
    $$('#ndTabs button').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
    this.render();
  },

  render(){
    let items = this.list;
    if(this.tab === 'todo') items = items.filter(n=>n.type==='todo');
    if(this.tab === 'system') items = items.filter(n=>n.type==='system');

    const todoCount = this.list.filter(n=>n.type==='todo' && n.unread).length;
    $('#ndTodoCount').textContent = todoCount;

    if(items.length === 0){
      $('#ndList').innerHTML = `<div class="nd-empty"><div class="nd-empty-ico">🎉</div><div>暂无${this.tab==='todo'?'待办':''}通知</div></div>`;
      return;
    }
    $('#ndList').innerHTML = items.map((n,i)=>`
      <div class="nd-item ${n.unread?'unread':''}" onclick="App.notice.readOne(${i}, '${n.data||''}')">
        <div class="nd-ico" style="background:${this.icoBg(n.type)}">${n.ico}</div>
        <div class="nd-body">
          <div class="nd-title">${n.title} <span class="nd-tag ${n.tag}">${this.typeLabel(n.type)}</span></div>
          <div class="nd-desc">${n.desc}</div>
          <div class="nd-time">${n.time}</div>
        </div>
      </div>`).join('');
  },

  icoBg(type){
    return type==='todo' ? '#FEF3C7' : type==='system' ? '#DBEAFE' : '#F3F4F6';
  },

  typeLabel(type){
    return {todo:'待办', system:'系统', urgent:'紧急'}[type] || '通知';
  },

  readOne(i, claimId){
    // 找到真实索引（因为过滤后的 items 索引和 list 不一样）
    let realIdx = i;
    let items = this.list;
    if(this.tab === 'todo') items = items.filter(n=>n.type==='todo');
    if(this.tab === 'system') items = items.filter(n=>n.type==='system');
    const target = items[i];
    realIdx = this.list.indexOf(target);
    if(realIdx >= 0){
      this.list[realIdx].unread = false;
      this.updateBellBadge();
      this.render();
    }
    // 如果有单据号 → 跳转
    if(claimId && claimId.startsWith('BX')){
      App.closeDrawer();
      App.notice.close();
      App.go('mine');
      // 高亮那条
      setTimeout(()=>{
        const row = document.querySelector(`[data-claim-id="${claimId}"]`);
        if(row){ row.scrollIntoView({behavior:'smooth', block:'center'}); row.style.boxShadow='0 0 0 2px var(--primary)'; setTimeout(()=>row.style.boxShadow='', 2500); }
      }, 300);
    }
  },

  readAll(){
    this.list.forEach(n=>n.unread=false);
    this.updateBellBadge();
    this.render();
    toast('已全部标记为已读');
  },

  updateBellBadge(){
    const unread = this.list.filter(n=>n.unread).length;
    const $bell = document.querySelector('.icon-btn.bell em');
    if(!$bell) return;
    if(unread === 0){ $bell.style.display = 'none'; }
    else { $bell.style.display = ''; $bell.textContent = unread > 99 ? '99+' : unread; }
  },

  addAfterSubmit(id, type, amt){
    const typeName = TYPES[type]?.label || '报销';
    this.list.unshift({
      type:'system', ico:'✅', tag:'t-success',
      title:`你的${typeName}单 ${id} 已提交成功`,
      desc:`金额 ¥${amt.toFixed(2)} · 当前等待 ${CLAIMS[0].chain[1][0]} 审批`,
      time:'刚刚', unread:true, data:id
    });
    // 3 秒后再来一条"审批提醒"模拟
    setTimeout(()=>{
      this.list.unshift({
        type:'todo', ico:'📋', tag:'t-todo',
        title:`新单据 ${id} 等待你的处理人审批`,
        desc:'系统已自动推送通知给第一个审批节点，请耐心等待',
        time:'刚刚', unread:true, data:id
      });
      this.updateBellBadge();
      this.render();
    }, 3000);
    this.updateBellBadge();
  }
};

/* ---------------- 我的单据 ---------------- */
App.renderMine = function(){
  // tabs
  const mine = myClaims();
  const tabs = [['all','全部',mine.length],['doing','审批中',mine.filter(c=>c.status==='doing').length],
               ['paid','已打款',mine.filter(c=>c.status==='paid').length],
               ['rejected','已驳回',mine.filter(c=>c.status==='rejected').length],
               ['draft','草稿',mine.filter(c=>c.status==='draft').length]];
  $('#mineTabs').innerHTML = tabs.map(([k,l,n])=>
    `<button class="ftab ${App.mineTab===k?'active':''}" onclick="App.mineTab='${k}';App.renderMine()">${l}<em>${n}</em></button>`).join('');

  let list = App.mineTab==='all' ? mine : mine.filter(c=>c.status===App.mineTab);
  const box = $('#mineList');
  if (!list.length){ box.innerHTML = `<div class="empty"><div class="empty-ico">📭</div>暂无相关单据</div>`; return; }

  if (App.mineView === 'table'){
    box.innerHTML = `<div class="table-wrap"><table class="data-table">
      <thead><tr><th>单号</th><th>类型</th><th>事由</th><th>金额</th><th>状态 / 当前节点</th><th>提交日期</th></tr></thead>
      <tbody>${list.map(c=>`<tr onclick="App.openDrawer('${c.id}')">
        <td>${c.id}</td><td>${TYPES[c.type].icon} ${TYPES[c.type].label}</td>
        <td>${esc(c.title)}</td><td><b>${money(c.amount)}</b></td>
        <td>${statusNode(c)}</td><td>${c.date}</td></tr>`).join('')}</tbody></table></div>`;
  } else if (App.mineView === 'card'){
    box.innerHTML = `<div class="card-grid">${list.map(c=>{
      const t=TYPES[c.type]; const [bg,fg]=COLORS[t.color]; const st=STATUS[c.status];
      return `<div class="claim-card" style="border-top-color:${fg}" onclick="App.openDrawer('${c.id}')">
        <div class="cc-head"><div style="display:flex;gap:10px;align-items:center">
          <div class="cr-type" style="background:${bg};color:${fg}">${t.icon}</div>
          <div><h4>${esc(c.title)}</h4><div class="cc-id">${c.id}</div></div></div>
          <span class="tag ${st.cls}">${st.label}</span></div>
        <div class="cc-amount">${money(c.amount)}</div>
        <div class="cc-foot"><span>${t.label}</span><span>${c.date}</span></div>
      </div>`;
    }).join('')}</div>`;
  } else {
    box.className = 'claim-list';
    box.innerHTML = list.map(c => claimRow(c, 'mine')).join('');
  }
};

function statusNode(c){
  if (c.status === 'doing'){
    const node = c.chain.find(n=>n[2]==='doing');
    return `<span class="tag tag-blue">审批中</span> <span style="color:var(--ink-3);font-size:12px">${node?node[0]:''}</span>`;
  }
  const st = STATUS[c.status];
  return `<span class="tag ${st.cls}">${st.label}</span>`;
}

function claimRow(c, mode){
  // mode: 'mine' -> 行内展开；'todo' -> 打开审批抽屉并显示快捷按钮；'view' -> 仅展开
  const t = TYPES[c.type], [bg,fg] = COLORS[t.color], st = STATUS[c.status];
  const node = c.chain.find(n=>n[2]==='doing');
  const mainClick = mode==='todo' ? `App.openDrawer('${c.id}')` : `App.toggleRow('${c.id}')`;
  return `<div class="claim-row" id="row-${c.id}">
    <div class="claim-main" onclick="${mainClick}">
      <div class="cr-type" style="background:${bg};color:${fg}">${t.icon}</div>
      <div class="cr-info">
        <b>${esc(c.title)}</b>
        <div class="cr-sub">
          <span>${c.id}</span>
          <span>申请人：${esc(c.applicant)}</span>
          ${c.slaWarn && c.status==='doing' ? `<span style="color:var(--orange);font-weight:700">⏱ ${c.sla}</span>` : ''}
        </div>
      </div>
      <div class="cr-amount">${money(c.amount)}</div>
      <div class="cr-status">
        <span class="tag ${st.cls}">${st.label}${c.status==='doing' && node ? ' · ' + node[0] : ''}</span>
      </div>
      ${mode==='todo' ? `<div class="cr-quick" onclick="event.stopPropagation()">
        <button class="btn-primary btn-sm" onclick="App.approve('${c.id}',true)">通过</button>
        <button class="btn-ghost btn-sm" onclick="App.approve('${c.id}',false)">驳回</button>
      </div>` : ''}
      <div class="cr-date">${c.date}</div>
      <svg class="cr-expand" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </div>
    <div class="claim-detail">
      <div class="cd-inner">
        <div>
          <div class="cd-block">
            <h5>单据信息</h5>
            <dl class="cd-desc">
              <dt>报销类型</dt><dd>${t.icon} ${t.label}</dd>
              <dt>关联项目</dt><dd>${esc(c.project)}</dd>
              ${c.place!=='—'?`<dt>出差地点</dt><dd>${esc(c.place)}</dd>`:''}
              <dt>报销金额</dt><dd style="color:var(--primary);font-size:16px">${money(c.amount)}</dd>
            </dl>
          </div>
          <div class="cd-block" style="margin-top:16px">
            <h5>票据（OCR 已核验）</h5>
            <div class="cd-invoices">${c.invoices.map((inv,i)=>`<div class="cd-inv" onclick="toast('预览票据：${esc(inv)}')"><span>🧾</span>${esc(inv)}</div>`).join('')}</div>
          </div>
          <div class="cd-block" style="margin-top:16px">
            <div class="cd-actions">
              ${c.status==='rejected' ? `<button class="btn-primary btn-sm" onclick="toast('已载入原单据，修改后可重新提交')">✏️ 在线修改重提</button>` : ''}
              ${c.status==='doing' ? `<button class="btn-ghost btn-sm" onclick="toast('已向当前审批人发送催办提醒')">📨 催办</button>` : ''}
              <button class="btn-ghost btn-sm" onclick="toast('单据 PDF 已生成（演示）')">⬇ 导出单据</button>
            </div>
          </div>
        </div>
        <div class="cd-block">
          <h5>审批进度</h5>
          <div class="timeline">${c.chain.map(n=>timelineNode(n,null,c.slaWarn)).join('')}</div>
        </div>
      </div>
    </div>
  </div>`;
}

function timelineNode(n, slaText, warn){
  const [name,who,state,time,opinion] = n;
  const icon = state==='done' ? '✓' : state==='reject' ? '✕' : '';
  const pill = state==='doing'
    ? ` <span class="sla-pill ${warn?'sla-warn':'sla-ok'}">${slaText ? '⏱ 时限 '+slaText : '处理中'}</span>` : '';
  return `<div class="tl-node ${state}">
    <div class="tl-dot">${icon}</div>
    <div class="tl-body">
      <b>${name}${pill}</b>
      <span>${who}${time ? ' · ' + time : (state==='todo' ? ' · 等待中' : '')}</span>
      ${opinion ? `<div class="tl-opinion">${state==='reject'?'驳回原因':'审批意见'}：${esc(opinion)}</div>` : ''}
    </div>
  </div>`;
}

App.toggleRow = function(id){
  const row = $('#row-' + id);
  if (row) row.classList.toggle('open');
};

/* ---------------- 审批中心 ---------------- */
App.renderApproval = function(){
  const tabs = [['todo','待我审批',todoClaims().length],['done','已处理',doneClaims().length],['cc','抄送我的',ccClaims().length]];
  $('#approvalTabs').innerHTML = tabs.map(([k,l,n])=>
    `<button class="ftab ${App.approvalTab===k?'active':''}" onclick="App.approvalTab='${k}';App.renderApproval()">${l}<em>${n}</em></button>`).join('');
  const map = {todo:todoClaims(), done:doneClaims(), cc:ccClaims()};
  const list = map[App.approvalTab];
  const box = $('#approvalList');
  box.className = 'claim-list';
  if (!list.length){
    box.innerHTML = `<div class="empty"><div class="empty-ico">✅</div>${App.approvalTab==='todo'?'太棒了，所有待办都已处理':'暂无记录'}</div>`;
    return;
  }
  // 超时优先
  list.sort((a,b)=>(b.slaWarn?1:0)-(a.slaWarn?1:0));
  box.innerHTML = list.map(c => claimRow(c, App.approvalTab==='todo' ? 'todo' : 'mine')).join('');
};

App.approve = function(id, pass){
  if (pass){
    const c = CLAIMS.find(x=>x.id===id);
    const idx = c.chain.findIndex(n=>n[2]==='doing');
    c.chain[idx][2] = 'done';
    c.chain[idx][3] = '刚刚';
    c.chain[idx][4] = '同意';
    const next = c.chain.find(n=>n[2]==='todo');
    if (next && next[1] !== '财务出纳'){ next[2]='doing'; }
    else if (next){
      // 出纳直接打款，办结
      next[2]='done'; next[3]='刚刚'; next[4]='已支付';
      c.status='paid';
    }
    toast('已通过：' + c.id);
  } else {
    const c = CLAIMS.find(x=>x.id===id);
    const idx = c.chain.findIndex(n=>n[2]==='doing');
    c.chain[idx][2]='reject';
    c.chain[idx][3]='刚刚';
    c.chain[idx][4]='材料不完整，请补充后重新提交';
    c.status='rejected';
    toast('已驳回：' + c.id + '，申请人可在线修改重提');
  }
  App.closeDrawer();
  App.applyRole();
  App.renderApproval();
};

/* ---------------- 单据详情抽屉 ---------------- */
App.openDrawer = function(id){
  const c = CLAIMS.find(x=>x.id===id);
  if (!c) return;
  App.openClaimId = id;
  const t = TYPES[c.type], st = STATUS[c.status];
  const isTodo = todoClaims().some(x=>x.id===id);
  $('#drawer').innerHTML = `
    <div class="dr-head">
      <div>
        <h3>${esc(c.title)}</h3>
        <div style="color:var(--ink-3);font-size:12.5px;margin-top:3px">${c.id} · ${t.icon} ${t.label} · 提交于 ${c.date}</div>
      </div>
      <button class="dr-close" onclick="App.closeDrawer()">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="dr-body">
      <div class="dr-amount-box"><div><span>报销金额</span><b>${money(c.amount)}</b></div>
        <span class="tag" style="background:rgba(255,255,255,.2);color:#fff">${st.label}</span></div>
      <div class="dr-section">
        <h5>基本信息</h5>
        <dl class="cd-desc">
          <dt>申请人</dt><dd>${esc(c.applicant)} · 电子信息学院</dd>
          <dt>关联项目</dt><dd>${esc(c.project)}</dd>
          ${c.place!=='—'?`<dt>地点</dt><dd>${esc(c.place)}</dd>`:''}
          <dt>收款账户</dt><dd>招商银行 尾号 3407</dd>
          <dt>抄送人</dt><dd>${c.cc?'王老师（可视不可批）':'—'}</dd>
        </dl>
      </div>
      <div class="dr-section">
        <h5>电子票据</h5>
        <div class="cd-invoices">${c.invoices.map(inv=>`<div class="cd-inv" onclick="toast('预览票据：${esc(inv)}')"><span>🧾</span>${esc(inv)}</div>`).join('')}</div>
      </div>
      <div class="dr-section">
        <h5>审批链路与处理时限</h5>
        <div class="timeline">${c.chain.map(n=>{
          const sla = t.chain.find(x=>x[0]===n[0]);
          return timelineNode(n, sla?sla[2]:null, c.slaWarn);
        }).join('')}</div>
      </div>
    </div>
    ${isTodo ? `<div class="dr-foot">
      <button class="btn-ghost" style="flex:1" onclick="toast('已转交给同角色其他审批人（演示）')">↗ 转办</button>
      <button class="btn-ghost" onclick="App.approve('${c.id}',false)" style="color:var(--red);border-color:#F0C9CB">✕ 驳回</button>
      <button class="btn-primary" onclick="App.approve('${c.id}',true)">✓ 同意通过</button>
    </div>` : `<div class="dr-foot"><button class="btn-ghost" style="flex:1" onclick="toast('单据 PDF 已生成（演示）')">⬇ 导出留档</button></div>`}`;
  $('#drawer').classList.add('open');
  $('#drawerMask').classList.add('open');
};
App.closeDrawer = function(){
  $('#drawer').classList.remove('open');
  $('#drawerMask').classList.remove('open');
  App.openClaimId = null;
};

/* ---------------- 财务看板 ---------------- */
App.renderFinance = function(animate){
  const kpis = [
    ['💰','本年累计报销','¥128.6<small> 万</small>','较去年同期 <b>+12.4%</b>'],
    ['📑','报销单据总量','1,284<small> 笔</small>','学生活动类占 58%'],
    ['⏱','平均处理时长','2.3<small> 天</small>','较线下 <b>缩短 62%</b>'],
    ['🔔','今日待审核','17<small> 笔</small>','其中 3 笔临近期限']
  ];
  $('#kpiGrid').innerHTML = kpis.map(([ico,lab,val,sub],i)=>`
    <div class="kpi-card"><div class="k-lab">${lab}</div>
      <div class="k-num">${val}</div><div class="k-sub">${sub}</div>
      <div class="k-bg">${ico}</div></div>`).join('');

  // 趋势图（SVG：柱=金额，折线=单数）
  const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月'];
  const amount = [6.2,4.8,9.6,12.4,10.8,8.2,7.4,11.6,15.8]; // 万元
  const counts = [68,52,104,136,118,86,74,122,168];
  const W2=680, H=250, pad=38, bw=30, maxV=18, maxC=180;
  const stepX = (W2-pad-10)/months.length;
  let bars='', lines='', xlabels='', ylabels='';
  amount.forEach((v,i)=>{
    const x = pad + i*stepX + stepX/2 - bw/2;
    const h = v/maxV*(H-pad-24);
    const y = H-pad-h;
    bars += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="5" fill="url(#barG)"><title>${months[i]}：${v} 万元</title></rect>`;
    xlabels += `<text x="${x+bw/2}" y="${H-pad+18}" font-size="11" fill="#98A2B5" text-anchor="middle">${months[i]}</text>`;
  });
  [0,6,12,18].forEach(v=>{
    const y = H-pad - v/maxV*(H-pad-24);
    ylabels += `<text x="8" y="${y+4}" font-size="10.5" fill="#98A2B5">${v}</text>
      <line x1="${pad-6}" y1="${y}" x2="${W2-10}" y2="${y}" stroke="#EFF2F7"/>`;
  });
  const pts = counts.map((v,i)=>{
    const x = pad + i*stepX + stepX/2;
    const y = H-pad - v/maxC*(H-pad-24);
    return [x,y];
  });
  lines = `<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#12A678" stroke-width="2.5"/>` +
    pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#fff" stroke="#12A678" stroke-width="2.5"><title>${months[i]}：${counts[i]} 笔</title></circle>`).join('');
  $('#chartTrend').innerHTML = `<svg viewBox="0 0 ${W2} ${H}" style="width:100%;display:block">
    <defs><linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5B7DFF"/><stop offset="1" stop-color="#2E5BFF"/></linearGradient></defs>
    ${ylabels}${bars}${lines}${xlabels}</svg>`;

  // 环形图
  const dist = [['学生活动/竞赛',75,'#12A678'],['科研/项目基金',28,'#7657F5'],['差旅费',18,'#2E5BFF'],['大批采购',7.6,'#F5912E']];
  const total = dist.reduce((s,d)=>s+d[1],0);
  let acc=0, R=52, C=2*Math.PI*R, seg='';
  dist.forEach(d=>{
    const len = d[1]/total*C;
    seg += `<circle cx="70" cy="70" r="${R}" fill="none" stroke="${d[2]}" stroke-width="17"
      stroke-dasharray="${len-2} ${C-len+2}" stroke-dashoffset="${-acc}" transform="rotate(-90 70 70)"/>`;
    acc += len;
  });
  $('#chartDonut').innerHTML = `<svg viewBox="0 0 140 140" width="150" height="150">${seg}
    <text x="70" y="66" text-anchor="middle" font-size="12" fill="#98A2B5">本年总额</text>
    <text x="70" y="86" text-anchor="middle" font-size="19" font-weight="800" fill="#1C2434">128.6万</text></svg>`;
  $('#donutLegend').innerHTML = dist.map(d=>
    `<li><i style="background:${d[2]}"></i>${d[0]}<b>${(d[1]).toFixed(1)} 万</b></li>`).join('');

  // 部门 TOP5
  const depts = [['电子信息学院',28.6],['经济管理学院',22.1],['机械工程学院',18.7],['化学化工学院',14.3],['学生处 / 团委',11.8]];
  $('#chartDept').innerHTML = depts.map(d=>`
    <div class="bar-row"><span>${d[0]}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${d[1]/30*100}%"></div></div>
      <span class="bar-val">${d[1]}万</span></div>`).join('');

  // 归档表
  const archived = CLAIMS.filter(c=>c.status==='paid');
  $('#archiveTable').innerHTML = `<thead><tr><th>单号</th><th>事由</th><th>申请人</th><th>金额</th><th>打款日期</th><th>状态</th></tr></thead>
    <tbody>${archived.map(c=>`<tr onclick="App.openDrawer('${c.id}')">
      <td>${c.id}</td><td>${esc(c.title)}</td><td>${esc(c.applicant)}</td>
      <td><b>${money(c.amount)}</b></td>
      <td>${c.chain[c.chain.length-1][3] || c.date}</td>
      <td><span class="tag tag-green">已归档</span></td></tr>`).join('')}</tbody>`;
};

/* ---------------- FAQ 知识库 ---------------- */
const FAQ_KNOWLEDGE = [
  // 流程引导
  {q:'我是新生，不清楚报销流程怎么办？',a:'在「发起报销」页面选择报销类型后，系统会自动显示完整审批链路，并在每一步给出填写指引；也可以随时点击右上角盾牌图标观看 30 秒新手引导。',kw:['流程','新生','新手','怎么报销','步骤'],cat:'流程引导'},
  {q:'报销单据从提交到打款需要多久？',a:'核心时效目标为 1-5 个工作日；学生活动、竞赛类报销设有快速通道，各节点处理时限在链路中全程公开，超时系统自动催办。',kw:['多久','时间','时效','打款','审批周期','几天'],cat:'流程引导'},
  {q:'系统里的审批链路是固定的吗？',a:'不是固定的。系统根据报销类型（差旅/科研/采购/活动经费）和金额自动路由，例如单笔 ≥1 万元会自动插入「校领导」节点，无需自己判断找谁签字。',kw:['链路','流程','固定','找谁','审批人','路由'],cat:'流程引导'},

  // 票据与 OCR
  {q:'发票需要自己查验真伪吗？',a:'不需要。上传发票后系统通过 OCR 自动识别发票代码、号码、金额、日期等要素，并联网进行二维码验真与重复报销校验，验真结果直接展示在票据旁。',kw:['发票','验真','真伪','OCR','识别','查验'],cat:'票据与OCR'},
  {q:'系统支持哪些票据格式？',a:'支持增值税普通发票/专用发票、火车票、机票行程单、定额发票、电子发票（PDF/图片）等主流格式，拍照清晰度建议 300dpi 以上，避免反光和模糊。',kw:['票据','格式','支持哪些','PDF','图片','电子发票'],cat:'票据与OCR'},
  {q:'OCR 识别不准确怎么办？',a:'OCR 结果可手动修正，识别后会高亮显示可能有疑问的字段（如金额、日期），修改后系统会重新校验逻辑一致性（如金额是否含税）。',kw:['OCR','识别不准','修改','修正','错误'],cat:'票据与OCR'},
  {q:'电子发票需要打印出来吗？',a:'不需要打印。系统支持直接上传 PDF 电子发票，会自动解析发票信息并进行验真，纸质发票拍照上传即可。',kw:['电子发票','打印','PDF','纸质'],cat:'票据与OCR'},

  // 驳回与修改
  {q:'票据被财务退回后，需要重新打印跑一遍吗？',a:'不需要。驳回单据会在「我的单据 - 已驳回」中标注具体原因（如缺住宿发票、金额不符），点击「在线修改重提」即可补充材料，审批记录全程保留。',kw:['驳回','退回','修改','重提','重新提交','被打回'],cat:'驳回与修改'},
  {q:'驳回后可以修改哪些内容？',a:'除报销类型外，事由、金额、明细、票据都可以修改；如果原审批链路有节点因金额变化而增减（如超过 1 万加校领导），系统会自动重新计算链路。',kw:['驳回','修改','改金额','改票据','链路变化'],cat:'驳回与修改'},

  // 大额与审批
  {q:'大额报销会有什么不同？',a:'单笔金额 ≥ 1 万元时，系统在提交前的链路预览中自动插入「校领导」审批节点；≥ 5 万元还会增加财务总监预审，所有节点处理时限公开透明。',kw:['大额','1万','5万','校领导','金额','超标'],cat:'大额与审批'},
  {q:'审批人出差/开会来不及签字怎么办？',a:'审批通知会自动推送给审批人（站内信 + 短信），支持手机端 H5 一键通过；超过处理时限系统自动催办，持续超时将自动升级给上级审批人代为处理。',kw:['审批人','出差','催办','超时','自动审批','代签'],cat:'大额与审批'},
  {q:'可以同时抄送其他人吗？',a:'可以。提交前在抄送人一栏添加即可，被抄送人会收到通知但不影响审批流转；抄送记录在单据详情中留痕。',kw:['抄送','抄送人','通知'],cat:'大额与审批'},

  // 财务与打款
  {q:'报销款打到哪里？',a:'打到你在系统中绑定的银行卡（开户行 + 卡号 + 持卡人姓名），首次报销前需要先在「个人设置 - 银行卡」中添加并通过小额打款验证。',kw:['打款','银行卡','转账','开户行','卡号'],cat:'财务与打款'},
  {q:'打款失败了怎么办？',a:'打款失败会在单据状态中标注原因（如卡号无效、账户冻结），你需要更新银行卡信息后，财务重新发起打款；不会重新走审批流程。',kw:['打款失败','转账失败','银行卡错误'],cat:'财务与打款'},
  {q:'报销金额有上限吗？',a:'单笔无硬性上限，但 ≥ 10 万元的超大额需要提供额外的合同/协议材料，并增加财务总监和分管副校长双签节点。',kw:['上限','限额','10万','超大额'],cat:'财务与打款'},

  // 安全与隐私
  {q:'我的票据和银行信息安全吗？',a:'全链路数据加密传输（HTTPS + TLS 1.3）与存储（AES-256），按角色严格授权访问，所有查看、审批、导出操作均留痕可审计；系统通过等保三级认证。',kw:['安全','隐私','加密','泄露','等保','信息保护'],cat:'安全与隐私'},
  {q:'可以撤回已提交的单据吗？',a:'在第一个审批人尚未处理前可以一键撤回；如果已有审批节点通过，则需要联系当前审批人驳回后再修改。撤回操作会留下日志。',kw:['撤回','撤销','取消提交'],cat:'安全与隐私'},

  // 学生活动
  {q:'学生社团活动经费怎么报销？',a:'选择「学生活动经费」类型，审批链路为：指导老师 → 团委/学生处 → 财务，5000 元以下走快速通道，1-2 个工作日即可完成。',kw:['社团','活动经费','学生','团委','指导老师'],cat:'学生活动'},
  {q:'竞赛奖金/差旅费怎么报？',a:'选择「差旅费」类型，上传交通票据（火车票/机票）和住宿发票；竞赛类差旅可勾选「快速通道」，系统自动识别并缩短审批时限。',kw:['竞赛','差旅','奖金','比赛','差旅费'],cat:'学生活动'}
];

const FAQ_CATEGORIES = [
  {icon:'📋',name:'流程引导',count:3,desc:'从发起到打款的完整步骤与时效'},
  {icon:'🧾',name:'票据与OCR',count:4,desc:'发票上传、识别、验真相关问题'},
  {icon:'✏️',name:'驳回与修改',count:2,desc:'被退回后如何在线修改重新提交'},
  {icon:'💰',name:'大额与审批',count:3,desc:'大额报销的特殊流程与审批人'},
  {icon:'🏦',name:'财务与打款',count:3,desc:'银行卡绑定、打款到账与失败处理'},
  {icon:'🔒',name:'安全与隐私',count:2,desc:'数据加密、权限控制与操作留痕'},
  {icon:'🎓',name:'学生活动',count:2,desc:'社团、竞赛等学生专属报销通道'}
];

/* FAQ 搜索引擎 */
App.faq = {
  lastResults: [],
  renderCategories(){
    $('#faqCategories').innerHTML = FAQ_CATEGORIES.map(c=>`
      <div class="faq-cat" onclick="App.faq.searchByCat('${c.name}')">
        <div class="faq-cat-icon">${c.icon}</div>
        <div class="faq-cat-name">${c.name}</div>
        <div class="faq-cat-count">${c.count} 条问答</div>
        <div class="faq-cat-desc">${c.desc}</div>
      </div>`).join('');
  },

  quickSearch(kw){ $('#faqSearchInput').value = kw; this.doSearch(); },

  searchByCat(catName){
    const items = FAQ_KNOWLEDGE.filter(f=>f.cat===catName);
    this.showResults(catName+'（共 '+items.length+' 条）', items, catName);
  },

  doSearch(){
    const kw = $('#faqSearchInput').value.trim();
    if(!kw){ this.showDefault(); return; }

    $('#faqDefault').style.display='none';
    $('#faqSearching').style.display='block';
    $('#faqAiThinking').style.display='flex';
    $('#faqResultMeta').innerHTML = '';
    $('#faqResultList').innerHTML = '';
    $('#faqRecommend').style.display='none';

    setTimeout(()=>{
      $('#faqAiThinking').style.display='none';
      this.runSearch(kw);
    }, 600);
  },

  runSearch(kw){
    // 简单中文分词：按 2/3/4 字滑窗切词 + 原词
    const terms = new Set([kw]);
    for(let len=2; len<=Math.min(4, kw.length); len++){
      for(let i=0; i<=kw.length-len; i++) terms.add(kw.slice(i,i+len));
    }
    const termArr = [...terms].filter(t=>t.length>=2);

    const scored = FAQ_KNOWLEDGE.map(f=>{
      let score = 0;
      const hits = [];
      termArr.forEach(t=>{
        if(f.q.includes(t)){ score += t.length * 3; hits.push(t); }
        if(f.a.includes(t)){ score += t.length * 1.5; hits.push(t); }
        if(f.kw.some(k=>k.includes(t)||t.includes(k))){ score += t.length * 4; hits.push(t); }
      });
      // 原词额外加权
      if(f.q.includes(kw)) score += 10;
      if(f.a.includes(kw)) score += 5;
      if(f.kw.some(k=>k===kw)) score += 12;
      return {f, score: Math.round(score*10)/10, hits: [...new Set(hits)]};
    }).filter(r=>r.score>0).sort((a,b)=>b.score-a.score);

    // 归一化分数到 0-2
    const max = scored[0]?.score || 1;
    scored.forEach(r=>r.score = Math.round((r.score/max)*200)/100);

    if(scored.length === 0){
      $('#faqResultMeta').innerHTML = `<span style="color:#EF4444">😢 未找到与 "<strong>${kw}</strong>" 相关的结果</span>`;
      // 推荐同类热门
      const recs = FAQ_KNOWLEDGE.sort(()=>Math.random()-0.5).slice(0,4);
      $('#faqRecommend').style.display='block';
      $('#faqRecommend').innerHTML = `<h4>💡 你可能想问这些：</h4>` + recs.map(r=>`<div class="faq-rec-item" onclick="App.faq.quickSearch('${r.q.slice(0,10)}')">${r.q}</div>`).join('');
      $('#faqResultList').innerHTML = '';
      return;
    }

    this.showResults(`<strong style="color:#10B981">✓ 找到 ${scored.length} 条</strong> 与 "<em>${kw}</em>" 相关的问答，按相关度排序`, scored, null);
  },

  showResults(metaHtml, results, highlightCat){
    $('#faqDefault').style.display='none';
    $('#faqSearching').style.display='block';
    $('#faqResultMeta').innerHTML = metaHtml;
    $('#faqAiThinking').style.display='none';
    $('#faqRecommend').style.display='none';

    $('#faqResultList').innerHTML = results.map((r,idx)=>{
      const f = r.f || r;
      const score = r.score;
      const hits = r.hits || [];
      const cat = f.cat;
      // 高亮关键词
      let qHtml = f.q, aHtml = f.a;
      const allTerms = [...hits, highlightCat].filter(Boolean);
      allTerms.forEach(t=>{
        if(!t) return;
        const safe = t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        qHtml = qHtml.replace(new RegExp(safe,'g'), m=>`<mark>${m}</mark>`);
        aHtml = aHtml.replace(new RegExp(safe,'g'), m=>`<mark>${m}</mark>`);
      });
      const tags = [...new Set([cat, ...f.kw.slice(0,3)])];
      return `<div class="faq-result-item" style="animation:pop .25s ease ${idx*.04}s both">
        <div class="faq-result-q">
          <span>Q：${qHtml}</span>
          ${score!==undefined?`<span class="score">相关度 ${score}</span>`:''}
        </div>
        <div class="faq-result-a">A：${aHtml}</div>
        <div class="faq-result-tags">${tags.map((t,i)=>`<span class="t ${i===0?'cat':''}">${t}</span>`).join('')}</div>
      </div>`;
    }).join('');
  },

  showDefault(){
    $('#faqDefault').style.display='block';
    $('#faqSearching').style.display='none';
    $('#faqSearchInput').value = '';
  }
};

/* 回车触发搜索 */
document.addEventListener('DOMContentLoaded', ()=>{
  const input = document.getElementById('faqSearchInput');
  if(input) input.addEventListener('keydown', e=>{ if(e.key==='Enter') App.faq.doSearch(); });
});

/* ---------------- 新手引导 ---------------- */
const GUIDE = [
  ['📋','选择报销类型','差旅、科研基金、大批采购、学生活动经费各有独立审批链路，系统自动路由，不用再问「该找谁签字」。'],
  ['✍️','分步填写信息','按流程分段填写，明细可增删行，草稿自动保存；大额报销会提示增加校领导节点。'],
  ['🧾','拍照上传 · OCR 识别','票据拍照或上传 PDF，自动识别发票代码、金额、日期，二维码验真并检查是否重复报销。'],
  ['🔀','预览链路再提交','提交前看清每一级审批人、处理时限和抄送人，心中有数；提交后短信 / 站内通知自动推送。'],
  ['📡','进度全程可查','在「我的单据」实时查看卡在哪个环节，可一键催办；驳回后在线修改重提，无需重跑流程。']
];
App.guide = {
  i: 0,
  start(){ this.i = 0; $('#guideOverlay').style.display='grid'; this.show(); },
  show(){
    const g = GUIDE[this.i];
    $('#guideIcon').textContent = g[0];
    $('#guideTitle').textContent = g[1];
    $('#guideText').textContent = g[2];
    $('#guideDots').innerHTML = GUIDE.map((_,i)=>`<i class="${i===this.i?'on':''}"></i>`).join('');
    $('#guideNext').textContent = this.i === GUIDE.length-1 ? '开始使用' : '下一步';
  },
  next(){ if (this.i < GUIDE.length-1){ this.i++; this.show(); } else this.close(); },
  close(){ $('#guideOverlay').style.display='none'; }
};

/* ---------------- 初始化 & 全局事件 ---------------- */
function init(){
  bindLoginChips();
  bindNav();
  renderPickGrid();
  App.faq.renderCategories();
  App.notice.init();

  // 票据表单监听
  $('#invAmt')?.addEventListener('input', ()=>W.syncInvAmount());

  // 移动端菜单
  $('#menuBtn').onclick = () => document.querySelector('.sidebar').classList.toggle('show');

  $('#toStep2').onclick = () => W.goto(2);
  $('#guideNext').onclick = () => App.guide.next();
  $('#viewSwitch').querySelectorAll('.vs-btn').forEach(btn=>{
    btn.onclick = ()=>{
      $('#viewSwitch').querySelectorAll('.vs-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      App.mineView = btn.dataset.view;
      App.renderMine();
    };
  });
  // 角色菜单
  $('#roleSwitch').addEventListener('click', e=>{
    const item = e.target.closest('[data-role]');
    if (item){ App.switchRole(item.dataset.role); return; }
    $('#roleSwitch').classList.toggle('open');
  });
  document.addEventListener('click', e=>{
    if (!e.target.closest('#roleSwitch')) $('#roleSwitch').classList.remove('open');
  });
  // 抽屉
  $('#drawerMask').onclick = ()=>App.closeDrawer();
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') { App.closeDrawer(); App.notice.close(); } });
  // 通知抽屉点击外部关闭
  $('#noticeMask').onclick = ()=>App.notice.close();
}
document.addEventListener('DOMContentLoaded', init);
