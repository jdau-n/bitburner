/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length == 1) {
		if ( ns.deleteServer(ns.args[0]) ) {
			ns.tprint("Deleted server " + ns.args[0]);
		} else {
			ns.tprint("Server deletion failed: " + ns.args[0]);
		}
		
	} else {
		ns.tprint("delete-server.js <server name>");
	}
}