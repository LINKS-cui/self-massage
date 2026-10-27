import {useId} from 'react';
const green='#087f74',orange='#c34c2f',ink='#403b33';
function Dot({x,y,end=false,hand=false}:{x:number;y:number;end?:boolean;hand?:boolean}){const c=hand?orange:green;return <g data-point={hand?'finger':end?'end':'start'}><circle cx={x} cy={y} r={hand?14:17} fill="#fffaf0" stroke={c} strokeWidth="4"/><circle cx={x} cy={y} r={hand?7:8} fill={end?'none':c} stroke={c} strokeWidth="3"/></g>;}
function Callout({x,y,w=250,text,color=ink}:{x:number;y:number;w?:number;text:string;color?:string}){return <g><rect x={x-w/2} y={y-27} width={w} height="54" rx="10" fill="#fffaf0" fillOpacity=".97" stroke={color} strokeWidth="2"/><text x={x} y={y+10} fontSize="30" fontWeight="650" textAnchor="middle" fill={color}>{text}</text></g>;}
export function EyeOverlay({phase,map}:{phase:number;map:boolean}){
 const key=useId().replaceAll(':',''),out=`out-${key}`,back=`back-${key}`;
 const paths=map||phase>=2,showOut=map||phase===2||phase===4,showBack=map||phase===3||phase===4;
 return <svg className="point-overlay eye-overlay" viewBox="0 0 1000 1000" role="img" aria-label={map?'上眼眶起止点与回位方向总览':'当前阶段手指、点位与方向'}>
 <defs>{[[out,green],[back,ink]].map(([id,color])=><marker key={id} id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M1 1L6 4L1 7" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></marker>)}</defs>
 {!map&&phase===0&&<><path d="M690 640L612 750M655 800L736 686" fill="none" stroke={green} strokeWidth="6" strokeLinecap="round" markerEnd={`url(#${out})`}/><Callout x={480} y={878} w={360} text="掌面相对 · 搓热双手" color={green}/></>}
 {!map&&phase===1&&<><Dot x={470} y={380} hand/><Dot x={470} y={415} hand/><Dot x={530} y={380} hand/><Dot x={530} y={415} hand/><path d="M453 380L300 250H240M453 415L225 549H210" fill="none" stroke={orange} strokeWidth="3"/><Callout x={240} y={217} w={160} text="中指" color={orange}/><Callout x={210} y={582} w={190} text="无名指" color={orange}/><Callout x={500} y={705} w={440} text="四指并拢 · 双眼闭合"/><Callout x={500} y={780} w={570} text="左右中指、无名指指尖分别相碰"/></>}
 {paths&&<>
 {showOut&&<g data-path="outward" fill="none" stroke={green} strokeWidth="6" strokeLinecap="round"><path d="M452 347Q393 316 326 350"/><path d="M548 347Q607 316 674 350"/><path d="M422 337Q392 330 364 339" markerEnd={`url(#${out})`}/><path d="M578 337Q608 330 636 339" markerEnd={`url(#${out})`}/></g>}
 {showBack&&<g data-path="lifted-return" fill="none" stroke={ink} strokeWidth="5" strokeDasharray="10 9" strokeLinecap="round"><path d="M324 328Q360 237 447 324" markerEnd={`url(#${back})`}/><path d="M676 328Q640 237 553 324" markerEnd={`url(#${back})`}/></g>}
 <Dot x={452} y={347}/><Dot x={548} y={347}/><Dot x={326} y={350} end/><Dot x={674} y={350} end/>
 <path d="M452 365L472 492M548 365L528 492" fill="none" stroke={green} strokeWidth="2.5"/><Callout x={500} y={526} w={270} text="内侧起点" color={green}/>
 <path d="M308 350L223 355M692 350L777 355" fill="none" stroke={green} strokeWidth="3"/><Callout x={180} y={350} w={180} text="外侧终点" color={green}/><Callout x={820} y={350} w={180} text="外侧终点" color={green}/>
 <Callout x={500} y={219} w={showBack?420:320} text={showBack?'抬指离肤 · 虚线回位':'上眼眶 · 由内向外'} color={showBack?ink:green}/>
 <Callout x={500} y={684} w={phase===4&&!map?420:360} text={phase===4&&!map?'共刮拭 5–10 次 · 速度不限':'中指＋无名指 · 指肚接触'}/>
 </>}
 </svg>;
}
