import {ContactSymbol} from './ContactSymbol';
import {useId} from 'react';

const green='#087f74',orange='#c34c2f',ink='#403b33';
const upper=[[448,350],[395,338],[337,358]];
const lower=[[448,417],[395,430],[337,412]];

function Label({x,y,w=300,text,color=ink}:{x:number;y:number;w?:number;text:string;color?:string}){
 return <g><rect x={x-w/2} y={y-26} width={w} height="52" rx="10" fill="#fffaf0" fillOpacity=".97" stroke={color} strokeWidth="2"/><text x={x} y={y+10} fontSize="29" fontWeight="650" textAnchor="middle" fill={color}>{text}</text></g>;
}
function Point({x,y,kind,n,row}:{x:number;y:number;kind:'anchor'|'route'|'finger'|'press';n?:number;row?:string}){
 if(kind==='press')return <g data-point="press" data-row={row} data-order={n}><ContactSymbol x={x} y={y} r={21}/><text x={x} y={y+(row==='lower'?43:-29)} fontSize="23" fontWeight="750" textAnchor="middle" fill={orange} stroke="#fffaf0" strokeWidth="4" paintOrder="stroke">{n}</text></g>;
 const color=kind==='anchor'||kind==='route'?green:orange;
 return <g data-point={kind} data-row={row} data-order={n}>
  <circle cx={x} cy={y} r={n?19:16} fill="#fffaf0" stroke={color} strokeWidth="3.5"/>
  {n?<text x={x} y={y+9} fontSize="26" fontWeight="750" textAnchor="middle" fill={color}>{n}</text>:kind!=='route'&&<circle cx={x} cy={y} r="7" fill={color}/>}
 </g>;
}

export function OrbitSweepOverlay({phase,map}:{phase:number;map:boolean}){
 const key=useId().replaceAll(':',''),out=`orbit-out-${key}`,back=`orbit-back-${key}`;
 const sweep=!map&&phase===1,press=map||phase>=2;
 const rows=map?[['upper',upper],['lower',lower]] as const:phase===2?[['upper',upper]] as const:[['lower',lower]] as const;
 return <svg className="point-overlay orbit-sweep-overlay" viewBox="0 0 1000 1000" role="img" aria-label={map?'两侧太阳穴固定位置与上下眼眶各三点':'拇指固定、无名指操作的点位与方向'}>
  <defs>{[[out,green],[back,ink]].map(([id,color])=><marker key={id} id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M1 1L6 4L1 7" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></marker>)}</defs>
  <Point x={277} y={367} kind="anchor"/><Point x={723} y={367} kind="anchor"/>
  <path d="M260 367H185V594H315M740 367H815V594H685" fill="none" stroke={green} strokeWidth="2.5"/>
  <Label x={500} y={594} w={350} text="拇指固定两侧太阳穴" color={green}/>
  {!map&&phase===0&&<>
   <Point x={448} y={350} kind="finger"/><Point x={552} y={350} kind="finger"/>
   <path d="M448 368L460 470M552 368L540 470" fill="none" stroke={orange} strokeWidth="2.5"/>
   <Label x={500} y={500} w={220} text="只用无名指" color={orange}/>
   <Label x={500} y={187} w={410} text="四指分开 · 全程闭眼"/>
   <Label x={500} y={710} w={390} text="左右两侧 · 同时操作"/>
  </>}
  {sweep&&<>
   <g data-path="outward" fill="none" stroke={green} strokeWidth="5" strokeLinecap="round">
    <path d="M448 350Q393 319 337 358M552 350Q607 319 663 358"/>
    <path d="M425 340Q398 333 371 343M575 340Q602 333 629 343" markerEnd={`url(#${out})`}/>
   </g>
   <g data-path="lifted-return" fill="none" stroke={ink} strokeWidth="4" strokeDasharray="9 8" strokeLinecap="round">
    <path d="M333 331Q363 233 445 320M667 331Q637 233 555 320" markerEnd={`url(#${back})`}/>
   </g>
   {[448,552].map(x=><Point key={x} x={x} y={350} kind="route"/>)}
   {[337,663].map(x=><Point key={x} x={x} y={358} kind="route"/>)}
   <Label x={500} y={190} w={460} text="实线向外扫 · 虚线抬指回位"/>
   <Label x={500} y={500} w={350} text="无名指横扫 5–10 次" color={green}/>
   <Label x={500} y={710} w={460} text="手势展示内侧起点"/>
  </>}
  {press&&<>
   {rows.map(([row,points])=><g key={row} data-points-row={row}>{points.flatMap(([x,y],i)=>[<Point key={`l${i}`} x={x} y={y} kind="press" n={i+1} row={row}/>,<Point key={`r${i}`} x={1000-x} y={y} kind="press" n={i+1} row={row}/>])}</g>)}
   <Label x={500} y={190} w={map?520:440} text={map?'每只眼：上、下眼眶各三个点':phase===2?'先转压上眼眶三个点':'再转压下眼眶三个点'} color={orange}/>
   <Label x={500} y={504} w={520} text="① 内侧 → ② 中间 → ③ 外侧" color={orange}/>
   <Label x={500} y={703} w={420} text="每点旋转 5–10 圈"/>
   <Label x={500} y={777} w={420} text="转压未规定旋转方向"/>
  </>}
 </svg>;
}
