import {ContactSymbol} from '../ContactSymbol';
import {useId,type ReactNode} from 'react';
import {EyeOverlay} from '../EyeOverlay';

const green='#087f74',orange='#c34c2f',ink='#403b33',paper='#fffaf0';
export const isEarlyFace=(id:string)=>/^SM-00[3-9]$|^SM-010$/.test(id);
function Label({y,text,w=560,color=ink,x=500}:{y:number;text:string;w?:number;color?:string;x?:number}){
 return <g><rect x={x-w/2} y={y-27} width={w} height="54" rx="10" fill={paper} fillOpacity=".97" stroke={color} strokeWidth="2"/><text x={x} y={y+10} fontSize="29" fontWeight="650" textAnchor="middle" fill={color}>{text}</text></g>;
}
function Dot({x,y,kind='contact',hidden=false}:{x:number;y:number;kind?:string;hidden?:boolean}){
 const c=kind==='contact'?orange:green;
 if(kind==='rotate'||kind==='press')return <ContactSymbol x={x} y={y} kind={kind} r={25}/>;
 return <g data-point={kind}><circle cx={x} cy={y} r="16" fill={paper} stroke={c} strokeWidth="4" strokeDasharray={hidden?'5 4':undefined}/>{kind!=='end'&&!hidden&&<circle cx={x} cy={y} r="7" fill={c}/>}</g>;
}
function Pair({x,y,...rest}:{x:number;y:number;kind?:string;hidden?:boolean}){return <><Dot x={x} y={y} {...rest}/><Dot x={1000-x} y={y} {...rest}/></>;}
function Area({x,y,rx=65,ry=32}:{x:number;y:number;rx?:number;ry?:number}){return <ellipse data-region="operation" cx={x} cy={y} rx={rx} ry={ry} fill={orange} fillOpacity=".07" stroke={orange} strokeWidth="3" strokeDasharray="7 6"/>;}

