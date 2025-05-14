import { Howl } from "howler";

console.log("stereo page");

const sound = new Howl({
	src: ["/song.mp4"],
	loop: true,
	onplay: () => {
		console.log("sound playing");
		startPanning();
	},
	onend: () => {
		console.log("sound ended");
	},
});

let panAnimationId: number | null = null;

const startPanning = async () => {
	const duration = sound.duration();
	// const startTime = sound.seek() as number;

	const animate = async () => {
		const currentTime = sound.seek() as number;
		const progress = currentTime / duration;
		const durationPanning = 30;
		const revolutionPanning = (progress * 100) % durationPanning;
		const stereoValue = Math.sin(
			(revolutionPanning / durationPanning) * Math.PI * 2,
		);

		const clampedStereoValue = Math.max(-0.75, Math.min(0.75, stereoValue));

		sound.stereo(clampedStereoValue);

		if (sound.playing()) {
			panAnimationId = requestAnimationFrame(animate);
		}
	};

	animate();
};

document.querySelector("#play-button")?.addEventListener("click", async () => {
	if (!sound.playing()) {
		await sound.play();
	}
});

document.querySelector("#pause-button")?.addEventListener("click", async () => {
	if (sound.playing()) {
		await sound.pause();
	}
});

document.querySelector("#stop-button")?.addEventListener("click", async () => {
	if (sound.playing()) {
		await sound.stop();
	}
});
