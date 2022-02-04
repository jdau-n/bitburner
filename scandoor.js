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
	
	for (var i = 0; i < network_list.length; i++) {
		if (network_list[i] == "home") { continue; }
		var server_required_hacking_level = ns.getServerRequiredHackingLevel(network_list[i]);
		if ( ns.hasRootAccess(network_list[i]) && player_hacking_level >= server_required_hacking_level ) {
			var host_path = get_host_path(ns, network_list[i], "home", network_map);
			if (host_path.length > 1) {

				for (var j = 0; j < host_path.length; j++) {
					ns.connect(host_path[j]);
					//ns.tprint("Connect: " + host_path[j]);
					await ns.sleep(100);
				}

				ns.tprint("Backdurr: " + network_list[i]);
				await ns.installBackdoor();
				await ns.sleep(100);

				for (var j = host_path.length - 2; j >= 0; j--) {
					ns.connect(host_path[j]);
					//ns.tprint("Rev connect: " + host_path[j]);
					await ns.sleep(100);
				}

				ns.connect("home");

			} else {
				ns.connect(network_list[i]);
				await ns.installBackdoor();
				ns.connect("home");
			}
		} else {
			ns.print("Can't backdoor " + network_list[i] + ": Can't get root");
		}
	}
}