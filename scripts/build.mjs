// softsock OS v0.4.1 – zero-dependency README and SVG renderer.
// Usage: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { renderProfilePanel, generateHyperFiles } from "./hypercomputer.mjs";
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

// Switchable README display: four OS scenes and compact previews.
// The source remains ordinary Markdown and SVG, with no runtime JavaScript.
function screenSvg(cfg,id,compact=false){
 const w=compact?700:700,h=compact?224:450;
 const a=[];const p=s=>a.push(s);
 const labels={home:"desktop",files:"files",shell:"terminal",about:"system"};
 const titles={home:"HOME / DESKTOP",files:"FILES / EXPLORER",shell:"SHELL / TERMINAL",about:"SYSTEM / ABOUT"};
 const accents={home:"#c5a7f5",files:"#efc28c",shell:"#a4d9c4",about:"#a7bbf6"};
 const accent=accents[id];
 const fillbg=`<defs><linearGradient id="sky" x2="0.8" y2="1"><stop stop-color="#433563"/><stop offset=".53" stop-color="#6b568b"/><stop offset="1" stop-color="#392e5a"/></linearGradient><linearGradient id="glass" x2=".6" y2="1"><stop stop-color="#292441"/><stop offset="1" stop-color="#17182e"/></linearGradient><radialGradient id="glow"><stop stop-color="#eab7d6" stop-opacity=".55"/><stop offset="1" stop-color="#eab7d6" stop-opacity="0"/></radialGradient></defs>`;
 p(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="softsock OS ${labels[id]} ${compact?"preview":"screen"}">`);
 p(fillbg);p(rr(0,0,w,h,"#151425",15,"#a491d5"));p(rr(6,6,w-12,h-12,"#252039",11));
 p(rr(9,9,w-18,37,"#322944",10));p(rr(9,35,w-18,11,"#322944"));
 p(rr(20,18,17,17,accent,5));p(tt(26,32,"s",14,"#211c35",800));
 p(tt(48,33,"softsock OS",16,"#f5eaff",700));p(tt(205,32,"/",17,"#9184b4"));
 p(tt(225,33,labels[id],14,"#dcc5f7",500));p(rr(596,17,81,21,"#354158",11));p(`<circle cx="609" cy="28" r="4" fill="#9de1bb"/>`);p(tt(621,32,"ready",12,"#b6ebd5"));
 p(rr(9,48,w-18,h-57,"url(#sky)",7));
 // atmospheric skyline and star pixels
 p(`<ellipse cx="563" cy="${compact?131:240}" rx="147" ry="121" fill="url(#glow)"/>`);
 p(`<circle cx="588" cy="${compact?117:214}" r="${compact?27:53}" fill="#dec2df" opacity=".30"/>`);
 for(let i=0;i<40;i++){const x=31+(i*73)%639,y=52+(i*29)%(compact?150:284);p(rr(x,y,i%7===0?3:2,2,"#eddaf5",0).replace('fill="#eddaf5"','fill="#eddaf5" opacity=".40"'));}
 p(`<path d="M14 ${h-79}L111 ${h-170}L223 ${h-88}L315 ${h-145}L414 ${h-67}L521 ${h-135}L691 ${h-85}V${h-9}H14Z" fill="#322d53" opacity=".80"/>`);
 p(rr(9,h-49,w-18,41,"#1d1b33")); p(rr(20,h-46,660,3,"#69567c",0));
 if(compact){
   p(rr(22,63,658,115,"#1d1a30",12,"#9178b7"));
   p(rr(22,63,658,31,"#4b3a66",11));p(rr(22,85,658,10,"#4b3a66"));
   for(let i=0;i<3;i++)p(`<circle cx="${40+i*18}" cy="78" r="4.7" fill="${["#eca8b6","#f0ca8f","#a3deba"][i]}"/>`);
   p(rr(43,110,70,48,accent,10));p(tt(78,141,({home:"⌂",files:"[]",shell:">_",about:"*"}[id]),id==="shell"?22:24,"#242139",700,'text-anchor="middle"'));
   p(tt(137,126,titles[id],24,"#efe5ff",700));
   p(tt(137,154,({home:"four screens / one little system",files:"folders, projects and experiments",shell:"commands without the command line",about:"about, preferences and runtime"}[id]),16,"#bcb1db"));
   p(rr(22,h-39,658,25,"#29233f",7));p(tt(42,h-22,"CLICK TO OPEN  /  "+id.toUpperCase(),13,accent,700));
   p(`</svg>`);return a.join("\n")+"\n";
 }
 p(rr(19,60,62,327,"#201c34",8));const nav=[["H","home"],["[]","files"],[">_","shell"],["*","about"]];
 nav.forEach(([icon,k],i)=>{const y=76+i*75;p(rr(28,y,43,48,k===id?"#625080":"#332947",8));p(tt(49,y+30,icon,19,k===id?"#ffefff":"#b6a1d8",700,'text-anchor="middle"'));});
 // active app window
 p(rr(100,67,572,316,"#171528",12,"#ad90d6"));p(rr(101,68,570,35,"#53406f",11));p(rr(102,94,568,12,"#53406f"));
 for(let i=0;i<3;i++)p(`<circle cx="${118+i*17}" cy="86" r="4.5" fill="${["#eda2b3","#edd19c","#a5dfbd"][i]}"/>`);
 p(tt(180,92,(id==="home"?"desktop / overview":id==="files"?"file manager / home":id==="shell"?"terminal / softsock@github":"system / preferences"),15,"#f3e8ff",600));p(tt(619,91,"− □ ×",15,"#ebdcf6"));
 if(id==="home"){
   p(rr(118,123,203,239,"#242039",8,"#635078"));p(tt(134,151,"/home/softsock",16,accent,600));
   for(let i=0;i<4;i++){const y=182+i*42;p(rr(131,y-18,178,35,i===0?"#4c3d6d":"#2d2644",6));p(tt(142,y+5,["[] projects/","<> experiments/","T about.txt","* system/"][i],15,"#f0e4fb",500));}
   p(rr(336,123,319,239,"#111324",7));p(tt(351,156,"softsock@github:~$ whoami",14,"#a8e5c7",600));p(tt(351,184,"builder of small systems",15,"#eee6fa"));p(tt(351,223,"softsock@github:~$ ls",14,"#a8e5c7",600));p(tt(351,250,"projects   experiments",14,"#c9b8fa"));p(tt(351,275,"about.txt  system/",14,"#c9b8fa"));p(tt(351,330,"softsock@github:~$ _",14,"#a8e5c7",600));
 }
 if(id==="files"){
   p(rr(118,119,522,31,"#242039",7));p(tt(133,140,"~/home/softsock/projects/",15,"#d3bce9"));
   p(rr(118,161,117,204,"#242039",7));p(tt(131,188,"PLACES",13,accent,700));["home","projects","notes","config"].forEach((t,i)=>{p(tt(129,220+i*38,(i===1?"> ":"  ")+t,13,i===1?"#f4e8ff":"#bcb0d6",i===1?700:400));});
   const items=[["pi-ghost-autocomplete","autocomplete plugin"],["capri","companion tooling"],["localmem-mcp","local memory"],["tiny-scenes","small experiments"]];
   items.forEach(([name,desc],i)=>{const x=246+(i%2)*198,y=162+Math.floor(i/2)*96;p(rr(x,y,185,85,i===0?"#42335e":"#2b2644",8,i===0?"#8267ae":"#54476f"));p(rr(x+14,y+13,29,22,"#dfb782",4));p(rr(x+15,y+10,12,8,"#dfb782",2));p(tt(x+10,y+52,name.length>18?name.slice(0,18)+"…":name,12,"#ede5fa",600));p(tt(x+10,y+70,desc,11,"#aa9dbc"));});
 }
 if(id==="shell"){
   p(rr(116,117,540,246,"#101222",8));const lines=[
     ["$ whoami", "#97e0b7"],["softsock  /  github", "#f2e9ff"],
     ["$ ls ~/projects", "#97e0b7"],["pi-ghost-autocomplete/  capri/", "#c0b8ff"],
     ["localmem-mcp/  tiny-scenes/", "#c0b8ff"],
     ["$ cat now.md", "#97e0b7"],["AI tooling, interfaces, experiments", "#e9e1f5"],
     ["$ echo $MODE", "#97e0b7"],["building strange little systems", "#f2e9ff"]
   ];lines.forEach(([text,color],i)=>p(tt(135,145+i*22,text,15,color,i%2===0?600:400)));
 }
 if(id==="about"){
   p(rr(118,120,225,245,"#25213d",8));p(rr(139,144,75,75,"#bfa6ec",16));p(tt(162,193,"s",56,"#241d3c",800));p(tt(140,250,"softsock",22,"#f3e8ff",700));p(tt(140,278,"profile edition",14,"#c8bbdb"));p(tt(140,314,"v"+cfg.version,14,"#c8bbdb"));p(tt(140,338,"read-only runtime",12,"#e5bd83"));
   p(rr(359,120,296,245,"#201d35",8));p(tt(376,149,"ABOUT THIS SYSTEM",15,accent,700));
   const rows=[["focus","AI tooling"],["ui","experimental"],["platform","GitHub README"],["renderer","SVG + Markdown"],["interaction","HTML details"],["status","still evolving"]];
   rows.forEach(([key,val],i)=>{const y=181+i*30;p(tt(376,y,key,13,"#a79bbf"));p(tt(475,y,val,13,i===5?"#a5e0bd":"#f0e6ff",500));});
 }
 // dock
 p(rr(200,390,315,44,"#2d2547",12,"#8b78af"));["H","[]",">_","*"].forEach((name,i)=>{const x=217+i*77;p(rr(x,397,57,30,nav[i][1]===id?"#755b97":"#42365d",7));p(tt(x+28,419,name,19,"#e9d7ff",700,'text-anchor="middle"'));});
 p(tt(548,418,"OS v"+cfg.version,14,"#d2c2e9",500));p("</svg>");
 return a.join("\n")+"\n";
}

