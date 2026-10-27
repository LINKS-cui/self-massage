import type {ImageDemoDefinition,ImagePhase} from './image-demos';
type Pose=NonNullable<ImagePhase['poses']>[number];
// Presentation-only corrections; uid, contentRevision and confirmed prose remain bound.
export function applyVisualRepairs(demos:Record<string,ImageDemoDefinition>){
 // Keep imported JSON immutable across Vite module reloads.
 for(const n of [50,51,52,53,54,55,56,57,58,59,60,71,72,73,74,75,77,78]){const id=`SM-${String(n).padStart(3,'0')}`;demos[id]=structuredClone(demos[id]);}
 const get=(n:number)=>demos[`SM-${String(n).padStart(3,'0')}`];
 const from=(p:ImagePhase,label:string,phase:number,extra:Partial<Pose>={}):Pose=>({file:p.file,tile:p.tile,cropTop:p.cropTop,flipX:p.flipX,overlayFlipX:p.overlayFlipX,repairView:p.repairView,overlayPhase:phase,alt:p.alt,label,...extra});
 const opposite=(p:Pose):Pose=>({...p,flipX:!p.flipX,overlayFlipX:!p.overlayFlipX});
 const swap=(n:number,index:number,sources:Pose[],sideLabel:string)=>{
  const d=get(n),p=d.phases[index];
  p.poses=sources.map(x=>({...opposite(x),sideLabel,alt:`换侧：${sideLabel}；${x.label}`}));
  Object.assign(p,{file:p.poses[0].file,tile:p.poses[0].tile,flipX:p.poses[0].flipX,sideLabel});
 };
 // Legacy presentation transforms. IDs 51/52/53/56 are superseded by newly
 // drawn two-arm poses in applyHandOriginRepairs; this is not anatomy validation.
 for(const n of [51,52,53,54,56,58,59]){
  const d=get(n);d.mapFlipX=false;d.mapOverlayFlipX=false;
  for(const p of d.phases){p.flipX=false;p.overlayFlipX=false;}
 }
 for(let n=51;n<=60;n++)for(const p of get(n).phases)p.sideLabel='被操作：左手　｜　操作：右手　｜　左右按本人身体区分';
 const d50=get(50);
 // Keep the user's left/right palm assignment from the batch definition.
 Object.assign(d50.phases[2],{repairView:'50-map',overlayFlipX:d50.phases[2].flipX});
 Object.assign(d50.phases[3],{repairView:'50-map',overlayFlipX:d50.phases[3].flipX});
 d50.mapOverlayFlipX=d50.mapFlipX;d50.mapRepairView='50-map';
 Object.assign(d50.phases[1],{file:'contact-repair-v4.png',tile:undefined,repairView:'50-contact',alt:'两腕连续、八指交叉；对侧拇指指腹接触掌心，另一拇指抬起。'});
 d50.phases[1].poses=[from(d50.phases[1],'接触归属',1),{file:d50.phases[0].file,tile:d50.phases[0].tile,label:'对照交叉起势',repairView:'50-prep',alt:d50.phases[0].alt}];
 // The replacement 55 atlas has the opposite orientation from the other atlases.
 // Show both COMPLETE paths immediately; the contact pose is only a hand-shape reference.
 const d55=get(55),atlas55='atlas-repair-v3.png';
 Object.assign(d55,{poster:atlas55,posterTile:0,posterFlipX:true,mapFile:atlas55,mapTile:3,mapFlipX:true,mapOverlayFlipX:true,mapRepairView:'55-pair',mapAlt:'左掌向上，两张完整轨迹：从掌心由小到大，再反向由大到小回到掌心。',mapCaption:'图一从掌心开始，由小到大画10圈；图二从外圈接着反向，由大到小画10圈。两阶段连续贴肤，起始旋向不限。',cardCaption:'从掌心开始，由小到大10圈，再反向由大到小10圈。'});
 for(const p of d55.phases){p.flipX=true;p.overlayFlipX=true;}
 Object.assign(d55.phases[0],{file:atlas55,tile:3,repairView:'55-pair'});
 d55.phases[0].poses=[from(d55.phases[0],'两阶段完整轨迹',0),from(d55.phases[0],'正面接触手型',0,{tile:0,repairView:'55-contact'}),from(d55.phases[0],'侧看关节与支撑拇指',0,{tile:1,repairView:'55-side'})];
 for(const pose of d55.phases[0].poses)pose.sideLabel='被操作：左手　｜　操作：右手　｜　左掌向上，拇指在画面左侧';
 for(const phase of [1,2]){
  const p=d55.phases[phase];Object.assign(p,{file:atlas55,tile:3,repairView:`55-${phase===1?'grow':'shrink'}`,sideLabel:'被操作：左手　｜　右食指中间关节始终贴肤',alt:`左手掌心向上，拇指在画面左侧；完整画圈轨迹：${phase===1?'从掌心由小到大':'反向由大到小回到掌心'}，共10圈。`});
  delete p.poses;
 }
 swap(55,3,[from(d55.phases[0],'右掌两阶段轨迹',0),from(d55.phases[0],'右掌接触手型',0,{tile:0,repairView:'55-contact'}),from(d55.phases[1],'小到大',1),from(d55.phases[2],'反向大到小',2)],'被操作：右手　｜　操作：左手');
 const d57=get(57),atlas57='atlas-repair-v3.png';
 for(const [p,tile,view] of [[0,0,'57-dorsal'],[1,1,'57-release'],[2,2,'57-lateral']] as const)Object.assign(d57.phases[p],{file:atlas57,tile,cropTop:tile>=2?.45:undefined,repairView:view});
 d57.phases[2].poses=[from(d57.phases[2],'左右侧接触',2),{file:atlas57,tile:3,cropTop:.45,label:'到指尖',repairView:'57-lateral-tip'}];
 d57.mapFlipX=true;d57.mapOverlayFlipX=true;
 for(const i of [3,4]){d57.phases[i].flipX=true;d57.phases[i].overlayFlipX=true;}
 // The earlier overview still explains all fingers; a separate final phase demonstrates the other hand.
 for(const n of [53,54,57]){
  const d=get(n);d.phases.push({...d.phases.at(-1)!,title:'换手 · 完成后交换两手',short:'换手',caption:'完成同侧全部操作后，交换两手，按相同步骤操作另一手。',sourceStep:d.phases.at(-1)!.sourceStep});
  swap(n,d.phases.length-1,n===57?[from(d.phases[0],'上下夹',0),from(d.phases[2],'左右夹',2)]:[from(d.phases[0],'捏住指缝',0),from(d.phases[1],'向指尖拉',1),from(d.phases[2],'松开',2),from(d.phases[3],'原位捏持',3)],'被操作：右手　｜　操作：左手');
 }
 for(const n of [51,52,56,58,59]){
  const d=get(n),sources=n===51?[0,1,2]:n===52||n===56?[0,1,2]:[0,1,2];
  swap(n,d.phases.length-1,sources.map(i=>from(d.phases[i],['接触起势',n===51?'原位转压':'推进路径',n===52||n===56?'指尖捏持':'松开回位'][i],i)),'被操作：右手　｜　操作：左手');
 }
 const d60=get(60);d60.phases[3].repairView='60-grip';d60.mapRepairView='60-map';
 Object.assign(d60.phases[1],{file:'fist-body-repair-v3.png',tile:undefined,repairView:'60-body',caption:'右拳掌根面顶住左手四指中间关节，让手背靠近前臂背面，保持10秒；左前臂水平固定。可切换接触特写核对接触面。'});
 d60.phases[1].poses=[from(d60.phases[1],'整体背伸',1),{file:'contact-detail-handedness-v2.png',label:'掌根与四指中间关节',flipX:true,repairView:'60-detail',alt:'掌面斜视，拳掌根面顶四指中间关节；下方掌心空出。'}];
 swap(60,5,[from(d60.phases[0],'水平准备',0),from(d60.phases[1],'拳助背伸',1),from(d60.phases[3],'握指背伸',3),from(d60.phases[4],'松开回正',4)],'被操作：右腕　｜　辅助：左手　｜　两阶段同向背伸');
 const d71=get(71);for(const p of [1,2]){
  d71.phases[p].poses=(p===1?[0,1,2,3]:[0,3,2,1]).map((tile,i)=>({file:'motion-repair-v2.png',tile,label:`姿态 ${i+1}`,repairView:`71-${p===1?'cw':'ccw'}-${i}`,alt:`整脚绕踝${p===1?'顺时针':'逆时针'}分解姿态${i+1}`,sideLabel:'右脚绕踝　｜　左手包握全部脚趾　｜　右手扶右膝'}));
  Object.assign(d71.phases[p],d71.phases[p].poses![0]);
 }
 d71.phases[3].poses=[from(d71.phases[3],'左侧整体摆位',3),...[0,3,2,1].map((tile,i)=>({file:'motion-repair-v2.png',tile,flipX:true,overlayFlipX:true,label:`左侧顺转 ${i+1}`,repairView:`71-ccw-${i}`,sideLabel:'左脚绕踝　｜　右手包握全部脚趾　｜　左手扶左膝'})),...[0,1,2,3].map((tile,i)=>({file:'motion-repair-v2.png',tile,flipX:true,overlayFlipX:true,label:`左侧逆转 ${i+1}`,repairView:`71-cw-${i}`,sideLabel:'左脚绕踝　｜　右手包握全部脚趾　｜　左手扶左膝'}))];
 const legs:{n:number;index:number;phases:number[];labels:string[];side:string}[]=[
  {n:72,index:5,phases:[0,1,2,3],labels:['另一侧起势','向上扳','回正','向下扳'],side:'左脚操作　｜　右手包握脚趾　｜　左手扶膝'},
  {n:73,index:5,phases:[0,1,3],labels:['右侧起势','单拇指转压','双拇指同点按压'],side:'被操作：右脚　｜　支在左侧大腿上'},
  {n:74,index:5,phases:[0,2,3],labels:['右脚趾根','趾尖保持','松开'],side:'被操作：右脚　｜　左拇指操作　｜　左手四指托趾背'},
  {n:75,index:4,phases:[0,1,2],labels:['右侧起势','左肘尖转压','抬肘换点'],side:'被操作：右足底　｜　左肘操作　｜　右手扶脚'},
  {n:78,index:4,phases:[0,1,3,2],labels:['左侧起势','前倾加压','尺骨侧接触','回身释放'],side:'被操作：左大腿内侧　｜　左前臂近肘尺骨侧接触'},
 ];
 // Restore full-body preparation frames already present in the original atlases.
 const d73=get(73);d73.phases[0].poses=[{file:'sheet-v1.png',tile:0,label:'整体摆位',repairView:'73-body',sideLabel:'左脚放在右侧大腿上'},from(d73.phases[0],'单拇指接触',0)];
 for(const x of legs){const d=get(x.n);const sources=x.phases.map((p,i)=>from(d.phases[p],x.labels[i],p));if(x.n===73)sources[0]={...d73.phases[0].poses![0],label:'右侧整体摆位'};swap(x.n,x.index,sources,x.side);}
 const d77=get(77);d77.phases[0].poses=[{file:'sheet-v1.png',tile:0,label:'整体摆位',repairView:'77-body',sideLabel:'右腿操作　｜　双拇指并列、其余四指环抱'},from(d77.phases[0],'双拇指同点接触',0)];
 swap(77,4,[{...d77.phases[0].poses![0],label:'右侧整体摆位'},from(d77.phases[0],'双拇指接触',0),from(d77.phases[1],'同高度横向移动',1),from(d77.phases[3],'逐排向膝下',3)],'被操作：左小腿　｜　双拇指并列，按同样顺序完成');
}
