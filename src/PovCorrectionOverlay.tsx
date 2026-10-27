import {useId,type ReactNode} from 'react';
import {SheetImage} from './SheetImage';
import {ContactSymbol} from './ContactSymbol';
import {ReferenceRepairOverlay} from './ReferenceRepairOverlay';
const green='#087f74',orange='#bf4d2c',ink='#403b33',paper='#fffaf0',brown='#8b6849';
type XY=[number,number];
const along=(a:XY,b:XY,n:number):XY[]=>Array.from({length:n},(_,i)=>[a[0]+(b[0]-a[0])*i/(n-1),a[1]+(b[1]-a[1])*i/(n-1)]);
const path=(p:XY[])=>'M'+p.map(v=>v.join(' ')).join('L')+'Z';
function inside([x,y]:XY,poly:XY[]){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [a,b]=poly[i],[c,d]=poly[j];if((b>y)!==(d>y)&&x<(c-a)*(y-b)/(d-b)+a)hit=!hit;}return hit;}
function fillPoints(poly:XY[],step:number){const points:XY[]=[];for(let y=30,row=0;y<850;y+=step,row++)for(let x=30+(row%2)*step/2;x<930;x+=step)if(inside([x,y],poly))points.push([x,y]);return points;}
const region=(d:string)=><path data-region="coverage" d={d} fill={green} fillOpacity={.09} stroke={green} strokeWidth={3} strokeDasharray="9 7"/>;
const dots=(p:XY[],r=10)=><g data-dense-points="coverage">{p.map(([x,y],i)=><circle data-contact-kind="coverage" key={i} cx={x} cy={y} r={r*.58} fill={orange} stroke={paper} strokeWidth={3}/>)}</g>;
function Tag({text,x=500,y=920,w=920,color=ink}:{text:string;x?:number;y?:number;w?:number;color?:string}){return <g><rect x={x-w/2} y={y-27} width={w} height={54} rx={10} fill={paper} fillOpacity={.97} stroke={color} strokeWidth={1.8}/><text x={x} y={y+10} textAnchor="middle" fontSize={32} fontWeight={650} fill={color}>{text}</text></g>}
const sole73:XY[]=[[520,737],[478,700],[463,640],[480,545],[493,449],[530,350],[548,260],[570,205],[607,163],[635,105],[675,57],[706,44],[727,67],[735,101],[776,78],[797,105],[788,147],[815,153],[829,186],[819,224],[831,239],[833,277],[813,308],[808,343],[781,374],[744,424],[710,494],[674,564],[644,650],[606,712],[562,745]];
// Stop at the toe-root crease: elbow coverage includes the sole, never the toes.
const sole75:XY[]=[[470,495],[448,475],[441,445],[445,411],[459,381],[484,360],[525,343],[562,337],[614,339],[666,333],[715,321],[753,315],[783,325],[806,354],[820,389],[815,425],[798,463],[786,480],[769,487],[726,493],[678,498],[625,502],[574,504],[524,506],[492,503]];

/** Unobstructed palmar surfaces locate the complete contact width, separately
 * from the oblique pose where the nearer wrist occludes that surface. */
