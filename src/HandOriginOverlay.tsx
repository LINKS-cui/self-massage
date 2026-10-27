import {useId,type ReactNode} from 'react';
import {SheetImage} from './SheetImage';
import {ContactSymbol} from './ContactSymbol';
const green='#087f74',orange='#bf4d2c',paper='#fffaf0',ink='#403b33';
function Tag({text,y=905,x=500,w=900}:{text:string;y?:number;x?:number;w?:number}){return <g><rect x={x-w/2} y={y-28} width={w} height={56} rx={10} fill={paper} fillOpacity={.97} stroke={ink} strokeWidth={1.6}/><text x={x} y={y+10} textAnchor="middle" fill={ink} fontSize={27} fontWeight={650}>{text}</text></g>}
export function HandOriginComparison({folder,points,onError}:{folder:string;points:boolean;onError:()=>void}){return <div className="reference-comparison repair-comparison" aria-label="拳助与握指对照">{[{tile:1,view:'fist',title:'① 拳助 · 四指中间关节'},{tile:2,view:'grip',title:'② 握指 · 同向背伸'}].map(x=><figure key={x.tile}><figcaption>{x.title}</figcaption><div className="reference-comparison-picture"><SheetImage src={folder+'atlas-unified-v5.png'} tile={x.tile} alt={x.title} onError={onError}/>{points&&<HandOriginOverlay view={'origin-60-'+x.view}/>}</div></figure>)}</div>}
export function HandOriginOverlay({view,mirror=false}:{view:string;mirror?:boolean}){
 const id='origin-'+useId().replaceAll(':','');let geometry:ReactNode=null,title='',detail='';
 const arrow=(d:string)=><path d={d} fill="none" stroke={green} strokeWidth={4.5} strokeLinecap="round" markerEnd={`url(#${id})`}/>;
 const region=(d:string)=><path data-region="coverage" d={d} fill={green} fillOpacity={.12} stroke={green} strokeWidth={3} strokeDasharray="8 7"/>;
 if(view==='origin-palm-contact'||view==='origin-51-rotate'){
  geometry=<ContactSymbol x={452} y={433} kind="rotate" r={22}/>;title='拇指在掌面 · 四指在手背支撑';detail=view==='origin-51-rotate'?'掌根到手腕区域，每点3–5圈':'右手从身体右侧伸入，托住左手';
 }else if(view==='origin-palm-release'){title='抬起拇指，再换到下一个点';detail='四指继续托住手背';
 }else if(view==='origin-51-map'){
  geometry=<>{region('M278 432Q360 465 485 430L450 590Q350 565 266 535Z')}{[[309,466],[373,475],[449,460],[305,502],[362,521],[420,533],[292,529],[345,548],[403,562]].map(([x,y],i)=><ContactSymbol key={i} x={x} y={y} kind="rotate" r={12}/>)}</>;title='覆盖掌根至手腕的整片区域';detail='每点3–5圈 · 抬指换点 · 点数和顺序不限';
 }else if(view==='origin-52-map'){
  const ends=[[152,245],[353,81],[435,45],[492,80],[552,153]];
  geometry=<g data-finger-routes="5">{ends.map(([x,y],i)=><g key={i}>{arrow(`M350 550 Q${x} 405 ${x} ${y+25}`)}<circle cx={x} cy={y} r={16} fill={paper} stroke={green} strokeWidth={2}/><text x={x} y={y+7} fontSize={20} fill={green} textAnchor="middle">{i+1}</text></g>)}</g>;title='每条从掌根开始，慢慢转按到指尖';detail='拇指→食指→中指→无名指→小指';
 }else if(view==='origin-tip-detail'){
  geometry=<><ellipse cx={555} cy={259} rx={87} ry={19} fill="none" stroke={orange} strokeWidth={4}/><ellipse cx={555} cy={342} rx={75} ry={21} fill="none" stroke={orange} strokeWidth={4}/></>;title='拇指指腹＋弯曲食指中间关节';detail='捏住指尖指腹，原位保持5秒';
 }else if(view.startsWith('origin-53-')){
  const map=view.endsWith('map'),release=view.endsWith('release');
  if(map||release){const pts=release?[[302,425]]:[[302,425],[439,312],[552,320],[631,365]];geometry=<>{pts.map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={18} fill={paper} stroke={orange} strokeWidth={3}/><text x={x} y={y+8} textAnchor="middle" fill={orange} fontSize={23}>{i+1}</text></g>)}</>;}
  else geometry=<><ContactSymbol x={350} y={435} kind="press" r={19}/>{view.endsWith('pull')&&arrow('M300 399L276 342')}</>;
  title=map?'四个指缝：从拇食之间依次到无名小指':release?'每次外拉后松开，重新捏住同一指缝':view.endsWith('pull')?'沿掌面朝指尖拉 · 每缝10次':view.endsWith('hold')?'10次外拉后，原位捏持5秒':'右拇指在掌侧，右食指在背侧';
  detail=release?'无遮挡图标出重新接触的位置':'四缝全部完成后再换手 · 整套一次';
 }else if(view==='origin-56-map'){
  const routes=[[565,548,690,353],[529,396,558,100],[443,393,456,48],[352,409,361,100],[269,447,250,188]];
  geometry=<g data-finger-routes="5">{routes.map(([x,y,ex,ey],i)=><g key={i}>{arrow(`M${x} ${y}L${ex} ${ey+22}`)}<circle cx={ex} cy={ey} r={16} fill={paper} stroke={green} strokeWidth={2}/><text x={ex} y={ey+7} fontSize={20} fill={green} textAnchor="middle">{i+1}</text></g>)}</g>;title='每条从该指指根开始，沿背侧到指尖';detail='拇指→食指→中指→无名指→小指';
 }else if(view==='origin-56-contact'||view==='origin-56-advance'){
  geometry=<ContactSymbol x={523} y={view.endsWith('advance')?246:326} kind="rotate" r={21}/>;title='拇指在指背，四指在掌面支撑';detail='尽可能慢地转按推进，到指尖再捏持';
 }else if(view.startsWith('origin-60-')){
  const fist=view.endsWith('fist'),grip=view.endsWith('grip');
  if(fist||grip)geometry=<ellipse cx={fist?553:565} cy={fist?307:280} rx={29} ry={55} fill="none" stroke={orange} strokeWidth={4}/>;
  title=fist?'拳掌根面顶住四指中间关节':grip?'握住四指，向同一方向背伸':view.endsWith('ready')?'屈肘，前臂水平，四指伸直':'松开辅助用手，手腕回正';
  detail=fist||grip?'前臂水平固定 · 保持10秒后松开回正':'同一只手完成两段，再换手';
 }
 if(view.endsWith('pair'))return null;
 return <svg className="point-overlay hand-origin-overlay" data-origin-view={view} viewBox="0 0 1000 1000" role="img" aria-label={title+'；'+detail}><defs><marker id={id} markerWidth={9} markerHeight={9} refX={7} refY={4.5} orient="auto"><path d="M1 1L7 4.5L1 8" fill="none" stroke={green} strokeWidth={1.6}/></marker></defs><g transform={mirror?'translate(1000 0) scale(-1 1)':undefined}>{geometry}</g><Tag text={title}/><Tag text={detail} y={973}/></svg>;
}