function renderReadme(cfg){
  const screens=[
    {id:"home",label:"Desktop",number:"01",tag:"HOME",desc:"workspace & overview",jump:""},
    {id:"files",label:"Files",number:"02",tag:"EXPLORER",desc:"projects & folders",jump:"<p align=\"right\"><a href=\"#public-projects\">Browse public projects ↓</a></p>"},
    {id:"shell",label:"Shell",number:"03",tag:"TERMINAL",desc:"read-only commands",jump:"<p align=\"right\"><a href=\"#profile-files\">Read text files ↓</a></p>"},
    {id:"about",label:"System",number:"04",tag:"ABOUT",desc:"about & configuration",jump:"<p align=\"right\"><a href=\"#profile-files\">Open profile files ↓</a></p>"}
  ];
  const panels=screens.map((screen,i)=>`<details name="softsock-os"${i===0?" open":""}>
<summary><kbd>${({home:"⌂",files:"▤",shell:"&gt;_",about:"⚙"})[screen.id]}</kbd> <strong>${screen.label}</strong> &nbsp; <code>${screen.number} / ${screen.tag}</code> &nbsp; <sub>${({home:"~/workspace",files:"~/projects",shell:"softsock@github:~",about:"/etc/softsock"})[screen.id]}</sub></summary>

<img src="./assets/screens/${screen.id}.svg" width="100%" alt="${screen.label}: expanded softsock OS desktop screen">

${screen.jump}
</details>`).join("\n\n");
  const rows=cfg.projects.map(p=>`| [\`${p.name}/\`](${p.url}) | ${p.description} |`).join("\n");
  return `<!-- Generated by scripts/build.mjs. Edit the renderer and config/desktop.json. -->
<div align="center">

<h2>softsock OS <sub>v${cfg.version}</sub></h2>

<sub>profile edition · choose a window to explore</sub>

</div>

${panels}

<p align="center"><sub>One screen at a time · select another window to switch · GitHub-native HTML</sub></p>

---

### public-projects

<details>
<summary><b>~/home/softsock/projects/</b> · public directories</summary>

| folder | description |
| :-- | :-- |
${rows}

</details>

### profile-files

<details>
<summary><b>about.txt</b></summary>

\`\`\`txt
user: ${cfg.handle}
host: github
mode: ${cfg.tagline}
${cfg.description}
\`\`\`

</details>

<details>
<summary><b>stack.json</b></summary>

\`\`\`json
{
  "focus": ${JSON.stringify(cfg.focus)},
  "interests": ["AI agents", "automation", "interface design"],
  "runtime": "GitHub-flavored Markdown"
}
\`\`\`

</details>

<details>
<summary><b>contact.link</b></summary>

[github.com/${cfg.owner}](https://github.com/${cfg.owner})

</details>
`;
}
function launcherIcon(cfg,id) {
  const types={
    home:{label:"Desktop",tag:"01 / HOME",path:"~/workspace",glyph:"H",accent:"#C9ADF4",soft:"#E8D9FF",windows:["file manager","shell / active","workspace"]},
    files:{label:"Files",tag:"02 / EXPLORER",path:"~/projects",glyph:"[]",accent:"#F0C48D",soft:"#FFEBCA",windows:["projects/","experiments/","about.txt"]},
    shell:{label:"Shell",tag:"03 / TERMINAL",path:"softsock@github:~",glyph:"&gt;_",accent:"#A5E1C7",soft:"#D3F5E4",windows:["$ whoami","$ ls ~/projects","$ _"]},
    about:{label:"System",tag:"04 / ABOUT",path:"/etc/softsock",glyph:"*",accent:"#B6C3FA",soft:"#E1E6FF",windows:["version / "+cfg.version,"profile / ready","read-only mode"]}
  };
  if(!Object.hasOwn(types,id)) throw Error("Unknown OS screen: "+id);
  const a=types[id];
  const esc=x=>String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  // No scripts, remote assets, stylesheets, or SVG links: works as a GitHub-hosted image.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="114" viewBox="0 0 900 114" role="img" aria-label="Open ${a.label} in softsock OS">
<defs>
  <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
    <stop stop-color="#3D3056"/><stop offset=".55" stop-color="#28213D"/><stop offset="1" stop-color="#1A192E"/>
  </linearGradient>
  <linearGradient id="app" x1="0" y1="0" x2="1" y2="1">
    <stop stop-color="${a.soft}"/><stop offset="1" stop-color="${a.accent}"/>
  </linearGradient>
</defs>
<rect x="2" y="2" width="896" height="110" rx="17" fill="url(#panel)" stroke="#8570A8" stroke-width="2"/>
<rect x="16" y="18" width="80" height="78" rx="15" fill="#151525" stroke="#74618F" stroke-width="1.5"/>
<rect x="26" y="27" width="60" height="60" rx="12" fill="url(#app)"/>
<text x="56" y="66" text-anchor="middle" font-family="DejaVu Sans Mono,monospace" font-size="${id==="files"?28:31}" font-weight="700" fill="#242139">${a.glyph}</text>
<text x="118" y="35" font-family="DejaVu Sans Mono,monospace" font-size="14" font-weight="700" letter-spacing="1.4" fill="${a.accent}">${a.tag}</text>
<text x="118" y="69" font-family="DejaVu Sans,Verdana,sans-serif" font-size="31" font-weight="700" fill="#F3EAFB">${a.label}</text>
<text x="121" y="91" font-family="DejaVu Sans Mono,monospace" font-size="14" fill="#B9ACD3">${esc(a.path)}</text>
<rect x="510" y="19" width="319" height="76" rx="10" fill="#171729" stroke="#514363" stroke-width="1"/>
<rect x="511" y="20" width="317" height="20" rx="9" fill="#4D3A68"/>
<rect x="511" y="32" width="317" height="9" fill="#4D3A68"/>
<circle cx="526" cy="29" r="3" fill="#EAA4BA"/><circle cx="538" cy="29" r="3" fill="#F1D39B"/><circle cx="550" cy="29" r="3" fill="#A1DABA"/>
<text x="568" y="33" font-family="DejaVu Sans Mono,monospace" font-size="11" fill="#EDDEF8">softsock/${id}</text>
<text x="528" y="55" font-family="DejaVu Sans Mono,monospace" font-size="12" fill="${a.soft}">${esc(a.windows[0])}</text>
<text x="528" y="70" font-family="DejaVu Sans Mono,monospace" font-size="12" fill="#D2C2E4">${esc(a.windows[1])}</text>
<text x="528" y="85" font-family="DejaVu Sans Mono,monospace" font-size="12" fill="#AFA2C6">${esc(a.windows[2])}</text>
<circle cx="865" cy="56" r="21" fill="#4C3B67" stroke="#8C75B0" stroke-width="1"/>
<path d="M859 46 L870 56 L859 66" fill="none" stroke="${a.accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
}