function WristBands({folder,points}:{folder:string;points:boolean}){return <svg viewBox="0 0 1000 1000" role="img" aria-label="双腕展开定位，掌心侧横纹全长为接触带" style={{display:'block',width:'100%',height:'100%'}}>{[false,true].map((right)=><svg key={String(right)} x={right?500:0} y={25} width={500} height={825} viewBox={right?'370 20 550 830':'80 20 550 830'}><g transform={right?'translate(1000 0) scale(-1 1)':undefined}><image href={folder+'palmar-band-map-v1.png'} width={1000} height={1000}/>{points&&<path data-wrist-contact-band="full-width" d="M274 524Q363 527 470 557" fill="none" stroke={orange} strokeWidth={18} strokeLinecap="round"/>}</g></svg>)}{points&&<><Tag text="展开定位：两条横带全长相合" y={886}/><Tag text="拍打时掌心相对，掌与指保持分开" y={954}/></>}</svg>}
export function PovComparison({view,folder,points,onError}:{view:string;folder:string;points:boolean;onError:()=>void}){
 const wrist=view==='pov-65-pair';
 return <div className="reference-comparison repair-comparison pov-comparison" aria-label={wrist?'腕掌侧全宽与两段动作对照':'脚掌向上与向下对照'}>{wrist?<>
 <figure><figcaption>① 腕掌侧整条横线 · 展开定位</figcaption><div className="reference-comparison-picture"><WristBands folder={folder} points={points}/></div></figure>
 <figure><figcaption>① 两条横线合拍 · 侧视接触</figcaption><div className="reference-comparison-picture"><SheetImage src={folder+'wrist-width-v5.png'} alt="腕掌侧整条接触，手掌与手指分开" onError={onError}/>{points&&<PovCorrectionOverlay view="pov-65-contact"/>}</div></figure>
 <figure><figcaption>② 小指侧掌缘互拍</figcaption><div className="reference-comparison-picture"><SheetImage src={folder+'sheet-v2.png'} tile={2} alt="第二段小指侧掌缘互拍" onError={onError}/>{points&&<ReferenceRepairOverlay view="ref-65-edge"/>}</div></figure>
 </>:['up','down'].map((name,i)=><figure key={name}><figcaption>{i?'② 向下绷脚 · 10秒':'① 向上 · 10秒'}</figcaption><div className="reference-comparison-picture"><SheetImage src={folder+'sagittal-v2.png'} tile={i?2:1} alt={i?'脚尖向下，脚跟朝下':'脚尖向上，脚跟朝下'} onError={onError}/>{points&&<PovCorrectionOverlay view={'pov-72-'+name}/>}</div></figure>)}</div>;
}
export function PovCorrectionOverlay({view,mirror=false}:{view:string;mirror?:boolean}){
 const uid='pov-'+useId().replaceAll(':','');let geometry:ReactNode=null,labels:ReactNode=null,title='',detail='';
 const arrow=(d:string,dashed=false)=><path d={d} fill="none" stroke={dashed?brown:green} strokeWidth={4} strokeDasharray={dashed?'9 8':undefined} markerEnd={`url(#${uid+(dashed?'-return':'')})`} strokeLinecap="round"/>;
 const line=(d:string,color=orange)=><path d={d} fill="none" stroke={color} strokeWidth={3}/>;
 const outline=(x:number,y:number,rx:number,ry:number)=><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={orange} strokeWidth={4}/>;
 if(view.endsWith('-pair'))return null;
 if(view==='pov-65-contact'){
  // Only the far wrist's visible palmar band is traced. The near wrist covers
  // the rest of the interface; the separate expanded map shows both full bands.
  geometry=<><path data-wrist-contact-band="visible-palmar-part" d="M369 629Q425 643 504 677" fill="none" stroke={orange} strokeWidth={11} strokeLinecap="round"/>{line('M410 648L248 737')}{arrow('M343 714L447 673')}{arrow('M657 720L536 679')}</>;
  labels=<Tag text="整条腕横纹相合" x={240} y={775} w={400} color={orange}/>;title='掌心相对 · 两侧腕掌面全宽合拍';detail='接触面部分被前手遮挡 · 掌与指分开';
 }else if(view.startsWith('pov-69-')){
  const name=view.slice(7),isMap=name==='map',thigh=name.startsWith('thigh'),release=name.includes('release');
  if(isMap){geometry=<>{[false,true].map(flip=><g key={String(flip)} transform={flip?'translate(1000 0) scale(-1 1)':undefined}>
   {region('M424 495L433 536L172 400L151 351Z')}{dots(along([418,516],[173,378],24),9)}
   {region('M91 400L141 386L341 686L288 722Z')}{dots(along([116,404],[315,704],28),9)}
   {arrow('M395 483L180 350')}{arrow('M147 435L358 716')}{arrow('M162 351Q58 300 94 395',true)}
   <ellipse data-excluded-region="knee" cx={80} cy={324} rx={48} ry={49} fill="none" stroke={brown} strokeWidth={3} strokeDasharray="9 7"/>
   </g>)}</>;labels=<><Tag text="踝附近起" y={263} w={260} color={green}/><Tag text="抬掌跳过膝关节" y={139} w={390} color={brown}/><Tag text="大腿内侧继续至根部" y={798} w={560} color={green}/></>;title='双侧：踝 → 小腿内侧 → 跳膝 → 大腿内侧';detail='密排点位逐处覆盖 · 每点按3–5下';
  }else{if(!release){geometry=<>{outline(thigh?117:376,thigh?480:427,thigh?56:40,thigh?70:42)}{outline(thigh?883:624,thigh?480:427,thigh?56:40,thigh?70:42)}</>;}
   title=release?'同点完成后抬掌，再向上换点':thigh?'双掌覆盖大腿内侧 · 从膝上向根部':'双掌从胫骨侧覆握 · 两侧同时';detail=thigh?'每点按3–5下，每下松力':'掌心接触小腿内侧，四指弯曲环抱';}
 }else if(view.startsWith('pov-72-')){
  const up=view.endsWith('-up'),down=view.endsWith('-down'),ready=view.endsWith('-ready');
  if(up||down){geometry=<>{arrow(up?'M863 572Q760 395 869 230':'M847 316Q970 457 916 668')}{line(up?'M842 650L812 680':'M722 546L735 735',green)}</>;labels=<Tag text="脚后跟朝下" x={mirror?250:750} y={up?723:777} w={330} color={green}/>;}
  title=ready?'右踝支在左腿上 · 手扶膝、包握脚趾':up?'整脚向上 · 持续10秒':down?'整脚向下绷直，脚尖向下 · 持续10秒':'松力回正 · 两个方向之间先回位';
  if(ready&&mirror)title='左踝支在右腿上 · 手扶膝、包握脚趾';detail='整脚保持竖直平面 · 脚跟朝下';
 }else if(view.startsWith('pov-73-')||view.startsWith('pov-75-')){
  const elbow=view.startsWith('pov-75-'),name=view.slice(7),map=name==='map',release=name==='release';
  if(map){const poly=elbow?sole75:sole73;geometry=<>{region(path(poly))}{elbow?<g data-rotation-points="coverage">{fillPoints(poly,55).map(([x,y],i)=><ContactSymbol key={i} x={x} y={y} kind="rotate" r={14}/>)}</g>:dots(fillPoints(poly,32),10)}</>;labels=<Tag text={elbow?'脚心覆盖范围 · 不含脚趾':'整个脚掌心区域 · 密排点位'} y={elbow?185:822} w={800} color={green}/>;title=elbow?'肘尖每点转按3–5圈，再抬肘换点':'先单拇指转按，再双拇指同点保持';detail=elbow?'点位疏排示意 · 换脚同样完成':'每点3–5圈 / 3–5秒 · 两阶段各完整覆盖';
  }else if(release){title=elbow?'肘尖离开皮肤，再换下一点':'双拇指抬起，离肤换到下一点';detail=elbow?'小臂保持离开脚底 · 另一手扶脚':'脚由对侧大腿支撑 · 保持盘腿坐姿';
  }else if(elbow){geometry=<ContactSymbol x={654} y={413} kind="rotate" r={16}/>;title=`${mirror?'左':'右'}肘尖单点接触${mirror?'右':'左'}脚底掌面`;detail='每点转按3–5圈 · 小臂与脚底分开';
  }else{const dual=name==='dual';geometry=dual?outline(638,408,52,26):<ContactSymbol x={650} y={400} kind="rotate" r={23}/>;title=dual?'双拇指并拢，共同按住同一点':`${mirror?'左':'右'}拇指指腹逐点转按${mirror?'右':'左'}脚心`;detail=dual?'每点保持3–5秒 · 其余手指在脚背支撑':'每点3–5圈 · 扶脚手保持稳定';}
 }else if(view.startsWith('pov-76-')){
  const name=view.slice(7),map=name==='map'||name.startsWith('line');
  if(map){const lines:[XY,XY][]=[[[358,590],[720,270]],[[385,626],[757,324]],[[413,659],[786,382]]];geometry=<>{lines.map(([a,b],i)=><g key={i} data-calf-line={i+1} opacity={name==='map'||name==='line'+(i+1)?1:.55}><path d={`M${a.join(' ')}L${b.join(' ')}`} stroke={green} strokeWidth={18} strokeOpacity={.13}/><path d={`M${a.join(' ')}L${b.join(' ')}`} stroke={green} strokeWidth={2.5} strokeDasharray="8 7"/>{dots(along(a,b,24),10)}{arrow(`M${b[0]-8} ${b[1]+32}L${b.join(' ')}`)}{line(`M${b.join(' ')}L800 ${[250,325,400][i]}`,green)}</g>)}</>;labels=<><Tag text="① 内侧" x={mirror?100:900} y={250} w={190}/><Tag text="② 中间" x={mirror?100:900} y={325} w={190}/><Tag text="③ 后侧" x={mirror?100:900} y={400} w={190}/><Tag text="三线都从踝向膝下" x={mirror?700:300} y={774} w={470}/></>;title='沿每条线逐点上移 · 三线各一遍';detail='每点保持3–5秒 · 松开换点 · 离肤回踝';
  }else{const close=name==='contact';if(name!=='release')geometry=<ContactSymbol x={close?503:574} y={close?495:477} kind="press" r={24}/>;title=name==='release'?'拇指离肤，再换下一点':`${mirror?'左':'右'}手扶膝 · ${mirror?'右':'左'}拇指接触小腿`;detail='踝部由另一条腿支撑 · 每点3–5秒';}
 }else if(view.startsWith('pov-77-')){
  const name=view.slice(7);if(name==='map'){
   const starts=along([325,593],[713,241],15),ends=along([390,635],[790,370],15);
   geometry=<>{region('M310 585L709 226L808 368L401 650Z')}{starts.map((p,i)=><g data-transverse-row={i} key={i}>{dots([p],12)}{arrow(`M${p.join(' ')}Q${p[0]+15} ${p[1]+30} ${ends[i].join(' ')}`)}</g>)}{arrow('M466 707Q476 652 429 624',true)}{arrow('M262 576L633 237',true)}</>;labels=<><Tag text="每一排：内侧 → 同高后侧" x={500} y={777} w={760}/><Tag text="向膝下换处" x={mirror?630:370} y={213} w={330} color={brown}/></>;title='同处横推2–3次，离肤回到内侧';detail='同处完成后再向上换处 · 覆盖踝至膝下';
  }else{const close=name==='detail';if(name!=='release')geometry=outline(close?605:574,close?442:446,close?70:48,30);title=name==='release'?'双拇指抬起，离肤回到内侧起点':'双拇指并排并拢，共同接触同处';detail='其余四指环抱支撑 · 同高横推';}
 }else if(view.startsWith('pov-78-')){
  const name=view.slice(7);if(name==='map'){const poly:XY[]=[[823,440],[897,462],[842,593],[754,728],[676,852],[590,803],[661,682],[739,547]];geometry=<><g data-thigh-extent="above-knee-to-root">{region(path(poly))}{dots(along([859,466],[635,824],34),11)}{arrow('M907 507Q807 700 714 852')}{line('M858 466L704 337',green)}{line('M635 824L479 803',green)}</g></>;labels=<><Tag text="膝盖上缘起" x={mirror?445:555} y={306} w={330} color={green}/><Tag text="延至衣物下的大腿根部" x={mirror?700:300} y={803} w={560} color={green}/></>;title='大腿内侧全长 · 膝上一直到根部';detail='每点前倾下压、松力回身3–5次，再抬臂';
  }else{const close=name==='press';if(name!=='release'){geometry=<><path d={close?'M796 611L893 610':'M790 608L889 603'} stroke={orange} strokeWidth={10} strokeLinecap="round"/>{line('M843 611L510 780')}</>;labels=<Tag text="近肘段 · 小指侧边缘" x={mirror?600:400} y={817} w={500} color={orange}/>;}title=name==='release'?'同点完成后，抬起前臂再换点':'前臂近肘段小指侧边缘接触大腿内侧';detail='前倾下压，松力回身 · 每点3–5次';}
 }
 if(!title)return null;
 return <svg className="point-overlay pov-correction-overlay" data-pov-view={view} viewBox="0 0 1000 1000" role="img" aria-label={title+'；'+detail}><defs>{[false,true].map(ret=><marker key={String(ret)} id={uid+(ret?'-return':'')} markerWidth={7} markerHeight={7} refX={5.8} refY={3.5} orient="auto"><path d="M1 1L5.8 3.5L1 6" fill="none" stroke={ret?brown:green} strokeWidth={1.5}/></marker>)}</defs><g transform={mirror?'translate(1000 0) scale(-1 1)':undefined}>{geometry}</g>{labels}<Tag text={title} y={906}/><Tag text={detail} y={970}/></svg>;
}
