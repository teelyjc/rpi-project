import { spawn } from "child_process";

export class RaspberryPiUtils {
	public static getCurrentTemperature(): Promise<number> | PromiseLike<number> {
		return new Promise<number>((accept, denied) => {
			const cmd = spawn("/usr/bin/vcgencmd", ["measure_temp"]);
  
			cmd.stdout.setEncoding("utf-8").on("data", (data) => {
					data
						? accept(parseFloat(/temp=([^'C]+)/.exec(data)![1]))
						: denied("Error, cannot get temperature.");
			});
 
			cmd.stderr.setEncoding("utf-8").on("data", () => {
				denied("Error occured");
			});

		});	
	}
	
	public static getUptime(): Promise<string> | PromiseLike<string> {
		return new Promise<string>((accept, denied) => {
			const cmd = spawn("uptime", ["-p"]);

			cmd.stdout.setEncoding("utf-8").on("data", (data) => {
				data
					? accept(data.trim())
					: denied("Error, cannot get uptime.");
			});

			cmd.stderr.setEncoding("utf-8").on("data", () => {
				denied("Error occured");
			});
		});
	}
}
