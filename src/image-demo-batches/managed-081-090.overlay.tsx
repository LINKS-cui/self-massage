import BRepairOverlay,{bRepairIds} from './BRepairOverlay';
import FourActionsOverlay from './FourActionsOverlay';
import FeedbackFootOverlay,{feedbackFootIds} from './FeedbackFootOverlay';
import {PressMapExamples} from '../PressMapExamples';
import {ContactSymbol} from '../ContactSymbol';
import {useId,type ReactNode} from 'react';
import './managed-081-090.css';

export const ids=Array.from({length:10},(_,i)=>`SM-${String(81+i).padStart(3,'0')}`);
type Props={id:string;phase:number;map:boolean;pose?:number};
const GREEN='#087d70',ORANGE='#c9552d',BROWN='#8a6a4c';
function Point({x,y,label,open=false}:{x:number;y:number;label?:string;open?:boolean}){
 return <g className="managed-081-090-contact"><circle cx={x} cy={y} r={label?23:17} fill={open?'#fffaf1':'#fffaf1'} stroke={ORANGE} strokeWidth="5" strokeDasharray={open?'7 5':undefined}/>{label?<text x={x} y={y+10} textAnchor="middle" fontSize="30" fontWeight="700" fill={ORANGE}>{label}</text>:!open&&<circle cx={x} cy={y} r="7" fill={ORANGE}/>}</g>;
}
function Tag({x=500,y=890,w=780,children,color='#3d3c34'}:{x?:number;y?:number;w?:number;children:ReactNode;color?:string}){
 return <g className="managed-081-090-label"><rect x={x-w/2} y={y-30} width={w} height="58" rx="11" fill="#fffaf0" fillOpacity=".96" stroke={color} strokeWidth="2"/><text x={x} y={y+11} textAnchor="middle" fill={color} fontSize="31" fontWeight="650">{children}</text></g>;
}
function Region({d}:{d:string}){return <path d={d} fill={GREEN} fillOpacity=".08" stroke={GREEN} strokeWidth="4" strokeDasharray="11 9"/>;}
function Ring({x,y,r=38}:{x:number;y:number;r?:number}){return <circle cx={x} cy={y} r={r} fill="none" stroke={GREEN} strokeWidth="5"/>;}

