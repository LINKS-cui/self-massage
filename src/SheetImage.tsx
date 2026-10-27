/** Display one quadrant of an original generated sheet without altering its pixels. */
export function SheetImage({src,alt,tile,cropTop,flipX=false,onError,loading}:{src:string;alt:string;tile?:number;cropTop?:number;flipX?:boolean;onError?:()=>void;loading?:'lazy'|'eager'}){
 const mirror=flipX?{transform:'scaleX(-1)'}:undefined;
 if(tile===undefined)return <img src={src} alt={alt} data-flip-x={flipX} style={mirror} onError={onError} loading={loading} draggable={false}/>;
 return <div className="sheet-crop" data-tile={tile} data-flip-x={flipX} style={mirror}><img src={src} alt={alt} onError={onError} loading={loading} draggable={false} style={{left:`-${(tile%2)*100}%`,top:`-${(cropTop??Math.floor(tile/2)/2)*200}%`}}/></div>;
}
