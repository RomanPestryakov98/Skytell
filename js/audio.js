const audios = document.querySelectorAll('audio');
const plays = document.querySelectorAll('.player__button-play');
const pauses = document.querySelectorAll('.player__button-pause');
const progress = document.querySelectorAll('.player__progress');
const times = document.querySelectorAll('.player__time');

times.forEach(function (item) {
	const audio = item.nextElementSibling;
	setTimeout(function () {
		item.textContent = startedTime(audio.duration);
	}, 100);

})

audios.forEach(function (item) {
	item.addEventListener('timeupdate', updateProgress);
})

audios.forEach(function (item) {
	item.addEventListener('ended', endAudio);
})

plays.forEach(function (item) {
	item.addEventListener('click', clickPlay);
})
pauses.forEach(function (item) {
	item.addEventListener('click', clickPause);
})
progress.forEach(function (item) {
	item.addEventListener('click', setProgress);
})


function startedTime(duration) {
	let minutes = Math.floor(duration / 60);
	let second = Math.floor(duration % 60);
	if (second < 10) {
		second = '0' + second;
	}
	return `0${minutes}:${second}`
}

function eventTime(time) {
	let curentTime = Math.floor(time);
	let curTime = '';
	if (time < 60) {
		if (time < 10) {
			curTime = `00:0${curentTime}`;
		}
		else {
			curTime = `00:${curentTime}`;
		}
	}
	else {
		const minutes = Math.floor(curentTime / 60);
		const seconds = curentTime % 60;
		if (minutes <= 9 && seconds <= 9) {
			curTime = `0${minutes}:0${seconds}`
		}
		else if (minutes <= 9 || seconds > 9) {
			curTime = `0${minutes}:${seconds}`
		}
	}
	return curTime
}

function updateProgress(e) {
	const progresWidth = e.srcElement.closest('.player__content').querySelector('.player__progress-play');
	const { duration, currentTime } = e.srcElement;
	const progressProcent = (currentTime / duration) * 100;
	progresWidth.style.width = `${progressProcent}%`;
	const time = e.srcElement.previousElementSibling;
	time.textContent = eventTime(currentTime)
}

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const audio = this.closest('.player__content').querySelector('audio');
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;
}

function endAudio(e) {
	this.pause();
	const content = this.closest('.player__content');
	console.log(content)
	content.querySelector('.player__button-pause').style.display = 'none';
	content.querySelector('.player__button-play').style.display = 'block';
	this.closest('.player__content').querySelector('.player__progress-play').style.width = '1px';
}


function clickPlay(event) {
	event.target.style.display = 'none';
	const searchPause = event.target.closest('.player__buttons');
	const pause = searchPause.querySelector('.player__button-pause');
	const searchAudio = searchPause.closest('.player__content');
	const audio = searchAudio.querySelector('audio');
	pause.style.display = 'block';
	audio.play();
}

function clickPause(event) {
	event.target.style.display = 'none';
	const searchPlay = event.target.closest('.player__buttons');
	const play = searchPlay.querySelector('.player__button-play');
	const searchAudio = searchPlay.closest('.player__content');
	const audio = searchAudio.querySelector('audio');
	play.style.display = 'block';
	audio.pause();
}