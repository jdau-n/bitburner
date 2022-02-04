/** @param {NS} ns **/
function logNum(ns, num) {
	return ns.nFormat(num, '0.00a');
}

export async function main(ns) {
	if (ns.args.length !== 2) {
		ns.tprint("Usage: threadhack.js <target> <threads>");
		ns.exit();
	}

	ns.disableLog("getServerSecurityLevel");
	ns.disableLog("getServerMinSecurityLevel");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerMaxMoney");

	var server_name = ns.args[0];
	var threads = parseInt(ns.args[1]);
	var gmode = false;
	var smsl = ns.getServerMinSecurityLevel(server_name)
	var sectarget = smsl*1.8;
	var smm = ns.getServerMaxMoney(server_name);
	var cashtarget_lo = smm * 0.6;
	var cashtarget_hi = smm * 0.8;

	while (true) {
		var sma = ns.getServerMoneyAvailable(server_name);
		var ssl = ns.getServerSecurityLevel(server_name);
		var cashlevel = (sma / smm);

		var stats = "sec_lvl(" + logNum(ns, ssl) + " / " + logNum(ns, smsl) + ": " + logNum(ns, sectarget) + ") ";
		stats += "cash(" + logNum(ns, sma) + " / " + logNum(ns, smm) + ")(" + logNum(ns, cashlevel) + ")";
		ns.print("---");
		ns.print(stats);
		if (ssl > sectarget) {
			ns.print ("Weaken mode");
			await ns.weaken(server_name, { threads: threads });
			continue;
		}

		if (gmode) {
			if (sma > cashtarget_hi) {
				ns.print("Leaving grow mode");
				gmode = false;
				continue;
			}
			await ns.grow(server_name, { threads: threads });

		} else if (sma < cashtarget_lo) {
			ns.print("Entering grow mode");
			gmode = true;
			continue;
		} else {
			ns.print("Hack mode");
			await ns.hack(server_name, { threads: threads });
		}
	}
}