import type {ImageDemoDefinition,ImageView} from './image-demos';

// New source paintings correct the relationship of BOTH arms. Mirroring is
// reserved for the confirmed final hand-swap, never for repairing the base pose.
export function applyHandOriginRepairs(demos:Record<string,ImageDemoDefinition>){
 const get=(n:number)=>{const id=`SM-${String(n).padStart(3,'0')}`;return demos[id]=structuredClone(demos[id]);};
 const left='被操作：左手　｜　操作：右手　｜　左右按本人身体区分';
 const right='被操作：右手　｜　操作：左手　｜　左右按本人身体区分';
 const v=(file:string,repairView:string,tile?:number):ImageView=>({file,tile,repairView,flipX:false,overlayFlipX:false,cropTop:undefined,sideLabel:left,overlayPhase:undefined});
 const set=(d:ImageDemoDefinition,i:number,x:ImageView,alt:string)=>Object.assign(d.phases[i],x,{poses:undefined,alt});
 const map=(d:ImageDemoDefinition,x:ImageView,alt:string)=>Object.assign(d,{mapFile:x.file,mapTile:x.tile,mapFlipX:false,mapOverlayFlipX:false,mapRepairView:x.repairView,mapAlt:alt});
 const swap=(d:ImageDemoDefinition,indices:number[])=>{
  const p=d.phases.at(-1)!;
  const poses=indices.map(i=>{const q=d.phases[i];return {...q,label:q.short,flipX:true,overlayFlipX:true,sideLabel:right,alt:`换手：${q.short}，左手操作右手`};});
  Object.assign(p,poses[0],{title:p.title,short:p.short,caption:p.caption,sourceStep:p.sourceStep,poses});
 };
 const d51=get(51),d52=get(52);
 for(const d of [d51,d52]){
  set(d,0,v('palm-contact-v3.png','origin-palm-contact'),'本人视角左掌向上、拇指在画面左侧，右前臂从右下方伸入，右拇指接触掌面、四指托背');
  Object.assign(d,{poster:'palm-contact-v3.png',posterTile:undefined,posterFlipX:false});
 }
 set(d51,1,v('palm-contact-v3.png','origin-51-rotate'),d51.phases[0].alt);
 set(d51,2,v('palm-release-v3.png','origin-palm-release'),'右手从右下方托住左手，右拇指离开左掌，接触处出现间隙');
 set(d51,3,v('palm-map-v3.png','origin-51-map'),'左掌向上，标出掌根至手腕的整片操作范围');
 map(d51,v('palm-map-v3.png','origin-51-map'),d51.phases[3].alt);swap(d51,[0,1,2,3]);
 set(d52,1,v('palm-map-v3.png','origin-52-map'),'左掌向上，五条路线分别由掌根通向五指指尖');
 set(d52,2,v('tip-joint-detail-v6.png','origin-tip-detail'),'接触面特写：拇指指腹与弯曲食指中间关节夹住指尖指腹；操作食指末节向下弯，指尖不参与夹持');
 set(d52,3,v('palm-map-v3.png','origin-52-map'),d52.phases[1].alt);
 map(d52,v('palm-map-v3.png','origin-52-map'),d52.phases[1].alt);swap(d52,[0,1,2]);
 const d53=get(53),a53='atlas-origin-v3.png';
 for(const [i,tile,rv] of [[0,0,'contact'],[1,1,'pull'],[2,3,'release'],[3,0,'hold'],[4,3,'map']] as const){set(d53,i,v(a53,`origin-53-${rv}`,tile),i===2?'松开操作手后的无遮挡左掌，标出重新捏住的同一指缝':i===4?'左掌四个指缝，按拇食至无名小指排列':'左手掌心向上；右前臂从右下方伸入，右拇指在掌侧、食指在背侧对夹指缝');}
 Object.assign(d53,{poster:a53,posterTile:0,posterFlipX:false});map(d53,v(a53,'origin-53-map',3),d53.phases[4].alt);swap(d53,[0,1,2,3]);
 const d56=get(56),a56='atlas-origin-v3.png';
 set(d56,0,v(a56,'origin-56-contact',0),'左手背朝上、拇指朝画面右侧；右前臂从右下方伸入，右拇指转按手指背侧，四指在掌侧托住');
 set(d56,1,v(a56,'origin-56-map',3),'左手背，五条路线各自由该指指根到指尖');
 d56.phases[1].poses=[{...v(a56,'origin-56-map',3),label:'五指路径'},{...v(a56,'origin-56-advance',1),label:'沿指背推进'}];
 set(d56,2,v('tip-joint-detail-v6.png','origin-tip-detail'),d52.phases[2].alt);
 set(d56,3,v(a56,'origin-56-map',3),d56.phases[1].alt);
 Object.assign(d56,{poster:a56,posterTile:0,posterFlipX:false});map(d56,v(a56,'origin-56-map',3),d56.phases[1].alt);swap(d56,[0,1,2]);
 const d60=get(60),a60='atlas-unified-v5.png';
 for(const [i,tile,rv] of [[0,0,'ready'],[1,1,'fist'],[2,3,'release'],[3,2,'grip'],[4,3,'release']] as const){set(d60,i,v(a60,`origin-60-${rv}`,tile),`统一人物插图：${d60.phases[i].title}，被操作左前臂在胸前水平固定`);}
 Object.assign(d60,{poster:a60,posterTile:1,posterFlipX:false,mapTitle:'同一套姿势：拳助与握指',mapCaption:'左前臂水平固定。先拳掌根面顶住四指中间关节，保持10秒后松开回正；再握住四指同向背伸，保持10秒后松开回正。两段完成后换手。'});
 map(d60,v(a60,'origin-60-pair'),'同一人物的拳助和握指动作对照');swap(d60,[0,1,2,3,4]);
 // The user removed the standalone lifting illustration, not the instruction
 // to release before changing points in the confirmed procedure.
 const d63=get(63);d63.phases.splice(3,1);
 d63.phases[2].caption='用右拇指指腹在一个点位转压3–5圈，完成后抬起拇指再换下一个点，四指继续支撑。旋转方向没有规定。';
 const d65=get(65),clap=v('wrist-clap-v4.png','ref-65-volar');clap.sideLabel=undefined;
 set(d65,0,clap,'鼓掌式掌心相对，手掌和手指分开，只有双腕掌心侧相互接触');
 d65.phases[0].caption='像鼓掌一样使掌心相对，手掌稍向外打开，只有手腕掌心侧相互拍打，手掌和手指保持分开。互拍20–30次。';
 set(d65,3,{...clap,repairView:'ref-65-pair'},'先腕掌侧、再小指侧掌缘，两段接触部位对照');
 Object.assign(d65,{poster:clap.file,posterTile:undefined,posterFlipX:false,mapCaption:'第一段像鼓掌一样掌心相对，手掌稍分开，只有腕掌侧相互拍打；第二段改用小指侧掌缘互拍。两段各20–30次，整套一次。'});map(d65,{...clap,repairView:'ref-65-pair'},d65.phases[3].alt);
 const d68=get(68),body:ImageView={...v('sheet-v1.png','ref-68-body',0),sideLabel:'整体坐姿　｜　双膝向两侧打开，双脚靠拢'};
 const range={...d68.phases[0],label:'内侧密排点位',sideLabel:'单侧近景　｜　实际双侧同时'};
 set(d68,0,body,'整体坐姿：双膝外展、双脚靠拢，双手扶同侧脚踝附近');
 d68.phases[0].poses=[{...body,label:'整体坐姿'},range];
 d68.phases[0].caption='双膝向两侧打开、双脚靠拢，脚心向上。双手各握同侧脚腕，拇指在小腿内侧，从脚踝附近开始。可切换近景查看点位。';
 Object.assign(d68,{poster:'sheet-v1.png',posterTile:0,posterFlipX:false});
 const d69=get(69),a69='palm-cup-pov-v3.png',side='第一视角 · 单侧近景　｜　实际双掌、双侧同时';
 const calf=(tile:number,release=false):ImageView=>({...v(a69,release?'ref-69-release':tile===2?'ref-69-press-upper':'ref-69-press',tile),sideLabel:side});
 set(d69,0,calf(0),'第一视角，掌心包握小腿内侧近踝处，四指弯曲环抱小腿背侧');
 set(d69,1,calf(0),'第一视角掌心包握小腿内侧按压，四指环抱');
 d69.phases[1].poses=[{...calf(0),label:'掌心按压'},{...calf(3,true),label:'按后松力、同点结束抬掌'}];
 set(d69,2,calf(3,true),'第一视角，手掌离开小腿内侧，掌与腿间有清楚间隙');
 d69.phases[2].poses=[{...calf(3,true),label:'抬掌离开'},{...calf(2),label:'移至上方下一点'}];
 const thigh=(tile:number,release=false):ImageView=>({...v('thigh-cup-pov-v1.png',release?'ref-69-thigh-release':'ref-69-thigh-press',tile),sideLabel:side});
 set(d69,4,thigh(0),'第一视角，掌心包握膝关节上方的大腿内侧，沿内侧逐点按放');
 d69.phases[4].poses=[{...thigh(0),label:'大腿内侧按压'},{...thigh(1,true),label:'同点完成后抬掌'},{...v('sheet-v1.png','ref-69-map',3),label:'膝上至大腿根路径',sideLabel:'完整路径　｜　双侧同时'}];
 d69.phases[0].caption='双膝外展、双脚靠拢且脚心翻开。双掌包握同侧小腿内侧靠近脚踝处，四指弯曲环抱。近景展示一侧接触手型，实际两侧同时。';
 Object.assign(d69,{poster:a69,posterTile:0,posterFlipX:false});
}
