/** @param {NS} ns **/
var network_map = {};
var network_list = [];

async function scanhost(ns, hostname, parent_host, depth) {
	//ns.tprint("Scanning " + hostname + " from host " + parent_host + " depth " + depth);
	var connections = ns.scan(hostname);
	if (network_list.indexOf(hostname) === -1) { network_list.push(hostname); }
	
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

function get_host_path(ns, search_name, parent_name, network) {
	for (const scan_server_name in network) {
		if (scan_server_name == parent_name) { continue; }
		if (scan_server_name == search_name) {
			return [scan_server_name];
		} else {
			if (Object.keys(network[scan_server_name]).length) {
				var host_path = get_host_path(ns, search_name, scan_server_name, network[scan_server_name]);
				if(host_path) {
					host_path.unshift(scan_server_name);
					return host_path;
				}
			}
		}
	}

	return false;
}

export async function main(ns) {
	network_map = await scanhost(ns, "home", "home", 1, {});
	var player_hacking_level = ns.getHackingLevel();
	var world_demon_hostname = "w0r1d_d43m0n";

	if ( network_list.indexOf(world_demon_hostname) === -1 ) {
		ns.tprint("World daemon not present on the network, redpill required");
		ns.exit();
	}

	var server_required_hacking_level = ns.getServerRequiredHackingLevel(world_demon_hostname);
	if ( ! ns.hasRootAccess(world_demon_hostname) ) {
		ns.tprint("World daemon present but not rooted, get all the tools first");
		ns.exit();
	}
	
	if ( player_hacking_level < server_required_hacking_level ) {
		ns.tprint("World daemon present but you require " + server_required_hacking_level + " hack skill");
		ns.exit();
	}

	if (ns.args.length != 1) {
		ns.tprint("World daemon vulnerable. Run `noder.js iwin` to win");
		ns.exit();
	}

	var host_path = get_host_path(ns, world_demon_hostname, "home", network_map);

	for (var j = 0; j < host_path.length; j++) {
		ns.connect(host_path[j]);
		await ns.sleep(500);
	}

	ns.tprint("Grats!");
	await ns.sleep(1000);
	await ns.installBackdoor();
}