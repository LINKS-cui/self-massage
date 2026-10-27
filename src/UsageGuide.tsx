import {ContactSymbol} from './ContactSymbol';

type SymbolKind='press'|'spiral'|'endpoints'|'line'|'dash'|'area';
function GuideSymbol({kind}:{kind:SymbolKind}){
 return <svg viewBox="0 0 120 68" className="guide-symbol" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
  {kind==='press'&&<ContactSymbol x={60} y={34} kind="press" r={20}/>}
  {kind==='spiral'&&<ContactSymbol x={60} y={34} r={24}/>}
  {kind==='endpoints'&&<><circle cx="30" cy="34" r="10" stroke="#087f74" strokeWidth="2"/><circle cx="30" cy="34" r="6" fill="#087f74"/><path d="M49 34H73" stroke="#087f74" strokeWidth="2"/><circle cx="90" cy="34" r="10" stroke="#087f74" strokeWidth="2"/><circle cx="90" cy="34" r="4" stroke="#087f74" strokeWidth="2"/></>}
  {kind==='line'&&<><path d="M18 49Q58 16 102 28" stroke="#087f74" strokeWidth="3"/><path d="m93 17 11 11-14 6" stroke="#087f74" strokeWidth="3"/></>}
  {kind==='dash'&&<><path d="M102 49Q58 16 18 28" stroke="#856b51" strokeWidth="3" strokeDasharray="6 7"/><path d="m27 17-11 11 14 6" stroke="#856b51" strokeWidth="3"/></>}
  {kind==='area'&&<path d="M26 16Q52 6 92 20L98 47Q68 64 23 49Z" fill="#bcdcd65c" stroke="#087f74" strokeWidth="2" strokeDasharray="5 5"/>}
 </svg>;
}
const symbols:{kind:SymbolKind;title:string;description:string}[]=[
 {kind:'press',title:'橙红圆点 · 接触位置',description:'标出按压、捏持或支撑的位置。怎样用力、是否保持，跟着这一页的文字看。'},
 {kind:'spiral',title:'螺旋 · 转压或转按',description:'手指在接触处做转动。螺旋不规定顺逆方向或圈数，有要求时会写在步骤里。'},
 {kind:'endpoints',title:'绿色起止点 · 从哪到哪',description:'通常实心是起点、空心是终点。它们是路线参照，不是让你额外按两下。'},
 {kind:'line',title:'实线箭头 · 往哪边动',description:'箭头指向滑动、牵拉或身体活动的方向；表示贴肤滑动时，手沿皮肤走。'},
 {kind:'dash',title:'虚线 · 回位或换点',description:'常表示松开、抬手后的回程，也可能表示换点顺序或辅助路线。看旁边标注，不把虚线都当成贴肤滑动。'},
 {kind:'area',title:'色块与圈定区域 · 做哪里',description:'标出接触或覆盖的范围。边界不是必须照着走的路线，也不代表固定的点数。'},
];
function BodyOrientation(){
 return <svg className="body-orientation" viewBox="0 0 340 310" role="img" aria-labelledby="body-orientation-title">
  <title id="body-orientation-title">正面身体示意：虚线为身体中线。大腿内侧靠近中线、两腿之间；大腿外侧远离中线。</title>
  <g fill="#efe2c8" stroke="#544736" strokeWidth="2.5" strokeLinejoin="round">
   <circle cx="170" cy="38" r="21"/>
   <path d="M152 68Q132 67 122 91L105 151Q102 164 112 167Q121 169 126 156L143 111L145 171L137 266Q136 278 147 279Q158 280 161 267L170 199L179 267Q182 280 193 279Q204 278 203 266L195 171L197 111L214 156Q219 169 228 167Q238 164 235 151L218 91Q208 67 188 68Z"/>
  </g>
  <path d="M170 8V287" stroke="#a08362" strokeWidth="1.5" strokeDasharray="4 6"/>
  <g fontSize="14" fill="#544736" fontFamily="'PingFang SC',sans-serif"><text x="181" y="99">身体中线</text><text x="170" y="306" textAnchor="middle">正面 · 以自己的身体为准</text></g>
  <g fill="#087f74"><circle cx="162" cy="209" r="5"/><circle cx="178" cy="209" r="5"/></g>
  <g stroke="#087f74" strokeWidth="1.8" fill="none"><path d="M162 209L130 190H73"/><path d="M178 209L210 190H267"/></g>
  <g fill="#087f74" fontSize="16" fontWeight="600" fontFamily="'PingFang SC',sans-serif"><text x="42" y="185">内侧</text><text x="269" y="185">内侧</text></g>
  <g fill="#c34c2f"><circle cx="140" cy="234" r="5"/><circle cx="200" cy="234" r="5"/></g>
  <g stroke="#c34c2f" strokeWidth="1.8" fill="none"><path d="M140 234H73"/><path d="M200 234H267"/></g>
  <g fill="#c34c2f" fontSize="16" fontWeight="600" fontFamily="'PingFang SC',sans-serif"><text x="42" y="254">外侧</text><text x="269" y="254">外侧</text></g>
 </svg>;
}
export function UsageGuide(){
 return <section className="usage-guide wrap" id="how-to-use" aria-labelledby="guide-title">
  <div className="section-heading"><div><span className="eyebrow">03 / 这本练习册，怎么用</span><h2 id="guide-title">看懂图，再开始。<span className="guide-scribble" aria-hidden="true">↙</span></h2></div><span className="side-note">先认符号，再认方向。</span></div>
  <p className="section-intro">不用一次记住所有动作。先找到想照顾的部位，打开一张卡，照着下面的顺序读。</p>
  <ol className="reading-order">
   <li><span>1</span><div><h3>先看姿势和手型</h3><p>看清坐着还是躺着、用哪只手、哪一面接触身体。</p></div></li>
   <li><span>2</span><div><h3>再看位置和方向</h3><p>对照点位总览，找到接触处、起止点和移动方向。</p></div></li>
   <li><span>3</span><div><h3>最后按文字逐步读</h3><p>留意先后、换边、保持与重复；次数和时间以步骤为准。</p></div></li>
  </ol>
  <div className="guide-panel symbol-panel"><div className="guide-panel-title"><span className="guide-letter">A</span><div><h3>图里的符号，在说什么？</h3><p>先看形状，再对照当前图下方的图例和文字。</p></div></div>
   <div className="symbol-grid">{symbols.map(s=><div className="symbol-item" key={s.kind}><GuideSymbol kind={s.kind}/><h4>{s.title}</h4><p>{s.description}</p></div>)}</div>
   <p className="guide-margin-note"><strong>再记两点：</strong>普通人体轮廓线只帮助辨认部位；数字通常表示步骤或点位顺序，重复几次要看文字。局部图的颜色可能另有说明，以当前图例为准。</p>
  </div>
  <div className="guide-panel direction-panel"><div className="guide-panel-title"><span className="guide-letter">B</span><div><h3>内、外、前、后，指哪里？</h3><p>方向跟着身体走，换了视角也不改变。</p></div></div>
   <div className="direction-content"><figure><BodyOrientation/><figcaption>以大腿为例，只说明方位，不代表按压点。</figcaption></figure>
    <div><dl className="direction-definitions">
     <div><dt>内侧</dt><dd>靠近身体中线的一侧。例如大腿内侧，就是两腿相对的那一面；眼睛内侧靠近鼻梁。</dd></div>
     <div><dt>外侧</dt><dd>远离身体中线的一侧。例如大腿朝两边的那一面；眼睛外侧靠近太阳穴。</dd></div>
     <div><dt>前侧</dt><dd>朝身体正面的那一侧。例如大腿朝膝盖骨的一面，小腿朝胫骨的一面。</dd></div>
     <div><dt>后侧</dt><dd>朝身体背面的那一侧。例如大腿后侧、小腿肚所在的一面。躺下后也仍叫后侧。</dd></div>
    </dl><p className="direction-reminder"><strong>左 / 右都按自己的身体分。</strong>正面人物像站在你对面，不能直接照搬屏幕左右；优先读“左手、右腿”等标注。手部另分手掌面与手背，足部分足底与足背。</p></div>
   </div>
  </div>
  <div className="guide-panel controls-panel"><div className="guide-panel-title"><span className="guide-letter">C</span><div><h3>打开一张卡，怎么操作？</h3><p>按需要切换，慢慢看清每个细节。</p></div></div>
   <dl className="control-tips">
    <div><dt>人物步骤图 / 点位总览</dt><dd>前者看手型与姿势，后者看位置和路线；“显示点位”可开关标记。</dd></div>
    <div><dt>步骤按钮 / 上一步 / 下一步</dt><dd>逐步切换图解，对照高亮文字。有“分解图”时，可继续切换本步姿势。</dd></div>
    <div><dt>放大看 ↗ / 翻到背面 ↻</dt><dd>放大图解看接触细节；翻转右侧动作小抄，补读动作说明。</dd></div>
    <div><dt>♡ 收藏 / 自动翻页</dt><dd>收藏后在卡片集勾选“我的收藏”找回。自动翻页只帮助看图，不是动作节拍或计时。</dd></div>
   </dl>
   <div className="guide-start"><p>现在，打开第一张卡试着读一遍。</p><a className="btn" href="#/exercise/SM-001">从第一个动作开始 <span aria-hidden="true">→</span></a></div>
  </div>
 </section>;
}
