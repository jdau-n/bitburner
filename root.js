/** @param {NS} ns **/
export async function main(ns) {
	var hostname = ns.args[0];
	var server_num_ports = ns.getServerNumPortsRequired(hostname)
	var tool_level = 0;

	if ( ns.fileExists('BruteSSH.exe') ) { tool_level++; }
	if ( ns.fileExists('FTPCrack.exe') && tool_level == 1 ) { tool_level++; }
	if ( ns.fileExists('relaySMTP.exe') && tool_level == 2 ) { tool_level++; }
	if ( ns.fileExists('HTTPWorm.exe') && tool_level == 3 ) { tool_level++; }
	if ( ns.fileExists('SQLInject.exe') && tool_level == 4 ) { tool_level++; }

	if ( server_num_ports > tool_level ) {
		ns.print("Cannot hack " + hostname + ": Not enough tools");
		ns.exit();
	}

	if ( server_num_ports >= 1 ) { ns.brutessh(hostname) };
	if ( server_num_ports >= 2 ) { ns.ftpcrack(hostname) };
	if ( server_num_ports >= 3 ) { ns.relaysmtp(hostname) };
	if ( server_num_ports >= 4 ) { ns.httpworm(hostname) };
	if ( server_num_ports >= 5 ) { ns.sqlinject(hostname) };
	
	ns.nuke(hostname);

	ns.tprint("Rooted " + hostname);
}