/** @param {NS} ns **/
var crime = "rob store";
var crime_repeats = 20;

var gym_name = "powerhouse gym";
var uni_name = "rothman university";
var study_time_seconds = 20;

var singularity_state = 0;

export async function main(ns) {
	var i;
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	while (true) {
		for (i = 0; i <= crime_repeats; i++) {
			var wait = ns.commitCrime(crime);
			await ns.sleep(wait);

			if (ns.isBusy()) {
				while (ns.isBusy()) {
					await ns.sleep(100);
				}
			}
		}

		switch ( singularity_state ) {
			case 0:
				ns.gymWorkout(gym_name, "strength", true);
				break;
			case 1:
				ns.gymWorkout(gym_name, "defense", true);
				break;
			case 2:
				ns.gymWorkout(gym_name, "dexterity", true);
				break;
			case 3:
				ns.gymWorkout(gym_name, "agility", true);
				break;
			case 4:
				ns.universityCourse(uni_name, "algorithms", focus);
				break;
			case 5:
			default:
				ns.universityCourse(uni_name, "leadership", focus);
				break;
		}

		for (i = 0; i <= study_time_seconds; i++) {
			if ( ns.getServerMoneyAvailable("home") <= 0 ) { break; }
			await ns.sleep(1000);
		}

		singularity_state++;
		if (singularity_state == 6) { singularity_state = 0; }
	}

}