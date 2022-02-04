/** @param {NS} ns **/
const hackProgList = ['FTPCrack.exe', 'BruteSSH.exe', 'relaySMTP.exe', 'SQLInject.exe', 'HTTPWorm.exe'];

export async function main(ns) {
	var hostname = ns.args[0];
	var server_num_ports = ns.getServerNumPortsRequired(hostname)
	var tools = 0;
    for (let progName of hackProgList) {
        if (ns.fileExists(progName, 'home')) { ++tools; }
    }
	if ( server_num_ports > tools ) {
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