export default function Overlay({id,phase:p,map,pose=0}:Props){
 const uid=useId().replaceAll(':','');
 if(['SM-081','SM-082','SM-088'].includes(id))return <FourActionsOverlay id={id} phase={p} map={map} pose={pose}/>;
 if(feedbackFootIds.includes(id))return <FeedbackFootOverlay id={id} phase={p} map={map} pose={pose}/>;
 if(bRepairIds.includes(id))return <BRepairOverlay id={id} phase={p} map={map} pose={pose}/>;
 const arrow=(d:string,dashed=false,color=GREEN)=> <path d={d} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed?'13 11':undefined} markerEnd={`url(#${uid}-${color===BROWN?'return':'arrow'})`}/>;
 const leader=(d:string)=> <path d={d} fill="none" stroke={ORANGE} strokeWidth="3"/>;
 let body:ReactNode=null;
 if(id==='SM-081'){
  const back=map||[2,4,5].includes(p);
  body=<>
   {back?<>
    {(map||p===2||p===5)&&<>{arrow('M370 650 Q560 720 830 705',true)}<Tag x={310} y={780} w={290} color={GREEN}>后侧 · 拇指</Tag>{leader('M410 770 L470 690')}</>}
    {(map||p===4||p===5)&&<>{arrow('M500 480 Q660 545 850 640',true)}<Tag x={760} y={335} w={290} color={GREEN}>外侧 · 掌心</Tag>{leader('M760 365 L725 565')}</>}
    <Tag y={850}>根部逐点向膝端 · 每点 3–5 下</Tag><Tag y={925}>每下松力 · 同点完成抬手换点</Tag>
   </>:p===0?<><Point x={934} y={807}/><Point x={802} y={705}/><Tag y={900}>左腿前伸 · 右膝朝身体右后侧</Tag><Tag y={965}>右脚在右臀旁偏后</Tag></>:p===3?<><Point x={615} y={505}/>{leader('M615 505 L765 240')}<Tag x={735} y={195} w={430} color={ORANGE}>五指并拢 · 掌心</Tag><Tag y={900}>外侧：每点 3–5 下 · 每下松力</Tag></>:<><Point x={425} y={665}/>{leader('M425 665 L215 540')}<Tag x={225} y={490} w={330} color={ORANGE}>拇指指腹</Tag><Tag y={890}>后侧：每点 3–5 下 · 每下松力</Tag></>}
  </>;
 }else if(id==='SM-082'){
  body=<>
   {map||p===2||p===5?<>{arrow('M180 430 Q420 505 820 620',true)}<Point x={180} y={430} open/><Tag x={275} y={285} w={330}>腿窝下方开始</Tag><Tag x={765} y={755} w={300}>至脚踝</Tag><Tag y={885}>后侧中线 · 先单指再双指</Tag><Tag y={950}>每点 3–5 下 · 完成后抬指换点</Tag></>:p===3||p===4?<><Point x={480} y={436}/><Point x={530} y={436}/><Tag y={180}>双拇指并排并拢 · 共按同一点</Tag>{p===4&&arrow('M500 260 L500 365')}<Tag y={860}>{p===4?'前倾下压 → 松力并回身':'四指环抱支撑 · 重新从腿窝下开始'}</Tag><Tag y={930}>每点 3–5 下</Tag></>:<><Point x={535} y={555}/>{leader('M535 555 L665 285')}<Tag x={670} y={230} w={330} color={ORANGE}>单拇指指腹</Tag><Tag>四指环抱支撑 · 每下按完松力</Tag></>}
  </>;
 }else if(id==='SM-083'){
  const ankle=map||p<3;
  body=<>
   {ankle?<>
    {map||p===2?<><Region d="M240 405 Q400 400 435 570 Q430 690 280 735 Q150 680 175 540Z"/><ContactSymbol x={310} y={560}/>{map&&<ContactSymbol x={610} y={440}/>}</>:<><ContactSymbol x={393} y={565} r={27}/></>}
    {map&&<Region d="M440 455 Q595 310 835 175 L790 390 Q590 540 440 580Z"/>}
    <Tag x={265} y={250} w={400}>先：脚踝外侧</Tag>{map&&<Tag x={735} y={690} w={400}>再：整个脚背</Tag>}
   </>:<>
    {p===3?<><ContactSymbol x={475} y={470} r={27}/></>:<><Region d="M320 300 Q480 260 640 340 L640 680 Q510 740 365 680Z"/><ContactSymbol x={475} y={470}/><ContactSymbol x={560} y={590}/></>}
    <Tag y={800}>脚背区域 · 每点 3–5 圈</Tag>
   </>}
   <Tag y={875}>转按后抬指换点 · 圈数不等于秒数</Tag><Tag y={945}>方向、点数与先后顺序无规定</Tag>
  </>;
 }else if(id==='SM-084'){
  const root=[365,340],joint=[360,235],tip=[365,75];
  const rpath='M365 340 Q355 285 360 235';const tpath='M360 220 Q360 145 365 75';
  body=<>
   {map||[1,3,4,5,6,7].includes(p)?<>
    <Point x={root[0]} y={root[1]} open/><Point x={joint[0]} y={joint[1]} open/><Point x={tip[0]} y={tip[1]} open/>
    {!map&&p===1&&<>{arrow('M365 330 Q332 285 360 245 Q388 175 365 80')}<ContactSymbol x={365} y={285} r={23}/><ContactSymbol x={365} y={175} r={23}/></>}
    {map&&<>{arrow('M325 330 Q298 280 325 230 Q350 155 325 85')}<ContactSymbol x={325} y={275} r={23}/><ContactSymbol x={365} y={75} kind="press"/>{arrow('M405 330 L405 245')}{arrow('M405 220 L405 85')}<Tag x={150} y={500} w={230}>连续转推</Tag>{leader('M185 470 L320 275')}<Tag x={740} y={690} w={330}>两段滑推</Tag>{leader('M580 660 L410 270')}</>}
    {!map&&(p===3||p===6||p===7)&&arrow(rpath)}
    {!map&&(p===5||p===6||p===7)&&arrow(tpath)}
    {p===4&&<>{arrow('M360 235 Q255 190 265 260',true,BROWN)}<Tag x={205} y={380} w={330} color={BROWN}>到关节抬指</Tag></>}
    {!map&&(p===6||p===7)&&arrow('M365 75 Q190 150 265 340',true,BROWN)}
    <Tag x={740} y={230} w={330}>趾尖</Tag>{leader('M575 230 L395 75')}
    <Tag x={740} y={385} w={330}>第一处关节</Tag>{leader('M575 385 L395 235')}
    <Tag x={740} y={540} w={330}>趾根</Tag>{leader('M575 540 L395 340')}
   </>:p===0?<><ContactSymbol x={450} y={245}/><Tag x={720} y={650} w={450}>拇指趾背 · 四指脚心侧</Tag></>:<><ContactSymbol x={475} y={100} kind="press"/><Tag x={710} y={650} w={390}>趾尖按住 5 秒</Tag></>}
   <Tag y={835}>{map?'阶段一：连续转推 · 趾尖停 5 秒':['趾背接触手位','连续贴肤转按推进 · 中途不抬指','阶段一每趾一次 · 五趾逐个完成','第一推：趾根 → 第一处关节','抬指后，从关节重新接触','第二推：关节 → 趾尖','两段合一次 · 每趾 2–3 次','一脚两阶段完成，再换脚'][p]}</Tag>
   <Tag y={920}>{map?'阶段二：分两段滑推 · 关节处抬指':'路径用大趾示例 · 五趾均需逐个完成'}</Tag>
  </>;
 }else if(id==='SM-085'){
  body=<>
   {map||p===4?<><Region d="M595 105 Q735 60 840 225 L780 330 Q665 285 580 245Z"/>{arrow('M760 170 Q690 140 610 265')}<Tag x={300} y={300} w={430}>五趾同时朝脚背掰</Tag></>:p===2?<><Point x={865} y={235} open/>{arrow('M810 260 Q890 215 910 145',true,BROWN)}<Tag x={370} y={230} w={400}>松开，再重新握</Tag></>:<><Point x={700} y={270}/>{(p===1||p===3)&&arrow('M810 110 Q730 80 650 220')}<Tag x={320} y={200} w={430}>{p===0?'拇指趾背 · 四指脚心侧':'五趾一起 · 保持 10 秒'}</Tag></>}
   <Tag y={850}>脚掌与踝关节保持原位</Tag><Tag y={930}>每脚两次 × 10 秒 · 两次之间松开</Tag>
  </>;
 }else if(id==='SM-086'){
  const ps=map||p===3||p===5;
  body=<>
   {ps?<><Region d="M365 275 Q500 230 650 330 L640 700 Q500 770 360 680Z"/>{arrow('M430 610 L430 435')}{arrow('M555 610 L555 435')}<Point x={430} y={610}/><Point x={555} y={610}/></>:p===2?<><Point x={296} y={295} open/><Point x={735} y={295} open/>{arrow('M296 315 Q315 460 450 455',true,BROWN)}{arrow('M735 315 Q715 460 580 455',true,BROWN)}</>:<>
    <Point x={p===1?445:450} y={p===1?330:455}/><Point x={p===1?580:580} y={p===1?345:455}/>
    {p===1&&<>{arrow('M445 450 L445 285')}{arrow('M585 450 L585 300')}</>}
   </>}
   <Tag y={790}>{p===2&&!map?'双拇指抬起 · 离肤回到各自起点':'分两处同时向脚趾推 · 约 3–5 厘米'}</Tag><Tag y={875}>每点 2–3 次 · 然后换处覆盖脚背</Tag><Tag y={945}>两条路径仅为示例 · 不限定点数</Tag>
  </>;
 }else if(id==='SM-087'){
  const mp=map||p===4;
  body=<>
   {mp?<>
    {[[275,300,'1'],[467,300,'2'],[600,335,'3'],[691,380,'4'],[775,450,'5']].map(([x,y,l])=><Point key={l} x={Number(x)} y={Number(y)} label={String(l)}/>)}
    {arrow('M275 270 L275 150')}{arrow('M775 420 L775 340')}
    <Tag y={650}>第一组 1＋5 → 第二组 2＋4 → 第三组 3</Tag>
   </>:p===3?<><Point x={555} y={315}/>{arrow('M555 275 L555 170')}<Tag x={740} y={560} w={370}>第三趾 · 单手操作</Tag></>:p===2?<><Point x={380} y={325}/><Point x={625} y={350}/>{arrow('M380 285 L380 175')}{arrow('M625 310 L625 200')}<Tag y={650}>第二、第四趾 · 同时牵拉</Tag></>:<><Point x={305} y={275}/><Point x={765} y={360}/>{p===1&&<>{arrow('M305 235 L305 125')}{arrow('M765 320 L765 205')}</>}<Tag y={650}>大趾、小趾 · 两手分别固定</Tag></>}
   <Tag y={820}>固定接触处 · 沿趾向趾尖牵拉</Tag><Tag y={910}>每组 10 秒后松开 · 不沿皮肤滑动</Tag>
  </>;
 }else if(id==='SM-088'){
  const mp=map||p===2||p===5;
  body=<>
   {mp?<>
    {[[250,235,'1'],[395,245,'2'],[525,245,'3'],[630,285,'4'],[720,360,'5']].map(([x,y,l])=><Point key={l} x={Number(x)} y={Number(y)} label={String(l)}/>)}
    <Tag y={610}>最靠近趾尖的关节 · 拇指指腹</Tag>
   </>:p===4?<><Point x={515} y={215}/>{arrow('M515 140 Q610 180 540 280')}<Tag y={610}>第三趾 · 一只手</Tag></>:p===3?<><Point x={345} y={205}/><Point x={690} y={215}/>{arrow('M345 120 Q425 160 360 280')}{arrow('M690 130 Q770 170 705 285')}<Tag y={610}>第二、第四趾同时下压</Tag></>:<><Point x={250} y={200}/><Point x={800} y={290}/>{p===1&&<>{arrow('M250 110 Q330 160 265 265')}{arrow('M800 210 Q875 245 815 355')}</>}<Tag y={610}>大趾、小趾同时下压</Tag></>}
   <Tag y={735}>使趾尖朝脚心方向弯曲</Tag><Tag y={820}>每组两次 × 10 秒 · 中间及结束松开</Tag><Tag y={910}>只动脚趾 · 脚掌与踝保持原位</Tag>
  </>;
 }else if(id==='SM-089'){
  const mp=map||p===2||p===4||p===5;
  body=<>
   {mp?<>{arrow('M250 800 Q470 800 735 665',true)}<Tag x={260} y={425} w={300}>脚踝开始</Tag>{leader('M260 455 L200 675')}<Tag x={745} y={230} w={350}>膝 / 腿窝下方</Tag>{leader('M745 260 L790 440')}<Tag y={865}>前握：拇指内侧 · 四指外侧</Tag><Tag y={935}>后握：拇指外侧 · 四指内侧</Tag></>:p===0?<><Point x={555} y={580}/><Tag y={860}>右腿向前伸 · 右膝稍弯</Tag><Tag y={935}>左手扶右膝 · 右手操作</Tag></>:p===1?<><Point x={455} y={590}/><Tag x={705} y={760} w={480}>近侧四指 · 远侧拇指</Tag>{leader('M520 730 L465 610')}<Tag y={865}>前侧握 · 拇指在内侧</Tag><Tag y={935}>指腹配合掌面 · 两侧相向夹捏</Tag></>:<><Point x={590} y={525}/><Tag x={325} y={340} w={470}>近侧拇指 · 远侧四指</Tag>{leader('M460 370 L600 530')}<Tag y={865}>后侧握 · 拇指改在外侧</Tag><Tag y={935}>四指在内侧 · 掌面配合夹捏</Tag></>}
   {(map||p!==0)&&<Tag y={100}>每点抓放 3–5 次 · 捏后立即松开</Tag>}
  </>;
 }else if(id==='SM-090'){
  const mp=map||p===2||p===4||p===5;
  body=<>
   {mp?<>{arrow('M530 750 Q568 510 555 210',true)}<Point x={543} y={625}/><Tag x={780} y={400} w={360}>胫骨外侧缘交界</Tag>{leader('M605 400 L552 470')}<Tag x={255} y={680} w={270}>脚踝 → 膝下</Tag><Tag y={840}>虚线表示逐点换位 · 不作长推</Tag></>:p===0?<><Point x={510} y={465}/><Tag y={840}>双手抱小腿 · 四指后侧支撑</Tag></>:<><Point x={510} y={465}/>{leader('M510 465 L760 600')}<Tag x={740} y={660} w={470}>下方指腹接触 · 上方拇指辅助</Tag><Tag y={830}>两拇指叠放 · 上下手无固定要求</Tag></>}
   <Tag y={925}>每点 3–5 次 · 每次按下后立即抬起</Tag>
  </>;
 }
 return <svg className="point-overlay managed-batch-overlay managed-081-090-overlay" viewBox="0 0 1000 1000" role="img" aria-label={`${id} ${map?'点位总览':'阶段'+(p+1)+'点位与方向'}`}>
  <defs><marker id={`${uid}-arrow`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1 L10 6 L1 11" fill="none" stroke={GREEN} strokeWidth="2.4"/></marker><marker id={`${uid}-return`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1 L10 6 L1 11" fill="none" stroke={BROWN} strokeWidth="2.4"/></marker></defs>
  {body}
 <PressMapExamples id={id} phase={p} map={map}/></svg>;
}
