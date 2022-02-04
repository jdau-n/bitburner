/** @param {NS} ns **/
function logNum(ns, num) {
	return ns.nFormat(num, '0.00a');
}

export async function main(ns) {
	if (ns.args.length !== 1) {
		ns.tprint("Usage: share.js <host server name>");
		ns.exit();
	}
	
	var scripthost = ns.args[0];

	var sram = ns.getScriptRam("x_shareclient.js", scripthost);
	if (sram == 0) {
		ns.tprint("Please scp x_shareclient.js to host server first")
		ns.exit();
	}
	var smr = ns.getServerMaxRam(scripthost);
	var sur = ns.getServerUsedRam(scripthost);

	var threads = Math.floor( (smr - sur) / sram );
	ns.tprint("Sharing server " + scripthost + " with " + threads + " threads.")
	ns.exec("x_shareclient.js", scripthost, threads);
}