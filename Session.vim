let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Projects/nextjs/vidapp-next
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +1 ~/Projects/nextjs/vidapp-next
badd +2034 term://~/Projects/nextjs/vidapp-next//52876:/bin/zsh
badd +28 src/app/_components/nav/guide/components/GuideBar.tsx
badd +27 src/app/_components/nav/guide/components/GuideSection.tsx
badd +12 src/app/_components/nav/guide/components/GuideEntry.tsx
badd +65 src/app/_components/nav/navbar/components/SearchBar.tsx
badd +7 node_modules/react-transition-progress/dist/es/next.d.mts
badd +9 term://~/Projects/nextjs/vidapp-next//53380:/bin/zsh
badd +19 src/middleware.ts
badd +64 src/app/_libs/utils/supabase/middleware.ts
badd +2 src/app/_libs/api/queries/index.ts
badd +1 src/app/(server)/api/posts/route.ts
badd +7 src/app/(server)/api/explore/route.ts
badd +10 node_modules/@supabase/ssr/dist/index.d.ts
badd +37 src/app/(server)/api/feed/route.ts
badd +41 node_modules/next/dist/server/web/spec-extension/response.d.ts
badd +1 environment.d.ts
badd +4 global.d.ts
badd +21 tsconfig.json
badd +0 src/app/_components/auth/helpers/wrappers/index.ts
argglobal
%argdel
$argadd ~/Projects/nextjs/vidapp-next
edit src/app/_components/auth/helpers/wrappers/index.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 35 + 36) / 72)
exe 'vert 1resize ' . ((&columns * 105 + 158) / 316)
exe '2resize ' . ((&lines * 34 + 36) / 72)
exe 'vert 2resize ' . ((&columns * 105 + 158) / 316)
exe '3resize ' . ((&lines * 34 + 36) / 72)
exe 'vert 3resize ' . ((&columns * 104 + 158) / 316)
exe '4resize ' . ((&lines * 35 + 36) / 72)
exe 'vert 4resize ' . ((&columns * 104 + 158) / 316)
exe 'vert 5resize ' . ((&columns * 105 + 158) / 316)
argglobal
balt global.d.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 6 - ((5 * winheight(0) + 17) / 35)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 6
normal! 010|
lcd ~/Projects/nextjs/vidapp-next
wincmd w
argglobal
if bufexists(fnamemodify("term://~/Projects/nextjs/vidapp-next//52876:/bin/zsh", ":p")) | buffer term://~/Projects/nextjs/vidapp-next//52876:/bin/zsh | else | edit term://~/Projects/nextjs/vidapp-next//52876:/bin/zsh | endif
if &buftype ==# 'terminal'
  silent file term://~/Projects/nextjs/vidapp-next//52876:/bin/zsh
endif
balt ~/Projects/nextjs/vidapp-next/tsconfig.json
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 2572 - ((10 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 2572
normal! 019|
lcd ~/Projects/nextjs/vidapp-next
wincmd w
argglobal
if bufexists(fnamemodify("~/Projects/nextjs/vidapp-next/src/app/(server)/api/explore/route.ts", ":p")) | buffer ~/Projects/nextjs/vidapp-next/src/app/(server)/api/explore/route.ts | else | edit ~/Projects/nextjs/vidapp-next/src/app/(server)/api/explore/route.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Projects/nextjs/vidapp-next/src/app/(server)/api/explore/route.ts
endif
balt ~/Projects/nextjs/vidapp-next/src/middleware.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 11 - ((10 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 11
normal! 014|
lcd ~/Projects/nextjs/vidapp-next
wincmd w
argglobal
if bufexists(fnamemodify("~/Projects/nextjs/vidapp-next/tsconfig.json", ":p")) | buffer ~/Projects/nextjs/vidapp-next/tsconfig.json | else | edit ~/Projects/nextjs/vidapp-next/tsconfig.json | endif
if &buftype ==# 'terminal'
  silent file ~/Projects/nextjs/vidapp-next/tsconfig.json
endif
balt ~/Projects/nextjs/vidapp-next/src/app/(server)/api/explore/route.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 15 - ((14 * winheight(0) + 17) / 35)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 15
normal! 014|
lcd ~/Projects/nextjs/vidapp-next
wincmd w
argglobal
if bufexists(fnamemodify("~/Projects/nextjs/vidapp-next/src/app/_libs/utils/supabase/middleware.ts", ":p")) | buffer ~/Projects/nextjs/vidapp-next/src/app/_libs/utils/supabase/middleware.ts | else | edit ~/Projects/nextjs/vidapp-next/src/app/_libs/utils/supabase/middleware.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Projects/nextjs/vidapp-next/src/app/_libs/utils/supabase/middleware.ts
endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 65 - ((62 * winheight(0) + 35) / 70)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 65
normal! 05|
lcd ~/Projects/nextjs/vidapp-next
wincmd w
3wincmd w
exe '1resize ' . ((&lines * 35 + 36) / 72)
exe 'vert 1resize ' . ((&columns * 105 + 158) / 316)
exe '2resize ' . ((&lines * 34 + 36) / 72)
exe 'vert 2resize ' . ((&columns * 105 + 158) / 316)
exe '3resize ' . ((&lines * 34 + 36) / 72)
exe 'vert 3resize ' . ((&columns * 104 + 158) / 316)
exe '4resize ' . ((&lines * 35 + 36) / 72)
exe 'vert 4resize ' . ((&columns * 104 + 158) / 316)
exe 'vert 5resize ' . ((&columns * 105 + 158) / 316)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
