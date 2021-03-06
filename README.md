# bitburner scripts
A collection of scripts I use while playing Bitburner. Most scripts are more or less configurable via variables at the top.

## Usage

`run autohack.js (host server)`

Scan the whole network, root everything you can, run the hack script on everything you are good enough to hack. Uses almost all the memory available on the host machine. The amount of threads allocated to each thread is partially based on the hack level of the server relative to all others being hacked.

---

`run scandoor.js`

*Singularity function*

Scan the whole network, root everything possible, then connect to each server which you have a high enough hack level to backdoor in turn, backdooring each. Will occupy your terminal and may take some time.

---

`run threadhack.js (target server) (threads)`

Hack the given server using the given number of threads. Usually called from other scripts.

---

`run root.js (target server)`

If you have enough hack tools, gain root on the given server. Usually called from other scripts.

---

`run sing-crime.js`

*Singularity function*

Do a crime repeatedly, then after some time cycle through stat training. Configurable via the variables at the top. This is what I usually use to idle when starting off.

---

`run purchase-server.js`

List all server purchase options with RAM and cost.

---

`run purchase-server.js (option number) (server name)`

Purchase a server with option number and new server name. Options are from the list of prices, eg option 10 = 1024 RAM.

---

`run delete-server.js (server name)`

Delete the given server, if you own it.

---

`run share.js (host server name)`

Before using, copy x_shareclient.js to the host server. This will share the host server at max available threads. Sharing buffs rep gain with factions / companies? It looks like only one server will have an effect at once?

---

`run x_shareclient.js`

Constantly runs share(). Intended to be run by share.js, but you can run it with a custom number of threads by running `run x_shareclient.js -t (number of threads)`

---

## MIT License

Copyright 2022 James Demmery

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

