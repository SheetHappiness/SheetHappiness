import test from "node:test";
import assert from "node:assert/strict";
import {OPS,transition,stateName,renderStatePage,renderProfilePanel,generateHyperFiles,renderScreenSvg} from "../scripts/hypercomputer.mjs";
const valid = new Set(Array.from({length:4},(_,a)=>Array.from({length:4},(_,b)=>stateName(a,b))).flat());
test("all 16 states are generated with one Markdown and one SVG each",()=>{
 const files=generateHyperFiles();
 assert.equal(files.length,33);
 const paths=new Set(files.map(f=>f.path));
 assert.equal(paths.size,33);
 for(const name of valid){
  assert(paths.has("hypercomputer/states/"+name+".md"));
  assert(paths.has("assets/hypercomputer/"+name+".svg"));
 }
});
test("every operation preserves 2-bit register bounds",()=>{
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(const op of OPS){
  const [na,nb]=transition(a,b,op.id);
  assert(valid.has(stateName(na,nb)));
 }
});
test("transition semantics including wraparound",()=>{
 assert.deepEqual(transition(3,2,"inc"),[0,2]);
 assert.deepEqual(transition(1,0,"dec"),[1,3]);
 assert.deepEqual(transition(3,3,"add"),[2,3]);
 assert.deepEqual(transition(1,2,"swap"),[2,1]);
 assert.deepEqual(transition(2,3,"reset"),[0,0]);
 assert.throws(()=>transition(4,0,"add"));
 assert.throws(()=>transition(0,0,"nope"));
});
test("all command links target existing states",()=>{
 for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const md=renderStatePage(a,b);
  const urls=[...md.matchAll(/\]\((a\d-b\d\.md)\)/g)].map(match=>match[1]);
  assert.equal(urls.length,6); // 5 commands plus RESET navigation
  for(const url of urls) assert(valid.has(url.slice(0,-3)));
 }
});
test("boot panel contains 5 valid links and stable SVG",()=>{
 const panel=renderProfilePanel();
 assert(panel.includes('assets/hypercomputer/a1-b2.svg'));
 for(const op of OPS){
  const [a,b]=transition(1,2,op.id);
  assert(panel.includes("hypercomputer/states/"+stateName(a,b)+".md"));
 }
 const svg=renderScreenSvg(1,2);
 assert(svg.startsWith("<svg"));
 assert(svg.includes("STATE A1-B2"));
 assert(svg.includes("</svg>"));
});
