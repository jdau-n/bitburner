# bitburner scripts
A collection of scripts I use while playing Bitburner. Most scripts are more or less configurable via variables at the top.

## Usage

`run autohack.js (host server)`

Scan the whole network, root everything you can, run the hack script on everything you are good enough to hack. Uses almost all the memory available on the host machine. The amount of threads allocated to each thread is partially based on the hack level of the server relative to all others being hacked.

`run scandoor.js`

**Singularity function**

Scan the whole network, root everything possible, then connect to each server which you have a high enough hack level to backdoor in turn, backdooring each. Will occupy your terminal and may take some time.

`run threadhack.js (target server) (threads)`

Hack the given server using the given number of threads. Usually called from other scripts.

`run root.js (target server)`

If you have enough hack tools, gain root on the given server. If you unlock tools out of order this will get confused. Usually called from other scripts.

`run sing-crime.js`

**Singularity function**

Do a crime repeatedly, then after some time cycle through stat training. Configurable via the variables at the top. This is what I usually use to idle when starting off.

`run purchase-server.js`

List all server purchase options with RAM and cost.

`run purchase-server.js (option number) (server name)`

Purchase a server with option number and new server name. Options are from the list of prices, eg option 10 = 1024 RAM.

`run delete-server.js (server name)`

Delete the given server, if you own it.