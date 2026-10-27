import {SheetImage} from './SheetImage';
import {PalmCirclePath} from './PalmCircleDiagram';
import {useId,type ReactNode} from 'react';
import {ContactSymbol} from './ContactSymbol';
const green='#087f74',orange='#b64d2e',ink='#403b33',paper='#fffaf0';
function Tag({y=900,children}:{y?:number;children:string}){return <g><rect x={55} y={y-32} width={890} height={64} rx={12} fill={paper} fillOpacity={.97} stroke={ink} strokeWidth={2}/><text x={500} y={y+10} textAnchor="middle" fontSize={29} fontWeight={650} fill={ink}>{children}</text></g>}
export function RepairOverlay({id,view,mirror=false}:{id:string;view:string;mirror?:boolean}){
 const marker='repair-'+useId().replaceAll(':','');let geometry:ReactNode=null;let text='';let second='';
 const arrow=(d:string,color=green)=><path d={d} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" markerEnd={`url(#${marker})`}/>;
 if(view==='50-contact'){geometry=<ContactSymbol x={493} y={394} r={24}/>;text='拇指指腹接触 · 两手八指保持交叉';second='每点3–5圈，抬指后再换点';}
 if(view==='50-map'){geometry=<><path d='M320 430 Q490 350 665 430 L700 710 Q510 850 310 730Z' fill={green} fillOpacity={.07} stroke={green} strokeWidth={4} strokeDasharray='9 8'/>{[[400,490],[570,520],[400,710],[550,700]].map(([x,y],i)=><ContactSymbol key={i} x={x} y={y} r={24}/>)}</>;text=`${mirror?'左':'右'}掌 · 覆盖整个掌心`;second='每点3–5圈 · 抬指换点 · 两掌各一遍';}
 if(view==='50-prep'){text='对照起势：两手八指交叉，两个拇指分开';second='接触图中仅操作拇指弯向对侧掌心';}
 if(view.startsWith('55-')){
  if(view==='55-contact'||view==='55-side'){
   text='食指中间关节背面接触掌心';second='拇指绕至手背支撑 · 四指握拳';
  }else{
   const shrink=view.includes('shrink');geometry=<PalmCirclePath shrink={shrink}/>;
   text=shrink?'反向 · 外圈逐渐收回掌心，共10圈':'从掌心开始 · 圆圈逐渐扩大，共10圈';
   second='关节沿整条轨迹移动 · 全程贴肤';
  }
 }
 if(view.startsWith('57-')){
  const lateral=view.includes('lateral'),released=view==='57-release';
  geometry=released?<path d="M615 350 L640 350 M610 460 L635 460" stroke={green} strokeWidth={5}/>:<g data-clamp-plane={lateral?'lateral':'palmar-dorsal'}>{(lateral?[[640,320],[640,425]]:[[620,340],[620,460]]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r={19} fill="none" stroke={orange} strokeWidth={5}/>)}</g>;
  text=released?'到指尖立即松开 · 两关节留出间隙':lateral?'从指背方向看：夹同一手指的左右侧':'从侧面看：夹手指掌心侧与手背侧';
  second='食指＋中指第二关节相对侧面 · 每种2–3次';
 }
 if(view==='60-map'){text='拳助与握指：两种接触，同向背伸';second='每阶段10秒 · 各自松开回正后再继续';}
 if(view.startsWith('60-')&&view!=='60-map'){
  geometry=view==='60-detail'?<ContactSymbol x={500} y={295} kind="press" r={24}/>:<><ContactSymbol x={view==='60-body'?467:450} y={view==='60-body'?210:245} kind="press" r={22}/><path d={view==='60-body'?'M735 480H600 Q510 480 505 390':'M735 650H520 Q425 650 420 520'} fill="none" stroke={green} strokeWidth={4} strokeDasharray="9 7"/></>;
  text=view==='60-body'?'拳掌根面顶四指中间关节 · 掌心留空':view==='60-grip'?'握住四指 · 与拳助阶段同向背伸':'接触特写：拳掌根面 → 四指中间关节';second='前臂水平固定 · 手背靠近前臂背面10秒';
 }
 if(view.startsWith('71-')){
  const cw=view.includes('-cw-');const effective=cw!==mirror;
  geometry=<g data-ankle-center="555,480"><circle cx={555} cy={480} r={20} fill={paper} stroke={green} strokeWidth={5}/>{arrow(cw?'M535 405 A78 78 0 1 1 480 480':'M480 480 A78 78 0 1 0 535 405')}</g>;
  text=`整脚绕踝 · ${effective?'顺时针':'逆时针'}10圈`;second='握趾手随整脚移动 · 踝与小腿位置保持';
 }
 if(view==='73-body'){text='脚放在另一侧大腿上 · 双手接近足底';second='先单拇指转压，再双拇指同点按压';}
 if(view==='77-body'){text='整体摆位：两手环抱小腿';second='操作时双拇指并列 · 其余四指环抱支撑';}
 return <svg className="point-overlay repair-overlay" viewBox="0 0 1000 1000" role="img" aria-label={text} data-repair-overlay={view} data-repair-mirror={mirror}><defs><marker id={marker} markerWidth={9} markerHeight={9} refX={7} refY={4.5} orient="auto"><path d="M1 1L7 4.5L1 8" fill="none" stroke={green} strokeWidth={1.6}/></marker></defs><g transform={mirror?'translate(1000 0) scale(-1 1)':undefined}>{geometry}</g><Tag y={835}>{text}</Tag><Tag y={920}>{second}</Tag></svg>;
}
export function RepairDetail({id,view}:{id:string;view:string}){
 if(id==='SM-057'&&view.startsWith('57-')&&view!=='57-release'){
  const lateral=view.includes('lateral');return <div className="repair-detail"><svg viewBox="0 0 360 165" role="img" aria-label={lateral?'指端截面：夹左右侧':'指端截面：夹掌背与掌心侧'}><text x={180} y={20} textAnchor="middle" fontSize={14} fill={ink}>从指尖看接触面（截面示意）</text><ellipse cx={180} cy={87} rx={47} ry={35} fill="#f1ccaa" stroke={ink} strokeWidth={2}/><path d="M158 60 Q180 48 202 60" fill="none" stroke={ink} strokeWidth={3}/>{(lateral?[[122,87],[238,87]]:[[180,41],[180,133]]).map(([x,y],i)=><circle key={i} cx={x} cy={y} r={12} fill={orange}/>)}<text x={68} y={88} textAnchor="middle" fontSize={13}>左侧</text><text x={292} y={88} textAnchor="middle" fontSize={13}>右侧</text><text x={280} y={45} fontSize={13}>上：手背侧</text><text x={280} y={137} fontSize={13}>下：掌心侧</text></svg>橙色表示两根弯曲手指的关节侧面；每根先完成上下夹，再改左右夹。</div>;
 }
 if(id==='SM-055')return <p className="repair-detail">食指中间关节背面沿掌面移动：从掌心由小到大画10圈，再反向由大到小画10圈。每阶段合计10圈，画圈和转向时都不抬起。</p>;
 if(id==='SM-071')return <p className="repair-detail">四张图显示整脚相对踝部的不同姿态；切换速度、角度和幅度均不是练习要求。先完成一个方向10圈，再反向10圈。</p>;
 return null;
}

export function RepairComparison({folder}:{folder:string}){return <div className="repair-comparison" aria-label="两种辅助手法对照"><div><h3>拳掌根面顶四指中间关节</h3><div className="repair-comparison-picture"><SheetImage src={folder+'fist-body-repair-v3.png'} alt="拳助背伸，前臂水平固定"/></div></div><div><h3>握四指 · 拇指在手背侧</h3><div className="repair-comparison-picture"><SheetImage src={folder+'atlas.png'} tile={2} alt="握指背伸，与拳助方向一致"/></div></div></div>;}
