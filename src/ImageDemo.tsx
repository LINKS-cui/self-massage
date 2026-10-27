import {PovComparison,PovCorrectionOverlay} from './PovCorrectionOverlay';
import {HandOriginComparison,HandOriginOverlay} from './HandOriginOverlay';
import {ReferenceComparison,ReferenceRepairOverlay} from './ReferenceRepairOverlay';
import {RepairOverlay,RepairDetail,RepairComparison} from './VisualRepairOverlay';
import {PalmCircleComparison} from './PalmCircleDiagram';
import {ManagedBatchOverlay,isManagedBatch} from './managed-batches';
import {HandBatchOverlay,isHandBatch} from './image-demo-batches/HandBatchOverlay';
import {HeadArmBatchOverlay,isHeadArmBatch} from './image-demo-batches/HeadArmBatchOverlay';
import {SheetImage} from './SheetImage';
import {ContactSymbol,SpiralLegend} from './ContactSymbol';
import {NeckBatchOverlay,isNeckBatch} from './image-demo-batches/NeckBatchOverlay';
import {FaceBatchOverlay} from './FaceBatchOverlay';
import './face-batch.css';
import {useEffect,useId,useRef,useState,type Dispatch,type SetStateAction} from 'react';
import './image-demo.css';

import {getImageDemo} from './image-demos';
import {EyeOverlay} from './EyeOverlay';
import {Batch2130Overlay,isBatch2130,batch2130ImageStyle} from './image-demo-batches/Batch2130Overlay';
import {OrbitSweepOverlay} from './OrbitSweepOverlay';
import {EarlyFaceOverlay,isEarlyFace} from './image-demo-batches/EarlyFaceOverlay';
import './image-demo-batches/early-face.css';
export {getImageDemo,hasImageDemo} from './image-demos';
const green='#087f74',orange='#c34c2f',ink='#403b33';

