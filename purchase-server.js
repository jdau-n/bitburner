/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length == 2) {
		var pserv = ns.purchaseServer(ns.args[1], Math.pow(2, ns.args[0]));
		if (pserv) {
			ns.tprint("Purchased server: " + pserv);
		} else {
			ns.tprint("Couldn't purchase server! Not enough money or limit reached.");
		}
	} else {
		for (var i = 1; i <= 20; i++) {
			ns.tprint(i + ": RAM " + Math.pow(2, i) + " Cost "+ ns.nFormat(ns.getPurchasedServerCost(Math.pow(2, i)), '0.00a'));
		}
	}
}