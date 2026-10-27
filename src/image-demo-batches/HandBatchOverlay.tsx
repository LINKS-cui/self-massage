import {ContactSymbol} from '../ContactSymbol';
import {createContext,useContext,useId,type ReactNode} from 'react';
import './hand-batch.css';
export const isHandBatch=(id:string)=>/^SM-0(5[1-9]|60)$/.test(id);
const green='#087f74',orange='#b64d2e',ink='#403b33',paper='#fffaf0';
// The corrected raster frames and their geometry use the same horizontal reflection.
// Keep all teaching labels readable; a reflected hand never reverses finger numbering.
const MirroredGeometry=createContext(false);
function Tag({x=500,y=905,w=850,children,color=ink}:{x?:number;y?:number;w?:number;children:string;color?:string}){
 const mirrored=useContext(MirroredGeometry);
 return <g className="hand-tag" transform={mirrored?'translate(1000 0) scale(-1 1)':undefined}><rect x={x-w/2} y={y-29} width={w} height={58} rx={12} fill={paper} fillOpacity={.97} stroke={color} strokeWidth={2}/><text x={x} y={y+10} textAnchor="middle" fontSize={30} fontWeight={650} fill={color}>{children}</text></g>;
}
function Numbered({x,y,n}:{x:number;y:number;n:number}){const mirrored=useContext(MirroredGeometry);return <g data-hand-order={n}><circle cx={x} cy={y} r={22} fill={paper} stroke={orange} strokeWidth={4}/><text transform={mirrored?`translate(${2*x} 0) scale(-1 1)`:undefined} x={x} y={y+10} textAnchor="middle" fontSize={29} fontWeight={700} fill={orange}>{n}</text></g>}
type Route=[number,number,number,number];
const palmRoutes:Route[]=[[490,735,840,405],[480,735,645,145],[465,735,525,90],[450,735,393,150],[435,735,245,275]];
const backRoutes:Route[]=[[340,550,205,400],[410,410,390,125],[520,405,525,85],[610,440,640,135],[700,495,760,260]];
export function HandBatchOverlay({id,phase,map,flipX=false}:{id:string;phase:number;map:boolean;flipX?:boolean}){
 const n=Number(id.slice(3)),uid=useId().replaceAll(':',''),a='hand-arrow-'+uid,r='hand-return-'+uid;
 const isOverview=map||([52,56].includes(n)&&phase===1)||(n===51&&phase>=3)||([52,56,59].includes(n)&&phase>=3)||([53,54].includes(n)&&phase===4)||(n===55&&phase===3)||(n===57&&phase>=3)||(n===58&&phase===3)||(n===60&&[0,2,4,5].includes(phase));
 const intrinsicMirrored=(n>=51&&n<=57&&!([52,56].includes(n)&&phase===2&&!map))||(n===59&&isOverview)||(n===60&&phase===1&&!map);
 const mirrored=intrinsicMirrored!==flipX;
 const arrow=(d:string,key:string,dashed=false)=><path key={key} data-hand-path={dashed?'release-return':'skin-outward'} d={d} fill="none" stroke={dashed?ink:green} strokeWidth={6} strokeLinecap="round" strokeDasharray={dashed?'12 12':undefined} markerEnd={'url(#'+(dashed?r:a)+')'}/>;
 const routes=(rs:Route[],returns=false)=><g data-route-origin={n===52?'palm-heel':'finger-base'}>{rs.map(([x,y,ex,ey],i)=><g key={i}>{arrow('M'+x+' '+y+' Q'+((x+ex)/2)+' '+(y-80)+' '+ex+' '+ey,'go'+i)}<circle cx={x} cy={y} r={7} fill={green}/>{[52,56].includes(n)&&<ContactSymbol x={ex} y={ey} kind="press" r={20}/>}<Numbered x={ex} y={ey-36} n={i+1}/>{returns&&i===1&&arrow('M'+(ex-35)+' '+ey+' Q'+(ex-80)+' '+((ey+y)/2)+' '+(x-30)+' '+y,'return',true)}</g>)}</g>;
 let content:ReactNode;
 if(n===51)content=isOverview?<>{[[380,595],[550,610],[450,690]].map(([x,y],i)=><ContactSymbol key={i} x={x} y={y}/>)}<path data-hand-region="heel-wrist" d="M306 550 Q470 584 658 550 L604 710 Q470 730 350 710Z" fill={orange} fillOpacity={.13} stroke={orange} strokeWidth={4} strokeDasharray="9 8"/><Tag y={830}>掌根 → 手腕区域 · 不限定点数</Tag><Tag y={910} color={orange}>每点3–5圈，抬指后换点</Tag></>:<><Tag y={830}>{phase===0?'拇指指腹在掌根 · 其余四指托背':phase===1?'每点3–5圈 · 旋转方向无规定':'拇指先离肤，再换下一个点'}</Tag>{phase<2&&<ContactSymbol x={515} y={556} r={29}/>}</>;
 if(n===52||n===56)content=isOverview?<>{routes(n===52?palmRoutes:backRoutes)}{(n===52?[[665,612],[555,549],[500,534],[420,548],[340,580]]:[[255,480],[405,285],[520,300],[635,330],[735,405]]).map(([x,y],i)=><ContactSymbol key={i} x={x} y={y} r={23}/>)}<Tag y={845}>{n===52?'每条从掌根重新开始':'每条从对应指根开始 · 不从掌根'}</Tag><Tag y={925} color={orange}>①拇 ②食 ③中 ④无名 ⑤小 · 末端5秒</Tag></>:<><Tag y={835}>{phase===0?(n===52?'拇指在掌面，四指在手背支撑':'拇指在指背，四指在掌面支撑'):phase===1?'边转按边缓慢推进 · 每点圈数无规定':'拇指指腹 ＋ 食指中间关节'}</Tag>{phase===0&&<ContactSymbol x={n===52?430:384} y={n===52?620:415}/>}{phase===2&&<ContactSymbol x={500} y={355} kind="press"/>}{phase===2&&<Tag y={915} color={orange}>夹住指尖指腹 · 原位保持5秒</Tag>}</>;
 if(n===53||n===54){
  const webs=n===53?[[570,500],[450,365],[355,365],[255,410]]:[[420,485],[530,346],[625,350],[700,390]];
  content=isOverview?<><g data-hand-webs="4">{webs.map(([x,y],i)=><g key={i}><Numbered x={x} y={y} n={i+1}/>{arrow('M'+x+' '+(y-27)+' l0 -50','web'+i)}</g>)}</g><Tag y={830}>{n===53?'拇指：掌心侧 ／ 食指：掌背侧':'拇指：掌背侧 ／ 食指：掌心侧'}</Tag><Tag y={910} color={orange}>每缝先拉10次，再原位捏持5秒</Tag></>:<><Tag y={830}>{phase===0?(n===53?'拇指在掌心侧 · 食指在掌背侧':'拇指在掌背侧 · 食指在掌心侧'):phase===1?'沿掌面朝指尖拉 · 不向掌面上方提':phase===2?'每次拉完松开，回位重新捏住':'10次结束后 · 重新捏住原位5秒'}</Tag>{phase===1&&arrow(n===53?'M525 450 L520 350':'M400 440 L385 340','web-pull')}{phase===3&&<Tag y={910} color={orange}>保持时不继续外拉</Tag>}</>;
 }
 if(n===55)content=<>{!isOverview&&<ContactSymbol x={495} y={445} r={29}/>} {isOverview?<ContactSymbol x={490} y={485} r={29}/>:null}{isOverview?<g data-hand-circular="radius-only" fill="none" stroke={orange} strokeWidth={4}>{[35,75,120].map(r=><circle key={r} cx={490} cy={485} r={r} stroke={green} opacity={.25} strokeDasharray="7 7"/>)}</g>:null}<Tag y={830}>{phase===0&&!map?'接触：食指中间关节背面':phase===2&&!map?'反向：大圈 → 小圈，共10圈':'小圈 → 大圈，共10圈'}</Tag><Tag y={910} color={orange}>{isOverview?'随后反向大 → 小10圈 · 起始转向不限':'关节始终贴肤 · 切换方向也不抬起'}</Tag></>;
 if(n===57)content=isOverview?<>{routes(backRoutes,true)}<Tag y={830}>每根：上下侧2–3次 → 左右侧2–3次</Tag><Tag y={910} color={orange}>每次到指尖立即松开，再回指根</Tag></>:<><Tag y={770}>{phase===2?'第二种夹法：同一根的左右侧':'第一种夹法：掌心侧与手背侧'}</Tag><Tag y={850} color={orange}>食指＋中指第二关节的相对侧面</Tag>{phase<2&&arrow(phase===0?'M680 510 L300 510':'M600 510 L260 510','pull')}</>;
 if(n===58)content=<>{isOverview?arrow('M640 565 L445 565','fist-range'):phase===1?arrow('M730 760 L350 760','fist-stroke'):null}<Tag y={835}>{phase===2&&!map?'松开后回位，再重新按住':'四指指腹一起 · 手背侧到指根关节'}</Tag><Tag y={915} color={orange}>被操作手全程握拳 · 共8–10次</Tag></>;
 if(n===59)content=isOverview?<>{routes([[350,510,210,400],[440,377,385,120],[520,353,511,75],[615,393,640,125],[702,433,760,245]],true)}<Tag y={830}>每根8–10次后换下一根</Tag><Tag y={910} color={orange}>到指尖立即松开 · 回到指根重捏</Tag></>:<><Tag y={820}>{phase===2?'松开两指，离肤回到指根':'拇指在背侧 · 食指在掌心侧'}</Tag><Tag y={910} color={orange}>被操作手指伸直 · 指根到指尖</Tag>{phase===1&&arrow('M550 540 L160 540','finger-pull')}</>;
 if(n===60)content=<>{!map&&[1,3].includes(phase)&&<ContactSymbol x={phase===1?500:450} y={phase===1?295:245} kind="press"/>}<Tag y={790}>{map?'两种辅助手法 · 均为手腕背伸':phase===1?'接触特写：拳掌根面 → 四指中间关节':phase===3?'握住四指 · 与第一阶段同向':phase===0?'前臂水平横在胸前，四指伸直':phase===5?'同侧两阶段完成后，镜像换手':'松开用力，让手腕回正'}</Tag><Tag y={875} color={orange}>{map||phase===1||phase===3?'手背靠近前臂背面 · 每阶段10秒':'前臂保持不动 · 不旋转整条前臂'}</Tag>{phase===3&&!map&&arrow('M500 290 Q570 325 560 400','extension')}</>;
 return <MirroredGeometry.Provider value={mirrored}><svg className="point-overlay hand-batch-overlay" viewBox="0 0 1000 1000" role="img" aria-label={map?'手部操作范围与顺序':'本步骤手部接触与动作提示'} data-hand-id={id} data-geometry-mirrored={mirrored}>
 <defs>{[[a,green],[r,ink]].map(([key,c])=><marker key={key} id={key} markerWidth={9} markerHeight={9} refX={7} refY={4.5} orient="auto"><path d="M1 1 L7 4.5 L1 8" fill="none" stroke={c} strokeWidth={1.6}/></marker>)}</defs><g data-hand-geometry="true" transform={mirrored?'translate(1000 0) scale(-1 1)':undefined}>{content}</g></svg></MirroredGeometry.Provider>;
}