export function EarlyFaceOverlay({id,phase,pose,map}:{id:string;phase:number;pose:number;map:boolean}){
 const key=useId().replaceAll(':',''),arrow=`early-arrow-${key}`,back=`early-back-${key}`;
 const n=Number(id.slice(3));
 if(n===6&&!map&&phase===0)return <EyeOverlay phase={0} map={false}/>;
 function path(d:string,kind:string,dashed=false){return <path data-path={kind} d={d} fill="none" stroke={dashed?ink:green} strokeWidth="5" strokeDasharray={dashed?'9 8':undefined} strokeLinecap="round" markerEnd={`url(#${dashed?back:arrow})`}/>;}
 function turn(x:number,y:number,cw:boolean,r=55,dashed=false){return path(cw?`M${x} ${y-r}A${r} ${r} 0 1 1 ${x-r} ${y}`:`M${x} ${y-r}A${r} ${r} 0 1 0 ${x+r} ${y}`,cw?'clockwise':'counterclockwise',dashed);}
 let body:ReactNode;
 if(n===3){
  const direction=['左','右','上','下'][phase];
  body=<>
   <Label y={145} text="头部不动 · 只转眼睛" w={450}/>
   {map?<>
    {path('M430 240H335','gaze-right')}{path('M570 240H665','gaze-left')}{path('M500 223V180','gaze-up')}{path('M500 265V302','gaze-down')}
    <text x="305" y="250" textAnchor="end" fill={green} fontSize="28">本人右</text><text x="695" y="250" fill={green} fontSize="28">本人左</text>
    
   <Label y={610} text="左 → 右 → 上 → 下" w={440} color={green}/>
   </>:<>
    {[400,600].map(x=><g key={x}>{path(phase===0?`M${x-35} 450H${x+40}`:phase===1?`M${x+35} 450H${x-40}`:phase===2?`M${x} 505V425`:`M${x} 425V505`,`gaze-${direction}`)}</g>)}
    <Label y={620} text={`向${direction}看${phase<2?' · 以本人为准':''}`} w={460} color={green}/>
   </>}
   <Label y={705} text="各保持 4–6 秒 · 整套一轮" w={530}/>
   <Label y={785} text="方向之间直接切换" w={390}/>
  </>;
 }else if(n===4){
  body=<>
   <Label y={185} text={map?'两眼同步 · 先后方向不限':phase===0?'双眼睁开 · 头部保持不动':phase===1?'示例：先顺时针转动':'示例：直接逆时针反转'} w={570}/>
   {(map||phase>0)&&[403,597].map(x=><g key={x}>{turn(x,378,phase!==2,77)}{map&&turn(x,378,false,59,true)}</g>)}
   <Label y={620} text={phase===0&&!map?'准备后，双眼同步转动':'两个方向各 5–10 圈'} w={490} color={green}/>
   <Label y={705} text="尽可能扩大幅度 · 速度未规定" w={590}/>
   <Label y={785} text="直接反转，不先回正前方" w={500}/>
   {!map&&phase>0&&<text x="500" y="870" fontSize="26" fill={ink} textAnchor="middle">分解姿势 {pose+1} / 4 · 不在各方向停留</text>}
  </>;
 }else if(n===5){
  body=<>
   <Area x={405} y={377}/><Area x={595} y={377}/>
   <Label y={180} text={map?'双眼同时 · 头部不动':phase<2?'尽可能睁大双眼':'睁大＋快速眨眼'} w={510}/>
   {(map||phase>=2)&&[290,710].map(x=><path key={x} data-path="blink-cycle" d={`M${x} 350V409`} fill="none" stroke={green} strokeWidth="5" strokeLinecap="round" markerStart={`url(#${arrow})`} markerEnd={`url(#${arrow})`}/>)}
   <Label y={620} text={map||phase===3?'睁大保持 5–10 秒':phase===2?'快速眨眼 5–10 次':'睁大并保持 5–10 秒'} w={510} color={green}/>
   <Label y={705} text={map||phase===3?'随后快速眨眼 5–10 次':phase===2?'睁开＋闭合的分解姿势':'然后进入快速眨眼阶段'} w={540}/>
   <Label y={790} text="两段合一轮 · 共做三轮" w={470}/>
  </>;
 }else if(n===6){
  const cover=!map&&phase===1;
  body=<>
   {cover?<><Area x={400} y={383} rx={75} ry={56}/><Area x={600} y={383} rx={75} ry={56}/></>:map||phase===3?<Area x={500} y={484} rx={218} ry={257}/>:<><Area x={336} y={560} rx={60} ry={105}/><Area x={664} y={560} rx={60} ry={105}/></>}
   <Label y={175} text="全程闭眼 · 使用掌面" w={460}/>
   <Label y={730} text={cover?'温掌敷眼 7–10 秒':'双手同时轻拍整个面部'} w={510} color={orange}/>
   <Label y={815} text={cover?'温热后敷眼，再轻拍':'无固定顺序、次数或时长'} w={550}/>
  </>;
 }else if(n===7){
  const x=map?277:327,y=map?367:391;
  body=<>
   <Pair x={x} y={y} kind={map||phase===1||phase===2?'rotate':'press'}/>
   {!map&&phase===0&&<><Pair x={423} y={110} kind="support"/><Label y={230} text="四指置于头顶 · 仅作支撑" w={550}/></>}
   {!map&&(phase===1||phase===2)&&<>{turn(x,y,phase===1)}{turn(1000-x,y,phase===1)}</>}
   
   <Label y={610} text="拇指指腹 · 两侧太阳穴" w={500} color={orange}/>
   <Label y={700} text={map?'顺时针 10秒 → 逆时针 10秒':phase===0?'两侧同时 · 同向操作':phase===1?'同向顺时针按揉 10 秒':phase===2?'同向逆时针按揉 10 秒':'停止转揉 · 持续按住 10 秒'} w={630}/>
   <Label y={785} text={map?'螺旋转揉 → 圆点按住 10 秒':phase===3?'整套完成一遍':'四指支撑，拇指操作'} w={560}/>
  </>;
 }else if(n===8||n===9){
  const x=map?(n===8?330:320):325,y=380;
  body=<>
   <Pair x={x} y={y} kind={n===9?(map||phase>=2?'rotate':'press'):'contact'}/><Pair x={247} y={480} kind="anchor" hidden/>
   <path d="M231 480H177V704H259M769 480H823V704H741" fill="none" stroke={green} strokeWidth="2.5" strokeDasharray="8 7"/>
   <Label y={704} text="拇指放耳后 · 虚线示意" w={480} color={green}/>
   <Label y={590} text="食指第二关节背面接触" w={510} color={orange}/>
   {n===8?<>
    {(map||phase>0)&&<>{path(`M${x} 355V291`,'lift')}{path(`M${1000-x} 355V291`,'lift')}{path(`M${x-35} 295V355`,'relax-return',true)}{path(`M${1000-x+35} 295V355`,'relax-return',true)}</>}
    <Label y={180} text="同时上提外眼角，再放松" w={540}/>
    <Label y={800} text="10 次 · 1 组 · 停留时间未规定" w={640}/>
   </>:<>
    {!map&&(phase===2||phase===3)&&<>{turn(x,y,phase===2)}{turn(1000-x,y,phase===2)}</>}
    <Label y={180} text="外眼角旁 · 原位操作 · 不上提" w={650}/>
    <Label y={800} text={map?'圆点按压 → 螺旋顺转、逆转':phase===0?'四指虚握 · 全程闭眼':phase===1?'持续按压 10 秒':phase===2?'同时同向顺时针转压 10 秒':'同时同向逆时针转压 10 秒'} w={650}/>
   </>}
  </>;
 }else{
  const showOut=map||phase===1||phase===3,showBack=map||phase===2||phase===3;
  body=<>
   <Pair x={map||phase>=2?277:300} y={map||phase>=2?367:350} kind="anchor"/>
   <Pair x={450} y={320}/><Pair x={330} y={325} kind="end"/>
   {showOut&&<>{path('M431 312Q389 292 348 317','outward')}{path('M569 312Q611 292 652 317','outward')}</>}
   {showBack&&<>{path('M329 297Q375 206 444 294','lifted-return',true)}{path('M671 297Q625 206 556 294','lifted-return',true)}</>}
   <Label y={170} text={showBack?'抬起食指 · 离肤回到内侧':'沿眉毛 · 从内向外'} w={590}/>
   <Label y={590} text="食指中间关节背面接触" w={530} color={orange}/>
   <Label y={685} text="拇指固定太阳穴 · 四指虚握" w={580} color={green}/>
   <Label y={785} text="每组 10 次 · 共 3 组" w={470}/>
  </>;
 }
 return <svg className="point-overlay early-face-overlay" data-exercise={id} viewBox="0 0 1000 1000" role="img" aria-label={`${id} ${map?'点位与方向总览':'当前步骤的接触位置和方向'}`}>
  <defs>{[[arrow,green],[back,ink]].map(([id,color])=><marker key={id} id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M1 1L6 4L1 7" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></marker>)}</defs>
  {body}
 </svg>;
}
