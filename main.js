import "./style.css"

const sourceImageInput = document.getElementById('sourceImageInput');
const watermarkInput = document.getElementById('watermarkInput');
const sizeInput = document.getElementById('size');
const opacityInput = document.getElementById('opacity');
const positionXInput = document.getElementById('positionX');
const positionYInput = document.getElementById('positionY');
const previewImage = document.getElementById('previewImage');
const exportButton = document.getElementById('exportButton');
const loadingSpinner = document.getElementById('loadingSpinner');
const previewBlock = document.getElementById("previewBlock")
let sourceImage = new Image();
let watermarkImage = new Image();

sizeInput.addEventListener('input', updatePreview);
opacityInput.addEventListener('input', updatePreview);
positionXInput.addEventListener('input', updatePreview);
positionYInput.addEventListener('input', updatePreview);
exportButton.addEventListener('click', exportImage);
sourceImageInput.addEventListener('change', () => {
	showLoadingSpinner();
	sourceImage.src = URL.createObjectURL(sourceImageInput.files[0]);
	previewBlock.classList.toggle("toggle-preview");
});
watermarkInput.addEventListener('change', () => {
	showLoadingSpinner();
	watermarkImage.src = URL.createObjectURL(watermarkInput.files[0]);
});
sourceImage.addEventListener('load', () => {
	hideLoadingSpinner();
	updatePreview();
});
watermarkImage.addEventListener('load', () => {
	hideLoadingSpinner();
	updatePreview();
});

function showLoadingSpinner() {
	loadingSpinner.style.display = 'block';
}
function hideLoadingSpinner() {
	loadingSpinner.style.display = 'none';
}
function updatePreview() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = sourceImage.width;
	canvas.height = sourceImage.height;

	ctx.drawImage(sourceImage, 0, 0);

	ctx.globalAlpha = parseFloat(opacityInput.value);
	ctx.drawImage(watermarkImage, parseInt(positionXInput.value), parseInt(positionYInput.value), sourceImage.width * (sizeInput.value / 100), sourceImage.height * (sizeInput.value / 100));

	previewImage.src = canvas.toDataURL('image/jpeg');
}
function exportImage() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = sourceImage.width;
	canvas.height = sourceImage.height;

	ctx.drawImage(sourceImage, 0, 0);

	ctx.globalAlpha = parseFloat(opacityInput.value);
	ctx.drawImage(watermarkImage, parseInt(positionXInput.value), parseInt(positionYInput.value), sourceImage.width * (sizeInput.value / 100), sourceImage.height * (sizeInput.value / 100));

	const link = document.createElement('a');
	link.href = canvas.toDataURL('image/jpeg');
	link.download = 'watermarked_image.jpg';
	link.click();
}

