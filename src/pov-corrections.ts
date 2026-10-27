import type {ImageDemoDefinition,ImageView} from './image-demos';

/** User-confirmed corrections, scoped to the independent illustration preview. */
export function applyPovCorrections(demos:Record<string,ImageDemoDefinition>){
 const get=(n:number)=>{const id=`SM-${String(n).padStart(3,'0')}`;return demos[id]=structuredClone(demos[id]);};
 const v=(n:number,name:string,tile?:number,file='pov-atlas-v2.png'):ImageView=>({file,tile,repairView:`pov-${n}-${name}`,flipX:false,overlayFlipX:false,cropTop:undefined,overlayPhase:undefined,sideLabel:undefined});
 const set=(d:ImageDemoDefinition,i:number,x:ImageView,alt?:string)=>Object.assign(d.phases[i],x,{poses:undefined,alt:alt||d.phases[i].caption});
 const map=(d:ImageDemoDefinition,x:ImageView)=>Object.assign(d,{mapFile:x.file,mapTile:x.tile,mapRepairView:x.repairView,mapFlipX:false,mapOverlayFlipX:false});
 const poster=(d:ImageDemoDefinition,x:ImageView)=>Object.assign(d,{poster:x.file,posterTile:x.tile,posterFlipX:false});
 const swap=(d:ImageDemoDefinition,indices:number[],label:string)=>{const p=d.phases.at(-1)!;const poses=indices.map(i=>({...d.phases[i],poses:undefined,label:d.phases[i].short,flipX:true,overlayFlipX:true,sideLabel:label,alt:`${label}；${d.phases[i].title}`}));Object.assign(p,poses[0],{short:p.short,title:p.title,caption:p.caption,sourceStep:p.sourceStep,poses});};
 const a=get(65),w=v(65,'contact',undefined,'wrist-width-v5.png');
 set(a,0,w,'掌心相对，双腕掌心侧整条横纹对齐合拍；手掌和手指分开，接触带在前手后方');
 a.phases[0].caption='像鼓掌一样使掌心相对，双腕掌心侧从拇指侧到小指侧的整条横线对齐、合并拍打。手掌和手指保持分开；共20–30次。';
 a.instructionOverrides={0:a.phases[0].caption};
 set(a,3,{...w,repairView:'pov-65-pair'});map(a,{...w,repairView:'pov-65-pair'});poster(a,w);
 a.phases[0].poses=[{...w,label:'整条横线合拍'},{...w,repairView:'pov-65-pair',label:'展开定位与两段对照'}];
 a.mapCaption='第一段：两侧腕掌面整条横线对齐互拍，手掌和手指分开；第二段：小指侧掌缘互拍。两段各20–30次，整套一遍。';
 a.note='第一段接触带横跨整个腕掌侧；侧视图中部分接触面被前手遮挡。部位图展开显示两侧完整横带。';
 const b=get(69),calf=(name:string,tile:number)=>v(69,name,tile,'bilateral-connected-v6.png'),route=v(69,'map',undefined,'butterfly-map-v5.png');
 set(b,0,calf('grip',0),'第一视角双腿同时入画，双掌从胫骨侧覆握同侧小腿，掌心接触内侧');
 b.phases[0].caption='双膝向两侧打开、双脚靠拢。双手从胫骨侧覆握同侧小腿，掌心接触内侧近踝处；两侧同时操作。';
 b.instructionOverrides={0:'保持双膝向两侧弯曲、双脚靠拢、脚心翻开的坐姿。双手从胫骨侧覆握同侧小腿，掌心接触小腿内侧近踝处；两条腿同时操作。'};
 set(b,1,calf('press',0));b.phases[1].poses=[{...calf('press',0),label:'双掌按压'},{...calf('release',1),label:'同点完成后抬掌'}];
 set(b,2,calf('release',1));b.phases[2].poses=[{...calf('release',1),label:'抬掌换点'},{...route,label:'沿小腿向膝下上移'}];
 set(b,3,route);set(b,4,calf('thigh',2));b.phases[4].poses=[{...calf('thigh',2),label:'双掌膝上按放'},{...route,label:'继续向大腿根部'}];
 set(b,5,route);map(b,route);poster(b,calf('grip',0));
 b.mapAlt='双腿第一视角：小腿内侧及大腿内侧密排点位，膝关节跳过';
 const c=get(72),leg=(name:string,tile:number)=>v(72,name,tile,'sagittal-v2.png');
 for(const [i,name,tile] of [[0,'ready',0],[1,'up',1],[2,'neutral',3],[3,'down',2],[4,'neutral',3]] as const)set(c,i,leg(name,tile));
 c.phases[3].short='向下';c.phases[3].title='向下绷脚 · 持续10秒';c.phases[3].caption='脚保持竖直平面，脚后跟朝下。带动整脚向下绷直，脚尖向下弯，方向与向上相反；持续保持10秒。';c.phases[3].alt=c.phases[3].caption;
 c.phases[1].caption='左手带动整脚向上，脚尖朝小腿方向弯，持续10秒；脚后跟朝下，整脚保持竖直平面。';c.phases[1].alt=c.phases[1].caption;
 c.phases[4].caption='向下保持结束后松力回正，两方向完成后再换腿。';c.phases[5].caption='换左脚，右手包握脚趾、左手扶膝。先向上10秒、回正，再向下绷脚10秒、回正。两侧各一次。';
 c.phases[4].alt=c.phases[4].caption;
 c.instructionOverrides={2:'再带动整脚向下绷直，脚尖向下弯曲，与向上相反。脚后跟朝下，整脚保持竖直平面，不向侧面倾倒；持续10秒，随后松力回位。',3:'两个方向完成后换腿，手位镜像交换；另一侧同样先向上10秒、松力回位，再向下绷脚10秒、松力回位。两侧各完成一次。'};
 c.mapTitle='向上与向下 · 同一竖直平面';c.mapCaption='向上10秒 → 松力回正 → 向下绷脚10秒 → 松力回正；脚跟朝下，整脚不侧倾。';c.cardCaption=c.mapCaption;c.note='原文“向后”按用户明确说明展示为向下绷脚，脚尖向下弯，整脚维持竖直平面。';
 map(c,{...leg('down',2),repairView:'pov-72-pair'});c.mapAlt=c.mapCaption;poster(c,leg('ready',0));swap(c,[0,1,2,3,4],'左脚操作 · 右手握趾 · 左手扶膝');
 const d=get(73);for(const [i,name,tile] of [[0,'single',0],[1,'rotate',0],[2,'map',2],[3,'dual',1],[4,'release',3]] as const)set(d,i,v(73,name,tile));
 d.phases[0].caption='盘腿坐，左脚由右大腿支撑，脚心朝向自己。左手扶脚，右拇指指腹接触左脚脚心，其余四指在脚背支撑。';
 map(d,v(73,'map',2));poster(d,v(73,'single',0));d.mapCaption='密排点位覆盖整个脚心：先单拇指每点3–5圈，再双拇指并拢共同按住每点3–5秒。每点完成后抬指换点；两阶段分别完整覆盖。';swap(d,[0,1,3,4,2],'右脚放左大腿 · 左拇指转按 / 双拇指同按');
 const e=get(75),elbow=(name:string)=>v(75,name,undefined,`elbow-tip-${name==='rotate'?'contact':name}-v6.png`);
 for(const [i,name] of ['contact','rotate','release','map'].entries())set(e,i,elbow(name));map(e,elbow('map'));poster(e,elbow('contact'));
 e.phases[0].caption='盘腿坐，左脚放在右大腿上，脚心朝上，左手扶稳脚跟。右臂弯曲，仅以肘尖接触足底掌面，小臂与脚底分开。';
 e.phases[0].alt=e.phases[0].caption;
 e.phases[1].caption='只用右肘尖逐点转按左脚脚心，每点3–5圈；小臂始终离开脚底，不作整段贴压。';e.phases[1].alt=e.phases[1].caption;
 e.phases[2].caption='同点转按完成后，抬起肘尖离开皮肤，再换到下一个点。左手继续扶稳脚跟。';e.phases[2].alt=e.phases[2].caption;
 e.phases[3].caption='逐点覆盖脚心，不覆盖脚趾。图中螺旋为疏排转按点位示意，点数、顺序和旋转方向均无规定。';e.phases[3].alt=e.phases[3].caption;
 e.mapCaption='脚心转按点位用螺旋疏排示意，不含脚趾；每点转按3–5圈，抬肘离开后换点。图示不规定点数或间距，左右各一遍。';e.mapAlt=e.mapCaption;
 e.instructionOverrides={2:'转按方向、点位顺序和点位数量均无规定，以覆盖整个脚心区域为准，不覆盖脚趾。左脚完成后换右脚，右手扶脚支撑、左肘尖操作，同样覆盖脚心一遍。整套只做一次。'};
 e.phases[4].caption='换右脚放在左大腿上，右手扶脚、左肘尖操作。每点3–5圈，抬肘换点，覆盖脚心、不含脚趾；整套一次。';swap(e,[0,1,2,3],'右脚放左大腿 · 左肘尖操作');
 const f=get(76);set(f,0,v(76,'start',0));for(const [i,name] of [[1,'line1'],[2,'line2'],[3,'line3']] as const)set(f,i,v(76,name,2));set(f,4,v(76,'contact',1));
 f.phases[4].poses=[{...v(76,'contact',1),label:'单拇指接触'},{...v(76,'release',3),label:'抬指离开'}];map(f,v(76,'map',2));poster(f,v(76,'start',0));
 f.mapCaption='三条线分别密排点位：①内侧中线、②内后侧中间线、③后侧中线；均由脚踝向膝下，每点3–5秒，松开后换点。每条线完成后离肤回踝。';swap(f,[0,1,2,3,4],'左腿操作 · 左手扶膝 · 右拇指按压');
 const g=get(77);set(g,0,v(77,'contact',0));g.phases[0].poses=[{...v(77,'contact',0),label:'第一视角摆位'},{...v(77,'detail',1),label:'双拇指同处'}];set(g,1,v(77,'map',3));set(g,2,v(77,'release',2));set(g,3,v(77,'map',3));map(g,v(77,'map',3));poster(g,v(77,'contact',0));g.phases[4].caption='右侧完整覆盖后换左腿，双拇指仍并拢共同横推。每处同高推2–3次，离肤回位，再向上换处；两侧各一遍。';swap(g,[0,1,2,3],'左腿操作 · 双拇指同处横推');
 const h=get(78),cross=(name:string,tile:number)=>v(78,name,tile,'crossleg-connected-v3.png');set(h,0,cross('start',0));set(h,1,cross('press',1));set(h,2,cross('release',2));set(h,3,cross('map',3));map(h,cross('map',3));poster(h,cross('start',0));
 h.mapCaption='大腿内侧中线从膝盖上方到大腿根部密排点位。以前臂近肘段小指侧接触，每点前倾下压、松力回身3–5次，然后抬臂换点。';h.phases[4].caption='换左小腿叠右小腿，左前臂近肘段小指侧按左大腿内侧，仍由膝上向大腿根部。每点3–5次，两侧各一遍。';swap(h,[0,1,2,3],'左大腿操作 · 左前臂近肘段小指侧');
 // Dense small marks locate the coverage area; they do not prescribe a point count.
 for(const demo of [b,d,e,f,g,h]){
  const kinds=demo.legendKinds||demo.legend.map((_,i)=>['start','end','press'][i]);
  const entries=demo.legend.flatMap((label,i)=>kinds[i]==='coverage'?[]:[{label:label.replace(/(?:（圆点）)+$/,''),kind:kinds[i]}]);
  if(demo===e){
   const spiral=entries.find(x=>x.kind==='spiral');
   if(spiral)spiral.label='螺旋：转按点位';
   else entries.push({label:'螺旋：转按点位',kind:'spiral'});
  }else entries.push({label:'小圆点：覆盖位置',kind:'coverage'});
  demo.legend=entries.map(x=>x.label);demo.legendKinds=entries.map(x=>x.kind);
 }
}
