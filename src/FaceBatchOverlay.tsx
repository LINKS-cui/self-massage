import {ContactSymbol} from './ContactSymbol';
import {useId,type ReactNode} from 'react';
const green='#087f74',orange='#c34c2f',ink='#403b33',paper='#fffaf0';
export const isFaceBatch=(id:string)=>/^SM-0(1[1-9]|20)$/.test(id);
function Dot({x,y,n,active=false,end=false,press=false}:{x:number;y:number;n?:number;active?:boolean;end?:boolean;press?:boolean}){
 if(press)return <g><ContactSymbol x={x} y={y} kind="press" r={26}/>{n&&<text x={x} y={y-24} fontSize="24" textAnchor="middle" fill={ink} stroke={paper} strokeWidth="4" paintOrder="stroke">{n}</text>}</g>;
 const c=active?orange:green;
 return <g data-contact={active?'active':'position'}><circle cx={x} cy={y} r={n?20:12} stroke={c} strokeWidth="4" fill={end?paper:c}/>{n&&<text x={x} y={y+10} fill={paper} textAnchor="middle" fontSize="28" fontWeight="700">{n}</text>}</g>;
}
function Label({y,children,w=620,color=ink}:{y:number;children:string;w?:number;color?:string}){return <g className="face-label"><rect x={500-w/2} y={y-28} width={w} height="56" rx="12" fill={paper} fillOpacity=".97" stroke={color} strokeWidth="2"/><text x="500" y={y+10} fill={color} fontSize="29" fontWeight="650" textAnchor="middle">{children}</text></g>;}
function Pair({x,y,...rest}:{x:number;y:number;n?:number;active?:boolean;end?:boolean;press?:boolean}){return <><Dot x={x} y={y} {...rest}/><Dot x={1000-x} y={y} {...rest}/></>;}
export function FaceBatchOverlay({id,phase,map}:{id:string;phase:number;map:boolean}){
 const key=useId().replaceAll(':',''),arrow='face-arrow-'+key,back='face-back-'+key;
 const n=Number(id.slice(3));let body:ReactNode=null;
 const path=(d:string,dashed=false,mirror=false)=><g transform={mirror?'translate(1000 0) scale(-1 1)':undefined} data-path={dashed?'lifted-return':'contact'}><path d={d} fill="none" stroke={dashed?ink:green} strokeWidth={dashed?4:6} strokeDasharray={dashed?'11 10':undefined} strokeLinecap="round" markerEnd={`url(#${dashed?back:arrow})`}/></g>;
 const both=(d:string,dashed=false)=><>{path(d,dashed)}{path(d,dashed,true)}</>;
 const brow=[[440,350],[390,345],[340,355]];
 const lower=[[440,455],[390,470],[340,455]];
 const tri=(points:number[][],active:number)=>points.map(([x,y],i)=><Pair key={i} x={x} y={y} n={i+1} active={active===i} press={[11,17].includes(n)}/>);
 if(n===11){
  body=!map&&phase===0?<><Label y={110} w={650}>四指虚握拳 · 拇指扶太阳穴</Label><Label y={850} w={720} color={orange}>食指中间关节背面接触眉部</Label></>:<>{tri(brow,map?-1:phase-1)}<Label y={130} w={620}>内侧 → 中间 → 外侧 · 双手同时</Label><Label y={865} w={610}>每点按住 4–6 秒 · 整套 2–3 遍</Label></>;
 }else if(n===12){
  body=map?<>{tri(brow,-1)}<Label y={130} w={620}>内侧 → 中间 → 外侧 · 双手同时</Label><Label y={865} w={580}>每点捏住 4–6 秒 · 整套 1 遍</Label></>:<><Label y={120} w={610}>食指在上 · 拇指在下 · 指腹夹捏</Label><Label y={865} w={580} color={orange}>{['内侧','中间','外侧'][phase]+' · 持续捏住 4–6 秒'}</Label></>;
 }else if(n===13){
  const ret=!map&&phase===3;
  body=<>{(map||phase===1||ret)&&<>{!ret&&both('M410 350 Q385 245 420 105')}<Pair x={410} y={350}/><Pair x={420} y={105} end/>{ret&&both('M420 105 Q235 210 405 342',true)}</>}<Label y={850} w={680}>{ret?'抬手离肤回位 · 共向上推 8–10 次':phase===0&&!map?'四指并拢 · 拇指不计入':'越过发际线 · 一直推到头顶'}</Label></>;
 }else if(n===14){
  const ret=!map&&phase===3;
  body=<>{(map||phase===1||ret)&&<>{both(ret?'M335 280 Q385 160 450 280':'M450 280 L335 280',ret)}<Pair x={450} y={280}/><Pair x={335} y={280} end/></>}<Label y={110} w={640}>中指＋无名指 · 眉毛上方一指宽</Label><Label y={865} w={680}>{ret?'抬手回内侧 · 不沿皮肤向内拉':'左右同时向外 · 每组 8–10 次'}</Label></>;
 }else if(n===15){
  const region=map||phase===1;
  body=<>{region&&<><ContactSymbol x={365} y={282}/><ContactSymbol x={500} y={285}/><ContactSymbol x={635} y={282}/></>}{region&&<rect x="340" y="230" width="320" height="115" rx="50" fill={green} fillOpacity=".12" stroke={green} strokeDasharray="8 8" strokeWidth="3"/>}{!map&&phase===0&&<><ContactSymbol x={460} y={306}/><ContactSymbol x={540} y={306}/></>}{(map||phase===3||phase===4)&&<>{both(phase===4&&!map?'M410 220 Q295 280 410 350':'M410 350 L410 220',phase===4&&!map)}<Pair x={410} y={350}/><Pair x={410} y={220} end/></>}<Label y={120} w={720}>{map?'先完成全部转压，再进入上推':phase<2?'阶段一 · 覆盖额头 · 每点 4–6 圈':'阶段二 · 上推至发际线附近'}</Label><Label y={865} w={760}>{phase<2&&!map?'点位与旋向不限 · 图示不规定点数':'不同位置各上推 4–6 次 · 整套一遍'}</Label></>;
 }else if(n===16){
  body=map?<><Dot press x={500} y={350} n={1}/><Pair press x={455} y={545} n={2}/><Dot press x={500} y={560} active/><Dot press x={500} y={675} n={4}/><path d="M515 560L730 620" stroke={orange} strokeWidth="3"/><text x="750" y="631" fill={orange} fontSize="30">③ 鼻底中柱</text><Label y={130} w={700}>眉心 → 鼻翼 → 鼻底 → 下唇下方</Label><Label y={865} w={690}>每段各 3 次 · 每次按压 10 秒</Label></>:<>{(phase===1?[[430,495],[550,495]]:phase===0?[[525,330]]:phase===2?[[515,535]]:[[490,650]]).map(([x,y],i)=><ContactSymbol key={i} x={x} y={y} kind="press"/>)}<Label y={110} w={700}>{['单手中指 · 眉心','双手中指 · 鼻翼两侧','叠放食指 · 下面指腹接触鼻底中柱','叠放食指 · 下面指腹接触唇下凹陷'][phase]}</Label><Label y={850} w={700} color={orange}>{['每次 10 秒 · 本段 3 次','鼻深呼吸 · 每次 10 秒 × 3 次','鼻深呼吸 · 每次 10 秒 × 3 次','口深呼吸 · 每次 10 秒 × 3 次'][phase]}</Label>{phase>0&&<Label y={930} w={500}>持续呼吸，不是屏息</Label>}</>;
 }else if(n===17){
  body=!map&&phase===0?<><Label y={110} w={660}>五指张开 · 示范选用食指指腹</Label><Label y={865} w={680}>只用所选单指接触下眼眶</Label></>:<>{tri(lower,map?-1:phase-1)}<Label y={130} w={700}>下眼眶内 → 中 → 外 · 双侧同时</Label><Label y={865} w={650}>每点按住 4–6 秒 · 整套 2–3 遍</Label></>;
 }else if(n===18){
  const small='M440 425 C438 485 425 535 392 535 C340 535 305 460 310 380';
  const large='M445 625 C445 705 420 750 380 750 C305 750 282 540 310 380';
  body=<>{(map||phase===0)&&<>{both(small)}<Pair x={440} y={425}/></>}{(map||phase===2)&&<>{both(large)}<Pair x={445} y={625}/></>}{(map||phase===0||phase===2)&&<Pair x={310} y={380} end/>}{!map&&phase===4&&both('M310 380 Q195 225 440 425',true)}<Label y={120} w={720}>{map?'先小弧、后大弧 · 左右同时':phase===0?'第一弧 · 最低约鼻尖高度':phase===2?'第二弧 · 最低约下巴高度':phase===4?'抬手离肤回位 · 两弧一轮':'太阳穴保持接触 5 秒'}</Label><Label y={875} w={720}>{map?'两条弧线各一次 · 共 2–3 轮':phase===1||phase===3?'停留后先抬手，再移到下一起点':'食指＋中指并拢 · 全程闭眼'}</Label></>;
 }else if(n===19){
  const inner='M445 735 C420 655 348 570 310 380';
  const outer='M435 755 C285 680 265 495 310 380';
  body=<>{(map||phase===1)&&both(inner)}{(map||phase===3)&&both(outer)}{(map||phase===1||phase===3)&&<><Pair x={440} y={745}/><Pair x={310} y={380} end/></>}{!map&&phase===5&&both('M310 380 Q155 600 440 745',true)}<Label y={120} w={710}>{map?'先内线，再外线 · 两侧同时':phase===1?'内线 · 较靠脸中央':phase===3?'外线 · 较靠脸外侧':phase===2||phase===4?'到太阳穴保持接触 5 秒':phase===5?'抬手离肤回到下巴':'食指＋中指并拢 · 下巴两侧'}</Label><Label y={875} w={710}>每条到太阳穴停 5 秒 · 两线一组</Label></>;
 }else if(n===20){
  const points=[[360,535],[405,625],[420,710]];
  body=map?<>{points.map(([x,y],i)=><g key={i}><ContactSymbol x={x} y={y}/><ContactSymbol x={1000-x} y={y}/><text x={x-40} y={y+9} fontSize="25" fill={ink}>{i+1}</text><text x={1040-x} y={y+9} fontSize="25" fill={ink}>{i+1}</text></g>)}<Label y={130} w={680}>面颊 → 嘴旁 → 下巴 · 从上到下</Label><Label y={875} w={680}>每点 5 圈 · 整套一遍 · 不重复</Label></>:<><ContactSymbol x={[407,438,419][phase]} y={[525,619,674][phase]}/><ContactSymbol x={1000-[407,438,419][phase]} y={[525,619,674][phase]}/><Label y={120} w={680}>{['面颊两侧','嘴巴两侧','下巴两侧'][phase]+' · 两指指腹同时转压'}</Label><Label y={865} w={700} color={orange}>每点转 5 圈 · 旋转方向无规定</Label><Label y={935} w={660}>双侧同向或镜像配合均无规定</Label></>;
 }
 return <svg className="point-overlay face-batch-overlay" viewBox="0 0 1000 1000" aria-label={map?'动作点位与路径总览':'当前步骤接触位置、方向和计数'} role="img"><defs>{[[arrow,green],[back,ink]].map(([name,color])=><marker id={name} key={name} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M1 1L6 4L1 7" fill="none" stroke={color} strokeWidth="1.6"/></marker>)}</defs>{body}</svg>;
}