const cfg=JSON.parse(readFileSync(resolve(root,"config/desktop.json"),"utf8"));
mkdirSync(resolve(root,"assets"),{recursive:true});
writeFileSync(resolve(root,"assets/desktop.svg"),svg(cfg)+"\n","utf8");
mkdirSync(resolve(root,"assets/launchers"),{recursive:true});
for (const id of ["home","files","shell","about"]) {
  writeFileSync(resolve(root,`assets/launchers/${id}.svg`),launcherIcon(cfg,id),"utf8");
}
mkdirSync(resolve(root,"assets/screens"),{recursive:true});
for (const id of ["home","files","shell","about"]) {
  writeFileSync(resolve(root,`assets/screens/${id}.svg`),screenSvg(cfg,id,false),"utf8");
  writeFileSync(resolve(root,`assets/screens/${id}-card.svg`),screenSvg(cfg,id,true),"utf8");
}
const osReadme = renderReadme(cfg);
const target = "\n---\n\n### public-projects";
if (!osReadme.includes(target)) throw new Error("Profile insertion anchor missing");
const generatedReadme = osReadme.replace(target,"\n---\n\n"+renderProfilePanel()+target);
writeFileSync(resolve(root,"README.md"),generatedReadme,"utf8");
for (const file of generateHyperFiles()) {
  mkdirSync(dirname(resolve(root,file.path)),{recursive:true});
  writeFileSync(resolve(root,file.path),file.content,"utf8");
}
console.log("Built softsock OS v"+cfg.version);
