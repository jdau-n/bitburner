/** @param {NS} ns **/
var network_map = {};
var network_list = [];
var network_hacklevel = [];
var total_hacklevel = 0;
var hacklist = [];
var weighting_margin = 100;

async function scanhost(ns, hostname, parent_host, depth) {
	//ns.tprint("Scanning " + hostname + " from host " + parent_host + " depth " + depth);
	var connections = ns.scan(hostname);
	if (network_list.indexOf(hostname) === -1) { 
		network_list.push(hostname);
	}
	
	if ( ! ns.hasRootAccess(hostname) ) {
		await ns.run("root.js", 1, hostname);
		await ns.sleep(500);
	}

	var child_maps = {};
	if (connections.length) {
		//ns.tprint(hostname + " has " + connections.length + " connections.");
		for (var i = 0; i < connections.length; i++) {
			if (connections[i] == parent_host || connections[i] == hostname) {
				//tprint("Skipping " + connections[i]);
			} else {
				child_maps[connections[i]] = await scanhost(ns, connections[i], hostname, depth + 1);
			}
		}
	}

	return child_maps;
}

export async function main(ns) {
	if (ns.args.length !== 1) {
		ns.tprint("Expecting 1 param: script host");
		ns.exit();
	}
	
	network_map = {};
	network_list = [];
	network_hacklevel = [];
	total_hacklevel = 0;
	hacklist = [];
	
	var scripthost = ns.args[0];
	network_map = await scanhost(ns, "home", "home", 1);
	var player_hacking_level = ns.getHackingLevel();
	ns.tprint(network_list);
	for (var i = 0; i < network_list.length; i++) {
		if (network_list[i] == "home") { continue; }
		var server_required_hacking_level = ns.getServerRequiredHackingLevel(network_list[i]);

		if ( ns.hasRootAccess(network_list[i]) && player_hacking_level >= server_required_hacking_level && ns.getServerMaxMoney(network_list[i])) {
			hacklist.push(network_list[i]);	
			network_hacklevel.push( server_required_hacking_level + weighting_margin );
			total_hacklevel += server_required_hacking_level + weighting_margin;
		}
	}

	var sram = ns.getScriptRam("threadhack.js", scripthost);
	var smr = ns.getServerMaxRam(scripthost);
	var sur = ns.getServerUsedRam(scripthost);

	var threads = Math.floor( (smr - sur) / sram ) - hacklist.length;

	for (var i = 0; i < hacklist.length; i++) {
		var threadshare = Math.floor(threads / (total_hacklevel / network_hacklevel[i])) + 1;
		ns.tprint("Target: " + hacklist[i] + " hlevel " + network_hacklevel[i] + " tshare " + threadshare);

		ns.exec("threadhack.js", scripthost, threadshare, hacklist[i], threadshare);
	}
}