import type {ImageDemoDefinition,ImageView} from './image-demos';
// 2026-10-26: user photographs and explicit visual corrections. Confirmed catalog stays unchanged.
export function applyReferenceRepairs(demos:Record<string,ImageDemoDefinition>){
 const get=(n:number)=>{const id=`SM-${String(n).padStart(3,'0')}`;return demos[id]=structuredClone(demos[id]);};
 const left='被操作：左手　｜　操作：右手　｜　左右按本人身体区分';
 const right='被操作：右手　｜　操作：左手　｜　左右按本人身体区分';
 const view=(file:string,repairView:string,flipX=false,tile?:number):ImageView=>({file,tile,cropTop:undefined,repairView,flipX,overlayFlipX:flipX,sideLabel:flipX?right:left});
 const map=(d:ImageDemoDefinition,file:string,repairView:string,tile?:number,flip=false)=>Object.assign(d,{mapFile:file,mapTile:tile,mapRepairView:repairView,mapFlipX:flip,mapOverlayFlipX:flip});
 const d60=get(60);
 const fist=view('fist-photo-v4.png','ref-60-fist'),grip=view('grip-photo-v4.png','ref-60-grip');
 Object.assign(d60.phases[1],fist,{poses:undefined,caption:'按实拍姿势，右拳掌根面顶住左手四指中间关节，使左腕背伸，保持 10 秒。左前臂在胸前水平固定；随后松开，手腕回正。',alt:'右前臂从画面左侧横向伸来，右拳掌根面顶住左手四指中间关节，左前臂水平固定'});
 Object.assign(d60.phases[3],grip,{poses:undefined,alt:'右手从上方握住左手四指，右拇指在手背侧，左腕朝与拳助相同方向背伸'});
 for(const i of [0,2,4])Object.assign(d60.phases[i],view('atlas.png',i===0?'ref-60-ready':'ref-60-release',false,i===0?0:3),{poses:undefined});
 Object.assign(d60.phases[5],view(fist.file,'ref-60-fist',true),{poses:[{...view(fist.file,'ref-60-fist',true),label:'换手 · 拳助'},{...view(grip.file,'ref-60-grip',true),label:'换手 · 握指'},{...view('atlas.png','ref-60-release',true,3),label:'松开回正'}]});
 Object.assign(d60,{poster:fist.file,posterTile:undefined,posterFlipX:false,mapTitle:'拳助、握指：按两张实拍对照',mapCaption:'先用拳掌根面顶四指中间关节，保持 10 秒，松开回正；再握住四指同向背伸，保持 10 秒，松开回正。两阶段做完再换手。'});map(d60,fist.file,'ref-60-pair');
 const d61=get(61);for(const i of [2,4])Object.assign(d61.phases[i],view('spread-photo-v2.png','ref-61-spread'),{sideLabel:undefined,poses:undefined,alt:'双手掌心朝向本人，拇指与小指充分外展，所有指缝明显张大'});
 d61.phases[2].caption='双手同时充分张开十指，让每个指缝尽可能大，再同步握拳。完整张开再握拳合为 1 次，共 20 次。';
 map(d61,'spread-photo-v2.png','ref-61-spread');Object.assign(d61,{mapTitle:'十指充分外展，指缝尽可能大',mapCaption:'张手时，拇指和小指向两侧充分展开，其余手指也拉开间距。先完成两种交叉紧握，再做双手张开、握拳，共 20 次。'});
 const d62=get(62);for(let i=0;i<5;i++){const up=i===1,sw=i===4;Object.assign(d62.phases[i],view(up?'up-pov-v3.png':'flat-pov-v3.png',up?'ref-62-up':'ref-62-flat',sw),{poses:undefined,alt:`第一视角，${sw?'右':'左'}掌朝上，手腕${up?'向天空弯起':'与前臂放平'}，对侧拇指在腕掌侧同处接触`});}
 d62.phases[4].poses=[{...view('flat-pov-v3.png','ref-62-flat',true),label:'右腕放平'},{...view('up-pov-v3.png','ref-62-up',true),label:'右腕向上弯起'}];
 Object.assign(d62,{poster:'flat-pov-v3.png',posterTile:undefined,posterFlipX:false,mapTitle:'本人视角：放平 → 向天空弯起',mapCaption:'左前臂保持不动，四指伸直。右拇指始终在左腕掌侧同处接触，配合弯起和放平改变施力方向，不沿皮肤滑动。一弯一放计 1 次，每侧 20 次。'});map(d62,'flat-pov-v3.png','ref-62-pair');
 const d63=get(63);for(const i of [0,2])Object.assign(d63.phases[i],view('sheet-v2.png','ref-63-contact',true,0),{sideLabel:left,poses:undefined});
 Object.assign(d63.phases[1],view('sheet-v2.png','ref-63-map',true,3),{sideLabel:left,poses:undefined,alt:'左手掌心向上，腕关节处与朝前臂约一指宽处各一行点位，覆盖腕掌侧横向区域'});
 Object.assign(d63.phases[3],view('release-v1.png','ref-63-release',true),{sideLabel:left,poses:undefined});
 Object.assign(d63.phases[4],view('sheet-v2.png','ref-63-contact',false,0),{sideLabel:right,poses:undefined});
 Object.assign(d63,{posterFlipX:true,mapTitle:'两行覆盖：腕关节＋向前臂约一指宽',mapCaption:'第一行在腕关节掌心侧，第二行在朝前臂方向约一指宽处，两行横向覆盖腕掌侧。点位密排用于看清覆盖范围，不限定点数或次序；每点转压 3–5 圈，抬起拇指后再换点。'});map(d63,'sheet-v2.png','ref-63-map',3,true);
 const d64=get(64);for(let i=0;i<4;i++){const sw=i===3;Object.assign(d64.phases[i],view('sheet-v2.png',i===0||i===2?'ref-64-release':'ref-64-contact',!sw,i===0||i===2?1:0),{sideLabel:sw?right:left,poses:undefined});}
 Object.assign(d64,{posterFlipX:true,mapTitle:'腕关节掌心侧：固定在这里拍打',mapCaption:'绿色横带标出腕关节掌心侧，橙色表示双指一起拍打的位置。食指与中指并拢，用指腹固定同处拍 20–30 次，不沿区域换点。左右各一遍。'});map(d64,'sheet-v2.png','ref-64-map',3,false);
 const d65=get(65);Object.assign(d65.phases[0],view('volar-palms-v3.png','ref-65-volar'),{sideLabel:undefined,poses:undefined,alt:'双腕掌心侧在中间接触，手掌向外展开，上方清楚可见双手掌纹'});Object.assign(d65,{poster:'volar-palms-v3.png',posterTile:undefined,posterFlipX:false,mapTitle:'先腕掌侧，再小指侧掌缘',mapCaption:'第一幅展示腕关节掌心侧相互接触，上方可见掌心；第二幅展示小指侧手掌边缘相互接触。两段分别互拍 20–30 次。'});map(d65,'volar-palms-v3.png','ref-65-pair');
 const d67=get(67);Object.assign(d67.phases[3],{repairView:'ref-67-map',overlayFlipX:false});map(d67,'sheet-v1.png','ref-67-map',3);Object.assign(d67,{mapTitle:'整个脚掌心侧：完整范围图',mapCaption:'绿色区域覆盖脚掌心侧，从趾腹、前脚掌、足弓到脚跟；橙色密排点示意区域覆盖。双拇指同时逐点转按，每点 3–5 圈，抬指再换点，覆盖一遍。点数、旋向和顺序不作固定规定。'});
 const d68=get(68);for(let i=0;i<5;i++){const contact=i===1;Object.assign(d68.phases[i],{file:contact?'contact-pov-v2.png':'map-pov-v2.png',tile:undefined,flipX:false,overlayFlipX:false,repairView:contact?'ref-68-contact':i===0?'ref-68-start':i===3?'ref-68-end':'ref-68-map',sideLabel:'单侧近景看清位置　｜　实际双手、双侧同时操作',poses:undefined,alt:contact?'本人视角小腿内侧，拇指指腹按住小腿，其余四指环抱支撑':'小腿内侧完整近景，密排点位从脚踝附近沿内侧中线到膝盖下方'});}
 d68.phases[0].caption='两膝向两侧弯曲、双脚靠拢，脚心向上。双手各扶同侧小腿，从脚踝附近开始；图示一侧内侧中线，两侧同时操作。';
 d68.phases[1].caption='单侧特写展示拇指指腹接触小腿内侧、其余四指环抱支撑。双侧同时，每个点持续保持 3–5 秒，松开后再向上换点。';
 d68.phases[2].poses=[{...view('map-pov-v2.png','ref-68-map'),sideLabel:'单侧近景　｜　实际双侧同时',label:'密排点位与方向'},{...view('contact-pov-v2.png','ref-68-contact'),sideLabel:'单侧近景　｜　实际双侧同时',label:'环抱小腿的接触手型'}];
 Object.assign(d68,{poster:'contact-pov-v2.png',posterTile:undefined,posterFlipX:false,mapTitle:'小腿内侧中线：踝附近逐点到膝下',mapCaption:'密排圆点沿小腿内侧中线标出逐点覆盖路径；从脚踝附近开始，到膝盖下方为止。每点保持 3–5 秒，松开后向上换点。两侧同时，一遍结束松手回踝，总共 2–3 遍。图示点数不规定实际点数。'});map(d68,'map-pov-v2.png','ref-68-map');
 const d69=get(69);for(const i of [3,5])Object.assign(d69.phases[i],{repairView:'ref-69-map',overlayFlipX:false});map(d69,'sheet-v1.png','ref-69-map',3);Object.assign(d69,{mapTitle:'小腿内侧 → 跳过膝关节 → 大腿内侧',mapCaption:'圆点密排标出小腿内侧中线和大腿内侧中线的覆盖路径。由踝附近向上，到膝关节处抬掌跳过，再沿大腿内侧到大腿根部。每点按 3–5 下，每下松力，做完该点再抬掌换点；双侧同时一遍。点数不作固定规定。'});
 const d70=get(70);Object.assign(d70.phases[3],{repairView:'ref-70-map',overlayFlipX:false});map(d70,'medial-map-v3.png','ref-70-map');Object.assign(d70,{mapTitle:'双脚内踝：整片区域密排点位',mapCaption:'两幅近景分别展示脚踝内侧，绿色范围内密排转按点，覆盖整片内踝区域。每点转按 3–5 圈，抬起拇指后换点，双侧同时覆盖一遍；点数、次序与旋向不作固定规定。'});
}
