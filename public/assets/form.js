var submit = document.querySelector('.js-submit');
submit.disabled = true

// Create Signature Canvas
var signatureCanvases = document.querySelectorAll('.js-sig-canvas');
let statusArray = [];

for(let i = 0; i < signatureCanvases.length; i++) {
  const signatureCanvas = signatureCanvases[i];

  statusArray.push(true)

  let signaturePad = new SignaturePad(signatureCanvas, {
    maxWidth: 2.25
  });
  
  signaturePad.addEventListener('beginStroke', function() {
      document.querySelector('.js-sig-reset[for=' + signatureCanvas.getAttribute("for")  + ']').classList.remove('hidden');
      statusArray[i] = false;
      console.log(signatureCanvases)
      console.log(statusArray)
      console.log(signatureCanvas)
  })
  signaturePad.addEventListener('endStroke', function() {
      document.querySelector('.js-sig[name=' + signatureCanvas.getAttribute("for") + ']').value = signaturePad.toDataURL();
      if(statusArray.every((val) => val == false ) && statusArray.length == signatureCanvases.length) {
        submit.disabled = false;
      }
  })

  // Reset Signature button
  document.querySelector('.js-sig-reset[for=' + signatureCanvas.getAttribute("for") + ']').addEventListener('click', function(event) {
    event.preventDefault();
    signaturePad.clear();
    this.classList.add('hidden');
    statusArray[i] = true;
    submit.disabled = true

    if(statusArray.every((val) => val == false ) && statusArray.length == signatureCanvases.length) {
      submit.disabled = false;
    }

    console.log(signatureCanvases)
    console.log(statusArray)
    console.log(signatureCanvas)
  })

}
