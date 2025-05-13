import { Howl } from "howler";

console.log("stereo page");

const leftChannel = new Howl({
	src: ["/running_out.mp3"],
});
leftChannel.stereo(-1); // Set left channel to full left

const rightChannel = new Howl({
	src: ["/running_out.mp3"],
});
rightChannel.stereo(1); // Set right channel to full right

let panAnimationId: number | null = null;

const startPanning = async () => {
	const duration = leftChannel.duration();

	console.log("duration", duration);

	const startTime = leftChannel.seek() as number;

	console.log("startTime", startTime);

	const animate = async () => {
		const currentTime = leftChannel.seek() as number;
		const progress = currentTime / duration;

		const pan = -1 + 2 * progress; // -1 (left) to 1 (right)

		console.log("pan", pan);

		leftChannel.pos(pan, 0, 0);

		if (leftChannel.playing()) {
			panAnimationId = requestAnimationFrame(animate);
		}
	};

	animate();
};

document.querySelector("#play-button")?.addEventListener("click", async () => {
	if (!leftChannel.playing() && !rightChannel.playing()) {
		await leftChannel.play();
		await rightChannel.play();
	}
});

document.querySelector("#pause-button")?.addEventListener("click", async () => {
	if (leftChannel.playing()) {
		await leftChannel.pause();
	}
	if (rightChannel.playing()) {
		await rightChannel.pause();
	}
});

document.querySelector("#stop-button")?.addEventListener("click", async () => {
	if (leftChannel.playing()) {
		await leftChannel.stop();
	}
	if (rightChannel.playing()) {
		await rightChannel.stop();
	}
});