function Point({x,y,kind}:{x:number,y:number,kind:'start'|'end'|'press'}){
 if(kind==='press')return <ContactSymbol x={x} y={y} kind="press" r={29}/>;
 const color=green;
 return <g data-point={kind} className={`point point-${kind}`}><circle cx={x} cy={y} r="22" fill="#fffaf0" stroke={color} strokeWidth="5"/>{kind==='end'?<circle cx={x} cy={y} r="9" fill="none" stroke={color} strokeWidth="4"/>:<circle cx={x} cy={y} r="12" fill={color}/>}</g>;
}
function Label({x,y,width=240,children,color=ink}:{x:number,y:number,width?:number,children:string,color?:string}){
 return <g className="point-label"><rect x={x-width/2} y={y-29} width={width} height="58" rx="12" fill="#fffaf0" fillOpacity=".96" stroke={color} strokeWidth="2"/><text x={x} y={y+11} textAnchor="middle" fill={color} fontSize="32" fontWeight="650">{children}</text></g>;
}
function Overlay({phase,map,animated}:{phase:number,map:boolean,animated:boolean}){
 const uid=useId().replaceAll(':','');const arrow=`arrow-${uid}`,dash=`dash-${uid}`;
 const showArc=map||phase===1,showStart=map||phase===0||phase===1||phase===3,showEnd=map||phase===1,showPress=map||phase===2||phase===3;
 const pressY=map||phase===3?480:450,pressLeft=map||phase===3?440:448,pressRight=map||phase===3?560:552;
 return <svg className={`point-overlay ${animated?'is-animated':''}`} viewBox="0 0 1000 1000" aria-label={map?'起点、终点与按压位置总览':'当前步骤点位与方向'} role="img">
 <defs><marker id={arrow} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="strokeWidth"><path d="M1 1L7 4.5L1 8" fill="none" stroke={green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></marker><marker id={dash} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="strokeWidth"><path d="M1 1L7 4.5L1 8" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
 {showArc&&<g className="arc-paths" fill="none" stroke={green} strokeWidth="7" strokeLinecap="round"><path d="M440 280 A210 210 0 0 0 440 680"/><path d="M560 280 A210 210 0 0 1 560 680"/><path d="M292 440 Q287 477 297 514" markerEnd={`url(#${arrow})`}/><path d="M708 440 Q713 477 703 514" markerEnd={`url(#${arrow})`}/></g>}
 {!map&&phase===3&&<g fill="none" stroke={ink} strokeWidth="5" strokeDasharray="12 12" strokeLinecap="round"><path d="M430 457 Q370 360 434 307" markerEnd={`url(#${dash})`}/><path d="M570 457 Q630 360 566 307" markerEnd={`url(#${dash})`}/></g>}
 {showStart&&<><Point x={440} y={280} kind="start"/><Point x={560} y={280} kind="start"/><path d="M440 255L460 220M560 255L540 220" fill="none" stroke={green} strokeWidth="3"/><Label x={500} y={191} width={290} color={green}>{phase===3&&!map?'回到上方起点':'上侧起点 · 同时'}</Label></>}
 {showEnd&&<><Point x={440} y={680} kind="end"/><Point x={560} y={680} kind="end"/><path d="M440 706L460 745M560 706L540 745" fill="none" stroke={green} strokeWidth="3"/><Label x={500} y={778} width={290} color={green}>下侧终点 · 到此</Label></>}
 {showPress&&<><Point x={pressLeft} y={pressY} kind="press"/><Point x={pressRight} y={pressY} kind="press"/>{map?<><path d="M416 480H365V567H366M584 480H635V567H634" fill="none" stroke={orange} strokeWidth="3"/><Label x={500} y={583} width={270} color={orange}>两侧按压 · 同时</Label></>:phase===2?<><path d="M430 431L402 360H390M570 431L598 360H610" fill="none" stroke={orange} strokeWidth="3"/><Label x={500} y={323} width={340} color={orange}>同时按住 3–5 秒</Label></>:<Label x={500} y={655} width={350}>松开后抬指 · 离肤回位</Label>}</>}
 {phase===0&&!map&&<Label x={500} y={740} width={310}>四指支撑 · 拇指操作</Label>}
 </svg>;
}
export function ImageDemo({id,quiet,phase,onPhaseChange}:{id:string,quiet:boolean,phase:number,onPhaseChange:Dispatch<SetStateAction<number>>}){
 const demo=getImageDemo(id)!;const {phases,folder}=demo;
 const setPhase=onPhaseChange;
 const [playing,setPlaying]=useState(false),[map,setMap]=useState(false),[points,setPoints]=useState(true),[zoom,setZoom]=useState(false),[failed,setFailed]=useState(false);
 const [poseSelection,setPoseSelection]=useState({phase:0,pose:0});
 const dialog=useRef<HTMLDialogElement>(null);const current=phases[phase];
 const pose=poseSelection.phase===phase?poseSelection.pose:0;const activePose=current.poses?.[pose];
 const view=activePose||current;const overlayPhase=view.overlayPhase??phase;const overlayFlipX=map?demo.mapOverlayFlipX:view.overlayFlipX;const repairView=map?demo.mapRepairView:view.repairView;
 useEffect(()=>{setPoseSelection({phase,pose:0});},[phase]);
 useEffect(()=>{setFailed(false);},[phase,map,pose]);
 useEffect(()=>{if(!playing)return;const id=setInterval(()=>setPhase(p=>(p+1)%phases.length),6000);return()=>clearInterval(id);},[playing,setPhase,phases.length]);
 useEffect(()=>{const pause=()=>{if(document.hidden)setPlaying(false);};document.addEventListener('visibilitychange',pause);return()=>document.removeEventListener('visibilitychange',pause);},[]);
 useEffect(()=>{if(quiet)setPlaying(false);},[quiet]);
 useEffect(()=>{if(zoom){dialog.current?.showModal();setPlaying(false);}else dialog.current?.close();},[zoom]);
 function select(i:number){setPoseSelection({phase:i,pose:0});setPhase(i);setPlaying(false);setMap(false);}
 const picture=(large=false)=><div className={`image-stage ${large?'large':''}`} data-phase={phase} data-map={map} data-batch2130={isBatch2130(id)} data-neck-batch={isNeckBatch(id)} data-hand-batch={isHandBatch(id)} data-palm-comparison={repairView==='55-pair'&&!failed} data-repair-view={repairView} data-overlay-phase={overlayPhase} data-overlay-flip={Boolean(overlayFlipX)}>
 {repairView?.startsWith('pov-')&&repairView.endsWith('-pair')&&!failed?<PovComparison view={repairView} folder={folder} points={points} onError={()=>setFailed(true)}/>:repairView==='origin-60-pair'&&!failed?<HandOriginComparison folder={folder} points={points} onError={()=>setFailed(true)}/>:repairView==='55-pair'&&!failed?<PalmCircleComparison folder={folder} mirror={Boolean(overlayFlipX)} points={points} onError={()=>setFailed(true)}/>:repairView?.startsWith('ref-')&&repairView.endsWith('-pair')&&!failed?<ReferenceComparison view={repairView} folder={folder} points={points} onError={()=>setFailed(true)}/>:map&&id==='SM-060'?<RepairComparison folder={folder}/>:failed?<div className="image-load-error">插图暂时无法加载，请按下方文字阅读这一步。</div>:(isHandBatch(id)||isManagedBatch(id)||demo.overlayFamily==='face-batch'||isNeckBatch(id)||isHeadArmBatch(id))?<SheetImage src={folder+(map?demo.mapFile:view.file)} alt={map?demo.mapAlt:activePose?.alt||current.alt} tile={map?demo.mapTile:view.tile} cropTop={map?undefined:view.cropTop} flipX={map?demo.mapFlipX:view.flipX} onError={()=>setFailed(true)}/>:<img style={batch2130ImageStyle(id,phase,map)} src={folder+(map?demo.mapFile:view.file)} alt={map?demo.mapAlt:activePose?.alt||current.alt} onError={()=>setFailed(true)} draggable={false}/>}
 {!failed&&points&&repairView!=='55-pair'&&(repairView?.startsWith('pov-')?<PovCorrectionOverlay view={repairView} mirror={Boolean(overlayFlipX)}/>:repairView?.startsWith('origin-')?<HandOriginOverlay view={repairView} mirror={Boolean(overlayFlipX)}/>:repairView?.startsWith('ref-')?<ReferenceRepairOverlay view={repairView} mirror={Boolean(overlayFlipX)}/>:repairView?<RepairOverlay id={id} view={repairView} mirror={Boolean(overlayFlipX)}/>:isHandBatch(id)?<HandBatchOverlay id={id} phase={overlayPhase} map={map} flipX={Boolean(overlayFlipX)}/>:isManagedBatch(id)?<div className={overlayFlipX?'repair-mirrored-overlay':'repair-overlay-container'}><ManagedBatchOverlay id={id} phase={overlayPhase} pose={pose} map={map} swapSides={Boolean(overlayFlipX)}/></div>:isHeadArmBatch(id)?<HeadArmBatchOverlay id={id} phase={phase} map={map}/>:isNeckBatch(id)?<NeckBatchOverlay id={id} phase={phase} pose={pose} map={map}/>:isEarlyFace(id)?<EarlyFaceOverlay id={id} phase={phase} pose={pose} map={map}/>:demo.overlayFamily==='face-batch'?<FaceBatchOverlay id={id} phase={phase} map={map}/>:isBatch2130(id)?<Batch2130Overlay id={id} phase={phase} map={map}/>:id==='SM-001'?<EyeOverlay phase={phase} map={map}/>:id==='SM-002'?<OrbitSweepOverlay phase={phase} map={map}/>:<Overlay phase={phase} map={map} animated={playing&&!quiet}/>)}
 <span className="image-stage-badge">{map?(id==='SM-055'?'轨迹总览':'点位总览'):`步骤 ${phase+1} / ${phases.length}`}</span>
 </div>;
 return <section className="image-player" aria-label="生图动作演示">
 <div className="image-player-top"><span>{id} / 图解样片</span><button onClick={()=>setZoom(true)} className="text-button" aria-label="放大图解">放大看 ↗</button></div>
 {demo.reviewIssue&&<p className="image-review-issue" role="note">返修未完成：{demo.reviewIssue}</p>}
 <div className="image-mode-controls"><button className={!map?'selected':''} aria-pressed={!map} onClick={()=>{setMap(false);setPlaying(false);}}>人物步骤图</button><button className={map?'selected':''} aria-pressed={map} onClick={()=>{setMap(true);setPlaying(false);setPoints(true);}}>{id==='SM-055'?'轨迹总览':'点位总览'}</button><label><input type="checkbox" checked={points} onChange={e=>setPoints(e.target.checked)}/>{id==='SM-055'?'显示轨迹':'显示点位'}</label></div>
 {picture()}
 {!map&&view.sideLabel&&<p className="image-side-label">{view.sideLabel}</p>}
 {!map&&repairView&&<RepairDetail id={id} view={repairView}/>}
 {!map&&current.poses&&<div className="image-pose-controls" role="group" aria-label="本步分解图"><span>分解图</span>{current.poses.map((p,i)=><button key={p.label} aria-pressed={pose===i} onClick={()=>{setPoseSelection({phase,pose:i});setPlaying(false);}}>{p.label}</button>)}<small>点击对照姿势，不代表动作停顿或节拍</small></div>}
 <div className="point-legend">{demo.legend.map((label,i)=><span key={label}>{demo.legendKinds?.[i]==='spiral'?<SpiralLegend/>:<i className={demo.legendKinds?.[i]||['start','end','press'][i]}/>}<span>{label}</span></span>)}</div>
 <div className="image-phase-caption" aria-live="polite"><span className="phase-number">{map?'◎':String(phase+1).padStart(2,'0')}</span><div><h2>{map?demo.mapTitle:current.title}</h2><p>{map?demo.mapCaption:current.caption}</p></div></div>
 <div className="image-phase-tabs" style={{gridTemplateColumns:`repeat(${phases.length},minmax(0,1fr))`}} role="group" aria-label="动作阶段">{phases.map((p,i)=><button key={p.title} aria-pressed={phase===i&&!map} onClick={()=>select(i)}><span>{i+1}</span>{p.short}</button>)}</div>
 <div className="image-play-controls"><button className="btn primary" aria-pressed={playing} onClick={()=>{setMap(false);setPlaying(p=>!p);}}>{playing?'Ⅱ 暂停翻页':'▷ 自动翻页'}</button><button className="text-button" onClick={()=>select((phase+phases.length-1)%phases.length)} aria-label="上一步">← 上一步</button><button className="text-button" onClick={()=>select((phase+1)%phases.length)} aria-label="下一步">下一步 →</button></div>
 <p className="image-player-note">{demo.playerNote}</p>
 <dialog ref={dialog} className="image-zoom-dialog" aria-label="放大图解" onCancel={e=>{e.preventDefault();setZoom(false);}} onClick={e=>{if(e.target===e.currentTarget)setZoom(false);}}><button autoFocus className="btn zoom-close" onClick={()=>setZoom(false)}>关闭 ×</button>{zoom&&picture(true)}<p>{map?'点位总览':current.title}</p></dialog>
 </section>;
}
