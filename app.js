const main = document.querySelector('main');
const toggle = document.getElementById('toggle');
const voicesSelected = document.getElementById('voices');
const textarea = document.getElementById('text');

const data = [
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
  ];

  data.forEach(createBox);
  function createBox(item){
      console.log(item)
      const box = document.createElement('div');

      box.classList.add('box');
      const {image,text} = item;
      box.innerHTML = `
   
      <img src="${image}" alt="image"/>
      <p class="info">${text}</p>

      
      `;


      main.appendChild(box);

      box.addEventListener('click',()=>{

        box.classList.add('active');
        setTextMessage(text);
        speakText();
        setTimeout(()=> box.classList.remove('active'), 1000)
      })

  }


  const message = new SpeechSynthesisUtterance();

  function setTextMessage(text){
      message.text = text;
      console.log(text)

  }
  function speakText(){
    speechSynthesis.speak(message);

  }
function setVoice(e){
    console.log(e.target.value);
    console.log(message.voice)
    message.voice = voices.find(voice=>voice.name === e.target.value);
}

  /*toggle text box */
  toggle.addEventListener('click',()=>{
      document.querySelector('.text-box').classList.toggle('show')
  })


  const close = document.getElementById('close');

  close.addEventListener('click',()=>{
    document.querySelector('.text-box').classList.remove('show')
})
let voices = [];

function getVoice(){
    voices = speechSynthesis.getVoices();

    voices.forEach(item=>{
        const option = document.createElement('option');
        option.value =`${item.name}`
        option.innerText = `${item.name}- ${item.lang}`;
        voicesSelected.appendChild(option)

    })
}

speechSynthesis.addEventListener('voiceschanged',getVoice);
voicesSelected.addEventListener('change',setVoice)

const redBtn = document.getElementById('read')
redBtn.addEventListener('click',(e)=>{
    setTextMessage(textarea.value);
    speakText();
    console.log(textarea.value)

})