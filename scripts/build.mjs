// softsock OS v0.1 – zero-dependency README and SVG renderer.
// Usage: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function esc(v){return String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function rr(x,y,w,h,fill,r=0,stroke="",sw=1){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${sw}"`:""}/>`;}
function tt(x,y,value,size=17,color="#eae5ff",weight=400,mono=false,extra=""){return `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}" font-family="${mono?"'DejaVu Sans Mono','Consolas',monospace":"'DejaVu Sans','Verdana',sans-serif"}" ${extra}>${esc(value)}</text>`;}
function folder(x,y,colour="#edc58d"){return `<g>${rr(x,y+4,28,19,colour,3)}${rr(x+2,y,12,8,colour,2)}${rr(x+2,y+7,24,2,"#fff0c2",1)}</g>`;}
function windowFrame(x,y,w,h,label,colour="#222039"){
  return `<g filter="url(#shadow)">${rr(x,y,w,h,colour,12,"#967cc9",2)}${rr(x+1,y+1,w-2,39,"#55416f",11)}${rr(x+1,y+26,w-2,15,"#55416f")}${rr(x+15,y+15,10,10,"#f3a8bc",5)}${rr(x+31,y+15,10,10,"#f0d68f",5)}${rr(x+47,y+15,10,10,"#b1e3c6",5)}${tt(x+74,y+27,label,16,"#f4eaff",600)}${tt(x+w-72,y+26,"–  □  ×",17,"#e0d2fa",500,true)}</g>`;
}
function svg(cfg){
 const a=[]; const p=(s)=>a.push(s);
 p(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="720" viewBox="0 0 1200 720" role="img" aria-label="softsock OS: a retro desktop with a file manager, terminal and project navigation">`);
 p(`<defs><linearGradient id="frame" x2="0.8" y2="1"><stop stop-color="#2a2245"/><stop offset="1" stop-color="#171328"/></linearGradient><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#312c62"/><stop offset=".52" stop-color="#72528b"/><stop offset="1" stop-color="#d08f9d"/></linearGradient><linearGradient id="dock" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#4b3c70"/><stop offset="1" stop-color="#2c2648"/></linearGradient><radialGradient id="moon"><stop stop-color="#ffe0d3" stop-opacity=".78"/><stop offset="1" stop-color="#eebdd1" stop-opacity="0"/></radialGradient><filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#07050d" flood-opacity=".60"/></filter><pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 3H4" stroke="#d8b3fa" stroke-opacity=".035"/></pattern><clipPath id="screen"><rect x="14" y="72" width="1172" height="612" rx="8"/></clipPath></defs>`);
 p(rr(0,0,1200,720,"#100e1c",22));p(rr(8,8,1184,704,"url(#frame)",19,"#9a80ca",2));
 p(rr(14,14,1172,56,"#302641",12));p(rr(14,56,1172,15,"#302641"));p(rr(16,73,1168,608,"url(#sky)",7));
 p(`<g clip-path="url(#screen)">`);
 p(`<ellipse cx="980" cy="261" rx="220" ry="178" fill="url(#moon)"/><circle cx="983" cy="250" r="59" fill="#e7bfd0" opacity=".83"/><circle cx="968" cy="237" r="50" fill="#f6d7d9" opacity=".38"/>`);
 for(let i=0;i<94;i++){const x=103+(i*83)%1090,y=92+(i*47)%305,op=(i%5===0?".66":".34");p(rr(x,y,i%13===0?3:2,i%13===0?3:2,`#f9dff8`,0)+`<circle cx="${x}" cy="${y}" r="${i%11===0?2.5:1.1}" fill="#f8e1ff" opacity="${op}"/>`);}
 p(`<path d="M100 458L220 344L350 453L481 357L657 468L770 389L912 469L1050 359L1190 472L1190 684H100Z" fill="#4a3c70" opacity=".82"/>`);
 p(`<path d="M100 520L248 416L368 507L537 402L688 535L822 433L976 523L1112 432L1200 496V685H100Z" fill="#332e5a" opacity=".92"/>`);
 for(let i=0;i<21;i++){const x=107+i*53,h=68+(i*31)%125;p(rr(x,667-h,43,h,i%3===0?"#25233e":"#292541",1));for(let r=0;r<4;r++){for(let c=0;c<3;c++){if((i+r+c)%3!==0)p(rr(x+9+c*11,667-h+13+r*21,4,6,(i+r)%2?"#b27ca7":"#d6a08e",0));}}}
 p(rr(99,631,1087,50,"#17142c"));p(rr(99,628,1087,5,"#574269"));
 p(`</g>`);
 p(rr(14,73,84,608,"#1d1932",6));p(`<path d="M98 75V681" stroke="#9780b6" stroke-opacity=".45"/>`);
 p(rr(32,25,31,31,"#c4a2ee",8));p(tt(39,46,"s",25,"#261b3c",800));p(tt(78,45,cfg.systemName,22,"#f5edff",700));p(tt(229,44,"profile edition  /  v"+cfg.version,14,"#b7a3d6",500,true));p(rr(935,29,78,26,"#323850",13));p(`<circle cx="953" cy="42" r="5" fill="#9bdfb7"/>`);p(tt(965,47,"ready",14,"#c8f3d7",600,true));p(tt(1037,46,"README mode",14,"#d0c0e6",500,true));
 const rail=[["//","home"],[">_","shell"],["[]","files"],["*","info"]];
 rail.forEach(([icon,name],i)=>{const y=126+i*105;p(rr(24,y,65,67,i===0?"#4f3d73":"#28233f",12,i===0?"#a68bd8":"#4e426b"));p(tt(56,y+40,icon,25,i===0?"#e8d7ff":"#ba9ddc",700,true,`text-anchor="middle"`));p(tt(56,y+85,name,13,"#c5b0dd",400,false,`text-anchor="middle"`));});
 // decorative cloud silhouettes
 p(`<path d="M1025 149q24-25 47-10q14-24 40-6q25-5 39 18H1025Z" fill="#d7a8cc" opacity=".24"/>`);
 p(`<path d="M119 216q20-19 40-4q15-22 37-5q23-1 36 16H119Z" fill="#d2b2e2" opacity=".2"/>`);
 // file manager
 p(windowFrame(127,140,362,386,"files  –  /home/softsock","#27203e"));
 p(rr(144,191,328,37,"#18182c",7));p(tt(158,216,"~ / home / softsock /",16,"#b9a8d8",500,true));
 p(rr(144,242,76,263,"#201b35",7));p(tt(157,268,"HOME",14,"#b68fd6",700,true));p(tt(157,304,"/home",13,"#cec3ea",400,true));p(tt(157,336,"/repo",13,"#cec3ea",400,true));p(tt(157,368,"/misc",13,"#cec3ea",400,true));
 p(rr(228,245,242,45,"#514272",6));p(folder(243,253));p(tt(282,274,"projects/",17,"#fbf0ff",600,true));p(tt(447,275,">",17,"#e0d0fe",700,true));
 const entries=[["experiments/",316,true],["about.txt",373,false],["stack.json",430,false],["contact.link",487,false]];
 entries.forEach(([name,y,isFolder],i)=>{if(i%2===0)p(rr(232,y-20,234,43,"#2d2544",5));if(isFolder)p(folder(243,y-14));else {p(rr(243,y-16,24,28,"#c1a6dc",3));p(rr(250,y-8,12,2,"#59486d"));p(rr(250,y-1,14,2,"#59486d"));}p(tt(282,y+4,name,17,"#eadbf4",500,true));});
 // Terminal
 p(windowFrame(514,119,626,417,"shell  –  softsock@github","#171629"));
 p(rr(534,179,586,335,"#111123",6));p(rr(534,180,586,1,"#71618b"));p(tt(553,217,"softsock@os",18,"#9decc5",700,true));p(tt(679,217,":~$ whoami",18,"#e8e0f1",400,true));
 p(tt(553,245,"softsock  /  builder of unusual interfaces",17,"#e3dcf8",400,true));
 p(tt(553,286,"softsock@os",18,"#9decc5",700,true));p(tt(679,286,":~$ ls projects/",18,"#e8e0f1",400,true));
 p(tt(553,315,"pi-ghost-autocomplete/  capri/",16,"#b6adff",500,true));
 p(tt(553,340,"localmem-mcp/          tiny-scenes/",16,"#b6adff",500,true));
 p(tt(553,380,"softsock@os",18,"#9decc5",700,true));p(tt(679,380,":~$ cat now.md",18,"#e8e0f1",400,true));
 p(tt(553,409,"building strange little systems",17,"#e3dcf8",400,true));
 p(tt(553,433,"AI tooling  /  interfaces  /  experiments",16,"#dac6ef",400,true));
 p(tt(553,478,"softsock@os",18,"#9decc5",700,true));p(tt(679,478,":~$ ",18,"#e8e0f1",400,true));p(rr(742,462,10,19,"#c2aae6",0));
 // floating panel right bottom
 p(rr(890,542,255,62,"#211c38",9,"#9c84c2",1));p(tt(911,565,"session / github",15,"#d3b8f1",600,true));p(tt(911,587,"render: static preview",14,"#a8e1c8",400,true));
 // Dock
 p(`<g filter="url(#shadow)">${rr(347,554,488,66,"url(#dock)",17,"#b39ad2",2)}</g>`);
 const dock=[["H",369],["[]",441],[">_",513],["{}",585],["*",657],["#",729]];
 dock.forEach(([sym,x],i)=>{p(rr(x,563,58,48,i===1?"#6f5a95":"#332a51",10,i===1?"#c7a6e8":"#77648f",1));p(tt(x+29,595,sym,i===1?26:22,i===1?"#fff1fc":"#dfc9f6",700,true,`text-anchor="middle"`));});
 // lower status bar
 p(`<g filter="url(#shadow)">${rr(122,638,1010,58,"#221d39",12,"#786399",1.5)}</g>`);
 p(tt(146,666,"SYSTEM  //  "+cfg.version,15,"#e1c9fc",700,true));p(tt(146,685,"github profile / read-only desktop",13,"#aa9abf",400,true));
 p(`<circle cx="643" cy="667" r="5" fill="#91deb5"/>`);p(tt(658,672,"filesystem mounted",15,"#c2e8d8",500,true));
 p(`<circle cx="902" cy="667" r="5" fill="#e5bd81"/>`);p(tt(916,672,"companion: later",15,"#e8d5b7",500,true));
 p(rr(16,73,1168,608,"url(#scan)",8));
 p(`</svg>`);
 return a.join("\n");
}
function readme(cfg){
const list=cfg.projects.map(p=>`| [\`${p.name}/\`](${p.url}) | ${p.description} |`).join("\n");
return `<!-- Generated by scripts/build.mjs. Edit config/desktop.json and rerun the generator. -->
<div align="center">

<img src="./assets/desktop.svg" alt="softsock OS desktop: file manager, terminal, and project folders" width="100%">

<sub>softsock OS · profile edition · v${cfg.version}</sub>

</div>

<p align="center">
  <a href="#abouttxt">about.txt</a> &nbsp;·&nbsp;
  <a href="#projects">projects/</a> &nbsp;·&nbsp;
  <a href="#stackjson">stack.json</a> &nbsp;·&nbsp;
  <a href="#contactlink">contact.link</a>
</p>

---

### about.txt

\`\`\`txt
user: ${cfg.handle}
host: github
mode: building strange little systems

${cfg.description}
\`\`\`

### projects/

<details open>
<summary><b>~/home/softsock/projects</b> · public folders</summary>

| folder | description |
| :-- | :-- |
${list}

</details>

### stack.json

\`\`\`json
{
  "focus": ${JSON.stringify(cfg.focus)},
  "interests": ["AI agents", "automation", "interface design"],
  "environment": "experiments first"
}
\`\`\`

### contact.link

[github.com/${cfg.owner}](https://github.com/${cfg.owner})

<sub>Desktop rendered as a GitHub-safe SVG. Navigation uses real Markdown links because scripts cannot run inside a profile README.</sub>

<!-- END softsock OS -->
`;
}
const cfg=JSON.parse(readFileSync(resolve(root,"config/desktop.json"),"utf8"));
mkdirSync(resolve(root,"assets"),{recursive:true});
writeFileSync(resolve(root,"assets/desktop.svg"),svg(cfg)+"\n","utf8");
writeFileSync(resolve(root,"README.md"),readme(cfg),"utf8");
console.log("Built softsock OS v"+cfg.version);
