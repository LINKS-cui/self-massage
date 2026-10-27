/** Draw uniformly from the collection, excluding the card already on screen. */
export function drawCard<T extends {id:string}>(cards:readonly T[], currentId?:string, random:()=>number=Math.random):T|null {
  if(cards.length===0)return null;
  const candidates=cards.filter(card=>card.id!==currentId);
  if(candidates.length===0)return cards[0];
  return candidates[Math.floor(random()*candidates.length)];
}
